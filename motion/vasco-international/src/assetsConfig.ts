// Central de assets reais. Enquanto os arquivos não chegam, os placeholders
// desenhados em CSS/SVG entram no lugar. Assim que você mandar os arquivos:
//   1. salve em public/assets/ com o nome indicado abaixo
//   2. troque o "false" pelo "true" correspondente
// Nenhum outro código precisa mudar.
export const ASSETS = {
  face: {
    enabled: true,
    src: "assets/rosto-lucas-fortuna.png", // PNG com fundo transparente, só a cabeça/rosto
  },
  jersey: {
    enabled: true,
    src: "assets/camisa-vasco.png", // PNG da camisa do Vasco (fundo transparente)
  },
  vascoShield: {
    enabled: false,
    src: "assets/escudo-vasco.png",
  },
  ieLogo: {
    enabled: false,
    src: "assets/logo-iesports.png",
  },
  field: {
    enabled: false,
    src: "assets/campo-futebol.jpg", // foto/vídeo de fundo do campo (opcional — sem isso usa gramado ilustrado)
  },
  igFeed: {
    enabled: true,
    src: "assets/ig-feed.mp4", // gravação de tela rolando o feed do Instagram, pra dentro do telefone
  },
  igFeedFast: {
    enabled: true,
    src: "assets/ig-feed-fast.mp4", // mesma gravação, acelerada ~6x — usada só no corte curto (Reels)
  },
};
