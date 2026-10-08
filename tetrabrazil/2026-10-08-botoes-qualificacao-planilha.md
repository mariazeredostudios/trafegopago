# Botões de qualificação na LP + resposta na planilha

**Fluxo:** a pessoa envia o formulário → aparece a tela de confirmação com a
mensagem e **dois botões** → ela clica → a resposta cai na planilha → quem
clicou "quero contato" segue para o WhatsApp.

**Como a resposta encontra a linha certa:** a LP gera um `lead_id` único no
envio e manda junto do lead. Quando a pessoa clica no botão, a LP manda esse
mesmo `lead_id` de volta com a resposta, e o Apps Script acha a linha por ele.

---

## PROMPT 1 — Lovable

```
Na página /novoprep/faleconoscotra, preciso de quatro ajustes.

1. GERAR UM ID ÚNICO PARA CADA LEAD

No momento do envio do formulário, gere um identificador único com
crypto.randomUUID() e guarde num estado do componente. Mande esse valor
junto com os outros dados do lead, num campo chamado exatamente
"lead_id". Esse mesmo valor será reenviado no passo 3, então precisa
continuar disponível depois do envio.

2. CORRIGIR O EVENTO DO PIXEL QUE DISPARA DUAS VEZES

Hoje o fbq('track', 'Lead', ...) dispara duas vezes por envio —
confirmei pelos dados do pixel. Provavelmente está sendo chamado no
handler de submit e de novo num useEffect ou no re-render da tela de
sucesso.

Garanta que dispare EXATAMENTE UMA VEZ por envio. Use uma ref (useRef)
como trava, não um estado, para que um re-render não dispare de novo.
Mantenha os mesmos parâmetros atuais (content_name, content_category,
value, currency) — não altere os valores.

3. TELA DE CONFIRMAÇÃO COM DOIS BOTÕES

Depois que o lead salvar com sucesso (e só em caso de sucesso — se
falhar, mostre o erro e não avance), substitua o formulário por uma
tela com este texto:

---
Recebemos seu contato! ⚽

Se você tem entre 21 e 45 anos e quer trabalhar com futebol nos Estados
Unidos, essa é a sua chance.

Não precisa de faculdade de Educação Física, nem de inglês fluente, nem
de passagem por clube grande. Precisa de um caminho — e é isso que a
gente faz há 25 anos.

Lá fora: USD 210 a 250 por semana, com casa, transporte, seguro saúde e
passagem aérea inclusos.

Investimento: R$ 1.350 (em até 12x no cartão)

USD 250 por semana dá cerca de R$ 1.290 — ou seja, sua primeira semana
lá fora já devolve quase tudo que você investiu.

Imersão presencial:
• São Paulo — 10 a 13/dez (Itu)
• Rio de Janeiro — 17 a 20/dez (CT do Fluminense, Xerém)

Vagas limitadas por núcleo e falamos com cada candidato individualmente.
---

Abaixo do texto, dois botões lado a lado (empilhados no celular):

BOTÃO 1 (verde, destaque principal):
"Estou ciente do investimento e quero que entrem em contato"

BOTÃO 2 (cinza, secundário, sem borda chamativa):
"Não tenho mais interesse"

Destaque o botão 1 visualmente — ele deve ser a ação óbvia.

4. O QUE CADA BOTÃO FAZ

Os dois enviam um POST para o MESMO endpoint do formulário, usando
EXATAMENTE o mesmo método de envio que já funciona hoje (mesmo
fetch, mesmo Content-Type, mesmo mode). Não mude a forma de envio, só
o corpo:

{
  "action": "qualificacao",
  "lead_id": <o lead_id gerado no passo 1>,
  "interesse": "SIM"   // "NAO" no botão 2
}

Depois de enviar:

- BOTÃO 1 → redirecionar para:
  https://wa.me/5511941488736?text=Ol%C3%A1%21%20Acabei%20de%20preencher%20o%20formul%C3%A1rio%20do%20TetraPREP%202026-2027%20no%20site%20e%20quero%20mais%20informa%C3%A7%C3%B5es.

- BOTÃO 2 → NÃO redirecionar. Trocar a tela por:
  "Tudo certo, obrigado pelo retorno! Se mudar de ideia, é só voltar
  aqui — as inscrições seguem abertas até as vagas acabarem. Boa sorte
  na sua caminhada! ⚽"

Enquanto o POST estiver em andamento, desabilite os dois botões e
mostre estado de carregando, para não haver clique duplo. Se o POST
falhar, siga para o destino do botão assim mesmo — não prenda a pessoa
numa tela de erro.

IMPORTANTE, NÃO ALTERAR:
- A captura dos UTMs (utm_source, utm_medium, utm_campaign,
  utm_content, utm_term) e o envio deles junto do lead.
- O endpoint do formulário.
- Os campos do formulário.
- Os parâmetros do evento Lead.
```

---

## PROMPT 2 — Planilha (Google Apps Script)

No editor do Apps Script da planilha (**Extensões → Apps Script**), cole o
bloco abaixo **no fim do arquivo**, sem apagar nada do que já existe:

