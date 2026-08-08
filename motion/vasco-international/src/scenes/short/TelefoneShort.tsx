import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, OffthreadVideo, staticFile } from "remotion";
import { palette, fontStack } from "../../palette";
import { PaperBackdrop } from "../../components/Paper";
import { useCutPunch } from "../../components/Motion";
import { ASSETS } from "../../assetsConfig";

// Versão curta: mostra a gravação acelerada (~6x) — dá pra sentir o feed
// rolando sem segurar a cena por 20s, do jeito que cabe num corte de 28s.
export const TelefoneShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = useCutPunch(frame);

  const s = spring({ frame, fps, config: { damping: 12 }, durationInFrames: 14 });
  const scale = interpolate(s, [0, 1], [0.7, 1]);
  const opacity = interpolate(frame, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const captionOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ overflow: "hidden", transform: `scale(${punch})` }}>
      <PaperBackdrop tone="dark" />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            opacity,
            transform: `scale(${scale})`,
            width: 300,
            height: 618,
            borderRadius: 44,
            background: "#000",
            border: "9px solid #0a0a0a",
            boxShadow: "0 40px 90px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,255,255,0.12)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 22, background: "#0a0a0a", borderRadius: "0 0 14px 14px", zIndex: 3 }} />
          {ASSETS.igFeedFast.enabled ? (
            <OffthreadVideo src={staticFile(ASSETS.igFeedFast.src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
          ) : (
            <AbsoluteFill style={{ background: "#111" }} />
          )}
        </div>
        <div style={{ opacity: captionOpacity, marginTop: 26, fontFamily: fontStack, fontWeight: 700, fontSize: 24, color: palette.grey200, textAlign: "center", padding: "0 70px" }}>
          Segue @vascointernational
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
