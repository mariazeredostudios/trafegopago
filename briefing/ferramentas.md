# Ferramentas e integrações

## Status de acesso a dados (última checagem: 2026-08-07)

| Fonte | Status | Observação |
|---|---|---|
| Meta Ads AI Connector (oficial) | 🟡 Conectado, mas bloqueado em 2 camadas | Autorizado em 2026-08-07. Funciona no claude.ai comum, mas conta real (`CA - IE Sports`) ainda sem Ads MCP liberado pela Meta (rollout gradual) **e** ferramentas não aparecem dentro do Claude Code. Detalhamento completo abaixo. |
| Windsor.ai | ✅ Conectado e **funcionando dentro do Claude Code** | Testado com sucesso em 2026-08-07 — puxou dados reais da conta "CA - IE Sports" (14 campanhas, 30 dias). É o caminho de dados reais em produção enquanto o Meta Ads AI Connector oficial fica bloqueado. |
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

## Status real, testado em 2026-08-07 (após autorização concluída)

O conector **"META IESPORTS"** aparece como conectado e habilitado na
conta. Testado de duas formas, com dois resultados diferentes:

**1. Direto no claude.ai (chat comum, fora do Claude Code):** funcionou.
Conseguiu listar as contas de anúncio:
- Conta `2189446804604656` — sem nome/negócio associado, sem forma de
  pagamento cadastrada. **Não operacional** (sem forma de pagamento, o
  Meta não deixa rodar anúncio). Pode ser ignorada.
- Conta `2508573272672867` ("CA - IE Sports") — negócio "IE Sports",
  moeda BRL, com forma de pagamento. **Essa é a conta real.** Porém:
  retornou que o **Ads MCP ainda não está habilitado para essa conta
  especificamente** — mensagem de rollout gradual do lado da Meta, sem
  toggle manual, sem chamado de suporte que acelere. Só esperar a
  liberação.

**2. Dentro do Claude Code (este ambiente/sessão):** **não funcionou.**
Mesmo com o conector marcado como `connected: true` e
`enabledInChat: true`, nenhuma ferramenta de dados (contas, campanhas,
insights) apareceu disponível para uso — testado com múltiplas buscas
de ferramenta, sem sucesso. Ou seja: existe uma segunda trava,
independente da trava de rollout da Meta — o Claude Code pode não
carregar as ferramentas de conectores customizados (`Add custom
connector`) da mesma forma que o claude.ai chat comum carrega.

**Implicação prática:** mesmo quando a Meta liberar o Ads MCP para a
conta "CA - IE Sports", ainda não está confirmado que as ferramentas
vão aparecer aqui dentro do Claude Code — o que afeta diretamente o
plano de automação diária (`automacao.md`), que depende de rodar
dentro deste ambiente. Precisa reteste assim que a conta for liberada.

**Plano B confirmado funcionando (2026-08-07):** conectado o Windsor.ai
(conta Trial, `dudsazeredo2014@gmail.com`) — diferente do Meta Ads AI
Connector oficial, **as ferramentas dele aparecem e funcionam dentro do
Claude Code**. Fluxo de conexão: 1) criar conta no windsor.ai, 2) usar
`get_connector_connect_info` (tool `mcp__Windsor_ai__*`) pra gerar link
de autorização do Facebook/Meta Ads, 3) cliente autoriza, 4)
`get_connectors` confirma a conta vinculada. Testado com
`get_data`/`get_fields` puxando 30 dias de dados reais de 14 campanhas
da conta "CA - IE Sports" — primeiro relatório real gerado em
`relatorios/2026-08-07-visao-geral-conta.md`. **Este é agora o caminho
de dados em produção** enquanto o conector oficial da Meta segue
bloqueado pelo rollout.

**Reteste em 2026-08-07 (mesmo dia):** confirmado de novo no claude.ai
comum — conta "CA - IE Sports" (`2508573272672867`) segue com Ads MCP
não habilitado, mensagem da Meta: *"check back at a later date"*. Sem
prazo estimado. Configurado lembrete recorrente (ver `automacao.md`)
pra não depender da cliente lembrar de checar sozinha.

