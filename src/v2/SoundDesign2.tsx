// Sound effects for the Reseller & Investment video. Every cue comes from src/v2/timeline.ts.
import React from "react";
import { SfxTrack, ticks, type Cue } from "../components/SoundDesign";
import { tl } from "./timeline";

const cues: Cue[] = [
  ...Object.values(tl).map((s): Cue => [s.start - 0.45, "whoosh"]),
  // questions
  [tl.questions.proshno, "pop"],
  [tl.questions.puji, "pop"],
  [tl.questions.ponno, "pop"],
  [tl.questions.delivery, "pop"],
  [tl.questions.website, "pop"],
  // we handle it
  [tl.weHandle.samlabo, "ding"],
  [tl.weHandle.shudhu, "pop"],
  [tl.intro.mudarabah, "ding"],
  // model
  [tl.model.company, "pop"],
  [tl.model.reseller, "pop"],
  [tl.noCost.na, "pop"],
  [tl.noCost.customer, "pop"],
  // steps
  [tl.steps.registration, "pop"],
  [tl.steps.click, "pop"],
  [tl.steps.wholesale, "pop"],
  [tl.steps.dam, "ding"],
  // orders
  [tl.orders.packing, "pop"],
  [tl.orders.courier, "pop"],
  [tl.orders.customer, "ding"],
  // commission
  [tl.commission.bad, "pop"],
  [tl.commission.wallet, "ding"],
  ...ticks(tl.commission.pachsho - 0.1, tl.commission.pachsho + 0.5),
  [tl.commission.tule, "pop"],
  // platform
  [tl.shop.nei, "pop"],
  [tl.shop.ready, "ding"],
  [tl.adTools.catalog, "pop"],
  [tl.adTools.server, "pop"],
  [tl.adTools.toiri, "ding"],
  [tl.courier.steadfast, "pop"],
  [tl.courier.amader, "pop"],
  [tl.support.reselling, "pop"],
  [tl.support.mentor, "pop"],
  [tl.support.order, "pop"],
  [tl.support.onumodon, "ding"],
  // investing
  [tl.investPivot.noy, "pop"],
  [tl.investPivot.darun, "ding"],
  [tl.realGoods.asol, "pop"],
  ...ticks(tl.realGoods.teish - 0.1, tl.realGoods.teish + 0.6),
  [tl.principle.islami, "ding"],
  [tl.profitSplit.p1, "pop"],
  [tl.profitSplit.p2, "pop"],
  [tl.fair.swachchho, "pop"],
  [tl.fair.nayyo, "pop"],
  [tl.pool.ekadhik, "pop"],
  [tl.pool.abedon, "pop"],
  [tl.dashboard.labh, "ding"],
  [tl.payout.sheshe + 0.3, "ding"],
  [tl.payout.tule, "pop"],
  [tl.impact.hajaro, "whoosh"],
  [tl.youth.byabsa, "ding"],
  [tl.dream2.ek, "ding"],
  [tl.dream2.apni, "pop"],
  // call to action
  [tl.cta.registration + 0.1, "pop"],
  [tl.cta.reseller, "pop"],
  [tl.cta.biniyogkari, "pop"],
  [tl.outro.songi, "ding"],
];

export const SoundDesign2: React.FC = () => <SfxTrack cues={cues} />;
