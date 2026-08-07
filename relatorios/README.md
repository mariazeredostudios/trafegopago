# Relatórios

Cada relatório executivo (Fase 3 do processo — ver `CLAUDE.md`) é salvo
neste diretório com o nome `AAAA-MM-DD-<clube>.md`, usando
`_template.md` como base.

- `insumos/` — dados brutos recebidos manualmente do cliente (CSV, prints,
  textos colados) enquanto não há conector de dados ativo. Nomear os
  arquivos com data e clube, ex.: `2026-08-07-gremio-export.csv`.

Assim que o conector Meta Ads estiver ativo (ver
`../briefing/ferramentas.md`), os relatórios passam a ser gerados
diretamente a partir dos dados puxados da conta, sem depender de upload
manual.
