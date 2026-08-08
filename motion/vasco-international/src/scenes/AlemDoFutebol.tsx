import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { palette, fontStack } from "../palette";
import { PaperBackdrop, TornPanel, StickerLabel } from "../components/Paper";
import { useCutPunch } from "../components/Motion";

type Line = { text: string; in: number; out: number; size?: number; sticker?: boolean };

const LINES: Line[] = [
  { text: "Independência.", in: 0, out: 46, size: 72, sticker: true },
  { text: "Maturidade.", in: 40, out: 86, size: 72, sticker: true },
  { text: "Intercâmbio cultural.", in: 80, out: 132, size: 60 },
  { text: "A metodologia do Vasco,\nna prática.", in: 126, out: 182, size: 54 },
  { text: "Pra quem carrega o\nCasaca no peito.", in: 176, out: 230, size: 50 },
];

// 0-230 frases / 230-300 fechamento "Camisas Negras"
export const AlemDoFutebol: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = useCutPunch(frame);

  const closeOpacity = interpolate(frame, [230, 250], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const closeSpring = spring({ frame: frame - 230, fps, config: { damping: 12 }, durationInFrames: 20 });
  const closeScale = interpolate(closeSpring, [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", transform: `scale(${punch})` }}>
      <PaperBackdrop tone="light" />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {LINES.map((line, i) => {
          const fadeIn = interpolate(frame, [line.in, line.in + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const fadeOut = interpolate(frame, [line.out - 12, line.out], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const opacity = Math.min(fadeIn, fadeOut);
          if (opacity <= 0) return null;
          const s = spring({ frame: frame - line.in, fps, config: { damping: 11 }, durationInFrames: 16 });
          const scale = interpolate(s, [0, 1], [0.6, 1]);

          if (line.sticker) {
            return (
              <div key={i} style={{ position: "absolute", opacity, transform: `scale(${scale})` }}>
                <StickerLabel text={line.text} rotate={i % 2 === 0 ? -4 : 4} bg={palette.black} color={palette.white} size={line.size} />
              </div>
            );
          }
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                opacity,
                transform: `scale(${scale})`,
                fontFamily: fontStack,
                fontWeight: 800,
                fontSize: line.size,
                color: palette.black,
                textAlign: "center",
                lineHeight: 1.15,
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

      <AbsoluteFill style={{ opacity: closeOpacity, transform: `scale(${closeScale})`, justifyContent: "center", alignItems: "center" }}>
        <TornPanel seed={42} background={palette.black} style={{ padding: "34px 44px" }}>
          <div style={{ fontFamily: fontStack, fontWeight: 800, fontSize: 44, color: palette.white, textAlign: "center", letterSpacing: -1 }}>
            ORGULHO DE SER VASCO.
          </div>
        </TornPanel>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
