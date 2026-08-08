import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { palette, fontStack } from "../palette";
import { PaperBackdrop, TornPanel, TapeStrip, StickerLabel } from "../components/Paper";
import { useCutPunch } from "../components/Motion";
import { IconCastle, IconWave, IconBall, IconPin, IconSpark, IconPlane } from "../components/Icons";

const EXPERIENCES: { text: string; Icon: React.FC<{ size?: number; color?: string }>; rotate: number }[] = [
  { text: "Tour na Rollins College", Icon: IconPin, rotate: -3 },
  { text: "Treinos em Lakeland com a comissão técnica", Icon: IconBall, rotate: 2 },
  { text: "Typhoon Lagoon", Icon: IconWave, rotate: -2 },
  { text: "Disney Springs", Icon: IconCastle, rotate: 3 },
  { text: "Blizzard Beach", Icon: IconWave, rotate: -3 },
  { text: "Magic Kingdom", Icon: IconCastle, rotate: 2 },
  { text: "Hollywood Studios", Icon: IconSpark, rotate: -2 },
];

// 0-72: título / 72-360: quadro de recortes (scrapbook) com scroll vertical
export const DisneyCup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = useCutPunch(frame);

  const headOpacity = interpolate(frame, [0, 16, 58, 74], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headScale = interpolate(frame, [58, 74], [1, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleSpring = spring({ frame, fps, config: { damping: 11 }, durationInFrames: 20 });
  const titleScale = interpolate(titleSpring, [0, 1], [0.5, 1]);

  const planeX = interpolate(frame, [0, 60], [-30, 130], { extrapolateRight: "clamp" });

  const listStart = 78;

  return (
    <AbsoluteFill style={{ overflow: "hidden", transform: `scale(${punch})` }}>
      <PaperBackdrop tone="dark" />

      {/* avião cruzando a tela */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: `${planeX}%`,
          opacity: interpolate(frame, [0, 10, 50, 62], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: "rotate(24deg)",
        }}
      >
        <IconPlane size={48} color={palette.grey200} />
      </div>

      {/* Reveal do título */}
      <AbsoluteFill
        style={{
          opacity: headOpacity,
          transform: `scale(${headScale})`,
          justifyContent: "center",
          alignItems: "center",
          padding: "0 60px",
        }}
      >
        <StickerLabel text="VASCO INTERNATIONAL 2027" rotate={-2} bg={palette.red} color={palette.white} size={19} />
        <div style={{ marginTop: 22, transform: `scale(${titleScale})` }}>
          <div
            style={{
              fontFamily: fontStack,
              fontWeight: 800,
              fontSize: 92,
              color: palette.white,
              textAlign: "center",
              lineHeight: 1,
              letterSpacing: -2,
              textShadow: "0 0 60px rgba(255,255,255,0.2)",
            }}
          >
            DISNEY CUP
          </div>
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: fontStack,
            fontWeight: 800,
            fontSize: 34,
            color: palette.grey200,
            letterSpacing: 3,
          }}
        >
          ORLANDO · USA
        </div>
        <div
          style={{
            marginTop: 20,
            fontFamily: fontStack,
            fontWeight: 500,
            fontSize: 27,
            color: palette.grey400,
            textAlign: "center",
            lineHeight: 1.35,
          }}
        >
          Julho de 2027 — complexo da ESPN
          <br />
          Wide World of Sports
        </div>
      </AbsoluteFill>

      {/* mural de recortes */}
      <AbsoluteFill style={{ justifyContent: "center", padding: "0 68px" }}>
        <div
          style={{
            opacity: interpolate(frame, [listStart, listStart + 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: fontStack,
            fontWeight: 700,
            fontSize: 22,
            color: palette.grey400,
            marginBottom: 16,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          A jornada
        </div>
        {EXPERIENCES.map((exp, i) => {
          const start = listStart + 10 + i * 32;
          const s = spring({ frame: frame - start, fps, config: { damping: 12 }, durationInFrames: 16 });
          const scale = interpolate(s, [0, 1], [0.6, 1]);
          const opacity = interpolate(frame, [start, start + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          if (opacity <= 0) return null;
          return (
            <div
              key={exp.text}
              style={{
                opacity,
                transform: `scale(${scale}) rotate(${exp.rotate}deg)`,
                marginBottom: 16,
                position: "relative",
              }}
            >
              <TapeStrip x={26} y={-10} rotate={exp.rotate * 2} width={70} />
              <TornPanel
                seed={i + 100}
                background="rgba(244,241,234,0.95)"
                style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}
              >
                <exp.Icon size={28} color={palette.black} />
                <span
                  style={{
                    fontFamily: fontStack,
                    fontWeight: 700,
                    fontSize: 26,
                    color: palette.black,
                    letterSpacing: -0.3,
                  }}
                >
                  {exp.text}
                </span>
              </TornPanel>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
