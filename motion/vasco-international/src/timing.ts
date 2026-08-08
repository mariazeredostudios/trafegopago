// Timeline mestre — 58s @ 30fps = 1740 frames.
export const FPS = 30;

export const SCENES = {
  hook: { from: 0, duration: 90 }, // 0:00 - 0:03
  apresentacao: { from: 90, duration: 150 }, // 0:03 - 0:08
  disneyCup: { from: 240, duration: 360 }, // 0:08 - 0:20
  alemDoFutebol: { from: 600, duration: 300 }, // 0:20 - 0:30
  motivacional: { from: 900, duration: 90 }, // 0:30 - 0:33
  seletiva: { from: 990, duration: 300 }, // 0:33 - 0:43
  telefoneFeed: { from: 1290, duration: 150 }, // 0:43 - 0:48 (5s — dura o mesmo que a gravação)
  cta: { from: 1440, duration: 300 }, // 0:48 - 0:58
};

export const TOTAL_DURATION = SCENES.cta.from + SCENES.cta.duration; // 1740
