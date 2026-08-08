import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { palette, fontStack } from "../palette";
import { PaperBackdrop, TornPanel, TapeStrip, StickerLabel } from "../components/Paper";
import { useCutPunch, Highlight, Typewriter } from "../components/Motion";
import {
  IconCastle,
  IconWave,
  IconBall,
  IconPin,
  IconPlane,
  IconClapper,
  IconBag,
  IconFlagUSA,
  IconPassport,
} from "../components/Icons";

const EXPERIENCES: { text: string; Icon: React.FC<{ size?: number; color?: string }>; rotate: number }[] = [
  { text: "Tour na Rollins College", Icon: IconPin, rotate: -3 },
  { text: "Treinos em Lakeland com a comissão técnica", Icon: IconBall, rotate: 2 },
  { text: "Typhoon Lagoon", Icon: IconWave, rotate: -2 },
  { text: "Disney Springs", Icon: IconBag, rotate: 3 },
  { text: "Blizzard Beach", Icon: IconWave, rotate: -3 },
  { text: "Magic Kingdom", Icon: IconCastle, rotate: 2 },
  { text: "Hollywood Studios", Icon: IconClapper, rotate: -2 },
];

const HOLD = 36; // ~1.2s por item — corte rápido, não fica parado

// 0-70: título / 74-360: um card por vez, cortando rápido (não acumula)
export const DisneyCup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = useCutPunch(frame);

  const headOpacity = interpolate(frame, [0, 14, 54, 70], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headScale = interpolate(frame, [54, 70], [1, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const planeX = interpolate(frame, [0, 56], [-40, 140], { extrapolateRight: "clamp" });

  const flagSpring = spring({ frame: frame - 26, fps, config: { damping: 10, stiffness: 160 }, durationInFrames: 16 });
  const flagScale = interpolate(flagSpring, [0, 1], [0.3, 1]);
  const flagOpacity = interpolate(frame, [26, 36, 58, 70], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const passportSpring = spring({ frame: frame - 32, fps, config: { damping: 10, stiffness: 160 }, durationInFrames: 16 });
  const passportScale = interpolate(passportSpring, [0, 1], [0.3, 1]);
  const passportOpacity = interpolate(frame, [32, 42, 58, 70], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const listStart = 74;
  const localList = Math.max(0, frame - listStart);
  const activeIndex = Math.min(EXPERIENCES.length - 1, Math.floor(localList / HOLD));
  const itemLocal = localList - activeIndex * HOLD;
  const active = EXPERIENCES[activeIndex];

  const itemSpring = spring({ frame: itemLocal, fps, config: { damping: 11, stiffness: 170 }, durationInFrames: 12 });
  const itemScale = interpolate(itemSpring, [0, 1], [0.5, 1]);
  const itemOutOpacity = interpolate(itemLocal, [HOLD - 10, HOLD], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const itemInOpacity = interpolate(itemLocal, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const counterOpacity = interpolate(frame, [listStart, listStart + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", transform: `scale(${punch})` }}>
      <PaperBackdrop tone="dark" />

      {/* avião grande cruzando a tela */}
      <div
        style={{
          position: "absolute",
          top: "14%",
          left: `${planeX}%`,
          opacity: interpolate(frame, [0, 10, 48, 58], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: "rotate(24deg)",
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))",
        }}
      >
        <IconPlane size={128} color={palette.white} />
      </div>

      {/* bandeira dos EUA de um lado, passaporte do outro — chamando atenção */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "9%",
          opacity: flagOpacity,
          transform: `scale(${flagScale}) rotate(-6deg)`,
          filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.5))",
        }}
      >
        <IconFlagUSA width={130} />
      </div>
      <div
        style={{
          position: "absolute",
          top: "27%",
          right: "9%",
          opacity: passportOpacity,
          transform: `scale(${passportScale}) rotate(7deg)`,
          filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.5))",
        }}
      >
        <IconPassport size={110} />
      </div>

      <AbsoluteFill
        style={{
          opacity: headOpacity,
          transform: `scale(${headScale})`,
          justifyContent: "center",
          alignItems: "center",
          padding: "0 60px",
        }}
      >
        <StickerLabel text="VASCO INTERNATIONAL 2027" rotate={-2} bg={palette.black} color={palette.white} size={21} />
        <div style={{ marginTop: 22 }}>
          <Typewriter text="DISNEY CUP" from={16} charsPerFrame={1.1} size={100} weight={800} style={{ letterSpacing: -2 }} />
        </div>
        <div style={{ marginTop: 12 }}>
          <Highlight dark rotate={0.5} style={{ fontSize: 34, fontWeight: 800, letterSpacing: 3 }}>
            ORLANDO · USA
          </Highlight>
        </div>
        <div
          style={{
            marginTop: 20,
            fontFamily: fontStack,
            fontWeight: 500,
            fontStyle: "italic",
            fontSize: 29,
            color: palette.grey400,
            textAlign: "center",
            lineHeight: 1.35,
          }}
        >
          Julho de 2027 — complexo da ESPN
          <br />
          Wide World of Sports
        </div>
      </AbsoluteFill>

      {/* um item por vez, cortando rápido */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 68px" }}>
        <div
          style={{
            opacity: counterOpacity,
            position: "absolute",
            top: "20%",
            fontFamily: fontStack,
            fontWeight: 700,
            fontSize: 25,
            color: palette.grey400,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          A jornada · {String(activeIndex + 1).padStart(2, "0")}/{String(EXPERIENCES.length).padStart(2, "0")}
        </div>

        <div
          style={{
            opacity: Math.min(itemInOpacity, itemOutOpacity),
            transform: `scale(${itemScale}) rotate(${active.rotate}deg)`,
            position: "relative",
            width: "100%",
            maxWidth: 620,
          }}
        >
          <TapeStrip x={230} y={-16} rotate={active.rotate * 2} width={100} />
          <TornPanel
            seed={activeIndex + 100}
            background="rgba(244,241,234,0.97)"
            style={{ padding: "34px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}
          >
            <active.Icon size={54} color={palette.black} />
            <span
              style={{
                fontFamily: fontStack,
                fontWeight: 800,
                fontSize: 41,
                color: palette.black,
                letterSpacing: -0.5,
                textAlign: "center",
                lineHeight: 1.15,
              }}
            >
              {active.text}
            </span>
          </TornPanel>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
