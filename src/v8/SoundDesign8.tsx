// Sound effects for the dark-sides video. Every cue comes from src/v8/timeline.ts.
import React from "react";
import { SfxTrack, ticks, type Cue } from "../components/SoundDesign";
import { tl } from "./timeline";

const cues: Cue[] = [
  ...Object.values(tl)
    .slice(1)
    .map((s): Cue => [s.start - 0.45, "whoosh"]),
  [tl.hook.sohoj, "ding"],
  [tl.hook.kintu, "stamp"],
  [tl.intro.sei, "pop"],
  [tl.intro.mokabila, "ding"],
  [tl.d1.na, "stamp"],
  [tl.d1.taka, "pop"],
  [tl.s1.ney, "ding"],
  [tl.d2.phone, "tick"],
  [tl.d2.parcel, "stamp"],
  [tl.s2.order, "pop"],
  [tl.s2.customer, "pop"],
  [tl.s2.kome, "ding"],
  ...ticks(tl.d3.like, tl.d3.elo + 0.4),
  [tl.d3.na, "stamp"],
  [tl.s3.pixel, "pop"],
  [tl.s3.facebook, "pop"],
  [tl.s3.server, "pop"],
  [tl.s3.ad, "pop"],
  [tl.s3.sothik, "ding"],
  [tl.d4.message, "pop"],
  [tl.d4.packing, "pop"],
  [tl.d4.courier, "pop"],
  [tl.s4.automatic, "ding"],
  [tl.s4.moderator, "pop"],
  [tl.d5.page, "stamp"],
  [tl.s5.website, "ding"],
  [tl.s5.mentor, "pop"],
  [tl.truth.sohoj, "ding"],
  [tl.end.prostuti, "ding"],
  [tl.end.din, "pop"],
];

export const SoundDesign8: React.FC = () => <SfxTrack cues={cues} />;
