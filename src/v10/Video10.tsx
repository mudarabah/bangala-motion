// The Meta Pixel explainer (2026-11-13, fourth voice, green-glass): 27 scenes in voice order,
// a corner logo, the voice and the sound design. Scene starts are word indices in ./timeline.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, Glass, LogoMark, PaletteProvider, Scene } from "../components/kit";
import { design, greenPalette, motion } from "../theme";
import { SoundDesign10 } from "./SoundDesign10";
import { audioDuration, SCENE_START, tail, W, type SceneKey } from "./timeline";
import * as P from "./scenes/Pixel";

const SCENES: Record<SceneKey, React.FC> = {
  hook: P.Hook,
  intro: P.Intro,
  assistant: P.Assistant,
  pixel: P.PixelIntro,
  event: P.EventScene,
  funnel: P.FunnelScene,
  insight: P.Insight,
  params: P.Params,
  catalog: P.Catalog,
  measure: P.Measure,
  optim: P.Optim,
  retarget: P.Retarget,
  lookalike: P.Lookalike,
  lesser: P.Lesser,
  learning: P.Learning,
  attribution: P.Attribution,
  emq: P.Emq,
  bdphone: P.BdPhone,
  browser: P.Browser,
  capi: P.Capi,
  dedup: P.Dedup,
  cod: P.Cod,
  codEffect: P.CodEffect,
  strategy: P.Strategy,
  test: P.Test,
  ours: P.Ours,
  outro: P.Outro,
};
const ORDER = Object.keys(SCENE_START) as SceneKey[];

const PRE = 0.4;
export const TOTAL_SECONDS_10 = audioDuration + tail;

// Corner logo on scenes whose top-right corner is free.
const CORNER = new Set<SceneKey>(["assistant", "params", "measure", "optim", "retarget", "lookalike", "learning", "attribution", "emq", "cod", "strategy", "test"]);

const CornerLogo: React.FC<{ at: number }> = ({ at }) => (
  <Appear at={at} rise={0} style={{ position: "absolute", right: 70, top: 40 }}>
    <Glass style={{ padding: "8px 14px", borderRadius: 22, background: "rgba(255,255,255,0.94)" }}>
      <LogoMark width={150} />
    </Glass>
  </Appear>
);

export const Video10: React.FC = () => {
  const { fps } = useVideoConfig();
  const overlap = motion.transitionFrames / fps;
  return (
    <PaletteProvider value={greenPalette}>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 0, top: 0, width: design.width, height: design.height, zoom: design.zoom }}>
          <Background />
          {ORDER.map((key, i) => {
            const SceneComponent = SCENES[key];
            const start = W[SCENE_START[key]];
            const last = i === ORDER.length - 1;
            const to = last ? TOTAL_SECONDS_10 + 1 : W[SCENE_START[ORDER[i + 1]]] - PRE + overlap;
            return (
              <Scene key={key} from={Math.max(0, start - PRE)} to={to}>
                <SceneComponent />
                {CORNER.has(key) ? <CornerLogo at={start - 0.3} /> : null}
              </Scene>
            );
          })}
        </div>
        <Audio src={staticFile("voiceover-2026-11-13d.mp3")} />
        <SoundDesign10 />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
