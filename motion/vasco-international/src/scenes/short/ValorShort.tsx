import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { palette, fontStack } from "../../palette";
import { PaperBackdrop } from "../../components/Paper";
import { useCutPunch } from "../../components/Motion";

// 0-60: frase da Cruz de Malta (fundo claro) / 60-120: "não pode parar" (fundo escuro)
export const ValorShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = useCutPunch(frame);

  const s1 = spring({ frame, fps, config: { damping: 11 }, durationInFrames: 16 });
  const scale1 = interpolate(s1, [0, 1], [0.6, 1]);
  const opacity1 = interpolate(frame, [0, 12, 48, 60], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const s2 = spring({ frame: frame - 60, fps, config: { damping: 11 }, durationInFrames: 16 });
  const scale2 = interpolate(s2, [0, 1], [0.6, 1]);
  const opacity2 = interpolate(frame, [60, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", transform: `scale(${punch})` }}>
      <AbsoluteFill style={{ opacity: opacity1, backgroundColor: palette.white, justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            transform: `scale(${scale1})`,
            fontFamily: fontStack,
            fontWeight: 800,
            fontSize: 44,
            color: palette.black,
            textAlign: "center",
            lineHeight: 1.18,
            letterSpacing: -1,
            padding: "0 70px",
          }}
        >
          Essa chance é somente para
          <br />
          quem carrega a Cruz de Malta
          <br />
          desde que nasceu.
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: opacity2 }}>
        <PaperBackdrop tone="dark" />
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 60px" }}>
          <div
            style={{
              transform: `scale(${scale2})`,
              fontFamily: fontStack,
              fontWeight: 800,
              fontSize: 56,
              color: palette.white,
              textAlign: "center",
              lineHeight: 1.2,
              letterSpacing: -1,
            }}
          >
            Você não pode parar.
            <br />
            Dê o primeiro passo
            <br />
            rumo aos seus sonhos.
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
