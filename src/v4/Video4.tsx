// The Mudarabah explainer (2026-11-12 voice, green-glass): background, 22 scenes in
// voice order, two white light blooms at the big turns, a corner logo, voice and sound.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Appear, Background, Glass, LogoMark, PaletteProvider, Scene } from "../components/kit";
import { design, greenPalette, motion } from "../theme";
import { SoundDesign4 } from "./SoundDesign4";
import { audioDuration, tail, tl, type Timeline4 } from "./timeline";
import {
  FairnessScene,
  FairScene,
  HandshakeScene,
  IdleScene,
  LossScene,
  NamingScene,
  NegligenceScene,
  NoCapitalScene,
  NoFixedScene,
  PartiesScene,
  ProfitSplitScene,
} from "./scenes/Explain";
import {
  CompanyScene,
  ContractScene,
  CtaScene,
  DashboardScene,
  FamilyScene,
  FlowScene,
  HalalScene,
  NoBurdenScene,
  RealBizScene,
  ReturnsScene,
  TaglineScene,
} from "./scenes/Proof";

type Key = keyof Timeline4;

const SCENES: { [K in Key]: React.FC<{ t: Timeline4[K] }> } = {
  idle: IdleScene,
  noCapital: NoCapitalScene,
  handshake: HandshakeScene,
  naming: NamingScene,
  fair: FairScene,
  parties: PartiesScene,
  profitSplit: ProfitSplitScene,
  noFixed: NoFixedScene,
  loss: LossScene,
  negligence: NegligenceScene,
  fairness: FairnessScene,
  contract: ContractScene,
  dashboard: DashboardScene,
  noBurden: NoBurdenScene,
  realBiz: RealBizScene,
  company: CompanyScene,
  flow: FlowScene,
  returns: ReturnsScene,
  halal: HalalScene,
  family: FamilyScene,
  tagline: TaglineScene,
  cta: CtaScene,
};
const ORDER = Object.keys(SCENES) as Key[];

const PRE = 0.4;
export const TOTAL_SECONDS_4 = audioDuration + tail;

// Corner logo once the company has been named, except on the end card.
const CORNER = new Set<Key>(["flow", "returns", "halal", "family", "tagline"]);

const CornerLogo: React.FC<{ at: number }> = ({ at }) => (
  <Appear at={at} rise={0} style={{ position: "absolute", right: 70, top: 50 }}>
    <Glass style={{ padding: "8px 14px", borderRadius: 22, background: "rgba(255,255,255,0.94)" }}>
      <LogoMark width={170} />
    </Glass>
  </Appear>
);

// A soft white bloom that fills the frame for a moment (the silence before a big beat).
const Bloom: React.FC<{ peak: number; half: number }> = ({ peak, half }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const o = interpolate(t, [peak - half, peak, peak + half], [0, 0.75, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (o <= 0) return null;
  return <AbsoluteFill style={{ background: "radial-gradient(closest-side, rgba(255,255,255,1), rgba(255,255,255,0.85))", opacity: o }} />;
};

export const Video4: React.FC = () => {
  const { fps } = useVideoConfig();
  const overlap = motion.transitionFrames / fps;
  return (
    <PaletteProvider value={greenPalette}>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 0, top: 0, width: design.width, height: design.height, zoom: design.zoom }}>
          <Background />
          {ORDER.map((key, i) => {
            const SceneComponent = SCENES[key] as React.FC<{ t: Timeline4[Key] }>;
            const last = i === ORDER.length - 1;
            const to = last ? TOTAL_SECONDS_4 + 1 : tl[ORDER[i + 1]].start - PRE + overlap;
            return (
              <Scene key={key} from={Math.max(0, tl[key].start - PRE)} to={to}>
                <SceneComponent t={tl[key]} />
                {CORNER.has(key) ? <CornerLogo at={tl[key].start - 0.3} /> : null}
              </Scene>
            );
          })}
          {/* light sweeps into the brand reveal and into the tagline */}
          <Bloom peak={tl.company.start - 0.35} half={0.45} />
          <Bloom peak={tl.tagline.start - 0.45} half={0.6} />
        </div>
        <Audio src={staticFile("voiceover-2026-11-12.mp3")} />
        <SoundDesign4 />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
