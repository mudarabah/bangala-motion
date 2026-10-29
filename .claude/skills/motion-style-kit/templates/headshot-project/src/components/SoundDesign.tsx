import { Audio } from "@remotion/media";
import React from "react";
import { Sequence, staticFile, useVideoConfig } from "remotion";
import { FRAMING_MOVES, T, toFrame } from "../data/timeline";

// Turn all sound effects off here if they are not wanted.
export const SFX_ENABLED = true;

type Cue = { at: number; sfx: string; volume: number; name: string };

// Repeat a sound every `everySec` from `from` to `to` (typing, clock ticks).
const repeat = (from: number, to: number, everySec: number, sfx: string, volume: number, name: string): Cue[] =>
  Array.from({ length: Math.max(0, Math.floor((to - from) / everySec)) }, (_, i) => ({
    at: from + i * everySec,
    sfx,
    volume,
    name: `${name} ${i + 1}`,
  }));

// Voice averages about -16.8 dB; effects sit roughly 14–20 dB under it.
const CUES: Cue[] = [
  // S1 camera
  { at: T.camera.record, sfx: "shutter-modern", volume: 0.28, name: "record — shutter" },
  // S2 robot + AI
  { at: T.ai.start, sfx: "whoosh", volume: 0.3, name: "AI scan" },
  { at: T.ai.start + 0.08, sfx: "robot-chirp", volume: 0.16, name: "robot appears" },
  { at: T.ai.hero - 0.1, sfx: "robot-chirp", volume: 0.12, name: "robot points" },
  { at: T.ai.hero, sfx: "ding", volume: 0.14, name: "AI chip" },
  // S3 use cases
  { at: T.useCases.ai + 1.36, sfx: "ding", volume: 0.1, name: "use cases done" },
  // S4 search
  ...repeat(T.search.typing, T.search.typing + 0.6, 0.08, "mouse-click", 0.09, "typing"),
  { at: T.search.click, sfx: "mouse-click", volume: 0.35, name: "search click" },
  // S4b the turn
  { at: T.secrets.vault - 0.1, sfx: "whoosh", volume: 0.2, name: "vault rises" },
  { at: T.secrets.nobody, sfx: "switch", volume: 0.3, name: "lock" },
  // S5b course panels
  { at: T.course.voiceover, sfx: "page-turn", volume: 0.3, name: "panel: voiceover" },
  { at: T.course.json, sfx: "page-turn", volume: 0.3, name: "panel: JSON" },
  { at: T.course.skill, sfx: "page-turn", volume: 0.3, name: "panel: skill" },
  // S6 After Effects: the clock races through the hours, then the AI clean-up lands
  ...repeat(T.ae.hours, T.ae.ai, 0.16, "tick", 0.1, "hours tick"),
  { at: T.ae.ai, sfx: "whoosh", volume: 0.22, name: "AI sweep" },
  { at: T.ae.ai + 1.04, sfx: "ding", volume: 0.14, name: "AE clean clip done" },
  // S7 free → paid
  { at: T.paid.paid, sfx: "whip", volume: 0.3, name: "paid stamp" },
  // S8 offer
  { at: T.offer.price950, sfx: "switch", volume: 0.18, name: "৯৫০" },
  { at: T.offer.price190, sfx: "switch", volume: 0.25, name: "১৯০ টাকা" },
  // S9 CTA
  { at: T.cta.click, sfx: "mouse-click", volume: 0.45, name: "enroll click" },
  ...repeat(T.cta.urgency, T.cta.end, 0.5, "tick", 0.22, "urgency tick"),
  // A soft whoosh on every framing move (not punch-ins or their return)
  ...FRAMING_MOVES
    .map((f) => ({ at: f.at - 0.04, sfx: "whoosh", volume: 0.16, name: `move → ${f.mode}` })),
];

export const SoundDesign: React.FC = () => {
  const { fps } = useVideoConfig();
  if (!SFX_ENABLED) return null;
  return (
    <>
      {CUES.map((c) => (
        <Sequence
          key={`${c.name}-${c.at}`}
          name={`SFX ${c.name}`}
          from={toFrame(c.at)}
          durationInFrames={40}
          premountFor={fps}
        >
          <Audio src={staticFile(`sfx/${c.sfx}.wav`)} volume={c.volume} />
        </Sequence>
      ))}
    </>
  );
};
