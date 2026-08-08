import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { palette, fontStack } from "../../palette";
import { PaperBackdrop, TornPanel, TapeStrip, StickerLabel } from "../../components/Paper";
import { useCutPunch, Highlight } from "../../components/Motion";
import { IconBall, IconPin, IconCalendar, IconSpark } from "../../components/Icons";

const FIELDS: { Icon: React.FC<{ size?: number; color?: string }>; label: string; value: string }[] = [
  { Icon: IconPin, label: "Local", value: "CT Heleno de Barros Nunes" },
  { Icon: IconCalendar, label: "Data", value: "16 de Agosto" },
  { Icon: IconBall, label: "Faixa etária", value: "8 a 19 anos" },
];

export const SeletivaShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = useCutPunch(frame);

  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardStart = 20;
  const tagOpacity = interpolate(frame, [cardStart + 60, cardStart + 76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", transform: `scale(${punch})` }}>
      <PaperBackdrop tone="dark" />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 64px" }}>
        <div style={{ opacity: titleOpacity, marginBottom: 20, textAlign: "center" }}>
          <StickerLabel text="COMO FUNCIONA A SELETIVA" rotate={-2} bg={palette.black} color={palette.white} size={18} />
        </div>

        <div style={{ width: "100%", maxWidth: 620, position: "relative" }}>
          <TapeStrip x={40} y={-12} rotate={-4} width={80} />
          <TapeStrip x={460} y={-12} rotate={5} width={80} />
          <TornPanel seed={55} background="rgba(244,241,234,0.97)" style={{ padding: "26px 26px" }}>
            {FIELDS.map((f, i) => {
              const start = cardStart + i * 14;
              const s = spring({ frame: frame - start, fps, config: { damping: 13 }, durationInFrames: 14 });
              const x = interpolate(s, [0, 1], [-36, 0]);
              const opacity = interpolate(frame, [start, start + 10], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              if (opacity <= 0) return null;
              return (
                <div key={f.label} style={{ opacity, transform: `translateX(${x}px)`, display: "flex", alignItems: "center", gap: 16, marginBottom: i === FIELDS.length - 1 ? 0 : 18 }}>
                  <f.Icon size={28} color={palette.black} />
                  <div>
                    <div style={{ fontFamily: fontStack, fontWeight: 700, fontSize: 15, color: palette.grey700, letterSpacing: 1, textTransform: "uppercase" }}>
                      {f.label}
                    </div>
                    <div style={{ fontFamily: fontStack, fontWeight: 800, fontSize: 26, color: palette.black }}>
                      {f.label === "Data" || f.label === "Local" ? (
                        <Highlight rotate={-1} style={{ fontSize: 26, fontWeight: 800 }}>
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
            opacity: tagOpacity,
            marginTop: 26,
            fontFamily: fontStack,
            fontWeight: 800,
            fontSize: 26,
            color: palette.black,
            background: palette.white,
            padding: "11px 24px",
            borderRadius: 999,
          }}
        >
          Vagas exclusivas
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
