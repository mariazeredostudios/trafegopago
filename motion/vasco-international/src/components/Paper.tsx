import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { palette, fontStack } from "../palette";
import { SCENES } from "../timing";

// ---------------------------------------------------------------------
// Kit visual "colagem / paper cutout": bordas rasgadas determinísticas,
// fita adesiva decorativa, textura de papel kraft e a transição de
// "página rasgada" entre cenas. Tudo em CSS clip-path/SVG — sem assets
// externos, sem tempo de download.
// ---------------------------------------------------------------------

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Clip-path de "papel rasgado" — dentes irregulares no topo e na base,
 * laterais retas. Determinístico por seed (não pisca entre frames). */
export function tornClipPath(seed: number, teeth = 14, depth = 5): string {
  const rand = mulberry32(seed);
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= teeth; i++) {
    const x = (i / teeth) * 100;
    const jag = i === 0 || i === teeth ? 0 : rand() * depth;
    top.push(`${x}% ${jag.toFixed(2)}%`);
  }
  for (let i = teeth; i >= 0; i--) {
    const x = (i / teeth) * 100;
    const jag = i === 0 || i === teeth ? 0 : rand() * depth;
    bottom.push(`${x}% ${(100 - jag).toFixed(2)}%`);
  }
  return `polygon(${top.join(",")}, ${bottom.join(",")})`;
}

export const TornPanel: React.FC<{
  seed?: number;
  background?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  shadow?: boolean;
}> = ({ seed = 1, background = palette.white, style, children, shadow = true }) => (
  <div
    style={{
      clipPath: tornClipPath(seed),
      background,
      filter: shadow ? "drop-shadow(0 18px 26px rgba(0,0,0,0.45))" : undefined,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Tira de fita adesiva decorativa (washi tape), estilo scrapbook. */
export const TapeStrip: React.FC<{
  x: number;
  y: number;
  rotate?: number;
  width?: number;
  color?: string;
}> = ({ x, y, rotate = -6, width = 110, color = "rgba(255,255,255,0.75)" }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height: 34,
      background: color,
      opacity: 0.85,
      transform: `rotate(${rotate}deg)`,
      boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
      mixBlendMode: "normal",
    }}
  />
);

/** Fundo com leve textura de papel/kraft + grão — base de todas as cenas
 * "colagem". */
export const PaperBackdrop: React.FC<{ tone?: "dark" | "light" }> = ({ tone = "dark" }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 80) * 30;
  const bg = tone === "dark" ? "#111111" : "#F4F1EA";
  const fiberOpacity = tone === "dark" ? 0.05 : 0.09;

  return (
    <AbsoluteFill style={{ backgroundColor: bg, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 820,
          height: 820,
          borderRadius: "50%",
          background:
            tone === "dark" ? "rgba(179,18,26,0.22)" : "rgba(179,18,26,0.06)",
          filter: "blur(150px)",
          top: -260 + drift,
          left: -260,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(120,110,90," +
            fiberOpacity +
            ") 0px, transparent 1px, transparent 3px), repeating-linear-gradient(90deg, rgba(120,110,90," +
            fiberOpacity +
            ") 0px, transparent 1px, transparent 3px)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            tone === "dark"
              ? "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.5) 100%)"
              : "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.06) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

/** Selo/etiqueta cutout girada, tipo adesivo colado torto de propósito. */
export const StickerLabel: React.FC<{
  text: string;
  rotate?: number;
  bg?: string;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ text, rotate = -3, bg = palette.white, color = palette.black, size = 24, style }) => (
  <div
    style={{
      display: "inline-block",
      background: bg,
      color,
      fontFamily: fontStack,
      fontWeight: 800,
      fontSize: size,
      padding: "8px 18px",
      transform: `rotate(${rotate}deg)`,
      boxShadow: "0 8px 18px rgba(0,0,0,0.35)",
      letterSpacing: 0.5,
      ...style,
    }}
  >
    {text}
  </div>
);

/** Transição de "papel rasgado" entre cenas — uma tira cobre a tela
 * inteira no instante do corte e desliza pra fora, escondendo o corte
 * seco por trás de um rasgo de papel. */
export const PaperWipe: React.FC = () => {
  const frame = useCurrentFrame();
  const boundaries = Object.values(SCENES)
    .map((s) => s.from)
    .filter((f) => f > 0);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {boundaries.map((b, i) => {
        const WINDOW = 16;
        const start = b - WINDOW / 2;
        const x = interpolate(frame, [start, b, start + WINDOW], [-140, 0, 140], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        if (frame < start - 2 || frame > start + WINDOW + 2) return null;
        const dark = i % 2 === 0;
        return (
          <div
            key={b}
            style={{
              position: "absolute",
              inset: 0,
              transform: `translateX(${x}%)`,
            }}
          >
            <TornPanel
              seed={b}
              background={dark ? palette.black : palette.white}
              shadow={false}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
