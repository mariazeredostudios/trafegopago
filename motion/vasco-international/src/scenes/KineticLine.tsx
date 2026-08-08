import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { palette, fontStack } from "../palette";

// Bloco de texto kinetic reutilizável — entra com leve subida + fade,
// no estilo dos vídeos de inspiração (refined.motion / luiz.editor80).
export const KineticLine: React.FC<{
  text: string;
  from: number;
  size?: number;
  weight?: number;
  color?: string;
  align?: "center" | "left";
  highlight?: boolean;
}> = ({
  text,
  from,
  size = 54,
  weight = 800,
  color = palette.white,
  align = "center",
  highlight = false,
}) => {
  const frame = useCurrentFrame();
  const local = frame - from;
  const opacity = interpolate(local, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(local, [0, 16], [26, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontFamily: fontStack,
        fontWeight: weight,
        fontSize: size,
        color,
        textAlign: align,
        lineHeight: 1.08,
        letterSpacing: -0.5,
        padding: "6px 64px",
        background: highlight ? palette.white : "transparent",
        WebkitTextFillColor: highlight ? palette.black : undefined,
        display: highlight ? "inline-block" : "block",
      }}
    >
      {text}
    </div>
  );
};
