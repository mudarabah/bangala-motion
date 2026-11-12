// Sound effects for the Mudarabah explainer (2026-11-12). Every cue comes from src/v4/timeline.ts.
import React from "react";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import { tl } from "./timeline";

const cues: Cue[] = [
  ...Object.values(tl)
    .slice(1)
    .map((s): Cue => [s.start - 0.45, "whoosh"]),
  [tl.idle.taka, "tick"],
  [tl.idle.taka + 0.15, "tick"],
  [tl.idle.taka + 0.3, "tick"],
  [tl.noCapital.nei, "stamp"],
  [tl.handshake.melan, "ding"],
  [tl.naming.mudarabah, "ding"],
  [tl.fair.nyajjo, "pop"],
  [tl.fair.porikkhito, "pop"],
  [tl.parties.pujidata, "pop"],
  [tl.parties.mudarib, "pop"],
  [tl.profitSplit.ordhek1, "pop"],
  [tl.profitSplit.ordhek2, "pop"],
  [tl.noFixed.na, "stamp"],
  [tl.noFixed.labh, "ding"],
  [tl.negligence.day, "stamp"],
  [tl.fairness.nyajjota, "ding"],
  [tl.contract.swachchho, "pop"],
  [tl.dashboard.start, "pop"],
  [tl.dashboard.koto, "pop"],
  [tl.dashboard.janben, "ding"],
  [tl.noBurden.na, "stamp"],
  [tl.noBurden.fol, "ding"],
  [tl.company.start, "ding"],
  [tl.flow.ponno, "pop"],
  [tl.flow.uddokta, "pop"],
  [tl.flow.bikri, "ding"],
  [tl.returns.ferot, "ding"],
  [tl.returns.chukti, "stamp"],
  [tl.halal.halal, "ding"],
  [tl.family.dar, "pop"],
  [tl.family.hasi, "ding"],
  [tl.tagline.start, "pop"],
  [tl.tagline.amader, "pop"],
  [tl.tagline.barkat, "ding"],
  [tl.cta.korun, "pop"],
];

export const SoundDesign4: React.FC = () => <SfxTrack cues={cues} />;
