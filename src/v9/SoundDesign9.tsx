// Sound effects for the "rented house vs own home" video. Every cue comes from src/v9/timeline.ts.
import React from "react";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import { tl } from "./timeline";

const cues: Cue[] = [
  ...Object.values(tl)
    .slice(1)
    .map((s): Cue => [s.start - 0.45, "whoosh"]),
  [tl.hook.sokale, "ding"],
  [tl.hook.bondho, "stamp"],
  [tl.hook.shesh, "stamp"],
  [tl.rent.bhara, "pop"],
  [tl.rent.parben, "pop"],
  [tl.rent.parben2, "pop"],
  [tl.rent.chharun, "stamp"],
  [tl.own.bari, "ding"],
  [tl.letsSee.subidha, "pop"],
  [tl.b1.cholte, "ding"],
  [tl.b2.asol, "ding"],
  [tl.b3.inbox, "pop"],
  [tl.b3.dam, "pop"],
  [tl.b3.koto, "pop"],
  [tl.b3.order, "ding"],
  [tl.b4.order, "ding"],
  [tl.b5.dekhlo, "pop"],
  [tl.b5.na, "pop"],
  [tl.b5.mone, "pop"],
  [tl.b5.ana2, "ding"],
  [tl.b6.paoa, "ding"],
  [tl.b7.sorasori, "pop"],
  [tl.b7.barbarer, "ding"],
  [tl.honest.osubidha, "stamp"],
  [tl.c1.kinben, "pop"],
  [tl.c1.shekhai, "ding"],
  [tl.c2.amader, "ding"],
  [tl.c2.subscription, "pop"],
  [tl.c3.link, "pop"],
  [tl.c3.gochhano, "ding"],
  [tl.end.noy, "stamp"],
  [tl.end.thikana, "ding"],
  [tl.end.korun, "pop"],
];

export const SoundDesign9: React.FC = () => <SfxTrack cues={cues} />;
