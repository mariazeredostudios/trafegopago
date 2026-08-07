# Ferramentas e integrações

## Status de acesso a dados (última checagem: 2026-08-07)

| Fonte | Status | Observação |
|---|---|---|
| Meta Ads AI Connector (oficial) | ❌ Não conectado ainda | Lançado pela Meta em beta aberto em 29/04/2026 — `https://mcp.facebook.com/ads`. Não aparece no diretório curado do Claude (é conector customizado por URL). Requer plano Claude Pro/Max. Ver passo a passo abaixo. |
| Windsor.ai / Supermetrics | Alternativa, não usada | Só faz sentido se o conector oficial da Meta não atender (ex.: precisar cruzar com Google/TikTok Ads no mesmo lugar). |
| Site `iesports.com.br` | ✅ Verificado publicamente | SPA, sem métricas de analytics acessíveis externamente. |
| Instagram `@iesportsbr` | ⚠️ Bloqueado por rate limit | Instagram limita acesso não autenticado a perfis. Repetir checagem manual ou via conector oficial do Instagram/Meta quando disponível. |
| Repositório `trafegopago` | ✅ Ativo | Usado como base de conhecimento e destino dos relatórios. |

## Como conectar o Meta Ads AI Connector oficial (passo a passo verificado)

⚠️ Não confundir com posts/carrosséis de infoprodutores mostrando telas de
"Meta Ads (MCP) — Oficial" no Claude Desktop com dados de exemplo — são
mockups de marketing, não o fluxo real. O caminho real, confirmado em
fontes independentes (ex. Jon Loomer Digital) em 2026-08-07:

1. Requisito: plano pago do Claude (**Pro ou Max** — conector customizado
   não está disponível no plano gratuito).
2. Em claude.ai, ir em **Customize** (ou Settings → Connectors → Add
   custom connector).
3. Nomear o conector (ex.: "Meta Ads iEsports") e colar a URL:
   `https://mcp.facebook.com/ads`.
4. Clicar em **Add** → abre o login da Meta/Facebook.
5. Selecionar o(s) portfólio(s) de negócio / conta(s) de anúncio dos
   clubes a liberar.
6. Numa conversa nova, clicar em **"+" → Connectors** e confirmar que está
   ativado para aquele chat.
7. Dentro do Claude Code (este ambiente), conectores de conta
   normalmente precisam ser habilitados também **por ambiente** — após
   conectar, avisar no chat para confirmação de que a ferramenta apareceu.

Detalhe de segurança do conector oficial: toda campanha criada via IA
nasce **pausada por padrão**, precisa de ativação manual — proteção
contra erro de automação.

## Enquanto não há conector ativo

Dados podem ser enviados manualmente (export CSV, print, texto colado) e
devem ser salvos em `relatorios/insumos/` com data no nome do arquivo, para
manter histórico e permitir comparação período a período.
