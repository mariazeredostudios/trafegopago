# trafegopago

Base de conhecimento e repositório de relatórios do trabalho de gestão de
tráfego pago (Meta Ads) das seletivas internacionais da iEsports
(`iesports.com.br`).

- **`CLAUDE.md`** — persona e instruções que qualquer sessão de IA deve
  seguir ao trabalhar neste repositório (carregado automaticamente pelo
  Claude Code).
- **`briefing/`** — contexto de negócio, pendências e status das
  integrações de dados.
- **`clubes/`** — informações por clube parceiro.
- **`relatorios/`** — relatórios executivos diários/periódicos e dados
  brutos recebidos (`relatorios/insumos/`).
- **`plataforma/`** — app próprio (Next.js + Supabase + Resend), gratuito,
  que organiza as demandas mensais da equipe: quadro por status,
  checklist por demanda, virada de mês automática, e-mail quando alguém
  conclui uma demanda, resumo diário (16h) e semanal (segunda de manhã).
  Guia de deploy completo em `plataforma/README.md`.
- **`.github/workflows/`** — cron jobs gratuitos (GitHub Actions) que
  disparam os resumos diário e semanal da plataforma.
