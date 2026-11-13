// Sound effects for the probashi investor video. Every cue comes from src/v7/timeline.ts.
import React from "react";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import { tl } from "./timeline";

const cues: Cue[] = [
  ...Object.values(tl)
    .slice(1)
    .map((s): Cue => [s.start - 0.45, "whoosh"]),
  [tl.sacrifice.start, "pop"],
  [tl.sacrifice.rode, "pop"],
  [tl.sacrifice.ghumhin, "pop"],
  [tl.sacrifice.poribar, "pop"],
  [tl.send.pathachchhen, "tick"],
  [tl.send.kaj, "stamp"],
  [tl.waste.keu, "pop"],
  [tl.waste.dure, "pop"],
  [tl.dream.phirben, "ding"],
  [tl.dream.poth, "ding"],
  [tl.brand.start, "ding"],
  [tl.brand.islami, "pop"],
  [tl.flow.ponno, "pop"],
  [tl.flow.bikri, "ding"],
  [tl.flow.muldhon, "pop"],
  [tl.flow.ordhek1, "pop"],
  [tl.flow.ordhek2, "pop"],
  [tl.phone.taka, "pop"],
  [tl.phone.koto, "pop"],
  [tl.phone.koto2, "ding"],
  [tl.risk.amra, "pop"],
  [tl.risk.swachchho, "ding"],
  [tl.family.dar, "pop"],
  [tl.jobs.kormo, "ding"],
  [tl.tagline.start, "pop"],
  [tl.tagline.desher, "pop"],
  [tl.tagline.munafa, "ding"],
  [tl.cta.korun, "pop"],
  [tl.cta.mudarabah, "ding"],
];

export const SoundDesign7: React.FC = () => <SfxTrack cues={cues} />;
