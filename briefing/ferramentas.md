# Ferramentas e integrações

## Status de acesso a dados (última checagem: 2026-08-07)

| Fonte | Status | Observação |
|---|---|---|
| Meta Ads Manager / Business Suite | ❌ Não conectado | Não existe conector oficial da Meta no diretório da Anthropic. Recomendado: **Windsor.ai** (foco em ads, conecta Meta Ads entre 320+ fontes). Alternativa: Supermetrics. |
| Site `iesports.com.br` | ✅ Verificado publicamente | SPA, sem métricas de analytics acessíveis externamente. |
| Instagram `@iesportsbr` | ⚠️ Bloqueado por rate limit | Instagram limita acesso não autenticado a perfis. Repetir checagem manual ou via conector oficial do Instagram/Meta quando disponível. |
| Repositório `trafegopago` | ✅ Ativo | Usado como base de conhecimento e destino dos relatórios. |

## Como conectar o Windsor.ai (passo a passo para o cliente)

1. Acessar as configurações de conectores da conta Claude (claude.ai →
   Settings → Connectors, ou dentro do ambiente do Claude Code em
   Settings → Connectors).
2. Buscar por "Windsor.ai", clicar em conectar.
3. No fluxo do Windsor.ai, autorizar acesso à Meta Business Account / Ad
   Account (login do usuário com acesso ao Business Manager dos clubes).
4. Voltar nas configurações do conector e habilitá-lo **para este
   ambiente/sessão** do Claude Code (conectores ficam desligados por
   padrão em ambientes novos).
5. Confirmar aqui no chat — a partir daí o gestor de tráfego passa a puxar
   dados diretamente, sem necessidade de envio manual.

## Enquanto não há conector ativo

Dados podem ser enviados manualmente (export CSV, print, texto colado) e
devem ser salvos em `relatorios/insumos/` com data no nome do arquivo, para
manter histórico e permitir comparação período a período.
