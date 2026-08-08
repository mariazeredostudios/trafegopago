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
    enabled: false,
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
};
