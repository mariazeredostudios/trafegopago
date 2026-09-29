# Leads na planilha + aviso instantâneo — receita de montagem

> 29/09/2026 · Formulário: `tetrabrazil.com/novoprep/faleconoscotra`
> Backend: Supabase · Pixel `1100395945778742`

---

## Antes de tudo: o evento do pixel está colidindo

Os eventos `Lead` que aparecem no Gerenciador **não são do formulário**.
Checagem de 22 a 29/09, detalhada por URL:

| Data | Leads | Origem |
|---|---|---|
| 23/09 | 4 | `sympla.com.br` |
| 24/09 | 1 | `sympla.com.br` |
| 25/09 | 2 | `sympla.com.br` |
| 28/09 | 2 | `sympla.com.br` |
| **`/faleconoscotra`** | **0** | — |

A integração do Sympla tem `Lead: true` habilitada e dispara no fluxo de
checkout. **Otimizar por `Lead` agora faria o Meta perseguir o evento do
Sympla**, não o seu formulário.

### Como separar os dois

1. O dev dispara **`Lead`** no envio do formulário (evento padrão — os
   modelos do Meta funcionam melhor com ele do que com evento customizado)
2. No Gerenciador de Eventos → **Conversões personalizadas** → Criar:
   - Origem: pixel `1100395945778742`
   - Evento: `Lead`
   - Regra: **URL contém `faleconoscotra`**
   - Nome: `Lead Formulário PREP`
3. A campanha otimiza por **`Lead Formulário PREP`**, não por `Lead`

O Sympla continua disparando o dele e fica fora da conta.

---

## A planilha e o aviso: o Meta não entra nisso

```
Formulário (site)
   │
   ├──> Supabase ──> Webhook ──> Apps Script ──┬──> Google Sheets
   │                                           └──> Telegram / e-mail
   │
   └──> fbq('track','Lead')  ──> só otimização, sem contato
```

Não existe integração de planilha no Meta: a integração nativa de CRM
atende apenas Formulário Instantâneo e uma lista fechada de parceiros.
Como o formulário é do site, o contato nunca chega ao Meta — e não
precisa chegar.

---

## Passo 1 — A planilha

Criar uma planilha no Google com a aba `Leads` e o cabeçalho:

| Data | Nome | E-mail | Telefone | Cidade | Mensagem | Status |
|---|---|---|---|---|---|---|

Guardar o **ID da planilha** — é o trecho da URL entre `/d/` e `/edit`.

---

## Passo 2 — O Apps Script

Na planilha: **Extensões → Apps Script**. Apagar o conteúdo e colar:

```javascript
// ===== CONFIGURAÇÃO =====
var ID_PLANILHA   = 'COLE_O_ID_DA_PLANILHA_AQUI';
var SEGREDO       = 'troque-por-uma-senha-longa-qualquer';
var EMAIL_AVISO   = 'seu@email.com';
var TELEGRAM_TOKEN = '';   // opcional — ver passo 4
var TELEGRAM_CHAT  = '';   // opcional

function doPost(e) {
  try {
    var corpo = JSON.parse(e.postData.contents);

    // trava simples: só aceita quem sabe o segredo
    if (corpo.segredo !== SEGREDO) {
      return ContentService.createTextOutput('nao autorizado');
    }

    var r = corpo.record || corpo;   // o Supabase envia { type, record, ... }

    var nome  = r.nome     || r.name  || '';
    var email = r.email    || '';
    var tel   = r.telefone || r.phone || '';
    var cid   = r.cidade   || r.city  || '';
    var msg   = r.mensagem || r.message || '';

    SpreadsheetApp.openById(ID_PLANILHA)
      .getSheetByName('Leads')
      .appendRow([new Date(), nome, email, tel, cid, msg, 'Novo']);

    var texto = 'NOVO LEAD TETRAPREP\n\n'
              + 'Nome: '     + nome  + '\n'
              + 'Telefone: ' + tel   + '\n'
              + 'E-mail: '   + email + '\n'
              + 'Cidade: '   + cid   + '\n\n'
              + 'Responder em até 5 minutos.';

    if (EMAIL_AVISO) {
      MailApp.sendEmail(EMAIL_AVISO, 'Novo lead TetraPREP: ' + nome, texto);
    }

    if (TELEGRAM_TOKEN && TELEGRAM_CHAT) {
      UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_TOKEN + '/sendMessage', {
        method: 'post',
        payload: { chat_id: TELEGRAM_CHAT, text: texto }
      });
    }

    return ContentService.createTextOutput('ok');

  } catch (err) {
    MailApp.sendEmail(EMAIL_AVISO, 'ERRO no recebimento de lead', String(err));
    return ContentService.createTextOutput('erro');
  }
}
```

