import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { palette, fontStack } from "../palette";
import { PaperBackdrop, TornPanel, TapeStrip, StickerLabel } from "../components/Paper";
import { useCutPunch, Highlight } from "../components/Motion";
import { IconBall, IconPin, IconCalendar, IconSpark, IconCursor } from "../components/Icons";

const FIELDS: { Icon: React.FC<{ size?: number; color?: string }>; label: string; value: string }[] = [
  { Icon: IconBall, label: "Faixa etária", value: "8 a 19 anos" },
  { Icon: IconPin, label: "Local", value: "CT Heleno de Barros Nunes" },
  { Icon: IconCalendar, label: "Data", value: "16 de Agosto" },
  { Icon: IconSpark, label: "Avaliação", value: "Treinadores da base oficial do clube" },
];

export const Seletiva: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = useCutPunch(frame);

  const titleOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardStart = 30;

  // cursor entra, "clica" no botão e o anel pulsa — deixa o CTA claro de
  // que dá pra tocar/clicar ali (prepara a próxima cena, o telefone).
  const CLICK = 264;
  const cursorOpacity = interpolate(frame, [214, 228], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorX = interpolate(frame, [214, CLICK], [130, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [214, CLICK], [90, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorScale = interpolate(
    frame,
    [CLICK - 6, CLICK, CLICK + 6],
    [1, 0.82, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const clickPulse = interpolate(
    frame,
    [CLICK - 6, CLICK, CLICK + 10],
    [1, 0.92, 1.05],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const ringScale = interpolate(frame, [CLICK, CLICK + 24], [1, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringOpacity = interpolate(frame, [CLICK, CLICK + 4, CLICK + 24], [0, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", transform: `scale(${punch})` }}>
      <PaperBackdrop tone="dark" />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 64px" }}>
        <div style={{ opacity: titleOpacity, marginBottom: 26, textAlign: "center" }}>
          <StickerLabel text="COMO FUNCIONA A SELETIVA" rotate={-2} bg={palette.black} color={palette.white} size={22} />
          <div
            style={{
              marginTop: 16,
              fontFamily: fontStack,
              fontWeight: 800,
              fontSize: 50,
              color: palette.white,
              lineHeight: 1.1,
            }}
          >
            CT Heleno de Barros Nunes
            <br />
            <span style={{ color: palette.grey400, fontSize: 29, fontWeight: 600 }}>ou São Januário</span>
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
                    <div style={{ fontFamily: fontStack, fontWeight: 700, fontSize: 18, color: palette.grey700, letterSpacing: 1, textTransform: "uppercase" }}>
                      {f.label}
                    </div>
                    <div style={{ fontFamily: fontStack, fontWeight: 800, fontSize: 30, color: palette.black }}>
                      {f.label === "Data" || f.label === "Local" ? (
                        <Highlight rotate={-1} style={{ fontSize: 30, fontWeight: 800 }}>
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

        <div style={{ position: "relative", marginTop: 30 }}>
          <div
            style={{
              opacity: interpolate(frame, [cardStart + 90, cardStart + 108], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `scale(${clickPulse})`,
              fontFamily: fontStack,
              fontWeight: 800,
              fontSize: 29,
              color: palette.black,
              background: palette.white,
              padding: "12px 26px",
              borderRadius: 999,
              boxShadow: "0 0 40px rgba(255,255,255,0.3)",
            }}
          >
            Vagas exclusivas
          </div>

          {/* anel de clique */}
          <div
            style={{
              position: "absolute",
              inset: -6,
              borderRadius: 999,
              border: `3px solid ${palette.white}`,
              opacity: ringOpacity,
              transform: `scale(${ringScale})`,
              pointerEvents: "none",
            }}
          />

          {/* cursor entrando e clicando */}
          <div
            style={{
              position: "absolute",
              right: 10,
              bottom: -6,
              opacity: cursorOpacity,
              transform: `translate(${cursorX}px, ${cursorY}px) scale(${cursorScale})`,
            }}
          >
            <IconCursor size={38} color={palette.white} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
