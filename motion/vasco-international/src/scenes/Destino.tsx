import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { palette, fontStack } from "../palette";

const EXPERIENCES = [
  "Tour na Rollins College",
  "Treino em Lakeland",
  "Treino com os treinadores do clube",
  "Typhoon Lagoon",
  "Disney Springs",
  "Blizzard Beach",
  "Magic Kingdom",
  "Hollywood Studios",
];

// 0-70: reveal do destino / 70-240: lista kinetic das experiências
export const Destino: React.FC = () => {
  const frame = useCurrentFrame();

  const headOpacity = interpolate(frame, [0, 16, 55, 72], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headY = interpolate(frame, [0, 18], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const listStart = 72;

  return (
    <AbsoluteFill style={{ backgroundColor: palette.black }}>
      {/* Reveal: destino */}
      <AbsoluteFill
        style={{
          opacity: headOpacity,
          transform: `translateY(${headY}px)`,
          justifyContent: "center",
          alignItems: "center",
          padding: "0 70px",
        }}
      >
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 600,
            fontSize: 30,
            color: palette.grey400,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Vasco International 2027
        </div>
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 800,
            fontSize: 92,
            color: palette.white,
            textAlign: "center",
            lineHeight: 1,
            letterSpacing: -2,
          }}
        >
          Disney Cup
        </div>
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 500,
            fontSize: 30,
            color: palette.grey200,
            textAlign: "center",
            marginTop: 22,
            lineHeight: 1.3,
          }}
        >
          Julho de 2027 — ESPN Wide World of
          <br />
          Sports Complex, Orlando
        </div>
      </AbsoluteFill>

      {/* Lista kinetic de experiências */}
      <AbsoluteFill style={{ justifyContent: "center", padding: "0 90px" }}>
        <div
          style={{
            opacity: interpolate(frame, [listStart, listStart + 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: fontStack,
            fontWeight: 700,
            fontSize: 26,
            color: palette.grey400,
            marginBottom: 20,
            letterSpacing: 1,
          }}
        >
          A viagem inclui:
        </div>
        {EXPERIENCES.map((exp, i) => {
          const start = listStart + 8 + i * 16;
          const opacity = interpolate(frame, [start, start + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x = interpolate(frame, [start, start + 14], [-24, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div
              key={exp}
              style={{
                opacity,
                transform: `translateX(${x}px)`,
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: palette.white,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: fontStack,
                  fontWeight: 700,
                  fontSize: 34,
                  color: palette.white,
                  letterSpacing: -0.5,
                }}
              >
                {exp}
              </span>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
