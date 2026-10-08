const SHEET_NAME = 'Leads';
const SOURCE_DESCONHECIDA = 'desconhecida';
const ALLOWED_SOURCES = ['novoprep/faleconosco', 'novoprep/faleconoscotra'];

const BASE_HEADERS = ['Data/Hora', 'Nome', 'Email', 'WhatsApp', 'Origem'];

// Colunas novas. Cada uma aceita variações de nome, para não quebrar
// se o formulário mudar a nomenclatura depois.
const EXTRA_COLUMNS = [
  { header: 'utm_source',   keys: ['utm_source', 'utmSource'] },
  { header: 'utm_medium',   keys: ['utm_medium', 'utmMedium'] },
  { header: 'utm_campaign', keys: ['utm_campaign', 'utmCampaign'] },
  { header: 'utm_content',  keys: ['utm_content', 'utmContent'] },
  { header: 'utm_term',     keys: ['utm_term', 'utmTerm'] },
  { header: 'fbclid',       keys: ['fbclid', 'fbClid', 'fbc'] },
  { header: 'Referrer',     keys: ['referrer', 'referer'] },
  { header: 'Caminho',      keys: ['pathname', 'path', 'pagina', 'page'] },
  { header: 'lead_id',      keys: ['lead_id', 'leadId'] }
];

// Preenchidas depois, quando a pessoa clica num dos dois botões.
// Entram no cabeçalho mas ficam vazias no momento em que o lead é criado.
const COL_INTERESSE = 'Interesse';
const COL_DATA_RESPOSTA = 'Data da resposta';
const QUALIFICACAO_COLUMNS = [COL_INTERESSE, COL_DATA_RESPOSTA];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const data = flatten(JSON.parse(e.postData.contents));

    // Clique nos botões de qualificação: não é lead novo, é atualização
    // de uma linha que já existe. Precisa vir antes do honeypot e da
    // validação, porque este payload não tem nome, e-mail nem WhatsApp.
    if (data.action === 'qualificacao') {
      return registrarQualificacao(data, lock);
    }

    // Honeypot: bots preenchem este campo escondido. Finge sucesso, não grava.
    if (data.website) return out({ success: true });

    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim();
    const whatsapp = String(data.whatsapp || '').trim();
    const digits = whatsapp.replace(/\D/g, '');
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (
      name.length < 2 || name.length > 100 ||
      !emailOk || email.length > 255 ||
      digits.length < 8 || whatsapp.length > 20
    ) {
      return out({ success: false, error: 'Invalid data' });
    }

    // Se a origem não vier reconhecida, marca como desconhecida.
    // NUNCA assume a página orgânica: isso mascararia lead pago.
    const source = ALLOWED_SOURCES.indexOf(data.source) !== -1
      ? data.source
      : SOURCE_DESCONHECIDA;

    lock.waitLock(10000);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    const headers = ensureHeaders(sheet);

    const valores = {
      'Data/Hora': new Date(),
      'Nome': safe(name),
      'Email': safe(email),
      'WhatsApp': whatsapp,
      'Origem': source
    };
    EXTRA_COLUMNS.forEach(function (col) {
      valores[col.header] = safe(pick(data, col.keys));
    });

    const linha = headers.map(function (h) {
      return valores.hasOwnProperty(h) ? valores[h] : '';
    });

    const row = sheet.getLastRow() + 1;
    sheet.getRange(row, 1, 1, linha.length).setValues([linha]);

    return out({ success: true });
  } catch (err) {
    return out({ success: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

// Acha a linha pelo lead_id e grava a resposta do botão.
// Recebe o lock do doPost: quem solta é o finally de lá.
function registrarQualificacao(data, lock) {
  const leadId = normalizaId(data.lead_id);
  const texto =
    data.interesse === 'SIM' ? 'SIM - quer contato' :
    data.interesse === 'NAO' ? 'NAO - sem interesse' : '';

  if (!leadId || !texto) return out({ success: false, error: 'Invalid data' });

  lock.waitLock(10000);

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 2) {
    return out({ success: false, error: 'No leads' });
  }

  const headers = ensureHeaders(sheet);
  const cId = headers.indexOf('lead_id') + 1;
  const cInteresse = headers.indexOf(COL_INTERESSE) + 1;
  const cData = headers.indexOf(COL_DATA_RESPOSTA) + 1;
  if (!cId || !cInteresse || !cData) {
    return out({ success: false, error: 'Missing columns' });
  }

  const ids = sheet.getRange(2, cId, sheet.getLastRow() - 1, 1).getValues();

  // De trás para frente: se o mesmo id aparecer duas vezes, vale o mais recente.
  for (var i = ids.length - 1; i >= 0; i--) {
    if (normalizaId(ids[i][0]) === leadId) {
      const linha = i + 2;
      sheet.getRange(linha, cInteresse).setValue(texto);
      sheet.getRange(linha, cData).setValue(new Date());
      return out({ success: true, row: linha });
    }
  }
  return out({ success: false, error: 'Lead not found' });
}

// Tira o apóstrofo que o Sheets usa para forçar texto, para a comparação
// não falhar por causa dele.
function normalizaId(v) {
  return String(v == null ? '' : v).trim().replace(/^'/, '');
}

// Protege contra injeção de fórmula e limita o tamanho.
function safe(s) {
  s = String(s == null ? '' : s).slice(0, 500);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

// Cria o cabeçalho se a aba estiver vazia, ou acrescenta só as colunas que faltam.
// Nunca apaga nem reordena o que já existe.
function ensureHeaders(sheet) {
  const desejadas = BASE_HEADERS
    .concat(EXTRA_COLUMNS.map(function (c) { return c.header; }))
    .concat(QUALIFICACAO_COLUMNS);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(desejadas);
    sheet.getRange(1, 1, 1, desejadas.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.getRange('D:D').setNumberFormat('@');
    return desejadas;
  }

  let atuais = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    .map(function (h) { return String(h).trim(); });

  const faltando = desejadas.filter(function (h) { return atuais.indexOf(h) === -1; });
  if (faltando.length) {
    const alvo = sheet.getRange(1, atuais.length + 1, 1, faltando.length);
    alvo.setValues([faltando]);
    alvo.setFontWeight('bold');
    atuais = atuais.concat(faltando);
  }
  return atuais;
}

// Traz para a raiz os campos que vierem dentro de um objeto aninhado,
// por exemplo { utm: { source: 'meta' } }. A raiz sempre tem prioridade.
function flatten(obj) {
  const raiz = {};
  const aninhados = [];
  Object.keys(obj || {}).forEach(function (k) {
    const v = obj[k];
    if (v && typeof v === 'object' && !Array.isArray(v)) aninhados.push(v);
    else raiz[k] = v;
  });
  aninhados.forEach(function (o) {
    Object.keys(o).forEach(function (k) {
      if (!(k in raiz)) raiz[k] = o[k];
    });
  });
  return raiz;
}

// Devolve o primeiro valor presente entre as variações de nome.
function pick(data, keys) {
  for (var i = 0; i < keys.length; i++) {
    var v = data[keys[i]];
    if (v !== undefined && v !== null && String(v) !== '') return v;
  }
  return '';
}

function out(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
