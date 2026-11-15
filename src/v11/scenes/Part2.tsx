// Part 2 of the Facebook ads story: Boost vs Ads Manager, why ads are needed at all (four reasons),
// the loudspeaker warning, Rumana's journey and the close. Every line on screen is spoken words.
import React from "react";
import {
  BadgeCheck,
  BookOpen,
  Camera,
  Coins,
  Eye,
  Gift,
  Globe,
  Lock,
  Megaphone,
  Package,
  Rocket,
  ShoppingBag,
  SlidersHorizontal,
  Smartphone,
  Sprout,
  Target,
  ThumbsUp,
  TrendingUp,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { interpolate } from "remotion";
import { Appear, CheckBadge, Float, Glass, IconTile, LogoCard, Pop, useProgress, useTime } from "../../components/kit";
import { fonts } from "../../theme";
import { Skel, Strike } from "../../v2/ui";
import { Girl } from "../../v3/Girl";
import { Coin, Sweep } from "../../v4/parts";
import { Row } from "../../v5/parts";
import { makeSay } from "../sayf";
import { W, WORDS } from "../timeline2";
import { C, NumBadge, ROSE, Wash } from "../ui";

const { t, Say } = makeSay(W, WORDS, { 240: "Mudarabah" });
type S = React.FC;

// ---------- 1. Boost: easy but limited ----------

export const Boost: S = () => {
  const { frame, f } = useTime();
  const press = interpolate(frame, [f(t(4)), f(t(4)) + 4, f(t(4)) + 10], [1, 0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <Wash tone="blue" />
      <Say from={0} to={6} hi={[4]} size={58} style={{ position: "absolute", top: 90, left: 0, right: 0 }} />
      <Appear at={t(2)} style={{ position: "absolute", left: 200, top: 230 }}>
        <Glass style={{ width: 520, padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 50, height: 50, borderRadius: 99, background: "linear-gradient(160deg, #F9A8D4, #DB2777)" }} />
            <Skel w={180} strong />
          </div>
          <div style={{ height: 300, borderRadius: 18, background: "linear-gradient(135deg, #FCE7F3, #E0E7FF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Girl pose="phone" width={220} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ transform: `scale(${press})`, padding: "14px 34px", borderRadius: 14, background: "linear-gradient(90deg, #3B82F6, #2563EB)", fontFamily: fonts.ui, fontWeight: 700, fontSize: 32, color: "white", boxShadow: "0 10px 24px rgba(37,99,235,0.35)" }}>Boost</div>
          </div>
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 820, top: 250, width: 960, display: "flex", flexDirection: "column", gap: 20 }}>
        <Appear at={t(7)}>
          <Row width={940}>
            <IconTile icon={Rocket} tint={C.blue} size={80} />
            <Say from={7} to={11} hi={[8]} size={48} align="left" />
            <Pop at={t(11)} style={{ marginLeft: "auto" }}>
              <CheckBadge size={56} />
            </Pop>
          </Row>
        </Appear>
        <Appear at={t(12)}>
          <Row width={940} style={{ background: "rgba(255,251,235,0.95)" }}>
            <IconTile icon={Lock} tint={C.amber} size={80} />
            <div>
              <Say from={12} to={13} hi={[13]} size={54} align="left" />
              <Say from={14} to={24} size={36} align="left" style={{ fontWeight: 600 }} />
            </div>
          </Row>
        </Appear>
        <Appear at={t(25)}>
          <Row width={940} style={{ background: "rgba(253,242,248,0.95)" }}>
            <IconTile icon={User} tint={C.pink} size={80} />
            <Say from={25} to={40} hi={[32]} size={36} align="left" />
          </Row>
        </Appear>
      </div>
    </>
  );
};

// ---------- 2. verdict: Boost for reach, Ads Manager for steady sales ----------

export const Verdict: S = () => (
  <>
    <Wash tone="blue" />
    <div style={{ position: "absolute", left: 160, right: 160, top: 240, display: "flex", gap: 40 }}>
      <Appear at={t(41)} style={{ flex: 1 }}>
        <Glass style={{ height: 520, padding: "36px 36px", display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
          <IconTile icon={Rocket} tint={C.sky} size={130} />
          <Say from={41} to={52} hi={[42]} size={46} />
        </Glass>
      </Appear>
      <Appear at={t(53)} style={{ flex: 1 }}>
        <Glass active={1} style={{ height: 520, padding: "36px 36px", display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
          <IconTile icon={SlidersHorizontal} tint={C.indigo} size={130} />
          <Say from={53} to={59} hi={[57, 58]} size={56} />
        </Glass>
      </Appear>
    </div>
  </>
);

// ---------- 3. do you really need ads? 2,000 followers, few see a post ----------

export const Question: S = () => {
  const reach = useProgress(t(76), t(81) + 0.4);
  const dots = Array.from({ length: 60 }, (_, i) => ({ x: 980 + (i % 10) * 76, y: 300 + Math.floor(i / 10) * 76, lit: [3, 17, 24, 41, 56].includes(i) }));
  return (
    <>
      <Wash tone="violet" />
      <Say from={60} to={66} hi={[63, 66]} size={72} style={{ position: "absolute", top: 90, left: 0, right: 0 }} />
      <Appear at={t(67)} style={{ position: "absolute", left: 200, top: 280 }}>
        <Glass style={{ width: 640, padding: "30px 34px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <IconTile icon={Users} tint={C.pink} size={90} />
            <Say from={67} to={71} hi={[69, 70]} size={50} align="left" />
          </div>
          <Say from={72} to={81} hi={[79, 80]} size={42} align="left" />
        </Glass>
      </Appear>
      {dots.map((d, i) => (
        <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: 52, height: 52, borderRadius: 99, background: d.lit && reach > 0.5 ? "linear-gradient(160deg, #F9A8D4, #DB2777)" : "rgba(203,213,225,0.9)", opacity: 1 - (d.lit ? 0 : 0.5 * reach), transform: `scale(${d.lit ? 1 + 0.2 * reach : 1})` }} />
      ))}
    </>
  );
};

// ---------- 4. the feed is flooded; new people even less ----------

export const Flood: S = () => {
  const { frame } = useTime();
  return (
    <>
      <Wash tone="blue" />
      <div style={{ position: "absolute", left: 200, top: 120, width: 420, height: 860, overflow: "hidden", borderRadius: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, transform: `translateY(${-((frame * 6) % 600)}px)` }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <Glass key={i} style={{ height: 150, padding: 16, display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 70, height: 70, borderRadius: 14, background: ["#BFDBFE", "#FBCFE8", "#FDE68A", "#BBF7D0", "#DDD6FE"][i % 5] }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Skel w={180} strong />
                <Skel w={120} />
              </div>
            </Glass>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", left: 780, top: 260, width: 1000, display: "flex", flexDirection: "column", gap: 26 }}>
        <Say from={82} to={88} hi={[86]} size={58} align="left" />
        <Appear at={t(89)}>
          <Glass style={{ padding: "24px 30px", background: "rgba(255,251,235,0.95)" }}>
            <Say from={89} to={96} hi={[94, 95, 96]} size={48} align="left" />
          </Glass>
        </Appear>
        <Appear at={t(97)}>
          <Glass style={{ padding: "24px 30px", background: "rgba(255,241,242,0.95)" }}>
            <Say from={97} to={102} hi={[101, 102]} size={52} align="left" />
          </Glass>
        </Appear>
      </div>
    </>
  );
};

// ---------- 5. ads are needed for four reasons ----------

export const Four: S = () => (
  <>
    <Wash tone="green" />
    <Pop at={t(103)} style={{ position: "absolute", left: 960 - 90, top: 200 }}>
      <IconTile icon={Megaphone} tint={C.orange} size={180} />
    </Pop>
    <Say from={103} to={106} hi={[105]} size={84} style={{ position: "absolute", top: 460, left: 0, right: 0 }} />
    <div style={{ position: "absolute", top: 640, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 30 }}>
      {[C.blue, C.pink, C.amber, C.green].map((tint, i) => (
        <NumBadge key={i} at={t(105) + i * 0.12} n={["১", "২", "৩", "৪"][i]} tint={tint} size={110} />
      ))}
    </div>
  </>
);

// ---------- 6–9. the four reasons ----------

const Reason: React.FC<{ n: string; tint: [string, string]; at: number; title: [number, number, number[]]; children?: React.ReactNode; tone: "blue" | "pink" | "amber" | "green" }> = ({ n, tint, at, title, children, tone }) => (
  <>
    <Wash tone={tone} />
    <div style={{ position: "absolute", left: 140, top: 110, display: "flex", alignItems: "center", gap: 30 }}>
      <NumBadge at={at} n={n} tint={tint} />
      <Say from={title[0]} to={title[1]} hi={title[2]} size={64} align="left" />
    </div>
    {children}
  </>
);

export const R1: S = () => {
  const out = useProgress(t(117), t(124) + 0.5);
  return (
    <Reason n="১" tint={C.blue} at={t(107)} title={[108, 111, [108]]} tone="blue">
      <div style={{ position: "absolute", left: 960 - 130, top: 520 - 130, width: 260, height: 260, borderRadius: 999, background: "rgba(251,207,232,0.6)", border: "4px solid #DB2777", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Say from={113} to={115} size={36} />
      </div>
      {Array.from({ length: 36 }).map((_, i) => {
        const a = (i / 36) * Math.PI * 2;
        const r = 200 + 220 * out + (i % 3) * 40;
        return <div key={i} style={{ position: "absolute", left: 960 + Math.cos(a) * r - 22, top: 520 + Math.sin(a) * r * 0.62 - 22, width: 44, height: 44, borderRadius: 99, background: ["#93C5FD", "#C4B5FD", "#5EEAD4"][i % 3], opacity: out }} />;
      })}
      <Say from={112} to={124} hi={[118, 119]} size={44} style={{ position: "absolute", top: 900, left: 120, right: 120 }} />
    </Reason>
  );
};

export const R2: S = () => {
  const pick = useProgress(t(130), t(133) + 0.4);
  return (
    <Reason n="২" tint={C.pink} at={t(125)} title={[126, 129, [126]]} tone="pink">
      <div style={{ position: "absolute", left: 160, top: 300, display: "grid", gridTemplateColumns: "repeat(10, 80px)", gap: 18 }}>
        {Array.from({ length: 40 }).map((_, i) => {
          const fit = [3, 8, 12, 15, 21, 26, 33, 37].includes(i);
          const on = fit ? pick : 0;
          return (
            <div key={i} style={{ width: 80, height: 80, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center", background: on > 0.5 ? "linear-gradient(160deg, #F9A8D4, #DB2777)" : "rgba(226,232,240,0.95)", transform: `scale(${1 + 0.15 * on})`, opacity: fit ? 1 : 1 - 0.5 * pick }}>
              <User size={40} color={on > 0.5 ? "white" : "#64748B"} strokeWidth={2.3} />
            </div>
          );
        })}
      </div>
      <Pop at={t(130)} style={{ position: "absolute", left: 1260, top: 330 }}>
        <IconTile icon={Target} tint={C.pink} size={200} />
      </Pop>
      <Say from={130} to={133} hi={[131, 132, 133]} size={50} style={{ position: "absolute", top: 640, left: 1060, width: 600 }} />
    </Reason>
  );
};

export const R3: S = () => (
  <Reason n="৩" tint={C.amber} at={t(134)} title={[135, 135, [135]]} tone="amber">
    <div style={{ position: "absolute", left: 160, top: 320, display: "flex", alignItems: "center", gap: 40 }}>
      <Pop at={t(138)}>
        <Coin size={180} />
      </Pop>
      <Pop at={t(140)}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 120, color: "#B45309" }}>→</div>
      </Pop>
      <Pop at={t(141)}>
        <IconTile icon={ShoppingBag} tint={C.green} size={180} />
      </Pop>
    </div>
    <div style={{ position: "absolute", left: 1000, top: 360, width: 760 }}>
      <Say from={136} to={144} hi={[138, 139, 140, 141, 143]} size={56} align="left" />
    </div>
  </Reason>
);

export const R4: S = () => {
  const grow = useProgress(t(153), t(158) + 0.6);
  return (
    <Reason n="৪" tint={C.green} at={t(145)} title={[146, 147, [147]]} tone="green">
      <Appear at={t(148)} style={{ position: "absolute", left: 200, top: 300 }}>
        <Glass style={{ width: 780, height: 500, padding: 40, display: "flex", alignItems: "flex-end", gap: 34 }}>
          {[0, 1, 2, 3].map((i) => {
            const win = i === 2;
            const h = 0.25 + (win ? 0.65 * grow : -0.1 * grow);
            return <div key={i} style={{ flex: 1, height: `${h * 100}%`, borderRadius: 16, background: win ? "linear-gradient(180deg, #4ADE80, #16A34A)" : "rgba(203,213,225,0.9)" }} />;
          })}
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 1060, top: 320, width: 700, display: "flex", flexDirection: "column", gap: 20 }}>
        <Appear at={t(148)}>
          <Row width={700}>
            <IconTile icon={Wallet} tint={C.amber} size={80} />
            <Say from={148} to={151} hi={[148]} size={46} align="left" />
          </Row>
        </Appear>
        <Appear at={t(152)}>
          <Row width={700}>
            <IconTile icon={TrendingUp} tint={C.green} size={80} />
            <Say from={152} to={158} hi={[158]} size={42} align="left" />
          </Row>
        </Appear>
      </div>
    </Reason>
  );
};

// ---------- 10. an ad is a loudspeaker ----------

export const Loud: S = () => {
  const { frame, f } = useTime();
  const waves = Math.max(0, frame - f(t(165)));
  const bad = [
    { a: 171, b: 174, icon: Package },
    { a: 175, b: 177, icon: Camera },
    { a: 178, b: 181, icon: Coins },
  ];
  return (
    <>
      <Wash tone="amber" />
      <Say from={159} to={165} hi={[165]} size={64} style={{ position: "absolute", top: 90, left: 0, right: 0 }} />
      <div style={{ position: "absolute", left: 220, top: 330 }}>
        <Pop at={t(163)}>
          <IconTile icon={Megaphone} tint={C.orange} size={220} />
        </Pop>
        {[0, 1, 2].map((k) => {
          const s = ((waves / 30 + k / 3) % 1 + 1) % 1;
          return waves > 0 ? <div key={k} style={{ position: "absolute", left: 160 + 200 * s, top: 110 - 120 * s, width: 40 + 240 * s, height: 40 + 240 * s, borderRadius: 999, border: "6px solid rgba(249,115,22,0.6)", opacity: 1 - s, borderLeftColor: "transparent", borderBottomColor: "transparent", transform: "rotate(45deg)" }} /> : null;
        })}
      </div>
      <Say from={166} to={170} hi={[169]} size={48} align="left" style={{ position: "absolute", left: 160, top: 640, width: 600 }} />
      <div style={{ position: "absolute", left: 900, top: 280, display: "flex", flexDirection: "column", gap: 18 }}>
        {bad.map((r, i) => (
          <Appear key={i} at={t(r.a)}>
            <Row width={860} style={{ background: "rgba(255,241,242,0.95)" }}>
              <IconTile icon={r.icon} tint={C.rose} size={74} />
              <Say from={r.a} to={r.b} size={44} align="left" />
              <X size={44} color={ROSE} strokeWidth={3} style={{ marginLeft: "auto" }} />
            </Row>
          </Appear>
        ))}
        <Appear at={t(182)}>
          <Glass style={{ width: 860, padding: "20px 30px", background: "rgba(255,251,235,0.95)" }}>
            <Say from={182} to={193} hi={[184, 186]} size={40} align="left" />
          </Glass>
        </Appear>
      </div>
    </>
  );
};

// ---------- 11. first a good product, photo and offer; then ads ----------

export const First: S = () => (
  <>
    <Wash tone="green" />
    <Say from={194} to={195} hi={[195]} size={70} style={{ position: "absolute", top: 120, left: 0, right: 0 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 30 }}>
      {[
        { a: 196, b: 197, icon: Package, tint: C.green },
        { a: 198, b: 199, icon: Camera, tint: C.violet },
        { a: 201, b: 202, icon: Gift, tint: C.pink },
      ].map((r, i) => (
        <Appear key={i} at={t(r.a)}>
          <Glass style={{ width: 400, height: 360, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <IconTile icon={r.icon} tint={r.tint} size={130} />
            <Say from={r.a} to={r.b} size={50} />
            <Pop at={t(r.b) + 0.2}>
              <CheckBadge size={60} />
            </Pop>
          </Glass>
        </Appear>
      ))}
    </div>
    <Appear at={t(203)} style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", justifyContent: "center" }}>
      <Glass active={1} style={{ padding: "20px 44px", borderRadius: 999, display: "flex", alignItems: "center", gap: 20 }}>
        <Megaphone size={56} color="#F97316" strokeWidth={2.4} />
        <Say from={203} to={204} hi={[204]} size={70} />
      </Glass>
    </Appear>
  </>
);

// ---------- 12. Rumana's journey: from likes to profit ----------

export const Journey: S = () => {
  const walk = useProgress(t(212), t(222) + 0.4);
  return (
    <>
      <Wash tone="pink" />
      <Say from={205} to={211} hi={[207]} size={60} style={{ position: "absolute", top: 90, left: 0, right: 0 }} />
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <path d="M300 760 C 700 760, 900 480, 1600 440" fill="none" stroke="url(#jr11)" strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - walk} />
        <defs>
          <linearGradient id="jr11" x1="0" x2="1">
            <stop offset="0" stopColor="#93C5FD" />
            <stop offset="1" stopColor="#16A34A" />
          </linearGradient>
        </defs>
      </svg>
      <Appear at={t(212)} style={{ position: "absolute", left: 200, top: 620 }}>
        <Glass style={{ padding: "18px 26px", display: "flex", alignItems: "center", gap: 16 }}>
          <ThumbsUp size={56} color="#2563EB" strokeWidth={2.2} />
          <Say from={212} to={215} size={40} align="left" />
        </Glass>
      </Appear>
      <Appear at={t(216)} style={{ position: "absolute", left: 1080, top: 700 }}>
        <Glass active={1} style={{ padding: "22px 30px", display: "flex", alignItems: "center", gap: 18 }}>
          <IconTile icon={TrendingUp} tint={C.green} size={90} />
          <Say from={216} to={222} hi={[219, 220]} size={42} align="left" />
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 300 + 1300 * walk - 90, top: 760 - 320 * walk - 250 }}>
        <Girl pose={walk > 0.8 ? "relaxed" : "phone"} width={180} />
      </div>
    </>
  );
};

// ---------- 13. four things together make Facebook ads work ----------

export const Keys: S = () => {
  const join = useProgress(t(233), t(235) + 0.5);
  const keys = [
    { a: 223, b: 224, icon: Target, tint: C.blue },
    { a: 225, b: 226, icon: Megaphone, tint: C.orange },
    { a: 227, b: 228, icon: Eye, tint: C.violet },
    { a: 230, b: 232, icon: Wallet, tint: C.green },
  ];
  return (
    <>
      <Wash tone="violet" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 160, display: "flex", justifyContent: "center", gap: 30 - 24 * join }}>
        {keys.map((k, i) => (
          <Appear key={i} at={t(k.a)}>
            <Glass active={join} style={{ width: 380, height: 380, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22 }}>
              <IconTile icon={k.icon} tint={k.tint} size={130} />
              <Say from={k.a} to={k.b} size={44} />
            </Glass>
          </Appear>
        ))}
      </div>
      <Say from={233} to={239} hi={[235, 236, 237]} size={64} style={{ position: "absolute", top: 640, left: 0, right: 0 }} />
    </>
  );
};

// ---------- 14. what Mudarabah's entrepreneurs get ----------

export const Ours: S = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(240)} rise={60} style={{ position: "absolute", left: 200, top: 300 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={300} />
        <Sweep from={t(240) + 0.2} to={t(240) + 1.2} />
      </div>
    </Appear>
    <Say from={240} to={245} hi={[244]} size={56} align="left" style={{ position: "absolute", left: 600, top: 180, width: 1200 }} />
    <div style={{ position: "absolute", left: 600, top: 340, display: "flex", flexDirection: "column", gap: 22 }}>
      {[
        { a: 246, b: 251, icon: Globe, hi: [250, 251] },
        { a: 253, b: 255, icon: BookOpen, hi: [255] },
      ].map((r, i) => (
        <Appear key={i} at={t(r.a)}>
          <Row width={1100}>
            <IconTile icon={r.icon} tint={C.green} size={86} />
            <Say from={r.a} to={r.b} hi={r.hi} size={50} align="left" />
            <Pop at={t(r.b) + 0.2} style={{ marginLeft: "auto" }}>
              <CheckBadge size={60} />
            </Pop>
          </Row>
        </Appear>
      ))}
    </div>
  </>
);

// ---------- 15. outro: invest, don't spend; next: the Pixel ----------

export const Outro: S = () => (
  <>
    <Wash tone="amber" />
    <div style={{ position: "absolute", top: 200, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
      <Strike at={t(259)}>
        <Say from={256} to={258} size={70} />
      </Strike>
      <Say from={259} to={261} hi={[260]} size={90} />
    </div>
    <Appear at={t(262)} style={{ position: "absolute", left: 0, right: 0, top: 440, display: "flex", justifyContent: "center" }}>
      <Glass style={{ padding: "26px 44px", display: "flex", alignItems: "center", gap: 24 }}>
        <IconTile icon={Eye} tint={C.violet} size={90} />
        <Say from={262} to={268} hi={[265]} size={54} />
      </Glass>
    </Appear>
    <Appear at={t(269)} style={{ position: "absolute", left: 0, right: 0, top: 680, display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
      <LogoCard size={160} />
      <Say from={269} to={271} hi={[271]} size={64} />
    </Appear>
  </>
);

