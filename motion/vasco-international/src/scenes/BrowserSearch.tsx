import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { palette, fontStack } from "../palette";
import { Backdrop } from "../components/Backdrop";

const FULL_TEXT = "eu quero jogar pelo vasco da gama";

// Cena de 90 frames (3s) — digitação tem que terminar bem antes do corte
// pro "enter" respirar antes da transição em papel rasgado assumir.
export const BrowserSearch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const typingStart = 3;
  const typingEnd = 58;
  const progress = interpolate(frame, [typingStart, typingEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const chars = Math.round(progress * FULL_TEXT.length);
  const typed = FULL_TEXT.slice(0, chars);
  const cursorBlink = Math.floor(frame / 6) % 2 === 0;

  const enterPulse = interpolate(frame, [60, 66, 74], [1, 1.07, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const entrance = spring({ frame, fps, config: { damping: 12 }, durationInFrames: 14 });
  const barScale = interpolate(entrance, [0, 1], [0.82, 1]);
  const barY = interpolate(entrance, [0, 1], [40, 0]);
  const barOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = 0.5 + Math.sin(frame / 10) * 0.15;

  return (
    <AbsoluteFill style={{ backgroundColor: "#161616", overflow: "hidden" }}>
      <Backdrop base="#161616" blobColor="rgba(255,255,255,0.1)" blobColor2="rgba(255,255,255,0.05)" />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 60 }}>
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: 4,
            color: palette.grey400,
            textTransform: "uppercase",
            marginBottom: 24,
            opacity: barOpacity,
          }}
        >
          Toda história começa com uma busca
        </div>

        <div
          style={{
            width: "100%",
            transform: `translateY(${barY}px) scale(${barScale * enterPulse})`,
            opacity: barOpacity,
            borderRadius: 26,
            background: "rgba(255,255,255,0.06)",
            border: `1px solid rgba(255,255,255,0.14)`,
            boxShadow: `0 40px 90px rgba(0,0,0,0.55), 0 0 ${50 + glowPulse * 30}px rgba(255,255,255,${glowPulse * 0.12})`,
            padding: 22,
            backdropFilter: "blur(6px)",
          }}
        >
          <div style={{ display: "flex", gap: 9, marginBottom: 20, paddingLeft: 6 }}>
            <div style={{ width: 13, height: 13, borderRadius: 999, background: palette.grey400 }} />
            <div style={{ width: 13, height: 13, borderRadius: 999, background: palette.grey400 }} />
            <div style={{ width: 13, height: 13, borderRadius: 999, background: palette.grey400 }} />
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
                fontSize: 29,
                fontWeight: 600,
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
    </AbsoluteFill>
  );
};

const SearchIcon: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke={palette.grey400} strokeWidth="2.4" />
    <line x1="16.2" y1="16.2" x2="21" y2="21" stroke={palette.grey400} strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
