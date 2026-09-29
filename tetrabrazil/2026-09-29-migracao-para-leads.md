# Migração para campanha de Leads — TetraPREP 2026-2027

> Escrito em 29/09/2026 · Conta `TETRA + MARIA` (`2635791740185506`)
> Pixel `1100395945778742` · Nova LP: `tetrabrazil.com/novoprep/faleconoscotra`

---

## 1. Três correções de fato (verificadas na conta e no site)

### A campanha não foi trocada para Leads

Existe **uma** campanha: `TETRA PREP`, objetivo **`OUTCOME_SALES`**, ativa,
US$ 70,45 gastos. Os três conjuntos seguem com
`optimization_goal: OFFSITE_CONVERSIONS` e `custom_event_type: PURCHASE`.

**O Meta não permite trocar o objetivo de uma campanha depois de criada.**
Leads exige **campanha nova**.

### A nova LP não dispara evento de Lead

`/novoprep/faleconoscotra` responde HTTP 200 e carrega o pixel
`1100395945778742`, mas **só com `PageView`**. Busca no bundle
(`/assets/index-CMiaoZHK.js`, 4,5 MB) por `'Lead'`: **zero ocorrências**.

Quem preencher o formulário não gera evento nenhum. Sem isso é impossível
otimizar por lead — é o mesmo erro do `InitiateCheckout`, repetido.

### A integração de CRM que pediram não existe para esse formato

**A integração nativa de CRM do Meta só funciona com Formulário
Instantâneo** — o formulário nativo que abre dentro do app. Com formulário
no site, **o lead nunca passa pelo Meta**; não há o que conectar.

No bundle há cliente **Supabase**, então o app usa Supabase como backend.
Confirmar com quem fez a página se é lá que este formulário grava.

---

## 2. Por que a troca é a decisão certa

Verba restante: **US$ 704,55 (R$ 3.635)** · 76 dias até 14/12 ·
**US$ 9,27/dia**

Com o custo por visita medido na semana 1 (R$ 1,28), essa verba compra
**~2.840 visitas**. O que elas viram depende de duas taxas:

| Conv. formulário | Leads | CPL | Conv. lead→venda | Vendas | Faturamento | ROAS |
|---|---|---|---|---|---|---|
| 5% | 142 | R$ 25,60 | 5% | 7 | R$ 9.586 | 2,6x |
| 5% | 142 | R$ 25,60 | 10% | 14 | R$ 19.171 | 5,3x |
| **10%** | **284** | **R$ 12,80** | **5%** | **14** | R$ 19.171 | 5,3x |
| **10%** | **284** | **R$ 12,80** | **10%** | **28** | R$ 38.343 | 10,5x |
| 15% | 426 | R$ 8,53 | 10% | 43 | R$ 57.514 | 15,8x |

**Referência da venda direta: 12 a 25 vendas.** O cenário central do lead
(10% / 10%) entrega **28** — e deixa **284 contatos na base** para 2027. A
venda direta não deixa nada.

O que sustenta essa projeção é ter alguém ligando. Sem atendimento, a coluna
"conv. lead→venda" desaba e a troca piora o resultado.

⚠️ **O fator que mais mexe nessa tabela não é o anúncio: é o tempo de
resposta.** Lead de ticket alto respondido em menos de 5 minutos converte
várias vezes mais que o mesmo lead respondido no dia seguinte. Vale mais
acertar isso do que qualquer ajuste de segmentação.

---

## 3. O que o desenvolvedor precisa fazer

### 3.1 Disparar `Lead` no envio do formulário

**No sucesso do envio** — depois da confirmação do Supabase, nunca no
clique do botão:

```js
fbq('track', 'Lead', {
  content_name: 'TetraPREP 2026-2027',
  content_category: 'fale-conosco',
  value: 135.00,
  currency: 'BRL'
});
```

**Por que `value: 135` e não 1350:** o valor de um evento `Lead` é o valor
*esperado* do lead, não o preço do produto. Se ~10% dos leads compram a
R$ 1.350, cada lead vale ~R$ 135. Declarar 1350 infla o ROAS no relatório e
engana a otimização por valor mais tarde.

**Disparar só no sucesso.** No clique do botão você contaria também quem
errou o e-mail, quem desistiu e quem enviou duas vezes.

### 3.2 Validar antes de subir verba

Gerenciador de Eventos → **Testar eventos** → abrir a LP → preencher o
formulário de verdade → confirmar que o `Lead` aparece com os parâmetros.

