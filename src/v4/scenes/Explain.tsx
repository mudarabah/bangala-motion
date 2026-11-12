// Scenes 1–11 of the Mudarabah explainer: idle money, the partner without capital,
// the handshake, the name, and how profit, loss and responsibility are shared.
import React from "react";
import { Coins, Handshake, Lock, ScrollText, Scale, ShieldCheck, ShoppingCart, Package, Banknote, Store, Cog, Clock as ClockIcon, Hand, TriangleAlert } from "lucide-react";
import { Easing, interpolate } from "remotion";
import { Appear, Glass, GradPill, Headline, IconTile, Pop, usePalette, useProgress, useTime, Word } from "../../components/kit";
import { fonts, greenIconTints as T } from "../../theme";
import { Strike } from "../../v2/ui";
import { Balance, Clock, Coin, HeroWord, Jar, NODE_L, NODE_R, PartnerNode, Sweep, Tag, useTravel } from "../parts";
import type { Timeline4 } from "../timeline";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
type P<K extends keyof Timeline4> = React.FC<{ t: Timeline4[K] }>;

// Point on a quadratic curve.
const q = (a: [number, number], c: [number, number], b: [number, number], u: number): [number, number] => [
  (1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0],
  (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1],
];

// ---------- 1. idle money ----------

export const IdleScene: P<"idle"> = ({ t }) => {
  const fog = useProgress(t.pore, t.na + 0.6);
  return (
    <>
      <div style={{ position: "absolute", left: 160, top: 330 }}>
        <Headline align="left" size={132} words={[["জমানো", t.jomano, true], ["টাকা", t.taka]]} />
        <Headline align="left" size={66} style={{ marginTop: 18 }} words={[["কাজে", t.kaje], ["লাগছে", t.lagche], ["না", t.na]]} />
      </div>
      <Appear at={t.start} rise={24} style={{ position: "absolute", left: 1120, top: 250 }}>
        <div style={{ filter: `saturate(${1 - 0.55 * fog})` }}>
          <Jar fog={fog} coinsIn={{ 8: t.taka, 9: t.taka + 0.15, 10: t.taka + 0.3 }} />
        </div>
      </Appear>
      <Appear at={t.kaje} style={{ position: "absolute", left: 1580, top: 230 }}>
        <Clock stopAt={t.na} />
      </Appear>
    </>
  );
};

// ---------- 2. the partner with skill but no capital ----------

const Blueprint: React.FC<{ p: number }> = ({ p }) => {
  const pal = usePalette();
  const line = (d: string, k: number) => (
    <path
      d={d}
      pathLength={1}
      fill="none"
      stroke={pal.brand}
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={1}
      strokeDashoffset={1 - interpolate(p, [k * 0.12, k * 0.12 + 0.4], [0, 1], clamp)}
    />
  );
  return (
    <svg viewBox="0 0 600 380" width={600} height={380}>
      <defs>
        <pattern id="grid4" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0 L0 0 0 30" fill="none" stroke={pal.lineSoft} strokeWidth={2} />
        </pattern>
      </defs>
      <rect x={0} y={0} width={600} height={380} rx={20} fill="url(#grid4)" />
      {line("M90 140 L510 140 L480 80 L120 80 Z", 0)}
      {line("M110 140 L110 330 L490 330 L490 140", 1)}
      {line("M260 330 L260 220 L340 220 L340 330", 2)}
      {line("M140 180 L220 180 L220 260 L140 260 Z", 3)}
      {line("M380 180 L460 180 L460 260 L380 260 Z", 4)}
      {line("M150 80 L150 140 M210 80 L210 140 M270 80 L270 140 M330 80 L330 140 M390 80 L390 140 M450 80 L450 140", 5)}
    </svg>
  );
};

