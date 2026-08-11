# Como construir a mesma plataforma no Lovable (caminho mais simples)

Aviso importante antes de tudo: eu não tenho integração direta com o
Lovable nesta sessão (não é uma das ferramentas conectadas aqui), então
não consigo clicar nos botões lá por você. O que fiz foi escrever os
prompts prontos para você colar — o trabalho manual cai de "criar 4
contas e copiar variável de ambiente uma por uma" (o `plataforma/README.md`
que fiz antes) para, no Lovable: **criar 1 conta, clicar em "Connect
Supabase", colar 3 mensagens de chat, clicar em Publish.** Ainda existe
alguma conta pra criar (Lovable e Supabase são gratuitos no seu volume;
Resend também, se quiser e-mail de verdade) — isso não tem como sumir
100%, mas o passo a passo manual de configuração praticamente some porque
o próprio Lovable faz a conexão com o Supabase por você.

O código que já deixei em `plataforma/` (Next.js) continua no repositório
funcionando e testado, caso um dia vocês queiram trocar de novo ou dar
esse projeto pra um programador tocar — mas o caminho ativo agora é este
guia.

## Passo 1 — Criar o projeto

1. Entrar em [lovable.dev](https://lovable.dev) e criar conta (dá pra
   entrar com o Google).
2. **New Project**.
3. No canto do chat, clicar em **Connect Supabase** (ícone do
   Supabase) e autorizar — o Lovable cria e liga um projeto Supabase
   novo sozinho, sem você precisar abrir o painel do Supabase.
4. Colar a **Mensagem 1** abaixo no chat do Lovable e enviar.

---

## Mensagem 1 — construir o app

```
Quero um app web interno para minha equipe de marketing esportivo (6
pessoas) organizar demandas mensais, em português do Brasil.

CONTEXTO DO NEGÓCIO
Empresa de seletivas de futebol de base (iEsports) em clubes brasileiros
(Cruzeiro, Fluminense, Santos, Bahia, Sport, ABC, Palmeiras, Grêmio,
Coritiba, Vasco, Botafogo) — 11 seletivas por mês, uma por clube, sempre
aos domingos.

EQUIPE E FUNÇÕES (login individual por e-mail/senha, via Supabase Auth)
- Maria — Gestão de Tráfego Pago / Diretora (papel: gestao_trafego)
- Anna Clara — Criativos/Design/Vídeo (papel: criativos)
- Victor Hugo — Criativos/Design/Vídeo (papel: criativos)
- Prime — Sympla & Publicação social (papel: publicacao_sympla)
- Gabriel — Estratégia & Copy (papel: estrategia_copy)
- Ana Júlia — Atendimento (papel: atendimento)

Só quem tem papel "gestao_trafego" pode: editar a tela de Clubes e rodar
a rotina "Virar o mês". Todo mundo pode ver e editar demandas.

TELAS
1. Login (e-mail/senha).
2. Quadro — visão Kanban por status (A Fazer, Em Andamento, Em Revisão,
   Concluído), com filtro por mês, por clube e por responsável. Cada
   cartão mostra título, clube, tipo, responsável, prazo e progresso do
   checklist (ex.: 3/5). Clicar no cartão abre um painel de detalhe com:
   descrição, seletor de status, seletor de responsável, prioridade,
   prazo, e uma checklist de subitens marcáveis. Botão "+ Nova demanda"
   para criar demanda avulsa a qualquer momento. Botão "Virar o mês"
   (só visível para gestao_trafego) que leva para a tela 4.
3. Clubes — tabela com os 11 clubes e checkboxes: sem_organico,
   tem_collab_clube, tem_email_marketing, tem_whatsapp_desconto,
   tem_app. Só gestao_trafego edita; os outros só visualizam.
4. Virar o mês — formulário onde a gestão de tráfego pago preenche a
   data (um domingo) da seletiva de cada clube naquele mês e clica em
   "Gerar demandas do mês". Isso cria automaticamente as demandas
   recorrentes do mês para cada clube (ver TEMPLATES DE DEMANDA abaixo),
   pulando o que já existe se rodar de novo (idempotente).
5. Relatórios — lista dos resumos diário e semanal já gerados (ver
   AUTOMAÇÕES), com data e conteúdo.

TEMPLATES DE DEMANDA (usados pela rotina "Virar o mês", por clube, todo
mês, com prazo = data da seletiva + N dias)
- 2 a 3 vídeos (feed + 1080x1080 + story) — responsável: criativos, +1
  dia, checklist: roteiro aprovado / gravação-seleção / edição /
  exportar feed / exportar 1080x1080 / exportar story / enviar para
  aprovação da Maria.
- 1 carrossel (mesmas 3 proporções) — responsável: criativos, +1 dia.
- 1 arte estática (mesmas 3 proporções) — responsável: criativos, +1 dia.
- Criar evento no Sympla — responsável: publicacao_sympla, +0 dias
  (mesmo dia da seletiva).
- Ajustar link da bio (iesports.com.br/atendimento) e botão do site do
  clube apontando pro Sympla do mês — responsável: estrategia_copy, +0
  dias.
- Calendário de postagem do mês (imagem, copy, ação, dia, hora) —
  responsável: estrategia_copy, +1 dia.
- Publicar no Instagram + replicar em Threads/TikTok/Shorts, mínimo 2
  posts orgânicos no mês — responsável: publicacao_sympla, +2 dias — MAS
  pular esse item inteiro se o clube tiver sem_organico = true.
- E-mail marketing — responsável: estrategia_copy, +1 dia — só gerar se
  o clube tiver tem_email_marketing = true.
- Arte de WhatsApp de desconto para escolinhas — responsável: criativos,
  +1 dia — só gerar se tem_whatsapp_desconto = true.
- Material do app do clube — responsável: estrategia_copy, +2 dias — só
  gerar se tem_app = true.
- Subir tráfego pago no Meta Ads a partir do material aprovado no Drive
  — responsável: gestao_trafego, +1 dia.

VISUAL
Paleta verde-gramado (#1F6E4A como cor de destaque), fundo neutro claro
(#F5F4EF), com suporte a modo escuro. Nada de gradiente roxo/azul
genérico — quero uma cara de "quadro tático/gramado", discreta,
profissional, não infantilizada (o público final da empresa são pais de
atleta, mas essa tela é só para a equipe interna).

Não implemente e-mail/automação ainda — só o CRUD e as telas. Isso vem
na próxima mensagem depois que a base estiver funcionando.
```

