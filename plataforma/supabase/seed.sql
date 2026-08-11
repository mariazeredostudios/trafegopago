-- Seed inicial — equipe, clubes e templates de demanda recorrente.
-- Rodar depois de 0001_init.sql.
--
-- ⚠️ TROCAR OS E-MAILS ABAIXO pelos e-mails reais de cada pessoa antes de
-- rodar — são esses e-mails que devem ser convidados no Supabase Auth
-- (Authentication > Users > Invite user) para o login individual funcionar.
-- Sem o convite em Auth, a pessoa até existe na tabela `pessoas`, mas não
-- consegue entrar na plataforma.

insert into pessoas (nome, email, funcao) values
  ('Maria',       'maria@iesports.com.br',       'gestao_trafego'),
  ('Anna Clara',  'annaclara@iesports.com.br',   'criativos'),
  ('Victor Hugo', 'victorhugo@iesports.com.br',  'criativos'),
  ('Prime',       'prime@iesports.com.br',       'publicacao_sympla'),
  ('Gabriel',     'gabriel@iesports.com.br',     'estrategia_copy'),
  ('Ana Júlia',   'anajulia@iesports.com.br',    'atendimento');

insert into clubes (nome, sem_organico) values
  ('Cruzeiro', false),
  ('Fluminense', false),
  ('Santos', false),
  ('Bahia', false),
  ('Sport', false),
  ('ABC', false),
  ('Palmeiras', false),
  ('Grêmio', true), -- confirmado: sem postagem orgânica, 100% tráfego pago
  ('Coritiba', false),
  ('Vasco', false),
  ('Botafogo', false);
-- Depois de preencher clubes/checklist-personalizacao.md, atualizar as
-- colunas tem_app / tem_email_marketing / tem_whatsapp_desconto /
-- tem_collab_clube de cada clube com UPDATE, ou pela tela /clubes da
-- própria plataforma (mais fácil).

-- ---------------------------------------------------------------------------
-- Templates de demanda recorrente — usados pela rotina "virar o mês".
-- dias_prazo_apos_seletiva = 1 → prazo cai na segunda pós-seletiva (a
-- seletiva é sempre domingo), como pedido pela diretora.
-- ---------------------------------------------------------------------------
insert into demanda_templates
  (tipo, titulo_padrao, descricao_padrao, responsavel_funcao, canal, prioridade, dias_prazo_apos_seletiva, aplica_se, requer_organico, checklist_padrao, ordem)
values
  ('criativo_video', '2 a 3 vídeos — {clube}',
    'Vídeos em feed, 1080x1080 e story.', 'criativos', 'instagram', 'alta', 1, null, false,
    '["Roteiro/briefing aprovado", "Gravação/seleção de material", "Edição no CapCut", "Exportar em feed", "Exportar em 1080x1080", "Exportar em story", "Enviar para aprovação da Maria"]', 10),

  ('criativo_carrossel', 'Carrossel — {clube}',
    'Carrossel em feed, 1080x1080 e story.', 'criativos', 'instagram', 'alta', 1, null, false,
    '["Copy definida com o Gabriel", "Arte no Canva", "Exportar em feed", "Exportar em 1080x1080", "Exportar em story", "Enviar para aprovação da Maria"]', 20),

  ('criativo_arte', 'Arte estática — {clube}',
    'Arte estática em feed, 1080x1080 e story.', 'criativos', 'instagram', 'media', 1, null, false,
    '["Arte no Canva", "Exportar em feed", "Exportar em 1080x1080", "Exportar em story", "Enviar para aprovação da Maria"]', 30),

  ('sympla_evento', 'Criar evento no Sympla — {clube}',
    'Evento da seletiva do mês, com lote e descrição alinhados ao anúncio.', 'publicacao_sympla', 'sympla', 'alta', 0, null, false,
    '["Dados da seletiva recebidos do coordenador", "Evento criado no Sympla", "Capa e descrição revisadas", "Link testado"]', 5),

  ('publicacao_social', 'Ajustar link da bio e botão do site — {clube}',
    'Bio iesports.com.br/atendimento e botão do site do clube apontando para o Sympla do mês.', 'estrategia_copy', 'instagram', 'alta', 0, null, false,
    '["Link da bio atualizado", "Botão do site do clube atualizado", "Link testado em celular"]', 6),

  ('copy_estrategia', 'Calendário de postagem do mês — {clube}',
    'Estratégia, copy e cronograma (imagem, copy, ação, dia, hora) na plataforma de agendamento do clube.', 'estrategia_copy', null, 'alta', 1, null, false,
    '["Estratégia do mês definida", "Copy de cada post escrita", "Cronograma preenchido na plataforma do clube", "Mínimo de 2 posts orgânicos no mês garantido"]', 1),

  ('publicacao_social', 'Publicar no Instagram + replicar (Threads/TikTok/Shorts) — {clube}',
    'Publicação orgânica mínima de 2 posts/mês.', 'publicacao_sympla', 'instagram', 'media', 2, null, true,
    '["Post publicado no Instagram", "Replicado no Threads", "Replicado no TikTok", "Replicado como Shorts"]', 40),

  ('email_marketing', 'E-mail marketing — {clube}',
    'E-mail para sócios e público aberto. Só para clubes com tem_email_marketing = true.', 'estrategia_copy', 'email', 'media', 1, 'tem_email_marketing', false,
    '["Copy do e-mail escrita", "Peça pronta", "Lista de envio confirmada", "E-mail disparado"]', 50),

  ('whatsapp_material', 'Arte WhatsApp — escolinha com desconto — {clube}',
    'Imagem promocional (ex.: 50% de desconto) para WhatsApp de escolinhas parceiras. Só para clubes com tem_whatsapp_desconto = true.', 'criativos', 'whatsapp', 'media', 1, 'tem_whatsapp_desconto', false,
    '["Oferta/condição confirmada com o coordenador", "Arte no Canva", "Aprovada pela Maria", "Enviada para o WhatsApp das escolinhas"]', 60),

  ('outro', 'Material específico do app — {clube}',
    'Demanda de conteúdo para o app próprio do clube. Só para clubes com tem_app = true.', 'estrategia_copy', 'app', 'baixa', 2, 'tem_app', false,
    '["Requisito do app levantado com o coordenador", "Material produzido", "Publicado no app"]', 70),

  ('trafego_pago', 'Subir tráfego pago — {clube}',
    'Campanha do mês no Meta Ads, a partir do material aprovado no Drive.', 'gestao_trafego', 'meta_ads', 'alta', 1, null, false,
    '["Material aprovado no Drive", "Campanha configurada no Meta Ads", "Orçamento diário definido", "Campanha ativada"]', 2);
