// All 27 scenes of the Meta Pixel explainer, in voice order. Every line on screen is a range of
// spoken words (see ../say.tsx), so text always matches the voice.
import React from "react";
import {
  BadgeCheck,
  Banknote,
  BookOpen,
  Ban,
  Code,
  Coins,
  DoorOpen,
  Eye,
  FlaskConical,
  Gauge,
  Hand,
  Lightbulb,
  Lock,
  MapPin,
  MousePointerClick,
  Package,
  Phone,
  PhoneMissed,
  RotateCcw,
  Server,
  ShieldOff,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Store,
  Target,
  ThumbsUp,
  Trash2,
  TriangleAlert,
  User,
  Users,
} from "lucide-react";
import { Easing, Img, interpolate, staticFile } from "remotion";
import { Appear, CheckBadge, Float, Glass, IconTile, LogoCard, Pop, usePalette, useProgress, useTime } from "../../components/kit";
import { fonts, greenIconTints as T } from "../../theme";
import { Skel, Strike } from "../../v2/ui";
import { Coin, HeroWord, Sweep, useTravel } from "../../v4/parts";
import { Row } from "../../v5/parts";
import { Say, t } from "../say";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ROSE = "#E11D48";
const AMBER: [string, string] = ["#FDE68A", "#F59E0B"];
const BN = ["১", "২", "৩", "৪"];
type S = React.FC;

// ---------- shared ----------

// Numbered topic badge + Latin title (Measurement, Optimization, ...).
const Topic: React.FC<{ n?: number; at: number; from: number; to: number }> = ({ n, at, from, to }) => {
  const pal = usePalette();
  return (
    <div style={{ position: "absolute", left: 140, top: 110, display: "flex", alignItems: "center", gap: 30 }}>
      {n !== undefined ? (
        <Pop at={at}>
          <div style={{ width: 110, height: 110, borderRadius: 99, background: pal.button, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.display, fontWeight: 800, fontSize: 64, color: "white", paddingTop: 6, boxShadow: `0 14px 30px rgba(${pal.brandRgb},0.35)` }}>
            {BN[n - 1]}
          </div>
        </Pop>
      ) : null}
      <Say from={from} to={to} size={84} align="left" hi={[to]} />
    </div>
  );
};

// A moving packet (glowing dot) along a straight line, looping while `on`.
const Packets: React.FC<{ x1: number; y1: number; x2: number; y2: number; from: number; color?: string; blockAt?: number; count?: number }> = ({ x1, y1, x2, y2, from, color = "#22C55E", blockAt, count = 3 }) => {
  const { frame, f } = useTime();
  const s = frame - f(from);
  if (s < 0) return null;
  return (
    <>
      {Array.from({ length: count }).map((_, k) => {
        let u = ((s / 45 + k / count) % 1 + 1) % 1;
        const stop = blockAt ?? 1;
        const dead = u > stop;
        if (dead) u = stop;
        const x = x1 + (x2 - x1) * u;
        const y = y1 + (y2 - y1) * u;
        return <div key={k} style={{ position: "absolute", left: x - 16, top: y - 16, width: 32, height: 32, borderRadius: 99, background: color, boxShadow: `0 0 18px ${color}`, opacity: dead ? 0 : Math.min(1, u * 8, (stop - u) * 8) }} />;
      })}
    </>
  );
};

const Line: React.FC<{ x1: number; y1: number; x2: number; y2: number; p: number; color?: string; dashed?: boolean }> = ({ x1, y1, x2, y2, p, color = "#BFE8CC", dashed }) => (
  <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1920} height={1080}>
    <line x1={x1} y1={y1} x2={x1 + (x2 - x1) * p} y2={y1 + (y2 - y1) * p} stroke={color} strokeWidth={8} strokeLinecap="round" strokeDasharray={dashed ? "16 16" : undefined} />
  </svg>
);

const Circle: React.FC<{ icon: typeof User; tint: [string, string]; size?: number; label?: React.ReactNode }> = ({ icon, tint, size = 200, label }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
    <Glass style={{ width: size, height: size, borderRadius: 999, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <IconTile icon={icon} tint={tint} size={size * 0.5} />
    </Glass>
    {label}
  </div>
);

const Pin: React.FC<{ x: number; y: number; at: number; children: React.ReactNode }> = ({ x, y, at, children }) => (
  <Pop at={at} style={{ position: "absolute", left: x, top: y }}>
    {children}
  </Pop>
);

// ---------- 1. hook: which taka brought an order, which was wasted? ----------

export const Hook: S = () => {
  const split = useProgress(t(7), t(14) + 0.4);
  const { frame, f } = useTime();
  return (
    <>
      <Say from={0} to={3} size={80} style={{ position: "absolute", top: 100, left: 0, right: 0 }} />
      <Pin x={960 - 80} y={250} at={t(1)}>
        <IconTile icon={Coins} tint={AMBER} size={160} />
      </Pin>
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const s = frame - f(t(7)) - k * 6;
        const u = interpolate(s, [0, 30], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
        if (u <= 0) return null;
        const left = k % 2 === 0;
        const x = 960 + (left ? -1 : 1) * 480 * u;
        const y = 420 + 200 * u - Math.sin(u * Math.PI) * 120;
        return <Coin key={k} size={58} style={{ position: "absolute", left: x - 29, top: y - 29, opacity: u < 1 ? 1 : 0 }} />;
      })}
      <Pin x={480 - 90} y={560} at={t(9)}>
        <Circle icon={ShoppingCart} tint={T.green} size={180} />
      </Pin>
      <Pin x={1440 - 90} y={560} at={t(14)}>
        <Circle icon={Trash2} tint={T.rose} size={180} />
      </Pin>
      <Say from={4} to={6} size={52} style={{ position: "absolute", top: 470, left: 0, right: 0, opacity: 1 - split * 0.0 }} />
      <Say from={7} to={10} hi={[9]} size={50} style={{ position: "absolute", top: 800, left: 480 - 330, width: 660 }} />
      <Say from={11} to={15} hi={[14]} size={50} style={{ position: "absolute", top: 800, left: 1440 - 330, width: 660 }} />
    </>
  );
};

// ---------- 2. intro: from simple to what even experts miss ----------

export const Intro: S = () => {
  const climb = useTravel(t(20), t(34));
  const steps = [0, 1, 2, 3, 4];
  return (
    <>
      <Say from={16} to={19} size={76} style={{ position: "absolute", top: 100, left: 0, right: 0 }} />
      {steps.map((i) => (
        <Appear key={i} at={t(20) + i * 0.4} style={{ position: "absolute", left: 300 + i * 260, top: 820 - i * 110 }}>
          <Glass style={{ width: 240, height: 110 + i * 110, padding: 0, borderRadius: "26px 26px 0 0", background: `rgba(255,255,255,${0.7 + i * 0.05})` }} />
        </Appear>
      ))}
      <div style={{ position: "absolute", left: 300 + 120 - 40 + climb * 4 * 260, top: 820 - 80 - climb * 4 * 110 }}>
        <IconTile icon={User} tint={T.green} size={80} />
      </div>
      <Say from={20} to={24} hi={[23]} size={52} align="left" style={{ position: "absolute", top: 940, left: 230 }} />
      <Say from={25} to={35} hi={[31, 32]} size={50} align="left" style={{ position: "absolute", top: 260, left: 1000, width: 820 }} />
    </>
  );
};