**Reteste em 2026-08-07 (dentro do Claude Code, pergunta "voltou o
toggle?"):** chamei `ads_get_ad_accounts` diretamente nesta sessão do
Claude Code e a ferramenta **respondeu com dados reais** — a segunda
trava (ferramentas do conector não aparecendo dentro do Claude Code)
**está resolvida**. Resultado por conta:
- `2189446804604656` (sem nome/negócio, sem forma de pagamento) →
  `is_ads_mcp_enabled: true`, mas continua não operacional (sem forma
  de pagamento). Ignorar.
- `2508573272672867` ("CA - IE Sports", negócio "IE Sports", BRL, com
  forma de pagamento) → **`is_ads_mcp_enabled: false`**. Motivo
  retornado pela API: *"Ads MCP is gradually being rolled out. Please
  check back at a later date to use Ads MCP with this Ad Account."*
  Ou seja: **o toggle da conta real ainda não voltou** — mas o caminho
  técnico para usá-lo dentro do Claude Code assim que a Meta liberar
  já está desbloqueado, o que simplifica o plano de automação
  (`automacao.md`).

## Roadmap de potencialização (avaliado em 2026-08-07)

| Item | Prioridade | Status | Observação |
|---|---|---|---|
| Meta Ads AI Connector oficial | 1 | 🟡 Autorizado, mas bloqueado (ver seção "Status real" acima) | Motor de dados do Agente 1. |
| Motion Creative Analytics (connector) | 2 | 💡 Sugerido, não conectado | Analisa fadiga de criativo + biblioteca de anúncios de concorrentes. Complementa o Meta Ads Connector para o Agente 1. |
| Chromium headless neste ambiente (screenshots automáticos de site/Sympla) | 3 | 🟡 Parcialmente destravado | **Atualização 2026-08-07:** o erro de certificado (`ERR_CERT_DATE_INVALID`) tem solução — a CA do proxy do agente (`/etc/ssl/certs/ccr-agent-proxy.pem`) já está no bundle do sistema, mas o Chromium usa seu próprio Chrome Root Store, não o do sistema. Fix: calcular o SPKI hash da CA (`openssl x509 -in ccr-agent-proxy.pem -pubkey -noout \| openssl pkey -pubin -outform der \| openssl dgst -sha256 -binary \| openssl enc -base64`) e passar via `--ignore-certificate-errors-spki-list=<hash>` no `launch()` do Playwright — confia só nesse certificado específico, não desabilita verificação geral. Com isso o handshake TLS funciona. **Mas surge um bloqueio novo:** o Sympla (Cloudflare + Queue-it) reseta a conexão pra tráfego identificado como headless/bot (`ERR_CONNECTION_RESET`), independente do certificado. Não tentei mascarar fingerprint de navegador pra contornar isso — seria driblar ativamente a proteção anti-bot de um parceiro do cliente. Caminho prático enquanto isso: prints de tela enviados pela cliente. |
| Link(s) do Sympla | Alta (manual) | ⏳ Pendente do cliente | Sem conector oficial de Sympla no diretório. Leitura pública direta deve funcionar assim que o link chegar. |
| Export CSV do painel organizador do Sympla (funil de checkout/abandono) | Média (manual) | 💡 Sugerido | Sem conector — mas dá dado real de abandono de carrinho em vez de inferência pela página pública. |
| Instagram orgânico (bio/posts/Reels/destaques) | Média (manual) | 🔴 Sem conector viável | Instagram bloqueia leitura não autenticada por rate limit. Só via prints enviados pela cliente. |
| Google Analytics 4 / Pixel do site | Baixa | 💡 A avaliar | Sem conector pronto no diretório hoje. Só relevante se o site já tiver GA4 instalado — a confirmar com o cliente. |
| Windsor.ai / Supermetrics | Baixa | Não necessário agora | Só faria sentido se precisássemos cruzar com Google/TikTok Ads no mesmo lugar no futuro. |

## Windsor.ai — escrita desabilitada no nível da conta/equipe (2026-08-07)

Testado hoje: `execute_action` (conector `facebook`) retorna erro
`Write actions are disabled. Please enable them at
https://onboard.windsor.ai/app/team-management` — mesmo com a ação
disponível em `list_actions` e com a cadeia campanha/conjunto/anúncio
confirmada como ativa antes da tentativa. Ou seja, **leitura funciona
plenamente, escrita está bloqueada por uma configuração de equipe no
painel do Windsor.ai**, não por permissão do Meta. Pendência: cliente
(ou quem administra a conta Windsor.ai) precisa habilitar ações de
escrita em `onboard.windsor.ai/app/team-management` pra eu poder
executar pausas/ajustes de orçamento direto, em vez de entregar plano
manual pro cliente aplicar no Ads Manager.

## Enquanto não há conector ativo

Dados podem ser enviados manualmente (export CSV, print, texto colado) e
devem ser salvos em `relatorios/insumos/` com data no nome do arquivo, para
manter histórico e permitir comparação período a período.
