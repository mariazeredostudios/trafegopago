# Estande iESPORTS × Confut Sudamericana — render 3D (WebGL)

Página única e autocontida (HTML + WebGL/Three.js embutido, sem
dependências externas) com o render 3D do estande em **escala real, em
metros verdadeiros**, montado a partir do documento técnico do estande
padrão e da arte/logo enviadas pelo cliente.

Este projeto é independente do trabalho de tráfego pago descrito no
`CLAUDE.md` da raiz do repositório — foi versionado aqui a pedido do
cliente, dentro do mesmo repositório de conta.

## Arquivo

- `apresentacao.html` — abrir direto no navegador. **Arraste em qualquer
  direção para girar 360° livremente** (ou use as setas do teclado);
  toque numa superfície (parede de fundo, lateral, balcão) para ver o
  detalhe daquela peça.

## Por que reescrevemos em WebGL (Three.js) nesta rodada

As duas primeiras versões usavam apenas CSS 3D "artesanal" (transforms
calculados à mão). Isso gerou uma sequência de bugs de posicionamento
difíceis de prever sem renderizar de fato — balcão flutuando, mesa/banco
fora do lugar, TV deslocada. A partir desta rodada o estande é modelado
com Three.js (motor 3D real, o mesmo tipo de tecnologia usada em
ferramentas de projeto), com:

- Câmera em perspectiva de verdade orbitando em coordenadas 3D reais
  (metros), sem matrizes CSS calculadas manualmente.
- Sombras de contato reais (shadow mapping), não decalques desenhados à
  mão.
- Giro de 360° em qualquer direção — inclusive o verso dos painéis é
  modelado e iluminado, então nenhum ângulo mostra tela preta ou
  quebrada.

## O que está aplicado

- **Painel de fundo**: mural enviado pelo cliente, cobrindo a parede
  inteira (2,70×2,20m) sem cortar nenhum atleta — como o arquivo
  original é 16:9 e o painel é ~1,23:1, a imagem foi estendida com uma
  extensão em blur do próprio fundo (técnica comum em gráficos de
  transmissão esportiva) em vez de recortada nas laterais.
- **TV 43"**: posicionada na proporção exata do documento técnico do
  organizador (canto superior esquerdo do painel de fundo).
- **Painel lateral**: logo oficial iESPORTS (arquivo enviado pelo
  cliente), centralizada em fundo branco.
- **Balcão**: seta da marca em branco (extraída da logo oficial) sobre
  fundo azul na face frontal; laterais no mesmo azul.
- **Cooler + copinhos**: apoiados no tampo do balcão, para a ação da
  Liquidz (eletrólito em pó + água, servido no copinho da marca).
- **Mesa bistrô + 2 banquetas**: volumes 3D reais (tampo de vidro, pé e
  base metálicos), com sombra de contato real no piso.
- Painéis com 8cm de espessura real (conforme "Espessura 8cm" do
  documento técnico) — não são mais planos de papel.

## Observação sobre o mural

Reparamos que o texto "iesports" em marca d'água (semi-transparente),
que já vem no arquivo original enviado, cruza bem em cima do peito do
atleta do Cruzeiro na fileira da frente — lendo como uma faixa. Isso
vem do próprio arquivo de origem, não foi introduzido no render; se
quiser, dá pra pedir ao designer um ajuste de posição dessa marca d'água
no arquivo-fonte antes da arte final de impressão.

## Ajustes de precisão desta rodada

- **Piso com a profundidade real do documento (2,92m)**, não 3,00m — os
  8cm de espessura do painel de fundo comem parte da profundidade
  útil, exatamente como o documento técnico indica.
- **TV reposicionada para nunca sobrepor nenhum atleta**: as cabeças dos
  jogadores começam quase coladas na borda superior da foto original
  (quase sem respiro natural), então a extensão em blur do mural agora
  é assimétrica — bem mais alta em cima (onde a TV fica) e mais fina
  embaixo — garantindo que a TV inteira sobre só na área de blur, nunca
  em cima de um rosto ou escudo de clube.
- **Banqueta do balcão adicionada** — o documento lista 3 banquetas
  (conjunto bistrô com 2 + 1 do balcão); a terceira estava faltando no
  render.
- Giro de 360° revalidado após esses ajustes (posições de móveis, piso e
  câmera recalculadas).

## Testes antes da publicação

Toda alteração foi verificada renderizando a página com Chromium
headless (Playwright), incluindo: giro completo de 360° em 8 pontos,
arraste real via mouse, clique em cada superfície, teclado, e viewport
mobile — não só leitura de código.
