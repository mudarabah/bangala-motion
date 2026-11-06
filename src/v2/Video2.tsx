// The Reseller & Investment video (green-glass): background, 26 scenes in voice order,
// a corner logo, the voice and the sound design.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, Glass, LogoMark, PaletteProvider, Scene } from "../components/kit";
import { design, greenPalette, motion } from "../theme";
import { SoundDesign2 } from "./SoundDesign2";
import { audioDuration, tail, tl, type Timeline2 } from "./timeline";
import { DreamScene, IntroScene, QuestionsScene, WeHandleScene } from "./scenes/Hook";
import { CommissionScene, ModelScene, NoCostScene, OrdersScene, StepsScene } from "./scenes/Reseller";
import { AdToolsScene, CourierScene, ShopScene, SupportScene } from "./scenes/Platform";
import { FairScene, InvestPivotScene, PoolScene, PrincipleScene, ProfitSplitScene, RealGoodsScene } from "./scenes/Invest";
import { CtaScene, DashboardScene, Dream2Scene, ImpactScene, OutroScene, PayoutScene, YouthScene } from "./scenes/Close";

type Key = keyof Timeline2;

// Scene order follows the voice; each renders from its own cues.
const SCENES: { [K in Key]: React.FC<{ t: Timeline2[K] }> } = {
  dream: DreamScene,
  questions: QuestionsScene,
  weHandle: WeHandleScene,
  intro: IntroScene,
  model: ModelScene,
  noCost: NoCostScene,
  steps: StepsScene,
  orders: OrdersScene,
  commission: CommissionScene,
  shop: ShopScene,
  adTools: AdToolsScene,
  courier: CourierScene,
  support: SupportScene,
  investPivot: InvestPivotScene,
  realGoods: RealGoodsScene,
  principle: PrincipleScene,
  profitSplit: ProfitSplitScene,
  fair: FairScene,
  pool: PoolScene,
  dashboard: DashboardScene,
  payout: PayoutScene,
  impact: ImpactScene,
  youth: YouthScene,
  dream2: Dream2Scene,
  cta: CtaScene,
  outro: OutroScene,
};
const ORDER = Object.keys(SCENES) as Key[];

// Scenes fade in a little before their first word and overlap the next by one transition.
const PRE = 0.4;
export const TOTAL_SECONDS_2 = audioDuration + tail;

// Scenes that already show the logo don't get the corner badge.
const NO_CORNER_LOGO = new Set<Key>(["intro", "weHandle", "courier", "investPivot", "outro"]);

const CornerLogo: React.FC<{ at: number }> = ({ at }) => (
  <Appear at={at} rise={0} style={{ position: "absolute", right: 70, top: 56 }}>
    <Glass style={{ padding: "12px 20px", borderRadius: 22, background: "rgba(255,255,255,0.94)" }}>
      <LogoMark width={170} />
    </Glass>
  </Appear>
);

export const Video2: React.FC = () => {
  const { fps } = useVideoConfig();
  const overlap = motion.transitionFrames / fps;
  return (
    <PaletteProvider value={greenPalette}>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 0, top: 0, width: design.width, height: design.height, zoom: design.zoom }}>
          <Background />
          {ORDER.map((key, i) => {
            const SceneComponent = SCENES[key] as React.FC<{ t: Timeline2[Key] }>;
            const last = i === ORDER.length - 1;
            // The last scene runs past the end so the logo never fades out.
            const to = last ? TOTAL_SECONDS_2 + 1 : tl[ORDER[i + 1]].start - PRE + overlap;
            return (
              <Scene key={key} from={tl[key].start - PRE} to={to}>
                <SceneComponent t={tl[key]} />
                {NO_CORNER_LOGO.has(key) ? null : <CornerLogo at={tl[key].start} />}
              </Scene>
            );
          })}
        </div>
        <Audio src={staticFile("voiceover-2026-11-06.mp3")} />
        <SoundDesign2 />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