export const NoCapitalScene: P<"noCapital"> = ({ t }) => {
  const draw = useProgress(t.byabsa, t.prostut + 0.6);
  const locked = useProgress(t.nei - 0.1, t.nei + 0.3);
  const lockPop = useProgress(t.nei - 0.15, t.nei + 0.25, Easing.out(Easing.back(1.4)));
  return (
    <>
      <div style={{ position: "absolute", left: 160, top: 280, width: 760 }}>
        <Headline align="left" size={84} words={[["ব্যবসা", t.byabsa], ["করতে", t.korte], ["জানেন", t.janen]]} />
        <Headline align="left" size={84} style={{ marginTop: 6 }} words={[["পরিশ্রম", t.porishrom, true]]} />
        <Headline align="left" size={84} style={{ marginTop: 6, opacity: 0.75 }} words={[["পুঁজি", t.puji], ["নেই", t.nei]]} />
      </div>
      <Appear at={t.keu} style={{ position: "absolute", left: 1000, top: 190 }}>
        <Glass style={{ width: 700, padding: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: 34 }}>
          <Blueprint p={draw} />
          <Appear at={t.shuru} rise={16}>
            <div style={{ position: "relative" }}>
              <GradPill size={40} style={{ filter: `grayscale(${locked}) opacity(${1 - 0.45 * locked})` }}>
                শুরু
              </GradPill>
              <div
                style={{
                  position: "absolute",
                  right: -34,
                  top: -30,
                  width: 70,
                  height: 70,
                  borderRadius: 99,
                  background: "white",
                  boxShadow: "0 10px 24px rgba(20,83,45,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: Math.min(1, lockPop * 2),
                  transform: `scale(${0.5 + 0.5 * lockPop})`,
                }}
              >
                <Lock size={36} color="#B45309" strokeWidth={2.6} />
              </div>
            </div>
          </Appear>
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 3. the handshake ----------

const PartnerCard: React.FC<{ icon: typeof Coins; tint: [string, string]; x: number }> = ({ icon, tint, x }) => (
  <Glass style={{ position: "absolute", left: x - 190, top: 300, width: 380, height: 380, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <IconTile icon={icon} tint={tint} size={170} />
  </Glass>
);

export const HandshakeScene: P<"handshake"> = ({ t }) => {
  const { frame, f } = useTime();
  const m = useTravel(t.dujon, t.melan + 0.1);
  const lx = 470 + 300 * m;
  const rx = 1450 - 300 * m;
  const ripple = interpolate(frame, [f(t.melan), f(t.melan) + 30], [0, 1], clamp);
  return (
    <>
      <PartnerCard icon={Coins} tint={T.orange} x={lx} />
      <PartnerCard icon={Store} tint={T.green} x={rx} />
      {ripple > 0 && ripple < 1 ? (
        <div
          style={{
            position: "absolute",
            left: 960 - 300,
            top: 490 - 300,
            width: 600,
            height: 600,
            borderRadius: 999,
            border: "6px solid rgba(34,197,94,0.6)",
            transform: `scale(${0.3 + ripple})`,
            opacity: 1 - ripple,
          }}
        />
      ) : null}
      <Pop at={t.melan} style={{ position: "absolute", left: 960 - 80, top: 490 - 80 }}>
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: 999,
            background: "white",
            boxShadow: "0 20px 50px rgba(20,83,45,0.22), 0 0 0 10px rgba(34,197,94,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Handshake size={92} color="#16A34A" strokeWidth={2.2} />
        </div>
      </Pop>
      <div style={{ position: "absolute", top: 730, left: lx - 300, width: 600, textAlign: "center" }}>
        <Headline size={72} words={[["পুঁজি", t.puji]]} />
      </div>
      <div style={{ position: "absolute", top: 730, left: rx - 300, width: 600, textAlign: "center" }}>
        <Headline size={72} words={[["পরিশ্রম", t.porishrom]]} />
      </div>
    </>
  );
};

// ---------- 4. the name ----------

export const NamingScene: P<"naming"> = ({ t }) => {
  const { frame } = useTime();
  return (
    <>
      <Appear at={t.start - 0.3} rise={0} scaleFrom={0.9} style={{ position: "absolute", left: 960 - 330, top: 520 - 330 }}>
        <div
          style={{
            width: 660,
            height: 660,
            borderRadius: 999,
            background: `conic-gradient(from ${frame * 1.2}deg, rgba(34,197,94,0.55), rgba(13,148,136,0.08), rgba(134,239,172,0.5), rgba(13,148,136,0.08), rgba(34,197,94,0.55))`,
            padding: 10,
          }}
        >
          <div style={{ width: "100%", height: "100%", borderRadius: 999, background: "rgba(255,255,255,0.86)", boxShadow: "inset 0 0 60px rgba(34,197,94,0.12)" }} />
        </div>
      </Appear>
      <div style={{ position: "absolute", top: 330, left: 0, right: 0, textAlign: "center" }}>
        <Word text="অংশীদারি" at={t.onsidari} style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 52, color: "#5B6F63" }} />
      </div>
      <div style={{ position: "absolute", top: 410, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <HeroWord text="মুদারাবাহ" at={t.mudarabah} size={176} />
      </div>
    </>
  );
};

// ---------- 5. fair and proven ----------

const ValueCard: React.FC<{ at: number; icon: typeof Scale; tint: [string, string]; word: React.ReactNode; x: number; wobble?: number }> = ({
  at,
  icon,
  tint,
  word,
  x,
  wobble = 0,
}) => (
  <Appear at={at} style={{ position: "absolute", left: x - 230, top: 340 }}>
    <Glass style={{ width: 460, padding: "50px 30px 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
      <div style={{ transform: `rotate(${wobble}deg)` }}>
        <IconTile icon={icon} tint={tint} size={160} />
      </div>
      {word}
    </Glass>
  </Appear>
);

export const FairScene: P<"fair"> = ({ t }) => {
  const { frame, f } = useTime();
  const s = frame - f(t.nyajjo);
  const wobble = s > 0 ? 8 * Math.cos(s / 4) * Math.exp(-s / 14) : 8;
  return (
    <>
      <Headline style={{ position: "absolute", top: 150, left: 0, right: 0 }} size={64} words={[["ইসলামী", t.start], ["অর্থনীতি", t.ojthoniti]]} />
      <ValueCard
        at={t.nyajjo}
        icon={Scale}
        tint={T.green}
        x={680}
        wobble={wobble}
        word={<Headline size={92} words={[["ন্যায্য", t.nyajjo, true]]} />}
      />
      <ValueCard at={t.porikkhito} icon={ShieldCheck} tint={T.teal} x={1240} word={<Headline size={92} words={[["পরীক্ষিত", t.porikkhito]]} />} />
    </>
  );
};

// ---------- 6. the two parties ----------

const BRIDGE_A: [number, number] = [NODE_L.x + 140, NODE_L.y - 40];
const BRIDGE_C: [number, number] = [960, 200];
const BRIDGE_B: [number, number] = [NODE_R.x - 140, NODE_R.y - 40];

export const PartiesScene: P<"parties"> = ({ t }) => {
  const pal = usePalette();
  const { frame, f } = useTime();
  const draw = useProgress(t.den - 0.2, t.den + 0.6);
  const flowing = frame - f(t.den);
  const gear = Math.max(0, frame - f(t.byabsa)) * 3;
  const slotsGone = useProgress(t.pujidata - 0.2, t.pujidata + 0.2);
  return (
    <>
      <Headline style={{ position: "absolute", top: 70, left: 0, right: 0 }} size={84} words={[["দুই", t.dui], ["পক্ষ", t.pokkho]]} />
      {[NODE_L, NODE_R].map((n, i) => (
        <Appear key={i} at={t.dui} rise={0} style={{ position: "absolute", left: n.x - 120, top: n.y - 120, opacity: 1 - (i === 0 ? slotsGone : 0) }}>
          <div style={{ width: 240, height: 240, borderRadius: 999, border: `4px dashed ${pal.lineStrong}` }} />
        </Appear>
      ))}
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <path
          d={`M${BRIDGE_A[0]} ${BRIDGE_A[1]} Q${BRIDGE_C[0]} ${BRIDGE_C[1]} ${BRIDGE_B[0]} ${BRIDGE_B[1]}`}
          pathLength={1}
          fill="none"
          stroke="url(#bridge4)"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
          opacity={0.75}
        />
        <defs>
          <linearGradient id="bridge4" x1="0" x2="1">
            <stop offset="0" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#16A34A" />
          </linearGradient>
        </defs>
      </svg>
      {flowing > 0
        ? [0, 1, 2].map((k) => {
            const u = ((flowing / 50 + k / 3) % 1 + 1) % 1;
            const [x, y] = q(BRIDGE_A, BRIDGE_C, BRIDGE_B, u);
            const o = Math.min(1, u * 6, (1 - u) * 6) * Math.min(1, flowing / 10);
            return <Coin key={k} size={54} style={{ position: "absolute", left: x - 27, top: y - 27, opacity: o }} />;
          })
        : null}
      <PartnerNode
        x={NODE_L.x}
        y={NODE_L.y}
        icon={Coins}
        tint={T.orange}
        at={t.pujidata}
        label={<Headline size={64} words={[["পুঁজিদাতা", t.pujidata, true]]} />}
        sub={<Headline size={40} style={{ fontWeight: 600 }} words={[["টাকা", t.taka], ["দেন", t.den]]} />}
      />
      <PartnerNode
        x={NODE_R.x}
        y={NODE_R.y}
        icon={Store}
        tint={T.green}
        at={t.mudarib}
        label={<Headline size={64} words={[["মুদারিব", t.mudarib, true]]} />}
        sub={<Headline size={40} style={{ fontWeight: 600 }} words={[["ব্যবসা", t.byabsa], ["চালান", t.chalan]]} />}
      >
        <Pop at={t.byabsa} style={{ position: "absolute", right: 6, top: 6 }}>
          <div style={{ width: 70, height: 70, borderRadius: 99, background: "white", boxShadow: "0 8px 20px rgba(20,83,45,0.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Cog size={44} color="#0D9488" strokeWidth={2.4} style={{ transform: `rotate(${gear}deg)` }} />
          </div>
        </Pop>
      </PartnerNode>
    </>
  );
};

// ---------- 7. profit split ----------

const RING = { x: 960, y: 430, r: 120, w: 46 };

const Half: React.FC<{ side: "l" | "r"; at: number; to: { x: number; y: number }; fill: string }> = ({ side, at, to, fill }) => {
  const m = useTravel(at, at + 0.8);
  const dx = (to.x - RING.x) * m;
  const dy = (to.y - RING.y) * m;
  const d =
    side === "l"
      ? `M${RING.x} ${RING.y - RING.r} A${RING.r} ${RING.r} 0 0 0 ${RING.x} ${RING.y + RING.r}`
      : `M${RING.x} ${RING.y - RING.r} A${RING.r} ${RING.r} 0 0 1 ${RING.x} ${RING.y + RING.r}`;
  return (
    <svg
      style={{ position: "absolute", left: 0, top: 0, overflow: "visible", transform: `translate(${dx}px, ${dy}px)`, opacity: 1 - 0.85 * interpolate(m, [0.75, 1], [0, 1], clamp) }}
      width={1920}
      height={1080}
    >
      <path d={d} fill="none" stroke={fill} strokeWidth={RING.w} strokeLinecap="butt" />
    </svg>
  );
};

const Nodes: React.FC<{ at: number; lActive?: number; rActive?: number }> = ({ at, lActive = 0, rActive = 0 }) => (
  <>
    <PartnerNode x={NODE_L.x} y={NODE_L.y} icon={Coins} tint={T.orange} at={at} active={lActive} label={<Tag size={46}>পুঁজিদাতা</Tag>} />
    <PartnerNode x={NODE_R.x} y={NODE_R.y} icon={Store} tint={T.green} at={at} active={rActive} label={<Tag size={46}>মুদারিব</Tag>} />
  </>
);

export const ProfitSplitScene: P<"profitSplit"> = ({ t }) => {
  const split = useProgress(t.bhag, t.bhag + 0.4);
  return (
    <>
      <Nodes at={t.start - 1} />
      <Headline style={{ position: "absolute", top: 160, left: 0, right: 0 }} size={92} words={[["লাভ", t.start, true]]} />
      <Pop at={t.start} style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }}>
        <Half side="l" at={t.ordhek1} to={NODE_L} fill="#F5B300" />
        <Half side="r" at={t.ordhek2} to={NODE_R} fill="#22C55E" />
        <div
          style={{
            position: "absolute",
            left: RING.x - 5,
            top: RING.y - RING.r - 40,
            width: 10,
            height: (RING.r * 2 + 80) * split,
            borderRadius: 5,
            background: "white",
            boxShadow: "0 0 18px rgba(255,255,255,0.9)",
            opacity: 1 - useProgress(t.ordhek1, t.ordhek1 + 0.3),
          }}
        />
      </Pop>
      <Appear at={t.thik} style={{ position: "absolute", left: 960 - 200, top: 650, width: 400, display: "flex", justifyContent: "center" }}>
        <Glass style={{ padding: "18px 30px", borderRadius: 999, display: "flex", alignItems: "center", gap: 16 }}>
          <ScrollText size={40} color="#16A34A" strokeWidth={2.3} />
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ width: 90, height: 16, borderRadius: 8, background: "#F5B300" }} />
            <div style={{ width: 4, height: 30, borderRadius: 2, background: "#10261A", opacity: 0.6 }} />
            <div style={{ width: 90, height: 16, borderRadius: 8, background: "#22C55E" }} />
          </div>
        </Glass>
      </Appear>
      <Headline style={{ position: "absolute", top: 740, left: 0, right: 0 }} size={52} words={[["অনুপাতে", t.onupate]]} />
      <Headline style={{ position: "absolute", top: NODE_L.y - 260, left: NODE_L.x - 200, width: 400 }} size={64} words={[["অর্ধেক", t.ordhek1, true]]} />
      <Headline style={{ position: "absolute", top: NODE_R.y - 260, left: NODE_R.x - 200, width: 400 }} size={64} words={[["অর্ধেক", t.ordhek2, true]]} />
    </>
  );
};

// ---------- 8. no fixed amount; profit comes from real trade ----------

const LOOP = { x: 1320, y: 440, r: 220 };

export const NoFixedScene: P<"noFixed"> = ({ t }) => {
  const pal = usePalette();
  const { frame, f } = useTime();
  const faded = useProgress(t.na + 0.2, t.na + 0.8);
  const ring = useProgress(t.karon - 0.1, t.karon + 0.8);
  const spin = Math.max(0, frame - f(t.kenabecha)) * 1.2;
  const items: { icon: typeof Package; tint: [string, string]; a: number; at: number }[] = [
    { icon: ShoppingCart, tint: T.sky, a: -90, at: t.asol },
    { icon: Package, tint: T.lime, a: 30, at: t.ponno },
    { icon: Banknote, tint: T.green, a: 150, at: t.kenabecha },
  ];
  return (
    <>
      <Appear at={t.start} style={{ position: "absolute", left: 110, top: 340, opacity: 1 - 0.55 * faded, transform: `scale(${1 - 0.06 * faded})` }}>
        <Glass style={{ width: 760, padding: "40px 44px", display: "flex", alignItems: "center", gap: 28 }}>
          <Coin size={110} style={{ flexShrink: 0 }} />
          <Strike at={t.na}>
            <Headline align="left" size={56} style={{ flexWrap: "nowrap", whiteSpace: "nowrap" }} words={[["নির্দিষ্ট", t.start], ["অঙ্কের", t.onker], ["টাকা", t.taka]]} />
          </Strike>
        </Glass>
      </Appear>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <circle
          cx={LOOP.x}
          cy={LOOP.y}
          r={LOOP.r}
          pathLength={1}
          fill="none"
          stroke={pal.lineStrong}
          strokeWidth={8}
          strokeDasharray={1}
          strokeDashoffset={1 - ring}
          transform={`rotate(-90 ${LOOP.x} ${LOOP.y})`}
        />
        <circle cx={LOOP.x} cy={LOOP.y} r={LOOP.r} fill="none" stroke="url(#loopg4)" strokeWidth={8} strokeDasharray="60 1322" strokeLinecap="round" strokeDashoffset={-spin * 4} opacity={spin > 0 ? 0.9 : 0} />
        <defs>
          <linearGradient id="loopg4" x1="0" x2="1">
            <stop offset="0" stopColor="#16A34A" />
            <stop offset="1" stopColor="#0D9488" />
          </linearGradient>
        </defs>
      </svg>
      {items.map((it, i) => {
        const a = ((it.a + spin) * Math.PI) / 180;
        const x = LOOP.x + LOOP.r * Math.cos(a);
        const y = LOOP.y + LOOP.r * Math.sin(a);
        return (
          <Pop key={i} at={it.at} style={{ position: "absolute", left: x - 60, top: y - 60 }}>
            <IconTile icon={it.icon} tint={it.tint} size={120} />
          </Pop>
        );
      })}
      <Pop at={t.labh} style={{ position: "absolute", left: LOOP.x - 60, top: LOOP.y - 60 }}>
        <Coin size={120} />
      </Pop>
      <Headline
        style={{ position: "absolute", top: 740, left: LOOP.x - 500, width: 1000 }}
        size={72}
        words={[["আসল", t.asol, true], ["পণ্য", t.ponno, true], ["কেনাবেচা", t.kenabecha]]}
      />
    </>
  );
};

// ---------- 9. if there is a loss ----------

const LossGraph: React.FC<{ p: number }> = ({ p }) => (
  <svg width={980} height={240} viewBox="0 0 980 240" style={{ overflow: "visible" }}>
    <path
      d="M10 150 C 120 120, 200 90, 300 100 S 470 60, 560 80 S 700 120, 760 170 S 900 220, 970 215"
      pathLength={1}
      fill="none"
      stroke="#F59E0B"
      strokeOpacity={0.8}
      strokeWidth={10}
      strokeLinecap="round"
      strokeDasharray={1}
      strokeDashoffset={1 - p}
    />
  </svg>
);

const LOSS_Y = 600;

export const LossScene: P<"loss"> = ({ t }) => {
  const graph = useProgress(t.start, t.loksan + 1);
  const lActive = useProgress(t.pujidata - 0.2, t.pujidata + 0.2) * (1 - useProgress(t.mudarib - 0.2, t.mudarib + 0.2));
  const rActive = useProgress(t.mudarib - 0.2, t.mudarib + 0.2);
  const coinsLost = useProgress(t.khoti, t.khoti + 0.8);
  const timeLost = useProgress(t.somoy, t.somoy + 0.5);
  const workLost = useProgress(t.shrom, t.shrom + 0.5);
  return (
    <>
      <div style={{ position: "absolute", left: 520, top: 90 }}>
        <LossGraph p={graph} />
      </div>
      <Headline style={{ position: "absolute", left: 140, top: 110 }} align="left" size={84} words={[["লোকসান", t.loksan]]} />
      <PartnerNode x={560} y={LOSS_Y} icon={Coins} tint={T.orange} at={t.start - 1} active={lActive} size={220} label={<Tag size={44}>পুঁজিদাতা</Tag>}>
        <div style={{ position: "absolute", right: -110, bottom: 10, display: "flex", flexDirection: "column-reverse", alignItems: "center" }}>
          {[0, 1, 2].map((k) => {
            const gone = interpolate(coinsLost, [k / 3, (k + 1) / 3], [0, 1], clamp);
            return <Coin key={k} size={64} style={{ marginTop: -26, opacity: k === 0 ? 1 : 1 - gone, transform: `translateY(${gone * 30}px)` }} />;
          })}
        </div>
      </PartnerNode>
      <PartnerNode x={1360} y={LOSS_Y} icon={Store} tint={T.green} at={t.start - 1} active={rActive} size={220} label={<Tag size={44}>মুদারিব</Tag>}>
        <div style={{ position: "absolute", right: -120, top: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <IconTile icon={ClockIcon} tint={T.sky} size={74} style={{ opacity: 1 - 0.7 * timeLost, filter: `grayscale(${timeLost})` }} />
          <IconTile icon={Hand} tint={T.teal} size={74} style={{ opacity: 1 - 0.7 * workLost, filter: `grayscale(${workLost})` }} />
        </div>
      </PartnerNode>
      <Headline style={{ position: "absolute", top: 820, left: 560 - 300, width: 600 }} size={56} words={[["আর্থিক", t.arthik], ["ক্ষতি", t.khoti]]} />
      <Headline style={{ position: "absolute", top: 820, left: 1360 - 300, width: 600 }} size={56} words={[["সময়", t.somoy], ["আর", t.ar], ["শ্রম", t.shrom]]} />
    </>
  );
};

// ---------- 10. negligence ----------

export const NegligenceScene: P<"negligence"> = ({ t }) => {
  const { frame, f } = useTime();
  const s = frame - f(t.obohelay);
  const swing = s > 0 ? 7 * Math.sin(s / 6) * Math.exp(-s / 24) : 0;
  const focus = useProgress(t.mudariber - 0.3, t.mudariber + 0.4);
  const duty = useProgress(t.day - 0.1, t.day + 0.3);
  const x = NODE_R.x - 400 * focus;
  return (
    <>
      <PartnerNode x={NODE_L.x} y={450} icon={Coins} tint={T.orange} at={t.start - 1} dim={focus} label={<Tag size={46}>পুঁজিদাতা</Tag>} />
      <PartnerNode x={x} y={450} icon={Store} tint={T.green} at={t.start - 1} active={duty} label={<Tag size={46}>মুদারিব</Tag>} />
      <Pop at={t.obohelay} style={{ position: "absolute", left: x - 140, top: 150, width: 280, display: "flex", justifyContent: "center" }}>
        <div style={{ transform: `rotate(${swing}deg)`, transformOrigin: "50% -40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 28px",
              borderRadius: 999,
              background: "rgba(255,251,235,0.96)",
              boxShadow: "0 12px 30px rgba(180,83,9,0.16), 0 0 0 2px rgba(245,158,11,0.5)",
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 44,
              color: "#92400E",
              whiteSpace: "nowrap",
            }}
          >
            <TriangleAlert size={40} color="#F59E0B" strokeWidth={2.5} />
            অবহেলা
          </div>
        </div>
      </Pop>
      <Headline style={{ position: "absolute", top: 730, left: x - 400, width: 800 }} size={110} words={[["দায়", t.day, true], ["তার", t.tar]]} />
    </>
  );
};

// ---------- 11. this is fairness ----------

export const FairnessScene: P<"fairness"> = ({ t }) => {
  const { frame, f } = useTime();
  const s = frame - f(t.pokkhoi);
  const settle = useProgress(t.nyajjota - 0.5, t.nyajjota + 0.1);
  const raw = s > 0 ? 9 * Math.cos(s / 7) * Math.exp(-s / 40) : 9;
  const tilt = raw * (1 - settle);
  return (
    <>
      <Appear at={t.start - 0.2} rise={20} style={{ position: "absolute", left: 960 - 380, top: 50 }}>
        <Balance
          tilt={tilt}
          width={760}
          left={<Coin size={96} />}
          right={<IconTile icon={Store} tint={T.green} size={100} />}
        />
      </Appear>
      <Headline style={{ position: "absolute", top: 630, left: 0, right: 0 }} size={60} words={[["ঝুঁকি", t.jhuki], ["ভাগ", t.bhag]]} />
      <div style={{ position: "absolute", top: 715, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <HeroWord text="ন্যায্যতা" at={t.nyajjota} size={150} />
      </div>
    </>
  );
};

// Re-exported for the sound design and video file.
export { Sweep };
