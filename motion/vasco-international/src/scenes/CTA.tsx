import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Img,
  staticFile,
} from "remotion";
import { palette, fontStack } from "../palette";
import { ASSETS } from "../assetsConfig";

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();

  // 0-50 tagline / 45-100 bio tap / 95-150 end card
  const taglineOpacity = interpolate(frame, [0, 16, 42, 54], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bioOpacity = interpolate(frame, [50, 62, 92, 104], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tapPulse = 1 + Math.sin(frame / 4) * 0.06;

  const endOpacity = interpolate(frame, [100, 116], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: palette.black }}>
      {/* Tagline */}
      <AbsoluteFill
        style={{
          opacity: taglineOpacity,
          justifyContent: "center",
          alignItems: "center",
          padding: "0 64px",
        }}
      >
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 800,
            fontSize: 58,
            color: palette.white,
            textAlign: "center",
            lineHeight: 1.14,
            letterSpacing: -1,
          }}
        >
          Venha mostrar o porquê
          <br />
          <span style={{ color: palette.red }}>você merece</span> estar
          <br />
          nessa delegação.
        </div>
      </AbsoluteFill>

      {/* Toque no link da bio */}
      <AbsoluteFill
        style={{
          opacity: bioOpacity,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 340,
            border: `2px solid ${palette.grey700}`,
            borderRadius: 28,
            padding: "28px 26px",
            background: palette.grey900,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: palette.grey700,
              margin: "0 auto 14px",
            }}
          />
          <div
            style={{
              fontFamily: fontStack,
              fontWeight: 700,
              fontSize: 22,
              color: palette.white,
              marginBottom: 4,
            }}
          >
            vascointernational
          </div>
          <div
            style={{
              fontFamily: fontStack,
              fontSize: 16,
              color: palette.grey400,
              marginBottom: 18,
            }}
          >
            Vasco International — Seletiva
          </div>
          <div
            style={{
              transform: `scale(${tapPulse})`,
              background: palette.white,
              color: palette.black,
              fontFamily: fontStack,
              fontWeight: 700,
              fontSize: 20,
              borderRadius: 999,
              padding: "12px 0",
            }}
          >
            🔗 link na bio
          </div>
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: fontStack,
            fontWeight: 600,
            fontSize: 24,
            color: palette.grey200,
            textAlign: "center",
            padding: "0 60px",
            lineHeight: 1.35,
          }}
        >
          Toque no link da bio para
          <br />
          se inscrever na seletiva
        </div>
      </AbsoluteFill>

      {/* End card */}
      <AbsoluteFill
        style={{
          opacity: endOpacity,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            marginBottom: 34,
          }}
        >
          <Badge enabled={ASSETS.vascoShield.enabled} src={ASSETS.vascoShield.src} label="V" />
          <span
            style={{
              fontFamily: fontStack,
              fontWeight: 300,
              fontSize: 34,
              color: palette.grey400,
            }}
          >
            ×
          </span>
          <Badge enabled={ASSETS.ieLogo.enabled} src={ASSETS.ieLogo.src} label="iE" />
        </div>
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 800,
            fontSize: 30,
            color: palette.white,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Acesse www.vascodagamainternational.com
        </div>
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 500,
            fontSize: 22,
            color: palette.grey400,
            textAlign: "center",
            padding: "0 70px",
          }}
        >
          para saber mais sobre o projeto
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Badge: React.FC<{ enabled: boolean; src: string; label: string }> = ({
  enabled,
  src,
  label,
}) => (
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
    }}
  >
    {enabled ? (
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    ) : (
      <span
        style={{
          fontFamily: fontStack,
          fontWeight: 800,
          fontSize: 40,
          color: palette.grey200,
        }}
      >
        {label}
      </span>
    )}
  </div>
);
