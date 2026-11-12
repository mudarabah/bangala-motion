// The fashion accessory ad (2026-11-12, second voice, green-glass): 13 scenes in voice order,
// a corner logo once "আমাদের" is said, the voice and the sound design.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, Glass, LogoMark, PaletteProvider, Scene } from "../components/kit";
import { design, greenPalette, motion } from "../theme";
import { SoundDesign5 } from "./SoundDesign5";
import { audioDuration, tail, tl, type Timeline5 } from "./timeline";
import {
  CtaScene,
  DemandScene,
  HookScene,
  OursScene,
  PhotoScene,
  PriceScene,
  RepeatScene,
  SizeScene,
  SmallScene,
  TaglineScene,
  WhyScene,
  WorryScene,
  YouScene,
} from "./scenes/Ad";

type Key = keyof Timeline5;

const SCENES: { [K in Key]: React.FC<{ t: Timeline5[K] }> } = {
  hook: HookScene,
  price: PriceScene,
  why: WhyScene,
  demand: DemandScene,
  repeat: RepeatScene,
  small: SmallScene,
  size: SizeScene,
  photo: PhotoScene,
  you: YouScene,
  worry: WorryScene,
  ours: OursScene,
  tagline: TaglineScene,
  cta: CtaScene,
};
const ORDER = Object.keys(SCENES) as Key[];

const PRE = 0.4;
export const TOTAL_SECONDS_5 = audioDuration + tail;

const CORNER = new Set<Key>(["ours", "tagline"]);

const CornerLogo: React.FC<{ at: number }> = ({ at }) => (
  <Appear at={at} rise={0} style={{ position: "absolute", right: 70, top: 50 }}>
    <Glass style={{ padding: "8px 14px", borderRadius: 22, background: "rgba(255,255,255,0.94)" }}>
      <LogoMark width={170} />
    </Glass>
  </Appear>
);

export const Video5: React.FC = () => {
  const { fps } = useVideoConfig();
  const overlap = motion.transitionFrames / fps;
  return (
    <PaletteProvider value={greenPalette}>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 0, top: 0, width: design.width, height: design.height, zoom: design.zoom }}>
          <Background />
          {ORDER.map((key, i) => {
            const SceneComponent = SCENES[key] as React.FC<{ t: Timeline5[Key] }>;
            const last = i === ORDER.length - 1;
            const to = last ? TOTAL_SECONDS_5 + 1 : tl[ORDER[i + 1]].start - PRE + overlap;
            return (
              <Scene key={key} from={Math.max(0, tl[key].start - PRE)} to={to}>
                <SceneComponent t={tl[key]} />
                {CORNER.has(key) ? <CornerLogo at={tl[key].start - 0.3} /> : null}
              </Scene>
            );
          })}
        </div>
        <Audio src={staticFile("voiceover-2026-11-12b.mp3")} />
        <SoundDesign5 />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
