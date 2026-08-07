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

⏳ **Bloqueado** aguardando a conexão do Meta Ads AI Connector oficial
(`https://mcp.facebook.com/ads`) — ver `briefing/ferramentas.md`. A
automação (Routine agendada) só é criada depois que o gestor confirmar,
numa sessão ativa, que consegue ler dados reais da conta pelo conector.

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
