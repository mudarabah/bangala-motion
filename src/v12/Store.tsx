// Store ad (2026-11-16 voice): "does Purchase fire on the order button?" → the problem it causes
// → six things Mudarabah's store does differently → no hosting/coding → open a store today.
// Every line on screen is a range of spoken words (see ../v11/sayf.tsx).
import React from "react";
import { Audio } from "@remotion/media";
import {
  BarChart3,
  Code,
  Eye,
  Globe,
  Package,
  Percent,
  PhoneCall,
  PhoneMissed,
  Server,
  ShieldCheck,
  ShoppingCart,
  Store,
  TrendingUp,
  Truck,
  Upload,
  User,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, CheckBadge, Float, Glass, IconTile, LogoCard, LogoMark, PaletteProvider, Pill, Pop, Scene, useProgress, useTime } from "../components/kit";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import { design, fonts, greenPalette, motion } from "../theme";
import { En, Skel, Strike } from "../v2/ui";
import { Sweep } from "../v4/parts";
import { Row } from "../v5/parts";
import { makeSay } from "../v11/sayf";
import { C, NumBadge, ROSE, Wash } from "../v11/ui";
import { audioDuration, SCENE_START, tail, W, WORDS, type SceneKey } from "./timeline";

// The voice says "mudarabahtradelimited.com"; the store's address in the post is mudarabahtradeltd.com.
const { t, Say } = makeSay(W, WORDS, { 145: "" });
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
type S = React.FC;

// A phone with an order screen; `tap` animates the order button being pressed.
export const OrderPhone: React.FC<{ tapAt: number; width?: number }> = ({ tapAt, width = 340 }) => {
  const { frame, f } = useTime();
  const r = interpolate(frame, [f(tapAt), f(tapAt) + 16], [0, 1], clamp);
  const press = interpolate(frame, [f(tapAt), f(tapAt) + 4, f(tapAt) + 10], [1, 0.93, 1], clamp);
  return (
    <Glass style={{ width, height: width * 1.9, padding: 12, borderRadius: 50 }}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 38, overflow: "hidden", background: "white" }}>
        <img src={staticFile("products/site-mudarabah-card.jpg")} style={{ width: "100%", height: "70%", objectFit: "cover", objectPosition: "top" }} />
        <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
          <Skel w={180} strong />
          <Skel w={120} />
        </div>
        <div style={{ position: "absolute", left: 18, right: 18, bottom: 22, height: 70, borderRadius: 35, background: "linear-gradient(90deg, #7C3AED, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, transform: `scale(${press})`, boxShadow: "0 10px 24px rgba(79,70,229,0.35)" }}>
          <ShoppingCart size={34} color="white" strokeWidth={2.4} />
          <span style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 28, color: "white" }}>Order</span>
        </div>
        {r > 0 && r < 1 ? <div style={{ position: "absolute", left: width / 2 - 12 - 70 * r, bottom: 57 - 70 * r, width: 140 * r, height: 140 * r, borderRadius: 99, border: "6px solid rgba(124,58,237,0.6)", opacity: 1 - r }} /> : null}
      </div>
    </Glass>
  );
};

// ---------- 1. hook ----------