## Passo 2 — depois que o Lovable terminar a Mensagem 1

Testar: logar, criar uma demanda manual, marcar checklist, rodar "Virar
o mês" com uma data de teste. Se algo vier errado, é só descrever o
problema pro Lovable no chat ("o checklist não está salvando", etc.) —
ele ajusta.

Também: como o Lovable já provisionou um Supabase de verdade, dá pra
abrir o painel do Supabase dele (link aparece nas configurações do
projeto Lovable) e usar direto os arquivos que eu já deixei prontos em
`plataforma/supabase/migrations/0001_init.sql` e
`plataforma/supabase/seed.sql` como referência, caso o Lovable não tenha
seguido o modelo de dados à risca — copiar e colar esse SQL no SQL
Editor do Supabase dele resolve rápido (mas troque os e-mails de exemplo
do `seed.sql` pelos e-mails reais da equipe antes, e convide os 6 em
**Authentication → Users → Invite** dentro desse mesmo painel Supabase).

## Mensagem 2 — ligar o e-mail de aviso de conclusão

```
Agora quero automação de e-mail, usando Resend (tenho conta grátis em
resend.com, já vou colar a API key quando você pedir).

1. Toda vez que uma demanda mudar de status para "Concluído", disparar
   um e-mail para a Maria (e-mail da pessoa com papel gestao_trafego)
   avisando: quem concluiu, o título da demanda, o clube e o tipo.
   Implemente isso como uma Supabase Edge Function chamada
   "notificar-conclusao", chamada por um trigger de banco (database
   webhook) na tabela de demandas quando o campo status mudar para
   'concluido'.
2. Peça a chave RESEND_API_KEY como secret da Edge Function (não deixe
   hardcoded) e use um remetente tipo "Plataforma iEsports
   <plataforma@iesports.com.br>" (se o domínio não estiver verificado no
   Resend ainda, use o remetente de teste do Resend por enquanto).
```

## Mensagem 3 — resumo diário (16h) e semanal (segunda de manhã)

```
Agora quero dois resumos automáticos por e-mail, também via Resend,
usando Supabase Edge Functions + Supabase Cron (pg_cron):

1. "resumo-diario": todo dia às 16h no fuso America/Sao_Paulo (UTC-3 o
   ano inteiro, o Brasil não tem mais horário de verão), busca todas as
   demandas com status = concluído e concluido_em dentro do dia de hoje,
   agrupa por responsável, e manda um e-mail para a Maria com a lista.
   Salvar uma cópia desse resumo numa tabela "resumos" (tipo='diario',
   referencia=data, conteudo).
2. "resumo-semanal": toda segunda-feira às 7h no mesmo fuso, busca as
   demandas concluídas nos últimos 7 dias, lista por pessoa/clube/data
   de conclusão, manda por e-mail pra Maria, e salva em "resumos"
   (tipo='semanal').
3. Registre os dois como cron jobs do Supabase (pg_cron) chamando essas
   Edge Functions nos horários acima, convertendo corretamente para UTC
   (16h BRT = 19h UTC; segunda 7h BRT = segunda 10h UTC).
4. A tela de Relatórios do app deve listar o conteúdo salvo na tabela
   "resumos", mais recente primeiro.
```