// ---------- 3. the shop assistant with a notebook ----------

export const Assistant: S = () => (
  <>
    <Say from={36} to={41} hi={[40]} size={72} style={{ position: "absolute", top: 100, left: 0, right: 0 }} />
    <Appear at={t(36)} style={{ position: "absolute", left: 220, top: 300 }}>
      <Glass style={{ width: 500, height: 560, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <IconTile icon={Store} tint={T.green} size={160} />
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <IconTile icon={User} tint={T.teal} size={110} />
          <Pop at={t(43)}>
            <IconTile icon={BookOpen} tint={AMBER} size={90} />
          </Pop>
        </div>
      </Glass>
    </Appear>
    <div style={{ position: "absolute", left: 860, top: 320, display: "flex", flexDirection: "column", gap: 24 }}>
      <Say from={42} to={45} size={50} align="left" />
      {[
        { at: t(46), icon: DoorOpen, a: 46, b: 48, tint: T.sky },
        { at: t(49), icon: Hand, a: 49, b: 53, tint: T.orange },
        { at: t(54), icon: ShoppingBag, a: 54, b: 56, tint: T.green },
      ].map((r, i) => (
        <Appear key={i} at={r.at}>
          <Row width={880}>
            <IconTile icon={r.icon} tint={r.tint} size={80} />
            <Say from={r.a} to={r.b} size={50} align="left" />
          </Row>
        </Appear>
      ))}
    </div>
  </>
);

// ---------- 4. online, the assistant is Meta Pixel ----------

export const PixelIntro: S = () => {
  const { frame } = useTime();
  return (
    <>
      <Say from={57} to={60} size={64} style={{ position: "absolute", top: 100, left: 0, right: 0 }} />
      <div style={{ position: "absolute", top: 190, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <HeroWord text={<span style={{ fontFamily: fonts.ui }}>Meta Pixel</span>} at={t(61)} size={140} />
      </div>
      <Appear at={t(65)} style={{ position: "absolute", left: 0, right: 0, top: 410, display: "flex", justifyContent: "center" }}>
        <Glass style={{ padding: "16px 30px", borderRadius: 999, display: "flex", alignItems: "center", gap: 18 }}>
          <Code size={44} color="#0D9488" strokeWidth={2.4} />
          <Say from={63} to={66} size={48} />
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center", gap: 34 }}>
        {[0, 1, 2, 3].map((i) => (
          <Appear key={i} at={t(69) + i * 0.15}>
            <Glass style={{ position: "relative", width: 250, height: 250, padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
              <Skel w={150} strong />
              <Skel w={110} />
              <div style={{ flex: 1, borderRadius: 14, background: "rgba(240,250,243,0.9)" }} />
              <Pop at={t(70) + i * 0.12} style={{ position: "absolute", right: 14, top: 14 }}>
                <div style={{ width: 26, height: 26, borderRadius: 99, background: "#22C55E", boxShadow: `0 0 ${10 + 6 * Math.sin(frame / 6 + i)}px #22C55E` }} />
              </Pop>
            </Glass>
          </Appear>
        ))}
      </div>
      <Say from={67} to={74} hi={[70]} size={50} style={{ position: "absolute", top: 870, left: 0, right: 0 }} />
    </>
  );
};

// ---------- 5. customer action → Pixel → Meta server = an event ----------

export const EventScene: S = () => (
  <>
    <Say from={75} to={78} size={60} style={{ position: "absolute", top: 100, left: 0, right: 0 }} />
    <Pin x={260} y={360} at={t(75)}>
      <Circle icon={MousePointerClick} tint={T.sky} label={<Say from={75} to={75} size={40} />} />
    </Pin>
    <Pin x={860} y={360} at={t(79)}>
      <Circle icon={Eye} tint={T.green} label={<Say from={79} to={79} size={40} />} />
    </Pin>
    <Pin x={1460} y={360} at={t(82)}>
      <Circle icon={Server} tint={T.teal} label={<Say from={82} to={83} size={40} />} />
    </Pin>
    <Line x1={470} y1={460} x2={850} y2={460} p={useProgress(t(79) - 0.2, t(79) + 0.3)} />
    <Line x1={1070} y1={460} x2={1450} y2={460} p={useProgress(t(82) - 0.2, t(85))} />
    <Packets x1={470} y1={460} x2={850} y2={460} from={t(80)} />
    <Packets x1={1070} y1={460} x2={1450} y2={460} from={t(85)} />
    <Say from={79} to={85} hi={[81]} size={46} style={{ position: "absolute", top: 700, left: 0, right: 0 }} />
    <div style={{ position: "absolute", top: 800, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "baseline", gap: 24 }}>
      <Say from={86} to={91} size={50} />
      <HeroWord text={<span style={{ fontFamily: fonts.ui }}>Event</span>} at={t(92)} size={110} />
    </div>
  </>
);

// ---------- 6. the five standard events (a funnel) ----------

const FUNNEL = [
  { name: [99, 100], mean: [101, 103], w: 1, icon: Eye },
  { name: [104, 105], mean: [106, 109], w: 0.82, icon: Package },
  { name: [110, 112], mean: [113, 115], w: 0.64, icon: ShoppingCart },
  { name: [116, 117], mean: [118, 121], w: 0.46, icon: Banknote },
  { name: [123, 123], mean: [124, 124], w: 0.3, icon: ShoppingBag },
];

const Funnel: React.FC<{ meanings?: boolean; mark?: { checkout: number; add: number }; top?: number }> = ({ meanings = true, mark, top = 260 }) => {
  const pal = usePalette();
  return (
    <div style={{ position: "absolute", left: 140, top, display: "flex", flexDirection: "column", gap: 18 }}>
      {FUNNEL.map((r, i) => {
        const bad = mark && i === 3 ? useProgress(mark.checkout - 0.1, mark.checkout + 0.3) : 0;
        const ok = mark && i === 2 ? useProgress(mark.add - 0.1, mark.add + 0.3) : 0;
        return (
          <Appear key={i} at={meanings ? t(r.name[0]) : t(125) + i * 0.12}>
            <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
              <div style={{ width: 760, display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    width: 760 * r.w,
                    height: 104,
                    borderRadius: 24,
                    background: bad > 0 ? `linear-gradient(90deg, rgba(254,226,226,1), rgba(254,205,211,1))` : `linear-gradient(90deg, rgba(220,252,231,${0.9 - i * 0.08}), rgba(167,243,208,${0.9 - i * 0.08}))`,
                    boxShadow: `0 10px 24px rgba(${pal.shadowRgb},0.10), 0 0 0 ${3 * bad + 3 * ok}px ${bad > 0 ? "rgba(225,29,72,0.7)" : "rgba(34,197,94,0.7)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                  }}
                >
                  <r.icon size={40} color="#15803D" strokeWidth={2.3} />
                  <Say from={r.name[0]} to={r.name[1]} size={44} />
                </div>
              </div>
              {meanings ? <Say from={r.mean[0]} to={r.mean[1]} size={46} align="left" /> : null}
              {mark && i === 3 ? (
                <Pop at={mark.checkout}>
                  <IconTile icon={TriangleAlert} tint={T.rose} size={70} />
                </Pop>
              ) : null}
              {mark && i === 2 ? (
                <Pop at={mark.add}>
                  <CheckBadge size={60} />
                </Pop>
              ) : null}
            </div>
          </Appear>
        );
      })}
    </div>
  );
};

export const FunnelScene: S = () => (
  <>
    <Say from={93} to={98} hi={[96, 97]} size={64} style={{ position: "absolute", top: 100, left: 0, right: 0 }} />
    <Funnel />
  </>
);

// ---------- 7. the funnel shows where customers get stuck ----------

export const Insight: S = () => (
  <>
    <Say from={125} to={133} hi={[132]} size={58} style={{ position: "absolute", top: 100, left: 0, right: 0 }} />
    <Funnel meanings={false} mark={{ checkout: t(146), add: t(148) }} top={250} />
    <div style={{ position: "absolute", left: 1080, top: 330, width: 760, display: "flex", flexDirection: "column", gap: 30 }}>
      <Appear at={t(134)}>
        <Glass style={{ padding: "24px 30px" }}>
          <Say from={134} to={143} size={46} align="left" />
        </Glass>
      </Appear>
      <Appear at={t(144)}>
        <Glass active={1} style={{ padding: "24px 30px" }}>
          <Say from={144} to={150} hi={[146]} size={54} align="left" />
        </Glass>
      </Appear>
    </div>
  </>
);

// ---------- 8. send parameters, not just the event name ----------

export const Params: S = () => (
  <>
    <Say from={151} to={158} size={58} style={{ position: "absolute", top: 100, left: 0, right: 0 }} />
    <Say from={159} to={162} hi={[162]} size={80} style={{ position: "absolute", top: 190, left: 0, right: 0 }} />
    <Appear at={t(159)} style={{ position: "absolute", left: 300, top: 360 }}>
      <Glass style={{ width: 1320, padding: "34px 44px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <IconTile icon={ShoppingBag} tint={T.green} size={80} />
          <Say from={123} to={123} size={52} align="left" style={{ opacity: 1 }} />
        </div>
        {[
          { at: t(163), icon: Coins, a: 163, b: 165, tint: AMBER },
          { at: t(166), icon: Banknote, a: 166, b: 167, tint: T.teal },
          { at: t(168), icon: Package, a: 168, b: 170, tint: T.sky },
        ].map((r, i) => (
          <Appear key={i} at={r.at}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "16px 22px", borderRadius: 18, background: "rgba(240,250,243,0.9)" }}>
              <IconTile icon={r.icon} tint={r.tint} size={64} />
              <Say from={r.a} to={r.b} size={46} align="left" />
              {i === 2 ? (
                <Appear at={t(175)} style={{ marginLeft: "auto" }}>
                  <div style={{ padding: "10px 22px", borderRadius: 14, background: "#0F172A", fontFamily: "monospace", fontSize: 38, color: "#86EFAC" }}>content_ids</div>
                </Appear>
              ) : null}
            </div>
          </Appear>
        ))}
      </Glass>
    </Appear>
    <Say from={171} to={177} hi={[175]} size={48} style={{ position: "absolute", top: 900, left: 0, right: 0 }} />
  </>
);

// ---------- 9. IDs must match the catalog → catalog ads ----------

export const Catalog: S = () => {
  const link = useProgress(t(188) - 0.2, t(188) + 0.4);
  return (
    <>
      <Say from={178} to={188} hi={[188]} size={52} style={{ position: "absolute", top: 90, left: 120, right: 120 }} />
      <Appear at={t(181)} style={{ position: "absolute", left: 200, top: 300 }}>
        <Glass style={{ width: 320, height: 560, padding: 12, borderRadius: 40 }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 30, overflow: "hidden" }}>
            <Img src={staticFile("products/site-mudarabah-card.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </Glass>
        <div style={{ position: "absolute", left: 20, top: 20, padding: "6px 14px", borderRadius: 10, background: "#0F172A", fontFamily: "monospace", fontSize: 26, color: "#86EFAC" }}>ID</div>
      </Appear>
      <Appear at={t(182)} style={{ position: "absolute", left: 760, top: 330 }}>
        <Glass style={{ width: 420, padding: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{ height: 100, borderRadius: 14, overflow: "hidden", background: "rgba(240,250,243,0.9)", boxShadow: i === 4 ? `0 0 0 ${5 * link}px rgba(34,197,94,0.85)` : undefined }}>
              {i === 4 ? <Img src={staticFile("products/site-mudarabah-card.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} /> : null}
            </div>
          ))}
        </Glass>
        <Say from={182} to={183} size={40} style={{ marginTop: 12 }} />
      </Appear>
      <Line x1={540} y1={580} x2={900} y2={540} p={link} color="#22C55E" dashed />
      <Appear at={t(194)} style={{ position: "absolute", left: 1290, top: 300 }}>
        <Glass style={{ width: 460, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 99, background: "linear-gradient(160deg, #7DD3FC, #0284C7)" }} />
            <Skel w={160} strong />
          </div>
          <div style={{ height: 260, borderRadius: 18, overflow: "hidden" }}>
            <Img src={staticFile("products/site-mudarabah-card.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          </div>
          <Say from={198} to={201} hi={[198]} size={40} />
        </Glass>
      </Appear>
      <Say from={189} to={193} hi={[192]} size={46} style={{ position: "absolute", top: 900, left: 0, right: 0 }} />
      <Appear at={t(202)} style={{ position: "absolute", top: 890, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Glass style={{ padding: "16px 30px", borderRadius: 999 }}>
          <Say from={202} to={215} hi={[211]} size={42} />
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 10. (1) Measurement: ROAS ----------

export const Measure: S = () => {
  const needle = useProgress(t(232) - 0.2, t(233) + 0.4, Easing.out(Easing.back(1.4)));
  return (
    <>
      <Topic n={1} at={t(216)} from={217} to={217} />
      <div style={{ position: "absolute", left: 160, top: 330, display: "flex", alignItems: "center", gap: 30 }}>
        <Pop at={t(219)}>
          <IconTile icon={Target} tint={T.orange} size={140} />
        </Pop>
        <Appear at={t(222)}>
          <div style={{ display: "flex", gap: 14 }}>
            {[0, 1, 2].map((i) => (
              <Coin key={i} size={90} />
            ))}
          </div>
        </Appear>
      </div>
      <Say from={218} to={224} size={56} align="left" style={{ position: "absolute", left: 160, top: 520, width: 760 }} />
      <Appear at={t(227)} style={{ position: "absolute", left: 1040, top: 280 }}>
        <Glass style={{ width: 660, height: 520, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <svg width={460} height={250} viewBox="0 0 460 250">
            <path d="M30 230 A200 200 0 0 1 430 230" fill="none" stroke="#E3F3E8" strokeWidth={34} strokeLinecap="round" />
            <path d="M30 230 A200 200 0 0 1 430 230" pathLength={1} fill="none" stroke="url(#roas10)" strokeWidth={34} strokeLinecap="round" strokeDasharray={1} strokeDashoffset={1 - 0.75 * needle} />
            <line x1={230} y1={230} x2={230 + 160 * Math.cos(Math.PI * (1 - 0.75 * needle))} y2={230 - 160 * Math.sin(Math.PI * (1 - 0.75 * needle))} stroke="#10261A" strokeWidth={10} strokeLinecap="round" />
            <circle cx={230} cy={230} r={18} fill="#10261A" />
            <defs>
              <linearGradient id="roas10" x1="0" x2="1">
                <stop offset="0" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#16A34A" />
              </linearGradient>
            </defs>
          </svg>
          <Say from={232} to={232} size={72} hi={[232]} />
          <Say from={227} to={230} size={38} />
        </Glass>
      </Appear>
      <Say from={233} to={236} size={46} style={{ position: "absolute", top: 860, left: 1040, width: 660 }} />
    </>
  );
};

// ---------- 11. (2) Optimization: finding likely buyers ----------

export const Optim: S = () => {
  const pick = useProgress(t(251), t(257) + 0.4);
  const noPixel = useProgress(t(258) - 0.1, t(260) + 0.3);
  const crowd = Array.from({ length: 28 }, (_, i) => ({ x: 980 + (i % 7) * 120, y: 330 + Math.floor(i / 7) * 120, buyer: [3, 8, 12, 17, 22, 26].includes(i) }));
  return (
    <>
      <Topic n={2} at={t(237)} from={238} to={238} />
      <Appear at={t(239)} style={{ position: "absolute", left: 160, top: 330 }}>
        <Glass style={{ width: 680, padding: "30px 36px", display: "flex", flexDirection: "column", gap: 20 }}>
          <Say from={239} to={245} hi={[244]} size={48} align="left" />
          <Say from={246} to={257} hi={[255, 256]} size={40} align="left" style={{ fontWeight: 600 }} />
        </Glass>
      </Appear>
      {crowd.map((c, i) => {
        const on = c.buyer ? pick * (1 - noPixel) : 0;
        return (
          <div key={i} style={{ position: "absolute", left: c.x, top: c.y, width: 84, height: 84, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center", background: on > 0.5 ? "linear-gradient(160deg, #4ADE80, #16A34A)" : "rgba(226,232,240,0.95)", boxShadow: on > 0.5 ? "0 0 0 6px rgba(34,197,94,0.25)" : undefined, transform: `scale(${1 + 0.15 * on})` }}>
            {noPixel > 0.5 && i % 3 === 0 ? <ThumbsUp size={40} color="#0284C7" strokeWidth={2.3} /> : noPixel > 0.5 && i % 3 === 1 ? <MousePointerClick size={40} color="#64748B" strokeWidth={2.3} /> : <User size={40} color={on > 0.5 ? "white" : "#64748B"} strokeWidth={2.3} />}
          </div>
        );
      })}
      <Appear at={t(258)} style={{ position: "absolute", left: 160, top: 760 }}>
        <Glass style={{ width: 680, padding: "24px 32px", background: "rgba(255,241,242,0.95)" }}>
          <Say from={258} to={269} hi={[268]} size={42} align="left" />
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 12. (3) Retargeting: custom audiences up to 180 days ----------

export const Retarget: S = () => {
  const pal = usePalette();
  const fill = useProgress(t(281) - 0.2, t(286));
  const last7 = useProgress(t(288), t(295));
  return (
    <>
      <Topic n={3} at={t(270)} from={271} to={271} />
      <Say from={272} to={280} hi={[277, 278]} size={52} style={{ position: "absolute", top: 280, left: 120, right: 120 }} />
      <Appear at={t(281)} style={{ position: "absolute", left: 160, top: 470 }}>
        <div style={{ position: "relative", width: 1600, height: 160 }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 60, height: 36, borderRadius: 18, background: pal.lineSoft }} />
          <div style={{ position: "absolute", left: 0, top: 60, height: 36, width: `${fill * 100}%`, borderRadius: 18, background: "linear-gradient(90deg, #BBF7D0, #22C55E)" }} />
          <div style={{ position: "absolute", right: 0, top: 50, height: 56, width: `${(7 / 180) * 100 * 4}%`, borderRadius: 18, boxShadow: `0 0 0 ${6 * last7}px rgba(245,158,11,0.9)` }} />
          {Array.from({ length: 22 }).map((_, i) => (
            <div key={i} style={{ position: "absolute", left: 30 + i * 72, top: 66, width: 24, height: 24, borderRadius: 99, background: "white", opacity: fill > i / 22 ? 1 : 0 }} />
          ))}
          <Say from={281} to={286} hi={[281]} size={44} style={{ position: "absolute", top: 110, left: 0, right: 0 }} />
        </div>
      </Appear>
      <Appear at={t(287)} style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", justifyContent: "center" }}>
        <Glass style={{ padding: "22px 36px", display: "flex", alignItems: "center", gap: 22, background: "rgba(255,251,235,0.95)" }}>
          <IconTile icon={ShoppingCart} tint={AMBER} size={80} />
          <Say from={287} to={295} hi={[292]} size={48} />
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 13. (4) Lookalike audiences: 1% vs 10% ----------

export const Lookalike: S = () => {
  const one = useProgress(t(308) - 0.2, t(310) + 0.4);
  const ten = useProgress(t(319) - 0.2, t(320) + 0.6);
  const dots = (r: number, n: number, k: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + k;
      return { x: 560 + Math.cos(a) * r, y: 600 + Math.sin(a) * r * 0.82 };
    });
  return (
    <>
      <Topic n={4} at={t(296)} from={297} to={298} />
      <Say from={299} to={307} hi={[301, 303]} size={48} style={{ position: "absolute", top: 260, left: 120, right: 120 }} />
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <ellipse cx={560} cy={600} rx={150} ry={123} fill="rgba(34,197,94,0.14)" stroke="#22C55E" strokeWidth={5} opacity={one} />
        <ellipse cx={560} cy={600} rx={330} ry={270} fill="rgba(13,148,136,0.06)" stroke="#0D9488" strokeWidth={5} strokeDasharray="14 14" opacity={ten} />
      </svg>
      <div style={{ position: "absolute", left: 560 - 55, top: 600 - 55 }}>
        <IconTile icon={Users} tint={T.green} size={110} />
      </div>
      {dots(150, 8, 0.3).map((d, i) => (
        <div key={`a${i}`} style={{ position: "absolute", left: d.x - 18, top: d.y - 18, width: 36, height: 36, borderRadius: 99, background: "#16A34A", opacity: one }} />
      ))}
      {dots(330, 18, 0.1).map((d, i) => (
        <div key={`b${i}`} style={{ position: "absolute", left: d.x - 15, top: d.y - 15, width: 30, height: 30, borderRadius: 99, background: "#99F6E4", border: "3px solid #0D9488", opacity: ten }} />
      ))}
      <div style={{ position: "absolute", left: 1000, top: 430, display: "flex", flexDirection: "column", gap: 26 }}>
        <Appear at={t(308)}>
          <Row width={800}>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 60, color: "#16A34A", width: 120 }}>১%</div>
            <Say from={311} to={318} hi={[312, 313]} size={42} align="left" />
          </Row>
        </Appear>
        <Appear at={t(319)}>
          <Row width={800}>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 60, color: "#0D9488", width: 120 }}>১০%</div>
            <Say from={321} to={326} hi={[322]} size={42} align="left" />
          </Row>
        </Appear>
      </div>
    </>
  );
};

// ---------- 14. now, things many people don't know ----------

export const Lesser: S = () => (
  <>
    <Pin x={960 - 90} y={240} at={t(327)}>
      <Float amp={8}>
        <IconTile icon={Lightbulb} tint={AMBER} size={180} />
      </Float>
    </Pin>
    <Say from={327} to={333} hi={[331, 332]} size={84} style={{ position: "absolute", top: 520, left: 0, right: 0 }} />
  </>
);

// ---------- 15. Learning phase ----------

export const Learning: S = () => {
  const pal = usePalette();
  const grow = useProgress(t(349), t(359) + 0.4);
  const reset = useProgress(t(368) - 0.1, t(369) + 0.4);
  const p = grow * (1 - reset);
  return (
    <>
      <Topic at={t(334)} from={334} to={335} />
      <Say from={336} to={343} hi={[343]} size={52} style={{ position: "absolute", top: 260, left: 120, right: 120 }} />
      <Appear at={t(344)} style={{ position: "absolute", left: 160, top: 400 }}>
        <Glass style={{ width: 1600, padding: "34px 40px", display: "flex", flexDirection: "column", gap: 20 }}>
          <Say from={344} to={360} hi={[352, 354, 355]} size={40} align="left" />
          <div style={{ position: "relative", height: 70, borderRadius: 35, background: pal.lineSoft, overflow: "hidden" }}>
            <div style={{ width: `${p * 100}%`, height: "100%", borderRadius: 35, background: "linear-gradient(90deg, #86EFAC, #16A34A)" }} />
            <div style={{ position: "absolute", right: 30, top: 10, fontFamily: fonts.display, fontWeight: 800, fontSize: 44, color: "#10261A" }}>{`${"০১২৩৪৫৬৭৮৯"[Math.floor((p * 50) / 10)] ?? "৫"}${"০১২৩৪৫৬৭৮৯"[Math.round(p * 50) % 10]}`}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px" }}>
            {["১", "২", "৩", "৪", "৫", "৬", "৭"].map((d, i) => (
              <div key={i} style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 34, color: grow > (i + 1) / 7 - 0.01 ? "#16A34A" : "#94A3B8" }}>{d}</div>
            ))}
          </div>
        </Glass>
      </Appear>
      <Appear at={t(361)} style={{ position: "absolute", left: 160, top: 800 }}>
        <Glass style={{ padding: "22px 34px", display: "flex", alignItems: "center", gap: 20, background: "rgba(255,251,235,0.95)" }}>
          <IconTile icon={Ban} tint={AMBER} size={74} />
          <Say from={361} to={365} hi={[364]} size={50} align="left" />
        </Glass>
      </Appear>
      <Appear at={t(366)} style={{ position: "absolute", left: 1000, top: 800 }}>
        <Glass style={{ padding: "22px 34px", display: "flex", alignItems: "center", gap: 20, background: "rgba(255,241,242,0.95)" }}>
          <RotateCcw size={56} color={ROSE} strokeWidth={2.6} />
          <Say from={366} to={372} hi={[369]} size={46} align="left" />
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 16. Attribution window ----------

export const Attribution: S = () => {
  const pal = usePalette();
  const click = useProgress(t(387), t(391) + 0.3);
  const view = useProgress(t(393), t(396) + 0.3);
  return (
    <>
      <Topic at={t(373)} from={373} to={374} />
      <Say from={375} to={382} hi={[381]} size={48} style={{ position: "absolute", top: 250, left: 120, right: 120 }} />
      <div style={{ position: "absolute", left: 160, top: 360, width: 1600, display: "flex", flexDirection: "column", gap: 26 }}>
        {[
          { at: t(387), icon: MousePointerClick, p: click, w: 1, a: 383, b: 391, tint: T.green },
          { at: t(392), icon: Eye, p: view, w: 1 / 7, a: 392, b: 397, tint: T.sky },
        ].map((r, i) => (
          <Appear key={i} at={r.at}>
            <Glass style={{ padding: "22px 30px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <IconTile icon={r.icon} tint={r.tint} size={70} />
                <Say from={r.a} to={r.b} hi={i === 0 ? [389, 390] : [395]} size={42} align="left" />
              </div>
              <div style={{ position: "relative", height: 34, borderRadius: 17, background: pal.lineSoft }}>
                <div style={{ width: `${r.w * r.p * 100}%`, height: "100%", borderRadius: 17, background: `linear-gradient(90deg, ${r.tint[0]}, ${r.tint[1]})` }} />
              </div>
            </Glass>
          </Appear>
        ))}
      </div>
      <Appear at={t(398)} style={{ position: "absolute", left: 160, top: 780, width: 1600 }}>
        <Glass style={{ padding: "22px 30px", display: "flex", alignItems: "center", gap: 24 }}>
          <Say from={398} to={412} hi={[410, 411]} size={42} align="left" style={{ flex: 1 }} />
          <Pop at={t(414)}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <CheckBadge size={60} />
              <Say from={413} to={414} size={44} hi={[414]} />
            </div>
          </Pop>
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 17. Event Match Quality: hashed customer data, score out of 10 ----------

const HASH = "9f2c7a1e84b0d3f65a7c21e9b04f8d3c6a17e52b9d0c4f38a6e1b7d29c05f4a1";

export const Emq: S = () => {
  const { frame } = useTime();
  const score = useProgress(t(462), t(472) + 0.4);
  const scramble = useProgress(t(437), t(442));
  return (
    <>
      <Topic at={t(415)} from={415} to={417} />
      <Say from={418} to={427} hi={[427]} size={46} style={{ position: "absolute", top: 250, left: 120, right: 120 }} />
      <div style={{ position: "absolute", left: 160, top: 370, display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { at: t(431), icon: Phone, a: 431, b: 432 },
          { at: t(433), icon: User, a: 433, b: 433 },
          { at: t(434), icon: MapPin, a: 434, b: 434 },
        ].map((r, i) => (
          <Appear key={i} at={r.at}>
            <Row width={420} style={{ padding: "14px 24px" }}>
              <IconTile icon={r.icon} tint={T.sky} size={60} />
              <Say from={r.a} to={r.b} size={44} align="left" />
            </Row>
          </Appear>
        ))}
      </div>
      <Appear at={t(437)} style={{ position: "absolute", left: 640, top: 380 }}>
        <Glass style={{ width: 560, padding: "26px 30px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Lock size={44} color="#0D9488" strokeWidth={2.4} />
            <Say from={437} to={441} hi={[437]} size={44} align="left" />
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 28, lineHeight: 1.4, color: "#0F172A", wordBreak: "break-all", padding: 16, borderRadius: 14, background: "rgba(240,250,243,0.9)" }}>
            {HASH.slice(0, Math.floor(HASH.length * scramble)).replace(/./g, (c, i) => (scramble < 1 ? HASH[(i + Math.floor(frame / 2)) % HASH.length] : c))}
          </div>
          <Say from={444} to={455} hi={[445, 446]} size={34} align="left" style={{ fontWeight: 600 }} />
        </Glass>
      </Appear>
      <Appear at={t(456)} style={{ position: "absolute", left: 1290, top: 360 }}>
        <Glass style={{ width: 460, height: 460, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <Gauge size={90} color="#16A34A" strokeWidth={2} />
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 130, lineHeight: 1, backgroundImage: "linear-gradient(90deg, #16A34A, #0D9488)", WebkitBackgroundClip: "text", color: "transparent" }}>
            {"০১২৩৪৫৬৭৮৯"[Math.min(9, Math.round(3 + 5 * score))]}
            <span style={{ fontSize: 60 }}>/১০</span>
          </div>
          <Say from={459} to={461} size={44} hi={[461]} />
        </Glass>
      </Appear>
      <Say from={462} to={472} hi={[470]} size={46} style={{ position: "absolute", top: 880, left: 0, right: 0 }} />
    </>
  );
};

// ---------- 18. in Bangladesh, the phone number is the most valuable ----------

export const BdPhone: S = () => (
  <>
    <Pin x={960 - 260} y={220} at={t(474)}>
      <Glass style={{ padding: "22px 36px", borderRadius: 999, display: "flex", alignItems: "center", gap: 18 }}>
        <Banknote size={52} color="#16A34A" strokeWidth={2.3} />
        <Say from={473} to={477} hi={[474, 475, 476]} size={52} />
      </Glass>
    </Pin>
    <Pin x={960 - 110} y={380} at={t(478)}>
      <Float amp={8}>
        <IconTile icon={Smartphone} tint={T.green} size={220} />
      </Float>
    </Pin>
    <Say from={478} to={482} hi={[481]} size={80} style={{ position: "absolute", top: 700, left: 0, right: 0 }} />
  </>
);

// ---------- 19. the Pixel runs in the browser, and gets blocked ----------

export const Browser: S = () => {
  const blockers = [
    { at: t(490), a: 490, b: 491, y: 330 },
    { at: t(492), a: 492, b: 495, y: 470 },
    { at: t(497), a: 497, b: 500, y: 610 },
  ];
  return (
    <>
      <Say from={483} to={488} hi={[487]} size={60} style={{ position: "absolute", top: 100, left: 0, right: 0 }} />
      <Pin x={160} y={360} at={t(483)}>
        <Circle icon={Eye} tint={T.green} size={220} label={<Say from={487} to={487} size={40} />} />
      </Pin>
      <Pin x={1520} y={360} at={t(483)}>
        <Circle icon={Server} tint={T.teal} size={220} label={<Say from={82} to={83} size={40} />} />
      </Pin>
      <Packets x1={400} y1={470} x2={1500} y2={470} from={t(484)} blockAt={0.45} count={4} />
      {blockers.map((b, i) => (
        <Appear key={i} at={b.at} style={{ position: "absolute", left: 760, top: b.y }}>
          <Glass style={{ width: 420, padding: "14px 22px", display: "flex", alignItems: "center", gap: 16, background: "rgba(255,241,242,0.95)" }}>
            <ShieldOff size={44} color={ROSE} strokeWidth={2.4} />
            <Say from={b.a} to={b.b} size={36} align="left" />
          </Glass>
        </Appear>
      ))}
      <Say from={503} to={506} hi={[505]} size={48} style={{ position: "absolute", top: 760, left: 0, right: 0 }} />
      <Appear at={t(507)} style={{ position: "absolute", left: 0, right: 0, top: 860, display: "flex", justifyContent: "center" }}>
        <Glass style={{ padding: "18px 34px", borderRadius: 999, background: "rgba(255,251,235,0.95)" }}>
          <Say from={507} to={517} hi={[512, 517]} size={44} />
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 20. the fix: server-side tracking (Conversions API) ----------

export const Capi: S = () => (
  <>
    <Say from={518} to={521} hi={[520, 521]} size={68} style={{ position: "absolute", top: 90, left: 0, right: 0 }} />
    <Say from={522} to={528} hi={[525, 526, 528]} size={50} style={{ position: "absolute", top: 190, left: 0, right: 0 }} />
    <Pin x={160} y={330} at={t(529)}>
      <Circle icon={User} tint={T.sky} size={200} label={<Say from={534} to={534} size={38} />} />
    </Pin>
    <Pin x={160} y={640} at={t(537)}>
      <Circle icon={Server} tint={T.green} size={200} label={<Say from={538} to={540} size={38} />} />
    </Pin>
    <Pin x={1540} y={480} at={t(529)}>
      <Circle icon={Server} tint={T.teal} size={220} label={<Say from={82} to={83} size={40} />} />
    </Pin>
    <Packets x1={380} y1={430} x2={1520} y2={560} from={t(531)} blockAt={0.5} color="#94A3B8" />
    <Pin x={880} y={420} at={t(534)}>
      <Glass style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, background: "rgba(255,241,242,0.95)" }}>
        <ShieldOff size={40} color={ROSE} strokeWidth={2.4} />
        <Say from={543} to={544} size={34} />
      </Glass>
    </Pin>
    <Line x1={380} y1={740} x2={1520} y2={620} p={useProgress(t(537), t(541))} color="#86EFAC" />
    <Packets x1={380} y1={740} x2={1520} y2={620} from={t(540)} />
    <Appear at={t(542)} style={{ position: "absolute", left: 0, right: 0, top: 920, display: "flex", justifyContent: "center" }}>
      <Glass active={1} style={{ padding: "16px 32px", borderRadius: 999 }}>
        <Say from={542} to={548} hi={[546, 547, 548]} size={44} />
      </Glass>
    </Appear>
  </>
);

// ---------- 21. de-duplication with event_id ----------

export const Dedup: S = () => {
  const merge = useProgress(t(573), t(583) + 0.4);
  const doubled = useProgress(t(593), t(595) + 0.4);
  return (
    <>
      <Say from={549} to={561} hi={[558]} size={46} style={{ position: "absolute", top: 90, left: 120, right: 120 }} />
      <Pin x={200} y={300} at={t(550)}>
        <Circle icon={Eye} tint={T.green} size={170} label={<Say from={550} to={550} size={36} />} />
      </Pin>
      <Pin x={200} y={600} at={t(552)}>
        <Circle icon={Server} tint={T.teal} size={170} label={<Say from={552} to={552} size={36} />} />
      </Pin>
      {[0, 1].map((i) => {
        const y = 385 + i * 300;
        const x = 520 + 360 * merge;
        const yy = y + (535 - y) * merge;
        return (
          <Appear key={i} at={t(557)} style={{ position: "absolute", left: x, top: yy - 50, opacity: i === 1 ? 1 - 0.9 * interpolate(merge, [0.7, 1], [0, 1], clamp) : 1 }}>
            <Glass style={{ padding: "14px 22px", display: "flex", alignItems: "center", gap: 14 }}>
              <ShoppingBag size={40} color="#16A34A" strokeWidth={2.4} />
              <Appear at={t(568)}>
                <div style={{ padding: "4px 12px", borderRadius: 8, background: "#0F172A", fontFamily: "monospace", fontSize: 26, color: "#86EFAC" }}>event_id</div>
              </Appear>
            </Glass>
          </Appear>
        );
      })}
      <div style={{ position: "absolute", left: 1150, top: 300, width: 680, display: "flex", flexDirection: "column", gap: 22 }}>
        <Appear at={t(562)}>
          <Glass style={{ padding: "20px 28px" }}>
            <Say from={562} to={572} hi={[568]} size={40} align="left" />
          </Glass>
        </Appear>
        <Appear at={t(573)}>
          <Glass active={1} style={{ padding: "20px 28px" }}>
            <Say from={573} to={586} hi={[586]} size={40} align="left" />
          </Glass>
        </Appear>
        <Appear at={t(587)}>
          <Glass style={{ padding: "20px 28px", background: "rgba(255,241,242,0.95)", display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 80 }}>
              <div style={{ width: 34, height: 40, borderRadius: 8, background: "#86EFAC" }} />
              <div style={{ width: 34, height: 40 + 40 * doubled, borderRadius: 8, background: ROSE }} />
            </div>
            <Say from={587} to={595} hi={[594]} size={38} align="left" />
          </Glass>
        </Appear>
      </div>
    </>
  );
};

// ---------- 22. the Cash-on-Delivery trap ----------

export const Cod: S = () => {
  const steps = [
    { at: t(614), icon: ShoppingCart, a: 614, b: 620, tint: T.green },
    { at: t(621), icon: PhoneMissed, a: 621, b: 628, tint: T.rose },
    { at: t(629), icon: Package, a: 629, b: 631, tint: T.orange },
    { at: t(632), icon: TriangleAlert, a: 632, b: 640, tint: T.rose },
  ];
  return (
    <>
      <Say from={596} to={606} hi={[602, 603]} size={50} style={{ position: "absolute", top: 90, left: 120, right: 120 }} />
      <Appear at={t(607)} style={{ position: "absolute", left: 0, right: 0, top: 200, display: "flex", justifyContent: "center" }}>
        <Glass style={{ padding: "14px 30px", borderRadius: 999 }}>
          <Say from={607} to={613} hi={[611, 612, 613]} size={46} />
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 160, top: 340, display: "flex", flexDirection: "column", gap: 20 }}>
        {steps.map((s, i) => (
          <Appear key={i} at={s.at}>
            <Row width={1600} style={{ padding: "16px 28px", background: i >= 1 ? "rgba(255,247,237,0.95)" : undefined }}>
              <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 44, color: "#94A3B8", width: 50 }}>{BN[i]}</div>
              <IconTile icon={s.icon} tint={s.tint} size={74} />
              <Say from={s.a} to={s.b} hi={i === 0 ? [618] : i === 3 ? [639, 640] : []} size={44} align="left" />
            </Row>
          </Appear>
        ))}
      </div>
    </>
  );
};

// ---------- 23. ...so it finds more people like them; returns rise ----------

export const CodEffect: S = () => {
  const spread = useProgress(t(644), t(647) + 0.5);
  return (
    <>
      <Say from={641} to={647} hi={[644, 645]} size={56} style={{ position: "absolute", top: 100, left: 0, right: 0 }} />
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const on = interpolate(spread, [i / 14, (i + 1) / 14], [0, 1], clamp);
        return (
          <div key={i} style={{ position: "absolute", left: 960 + Math.cos(a) * 360 * on - 36, top: 470 + Math.sin(a) * 200 * on - 36, width: 72, height: 72, borderRadius: 99, background: "rgba(254,205,211,0.95)", border: "3px solid #FB7185", display: "flex", alignItems: "center", justifyContent: "center", opacity: on }}>
            <PhoneMissed size={34} color={ROSE} strokeWidth={2.4} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 960 - 70, top: 470 - 70 }}>
        <IconTile icon={Target} tint={T.rose} size={140} />
      </div>
      <Appear at={t(648)} style={{ position: "absolute", left: 0, right: 0, top: 820, display: "flex", justifyContent: "center" }}>
        <Glass style={{ padding: "22px 40px", background: "rgba(255,241,242,0.95)" }}>
          <Say from={648} to={658} hi={[649, 650, 657, 658]} size={50} />
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 24. a strategy: Purchase only after phone confirmation ----------

export const Strategy: S = () => (
  <>
    <div style={{ position: "absolute", top: 90, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
      <Pop at={t(659)}>
        <IconTile icon={Lightbulb} tint={AMBER} size={90} />
      </Pop>
      <Say from={659} to={661} hi={[660]} size={72} />
    </div>
    <div style={{ position: "absolute", left: 160, top: 250, display: "flex", flexDirection: "column", gap: 20 }}>
      <Appear at={t(662)}>
        <Row width={1600}>
          <IconTile icon={ShoppingCart} tint={T.sky} size={80} />
          <Say from={662} to={672} hi={[666, 667, 669, 670, 671]} size={42} align="left" />
        </Row>
      </Appear>
      <Appear at={t(673)}>
        <Row width={1600}>
          <IconTile icon={Phone} tint={T.green} size={80} />
          <Say from={673} to={684} hi={[675, 677]} size={42} align="left" />
          <Pop at={t(682)} style={{ marginLeft: "auto" }}>
            <CheckBadge size={60} />
          </Pop>
        </Row>
      </Appear>
      <Appear at={t(685)}>
        <Row width={1600}>
          <IconTile icon={Server} tint={T.teal} size={80} />
          <Say from={685} to={695} hi={[687, 688]} size={42} align="left" />
        </Row>
      </Appear>
      <Appear at={t(696)}>
        <Row width={1600}>
          <IconTile icon={BadgeCheck} tint={T.green} size={80} />
          <Say from={696} to={701} hi={[699, 700]} size={44} align="left" />
        </Row>
      </Appear>
      <Appear at={t(702)}>
        <Row width={1600} style={{ background: "rgba(255,251,235,0.95)" }}>
          <IconTile icon={TriangleAlert} tint={AMBER} size={80} />
          <div>
            <Say from={702} to={711} hi={[710]} size={40} align="left" />
            <Say from={712} to={719} hi={[716, 717]} size={40} align="left" />
          </div>
        </Row>
      </Appear>
    </div>
  </>
);

// ---------- 25. test it: Events Manager → Test Events ----------

export const Test: S = () => {
  const names: [number, number][] = [
    [99, 100],
    [104, 105],
    [110, 112],
    [116, 117],
    [123, 123],
  ];
  return (
    <>
      <Say from={720} to={728} hi={[726]} size={50} style={{ position: "absolute", top: 90, left: 120, right: 120 }} />
      <Say from={729} to={735} hi={[735]} size={56} style={{ position: "absolute", top: 180, left: 120, right: 120 }} />
      <Appear at={t(736)} style={{ position: "absolute", left: 160, top: 320 }}>
        <Glass style={{ width: 1600, padding: "26px 34px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <IconTile icon={FlaskConical} tint={T.teal} size={74} />
            <Say from={736} to={743} hi={[740, 741, 742]} size={44} align="left" />
          </div>
          <Say from={744} to={750} size={36} align="left" style={{ fontWeight: 600 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 180px", gap: 10, alignItems: "center", marginTop: 6 }}>
            <div />
            <Say from={756} to={756} size={34} />
            <Say from={758} to={758} size={34} />
            {names.map(([a, b], i) => (
              <React.Fragment key={i}>
                <Appear at={t(751) + i * 0.25}>
                  <div style={{ padding: "10px 20px", borderRadius: 14, background: "rgba(240,250,243,0.9)" }}>
                    <Say from={a} to={b} size={36} align="left" />
                  </div>
                </Appear>
                <Pop at={t(756) + i * 0.15} style={{ justifySelf: "center" }}>
                  <CheckBadge size={52} />
                </Pop>
                <Pop at={t(758) + i * 0.15} style={{ justifySelf: "center" }}>
                  <CheckBadge size={52} />
                </Pop>
              </React.Fragment>
            ))}
          </div>
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 26. our entrepreneurs' sites already have all of this ----------

export const Ours: S = () => (
  <>
    <Appear at={t(763)} rise={60} style={{ position: "absolute", left: 200, top: 300 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={300} />
        <Sweep from={t(763) + 0.2} to={t(763) + 1.2} />
      </div>
    </Appear>
    <Say from={763} to={768} hi={[767]} size={56} align="left" style={{ position: "absolute", left: 600, top: 150, width: 1200 }} />
    <div style={{ position: "absolute", left: 600, top: 330, display: "flex", flexDirection: "column", gap: 20 }}>
      {[
        { at: t(769), a: 769, b: 769, icon: Eye },
        { at: t(770), a: 770, b: 771, icon: Server },
        { at: t(773), a: 773, b: 777, icon: ShoppingBag },
      ].map((r, i) => (
        <Appear key={i} at={r.at}>
          <Row width={1100}>
            <IconTile icon={r.icon} tint={T.green} size={80} />
            <Say from={r.a} to={r.b} size={48} align="left" />
            <Pop at={r.at + 0.3} style={{ marginLeft: "auto" }}>
              <CheckBadge size={60} />
            </Pop>
          </Row>
        </Appear>
      ))}
      <Say from={778} to={780} hi={[778, 779]} size={48} align="left" />
    </div>
    <Appear at={t(781)} style={{ position: "absolute", left: 600, top: 840 }}>
      <Glass active={1} style={{ padding: "16px 32px", borderRadius: 999, display: "flex", alignItems: "center", gap: 18 }}>
        <Strike at={t(784)}>
          <Code size={44} color="#0D9488" strokeWidth={2.4} />
        </Strike>
        <Say from={781} to={784} hi={[784]} size={50} />
      </Glass>
    </Appear>
  </>
);

// ---------- 27. outro ----------

export const Outro: S = () => {
  const arrow = useTravel(t(787) - 0.4, t(787) + 0.3);
  return (
    <>
      <div style={{ position: "absolute", left: 300, top: 220 }}>
        <div style={{ position: "relative", width: 340, height: 340 }}>
          {[1, 0.7, 0.4].map((s, i) => (
            <div key={i} style={{ position: "absolute", left: 170 - 170 * s, top: 170 - 170 * s, width: 340 * s, height: 340 * s, borderRadius: 999, background: i % 2 ? "white" : "linear-gradient(160deg, #BBF7D0, #4ADE80)", boxShadow: i === 0 ? "0 24px 60px rgba(20,83,45,0.16)" : undefined }} />
          ))}
          <div style={{ position: "absolute", left: 170 + 500 * (1 - arrow) - 10, top: 170 - 200 * (1 - arrow) - 6, width: 140, height: 12, borderRadius: 6, background: "#10261A", transform: "rotate(-22deg)", transformOrigin: "0 50%", opacity: Math.min(1, arrow * 3) }} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 760, top: 230, width: 1060 }}>
        <Say from={785} to={788} hi={[786]} size={66} align="left" />
        <Say from={789} to={793} hi={[790, 793]} size={80} align="left" style={{ marginTop: 16 }} />
      </div>
      <Appear at={t(794)} style={{ position: "absolute", left: 160, top: 700, width: 1600 }}>
        <Glass style={{ padding: "26px 36px", display: "flex", alignItems: "center", gap: 30 }}>
          <LogoCard size={140} />
          <Say from={794} to={802} hi={[796, 797]} size={46} align="left" />
        </Glass>
      </Appear>
    </>
  );
};

