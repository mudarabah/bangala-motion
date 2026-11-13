// The probashi (expat) investor video (2026-11-13 voice, green-glass): 12 scenes,
// a corner logo on the middle scenes, the voice and the sound design.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, Glass, LogoMark, PaletteProvider, Scene } from "../components/kit";
import { design, greenPalette, motion } from "../theme";
import { SoundDesign7 } from "./SoundDesign7";
import { audioDuration, tail, tl, type Timeline7 } from "./timeline";
import {
  BrandScene,
  CtaScene,
  DreamScene,
  FamilyScene,
  FlowScene,
  JobsScene,
  PhoneScene,
  RiskScene,
  SacrificeScene,
  SendScene,
  TaglineScene,
  WasteScene,
} from "./scenes/Probashi";

type Key = keyof Timeline7;

const SCENES: { [K in Key]: React.FC<{ t: Timeline7[K] }> } = {
  sacrifice: SacrificeScene,
  send: SendScene,
  waste: WasteScene,
  dream: DreamScene,
  brand: BrandScene,
  flow: FlowScene,
  phone: PhoneScene,
  risk: RiskScene,
  family: FamilyScene,
  jobs: JobsScene,
  tagline: TaglineScene,
  cta: CtaScene,
};
const ORDER = Object.keys(SCENES) as Key[];

const PRE = 0.4;
export const TOTAL_SECONDS_7 = audioDuration + tail;

// The corner logo appears once the company has been named (not on its own reveal or the end card).
const CORNER = new Set<Key>(["flow", "phone", "family", "jobs", "tagline"]);

const CornerLogo: React.FC<{ at: number }> = ({ at }) => (
  <Appear at={at} rise={0} style={{ position: "absolute", right: 70, top: 50 }}>
    <Glass style={{ padding: "8px 14px", borderRadius: 22, background: "rgba(255,255,255,0.94)" }}>
      <LogoMark width={170} />
    </Glass>
  </Appear>
);

export const Video7: React.FC = () => {
  const { fps } = useVideoConfig();
  const overlap = motion.transitionFrames / fps;
  return (
    <PaletteProvider value={greenPalette}>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 0, top: 0, width: design.width, height: design.height, zoom: design.zoom }}>
          <Background />
          {ORDER.map((key, i) => {
            const SceneComponent = SCENES[key] as React.FC<{ t: Timeline7[Key] }>;
            const last = i === ORDER.length - 1;
            const to = last ? TOTAL_SECONDS_7 + 1 : tl[ORDER[i + 1]].start - PRE + overlap;
            return (
              <Scene key={key} from={Math.max(0, tl[key].start - PRE)} to={to}>
                <SceneComponent t={tl[key]} />
                {CORNER.has(key) ? <CornerLogo at={tl[key].start - 0.3} /> : null}
              </Scene>
            );
          })}
        </div>
        <Audio src={staticFile("voiceover-2026-11-13.mp3")} />
        <SoundDesign7 />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