Publicar: **Implantar → Nova implantação → Tipo: App da Web**
- Executar como: **eu**
- Quem tem acesso: **qualquer pessoa**
- Copiar a **URL do app da Web** que aparece no final

> A URL fica pública, por isso a checagem de `SEGREDO`. Sem ela, qualquer
> um que descubra o endereço consegue escrever na sua planilha.

---

## Passo 3 — O webhook no Supabase

No painel do Supabase: **Database → Webhooks → Create a new hook**

| Campo | Valor |
|---|---|
| Name | `lead_para_planilha` |
| Table | a tabela onde o formulário grava |
| Events | apenas **Insert** |
| Type | HTTP Request |
| Method | **POST** |
| URL | a URL do app da Web do passo 2 |
| HTTP Headers | `Content-Type: application/json` |

O Supabase envia `{ "type": "INSERT", "record": { ...os campos... } }`.

⚠️ O webhook do Supabase não deixa acrescentar o campo `segredo` ao corpo.
Duas saídas: pedir ao dev que o próprio formulário faça o POST para o Apps
Script (além de gravar no Supabase), ou trocar a checagem de `SEGREDO` por
um parâmetro na URL — `...?token=sua-senha` — e ler com
`e.parameter.token` em vez de `corpo.segredo`.

A segunda é mais simples e resolve igual.

---

## Passo 4 — O aviso no celular (recomendado)

E-mail é fácil de perder. Para responder em menos de 5 minutos, Telegram
funciona melhor e é gratuito:

1. No Telegram, procurar **@BotFather** → `/newbot` → escolher um nome →
   ele devolve o **token**
2. Mandar qualquer mensagem para o bot que você acabou de criar
3. Abrir `https://api.telegram.org/bot<SEU_TOKEN>/getUpdates` no navegador
   e copiar o `chat.id` que aparece
4. Preencher `TELEGRAM_TOKEN` e `TELEGRAM_CHAT` no script

Para avisar o time inteiro, criar um grupo, adicionar o bot e usar o id do
grupo (começa com `-`).

---

## Passo 5 — Testar antes de subir verba

1. Preencher o formulário no site, de verdade
2. Conferir: linha nova na planilha ✓ · aviso recebido ✓
3. Gerenciador de Eventos → **Testar eventos** → confirmar o `Lead` com a
   URL `faleconoscotra`
4. Só então criar a campanha de Leads

---

## Ordem completa

- [ ] Dev dispara `fbq('track','Lead')` no sucesso do envio (`value: 135`, `currency: 'BRL'`)
- [ ] Criar a Conversão Personalizada `Lead Formulário PREP` filtrada por URL
- [ ] Montar planilha + Apps Script + webhook do Supabase
- [ ] Configurar o Telegram
- [ ] Testar ponta a ponta
- [ ] Criar `PREP2627 | LEADS` otimizando pela **conversão personalizada**
- [ ] Ligar Leads e pausar `TETRA PREP` no mesmo dia
- [ ] Definir quem atende e a meta de 5 minutos
