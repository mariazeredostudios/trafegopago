import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { palette, fontStack } from "../palette";

type Line = { text: string; in: number; out: number; size?: number };

const LINES: Line[] = [
  { text: "Não é só futebol.", in: 0, out: 48, size: 64 },
  { text: "É conhecer outro país,\noutra cultura.", in: 42, out: 92, size: 54 },
  {
    text: "É viajar com outros clubes\ndo Brasil e do mundo.",
    in: 86,
    out: 136,
    size: 50,
  },
  {
    text: "Independência.\nResponsabilidade.\nMundo.",
    in: 130,
    out: 180,
    size: 60,
  },
];

export const Significado: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.white,
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
        const y = interpolate(frame, [line.in, line.in + 16], [24, 0], {
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
              fontSize: line.size ?? 56,
              color: palette.black,
              textAlign: "center",
              lineHeight: 1.12,
              letterSpacing: -1,
              whiteSpace: "pre-line",
              padding: "0 74px",
            }}
          >
            {line.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
