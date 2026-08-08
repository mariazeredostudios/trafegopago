import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { palette, fontStack } from "../palette";
import { ASSETS } from "../assetsConfig";
import { PaperBackdrop, TornPanel, StickerLabel } from "../components/Paper";
import { useCutPunch, Highlight } from "../components/Motion";

// 0-90 tagline / 85-190 instagram->bio / 185-300 end card
export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = useCutPunch(frame);

  const taglineOpacity = interpolate(frame, [0, 16, 78, 94], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineSpring = spring({ frame, fps, config: { damping: 12 }, durationInFrames: 20 });
  const taglineScale = interpolate(taglineSpring, [0, 1], [0.6, 1]);

  const bioOpacity = interpolate(frame, [90, 106, 178, 194], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple = interpolate(frame % 24, [0, 24], [0, 1]);
  const rippleOpacity = interpolate(frame % 24, [0, 24], [0.5, 0]);

  const endOpacity = interpolate(frame, [188, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const endSpring = spring({ frame: frame - 188, fps, config: { damping: 12 }, durationInFrames: 20 });
  const endScale = interpolate(endSpring, [0, 1], [0.7, 1]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", transform: `scale(${punch})` }}>
      <PaperBackdrop tone="dark" />

      <AbsoluteFill style={{ opacity: taglineOpacity, transform: `scale(${taglineScale})`, justifyContent: "center", alignItems: "center", padding: "0 56px" }}>
        <div style={{ fontFamily: fontStack, fontWeight: 800, fontSize: 58, color: palette.white, textAlign: "center", lineHeight: 1.3, letterSpacing: -1 }}>
          Venha mostrar por que
          <br />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 46 }}>👉</span>
            <Highlight dark={false} rotate={-1.5} style={{ fontWeight: 800, fontSize: 58 }}>
              VOCÊ MERECE
            </Highlight>
          </span>
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 600 }}>estar nessa delegação.</span>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: bioOpacity, justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            width: 340,
            border: `2px solid ${palette.grey700}`,
            borderRadius: 28,
            padding: "28px 26px",
            background: "rgba(20,20,20,0.9)",
            textAlign: "center",
            boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: `conic-gradient(${palette.white}, ${palette.grey700}, ${palette.grey200}, ${palette.white})`,
              margin: "0 auto 14px",
              padding: 3,
            }}
          >
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: palette.grey900 }} />
          </div>
          <div style={{ fontFamily: fontStack, fontWeight: 700, fontSize: 24, color: palette.white, marginBottom: 4 }}>
            vascointernational
          </div>
          <div style={{ fontFamily: fontStack, fontSize: 18, color: palette.grey400, marginBottom: 18 }}>
            Vasco International — Seletiva
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                border: `2px solid ${palette.white}`,
                transform: `scale(${1 + ripple * 0.45})`,
                opacity: rippleOpacity,
              }}
            />
            <div style={{ background: palette.white, color: palette.black, fontFamily: fontStack, fontWeight: 700, fontSize: 22, borderRadius: 999, padding: "12px 0", position: "relative" }}>
              🔗 link na bio
            </div>
          </div>
        </div>
        <div style={{ marginTop: 28, fontFamily: fontStack, fontWeight: 600, fontSize: 27, color: palette.grey200, textAlign: "center", padding: "0 60px", lineHeight: 1.35 }}>
          vascodagamainternational.com
          <br />
          ou toque no link da bio
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: endOpacity, transform: `scale(${endScale})`, justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 26, marginBottom: 34 }}>
          <Badge enabled={ASSETS.vascoShield.enabled} src={ASSETS.vascoShield.src} label="V" />
          <span style={{ fontFamily: fontStack, fontWeight: 300, fontSize: 34, color: palette.grey400 }}>×</span>
          <Badge enabled={ASSETS.ieLogo.enabled} src={ASSETS.ieLogo.src} label="iE" />
        </div>
        <div style={{ opacity: 0.9 }}>
          <StickerLabel text="vascodagamainternational.com" rotate={-1} bg={palette.white} color={palette.black} size={24} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Badge: React.FC<{ enabled: boolean; src: string; label: string }> = ({ enabled, src, label }) => (
  <div
    style={{
      width: 120,
      height: 120,
      borderRadius: 24,
      background: palette.grey900,
      border: `2px solid ${palette.grey700}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      boxShadow: "0 0 40px rgba(255,255,255,0.12)",
    }}
  >
    {enabled ? (
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    ) : (
      <span style={{ fontFamily: fontStack, fontWeight: 800, fontSize: 40, color: palette.grey200 }}>{label}</span>
    )}
  </div>
);