**Não criar a campanha antes disso.** Criar campanha otimizando por um
evento que nunca disparou é exatamente o que aconteceu com o `Purchase` — e
custou uma semana.

### 3.3 Fase 2: Conversions API (opcional, recomendado depois)

Uma Edge Function no Supabase enviando o mesmo evento para a API de
Conversões do Meta, com o mesmo `event_id` do evento do navegador (para
deduplicar) e e-mail/telefone com hash. Ganho: sobrevive a bloqueador de
anúncio e iOS, e melhora a qualidade de correspondência — o que reduz CPL.

---

## 4. A arquitetura correta do dado

```
Formulário (site)
   │
   ├──> Supabase ─── dado primário, é de vocês
   │       ├──> CRM / planilha      (webhook, Zapier ou Make)
   │       └──> Conversions API     (fase 2)
   │
   └──> fbq('track', 'Lead') ─── o Meta otimiza, sem guardar o contato
```

O Meta **nunca** recebe nome, e-mail ou telefone. Ele recebe só o sinal de
que houve conversão, para aprender quem converte.

### Perguntas a fazer para eles antes de configurar

1. Qual é o CRM, nome exato? Se ainda é planilha, qual e quem edita?
2. Ele aceita **webhook de entrada**, ou só importação de CSV?
3. Tem API? Quem tem a chave?
4. **Quem atende o lead e em quanto tempo?** (o número que mais importa)
5. Onde estão os 518 ex-alunos hoje — no mesmo lugar?

Com webhook, a ligação Supabase → CRM sai em uma tarde. Sem webhook, uma
automação no Make ou Zapier resolve. Se for planilha, Supabase → Google
Sheets é suficiente para esse volume — não invente CRM antes de precisar.

---

## 5. A campanha nova

**`PREP2627 | LEADS`**
- Objetivo: **Cadastros (Leads)**
- Local de conversão: **Site** — não formulário instantâneo
- Otimização: **`Lead`** (só depois do evento validado)
- Orçamento: **CBO US$ 9,00/dia**
- Geo: **Brasil** · Advantage+ audience **desligado**
- Destino: `tetrabrazil.com/novoprep/faleconoscotra` + UTM

| Conjunto | Público | Idade |
|---|---|---|
| L1 ⭐ | `Semelhante (BR, 1%) - COMPRADORES TETRAPREP` | 21–50, sem interesses |
| L2 | Coaching · Work abroad · Intercâmbio · Futebol · Educação Física | 21–42 |

**L1 é o público que nunca rodou.** Está parado desde o dia 22 dentro do
conjunto `BRASIL + INTERAÇÃO`, misturado com outros nove. Agora vai isolado.

**Anúncios:** os dois vídeos vencedores da semana 1 (custo por visita R$ 1,13
a 1,24) + o vídeo `120252149998780365` (CTR 6,80%, R$ 0,67 por visita).
Pausar as artes estáticas.

### A copy muda de promessa

O anúncio deixa de vender a matrícula e passa a vender a **conversa**. O
mesmo gancho, outro fechamento:

> *"Em 2025, 220 treinadores fizeram o TetraPREP e 90 receberam proposta
> para trabalhar nos Estados Unidos. Quer saber se o seu perfil se encaixa?
> Responde o formulário que a gente te explica como funciona — vaga,
> processo de visto e valores."*

> *"Você não precisa de faculdade de Educação Física para trabalhar com
> futebol nos EUA. Deixa seu contato que a gente te manda o passo a passo
> completo do programa."*

CTA: **Saiba mais** ou **Cadastre-se** — nunca "Comprar".

---

## 6. Ordem de execução

1. Dev implementa o `fbq('track','Lead')` no sucesso do envio
2. Validar no **Testar eventos** com um preenchimento real
3. Esperar acumular alguns `Lead` (mesmo orgânicos)
4. Criar `PREP2627 | LEADS` conforme acima, **pausada**
5. Ligar a de Leads e **pausar `TETRA PREP` no mesmo dia** — não rodar as
   duas em paralelo com US$ 9/dia
6. Ligar Supabase → CRM/planilha
7. Definir o responsável e a meta de tempo de resposta
8. Fase 2: Conversions API

⚠️ Os passos 1 e 2 são pré-requisito de tudo. Sem o evento validado, a
campanha de Leads nasce com o mesmo defeito da de Vendas.
