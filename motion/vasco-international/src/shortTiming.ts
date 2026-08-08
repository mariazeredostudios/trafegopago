// Timeline do corte CURTO (Reels/trailer) — 28s @ 30fps = 840 frames.
// Existe ao lado de timing.ts (o corte completo) — os dois viram
// Compositions separadas no Root.tsx, escolha qual exportar/enviar.
export const SCENES_SHORT = {
  hook: { from: 0, duration: 90 }, // 0:00 - 0:03
  apresentacao: { from: 90, duration: 120 }, // 0:03 - 0:07
  disneyCup: { from: 210, duration: 150 }, // 0:07 - 0:12
  valor: { from: 360, duration: 120 }, // 0:12 - 0:16
  seletiva: { from: 480, duration: 120 }, // 0:16 - 0:20
  telefone: { from: 600, duration: 96 }, // 0:20 - 0:23.2
  cta: { from: 696, duration: 144 }, // 0:23.2 - 0:28
};

export const TOTAL_DURATION_SHORT =
  SCENES_SHORT.cta.from + SCENES_SHORT.cta.duration; // 840
