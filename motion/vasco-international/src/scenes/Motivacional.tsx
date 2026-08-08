import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { palette, fontStack } from "../palette";
import { PaperBackdrop } from "../components/Paper";
import { useCutPunch } from "../components/Motion";
import {
  IconBall,
  IconPlane,
  IconPin,
  IconCalendar,
  IconWave,
  IconCastle,
  IconClapper,
  IconBag,
  IconFlagUSA,
  IconPassport,
} from "../components/Icons";

// Chuva de ícones ao redor do texto — "vários ícones pra chamar bastante
// atenção", como pedido. Posições espalhadas, cada um com entrada em
// spring escalonada e leve flutuação contínua.
const ICONS: { Icon: React.FC<{ size?: number; color?: string }>; top: string; left: string; size: number; rotate: number; delay: number }[] = [
  { Icon: IconBall, top: "10%", left: "12%", size: 44, rotate: -12, delay: 0 },
  { Icon: IconPlane, top: "8%", left: "68%", size: 50, rotate: 18, delay: 3 },
  { Icon: IconPin, top: "22%", left: "82%", size: 38, rotate: 8, delay: 6 },
  { Icon: IconCalendar, top: "78%", left: "14%", size: 40, rotate: -6, delay: 9 },
  { Icon: IconWave, top: "84%", left: "70%", size: 42, rotate: 10, delay: 12 },
  { Icon: IconCastle, top: "14%", left: "40%", size: 38, rotate: -8, delay: 15 },
  { Icon: IconClapper, top: "70%", left: "88%", size: 40, rotate: 14, delay: 18 },
  { Icon: IconBag, top: "68%", left: "6%", size: 36, rotate: -14, delay: 21 },
  { Icon: IconPassport, top: "88%", left: "42%", size: 46, rotate: 6, delay: 24 },
];

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

      {ICONS.map((ic, i) => {
        const s = spring({ frame: frame - ic.delay, fps, config: { damping: 9, stiffness: 180 }, durationInFrames: 14 });
        const scale = interpolate(s, [0, 1], [0, 1]);
        const opacity = interpolate(frame, [ic.delay, ic.delay + 8], [0, 0.9], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const float = Math.sin((frame + i * 12) / 14) * 8;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: ic.top,
              left: ic.left,
              opacity,
              transform: `translateY(${float}px) scale(${scale}) rotate(${ic.rotate}deg)`,
              filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.4))",
            }}
          >
            <ic.Icon size={ic.size} color={palette.grey200} />
          </div>
        );
      })}

      <div style={{ position: "absolute", top: "8%", left: "9%" }}>
        <IconFlagUSA width={70} />
      </div>

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
