// Timeline mestre — a cena do telefone agora dura o mesmo que a gravação
// de tela INTEIRA (não corta mais), então o vídeo final ficou mais longo.
export const FPS = 30;

export const SCENES = {
  hook: { from: 0, duration: 90 }, // 0:00 - 0:03
  apresentacao: { from: 90, duration: 150 }, // 0:03 - 0:08
  disneyCup: { from: 240, duration: 360 }, // 0:08 - 0:20
  alemDoFutebol: { from: 600, duration: 300 }, // 0:20 - 0:30
  motivacional: { from: 900, duration: 90 }, // 0:30 - 0:33
  seletiva: { from: 990, duration: 300 }, // 0:33 - 0:43
  telefoneFeed: { from: 1290, duration: 591 }, // 0:43 - 1:03 — vídeo inteiro (19.7s), sem corte
  cta: { from: 1881, duration: 300 }, // 1:03 - 1:13
};

export const TOTAL_DURATION = SCENES.cta.from + SCENES.cta.duration; // 2181
