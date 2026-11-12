// The Uddokta Journey video (green-glass): background, 16 scenes in voice order,
// a corner wordmark once the brand is named, the voice and the sound design.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, Glass, PaletteProvider, Scene } from "../components/kit";
import { design, greenPalette, motion } from "../theme";
import { SoundDesign3 } from "./SoundDesign3";
import { SolvedTracker } from "./hassles";
import { audioDuration, tail, tl, type Timeline3 } from "./timeline";
import { BuriedScene, ChecklistScene, LetsStartScene, NoMoreScene, OverwhelmScene, StudyScene, WishScene } from "./scenes/Story";
import {
  AutoScene,
  BrandScene,
  FirstOrderScene,
  HomeScene,
  OutroScene,
  ProductsScene,
  StockScene,
  WeDoScene,
  Wordmark,
  YouJustScene,
} from "./scenes/Solution";

type Key = keyof Timeline3;

const SCENES: { [K in Key]: React.FC<{ t: Timeline3[K] }> } = {
  study: StudyScene,
  buried: BuriedScene,
  wish: WishScene,
  letsStart: LetsStartScene,
  checklist: ChecklistScene,
  overwhelm: OverwhelmScene,
  noMore: NoMoreScene,
  brand: BrandScene,
  products: ProductsScene,
  stock: StockScene,
  weDo: WeDoScene,
  auto: AutoScene,
  youJust: YouJustScene,
  firstOrder: FirstOrderScene,
  home: HomeScene,
  outro: OutroScene,
};
const ORDER = Object.keys(SCENES) as Key[];

const PRE = 0.4;
export const TOTAL_SECONDS_3 = audioDuration + tail;

// The corner wordmark appears only after the brand is named, and not on the outro.
const CORNER_FROM = ORDER.indexOf("products");
const NO_CORNER = new Set<Key>(["outro"]);

const CornerMark: React.FC<{ at: number }> = ({ at }) => (
  <Appear at={at} rise={0} style={{ position: "absolute", right: 70, top: 56 }}>
    <Glass style={{ padding: "10px 24px", borderRadius: 22, background: "rgba(255,255,255,0.94)" }}>
      <Wordmark size={34} />
    </Glass>
  </Appear>
);

export const Video3: React.FC = () => {
  const { fps } = useVideoConfig();
  const overlap = motion.transitionFrames / fps;
  return (
    <PaletteProvider value={greenPalette}>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 0, top: 0, width: design.width, height: design.height, zoom: design.zoom }}>
          <Background />
          {ORDER.map((key, i) => {
            const SceneComponent = SCENES[key] as React.FC<{ t: Timeline3[Key] }>;
            const last = i === ORDER.length - 1;
            const to = last ? TOTAL_SECONDS_3 + 1 : tl[ORDER[i + 1]].start - PRE + overlap;
            return (
              <Scene key={key} from={tl[key].start - PRE} to={to}>
                <SceneComponent t={tl[key]} />
                {i >= CORNER_FROM && !NO_CORNER.has(key) ? <CornerMark at={tl[key].start} /> : null}
              </Scene>
            );
          })}
          {/* the six hassles from the first half, ticked off one by one */}
          <Scene from={tl.products.start - PRE} to={tl.firstOrder.start - PRE + overlap}>
            <SolvedTracker
              at={tl.products.start}
              solvedAt={[tl.products.ready, tl.stock.warehouse, tl.weDo.website, tl.weDo.packaging, tl.weDo.courier, tl.auto.automatic]}
            />
          </Scene>
        </div>
        <Audio src={staticFile("voiceover-2026-11-11.mp3")} />
        <SoundDesign3 />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
