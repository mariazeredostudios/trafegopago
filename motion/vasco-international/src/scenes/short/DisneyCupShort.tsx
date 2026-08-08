import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { palette, fontStack } from "../../palette";
import { PaperBackdrop, TornPanel, TapeStrip, StickerLabel } from "../../components/Paper";
import { useCutPunch, Highlight, Typewriter } from "../../components/Motion";
import { IconBall, IconCastle, IconClapper, IconFlagUSA, IconPassport, IconPlane } from "../../components/Icons";

const HIGHLIGHTS: { text: string; Icon: React.FC<{ size?: number; color?: string }> }[] = [
  { text: "Treinos com a comissão técnica", Icon: IconBall },
  { text: "Magic Kingdom", Icon: IconCastle },
  { text: "Hollywood Studios", Icon: IconClapper },
];
const HOLD = 30; // 1s por item — corte de trailer, bem rápido

export const DisneyCupShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = useCutPunch(frame);

  const headOpacity = interpolate(frame, [0, 10, 42, 54], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headScale = interpolate(frame, [42, 54], [1, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const planeX = interpolate(frame, [0, 40], [-40, 140], { extrapolateRight: "clamp" });
  const flagOpacity = interpolate(frame, [16, 24, 40, 54], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const listStart = 58;
  const localList = Math.max(0, frame - listStart);
  const activeIndex = Math.min(HIGHLIGHTS.length - 1, Math.floor(localList / HOLD));
  const itemLocal = localList - activeIndex * HOLD;
  const active = HIGHLIGHTS[activeIndex];
  const itemSpring = spring({ frame: itemLocal, fps, config: { damping: 11, stiffness: 180 }, durationInFrames: 10 });
  const itemScale = interpolate(itemSpring, [0, 1], [0.5, 1]);
  const itemOpacity = Math.min(
    interpolate(itemLocal, [0, 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(itemLocal, [HOLD - 8, HOLD], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden", transform: `scale(${punch})` }}>
      <PaperBackdrop tone="dark" />

      <div
        style={{
          position: "absolute",
          top: "16%",
          left: `${planeX}%`,
          opacity: interpolate(frame, [0, 8, 34, 42], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: "rotate(24deg)",
        }}
      >
        <IconPlane size={90} color={palette.white} />
      </div>
      <div style={{ position: "absolute", top: "28%", left: "10%", opacity: flagOpacity, transform: "rotate(-6deg)" }}>
        <IconFlagUSA width={90} />
      </div>
      <div style={{ position: "absolute", top: "26%", right: "10%", opacity: flagOpacity, transform: "rotate(7deg)" }}>
        <IconPassport size={78} />
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
        <StickerLabel text="VASCO INTERNATIONAL 2027" rotate={-2} bg={palette.black} color={palette.white} size={18} />
        <div style={{ marginTop: 18 }}>
          <Typewriter text="DISNEY CUP" from={10} charsPerFrame={1.6} size={82} weight={800} style={{ letterSpacing: -2 }} />
        </div>
        <div style={{ marginTop: 10 }}>
          <Highlight dark rotate={0.5} style={{ fontSize: 28, fontWeight: 800, letterSpacing: 3 }}>
            ORLANDO · USA
          </Highlight>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 68px" }}>
        <div style={{ opacity: itemOpacity, transform: `scale(${itemScale})`, position: "relative", width: "100%", maxWidth: 600 }}>
          <TapeStrip x={220} y={-14} rotate={-6} width={90} />
          <TornPanel seed={activeIndex + 200} background="rgba(244,241,234,0.97)" style={{ padding: "30px 26px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <active.Icon size={46} color={palette.black} />
            <span style={{ fontFamily: fontStack, fontWeight: 800, fontSize: 32, color: palette.black, textAlign: "center", lineHeight: 1.15 }}>
              {active.text}
            </span>
          </TornPanel>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
