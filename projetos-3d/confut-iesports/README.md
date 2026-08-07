# Estande iESPORTS × Confut Sudamericana — render 3D interativo

Página única e autocontida (HTML/CSS/JS puros, sem dependências externas)
com o render 3D do estande em escala real, montado a partir do documento
técnico do estande padrão (3,00×3,00m, 2 painéis backlit de 2,70×2,20m,
balcão de 0,90×0,40×0,90m) e da arte/logo enviadas pelo cliente.

Este projeto é independente do trabalho de tráfego pago descrito no
`CLAUDE.md` da raiz do repositório — foi versionado aqui a pedido do
cliente, dentro do mesmo repositório de conta.

## Arquivo

- `apresentacao.html` — abrir direto no navegador. Arraste (ou use as
  setas ← →) para girar o estande; toque numa superfície (parede de
  fundo, lateral, balcão) para ver o detalhe daquela peça.

## O que está aplicado

- **Painel de fundo**: mural enviado pelo cliente, recomposto para
  cobrir a parede inteira (2,70×2,20m) **sem cortar nenhum atleta** —
  como o arquivo original é 16:9 e o painel é ~1,23:1, a imagem foi
  estendida com uma extensão em blur do próprio fundo (técnica comum em
  gráficos de transmissão esportiva) em vez de recortada nas laterais.
- **TV 43"**: reposicionada no canto superior esquerdo do painel de
  fundo, na proporção exata do documento técnico do organizador.
- **Painel lateral**: logo oficial iESPORTS (arquivo enviado pelo
  cliente), centralizada em fundo branco.
- **Balcão**: seta da marca em branco (extraída da logo oficial) sobre
  fundo azul na face frontal; laterais no mesmo azul.
- **Cooler + copinhos**: apoiados no tampo do balcão, para a ação da
  Liquidz (eletrólito em pó + água, servido no copinho da marca).
- **Mesa bistrô + 2 banquetas**: volumes 3D reais (tampo redondo, pé,
  base), não mais ícones planos no piso.
- Sombras de contato sob balcão, mesa e banquetas; leve gradiente de luz
  em cada parede para não ficar com leitura de "pôster colado".

## Bugs corrigidos nesta rodada

Todos verificados renderizando a página com Chromium headless
(Playwright) — captura de tela e simulação de arraste/toque/clique, não
só leitura de código:

1. **Arraste não funcionava** — o código desabilitava o arraste inteiro
   quando o sistema/navegador tinha `prefers-reduced-motion` ativado
   (configuração de acessibilidade). Isso é para desligar animação
   automática, não uma interação que o próprio usuário inicia — corrigido
   para o arraste sempre funcionar; só a suavização da transição respeita
   essa preferência.
2. **Mesa e banquetas apareciam fora do lugar / cortadas** — estavam
   aninhadas dentro do elemento do piso, que já tem sua própria rotação
   3D; isso somava a rotação do piso em cima da posição delas. Movidas
   para fora do piso, direto no grupo principal da cena.
3. **Balcão flutuava fora do lugar** (corrigido numa rodada anterior) —
   não tinha posição 3D própria definida.
4. **Clique nas superfícies não funcionava** (corrigido numa rodada
   anterior) — `setPointerCapture` redireciona `e.target` para o
   contêiner da cena; trocado por `elementFromPoint`.

Também adicionado: suporte a toque (touch) como reforço aos eventos de
ponteiro, e navegação por teclado (setas ← →) como alternativa sempre
disponível ao arraste do mouse.
