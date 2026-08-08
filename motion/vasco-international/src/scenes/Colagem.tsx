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

// Cena "colagem" — cabeça real recortada sobre um boneco pequeno vestindo a
// camisa do Vasco, dentro de um campo de futebol. Referência: efeito
// "bobblehead" que você mandou (a garota gigante na Plaza Mayor).
export const Colagem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 }, durationInFrames: 20 });
  const scale = interpolate(entrance, [0, 1], [0.7, 1]);
  const dropY = interpolate(entrance, [0, 1], [-120, 0]);

  // "fala" — micro-oscilação da cabeça simulando movimento, já que não há
  // áudio embutido (voz real entra depois, dublada em cima disso no CapCut).
  const talk = Math.sin(frame / 3) * 2.2;
  const idleBob = Math.sin(frame / 18) * 6;

  const line1 = interpolate(frame, [18, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2 = interpolate(frame, [55, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: palette.grey900, overflow: "hidden" }}>
      <FieldBackground />

      {/* vinheta pra dar profundidade e destacar o boneco */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 360,
        }}
      >
        <div
          style={{
            transform: `translateY(${dropY + idleBob}px) scale(${scale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* cabeça */}
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: "50%",
              overflow: "hidden",
              border: `6px solid ${palette.white}`,
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
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
              <Img
                src={staticFile(ASSETS.face.src)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span
                style={{
                  fontFamily: fontStack,
                  fontWeight: 800,
                  fontSize: 90,
                  color: palette.grey200,
                }}
              >
                LF
              </span>
            )}
          </div>

          {/* corpo / camisa */}
          <div
            style={{
              width: 210,
              height: 260,
              borderRadius: "24px 24px 60px 60px",
              overflow: "hidden",
              boxShadow: "0 24px 40px rgba(0,0,0,0.45)",
            }}
          >
            {ASSETS.jersey.enabled ? (
              <Img
                src={staticFile(ASSETS.jersey.src)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <PlaceholderJersey />
            )}
          </div>
        </div>
      </AbsoluteFill>

      {/* legendas do que ele está falando */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 130 }}>
        <div
          style={{
            opacity: line1,
            transform: `translateY(${(1 - line1) * 16}px)`,
            fontFamily: fontStack,
            fontWeight: 800,
            fontSize: 46,
            color: palette.white,
            textAlign: "center",
            letterSpacing: -0.5,
          }}
        >
          LUCAS FORTUNA
        </div>
        <div
          style={{
            opacity: line2,
            transform: `translateY(${(1 - line2) * 16}px)`,
            fontFamily: fontStack,
            fontWeight: 500,
            fontSize: 28,
            color: palette.grey200,
            textAlign: "center",
            marginTop: 8,
          }}
        >
          Coordenador do Vasco International
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const FieldBackground: React.FC = () => {
  if (ASSETS.field.enabled) {
    return (
      <Img
        src={staticFile(ASSETS.field.src)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }
  // gramado ilustrado (listras) como placeholder
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #163a1e 0%, #1d4d27 55%, #164023 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 90px, transparent 90px, transparent 180px)",
        }}
      />
    </AbsoluteFill>
  );
};

const PlaceholderJersey: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: palette.white,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "18%",
        width: "34%",
        height: "100%",
        background: palette.black,
        transform: "skewX(-12deg)",
      }}
    />
    <span
      style={{
        fontFamily: fontStack,
        fontWeight: 800,
        fontSize: 20,
        color: palette.grey700,
        zIndex: 1,
        background: "rgba(255,255,255,0.85)",
        padding: "4px 10px",
        borderRadius: 6,
      }}
    >
      CAMISA VASCO
    </span>
  </div>
);
