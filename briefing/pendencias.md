# Pendências em aberto

Lista viva de itens que dependem de resposta ou ação do cliente. Marcar
como resolvido (~~riscado~~) quando confirmado, não apagar (mantém
histórico de decisão).

## Aguardando o cliente

- [ ] **Fase 1, pergunta 5 incompleta:** a resposta sobre divisão de
      orçamento entre etapas do funil foi cortada em "não divido o...".
      Precisamos entender: o orçamento é hoje 100% em conversão/fundo de
      funil, ou há verba separada para topo (alcance/engajamento) e
      remarketing?
- [ ] **CPA/ROAS-alvo oficial:** validar o cálculo proposto em
      `briefing/negocio.md` (R$26,67 por inscrição) como teto operacional,
      ou fornecer um número diferente.
- [ ] **Acesso à conta de anúncios:** conectar um conector de dados (ver
      abaixo) para leitura automática da Meta Ads Manager.
- [ ] **Histórico de testes (Fase 1, pergunta 3):** cliente indicou que "há
      muita coisa" testada e que cabe ao gestor analisar — isso só é
      possível com acesso à conta (histórico de campanhas/públicos/
      criativos), listado acima.

## Auditoria técnica a fazer assim que houver acesso à conta

- [ ] Confirmar que **nenhuma campanha ativa, bio do Instagram ou UTM**
      aponta para o domínio `iesports.com` (sem `.br`), que está parado
      numa página de revenda da GoDaddy. O domínio correto e ativo é
      `iesports.com.br`.
- [ ] Mapear, por clube, se a página de Sympla e o link
      `iesports.com.br/atendimento` têm rastreamento de UTM próprio (para
      permitir CPA por clube/campanha e não só por conta agregada).

## Conector de dados (Meta Ads)

- [ ] Cliente vai conectar **Windsor.ai** (ou Supermetrics) nas
      configurações de conectores do Claude e habilitar para este
      ambiente. Status: **não conectado** em 2026-08-07 — ver
      `briefing/ferramentas.md`.
