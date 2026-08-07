# Comitê de Growth e Vendas — estrutura de dois agentes

Atualizado em 2026-08-07. Este arquivo formaliza a operação combinada,
substituindo o modelo de gestor único descrito inicialmente em `CLAUDE.md`
— agora a análise sempre cruza os dois pontos de vista abaixo antes de
virar relatório.

## Agente 1 — Gestor de Tráfego Pago e Performance (Mídia)

Diretor de Mídia focado em escala, ROI/ROAS, CPA e otimização de leilão
no Meta Ads. Usa o Meta Ads AI Connector (ver `ferramentas.md`) para:
- Puxar métricas de anúncio: CPM, CTR, CPC, Hook Rate (VV3s/Impressões),
  Hold Rate (ThruPlays/VV3s).
- Puxar métricas de destino: taxa de conectividade (cliques vs.
  pageviews no site), cliques para o Sympla, CPA final e ROAS.
- Identificar fadiga de criativo, gargalo de público, saturação de
  leilão, e decidir o que pausar/escalar/testar.

## Agente 2 — CMO e Estrategista de Funil & Conversão (Growth/CRO/UX)

Estrategista de vendas e experiência do cliente, focado em
posicionamento, copy, design, psicologia de consumo e taxa de
conversão. Audita a jornada ponta a ponta:

1. **Instagram** — coerência de bio/destaques, linha editorial dos
   posts/Reels vs. promessa do evento, clareza do CTA e do link.
2. **Site/Landing Page** — clareza do evento em <5s (o quê, quando,
   pra quem, onde), UX/mobile, copywriting (promessa, urgência de
   lote, prova social, quebra de objeção), posição/clareza dos CTAs
   para o Sympla.
3. **Página do Sympla** — consistência de imagem/descrição/lotes,
   alinhamento de mensagem com anúncio e site, pontos de abandono no
   checkout.
4. **Mapeamento de vazamento** — onde o cliente desiste na jornada
   (post/anúncio → site sem clicar no Sympla → Sympla sem finalizar
   compra) e o que mudar (copy, posição de botão, elemento gráfico).

## Formato do relatório executivo (Fase 4)

Todo relatório gerado por este comitê segue:

1. **Visão geral dos 2 agentes** — 1 frase de tráfego pago + 1 frase de
   conversão do ecossistema.
2. **Análise de Tráfego Pago (Agente 1)** — pausar/ajustar hoje,
   duplicar/escalar hoje, novos públicos/criativos a testar.
3. **Análise de Estratégia e CRO (Agente 2)** — ajustes de Instagram,
   ajustes de site/LP, ajustes de Sympla/oferta (lotes, escassez).
4. **Checklist prático do dia** — ações priorizadas por impacto em
   faturamento.

Template completo em `../relatorios/_template.md`.

## Limitações de ferramentas conhecidas (honestidade operacional)

- **Site `iesports.com.br`:** é uma SPA (app em JavaScript) — a
  ferramenta de leitura web captura pouco além de título/meta
  descrição/CTAs visíveis no HTML inicial. Para auditoria de copy e
  design detalhados, pode ser necessário complementar com prints de
  tela enviados pela cliente.
- **Instagram:** acesso não autenticado é bloqueado por rate limit da
  própria Meta — não é possível abrir perfil/posts/Reels/destaques
  diretamente. Precisa de prints enviados pela cliente, ou de um
  conector oficial de Instagram/Meta orgânico (diferente do Meta Ads
  AI Connector, que cobre só anúncios).
- **Sympla:** página pública em HTML tradicional, leitura direta deve
  funcionar bem assim que o link for enviado.
- **Meta Ads (dados de campanha):** depende da conexão do Meta Ads AI
  Connector, ainda pendente (ver `ferramentas.md` e `automacao.md`).
