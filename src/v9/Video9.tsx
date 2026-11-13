// The "rented house vs own home" website video (2026-11-13, third voice): 17 scenes,
// a corner logo on some scenes, the voice and the sound design.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, Glass, LogoMark, PaletteProvider, Scene } from "../components/kit";
import { design, greenPalette, motion } from "../theme";
import { SoundDesign9 } from "./SoundDesign9";
import { audioDuration, tail, tl, type Timeline9 } from "./timeline";
import {
  HookScene,
  QuestionScene,
  RentScene,
  OwnScene,
  LetsSeeScene,
  B1Scene,
  B2Scene,
  B3Scene,
  B4Scene,
  B5Scene,
  B6Scene,
  B7Scene,
  HonestScene,
  C1Scene,
  C2Scene,
  C3Scene,
  EndScene,
} from "./scenes/Home";

type Key = keyof Timeline9;

const SCENES: { [K in Key]: React.FC<{ t: Timeline9[K] }> } = {
  hook: HookScene,
  question: QuestionScene,
  rent: RentScene,
  own: OwnScene,
  letsSee: LetsSeeScene,
  b1: B1Scene,
  b2: B2Scene,
  b3: B3Scene,
  b4: B4Scene,
  b5: B5Scene,
  b6: B6Scene,
  b7: B7Scene,
  honest: HonestScene,
  c1: C1Scene,
  c2: C2Scene,
  c3: C3Scene,
  end: EndScene,
};
const ORDER = Object.keys(SCENES) as Key[];

const PRE = 0.4;
export const TOTAL_SECONDS_9 = audioDuration + tail;

// Corner logo where the top-right is free (not under the progress dots or on the end card).
const CORNER = new Set<Key>(["rent", "own", "honest", "c1", "c2", "c3"]);

const CornerLogo: React.FC<{ at: number }> = ({ at }) => (
  <Appear at={at} rise={0} style={{ position: "absolute", right: 70, top: 50 }}>
    <Glass style={{ padding: "8px 14px", borderRadius: 22, background: "rgba(255,255,255,0.94)" }}>
      <LogoMark width={170} />
    </Glass>
  </Appear>
);

export const Video9: React.FC = () => {
  const { fps } = useVideoConfig();
  const overlap = motion.transitionFrames / fps;
  return (
    <PaletteProvider value={greenPalette}>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 0, top: 0, width: design.width, height: design.height, zoom: design.zoom }}>
          <Background />
          {ORDER.map((key, i) => {
            const SceneComponent = SCENES[key] as React.FC<{ t: Timeline9[Key] }>;
            const last = i === ORDER.length - 1;
            const to = last ? TOTAL_SECONDS_9 + 1 : tl[ORDER[i + 1]].start - PRE + overlap;
            return (
              <Scene key={key} from={Math.max(0, tl[key].start - PRE)} to={to}>
                <SceneComponent t={tl[key]} />
                {CORNER.has(key) ? <CornerLogo at={tl[key].start - 0.3} /> : null}
              </Scene>
            );
          })}
        </div>
        <Audio src={staticFile("voiceover-2026-11-13c.mp3")} />
        <SoundDesign9 />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
