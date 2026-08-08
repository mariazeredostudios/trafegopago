import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { palette, fontStack } from "../palette";
import { PaperBackdrop, TornPanel, TapeStrip, StickerLabel } from "../components/Paper";
import { useCutPunch, Highlight } from "../components/Motion";
import { IconBall, IconPin, IconCalendar, IconSpark } from "../components/Icons";

const FIELDS: { Icon: React.FC<{ size?: number; color?: string }>; label: string; value: string }[] = [
  { Icon: IconBall, label: "Faixa etária", value: "8 a 19 anos" },
  { Icon: IconPin, label: "Local", value: "CT Heleno de Barros Nunes" },
  { Icon: IconCalendar, label: "Data", value: "16 de Março" },
  { Icon: IconSpark, label: "Avaliação", value: "Treinadores da base oficial do clube" },
];

export const Seletiva: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = useCutPunch(frame);

  const titleOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardStart = 30;

  return (
    <AbsoluteFill style={{ overflow: "hidden", transform: `scale(${punch})` }}>
      <PaperBackdrop tone="dark" />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 64px" }}>
        <div style={{ opacity: titleOpacity, marginBottom: 26, textAlign: "center" }}>
          <StickerLabel text="COMO FUNCIONA A SELETIVA" rotate={-2} bg={palette.black} color={palette.white} size={20} />
          <div
            style={{
              marginTop: 16,
              fontFamily: fontStack,
              fontWeight: 800,
              fontSize: 44,
              color: palette.white,
              lineHeight: 1.1,
            }}
          >
            CT Heleno de Barros Nunes
            <br />
            <span style={{ color: palette.grey400, fontSize: 26, fontWeight: 600 }}>ou São Januário</span>
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: 640, position: "relative" }}>
          <TapeStrip x={40} y={-14} rotate={-4} width={90} />
          <TapeStrip x={480} y={-14} rotate={5} width={90} />
          <TornPanel seed={55} background="rgba(244,241,234,0.97)" style={{ padding: "30px 28px" }}>
            {FIELDS.map((f, i) => {
              const start = cardStart + i * 18;
              const s = spring({ frame: frame - start, fps, config: { damping: 13 }, durationInFrames: 16 });
              const x = interpolate(s, [0, 1], [-40, 0]);
              const opacity = interpolate(frame, [start, start + 12], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              if (opacity <= 0) return null;
              return (
                <div
                  key={f.label}
                  style={{
                    opacity,
                    transform: `translateX(${x}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    marginBottom: i === FIELDS.length - 1 ? 0 : 20,
                  }}
                >
                  <f.Icon size={30} color={palette.black} />
                  <div>
                    <div style={{ fontFamily: fontStack, fontWeight: 700, fontSize: 16, color: palette.grey700, letterSpacing: 1, textTransform: "uppercase" }}>
                      {f.label}
                    </div>
                    <div style={{ fontFamily: fontStack, fontWeight: 800, fontSize: 27, color: palette.black }}>
                      {f.label === "Data" || f.label === "Local" ? (
                        <Highlight rotate={-1} style={{ fontSize: 27, fontWeight: 800 }}>
                          {f.value}
                        </Highlight>
                      ) : (
                        f.value
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </TornPanel>
        </div>

        <div
          style={{
            marginTop: 30,
            opacity: interpolate(frame, [cardStart + 90, cardStart + 108], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: fontStack,
            fontWeight: 800,
            fontSize: 26,
            color: palette.black,
            background: palette.white,
            padding: "12px 26px",
            borderRadius: 999,
            boxShadow: "0 0 40px rgba(255,255,255,0.3)",
          }}
        >
          Vagas exclusivas
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
