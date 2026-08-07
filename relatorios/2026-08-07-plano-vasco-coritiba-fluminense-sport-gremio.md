# Plano de Guerra — Vasco, Coritiba, Fluminense, Sport, Grêmio — 2026-08-07

> Fonte de dados: Meta Ads via Windsor.ai (conta "CA - IE Sports",
> `2508573272672867`). Relatório interativo completo (com specs de
> targeting, mockups de anúncio e checklist) publicado como Artifact —
> pedir o link se precisar de novo. Este arquivo é o registro textual
> pro histórico do repositório.

## 1. Visão geral dos 2 agentes

- **Tráfego pago:** a conta inteira ficou 3 dias (05, 06 e 07/08) com
  gasto ~R$0 em todos os clubes simultaneamente — causa raiz: saldo da
  conta esgotado (`account_balance` retornado pela API em R$0,03),
  cliente confirmou e já recolocou saldo. Entrega deve normalizar em
  algumas horas; confirmar amanhã.
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

Causa do R$0 de gasto: **nenhuma campanha ativa há ~7 meses**
(`MARIA - [FLUMINENSE 25/01]`, pausada, estruturalmente intacta com 4
conjuntos prontos, orçamento configurado em R$200/dia). Pendente de
decisão do cliente: há seletiva marcada nos próximos 30-60 dias? Se
sim, reativar com orçamento revisado (sugestão R$95/dia inicial).

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
