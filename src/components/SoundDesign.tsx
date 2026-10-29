// Sound effects under the voice. Every cue comes from the timeline, so a sync fix
// in src/data/timeline.ts moves the sound with the picture.
// Files in public/sfx were synthesised with ffmpeg for this project (free to use).
// Levels: voice averages about -23 dB; effects sit well under it.
import React from "react";
import { Audio } from "@remotion/media";
import { Sequence, staticFile, useVideoConfig } from "remotion";
import { partA, type Timeline } from "../data/timeline";

export const SFX_ENABLED = true;

type Sfx = "whoosh" | "pop" | "ding" | "stamp" | "tick";
const VOLUME: Record<Sfx, number> = { whoosh: 0.14, pop: 0.12, ding: 0.08, stamp: 0.22, tick: 0.06 };
type Cue = [sec: number, sfx: Sfx];

const ticks = (from: number, to: number): Cue[] => {
  const out: Cue[] = [];
  for (let s = from; s < to; s += 0.1) out.push([s, "tick"]);
  return out;
};

const cuesFor = (t: Timeline): Cue[] => [
  ...Object.values(t).map((s): Cue => [s.start - 0.45, "whoosh"]),
  // import
  [t.import.chin, "pop"],
  [t.import.fashion, "pop"],
  [t.import.bangladesh, "pop"],
  [t.import.khuchra, "pop"],
  [t.import.paikari, "pop"],
  [t.import.bikri, "ding"],
  // profit
  [t.profit.munafa, "pop"],
  [t.profit.biniyogkari, "pop"],
  [t.profit.share, "ding"],
  // company
  [t.company.nibondhito, "ding"],
  [t.company.privateLtd, "pop"],
  // transparency
  [t.transparency.apnar, "pop"],
  [t.transparency.cheque + 0.6, "ding"],
  [t.transparency.tinshoto, "pop"],
  [t.transparency.sompadon, "stamp"],
  // bank
  [t.bank.bank, "pop"],
  [t.bank.lenden, "pop"],
  [t.bank.protiti, "ding"],
  [t.bank.record, "pop"],
  // details
  [t.details.sorbonimno, "pop"],
  ...ticks(t.details.pochish - 0.1, t.details.pochish + 0.7),
  [t.details.chhoy, "pop"],
  [t.details.noy, "pop"],
  [t.details.baro, "pop"],
  // payout
  [t.payout.proti, "pop"],
  [t.payout.dosh, "ding"],
  [t.payout.sheyar, "pop"],
  ...ticks(t.payout.satsho - 0.1, t.payout.taka - 0.1),
  [t.payout.taka, "ding"],
  // principal
  [t.principal.sheshe + 0.45, "ding"],
  [t.principal.mul, "pop"],
  [t.principal.ferot, "whoosh"],
  // security
  [t.security.nirapotta, "pop"],
  [t.security.d1, "pop"],
  [t.security.d2, "pop"],
  [t.security.d3, "pop"],
  [t.security.d4, "pop"],
  [t.security.d5, "pop"],
  // address
  [t.address.joint, "pop"],
  [t.address.haji, "pop"],
  [t.address.gazipur, "ding"],
];

export const SoundDesign: React.FC = () => {
  const { fps } = useVideoConfig();
  if (!SFX_ENABLED) return null;
  const cues = cuesFor(partA);
  return (
    <>
      {cues.map(([sec, sfx], i) => (
        <Sequence key={i} from={Math.max(0, Math.round(sec * fps) - 2)} durationInFrames={Math.round(1.3 * fps)} premountFor={fps}>
          <Audio src={staticFile(`sfx/${sfx}.wav`)} volume={VOLUME[sfx]} />
        </Sequence>
      ))}
    </>
  );
};
