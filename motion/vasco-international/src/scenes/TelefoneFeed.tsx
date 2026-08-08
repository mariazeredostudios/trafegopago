import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  OffthreadVideo,
  staticFile,
} from "remotion";
import { palette, fontStack } from "../palette";
import { PaperBackdrop } from "../components/Paper";
import { useCutPunch } from "../components/Motion";
import { ASSETS } from "../assetsConfig";

// Continuação do clique em "Vagas exclusivas" — o telefone "abre" mostrando
// o feed do Instagram rodando. Enquanto a gravação de tela não chega, mostra
// um esqueleto de feed (stories + post) pra não ficar em branco.
export const TelefoneFeed: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = useCutPunch(frame);

  const s = spring({ frame, fps, config: { damping: 12 }, durationInFrames: 18 });
  const scale = interpolate(s, [0, 1], [0.7, 1]);
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const captionOpacity = interpolate(frame, [16, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", transform: `scale(${punch})` }}>
      <PaperBackdrop tone="dark" />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            opacity,
            transform: `scale(${scale})`,
            width: 320,
            height: 660,
            borderRadius: 46,
            background: "#000",
            border: "10px solid #0a0a0a",
            boxShadow: "0 40px 90px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,255,255,0.12)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* notch */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 130,
              height: 24,
              background: "#0a0a0a",
              borderRadius: "0 0 16px 16px",
              zIndex: 3,
            }}
          />

          {ASSETS.igFeed.enabled ? (
            <OffthreadVideo
              src={staticFile(ASSETS.igFeed.src)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              muted
            />
          ) : (
            <FeedSkeleton />
          )}
        </div>

        <div
          style={{
            opacity: captionOpacity,
            marginTop: 30,
            fontFamily: fontStack,
            fontWeight: 700,
            fontSize: 26,
            color: palette.grey200,
            textAlign: "center",
            padding: "0 70px",
          }}
        >
          Segue @vascointernational
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const FeedSkeleton: React.FC = () => {
  const frame = useCurrentFrame();
  const scrollY = interpolate(frame, [0, 90], [0, -180]);
  return (
    <div style={{ width: "100%", height: "100%", background: "#0e0e0e" }}>
      {/* barra superior */}
      <div style={{ display: "flex", alignItems: "center", padding: "34px 14px 10px", gap: 8 }}>
        <div style={{ fontFamily: fontStack, fontWeight: 800, fontSize: 16, color: palette.white }}>
          Instagram
        </div>
      </div>
      {/* stories */}
      <div style={{ display: "flex", gap: 10, padding: "10px 14px" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: `2px solid ${palette.grey400}`,
              background: palette.grey700,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      {/* feed rolando */}
      <div style={{ transform: `translateY(${scrollY}px)`, padding: "10px 14px" }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: palette.grey700 }} />
              <div style={{ width: 90, height: 8, borderRadius: 4, background: palette.grey700 }} />
            </div>
            <div style={{ width: "100%", height: 170, borderRadius: 8, background: palette.grey900, border: `1px solid ${palette.grey700}` }} />
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: palette.grey700 }} />
              <div style={{ width: 20, height: 20, borderRadius: 4, background: palette.grey700 }} />
              <div style={{ width: 20, height: 20, borderRadius: 4, background: palette.grey700 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
