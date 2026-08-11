# Plataforma iEsports — quadro de demandas mensais

App próprio (Next.js + Supabase + Resend), gratuito nos limites deste
time (6 pessoas), que substitui o Monday.com/WhatsApp "to do" por: quadro
por status, checklist por demanda, virada de mês automática com base na
personalização de cada clube, aviso por e-mail quando alguém conclui uma
demanda, resumo diário às 16h e resumo semanal toda segunda de manhã.

## Como funciona, em uma frase por peça

- **Next.js** — o site em si (login, quadro, clubes, relatórios), hospedado de graça na **Vercel**.
- **Supabase** — banco de dados Postgres + login de cada pessoa, plano Free.
- **Resend** — envio dos e-mails (conclusão de demanda, resumo diário, resumo semanal), plano Free (3.000 e-mails/mês).
- **GitHub Actions** (`.github/workflows/`) — dispara os resumos automáticos nos horários certos, de graça, usando este mesmo repositório.

Nenhuma dessas quatro contas custa nada no volume deste time.

## Passo a passo do deploy (± 20 minutos, uma vez só)

### 1. Supabase (banco de dados + login)

1. Criar conta em [supabase.com](https://supabase.com) → **New project**.
2. Ir em **SQL Editor → New query**, colar o conteúdo de
   `supabase/migrations/0001_init.sql` e rodar.
3. Abrir `supabase/seed.sql`, **trocar os e-mails de exemplo pelos
   e-mails reais** de cada pessoa (Maria, Anna Clara, Victor Hugo, Prime,
   Gabriel, Ana Júlia), colar no SQL Editor e rodar.
4. Ir em **Authentication → Users → Invite user** e convidar, um por um,
   os 6 e-mails exatamente iguais aos que você colocou em `pessoas` —
   cada pessoa recebe um e-mail para criar a senha.
5. Ir em **Project Settings → API** e guardar 3 valores: `Project URL`,
   `anon public key`, `service_role key` (esse último é secreto — nunca
   compartilhar, nunca colocar em código).

### 2. Resend (e-mail)

1. Criar conta em [resend.com](https://resend.com).
2. Em **API Keys**, criar uma chave (`RESEND_API_KEY`).
3. Em **Domains**, verificar um domínio para poder enviar de
   `plataforma@iesports.com.br` (adiciona uns registros DNS — se não
   tiver acesso ao DNS agora, dá pra começar enviando do domínio de
   teste do Resend, mas só chega na sua própria caixa até verificar um
   domínio).

### 3. Vercel (hospedagem do site)

1. Criar conta em [vercel.com](https://vercel.com) (dá pra entrar com o
   GitHub).
2. **Add New → Project**, importar o repositório `trafegopago`.
3. Em **Root Directory**, apontar para a pasta `plataforma` (não a raiz
   do repositório).
4. Em **Environment Variables**, colar todas as chaves de
   `plataforma/.env.example` com os valores reais:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `RESEND_FROM`
   - `CRON_SECRET` (invente uma string aleatória longa)
   - `NEXT_PUBLIC_SITE_URL` (a própria URL que a Vercel vai gerar —
     dá pra editar depois do primeiro deploy)
5. **Deploy**. Ao final, a Vercel dá uma URL tipo
   `https://plataforma-iesports.vercel.app` — volte em
   `NEXT_PUBLIC_SITE_URL` e ajuste para essa URL real, se precisar.

### 4. GitHub Actions (resumos automáticos)

1. No repositório GitHub, ir em **Settings → Secrets and variables →
   Actions → New repository secret** e criar dois segredos:
   - `PLATAFORMA_SITE_URL` = a URL da Vercel (ex.:
     `https://plataforma-iesports.vercel.app`)
   - `PLATAFORMA_CRON_SECRET` = o mesmo valor que você colocou em
     `CRON_SECRET` na Vercel
2. Os workflows já existem em `.github/workflows/resumo-diario.yml`
   (todo dia, 16h) e `resumo-semanal.yml` (toda segunda, ~7h) — não
   precisa criar nada, só os secrets acima. Para testar sem esperar o
   horário, abrir o workflow na aba **Actions** do GitHub e clicar em
   **Run workflow**.

### 5. Primeiro uso

1. Cada pessoa acessa a URL da Vercel e entra com o e-mail convidado +
   senha criada no passo 1.4.
2. A Maria abre **Clubes** e marca a personalização de cada um (ver
   `clubes/checklist-personalizacao.md` para a resposta já dada).
3. A Maria abre **Virar o mês**, preenche a data (domingo) da seletiva de
   cada clube naquele mês e clica em **Gerar demandas do mês** — isso
   cria todas as demandas recorrentes automaticamente, já com prazo
   calculado e checklist.
4. A partir daí, o dia a dia é: abrir uma demanda no **Quadro**, mover o
   status, marcar o checklist. Quando alguém marca **Concluído**, a Maria
   recebe um e-mail na hora. Às 16h e toda segunda de manhã, os resumos
   chegam sozinhos.

## Rodando localmente (para desenvolver/testar antes de mexer em produção)

```bash
cd plataforma
npm install
cp .env.example .env.local   # preencher com os valores reais (ou de um projeto Supabase de teste)
npm run dev
```

## Limites do plano gratuito a ficar de olho

- **Resend Free:** 3.000 e-mails/mês, 100/dia — bem acima do volume
  deste time (6 pessoas, ~11 clubes/mês). Se um dia passar disso, o
  plano pago começa em poucos dólares/mês.
- **Supabase Free:** projeto pausa depois de 7 dias sem nenhuma
  requisição — não é um risco aqui porque o time usa todo dia, mas se a
  plataforma ficar parada mais de uma semana (ex.: recesso), pode
  precisar "acordar" o projeto manualmente no painel do Supabase.
- **Vercel Hobby:** uso comercial interno de baixo tráfego (6 usuários)
  fica tranquilamente dentro do limite gratuito.
- **GitHub Actions:** os dois workflows agendados consomem poucos
  minutos/mês — bem abaixo do limite gratuito do plano do repositório.

## Próximos passos possíveis (não incluídos nesta primeira versão)

- Notificação por WhatsApp além de e-mail (precisa da API oficial da
  Meta, com número comercial verificado — ver `briefing/ferramentas.md`).
- Anexar arquivos/prints diretamente na demanda (hoje o fluxo continua
  sendo aprovar no Drive, como já é feito).
- Editar/gerenciar `demanda_templates` pela interface em vez de SQL
  direto no Supabase.
