// "ব্যবসা থেকে অর্জিত মুনাফার নির্ধারিত একটি অংশ মুরাবাহা চুক্তি অনুযায়ী বিনিয়োগকারীদের সাথে শেয়ার করা হয়।"
// Step chain: business → profit (donut, one slice lifts out) → investors; the slice
// travels to the investors on "শেয়ার".
import React from "react";
import { Briefcase, FileSignature, Users } from "lucide-react";
import {
  Appear,
  Glass,
  GradPill,
  Headline,
  IconTile,
  Label,
  Pill,
  useActive,
  useEnter,
  useProgress,
} from "../components/kit";
import type { Timeline } from "../data/timeline";
import { colors, iconTints } from "../theme";

const CARD_W = 380;
const CARD_TOP = 330;
const centres = [380, 960, 1540];

const Connector: React.FC<{ x1: number; x2: number; p: number }> = ({ x1, x2, p }) => (
  <div
    style={{
      position: "absolute",
      left: x1,
      top: CARD_TOP + 190,
      width: (x2 - x1) * p,
      height: 5,
      borderRadius: 5,
      background: `linear-gradient(90deg, ${colors.brand}, ${colors.magenta})`,
      opacity: 0.6,
    }}
  />
);

const Donut: React.FC<{ lift: number }> = ({ lift }) => {
  const r = 90;
  const c = 2 * Math.PI * r;
  const slice = 0.22; // the investors' share (drawn proportion only, no number is claimed)
  const mid = (-90 + slice * 180) * (Math.PI / 180);
  return (
    <svg width={260} height={260} viewBox="-130 -130 260 260">
      <defs>
        <linearGradient id="slice" x1="0" x2="1">
          <stop offset="0" stopColor={colors.brand} />
          <stop offset="1" stopColor={colors.magenta} />
        </linearGradient>
      </defs>
      <circle r={r} fill="none" stroke="#E6DCFD" strokeWidth={46} />
      <circle
        r={r}
        fill="none"
        stroke="#C4B5FD"
        strokeWidth={46}
        strokeDasharray={`${c * (1 - slice) - 6} ${c}`}
        transform={`rotate(${-90 + slice * 360 + 2})`}
      />
      <circle
        r={r}
        fill="none"
        stroke="url(#slice)"
        strokeWidth={46 + lift * 8}
        strokeDasharray={`${c * slice - 6} ${c}`}
        transform={`translate(${Math.cos(mid) * lift * 16} ${Math.sin(mid) * lift * 16}) rotate(-90)`}
      />
    </svg>
  );
};

export const ProfitScene: React.FC<{ t: Timeline["profit"] }> = ({ t }) => {
  const link1 = useProgress(t.munafa - 0.2, t.munafa + 0.5);
  const link2 = useProgress(t.share - 0.3, t.share + 0.5);
  const lift = useEnter(t.ongsho);
  const investorsActive = useActive(t.share);
  const coin = useProgress(t.share - 0.3, t.share + 0.6);

  const card = (i: number, at: number, children: React.ReactNode, active = 0) => (
    <Appear at={at} style={{ position: "absolute", left: centres[i] - CARD_W / 2, top: CARD_TOP }}>
      <Glass
        active={active}
        style={{ width: CARD_W, height: 380, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22 }}
      >
        {children}
      </Glass>
    </Appear>
  );

  return (
    <>
      <Headline
        style={{ position: "absolute", top: 90, left: 0, right: 0 }}
        words={[
          ["মুনাফার", t.munafa],
          ["নির্ধারিত", t.nirdharito],
          ["অংশ", t.ongsho, true],
        ]}
      />

      <Connector x1={centres[0] + CARD_W / 2} x2={centres[1] - CARD_W / 2} p={link1} />
      <Connector x1={centres[1] + CARD_W / 2} x2={centres[2] - CARD_W / 2} p={link2} />

      {card(
        0,
        t.start,
        <>
          <IconTile icon={Briefcase} tint={iconTints.briefcase} size={120} />
          <Label size={44} style={{ fontWeight: 700 }}>
            ব্যবসা
          </Label>
        </>,
      )}
      {card(
        1,
        t.munafa,
        <>
          <Donut lift={lift} />
          <Label size={40} style={{ fontWeight: 700, marginTop: -14 }}>
            মুনাফা
          </Label>
        </>,
      )}
      {card(
        2,
        t.biniyogkari,
        <>
          <IconTile icon={Users} tint={iconTints.video} size={120} />
          <Label size={40} style={{ fontWeight: 700, textAlign: "center" }}>
            বিনিয়োগকারী
          </Label>
        </>,
        investorsActive,
      )}

      {/* The share travelling to the investors */}
      <div
        style={{
          position: "absolute",
          left: centres[1] + CARD_W / 2 + (centres[2] - centres[1] - CARD_W) * coin - 22,
          top: CARD_TOP + 170,
          width: 44,
          height: 44,
          borderRadius: 99,
          background: `linear-gradient(135deg, ${colors.brand}, ${colors.magenta})`,
          boxShadow: "0 8px 20px rgba(124,58,237,0.4)",
          opacity: coin > 0 && coin < 1 ? 1 : 0,
        }}
      />
      <Appear at={t.share} style={{ position: "absolute", left: 1250 - 90, top: CARD_TOP + 96, width: 180, display: "flex", justifyContent: "center" }}>
        <Pill size={30}>শেয়ার</Pill>
      </Appear>

      <Appear at={t.murabaha} style={{ position: "absolute", left: 0, right: 0, top: 800, display: "flex", justifyContent: "center" }}>
        <GradPill icon={FileSignature} size={38} style={{ padding: "22px 46px" }}>
          মুরাবাহা চুক্তি অনুযায়ী
        </GradPill>
      </Appear>
    </>
  );
};
