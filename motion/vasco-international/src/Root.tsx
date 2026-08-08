import React from "react";
import { Composition, Sequence, AbsoluteFill } from "remotion";
import { FPS, SCENES, TOTAL_DURATION } from "./timing";
import { BrowserSearch } from "./scenes/BrowserSearch";
import { Colagem } from "./scenes/Colagem";
import { HookValue } from "./scenes/HookValue";
import { Destino } from "./scenes/Destino";
import { Significado } from "./scenes/Significado";
import { Seletiva } from "./scenes/Seletiva";
import { CTA } from "./scenes/CTA";

const Main: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENES.browserSearch.from} durationInFrames={SCENES.browserSearch.duration}>
        <BrowserSearch />
      </Sequence>
      <Sequence from={SCENES.colagem.from} durationInFrames={SCENES.colagem.duration}>
        <Colagem />
      </Sequence>
      <Sequence from={SCENES.hookValue.from} durationInFrames={SCENES.hookValue.duration}>
        <HookValue />
      </Sequence>
      <Sequence from={SCENES.destino.from} durationInFrames={SCENES.destino.duration}>
        <Destino />
      </Sequence>
      <Sequence from={SCENES.significado.from} durationInFrames={SCENES.significado.duration}>
        <Significado />
      </Sequence>
      <Sequence from={SCENES.seletiva.from} durationInFrames={SCENES.seletiva.duration}>
        <Seletiva />
      </Sequence>
      <Sequence from={SCENES.cta.from} durationInFrames={SCENES.cta.duration}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => {
  return (
    <Composition
      id="VascoInternational"
      component={Main}
      durationInFrames={TOTAL_DURATION}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
