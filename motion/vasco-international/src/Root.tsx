import React from "react";
import { Composition, Sequence, AbsoluteFill } from "remotion";
import { FPS, SCENES, TOTAL_DURATION } from "./timing";
import { BrowserSearch } from "./scenes/BrowserSearch";
import { Apresentacao } from "./scenes/Apresentacao";
import { DisneyCup } from "./scenes/DisneyCup";
import { AlemDoFutebol } from "./scenes/AlemDoFutebol";
import { Motivacional } from "./scenes/Motivacional";
import { Seletiva } from "./scenes/Seletiva";
import { TelefoneFeed } from "./scenes/TelefoneFeed";
import { CTA } from "./scenes/CTA";
import { PaperWipe } from "./components/Paper";

const Main: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENES.hook.from} durationInFrames={SCENES.hook.duration}>
        <BrowserSearch />
      </Sequence>
      <Sequence from={SCENES.apresentacao.from} durationInFrames={SCENES.apresentacao.duration}>
        <Apresentacao />
      </Sequence>
      <Sequence from={SCENES.disneyCup.from} durationInFrames={SCENES.disneyCup.duration}>
        <DisneyCup />
      </Sequence>
      <Sequence from={SCENES.alemDoFutebol.from} durationInFrames={SCENES.alemDoFutebol.duration}>
        <AlemDoFutebol />
      </Sequence>
      <Sequence from={SCENES.motivacional.from} durationInFrames={SCENES.motivacional.duration}>
        <Motivacional />
      </Sequence>
      <Sequence from={SCENES.seletiva.from} durationInFrames={SCENES.seletiva.duration}>
        <Seletiva />
      </Sequence>
      <Sequence from={SCENES.telefoneFeed.from} durationInFrames={SCENES.telefoneFeed.duration}>
        <TelefoneFeed />
      </Sequence>
      <Sequence from={SCENES.cta.from} durationInFrames={SCENES.cta.duration}>
        <CTA />
      </Sequence>
      <PaperWipe />
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
