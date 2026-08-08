import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { palette, fontStack } from "../../palette";
import { ASSETS } from "../../assetsConfig";
import { PaperBackdrop } from "../../components/Paper";
import { useCutPunch, Highlight } from "../../components/Motion";

// 0-64 tagline / 58-96 bio / 90-144 end card — pequenas sobreposições
// pra transição ficar suave dentro de um corte tão curto.
export const CTAShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = useCutPunch(frame);

  const taglineOpacity = interpolate(frame, [0, 10, 52, 62], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineSpring = spring({ frame, fps, config: { damping: 12 }, durationInFrames: 16 });
  const taglineScale = interpolate(taglineSpring, [0, 1], [0.6, 1]);

  const bioOpacity = interpolate(frame, [58, 68, 86, 96], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const endOpacity = interpolate(frame, [92, 108], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const endSpring = spring({ frame: frame - 92, fps, config: { damping: 12 }, durationInFrames: 16 });
  const endScale = interpolate(endSpring, [0, 1], [0.7, 1]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", transform: `scale(${punch})` }}>
      <PaperBackdrop tone="dark" />

      <AbsoluteFill style={{ opacity: taglineOpacity, transform: `scale(${taglineScale})`, justifyContent: "center", alignItems: "center", padding: "0 56px" }}>
        <div style={{ fontFamily: fontStack, fontWeight: 800, fontSize: 50, color: palette.white, textAlign: "center", lineHeight: 1.28, letterSpacing: -1 }}>
          Venha mostrar por que
          <br />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 42 }}>👉</span>
            <Highlight dark={false} rotate={-1.5} style={{ fontWeight: 800, fontSize: 50 }}>
              VOCÊ MERECE
            </Highlight>
          </span>
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 600 }}>estar nessa delegação.</span>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: bioOpacity, justifyContent: "center", alignItems: "center" }}>
        <div style={{ fontFamily: fontStack, fontWeight: 800, fontSize: 40, color: palette.white, textAlign: "center", padding: "0 60px" }}>
          🔗 Link na bio
        </div>
        <div style={{ marginTop: 14, fontFamily: fontStack, fontWeight: 600, fontSize: 24, color: palette.grey300, textAlign: "center" }}>
          vascodagamainternational.com
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: endOpacity, transform: `scale(${endScale})`, justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 28 }}>
          <Badge enabled={ASSETS.vascoShield.enabled} src={ASSETS.vascoShield.src} label="V" />
          <span style={{ fontFamily: fontStack, fontWeight: 300, fontSize: 30, color: palette.grey400 }}>×</span>
          <Badge enabled={ASSETS.ieLogo.enabled} src={ASSETS.ieLogo.src} label="iE" />
        </div>
        <div style={{ fontFamily: fontStack, fontWeight: 800, fontSize: 24, color: palette.white, textAlign: "center" }}>
          vascodagamainternational.com
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Badge: React.FC<{ enabled: boolean; src: string; label: string }> = ({ enabled, src, label }) => (
  <div style={{ width: 100, height: 100, borderRadius: 20, background: palette.grey900, border: `2px solid ${palette.grey700}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
    {enabled ? (
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    ) : (
      <span style={{ fontFamily: fontStack, fontWeight: 800, fontSize: 34, color: palette.grey200 }}>{label}</span>
    )}
  </div>
);
