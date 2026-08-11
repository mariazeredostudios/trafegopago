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

- [x] Domínio `iesports.com` (sem `.br`) confirmado pelo cliente como
      **nunca usado** em campanha/bio — não é risco real, foi engano de
      digitação na conversa. Domínio correto e único em uso:
      `iesports.com.br`. Item fechado em 2026-08-07.
- [ ] Mapear, por clube, se a página de Sympla e o link
      `iesports.com.br/atendimento` têm rastreamento de UTM próprio (para
      permitir CPA por clube/campanha e não só por conta agregada).

## Auditoria 360º (Comitê de Growth — Agente 2)

- [ ] **Link(s) do Sympla** — nunca foram enviados. Precisa de pelo menos
      um link de seletiva ativa (idealmente um por clube) pra auditar
      capa, descrição, lotes e alinhamento de mensagem.
- [ ] **Política de lotes** — não sabemos se o ingresso de R$100 sobe de
      preço por lote (gatilho de escassez) ou é fixo.
- [ ] **Meta total de vendas/inscritos por evento** — usamos "90+" como
      referência do onboarding anterior; confirmar se segue valendo como
      meta oficial do comitê.
- [ ] **Prints do Instagram** (perfil, bio, destaques, posts/Reels
      recentes) — acesso automático está bloqueado por rate limit da
      Meta (ver `comite-growth.md`).
- [ ] **Histórico detalhado de posts/anúncios/páginas** — o que já
      funcionou muito bem e o que não devemos repetir, agora sob a ótica
      de CRO/copy (não só de mídia).

## Equipe e plataforma de demandas (aberto em 2026-08-11)

- [x] Quem edita o link da bio e o botão do site de cada clube: **o
      Gabriel.** Confirmado pela diretora em 2026-08-11 — atualizado em
      `briefing/equipe.md` e no agente `.claude/agents/estrategia-copy.md`.
- [x] Por que o Monday.com foi abandonado da primeira vez: **não foi
      problema da ferramenta — foi falta de posicionamento da diretora**
      (uso/cobrança não sustentada, palavras dela). Confirmado em
      2026-08-11. Implicação prática: o risco real para a plataforma nova
      não é técnico, é de adoção — vale reforçar o hábito (reunião de
      segunda cobrando o quadro, checklist sendo realmente marcado) mais
      do que escolher a ferramenta "certa".
- [ ] `clubes/checklist-personalizacao.md` — preencher e-mail marketing,
      arte de WhatsApp de desconto, app próprio e collab por clube (só
      Grêmio confirmado até agora, como sem postagem orgânica).
- [x] Diretora decidiu (2026-08-11) reconstruir a plataforma no
      **Lovable** em vez de seguir o passo a passo manual
      Vercel/Supabase/Resend/GitHub Actions — ver
      `plataforma/lovable-prompt.md`.
- [ ] Deploy no Lovable: criar conta Lovable, clicar em "Connect
      Supabase", colar as 3 mensagens de `plataforma/lovable-prompt.md`,
      convidar os 6 e-mails reais no Supabase provisionado pelo Lovable,
      clicar em Publish.

## Conector de dados (Meta Ads)

- [ ] Cliente vai conectar **Windsor.ai** (ou Supermetrics) nas
      configurações de conectores do Claude e habilitar para este
      ambiente. Status: **não conectado** em 2026-08-07 — ver
      `briefing/ferramentas.md`.
