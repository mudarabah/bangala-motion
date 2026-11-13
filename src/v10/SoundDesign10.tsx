// Sound effects for the Meta Pixel explainer. Every cue is a word start time from ./timeline.
import React from "react";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import { SCENE_START, W } from "./timeline";

const at = (i: number) => W[i];
const pops = [9, 14, 46, 49, 54, 61, 65, 92, 99, 104, 110, 116, 123, 146, 148, 162, 175, 188, 198, 232, 244, 268, 281, 292, 308, 319, 352, 369, 389, 395, 414, 437, 461, 474, 491, 494, 497, 526, 544, 568, 583, 594, 618, 627, 630, 666, 682, 699, 741, 756, 758, 769, 770, 773, 784, 790];
const dings = [61, 92, 232, 414, 461, 528, 586, 699, 784, 793];

const cues: Cue[] = [
  ...Object.values(SCENE_START)
    .slice(1)
    .map((i): Cue => [at(i) - 0.45, "whoosh"]),
  ...pops.filter((i) => !dings.includes(i)).map((i): Cue => [at(i), "pop"]),
  ...dings.map((i): Cue => [at(i), "ding"]),
  [at(14), "stamp"],
  [at(505), "stamp"],
  [at(640), "stamp"],
];

export const SoundDesign10: React.FC = () => <SfxTrack cues={cues} />;
