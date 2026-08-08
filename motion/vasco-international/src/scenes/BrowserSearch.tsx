import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { palette, fontStack } from "../palette";

const FULL_TEXT = "eu quero jogar pelo vasco da gama";

export const BrowserSearch: React.FC = () => {
  const frame = useCurrentFrame();

  // Digitação: começa no frame 12, ~2 chars/frame de "peso" (ritmo tipo humano,
  // não constante) — termina por volta do frame 80.
  const typingStart = 12;
  const typingEnd = 82;
  const progress = interpolate(frame, [typingStart, typingEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });
  const chars = Math.round(progress * FULL_TEXT.length);
  const typed = FULL_TEXT.slice(0, chars);

  const cursorBlink = Math.floor(frame / 8) % 2 === 0;

  // Enter pressionado ~frame 92: caixa "pulsa" e a tela começa a clarear
  // (whip transition) pra cena seguinte.
  const enterPulse = interpolate(frame, [90, 96, 104], [1, 1.04, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const whiteOut = interpolate(frame, [104, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const barIn = interpolate(frame, [0, 12], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const barOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: palette.white }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 64,
        }}
      >
        {/* Chrome de navegador minimalista */}
        <div
          style={{
            width: "100%",
            transform: `translateY(${barIn}px) scale(${enterPulse})`,
            opacity: barOpacity,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 18,
              paddingLeft: 4,
            }}
          >
            {[palette.grey400, palette.grey400, palette.grey400].map(
              (c, i) => (
                <div
                  key={i}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    background: c,
                  }}
                />
              )
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: 74,
              borderRadius: 999,
              border: `2px solid ${palette.grey200}`,
              boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
              padding: "0 30px",
              background: "#FFFFFF",
            }}
          >
            <SearchIcon />
            <div
              style={{
                fontFamily: fontStack,
                fontSize: 30,
                fontWeight: 500,
                color: palette.grey900,
                marginLeft: 18,
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {typed}
              <span
                style={{
                  opacity: cursorBlink ? 1 : 0,
                  color: palette.black,
                }}
              >
                |
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          backgroundColor: palette.white,
          opacity: whiteOut,
        }}
      />
    </AbsoluteFill>
  );
};

const SearchIcon: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle
      cx="11"
      cy="11"
      r="7"
      stroke={palette.grey400}
      strokeWidth="2.4"
    />
    <line
      x1="16.2"
      y1="16.2"
      x2="21"
      y2="21"
      stroke={palette.grey400}
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);
