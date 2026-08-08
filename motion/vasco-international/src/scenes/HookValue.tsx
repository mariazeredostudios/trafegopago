import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { palette, fontStack } from "../palette";

type Line = { text: string; in: number; out: number; size?: number; accent?: boolean };

// Linhas de valor — sem falar preço, só gancho emocional + exclusividade,
// como pedido: "produto caro, precisa agregar valor".
const LINES: Line[] = [
  { text: "Vestir a camisa\ndo Vasco.", in: 0, out: 55, size: 66 },
  { text: "Representar o clube\nfora do Brasil.", in: 50, out: 115, size: 62 },
  { text: "Uma experiência\nÚNICA.", in: 110, out: 165, size: 66, accent: true },
  { text: "Vagas exclusivas.\nOportunidade imperdível.", in: 160, out: 210, size: 54 },
];

export const HookValue: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.black,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {LINES.map((line, i) => {
        const fadeIn = interpolate(frame, [line.in, line.in + 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fadeOut = interpolate(
          frame,
          [line.out - 14, line.out],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const opacity = Math.min(fadeIn, fadeOut);
        const y = interpolate(frame, [line.in, line.in + 16], [30, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });

        if (opacity <= 0) return null;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              opacity,
              transform: `translateY(${y}px)`,
              fontFamily: fontStack,
              fontWeight: 800,
              fontSize: line.size ?? 60,
              color: line.accent ? palette.red : palette.white,
              textAlign: "center",
              lineHeight: 1.1,
              letterSpacing: -1,
              whiteSpace: "pre-line",
              padding: "0 70px",
            }}
          >
            {line.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
