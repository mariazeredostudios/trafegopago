// Timeline mestre — 40s @ 30fps = 1200 frames.
// Ajuste aqui as durações de cada cena; os componentes usam esses valores
// via <Sequence>, então mexer num número aqui já reordena o vídeo inteiro.
export const FPS = 30;

export const SCENES = {
  browserSearch: { from: 0, duration: 120 }, // 0:00 - 0:04
  colagem: { from: 120, duration: 150 }, // 0:04 - 0:09
  hookValue: { from: 270, duration: 210 }, // 0:09 - 0:16
  destino: { from: 480, duration: 240 }, // 0:16 - 0:24
  significado: { from: 720, duration: 180 }, // 0:24 - 0:30
  seletiva: { from: 900, duration: 150 }, // 0:30 - 0:35
  cta: { from: 1050, duration: 150 }, // 0:35 - 0:40
};

export const TOTAL_DURATION =
  SCENES.cta.from + SCENES.cta.duration; // 1200
