import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { palette, fontStack } from "../palette";
import { PaperBackdrop } from "../components/Paper";
import { useCutPunch } from "../components/Motion";

export const Motivacional: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = useCutPunch(frame);

  const line1Opacity = interpolate(frame, [8, 22, 40, 50], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line1Spring = spring({ frame: frame - 8, fps, config: { damping: 10 }, durationInFrames: 16 });
  const line1Scale = interpolate(line1Spring, [0, 1], [0.5, 1]);

  const line2Opacity = interpolate(frame, [46, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Spring = spring({ frame: frame - 46, fps, config: { damping: 10 }, durationInFrames: 18 });
  const line2Scale = interpolate(line2Spring, [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", transform: `scale(${punch})` }}>
      <PaperBackdrop tone="dark" />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 60px" }}>
        <div
          style={{
            position: "absolute",
            opacity: line1Opacity,
            transform: `scale(${line1Scale})`,
            fontFamily: fontStack,
            fontWeight: 800,
            fontSize: 62,
            color: palette.white,
            textAlign: "center",
            letterSpacing: -1,
          }}
        >
          Você não pode parar.
        </div>
        <div
          style={{
            position: "absolute",
            opacity: line2Opacity,
            transform: `scale(${line2Scale})`,
            fontFamily: fontStack,
            fontWeight: 800,
            fontSize: 52,
            color: palette.white,
            textAlign: "center",
            letterSpacing: -1,
            lineHeight: 1.2,
          }}
        >
          Dê o primeiro passo
          <br />
          rumo aos seus sonhos.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
