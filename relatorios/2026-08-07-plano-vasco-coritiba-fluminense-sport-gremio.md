# Plano de Guerra — Vasco, Coritiba, Fluminense, Sport, Grêmio — 2026-08-07

> Fonte de dados: Meta Ads via Windsor.ai (conta "CA - IE Sports",
> `2508573272672867`). Relatório interativo completo (com specs de
> targeting, mockups de anúncio e checklist) publicado como Artifact —
> pedir o link se precisar de novo. Este arquivo é o registro textual
> pro histórico do repositório.

## 1. Visão geral dos 2 agentes

- **Tráfego pago:** a conta inteira ficou 2 dias completos (05 e 06/08)
  com gasto R$0 em todos os clubes simultaneamente. **Correção do
  diagnóstico inicial:** não era saldo esgotado — os prints do Ads
  Manager (07/08) mostram forma de pagamento válida, limite diário de
  R$5.649,57 e nenhum bloqueio de billing ativo. O alerta real
  encontrado foi da própria Meta: *"cobrança indevida em anúncios e
  mensagens"* sob investigação, marcada como **resolvida em 07/08**
  com reembolso de R$1,29. A leitura mais provável é que a Meta reteve
  a entrega da conta durante essa investigação de cobrança — não um
  problema de saldo do cliente. Gasto de 07/08 ainda baixo (R$0,22 até
  a checagem), mas dado do dia corrente é sempre parcial; acompanhar a
  entrega até o fim do dia/amanhã antes de escalar pro suporte da
  Meta.
- **Conversão do ecossistema:** das 3 mudanças aplicadas manualmente
  hoje no Vasco, 2 não surtiram o efeito esperado por limitações
  técnicas do Meta (lookalike % não é editável in-place; orçamento foi
  ajustado num público já pausado) — não por erro de execução, mas por
  desconhecimento de uma regra da plataforma. Documentado abaixo com
  correção.

## 2. Vasco (prioridade 1 — seletiva 16/08, 28/70 inscritos)

**Status das 3 mudanças de hoje:**
1. ❌ Lookalike "2-3%" não foi criado — Meta não permite editar a % de
   um público Semelhante existente, só recriar. O conjunto editado
   (13:33h) segue com o lookalike de 1% original, e a edição caiu
   dentro de `CAMPANHA TESTE - VASCO`, não na campanha principal
   `MV - VENDAS-VASCO`.
2. ⚠️ Orçamento da campanha principal seguiu em R$95/dia, sem alteração.
   `p2_estado_advantage` está pausado desde 28/07.
3. ✅ (por acaso) `p1-cidade-homens-interaçãoinsta` e
   `p4-RmktGeral-EstadoRJ` só existem em campanhas já pausadas desde
   nov/dez-2025 — pausar de novo não muda nada, mas também não há dano.

