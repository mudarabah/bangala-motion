// Sound effects for the ideal e-commerce website video. Every cue comes from src/v6/timeline.ts.
import React from "react";
import { SfxTrack, ticks, type Cue } from "../components/SoundDesign";
import { tl } from "./timeline";

const cues: Cue[] = [
  ...Object.values(tl)
    .slice(1)
    .map((s): Cue => [s.start - 0.45, "whoosh"]),
  [tl.hook.elo, "pop"],
  [tl.hook.gelo, "whoosh"],
  [tl.hook.keno, "stamp"],
  [tl.notJust.na, "stamp"],
  [tl.notJust.adorsho, "ding"],
  [tl.letsSee.dorkar, "pop"],
  [tl.f1.astha, "ding"],
  [tl.f1.premium, "pop"],
  ...ticks(tl.f2.n270, tl.f2.beshi),
  [tl.f2.jog, "ding"],
  [tl.f3.koyek, "tick"],
  [tl.f3.tap, "tick"],
  [tl.f3.order2, "tick"],
  [tl.f3.paren, "ding"],
  [tl.f4.milestone, "pop"],
  [tl.f4.minimum, "pop"],
  [tl.f4.bare, "ding"],
  [tl.f5.coupon, "pop"],
  [tl.f5.na, "ding"],
  [tl.f6.pixel, "pop"],
  [tl.f6.facebook, "pop"],
  [tl.f6.server, "pop"],
  [tl.f6.sothik, "ding"],
  [tl.f7.automatic, "ding"],
  [tl.f7.amrai, "pop"],
  [tl.f8.sob, "ding"],
  [tl.support.non, "ding"],
  [tl.ideal.chhara, "stamp"],
  [tl.cta.korun, "pop"],
  [tl.cta.mudarabah, "ding"],
];

export const SoundDesign6: React.FC = () => <SfxTrack cues={cues} />;
