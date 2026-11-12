// Sound effects for the fashion accessory ad. Every cue comes from src/v5/timeline.ts.
import React from "react";
import { SfxTrack, ticks, type Cue } from "../components/SoundDesign";
import { tl } from "./timeline";

const cues: Cue[] = [
  ...Object.values(tl)
    .slice(1)
    .map((s): Cue => [s.start - 0.45, "whoosh"]),
  [tl.hook.chhotto, "ding"],
  [tl.hook.jora, "ding"],
  [tl.hook.labh, "pop"],
  ...ticks(tl.price.n120, tl.price.taka1),
  ...ticks(tl.price.n240, tl.price.taka2),
  [tl.price.dwigun, "ding"],
  [tl.why.labhjonok, "pop"],
  [tl.demand.start, "pop"],
  [tl.demand.eid, "pop"],
  [tl.demand.biye, "pop"],
  [tl.demand.jonmodin, "pop"],
  [tl.demand.boishakh, "pop"],
  [tl.repeat.start, "pop"],
  [tl.repeat.dul, "pop"],
  [tl.repeat.churi, "pop"],
  [tl.repeat.bag, "pop"],
  [tl.small.start, "pop"],
  [tl.small.bhangar, "pop"],
  [tl.small.shipping, "pop"],
  [tl.size.start, "pop"],
  [tl.size.nei, "stamp"],
  [tl.photo.start, "pop"],
  [tl.photo.chhobite, "tick"],
  [tl.photo.model, "pop"],
  [tl.photo.shudhu, "pop"],
  [tl.you.customer, "ding"],
  [tl.worry.puji, "pop"],
  [tl.worry.stock, "pop"],
  [tl.ours.amader, "ding"],
  ...ticks(tl.ours.n270, tl.ours.beshi),
  [tl.ours.samlai, "ding"],
  [tl.ours.dii, "ding"],
  [tl.tagline.boro, "ding"],
  [tl.cta.korun, "pop"],
  [tl.cta.mudarabah, "ding"],
];

export const SoundDesign5: React.FC = () => <SfxTrack cues={cues} />;
