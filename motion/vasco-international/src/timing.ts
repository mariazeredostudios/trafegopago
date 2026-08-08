// Timeline mestre — 50s @ 30fps = 1500 frames, seguindo o briefing de
// direção de arte (6 cenas, estilo colagem/cutout).
export const FPS = 30;

export const SCENES = {
  hook: { from: 0, duration: 90 }, // 0:00 - 0:03
  apresentacao: { from: 90, duration: 150 }, // 0:03 - 0:08
  disneyCup: { from: 240, duration: 360 }, // 0:08 - 0:20
  alemDoFutebol: { from: 600, duration: 300 }, // 0:20 - 0:30
  seletiva: { from: 900, duration: 300 }, // 0:30 - 0:40
  cta: { from: 1200, duration: 300 }, // 0:40 - 0:50
};

export const TOTAL_DURATION = SCENES.cta.from + SCENES.cta.duration; // 1500
