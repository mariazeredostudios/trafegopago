import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";
import { palette, fontStack } from "../palette";

export const Seletiva: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dateSpring = spring({
    frame: frame - 14,
    fps,
    config: { damping: 12 },
    durationInFrames: 22,
  });
  const dateScale = interpolate(dateSpring, [0, 1], [0.75, 1]);
  const dateOpacity = interpolate(frame, [14, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const detailsOpacity = interpolate(frame, [45, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const detailsY = interpolate(frame, [45, 65], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const tagOpacity = interpolate(frame, [100, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.black,
        justifyContent: "center",
        alignItems: "center",
        padding: "0 70px",
      }}
    >
      <div
        style={{
          opacity: labelOpacity,
          fontFamily: fontStack,
          fontWeight: 700,
          fontSize: 26,
          color: palette.grey400,
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        Seletiva Vasco International
      </div>

      <div
        style={{
          opacity: dateOpacity,
          transform: `scale(${dateScale})`,
          fontFamily: fontStack,
          fontWeight: 800,
          fontSize: 96,
          color: palette.white,
          textAlign: "center",
          lineHeight: 1,
          letterSpacing: -2,
          marginBottom: 24,
        }}
      >
        16 DE MARÇO
      </div>

      <div
        style={{
          opacity: detailsOpacity,
          transform: `translateY(${detailsY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 600,
            fontSize: 32,
            color: palette.grey200,
            marginBottom: 10,
          }}
        >
          CT Heleno de Barros Nunes
        </div>
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 500,
            fontSize: 26,
            color: palette.grey400,
          }}
        >
          Atletas de 8 a 19 anos · avaliados por
          <br />
          treinadores da base do Vasco
        </div>
      </div>

      <div
        style={{
          opacity: tagOpacity,
          marginTop: 40,
          fontFamily: fontStack,
          fontWeight: 800,
          fontSize: 30,
          color: palette.black,
          background: palette.white,
          padding: "12px 28px",
          borderRadius: 999,
          letterSpacing: -0.5,
        }}
      >
        Vagas exclusivas
      </div>
    </AbsoluteFill>
  );
};