## Passo 3 — publicar

No Lovable, clicar em **Publish** (canto superior direito) — ele gera a
URL pública sozinho, sem precisar de Vercel. Depois é só mandar essa URL
e a senha de cada um dos 6 e-mails convidados no Supabase para a equipe.

## Mensagem 4 (futura) — chat por função com os agentes auxiliares

Decisão da diretora em 2026-08-11: depois que as Mensagens 1-3 estiverem
rodando, ela quer uma aba de chat dentro do próprio app — cada pessoa
loga e já cai automaticamente no agente da própria função (Anna
Clara/Victor Hugo → `criativos`, Prime → `sympla-publicacao`, Gabriel →
`estrategia-copy`, Ana Júlia → `atendimento`), sem precisar saber que
"agente" existe por trás.

- **Modelo escolhido:** Claude Opus 5 (`claude-opus-5`) — mais capaz,
  US$5/US$25 por milhão de tokens de entrada/saída.
- **Arquitetura:** Supabase Edge Function chamando a API da Claude com o
  system prompt de cada função (mesmo conteúdo já escrito em
  `.claude/agents/*.md` neste repositório), roteado pela `funcao` da
  pessoa logada. Personas guardadas numa tabela `agent_personas` editável
  sem precisar redeployar.
- **Custo real, fora do "de graça" combinado até aqui:** precisa de uma
  chave de API da Anthropic em `console.anthropic.com` (conta separada
  da assinatura do Claude usada para conversar), com cartão cadastrado —
  cobrança por token usado no chat. Tende a ficar em poucos dólares/mês
  no volume desta equipe, mas não é zero.

Peça pra eu escrever o texto completo da Mensagem 4 quando chegar nessa
etapa.

## ⚠️ Reformulação grande — decisão da diretora em 2026-08-11

Depois de ver a base rodando, a diretora pediu uma mudança de direção
importante, que **substitui as Mensagens 2, 3 e 4 acima** (o app não vai
mais ter login, nem e-mail de aviso por enquanto, nem chat com agentes —
isso pode voltar depois, mas não é a prioridade agora):

- **Sem login** — vira uma plataforma pública (view + edição sem conta),
  pensada para ficar ligada numa **TV da sala da equipe**.
- **Tela principal = só um "Calendário"** — lista de estratégias com
  responsável, prazo e status colorido por urgência (mesma lógica
  verde/amarelo/laranja/vermelho), fonte grande, auto-atualização a cada
  60s, itens concluídos marcados visualmente (não somem da tela).
- **Preenchimento 100% manual** pela Maria/equipe — nada de raspar site
  externo pra essa parte.
- **Duplicar pro mês seguinte + histórico dos meses anteriores sempre
  acessível** (nunca apaga).
- **Não recriar as páginas de cronograma por clube que ela já tem em
  projetos Lovable separados** (ex.: `cronogramasantosie.lovable.app`,
  `cronogramabahiaie.lovable.app`, `cronogramacoxaie.lovable.app`) — só
  linkar pra elas numa subpágina "Clubes", nunca clonar o conteúdo.

O prompt completo dessa reformulação foi entregue à diretora diretamente
no chat em 2026-08-11 (não duplicado aqui por ser específico do momento
— se precisar reconstruir, o resumo acima cobre a lógica central:
tabela nova `calendario_estrategias`, RLS liberado pra `anon`, coluna
`clubes.link_cronograma`).

## O que ainda depende de você, mesmo no Lovable

- Criar a conta Lovable (grátis) e a conta Resend (grátis, se quiser
  e-mail de verdade — sem isso o app funciona, só não manda e-mail).
- Convidar os 6 e-mails reais da equipe no painel do Supabase que o
  Lovable provisiona (Authentication → Users → Invite) — isso é o único
  jeito de qualquer plataforma (Lovable, Monday, o app em Next.js que já
  deixei) saber quem é quem. Não existe versão sem essa etapa.
- Preencher `clubes/checklist-personalizacao.md` (ou marcar direto na
  tela Clubes do app) — isso é dado do negócio, nenhuma ferramenta
  adivinha sozinha.