const Hook: S = () => (
  <>
    <Wash tone="blue" />
    <Appear at={t(1)} style={{ position: "absolute", left: 260, top: 230 }}>
      <Glass style={{ width: 600, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {["#F87171", "#FBBF24", "#34D399"].map((c) => (
            <div key={c} style={{ width: 16, height: 16, borderRadius: 99, background: c }} />
          ))}
        </div>
        <img src={staticFile("products/site-mudarabah.jpg")} style={{ width: "100%", height: 420, objectFit: "cover", objectPosition: "50% 10%", borderRadius: 18 }} />
      </Glass>
    </Appear>
    <Pop at={t(3)} style={{ position: "absolute", left: 790, top: 200 }}>
      <IconTile icon={TrendingUp} tint={C.blue} size={120} />
    </Pop>
    <div style={{ position: "absolute", left: 1000, top: 300, width: 800, display: "flex", flexDirection: "column", gap: 30 }}>
      <Say from={0} to={4} hi={[1, 3]} size={74} align="left" />
      <Appear at={t(5)}>
        <Glass style={{ padding: "22px 34px", borderRadius: 999, display: "inline-flex" }}>
          <Say from={5} to={7} hi={[6]} size={64} />
        </Glass>
      </Appear>
    </div>
  </>
);

// ---------- 2. does Purchase fire on the order button? ----------

const Question: S = () => {
  const fly = useProgress(t(16), t(18) + 0.5);
  return (
    <>
      <Wash tone="violet" />
      <Appear at={t(8)} style={{ position: "absolute", left: 240, top: 200 }}>
        <OrderPhone tapAt={t(11)} />
      </Appear>
      <div style={{ position: "absolute", left: 560 + 420 * fly, top: 560 - 160 * fly, opacity: fly > 0 && fly < 1 ? 1 : 0 }}>
        <div style={{ padding: "10px 22px", borderRadius: 14, background: "#0F172A", fontFamily: "monospace", fontSize: 30, color: "#C4B5FD" }}>Purchase</div>
      </div>
      <Pop at={t(15)} style={{ position: "absolute", left: 1060, top: 260 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <IconTile icon={Eye} tint={C.violet} size={150} />
          <Say from={15} to={15} size={40} />
        </div>
      </Pop>
      <div style={{ position: "absolute", left: 760, top: 620, width: 1040 }}>
        <Say from={8} to={18} hi={[16]} size={60} align="left" />
      </div>
    </>
  );
};

// ---------- 3. fake / cancelled / no-answer orders are learned as "buyers" ----------

const Problem: S = () => {
  const learn = useProgress(t(29), t(34) + 0.4);
  const bad = [
    { a: 20, b: 21, icon: X },
    { a: 22, b: 24, icon: ShoppingCart },
    { a: 25, b: 28, icon: PhoneMissed },
  ];
  return (
    <>
      <Wash tone="rose" />
      <Say from={19} to={19} size={60} align="left" style={{ position: "absolute", left: 160, top: 110 }} />
      <div style={{ position: "absolute", left: 160, top: 230, display: "flex", flexDirection: "column", gap: 22 }}>
        {bad.map((r, i) => (
          <Appear key={i} at={t(r.a)}>
            <Row width={760} style={{ background: "rgba(255,241,242,0.95)" }}>
              <IconTile icon={r.icon} tint={C.rose} size={80} />
              <Say from={r.a} to={r.b} size={50} align="left" />
            </Row>
          </Appear>
        ))}
      </div>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <path d="M940 480 C 1040 480, 1100 480, 1200 480" stroke="#FB7185" strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - learn} fill="none" />
      </svg>
      <Appear at={t(29)} style={{ position: "absolute", left: 1220, top: 300 }}>
        <Glass style={{ width: 520, padding: "30px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <IconTile icon={Users} tint={C.blue} size={120} />
          <Say from={29} to={34} hi={[31]} size={48} />
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 4. then Meta finds more of the same; ad cost and returns rise ----------

const Effect: S = () => {
  const spread = useProgress(t(41), t(43) + 0.5);
  const up = useProgress(t(44), t(49) + 0.5);
  return (
    <>
      <Wash tone="rose" />
      <Say from={35} to={43} hi={[40, 41]} size={58} style={{ position: "absolute", top: 100, left: 120, right: 120 }} />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const on = interpolate(spread, [i / 16, (i + 1) / 16], [0, 1], clamp);
        return (
          <div key={i} style={{ position: "absolute", left: 560 + Math.cos(a) * 280 * on - 34, top: 560 + Math.sin(a) * 200 * on - 34, width: 68, height: 68, borderRadius: 99, background: "rgba(254,205,211,0.95)", border: "3px solid #FB7185", display: "flex", alignItems: "center", justifyContent: "center", opacity: on }}>
            <PhoneMissed size={32} color={ROSE} strokeWidth={2.4} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 560 - 60, top: 560 - 60 }}>
        <IconTile icon={User} tint={C.rose} size={120} />
      </div>
      <Appear at={t(44)} style={{ position: "absolute", left: 1060, top: 330 }}>
        <Glass style={{ width: 700, height: 460, padding: 34, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 50, justifyContent: "center" }}>
            {[C.amber, C.rose].map((tint, i) => (
              <div key={i} style={{ width: 150, height: `${30 + 60 * up}%`, borderRadius: 18, background: `linear-gradient(180deg, ${tint[0]}, ${tint[1]})` }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Say from={44} to={46} hi={[46]} size={40} />
            <Say from={48} to={49} hi={[49]} size={40} />
          </div>
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 5. Mudarabah's store is different ----------

const Brand: S = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(50)} rise={70} scaleFrom={0.9} style={{ position: "absolute", left: 960 - 160, top: 160 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={320} />
        <Sweep from={t(50) + 0.2} to={t(50) + 1.2} />
      </div>
    </Appear>
    <Say from={50} to={55} hi={[55]} size={70} style={{ position: "absolute", top: 560, left: 0, right: 0 }} />
    <div style={{ position: "absolute", top: 760, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 20 }}>
      {[C.green, C.teal, C.blue, C.orange, C.pink, C.violet].map((tint, i) => (
        <NumBadge key={i} at={t(54) + i * 0.08} n={["১", "২", "৩", "৪", "৫", "৬"][i]} tint={tint} size={86} />
      ))}
    </div>
  </>
);

// ---------- 6–11. the six features ----------

const Feature: React.FC<{ n: string; tint: [string, string]; tone: "green" | "teal" | "blue" | "amber" | "pink" | "violet"; at: number; title: [number, number, number[]]; titleSize?: number; sub?: [number, number, number[]]; children?: React.ReactNode }> = ({
  n,
  tint,
  tone,
  at,
  title,
  titleSize = 68,
  sub,
  children,
}) => (
  <>
    <Wash tone={tone} />
    <div style={{ position: "absolute", left: 140, top: 120, display: "flex", alignItems: "center", gap: 30, width: 1640 }}>
      <NumBadge at={at} n={n} tint={tint} size={120} />
      <Say from={title[0]} to={title[1]} hi={title[2]} size={titleSize} align="left" />
    </div>
    {children}
    {sub ? (
      <Appear at={t(sub[0])} style={{ position: "absolute", left: 140, right: 140, top: 850, display: "flex", justifyContent: "center" }}>
        <Glass style={{ padding: "18px 40px", borderRadius: 999 }}>
          <Say from={sub[0]} to={sub[1]} hi={sub[2]} size={46} />
        </Glass>
      </Appear>
    ) : null}
  </>
);

const F1: S = () => {
  const ok = useProgress(t(59), t(61) + 0.3);
  return (
    <Feature n="১" tint={C.green} tone="green" at={t(56)} title={[57, 63, [59, 62]]}>
      <div style={{ position: "absolute", left: 220, top: 330, display: "flex", alignItems: "center", gap: 50 }}>
        <Appear at={t(57)}>
          <Glass style={{ width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconTile icon={ShoppingCart} tint={C.violet} size={140} />
          </Glass>
        </Appear>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 100, color: "#94A3B8" }}>→</div>
        <Appear at={t(58)}>
          <Glass active={ok} style={{ width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <Float amp={6}>
              <IconTile icon={PhoneCall} tint={C.green} size={140} />
            </Float>
            <Pop at={t(59)} style={{ position: "absolute", right: -20, top: -20 }}>
              <CheckBadge size={80} />
            </Pop>
          </Glass>
        </Appear>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 100, color: "#94A3B8" }}>→</div>
        <Appear at={t(62)}>
          <Glass style={{ width: 340, height: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
            <IconTile icon={Eye} tint={C.blue} size={110} />
            <div style={{ padding: "8px 20px", borderRadius: 12, background: "#0F172A", fontFamily: "monospace", fontSize: 32, color: "#86EFAC" }}>Purchase</div>
          </Glass>
        </Appear>
      </div>
    </Feature>
  );
};

const F2: S = () => {
  const { frame, f } = useTime();
  const s = frame - f(t(69));
  return (
    <Feature n="২" tint={C.teal} tone="teal" at={t(64)} title={[65, 70, [69, 70]]} sub={[71, 79, [76, 77, 78, 79]]}>
      <Appear at={t(65)} style={{ position: "absolute", left: 220, top: 360 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <IconTile icon={Server} tint={C.teal} size={150} />
          <Say from={65} to={66} size={38} />
        </div>
      </Appear>
      <Appear at={t(65)} style={{ position: "absolute", left: 1460, top: 360 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <IconTile icon={Eye} tint={C.blue} size={150} />
          <span style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 34 }}>Meta</span>
        </div>
      </Appear>
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1920} height={1080}>
        <line x1={420} y1={435} x2={1440} y2={435} stroke="#99F6E4" strokeWidth={10} strokeLinecap="round" />
      </svg>
      {s > 0
        ? [0, 1, 2, 3].map((k) => {
            const u = ((s / 40 + k / 4) % 1 + 1) % 1;
            return <div key={k} style={{ position: "absolute", left: 420 + 1020 * u - 18, top: 435 - 18, width: 36, height: 36, borderRadius: 99, background: "#14B8A6", boxShadow: "0 0 18px #14B8A6", opacity: Math.min(1, u * 8, (1 - u) * 8) }} />;
          })
        : null}
    </Feature>
  );
};

const F3: S = () => (
  <Feature n="৩" tint={C.blue} tone="blue" at={t(80)} title={[81, 85, [81, 82, 83]]} sub={[86, 93, [87, 90]]}>
    <div style={{ position: "absolute", left: 200, top: 330, display: "flex", alignItems: "center", gap: 40 }}>
      <Appear at={t(81)}>
        <Glass style={{ width: 600, padding: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ height: 130, borderRadius: 14, overflow: "hidden", background: "rgba(239,246,255,0.95)" }}>
              {i === 0 ? <img src={staticFile("products/earrings-green.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : null}
            </div>
          ))}
        </Glass>
      </Appear>
      <Pop at={t(87)}>
        <IconTile icon={Upload} tint={C.violet} size={110} />
      </Pop>
      <Appear at={t(90)}>
        <Glass active={1} style={{ width: 400, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 99, background: "linear-gradient(160deg, #93C5FD, #2563EB)" }} />
            <Skel w={140} strong />
          </div>
          <img src={staticFile("products/earrings-green.jpg")} style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 14 }} />
        </Glass>
      </Appear>
    </div>
  </Feature>
);

const F4: S = () => (
  <Feature n="৪" tint={C.orange} tone="amber" at={t(94)} title={[95, 101, [95, 100]]} titleSize={60} sub={[102, 107, [106, 107]]}>
    <Appear at={t(100)} style={{ position: "absolute", left: 220, top: 320 }}>
      <Glass style={{ width: 900, padding: 26, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <IconTile icon={BarChart3} tint={C.orange} size={70} />
          <Skel w={220} strong />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 18px", borderRadius: 16, background: "rgba(255,247,237,0.95)" }}>
            <Package size={36} color="#EA580C" strokeWidth={2.3} />
            <Skel w={200 - i * 20} strong />
            <Pop at={t(97) + i * 0.2} style={{ marginLeft: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 999, background: "linear-gradient(90deg, #22C55E, #16A34A)" }}>
                <Truck size={28} color="white" strokeWidth={2.4} />
                <CheckBadge size={30} />
              </div>
            </Pop>
          </div>
        ))}
      </Glass>
    </Appear>
    <Pop at={t(95)} style={{ position: "absolute", left: 1260, top: 380 }}>
      <IconTile icon={Truck} tint={C.green} size={220} />
    </Pop>
  </Feature>
);

const F5: S = () => (
  <Feature n="৫" tint={C.pink} tone="pink" at={t(108)} title={[109, 112, [110, 111]]}>
    <Appear at={t(109)} style={{ position: "absolute", left: 260, top: 330 }}>
      <Glass style={{ width: 520, height: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <IconTile icon={Upload} tint={C.pink} size={150} />
        <img src={staticFile("products/earrings-green.jpg")} style={{ width: 200, height: 140, objectFit: "cover", borderRadius: 16 }} />
      </Glass>
    </Appear>
    <Appear at={t(113)} style={{ position: "absolute", left: 960, top: 380 }}>
      <Glass active={1} style={{ width: 760, padding: "40px 44px", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <Strike at={t(116)}>
          <IconTile icon={Percent} tint={C.pink} size={150} />
        </Strike>
        <Say from={113} to={116} hi={[115, 116]} size={56} />
      </Glass>
    </Appear>
  </Feature>
);

const F6: S = () => {
  const grow = useProgress(t(118), t(123) + 0.6);
  return (
    <Feature n="৬" tint={C.violet} tone="violet" at={t(117)} title={[118, 123, [119, 121]]}>
      <Appear at={t(118)} style={{ position: "absolute", left: 300, top: 320 }}>
        <Glass style={{ width: 1320, height: 480, padding: 40, display: "flex", gap: 40 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 24 }}>
            {[0.4, 0.55, 0.5, 0.75, 0.9].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h * 100 * interpolate(grow, [i * 0.1, i * 0.1 + 0.5], [0, 1], clamp)}%`, borderRadius: 14, background: "linear-gradient(180deg, #C4B5FD, #7C3AED)" }} />
            ))}
          </div>
          <div style={{ width: 420, display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
            {[C.green, C.amber, C.blue].map((tint, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 16, background: "rgba(245,243,255,0.95)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(160deg, ${tint[0]}, ${tint[1]})` }} />
                <Skel w={200 - i * 30} strong />
              </div>
            ))}
          </div>
        </Glass>
      </Appear>
    </Feature>
  );
};

// ---------- 12. no hosting, coding or developer; the business is yours ----------

const NoCode: S = () => (
  <>
    <Wash tone="green" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 160, display: "flex", justifyContent: "center", gap: 30 }}>
      {[
        { a: 124, b: 126, icon: Globe, tint: C.sky },
        { a: 127, b: 129, icon: Code, tint: C.violet },
        { a: 130, b: 132, icon: Wrench, tint: C.orange },
      ].map((r, i) => (
        <Appear key={i} at={t(r.a)}>
          <Glass style={{ width: 460, height: 340, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <Strike at={t(r.b)}>
              <IconTile icon={r.icon} tint={r.tint} size={120} />
            </Strike>
            <Say from={r.a} to={r.b} hi={[r.b]} size={46} />
          </Glass>
        </Appear>
      ))}
    </div>
    <Appear at={t(133)} style={{ position: "absolute", left: 0, right: 0, top: 580, display: "flex", justifyContent: "center", alignItems: "center", gap: 26 }}>
      <IconTile icon={Store} tint={C.green} size={110} />
      <Say from={133} to={135} hi={[134, 135]} size={84} />
    </Appear>
    <Appear at={t(136)} style={{ position: "absolute", left: 0, right: 0, top: 800, display: "flex", justifyContent: "center" }}>
      <Glass style={{ padding: "20px 44px", borderRadius: 999 }}>
        <Say from={136} to={140} hi={[138, 139]} size={54} />
      </Glass>
    </Appear>
  </>
);

// ---------- 13. open a store today ----------

const Cta: S = () => (
  <>
    <Wash tone="violet" />
    <Appear at={t(141)} rise={60} style={{ position: "absolute", left: 960 - 140, top: 100 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={280} />
        <Sweep from={t(141) + 0.2} to={t(141) + 1.2} />
      </div>
    </Appear>
    <Appear at={t(141)} style={{ position: "absolute", left: 0, right: 0, top: 450, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", padding: "26px 60px", borderRadius: 999, background: "linear-gradient(90deg, #16A34A, #0D9488)", boxShadow: "0 18px 40px rgba(22,163,74,0.35)", overflow: "hidden" }}>
        <Say from={141} to={143} size={80} style={{ filter: "brightness(0) invert(1)" }} />
        <Sweep from={t(143)} to={t(143) + 1} />
      </div>
    </Appear>
    <Appear at={t(144)} style={{ position: "absolute", left: 0, right: 0, top: 690, display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
      <Say from={144} to={144} size={50} />
      <Pill icon={Globe} size={52}>
        <En weight={700}>www.mudarabahtradeltd.com</En>
      </Pill>
    </Appear>
  </>
);

// ---------- assembly ----------

const SCENES: Record<SceneKey, React.FC> = { hook: Hook, question: Question, problem: Problem, effect: Effect, brand: Brand, f1: F1, f2: F2, f3: F3, f4: F4, f5: F5, f6: F6, nocode: NoCode, cta: Cta };
const ORDER = Object.keys(SCENE_START) as SceneKey[];
const PRE = 0.4;
export const TOTAL_SECONDS_12 = audioDuration + tail;
const CORNER = new Set<SceneKey>(["hook", "question", "problem", "effect", "f1", "f2", "f3", "f4", "f5", "f6"]);

const cues: Cue[] = [
  ...Object.values(SCENE_START).slice(1).map((i): Cue => [W[i] - 0.45, "whoosh"]),
  ...[6, 11, 16, 21, 24, 28, 31, 59, 62, 70, 83, 87, 90, 97, 100, 111, 115, 121, 126, 129, 132].map((i): Cue => [W[i], "pop"]),
  ...[18, 55, 63, 79, 135, 143].map((i): Cue => [W[i], "ding"]),
  [W[46], "stamp"],
  [W[49], "stamp"],
];

export const Video12: React.FC = () => {
  const { fps } = useVideoConfig();
  const overlap = motion.transitionFrames / fps;
  return (
    <PaletteProvider value={greenPalette}>
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 0, top: 0, width: design.width, height: design.height, zoom: design.zoom }}>
          <Background />
          {ORDER.map((key, i) => {
            const Comp = SCENES[key];
            const start = W[SCENE_START[key]];
            const to = i === ORDER.length - 1 ? TOTAL_SECONDS_12 + 1 : W[SCENE_START[ORDER[i + 1]]] - PRE + overlap;
            return (
              <Scene key={key} from={Math.max(0, start - PRE)} to={to}>
                <Comp />
                {CORNER.has(key) ? (
                  <Appear at={start - 0.3} rise={0} style={{ position: "absolute", right: 60, top: 36 }}>
                    <Glass style={{ padding: "8px 14px", borderRadius: 22, background: "rgba(255,255,255,0.94)" }}>
                      <LogoMark width={140} />
                    </Glass>
                  </Appear>
                ) : null}
              </Scene>
            );
          })}
        </div>
        <Audio src={staticFile("voiceover-2026-11-16.mp3")} />
        <SfxTrack cues={cues} />
      </AbsoluteFill>
    </PaletteProvider>
  );
};

