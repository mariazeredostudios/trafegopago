import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { palette, fontStack } from "../palette";
import { ASSETS } from "../assetsConfig";
import { useCutPunch, Typewriter } from "../components/Motion";
import { Grain } from "../components/Backdrop";
import { TornPanel, StickerLabel } from "../components/Paper";

const LINE =
  "Já pensou em vestir a Cruz de Malta\ne representar o Gigante da Colina\nno exterior?";

export const Apresentacao: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = useCutPunch(frame);

  const entrance = spring({ frame, fps, config: { damping: 13 }, durationInFrames: 22 });
  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const dropY = interpolate(entrance, [0, 1], [-160, 0]);

  const talk = Math.sin(frame / 5) * 1.4;
  const idleBob = Math.sin(frame / 18) * 7;
  const rimPulse = 0.55 + Math.sin(frame / 8) * 0.35;
  // "queixo" de papel batendo tipo marionete — abre/fecha em ritmo de fala
  const jawOffset = Math.abs(Math.sin(frame / 4.2)) * 9;

  return (
    <AbsoluteFill style={{ backgroundColor: "#05130a", overflow: "hidden", transform: `scale(${punch})` }}>
      <Stadium />
      <Grain opacity={0.06} />

      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center" }}>
        <div
          style={{
            position: "absolute",
            bottom: 300,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255,255,255,${0.16 * rimPulse}) 0%, rgba(255,255,255,0) 65%)`,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 430 }}>
        <div
          style={{
            transform: `translateY(${dropY + idleBob}px) scale(${scale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: "50%",
              overflow: "hidden",
              border: `5px solid rgba(255,255,255,0.92)`,
              boxShadow: `0 24px 60px rgba(0,0,0,0.6), 0 0 60px rgba(255,255,255,${0.25 * rimPulse})`,
              transform: `rotate(${talk}deg)`,
              background: palette.grey700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              marginBottom: -30,
            }}
          >
            {ASSETS.face.enabled ? (
              <>
                {/* rosto fixo (rosto inteiro, a "boca" fica coberta pela tira abaixo) */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${staticFile(ASSETS.face.src)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* queixo/boca recortado — desliza tipo marionete de papel */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "38%",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: jawOffset,
                      height: 300,
                      backgroundImage: `url(${staticFile(ASSETS.face.src)})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      boxShadow: "0 -3px 6px rgba(0,0,0,0.35)",
                    }}
                  />
                </div>
              </>
            ) : (
              <span style={{ fontFamily: fontStack, fontWeight: 800, fontSize: 90, color: palette.grey200 }}>LF</span>
            )}
          </div>

          <div style={{ width: 210, height: 258, overflow: "hidden", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))" }}>
            {ASSETS.jersey.enabled ? (
              <Img src={staticFile(ASSETS.jersey.src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <PlaceholderJersey />
            )}
          </div>
        </div>
      </AbsoluteFill>

      {/* etiqueta + nome, estilo adesivo colado */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 86 }}>
        <div style={{ opacity: interpolate(frame, [4, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <StickerLabel text="VASCO INTERNATIONAL" rotate={-2} bg={palette.black} color={palette.white} size={22} />
        </div>
        <div
          style={{
            marginTop: 16,
            fontFamily: fontStack,
            fontWeight: 800,
            fontSize: 52,
            color: palette.white,
            opacity: interpolate(frame, [10, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          LUCAS FORTUNA
        </div>
      </AbsoluteFill>

      {/* legenda em papel, efeito máquina de escrever */}
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 60 }}>
        <TornPanel
          seed={7}
          background="rgba(10,10,10,0.78)"
          style={{ padding: "22px 30px", maxWidth: 640 }}
        >
          <Typewriter
            text={LINE}
            from={18}
            charsPerFrame={1.15}
            size={28}
            weight={700}
            align="center"
            style={{ lineHeight: 1.35, whiteSpace: "pre-line" }}
          />
        </TornPanel>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Stadium: React.FC = () => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame, [0, 150], [0, 1]);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, #071b0e 0%, #123a1f 45%, #0c2c17 100%)" }} />
      <AbsoluteFill
        style={{
          top: "auto",
          height: "34%",
          background:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 5px, rgba(20,20,20,0.15) 5px, rgba(20,20,20,0.15) 10px)",
          opacity: 0.5,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 90px, transparent 90px, transparent 180px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -100,
          left: `${-30 + sweep * 60}%`,
          width: "70%",
          height: "160%",
          background: "linear-gradient(100deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 40%)",
          transform: "rotate(18deg)",
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 55%)" }} />
    </AbsoluteFill>
  );
};

const PlaceholderJersey: React.FC = () => (
  <div style={{ width: "100%", height: "100%", background: palette.white, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
    <div style={{ position: "absolute", top: 0, left: "18%", width: "34%", height: "100%", background: palette.black, transform: "skewX(-12deg)" }} />
    <span style={{ fontFamily: fontStack, fontWeight: 800, fontSize: 18, color: palette.grey700, zIndex: 1, background: "rgba(255,255,255,0.85)", padding: "4px 10px", borderRadius: 6 }}>
      CAMISA VASCO
    </span>
  </div>
);
