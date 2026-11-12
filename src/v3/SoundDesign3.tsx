// Sound effects for the Uddokta Journey video. Every cue comes from src/v3/timeline.ts.
import React from "react";
import { SfxTrack, ticks, type Cue } from "../components/SoundDesign";
import { tl } from "./timeline";

const cues: Cue[] = [
  ...Object.values(tl).map((s): Cue => [s.start - 0.45, "whoosh"]),
  [tl.study.start, "pop"],
  [tl.study.nijer, "pop"],
  [tl.study.porichoy, "ding"],
  [tl.buried.start, "pop"],
  [tl.buried.poribar, "pop"],
  [tl.buried.swapnota, "pop"],
  [tl.wish.moner, "pop"],
  [tl.wish.nijer, "ding"],
  [tl.letsStart.start, "pop"],
  [tl.letsStart.ki, "pop"],
  [tl.checklist.sourcing, "pop"],
  [tl.checklist.warehouse, "pop"],
  [tl.checklist.website, "pop"],
  [tl.checklist.order, "pop"],
  [tl.checklist.courier, "pop"],
  [tl.checklist.protita, "pop"],
  [tl.overwhelm.theme, "stamp"],
  [tl.noMore.start, "stamp"],
  [tl.noMore.noy, "pop"],
  [tl.brand.uddokta, "ding"],
  [tl.brand.sob, "pop"],
  ...ticks(tl.products.start, tl.products.beshi),
  [tl.products.ready, "ding"],
  [tl.products.kono, "pop"],
  [tl.stock.amader, "pop"],
  [tl.stock.warehouse, "ding"],
  [tl.stock.noy, "pop"],
  [tl.weDo.readymade, "pop"],
  [tl.weDo.packaging, "pop"],
  [tl.weDo.courier, "pop"],
  [tl.weDo.delivery, "pop"],
  [tl.weDo.korbo, "ding"],
  [tl.auto.automatic, "ding"],
  [tl.youJust.munafa, "pop"],
  [tl.firstOrder.notification, "ding"],
  [tl.firstOrder.nijer, "pop"],
  [tl.firstOrder.haraini, "ding"],
  [tl.home.nijer, "pop"],
  [tl.outro.uddokta, "ding"],
];

export const SoundDesign3: React.FC = () => <SfxTrack cues={cues} />;
