-- Plataforma iEsports — schema inicial
-- Rodar no SQL Editor do projeto Supabase (Project > SQL Editor > New query).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tipos
-- ---------------------------------------------------------------------------
create type status_demanda as enum ('a_fazer', 'em_andamento', 'em_revisao', 'concluido');

create type tipo_demanda as enum (
  'trafego_pago',
  'criativo_video',
  'criativo_carrossel',
  'criativo_arte',
  'copy_estrategia',
  'sympla_evento',
  'publicacao_social',
  'email_marketing',
  'whatsapp_material',
  'atendimento',
  'outro'
);

create type funcao_pessoa as enum (
  'gestao_trafego',
  'criativos',
  'publicacao_sympla',
  'estrategia_copy',
  'atendimento'
);

-- ---------------------------------------------------------------------------
-- Pessoas (equipe)
-- ---------------------------------------------------------------------------
create table pessoas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null unique,
  funcao funcao_pessoa not null,
  cor text not null default '#1F6E4A',
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);

comment on table pessoas is 'Equipe da plataforma. email precisa bater com o email de login no Supabase Auth.';

-- ---------------------------------------------------------------------------
-- Clubes
-- ---------------------------------------------------------------------------
create table clubes (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  ativo boolean not null default true,
  sem_organico boolean not null default false,
  tem_app boolean not null default false,
  tem_email_marketing boolean not null default false,
  tem_whatsapp_desconto boolean not null default false,
  tem_collab_clube boolean not null default false,
  link_bio text,
  link_sympla text,
  observacoes text,
  criado_em timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Seletivas — uma data (sempre domingo) por clube por mês. É a partir
-- dela que a rotina "virar o mês" calcula o prazo "segunda pós-seletiva"
-- de cada demanda gerada.
-- ---------------------------------------------------------------------------
create table seletivas (
  id uuid primary key default gen_random_uuid(),
  clube_id uuid not null references clubes(id) on delete cascade,
  mes_referencia text not null, -- 'AAAA-MM'
  data_seletiva date not null,
  criado_em timestamptz not null default now(),
  unique (clube_id, mes_referencia)
);

create index seletivas_mes_referencia_idx on seletivas (mes_referencia);

-- ---------------------------------------------------------------------------
-- Demandas
-- ---------------------------------------------------------------------------
create table demandas (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  tipo tipo_demanda not null,
  clube_id uuid references clubes(id) on delete set null,
  responsavel_id uuid references pessoas(id) on delete set null,
  status status_demanda not null default 'a_fazer',
  prioridade text not null default 'media' check (prioridade in ('alta', 'media', 'baixa')),
  canal text,
  prazo date,
  mes_referencia text not null, -- formato 'AAAA-MM'
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  concluido_em timestamptz
);

create index demandas_mes_referencia_idx on demandas (mes_referencia);
create index demandas_status_idx on demandas (status);
create index demandas_clube_id_idx on demandas (clube_id);
create index demandas_responsavel_id_idx on demandas (responsavel_id);
create index demandas_concluido_em_idx on demandas (concluido_em);

-- ---------------------------------------------------------------------------
-- Checklist por demanda
-- ---------------------------------------------------------------------------
create table checklist_itens (
  id uuid primary key default gen_random_uuid(),
  demanda_id uuid not null references demandas(id) on delete cascade,
  texto text not null,
  feito boolean not null default false,
  ordem int not null default 0
);

create index checklist_itens_demanda_id_idx on checklist_itens (demanda_id);

-- ---------------------------------------------------------------------------
-- Templates de demanda — usados pela rotina "virar o mês"
-- ---------------------------------------------------------------------------
-- aplica_se: null = todo clube ativo todo mês.
-- valores possíveis: 'tem_app', 'tem_email_marketing', 'tem_whatsapp_desconto',
--   'tem_collab_clube'. sem_organico NÃO entra como filtro de template — ele é
--   tratado à parte pela rotina (pula publicacao_social quando true).
create table demanda_templates (
  id uuid primary key default gen_random_uuid(),
  tipo tipo_demanda not null,
  titulo_padrao text not null,
  descricao_padrao text,
  responsavel_funcao funcao_pessoa,
  canal text,
  prioridade text not null default 'media' check (prioridade in ('alta', 'media', 'baixa')),
  dias_prazo_apos_seletiva int not null default 1, -- 1 = segunda pós-seletiva
  aplica_se text,
  requer_organico boolean not null default false, -- true = pular para clubes com clubes.sem_organico = true
  checklist_padrao jsonb not null default '[]'::jsonb,
  ordem int not null default 0,
  ativo boolean not null default true
);

-- ---------------------------------------------------------------------------
-- Resumos gerados (histórico dos digests, também usados na tela /relatorios)
-- ---------------------------------------------------------------------------
create table resumos (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('diario', 'semanal')),
  referencia date not null, -- dia do resumo diário, ou domingo/segunda de referência do semanal
  conteudo_html text not null,
  conteudo_texto text not null,
  enviado_para text[] not null default '{}',
  criado_em timestamptz not null default now()
);

create index resumos_tipo_referencia_idx on resumos (tipo, referencia desc);

-- ---------------------------------------------------------------------------
-- RLS — todo acesso real acontece via Route Handlers do Next.js com a
-- service role key (nunca exposta ao navegador). O navegador só fala
-- diretamente com o Supabase Auth (login). Por isso as policies abaixo são
-- "negar por padrão" — não existe policy de SELECT/INSERT/UPDATE/DELETE
-- para o papel `anon`/`authenticated`, então requests vindos do browser com
-- a anon key não leem nem escrevem nenhuma linha. A service role key
-- ignora RLS por definição, então os Route Handlers continuam funcionando
-- normalmente.
-- ---------------------------------------------------------------------------
alter table pessoas enable row level security;
alter table clubes enable row level security;
alter table seletivas enable row level security;
alter table demandas enable row level security;
alter table checklist_itens enable row level security;
alter table demanda_templates enable row level security;
alter table resumos enable row level security;

-- ---------------------------------------------------------------------------
-- updated_at automático em demandas
-- ---------------------------------------------------------------------------
create or replace function set_atualizado_em()
returns trigger as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$ language plpgsql;

create trigger demandas_set_atualizado_em
before update on demandas
for each row execute function set_atualizado_em();