```js
/* ===== QUALIFICAÇÃO: resposta dos botões da LP ===== */

var ABA_LEADS   = 'Leads';           // ⚠️ troque pelo nome real da sua aba
var COL_LEAD_ID = 'lead_id';
var COL_INTER   = 'interesse';
var COL_DATA    = 'data_resposta';

/** Cria as 3 colunas no fim da primeira linha, se ainda não existirem. */
function garantirColunasQualificacao_(sheet) {
  var ultima = Math.max(sheet.getLastColumn(), 1);
  var headers = sheet.getRange(1, 1, 1, ultima).getValues()[0];
  [COL_LEAD_ID, COL_INTER, COL_DATA].forEach(function (nome) {
    if (headers.indexOf(nome) === -1) {
      sheet.getRange(1, sheet.getLastColumn() + 1).setValue(nome);
      headers.push(nome);
    }
  });
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

function registrarQualificacao_(data) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(ABA_LEADS);
  if (!sheet) return respostaJson_({ ok: false, erro: 'aba nao encontrada' });

  var leadId = (data.lead_id || '').toString().trim();
  var texto  = data.interesse === 'SIM' ? 'SIM - quer contato'
             : data.interesse === 'NAO' ? 'NAO - sem interesse'
             : '';
  if (!leadId || !texto) return respostaJson_({ ok: false, erro: 'dados incompletos' });

  var headers = garantirColunasQualificacao_(sheet);
  var cId   = headers.indexOf(COL_LEAD_ID) + 1;
  var cInt  = headers.indexOf(COL_INTER)   + 1;
  var cData = headers.indexOf(COL_DATA)    + 1;

  var totalLinhas = sheet.getLastRow() - 1;
  if (totalLinhas < 1) return respostaJson_({ ok: false, erro: 'planilha vazia' });

  var ids = sheet.getRange(2, cId, totalLinhas, 1).getValues();
  for (var i = ids.length - 1; i >= 0; i--) {      // de trás pra frente: pega o mais recente
    if (ids[i][0].toString().trim() === leadId) {
      var linha = i + 2;
      sheet.getRange(linha, cInt).setValue(texto);
      sheet.getRange(linha, cData).setValue(new Date());
      return respostaJson_({ ok: true, linha: linha });
    }
  }
  return respostaJson_({ ok: false, erro: 'lead_id nao encontrado' });
}

function respostaJson_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Depois, **no começo do seu `doPost`**, logo após ler o JSON, acrescente as duas
linhas que desviam a qualificação — o resto do `doPost` continua igual:

```js
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var data = JSON.parse(e.postData.contents);

    // ↓↓↓ ACRESCENTAR ESTAS DUAS LINHAS ↓↓↓
    if (data.action === 'qualificacao') return registrarQualificacao_(data);
    // ↑↑↑ o resto do doPost segue exatamente como está ↑↑↑

    // ... seu código atual de gravar o lead ...
  } finally {
    lock.releaseLock();
  }
}
```

E garanta que o `lead_id` seja gravado junto do lead novo. Se o seu `doPost`
monta a linha campo a campo, inclua `data.lead_id` na posição da coluna
`lead_id`. Se ele já grava todos os campos recebidos, não precisa mexer.

### ⚠️ Sem isto, nada funciona

Depois de salvar, é obrigatório **publicar uma nova versão**:

**Implantar → Gerenciar implantações → ✏️ (editar) → Versão: Nova versão →
Implantar**

Se você só salvar o código, a URL continua rodando a versão antiga.
**Não crie uma implantação nova** — isso gera outra URL e o formulário para de
funcionar.

---

## Deixar visual na planilha

Para a coluna `interesse` virar um indicador colorido:

1. Selecione a coluna `interesse` inteira
2. **Formatar → Formatação condicional**
3. Regra 1: *O texto contém* `SIM` → fundo verde
4. **Adicionar outra regra** — Regra 2: *O texto contém* `NAO` → fundo vermelho
5. Opcional — Regra 3: *A célula está vazia* → fundo amarelo (não respondeu)

O amarelo é o mais útil no dia a dia: é quem preencheu o formulário e não
clicou em nada. Esses continuam valendo uma ligação.

---

## Como testar

1. Abrir a LP com os UTMs:
   `?utm_source=meta&utm_medium=paid&utm_campaign=prep2627_leads`
2. Preencher e enviar → conferir na planilha: linha nova, com UTMs **e**
   `lead_id` preenchido
3. Clicar em **"Estou ciente…"** → na **mesma linha**, `interesse` = `SIM - quer
   contato` e `data_resposta` preenchida → e o WhatsApp abriu
4. Repetir com outro lead de teste clicando em **"Não tenho mais interesse"** →
   `interesse` = `NAO - sem interesse`, e **sem** abrir o WhatsApp
5. No **Gerenciador de Eventos** da Meta, o `Lead` aparecendo **uma vez só**

Se o `interesse` não preencher, o suspeito nº 1 é a implantação: confira se
você publicou **nova versão**, não só salvou.
