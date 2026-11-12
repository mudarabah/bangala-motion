// The ideal e-commerce website video (2026-11-12, third voice, green-glass): 14 scenes,
// a corner logo on the feature scenes, the voice and the sound design.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, Glass, LogoMark, PaletteProvider, Scene } from "../components/kit";
import { design, greenPalette, motion } from "../theme";
import { SoundDesign6 } from "./SoundDesign6";
import { audioDuration, tail, tl, type Timeline6 } from "./timeline";
import {
  CtaScene,
  F1Scene,
  F2Scene,
  F3Scene,
  F4Scene,
  F5Scene,
  F6Scene,
  F7Scene,
  F8Scene,
  HookScene,
  IdealScene,
  LetsSeeScene,
  NotJustScene,
  SupportScene,
} from "./scenes/Site";

type Key = keyof Timeline6;

const SCENES: { [K in Key]: React.FC<{ t: Timeline6[K] }> } = {
  hook: HookScene,
  notJust: NotJustScene,
  letsSee: LetsSeeScene,
  f1: F1Scene,
  f2: F2Scene,
  f3: F3Scene,
  f4: F4Scene,
  f5: F5Scene,
  f6: F6Scene,
  f7: F7Scene,
  f8: F8Scene,
  support: SupportScene,
  ideal: IdealScene,
  cta: CtaScene,
};
const ORDER = Object.keys(SCENES) as Key[];

const PRE = 0.4;
export const TOTAL_SECONDS_6 = audioDuration + tail;

// Top-right is taken by the progress dots on the feature scenes, so the logo sits only here.
const CORNER = new Set<Key>(["support"]);

const CornerLogo: React.FC<{ at: number }> = ({ at }) => (
  <Appear at={at} rise={0} style={{ position: "absolute", right: 70, top: 50 }}>
    <Glass style={{ padding: "8px 14px", borderRadius: 22, background: "rgba(255,255,255,0.94)" }}>
      <LogoMark width={170} />
    </Glass>
  </Appear>
);

export const Video6: React.FC = () => {
  const { fps } = useVideoConfig();
  const overlap = motion.transitionFrames / fps;
  return (
    <PaletteProvider value={greenPalette}>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 0, top: 0, width: design.width, height: design.height, zoom: design.zoom }}>
          <Background />
          {ORDER.map((key, i) => {
            const SceneComponent = SCENES[key] as React.FC<{ t: Timeline6[Key] }>;
            const last = i === ORDER.length - 1;
            const to = last ? TOTAL_SECONDS_6 + 1 : tl[ORDER[i + 1]].start - PRE + overlap;
            return (
              <Scene key={key} from={Math.max(0, tl[key].start - PRE)} to={to}>
                <SceneComponent t={tl[key]} />
                {CORNER.has(key) ? <CornerLogo at={tl[key].start - 0.3} /> : null}
              </Scene>
            );
          })}
        </div>
        <Audio src={staticFile("voiceover-2026-11-12c.mp3")} />
        <SoundDesign6 />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
