import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palette } from "../palette";

// Fundo com blobs desfocados (linguagem visual dos vídeos de inspiração:
// blobs verdes flutuando atrás da tipografia) + grão de filme sutil pra
// tirar a cara de "flat design"/slide de PowerPoint.
export const Backdrop: React.FC<{
  base?: string;
  blobColor?: string;
  blobColor2?: string;
  intensity?: number;
}> = ({
  base = palette.black,
  blobColor = "rgba(255,255,255,0.12)",
  blobColor2 = "rgba(255,255,255,0.06)",
  intensity = 1,
}) => {
  const frame = useCurrentFrame();
  const drift1 = Math.sin(frame / 70) * 60 * intensity;
  const drift2 = Math.cos(frame / 90) * 70 * intensity;
  const pulse = 1 + Math.sin(frame / 55) * 0.06;

  return (
    <AbsoluteFill style={{ backgroundColor: base, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: blobColor,
          filter: "blur(140px)",
          top: -260 + drift1,
          left: -260 + drift2,
          transform: `scale(${pulse})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 760,
          height: 760,
          borderRadius: "50%",
          background: blobColor2,
          filter: "blur(120px)",
          bottom: -220 - drift1,
          right: -220 - drift2,
        }}
      />
      <Grain />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

const noiseSvg =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`
  );

export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => {
  const frame = useCurrentFrame();
  const ox = (frame * 7) % 180;
  const oy = (frame * 11) % 180;
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url(${noiseSvg})`,
        backgroundPosition: `${ox}px ${oy}px`,
        opacity,
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
    />
  );
};
