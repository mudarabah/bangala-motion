// The whole video: background, the ten scenes for each half of the voiceover,
// a corner logo, the end card, the voice and the sound design.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, Glass, LogoCard, LogoMark, Scene } from "./components/kit";
import { SoundDesign } from "./components/SoundDesign";
import { audioDuration, lastWord, partA, partB, tail, type Timeline } from "./data/timeline";
import { AddressScene } from "./scenes/AddressScene";
import { BankScene } from "./scenes/BankScene";
import { CompanyScene } from "./scenes/CompanyScene";
import { DetailsScene } from "./scenes/DetailsScene";
import { ImportScene } from "./scenes/ImportScene";
import { PayoutScene } from "./scenes/PayoutScene";
import { PrincipalScene } from "./scenes/PrincipalScene";
import { ProfitScene } from "./scenes/ProfitScene";
import { SecurityScene } from "./scenes/SecurityScene";
import { TransparencyScene } from "./scenes/TransparencyScene";
import { design, motion } from "./theme";

type Key = keyof Timeline;
const ORDER: Key[] = ["import", "profit", "company", "transparency", "bank", "details", "payout", "principal", "security", "address"];

// Scenes fade in a little before their first word and overlap the next scene by one transition.
const PRE = 0.4;
// End card after the last word ("গাজীপুর") has been said.
const END_CARD = lastWord + 0.6;
export const TOTAL_SECONDS = audioDuration + tail;

// Scenes that already show the logo don't get the corner badge.
const WITH_CORNER_LOGO = new Set<Key>(["import", "profit", "transparency", "bank", "details", "payout", "principal", "security"]);

const renderScene = (key: Key, t: Timeline, nextStart: number) => {
  switch (key) {
    case "import":
      return <ImportScene t={t.import} />;
    case "profit":
      return <ProfitScene t={t.profit} />;
    case "company":
      return <CompanyScene t={t.company} />;
    case "transparency":
      return <TransparencyScene t={t.transparency} />;
    case "bank":
      return <BankScene t={t.bank} />;
    case "details":
      return <DetailsScene t={t.details} />;
    case "payout":
      return <PayoutScene t={t.payout} />;
    case "principal":
      return <PrincipalScene t={t.principal} />;
    case "security":
      return <SecurityScene t={t.security} end={nextStart - 1} />;
    case "address":
      return <AddressScene t={t.address} />;
  }
};

const CornerLogo: React.FC<{ at: number }> = ({ at }) => (
  <Appear at={at} rise={0} style={{ position: "absolute", right: 70, top: 56 }}>
    <Glass style={{ padding: "12px 20px", borderRadius: 22, background: "rgba(255,255,255,0.94)" }}>
      <LogoMark width={170} />
    </Glass>
  </Appear>
);

const EndCard: React.FC = () => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <Appear at={END_CARD} scaleFrom={0.9}>
      <LogoCard size={560} />
    </Appear>
  </AbsoluteFill>
);

export const Video: React.FC = () => {
  const { fps } = useVideoConfig();
  const overlap = motion.transitionFrames / fps;
  const parts = [partA, partB];

  const scenes = parts.flatMap((t, p) =>
    ORDER.map((key, i) => {
      const nextStart =
        i < ORDER.length - 1 ? t[ORDER[i + 1]].start : p < parts.length - 1 ? parts[p + 1].import.start : END_CARD + PRE;
      return { key, t, p, from: t[key].start - PRE, to: nextStart - PRE + overlap, nextStart };
    }),
  );

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 0, top: 0, width: design.width, height: design.height, zoom: design.zoom }}>
        <Background />
        {scenes.map(({ key, t, p, from, to, nextStart }) => (
          <Scene key={`${p}-${key}`} from={from} to={to}>
            {renderScene(key, t, nextStart)}
            {WITH_CORNER_LOGO.has(key) ? <CornerLogo at={t[key].start} /> : null}
          </Scene>
        ))}
        {/* Runs past the end so it never fades out. */}
        <Scene from={END_CARD - PRE} to={TOTAL_SECONDS + 1}>
          <EndCard />
        </Scene>
      </div>
      <Audio src={staticFile("voiceover.mp3")} />
      <SoundDesign />
    </AbsoluteFill>
  );
};
