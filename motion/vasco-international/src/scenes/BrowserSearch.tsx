import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";
import { palette, fontStack } from "../palette";
import { Backdrop } from "../components/Backdrop";

const FULL_TEXT = "eu quero jogar pelo vasco da gama";

export const BrowserSearch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const typingStart = 14;
  const typingEnd = 84;
  const progress = interpolate(frame, [typingStart, typingEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });
  const chars = Math.round(progress * FULL_TEXT.length);
  const typed = FULL_TEXT.slice(0, chars);
  const cursorBlink = Math.floor(frame / 8) % 2 === 0;

  const enterPulse = interpolate(frame, [90, 96, 106], [1, 1.06, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const whiteOut = interpolate(frame, [106, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const entrance = spring({ frame, fps, config: { damping: 12 }, durationInFrames: 20 });
  const barScale = interpolate(entrance, [0, 1], [0.82, 1]);
  const barY = interpolate(entrance, [0, 1], [40, 0]);
  const barOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = 0.5 + Math.sin(frame / 10) * 0.15;

  return (
    <AbsoluteFill style={{ backgroundColor: palette.grey900, overflow: "hidden" }}>
      <Backdrop base={palette.grey900} blobColor="rgba(179,18,26,0.28)" blobColor2="rgba(255,255,255,0.08)" />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
        }}
      >
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: 4,
            color: palette.grey400,
            textTransform: "uppercase",
            marginBottom: 26,
            opacity: barOpacity,
          }}
        >
          Toda história começa com uma busca
        </div>

        {/* "Navegador" — janela com chrome + glow por baixo */}
        <div
          style={{
            width: "100%",
            transform: `translateY(${barY}px) scale(${barScale * enterPulse})`,
            opacity: barOpacity,
            borderRadius: 26,
            background: "rgba(20,20,20,0.65)",
            border: `1px solid rgba(255,255,255,0.12)`,
            boxShadow: `0 40px 90px rgba(0,0,0,0.55), 0 0 ${60 + glowPulse * 40}px rgba(179,18,26,${glowPulse * 0.3})`,
            padding: 22,
            backdropFilter: "blur(6px)",
          }}
        >
          <div style={{ display: "flex", gap: 9, marginBottom: 20, paddingLeft: 6 }}>
            <div style={{ width: 13, height: 13, borderRadius: 999, background: "#FF5F57" }} />
            <div style={{ width: 13, height: 13, borderRadius: 999, background: "#FEBC2E" }} />
            <div style={{ width: 13, height: 13, borderRadius: 999, background: "#28C840" }} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: 78,
              borderRadius: 999,
              border: `2px solid rgba(255,255,255,0.14)`,
              background: "rgba(255,255,255,0.96)",
              padding: "0 30px",
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
              <span style={{ opacity: cursorBlink ? 1 : 0, color: palette.black }}>|</span>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ backgroundColor: palette.white, opacity: whiteOut }} />
    </AbsoluteFill>
  );
};

const SearchIcon: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke={palette.grey400} strokeWidth="2.4" />
    <line x1="16.2" y1="16.2" x2="21" y2="21" stroke={palette.grey400} strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
