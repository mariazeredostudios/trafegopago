# Estande iESPORTS × Confut Sudamericana — render 3D interativo

Página única e autocontida (HTML/CSS/JS puros, sem dependências externas)
com o render 3D do estande em escala real, montado a partir do documento
técnico do estande padrão (3,00×3,00m, 2 painéis backlit de 2,70×2,20m,
balcão de 0,90×0,40×0,90m) e da arte/logo enviadas pelo cliente.

Este projeto é independente do trabalho de tráfego pago descrito no
`CLAUDE.md` da raiz do repositório — foi versionado aqui a pedido do
cliente, dentro do mesmo repositório de conta.

## Arquivo

- `apresentacao.html` — abrir direto no navegador. Arraste para girar o
  estande; toque numa superfície (parede de fundo, lateral, balcão) para
  ver o detalhe daquela peça.

## O que está aplicado

- **Painel de fundo**: mural enviado pelo cliente (elenco multi-clube das
  seletivas), cobrindo a parede inteira, de ponta a ponta.
- **Painel lateral**: logo oficial iESPORTS (arquivo enviado pelo
  cliente), centralizada em fundo branco.
- **Balcão**: seta da marca em branco (extraída da logo oficial) sobre
  fundo azul na face frontal; laterais no mesmo azul.
- **Cooler + copinhos**: apoiados no tampo do balcão, para a ação da
  Liquidz (eletrólito em pó + água, servido no copinho da marca).

## Correções feitas nesta rodada

A primeira versão publicada tinha dois bugs reais de renderização 3D:

1. O balcão não tinha posição 3D definida — ficava "flutuando" sobreposto
   à parede de fundo em vez de apoiado no piso.
2. O clique em cada superfície não atualizava a ficha técnica: o
   `setPointerCapture` usado para o arraste redireciona o `target` do
   evento para o próprio contêiner da cena, então o clique nunca
   "acertava" a parede/balcão certos.

Ambos corrigidos e verificados renderizando a página com Chromium
headless (Playwright) antes de publicar — captura de tela + simulação de
clique/arraste, não só leitura do código.