**Plano de ação (detalhado no Artifact):**
- Criar lookalike NOVO de 2% (público de origem "COMPRADORES VIAGENS
  GERAL"), duplicar o conjunto "MELHOR PUBLICO" com esse novo público,
  orçamento isolado de R$50-70/dia.
- Reativar `p2_estado_advantage` se o aumento de orçamento for pra
  valer.
- Adicionar pergunta de triagem financeira antes do Sympla (bot/
  WhatsApp) — ataca a raiz do problema de qualificação, não é mídia.

## 3. Coritiba (prioridade 2 — CPA R$192, pior retorno ativo)

- ✅ `abertofutebol — brasil` (pior público histórico) já está pausado
  na campanha ativa `MARIA [CORITIBA QUANTITATIVO]`.
- 🆕 Achado novo: anúncio `CORITIBA7` dentro do conjunto `REMKT
  CORITIBA` gastou R$124,24/30d sem 1 compra sequer — confirmado ativo
  em todos os níveis (campanha/conjunto/anúncio) antes de recomendar a
  pausa. **Ação pendente:** pausar manualmente (escrita via Windsor.ai
  está desabilitada — ver seção Ferramentas).
- Os 2 melhores públicos históricos (`p2_estado_homens_25mais_pais&
  futebol`, ROAS 3,30; `p3_cidade80km_homens_18a44_aberto`, ROAS 2,60)
  não existem mais na campanha ativa — precisam ser recriados como
  novos conjuntos (specs completas de targeting no Artifact).
- 🐛 Bug de criativo: o único anúncio convertendo hoje (`CORITIBA8 —
  Cópia`) usa emoji de bandeira errado (🇳🇬 Nigéria em vez de 🇺🇸 EUA) —
  correção de 1 minuto.

## 4. Fluminense (prioridade 3)

**Correção (2026-08-07, apontada pela cliente):** a primeira versão
deste relatório dizia "nenhuma campanha ativa há ~7 meses", baseado só
em campanhas com "FLUMINENSE" por extenso no nome — busca incompleta.
A partir de fev/2026 as campanhas passaram a usar a abreviação **"FLU"**
no nome, que não tinha sido capturada. Histórico real, mais recente
primeiro:
- `FLU BSB 31 DE MAIO` — criada 11/05/2026, pausada
- `MARIA - FLU [31/05]` — criada 06/05/2026, pausada
- `MARIA - FLU [01/03]` — criada 11/02/2026, pausada
- `MARIA - [FLUMINENSE 25/01]` — criada 08/01/2026, pausada

Ou seja: **teve campanha nova pelo menos em jan, fev/mar e mai/2026**,
não só em janeiro. O que continua verdadeiro mesmo com a correção:
nenhuma campanha de Fluminense foi criada em jun/jul/ago/2026, e todas
as anteriores — incluindo a de maio — estão **pausadas hoje**, o que
explica o R$0 de gasto nos últimos 30 dias.

### Plano de lançamento (pedido pela cliente: seletiva 30/08, meta 100 atletas, R$2.500)

**Decisão (versão final, pedida pela cliente como "a campanha que eu
montaria com toda minha capacidade"):** campanha nova, estrutura
**ABO** (orçamento por conjunto, não por campanha) e **4 públicos**, não
3 — inclui o ativo mais forte da conta inteira, não só o que o próprio
Fluminense já testou.

**Por que ABO:** com CBO o Meta empurra verba pro CPM mais barato, não
pro CPA mais barato — foi isso que estragou o Coritiba
(`abertofutebol — brasil` comeu orçamento por ser "barato de
alcançar"). Com ABO o orçamento de cada público é fixo, protegendo o
público qualificado de ser afogado pelo algoritmo.

**Achado-chave (copy):** dentro dos mesmos públicos, anúncios citando
o CT Vale das Laranjeiras/Xerém tiveram CPA R$48-55; a mesma audiência
com a copy do evento de Brasília teve CPA R$77-134 — até 2,8x pior. Uso
só o ângulo Xerém.

**Públicos (A é novo, nunca testado no Fluminense — os outros são
histórico comprovado):**
| Público | Fonte | CPA |
|---|---|---|
| A · Lookalike Compradores de Viagem ★ | LAL 1% de "COMPRADORES VIAGENS GERAL" — base real de ~8.000 clientes que já pagaram a viagem (mesmo ativo do melhor público do Vasco) | não testado no Flu — sinal mais forte da conta |
| B · ESTADO_PAIS_ALTOVALOR | Pais + preferência por bens de alto valor | ~R$55 (copy Xerém) |
| C · ESTADO_PAIS_VIAJANTES | Pais + viajante internacional frequente | ~R$48 (copy Xerém) |
| D · RMKT | Pageview/compradores Fluminense 180D + lookalikes | ~R$74, pool pequeno |

Descartados: públicos sem filtro de alto valor/viajante (CPA R$123) e
a estrutura de janeiro A1/A2/A3 (geo+interesse aberto, CPA R$2.400 —
pior já testada no clube).

**Orçamento (R$2.500, 07/08→29/08, ABO, parar de captar 2-3 dias antes do evento):**
- Fase 1 — aprendizado (07/08–13/08, 7d): R$90/dia = R$630 (A R$30 / B R$25 / C R$25 / D R$10)
- Fase 2 — escala (14/08–29/08, 16d): R$117/dia = R$1.870 (A R$45 / B R$40 / C R$25 / D R$7 — reforça o(s) vencedor(es) reais da Fase 1)

**Aviso de expectativa (importante):** no melhor CPA histórico
(R$48-60), R$2.500 entrega ~42-52 inscrições, **não 100**. Pra chegar
em 100 mantendo o perfil qualificado, o orçamento realista é ~R$5.000
(quase o dobro). Não inflei a projeção — se quiser garantir 100 de
qualquer forma, a válvula de escape é somar um público mais aberto
(geo+futebol, sem filtro de renda) nos últimos 7-10 dias pra puxar
volume, aceitando que uma fatia desses 100 venha com perfil mais fraco.

**Formato — matriz de teste:** ① foto real do CT (Vale das Laranjeiras,
atletas treinando) como principal desde o dia 1 — é o que já provou
funcionar (vídeo em maio teve <1% de engajamento, sinal de asset
fraco, não de formato ruim). ② vídeo vertical 15-20s com gancho nos 3s
testado em A/B a partir do dia 3-4. Depois de 4-5 dias, mantém só o
formato de CPA mais baixo — não roda os dois pra sempre "por garantia".

**Camada que a mídia sozinha não resolve:** pergunta de triagem
financeira antes do Sympla (bot/WhatsApp) — mesma recomendação do
Vasco. Sem isso, mesmo o público A (o mais qualificado que existe)
ainda traz gente que não fecha a viagem depois.

**Copy:** 3 variantes prontas (Lookalike Compradores, fria B/C,
remarketing D) — texto completo e specs de targeting no Artifact
publicado nesta sessão.

Pendência secundária: confirmar se o evento é mesmo em Xerém (CT Vale
das Laranjeiras) — a copy toda foi construída em cima dessa suposição
por ser o ângulo historicamente vencedor; se o local for outro, ajustar
o texto antes de publicar.

## 5. Sport (prioridade 4)

Mesma causa: nenhuma campanha ativa (`MARIA [SPORT QUANTITATIVO]`,
pausada há ~4,5 meses, 4 conjuntos prontos). Orçamento histórico
configurado em R$350/dia — bem acima do padrão dos outros clubes,
confirmar se foi intencional antes de reativar no mesmo valor. Mesma
pendência de decisão: há seletiva marcada?

## 6. Grêmio (prioridade 5 — sem pressão de data)

Confirmado o padrão dos últimos ~5 meses: pelo menos 6 reinícios de
campanha (18/01 → 21/09 → 19/10 → cópia → Seletivas → atual `GREMIO
[QUANTITATIVO]`), cada um perdendo o aprendizado de leilão acumulado.
Campanha atual está ativa mas muito recente (< R$85 gastos até agora).
Recomendação: **não duplicar de novo por 2-3 semanas**, deixar juntar
dados de verdade antes de qualquer novo recomeço. Grêmio segue sem
postagem orgânica — 100% dependente do tráfego pago.

## 7. Checklist do dia/amanhã (ordem de impacto)

- [ ] Confirmar amanhã que o gasto da conta voltou ao normal
      (~R$400+/dia total).
- [ ] Vasco: criar lookalike 2% novo + duplicar conjunto com orçamento
      isolado R$50-70/dia.
- [ ] Vasco: reativar `p2_estado_advantage` se for aumentar orçamento
      nele.
- [ ] Coritiba: pausar anúncio `CORITIBA7` no conjunto `REMKT
      CORITIBA`.
- [ ] Coritiba: corrigir emoji da bandeira no anúncio `CORITIBA8 —
      Cópia`.
- [ ] Coritiba: recriar os 2 públicos históricos com criativo novo.
- [ ] Fluminense/Sport: responder se há seletiva marcada nos próximos
      30-60 dias.
- [ ] Grêmio: não mexer, deixar campanha atual rodar 2-3 semanas.
- [ ] Habilitar ações de escrita no Windsor.ai (ver `ferramentas.md`)
      pra execução direta da próxima vez.

## Métricas-chave por conjunto citado (30 dias, onde aplicável)

| Clube | Item | Gasto | Compras | CPA |
|---|---|---|---|---|
| Vasco | MELHOR PUBLICO - 1% DOS VIAJANTES | R$207,71 | 3 | R$69,24 |
| Vasco | p1_cidade_advantage | R$96,49 | 1 | R$96,49 |
| Vasco | FUTEBOL + PAIS | R$74,80 | 0 | — |
| Vasco | RMKT VASCO | R$30,56 | 0 | — |
| Coritiba | CORITIBA8 — Cópia (Estado_homens_18mais_advantage) | R$144,27 | 3 | R$48,09 |
| Coritiba | CORITIBA7 (REMKT CORITIBA) — pausar | R$124,24 | 0 | — |
| Coritiba | CORITIBA12 — Cópia (abertofutebol, já pausado) | R$338,33 | 1 | R$338,33 |

*Janela: 31/07–04/08 (dados de 05-07/08 zerados pelo problema de saldo
da conta).*
