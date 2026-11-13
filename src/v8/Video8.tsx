// The "five dark sides of online business" video (2026-11-13, second voice): 14 scenes,
// a corner logo on the answer scenes, the voice and the sound design.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, Glass, LogoMark, PaletteProvider, Scene } from "../components/kit";
import { design, greenPalette, motion } from "../theme";
import { SoundDesign8 } from "./SoundDesign8";
import { audioDuration, tail, tl, type Timeline8 } from "./timeline";
import {
  HookScene,
  IntroScene,
  D1Scene,
  S1Scene,
  D2Scene,
  S2Scene,
  D3Scene,
  S3Scene,
  D4Scene,
  S4Scene,
  D5Scene,
  S5Scene,
  TruthScene,
  EndScene,
} from "./scenes/Dark";

type Key = keyof Timeline8;

const SCENES: { [K in Key]: React.FC<{ t: Timeline8[K] }> } = {
  hook: HookScene,
  intro: IntroScene,
  d1: D1Scene,
  s1: S1Scene,
  d2: D2Scene,
  s2: S2Scene,
  d3: D3Scene,
  s3: S3Scene,
  d4: D4Scene,
  s4: S4Scene,
  d5: D5Scene,
  s5: S5Scene,
  truth: TruthScene,
  end: EndScene,
};
const ORDER = Object.keys(SCENES) as Key[];

const PRE = 0.4;
export const TOTAL_SECONDS_8 = audioDuration + tail;

// Small corner logo on the bright answer scenes only.
const CORNER = new Set<Key>(["s1", "s2", "s3", "s4", "s5", "truth"]);

const CornerLogo: React.FC<{ at: number }> = ({ at }) => (
  <Appear at={at} rise={0} style={{ position: "absolute", right: 70, top: 50 }}>
    <Glass style={{ padding: "8px 14px", borderRadius: 22, background: "rgba(255,255,255,0.94)" }}>
      <LogoMark width={170} />
    </Glass>
  </Appear>
);

export const Video8: React.FC = () => {
  const { fps } = useVideoConfig();
  const overlap = motion.transitionFrames / fps;
  return (
    <PaletteProvider value={greenPalette}>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 0, top: 0, width: design.width, height: design.height, zoom: design.zoom }}>
          <Background />
          {ORDER.map((key, i) => {
            const SceneComponent = SCENES[key] as React.FC<{ t: Timeline8[Key] }>;
            const last = i === ORDER.length - 1;
            const to = last ? TOTAL_SECONDS_8 + 1 : tl[ORDER[i + 1]].start - PRE + overlap;
            return (
              <Scene key={key} from={Math.max(0, tl[key].start - PRE)} to={to}>
                <SceneComponent t={tl[key]} />
                {CORNER.has(key) ? <CornerLogo at={tl[key].start - 0.3} /> : null}
              </Scene>
            );
          })}
        </div>
        <Audio src={staticFile("voiceover-2026-11-13b.mp3")} />
        <SoundDesign8 />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
