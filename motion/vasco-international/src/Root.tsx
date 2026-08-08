import React from "react";
import { Composition, Sequence, AbsoluteFill } from "remotion";
import { FPS, SCENES, TOTAL_DURATION } from "./timing";
import { SCENES_SHORT, TOTAL_DURATION_SHORT } from "./shortTiming";
import { BrowserSearch } from "./scenes/BrowserSearch";
import { Apresentacao } from "./scenes/Apresentacao";
import { DisneyCup } from "./scenes/DisneyCup";
import { AlemDoFutebol } from "./scenes/AlemDoFutebol";
import { Motivacional } from "./scenes/Motivacional";
import { Seletiva } from "./scenes/Seletiva";
import { TelefoneFeed } from "./scenes/TelefoneFeed";
import { CTA } from "./scenes/CTA";
import { PaperWipe } from "./components/Paper";
import { DisneyCupShort } from "./scenes/short/DisneyCupShort";
import { ValorShort } from "./scenes/short/ValorShort";
import { SeletivaShort } from "./scenes/short/SeletivaShort";
import { TelefoneShort } from "./scenes/short/TelefoneShort";
import { CTAShort } from "./scenes/short/CTAShort";

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
      <PaperWipe boundaries={Object.values(SCENES).map((s) => s.from)} />
    </AbsoluteFill>
  );
};

// Corte curto (trailer/Reels, ~28s) — mesma linguagem visual, ritmo bem
// mais rápido, feito do zero pra não ficar "espremido" como um corte manual.
const MainShort: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENES_SHORT.hook.from} durationInFrames={SCENES_SHORT.hook.duration}>
        <BrowserSearch />
      </Sequence>
      <Sequence from={SCENES_SHORT.apresentacao.from} durationInFrames={SCENES_SHORT.apresentacao.duration}>
        <Apresentacao />
      </Sequence>
      <Sequence from={SCENES_SHORT.disneyCup.from} durationInFrames={SCENES_SHORT.disneyCup.duration}>
        <DisneyCupShort />
      </Sequence>
      <Sequence from={SCENES_SHORT.valor.from} durationInFrames={SCENES_SHORT.valor.duration}>
        <ValorShort />
      </Sequence>
      <Sequence from={SCENES_SHORT.seletiva.from} durationInFrames={SCENES_SHORT.seletiva.duration}>
        <SeletivaShort />
      </Sequence>
      <Sequence from={SCENES_SHORT.telefone.from} durationInFrames={SCENES_SHORT.telefone.duration}>
        <TelefoneShort />
      </Sequence>
      <Sequence from={SCENES_SHORT.cta.from} durationInFrames={SCENES_SHORT.cta.duration}>
        <CTAShort />
      </Sequence>
      <PaperWipe boundaries={Object.values(SCENES_SHORT).map((s) => s.from)} />
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="VascoInternational"
        component={Main}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="VascoInternationalReels"
        component={MainShort}
        durationInFrames={TOTAL_DURATION_SHORT}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
