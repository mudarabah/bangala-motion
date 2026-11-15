// The two-part Facebook ads story (Rumana), joined into one video: part 1 (auction, Ads Manager,
// report, real profit) then part 2 (Boost, why ads, loudspeaker, close). Each part keeps its own
// word timeline; part 2 is placed after part 1 with a short light bloom between them.
import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Appear, Background, Glass, LogoMark, PaletteProvider, Scene } from "../components/kit";
import { design, greenPalette, motion } from "../theme";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import * as T1 from "./timeline1";
import * as T2 from "./timeline2";
import * as P1 from "./scenes/Part1";
import * as P2 from "./scenes/Part2";

const PRE = 0.4;
// Part 2 begins one second after part 1's audio ends.
export const PART2_AT = T1.audioDuration + 1;
export const TOTAL_SECONDS_11 = PART2_AT + T2.audioDuration + T2.tail;

const PART1: Record<T1.SceneKey, React.FC> = {
  auction: P1.Auction,
  rumana: P1.Rumana,
  myth: P1.Myth,
  formula: P1.Formula,
  example: P1.Example,
  multiply: P1.Multiply,
  realcalc: P1.RealCalc,
  tree: P1.Tree,
  objectives: P1.Objectives,
  engagement: P1.Engagement,
  sales: P1.Sales,
  adset: P1.AdSet,
  budget: P1.Budget,
  placement: P1.Placement,
  adparts: P1.AdParts,
  abtest: P1.AbTest,
  learning: P1.Learning,
  advplus: P1.AdvPlus,
  report: P1.Report,
  cpm: P1.Cpm,
  ctr: P1.Ctr,
  cpc: P1.Cpc,
  cpo: P1.Cpo,
  roas: P1.Roas,
  profit: P1.Profit,
  breakeven: P1.BreakEven,
  fix: P1.Fix,
};

const PART2: Record<T2.SceneKey, React.FC> = {
  boost: P2.Boost,
  verdict: P2.Verdict,
  question: P2.Question,
  flood: P2.Flood,
  four: P2.Four,
  r1: P2.R1,
  r2: P2.R2,
  r3: P2.R3,
  r4: P2.R4,
  loud: P2.Loud,
  first: P2.First,
  journey: P2.Journey,
  keys: P2.Keys,
  ours: P2.Ours,
  outro: P2.Outro,
};

// Scenes of one part, in voice order, timed from that part's word timeline.
const Part: React.FC<{ scenes: Record<string, React.FC>; starts: Record<string, number>; W: number[]; end: number; corner?: Set<string> }> = ({ scenes, starts, W, end, corner }) => {
  const { fps } = useVideoConfig();
  const overlap = motion.transitionFrames / fps;
  const order = Object.keys(starts);
  return (
    <>
      {order.map((key, i) => {
        const Comp = scenes[key];
        const start = W[starts[key]];
        const to = i === order.length - 1 ? end : W[starts[order[i + 1]]] - PRE + overlap;
        return (
          <Scene key={key} from={Math.max(0, start - PRE)} to={to}>
            <Comp />
            {corner?.has(key) ? (
              <Appear at={start - 0.3} rise={0} style={{ position: "absolute", right: 60, top: 36 }}>
                <Glass style={{ padding: "8px 14px", borderRadius: 22, background: "rgba(255,255,255,0.94)" }}>
                  <LogoMark width={140} />
                </Glass>
              </Appear>
            ) : null}
          </Scene>
        );
      })}
    </>
  );
};

// White light bloom over the join between the parts.
const Bloom: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const o = interpolate(frame / fps, [at - 0.7, at, at + 0.7], [0, 0.85, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return o > 0 ? <AbsoluteFill style={{ background: "radial-gradient(closest-side, white, rgba(255,255,255,0.85))", opacity: o }} /> : null;
};

const CORNER1 = new Set(["myth", "realcalc", "engagement", "sales", "abtest", "learning", "cpc", "cpo", "profit"]);
const CORNER2 = new Set(["verdict", "flood", "four", "loud", "first", "journey"]);

// Sound: a whoosh into every scene, a pop/ding on chosen words.
const at1 = (i: number) => T1.W[i];
const at2 = (i: number) => PART2_AT + T2.W[i];
const cues: Cue[] = [
  ...Object.values(T1.SCENE_START).slice(1).map((i): Cue => [at1(i) - 0.45, "whoosh"]),
  ...Object.values(T2.SCENE_START).map((i): Cue => [at2(i) - 0.45, "whoosh"]),
  ...[13, 32, 106, 120, 126, 176, 194, 205, 212, 216, 274, 278, 282, 336, 358, 405, 422, 452, 487, 531, 563, 600, 629, 677, 744, 797, 803, 806, 809, 816, 836, 861, 887, 904, 925, 958, 1025, 1070, 1099].map((i): Cue => [at1(i), "pop"]),
  ...[23, 217, 396, 629, 1034, 1103].map((i): Cue => [at1(i), "ding"]),
  [at1(83), "stamp"],
  [at1(977), "stamp"],
  ...[4, 13, 58, 66, 106, 111, 133, 135, 147, 158, 174, 177, 181, 197, 199, 202, 224, 226, 228, 232, 251, 255].map((i): Cue => [at2(i), "pop"]),
  ...[59, 204, 237, 261, 271].map((i): Cue => [at2(i), "ding"]),
  [at2(165), "stamp"],
];

export const Video11: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <PaletteProvider value={greenPalette}>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 0, top: 0, width: design.width, height: design.height, zoom: design.zoom }}>
          <Background />
          <Sequence durationInFrames={Math.ceil((PART2_AT + 0.6) * fps)}>
            <Part scenes={PART1} starts={T1.SCENE_START} W={T1.W} end={PART2_AT + 0.5} corner={CORNER1} />
          </Sequence>
          <Sequence from={Math.round(PART2_AT * fps)}>
            <Part scenes={PART2} starts={T2.SCENE_START} W={T2.W} end={T2.audioDuration + T2.tail + 1} corner={CORNER2} />
          </Sequence>
          <Bloom at={PART2_AT - 0.2} />
        </div>
        <Audio src={staticFile("voiceover-2026-11-15-part1.mp3")} />
        <Sequence from={Math.round(PART2_AT * fps)}>
          <Audio src={staticFile("voiceover-2026-11-15-part2.mp3")} />
        </Sequence>
        <SfxTrack cues={cues} />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
