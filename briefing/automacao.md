# Automação dos relatórios diários

## Configuração acordada com o cliente (2026-08-07)

- **Frequência:** 2x por dia, todos os dias.
- **Horários:** 10h e 18h (horário de Brasília, `America/Sao_Paulo`,
  UTC-3 — assumido pela localização do negócio; confirmar se o cliente
  estiver em outro fuso).
- **Notificação:** push no celular **e** e-mail assim que cada relatório
  ficar pronto, sem precisar abrir o chat.
- **Formato:** relatório executivo completo (Fase 3 — diagnóstico do dia,
  alertas vermelhos, oportunidades de escala, checklist de ação),
  salvo em `relatorios/AAAA-MM-DD-HHh.md` e commitado neste repositório.

## Status

⏳ **Bloqueado** — atualizado em 2026-08-07 após teste real. A conexão
foi feita, mas há duas travas a resolver antes de criar as Routines (ver
`briefing/ferramentas.md`, seção "Status real, testado em 2026-08-07"):

1. A conta de anúncio real (`CA - IE Sports`) ainda não tem o Ads MCP
   liberado pela Meta (rollout gradual, sem controle manual).
2. Mesmo quando liberado pela Meta, ainda não está confirmado que as
   ferramentas do conector aparecem **dentro do Claude Code** (só foram
   testadas com sucesso no claude.ai comum) — e a automação por Routine
   depende de rodar neste ambiente.

Enquanto isso não resolve, a automação diária (10h/18h) não pode ser
criada de verdade. Se a trava 2 se confirmar permanente, o desenho da
automação pode precisar mudar (ex.: gerar o relatório a partir de dados
que a cliente copia do chat do claude.ai, em vez de eu puxar sozinha).

## Lembrete recorrente de checagem (criado em 2026-08-07)

Como a Meta não dá prazo pro rollout ("check back at a later date"),
configurei um lembrete automático nesta sessão do Claude Code pra
perguntar à cliente de tempos em tempos se a conta "CA - IE Sports" já
foi liberada — assim ela não precisa ficar lembrando sozinha. Cadência
inicial: a cada 3 dias. Ajustável a qualquer momento.

## Como a automação vai funcionar (mecanismo técnico)

Duas Routines agendadas (cron), uma para 10h e outra para 18h
(`America/Sao_Paulo`), cada uma:
1. Sobe uma sessão nova neste ambiente/repositório (carrega `CLAUDE.md`
   e todo o briefing automaticamente).
2. Usa o Meta Ads AI Connector para puxar dados atualizados de todas as
   contas/clubes.
3. Roda a análise de funil (Fase 2) e gera o relatório executivo
   (Fase 3), por clube quando fizer sentido.
4. Salva em `relatorios/`, commita e faz push.
5. Dispara notificação push + e-mail avisando que o relatório está
   pronto.

## Pendência para ativar

- [ ] Cliente conectar e habilitar o Meta Ads AI Connector nesta sessão.
- [ ] Gestor confirmar leitura real de dados (teste: listar contas,
      campanhas ativas).
- [ ] Criar as duas Routines (10h e 18h) com o conector concedido a cada
      execução.
