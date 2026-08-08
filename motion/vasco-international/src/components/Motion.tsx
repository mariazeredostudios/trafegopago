import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { palette, fontStack } from "../palette";
import { SCENES } from "../timing";

/** Câmera lenta (Ken Burns) pra nenhuma cena ficar 100% estática. */
export const useKenBurns = (localFrame: number, duration: number) => {
  return interpolate(localFrame, [0, duration], [1, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

/** Texto que "estoura" na tela com spring (overshoot) em vez de só nascer
 * com fade — é o que dá a sensação de motion design premium. */
export const PunchText: React.FC<{
  text: string;
  from: number;
  out?: number;
  size?: number;
  weight?: number;
  color?: string;
  glow?: string;
  align?: "center" | "left";
  lineHeight?: number;
  style?: React.CSSProperties;
}> = ({
  text,
  from,
  out,
  size = 60,
  weight = 800,
  color = palette.white,
  glow,
  align = "center",
  lineHeight = 1.08,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - from;
  if (local < -1) return null;

  const s = spring({
    frame: local,
    fps,
    config: { damping: 11, stiffness: 140, mass: 0.7 },
    durationInFrames: 18,
  });
  const scale = interpolate(s, [0, 1], [0.55, 1]);
  const rotate = interpolate(s, [0, 1], [-4, 0]);
  const inOpacity = interpolate(local, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let outOpacity = 1;
  let outScale = 1;
  if (out) {
    outOpacity = interpolate(frame, [out - 12, out], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    });
    outScale = interpolate(frame, [out - 12, out], [1, 0.9], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    if (frame >= out) return null;
  }

  return (
    <div
      style={{
        opacity: Math.min(inOpacity, outOpacity),
        transform: `scale(${scale * outScale}) rotate(${rotate}deg)`,
        fontFamily: fontStack,
        fontWeight: weight,
        fontSize: size,
        color,
        textAlign: align,
        lineHeight,
        letterSpacing: -1.2,
        whiteSpace: "pre-line",
        textShadow: glow ? `0 0 40px ${glow}, 0 0 90px ${glow}` : undefined,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

/** Chip/etiqueta com borda que "desliza" — usado nas listas (Destino). */
export const Chip: React.FC<{
  from: number;
  children: React.ReactNode;
  delayIndex?: number;
}> = ({ from, children, delayIndex = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = from + delayIndex * 6;
  const local = frame - start;
  const s = spring({
    frame: local,
    fps,
    config: { damping: 13 },
    durationInFrames: 16,
  });
  const x = interpolate(s, [0, 1], [-50, 0]);
  const opacity = interpolate(local, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (opacity <= 0) return null;
  return (
    <div style={{ opacity, transform: `translateX(${x}px)` }}>{children}</div>
  );
};

/** Flash branco rápido nos cortes de cena — típico de edição de reels pra
 * dar "porrada" visual na transição em vez de corte seco. */
export const FlashCuts: React.FC = () => {
  const frame = useCurrentFrame();
  const boundaries = Object.values(SCENES)
    .map((s) => s.from)
    .filter((f) => f > 0);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {boundaries.map((b) => {
        const opacity = interpolate(
          frame,
          [b - 3, b, b + 5],
          [0, 0.85, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        if (opacity <= 0) return null;
        return (
          <AbsoluteFill
            key={b}
            style={{ backgroundColor: palette.white, opacity }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Leve zoom-punch de câmera no instante do corte — aplicado dentro de cada
 * cena (frame local baixo = punch mais forte). */
export const useCutPunch = (localFrame: number) =>
  interpolate(localFrame, [0, 10], [1.12, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
