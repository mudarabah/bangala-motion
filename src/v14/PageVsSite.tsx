// Store ad, third voice (2026-11-16): a Facebook page starts well, then the inbox, the notebook and the
// courier site eat the day → keep the page for customers, take orders on your own website.
// Every line on screen is a range of spoken words (see ../v11/sayf.tsx).
import React from "react";
import { Audio } from "@remotion/media";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BookOpen,
  CalendarDays,
  Eye,
  Globe,
  Image as ImageIcon,
  Link2,
  MapPin,
  Megaphone,
  MessageCircle,
  Package,
  Percent,
  Phone,
  ShoppingCart,
  Truck,
  User,
  Users,
} from "lucide-react";
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, CheckBadge, Float, Glass, IconTile, LogoCard, LogoMark, PaletteProvider, Pop, Scene, useProgress, useTime } from "../components/kit";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import { design, fonts, greenPalette, motion } from "../theme";
import { Skel, Strike } from "../v2/ui";
import { Sweep } from "../v4/parts";
import { makeSay } from "../v11/sayf";
import { C, Wash } from "../v11/ui";
import { OrderPhone } from "../v12/Store";
import { audioDuration, SCENE_START, tail, W, WORDS, type SceneKey } from "./timeline";

const { t, Say } = makeSay(W, WORDS, {});
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ARROW: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 800, fontSize: 90, color: "#94A3B8" };
const TOP: React.CSSProperties = { position: "absolute", left: 120, right: 120, top: 110 };

const Card: React.FC<{ w?: number; h?: number; active?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w = 320, h = 300, active, children, style }) => (
  <Glass active={active} style={{ width: w, height: h, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, position: "relative", ...style }}>
    {children}
  </Glass>
);

const Pill: React.FC<{ from: number; to: number; hi?: number[]; top?: number; size?: number }> = ({ from, to, hi, top = 850, size = 48 }) => (
  <Appear at={t(from)} style={{ position: "absolute", left: 120, right: 120, top, display: "flex", justifyContent: "center" }}>
    <Glass style={{ padding: "18px 42px", borderRadius: 999 }}>
      <Say from={from} to={to} hi={hi} size={size} />
    </Glass>
  </Appear>
);

// Chat bubble holding spoken words; `me` puts it on the right in green.
const Bubble: React.FC<{ from: number; to: number; me?: boolean; size?: number }> = ({ from, to, me, size = 44 }) => (
  <Appear at={t(from)} style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start" }}>
    <div style={{ padding: "16px 28px", borderRadius: 28, borderBottomLeftRadius: me ? 28 : 8, borderBottomRightRadius: me ? 8 : 28, background: me ? "rgba(220,252,231,0.98)" : "rgba(255,255,255,0.96)", boxShadow: "0 8px 22px rgba(15,23,42,0.08)" }}>
      <Say from={from} to={to} size={size} align="left" />
    </div>
  </Appear>
);

// ---------- 1. new page, posts, a few orders — a great start ----------

const Hook: React.FC = () => (
  <>
    <Wash tone="blue" />
    <Appear at={t(0)} style={{ position: "absolute", left: 200, top: 190 }}>
      <Glass style={{ width: 640, padding: 16 }}>
        <img src={staticFile("products/farha-fb.jpg")} style={{ width: "100%", height: 600, objectFit: "cover", objectPosition: "top", borderRadius: 20 }} />
      </Glass>
    </Appear>
    <div style={{ position: "absolute", left: 960, top: 230, display: "flex", flexDirection: "column", gap: 24 }}>
      {[
        { a: 0, b: 2, icon: Users, tint: C.blue },
        { a: 3, b: 4, icon: ImageIcon, tint: C.violet },
        { a: 5, b: 7, icon: ShoppingCart, tint: C.green },
      ].map((r, i) => (
        <Appear key={i} at={t(r.a)}>
          <Glass style={{ width: 760, padding: "18px 24px", display: "flex", alignItems: "center", gap: 22 }}>
            <IconTile icon={r.icon} tint={r.tint} size={80} />
            <Say from={r.a} to={r.b} size={50} align="left" />
          </Glass>
        </Appear>
      ))}
      <Appear at={t(8)} style={{ marginTop: 20 }}>
        <Say from={8} to={9} hi={[9]} size={84} align="left" />
      </Appear>
    </div>
  </>
);

// ---------- 2. but in a few days you'll notice something ----------

const But: React.FC = () => (
  <>
    <Wash tone="amber" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 220, display: "flex", justifyContent: "center", gap: 40 }}>
      {[0, 1, 2].map((i) => (
        <Pop key={i} at={t(11) + i * 0.18}>
          <IconTile icon={CalendarDays} tint={C.amber} size={150} />
        </Pop>
      ))}
      <Pop at={t(15)}>
        <IconTile icon={AlertTriangle} tint={C.rose} size={150} />
      </Pop>
    </div>
    <Say from={10} to={16} hi={[14, 15]} size={86} style={{ position: "absolute", left: 120, right: 120, top: 520 }} />
  </>
);

// ---------- 3. typing the same answers to every customer ----------

const Inbox: React.FC = () => {
  const { frame, f } = useTime();
  const pile = interpolate(frame, [f(t(24)), f(t(31)) + 20], [0, 1], clamp);
  return (
    <>
      <Wash tone="blue" />
      <Say from={17} to={23} hi={[19, 20, 21]} size={60} style={TOP} />
      <Appear at={t(19)} style={{ position: "absolute", left: 300, top: 270 }}>
        <Glass style={{ width: 760, height: 620, padding: 30, display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <IconTile icon={MessageCircle} tint={C.blue} size={64} />
            <Skel w={200} strong />
          </div>
          <Bubble from={24} to={25} />
          <Bubble from={26} to={28} />
          <Bubble from={29} to={31} />
        </Glass>
      </Appear>
      {Array.from({ length: 9 }).map((_, i) => {
        const on = interpolate(pile, [i / 9, (i + 1) / 9], [0, 1], clamp);
        return (
          <div key={i} style={{ position: "absolute", left: 1180 + (i % 3) * 150, top: 320 + Math.floor(i / 3) * 170, opacity: on, transform: `scale(${0.6 + 0.4 * on})` }}>
            <IconTile icon={MessageCircle} tint={i % 2 ? C.sky : C.blue} size={110} />
          </div>
        );
      })}
    </>
  );
};

// ---------- 4. into the notebook, then onto the courier site ----------

const Khata: React.FC = () => {
  const write = useProgress(t(37), t(38) + 0.8);
  return (
    <>
      <Wash tone="amber" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 200, display: "flex", justifyContent: "center", alignItems: "center", gap: 60 }}>
        <Appear at={t(32)}>
          <Card w={620} h={520} style={{ justifyContent: "flex-start", padding: 34 }}>
            <IconTile icon={BookOpen} tint={C.orange} size={110} />
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 18, marginTop: 10 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ height: 14, borderRadius: 9, width: `${(90 - i * 12) * interpolate(write, [i / 4, (i + 1) / 4], [0, 1], clamp)}%`, background: "linear-gradient(90deg, #FDBA74, #F97316)" }} />
              ))}
            </div>
          </Card>
        </Appear>
        <Appear at={t(39)}>
          <div style={ARROW}>→</div>
        </Appear>
        <Appear at={t(40)}>
          <Card w={520} h={520}>
            <Float amp={6}>
              <IconTile icon={Truck} tint={C.green} size={160} />
            </Float>
            <Say from={39} to={42} hi={[40]} size={50} />
          </Card>
        </Appear>
      </div>
      <Say from={32} to={38} hi={[37]} size={56} style={{ position: "absolute", left: 120, right: 120, top: 80 }} />
    </>
  );
};

// ---------- 5. as orders grow, this eats your whole day ----------

const Day: React.FC = () => {
  const { frame, f } = useTime();
  const spin = Math.max(0, frame - f(t(43))) * 9;
  const grow = useProgress(t(43), t(46) + 0.4);
  return (
    <>
      <Wash tone="rose" />
      <Appear at={t(43)} style={{ position: "absolute", left: 300, top: 240 }}>
        <div style={{ position: "relative", width: 420, height: 420, borderRadius: 999, background: "rgba(255,255,255,0.92)", boxShadow: "0 20px 50px rgba(225,29,72,0.15)", border: "10px solid #FECDD3" }}>
          <div style={{ position: "absolute", left: 200 - 5, top: 60, width: 10, height: 150, borderRadius: 9, background: "#E11D48", transformOrigin: "50% 100%", transform: `rotate(${spin}deg)` }} />
          <div style={{ position: "absolute", left: 200 - 6, top: 110, width: 12, height: 100, borderRadius: 9, background: "#0F172A", transformOrigin: "50% 100%", transform: `rotate(${spin / 12}deg)` }} />
          <div style={{ position: "absolute", left: 186, top: 186, width: 28, height: 28, borderRadius: 99, background: "#0F172A" }} />
        </div>
      </Appear>
      <div style={{ position: "absolute", left: 900, top: 230, display: "grid", gridTemplateColumns: "repeat(4, 150px)", gap: 24 }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const on = interpolate(grow, [i / 12, (i + 1) / 12], [0, 1], clamp);
          return (
            <div key={i} style={{ opacity: on, transform: `translateY(${(1 - on) * 30}px)` }}>
              <IconTile icon={Package} tint={i % 3 === 0 ? C.rose : C.orange} size={120} />
            </div>
          );
        })}
      </div>
      <Say from={43} to={51} hi={[48, 49]} size={64} style={{ position: "absolute", left: 120, right: 120, top: 800 }} />
    </>
  );
};

// ---------- 6. page brings customers; your website takes the orders ----------

const Split: React.FC = () => (
  <>
    <Wash tone="teal" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 230, display: "flex", justifyContent: "center", alignItems: "center", gap: 50 }}>
      <Appear at={t(52)}>
        <Card w={680} h={560}>
          <img src={staticFile("products/jk-fb.jpg")} style={{ width: 560, height: 240, objectFit: "cover", objectPosition: "top", borderRadius: 18 }} />
          <IconTile icon={Users} tint={C.blue} size={90} />
          <Say from={52} to={56} hi={[54]} size={50} />
        </Card>
      </Appear>
      <Appear at={t(57)}>
        <div style={ARROW}>→</div>
      </Appear>
      <Appear at={t(57)}>
        <Card w={680} h={560} active={1}>
          <img src={staticFile("products/rk-home.jpg")} style={{ width: 560, height: 240, objectFit: "cover", objectPosition: "top", borderRadius: 18 }} />
          <IconTile icon={Globe} tint={C.green} size={90} />
          <Say from={57} to={61} hi={[60, 61]} size={50} />
        </Card>
      </Appear>
    </div>
  </>
);

// ---------- 7. your own website at Mudarabah ----------

const Brand: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(62)} rise={70} scaleFrom={0.9} style={{ position: "absolute", left: 960 - 160, top: 170 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={320} />
        <Sweep from={t(62) + 0.2} to={t(62) + 1.2} />
      </div>
    </Appear>
    <Say from={62} to={66} hi={[65, 66]} size={74} style={{ position: "absolute", top: 580, left: 0, right: 0 }} />
  </>
);

// ---------- 8. photo, price and description on one page ----------

const ProductPage: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Say from={67} to={74} hi={[69, 70, 72]} size={58} style={TOP} />
    <Appear at={t(67)} style={{ position: "absolute", left: 260, top: 250 }}>
      <Glass style={{ width: 900, height: 620, padding: 26, display: "flex", gap: 30 }}>
        <img src={staticFile("products/prod-floral.jpg")} style={{ width: 420, height: "100%", objectFit: "cover", borderRadius: 20 }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24, paddingTop: 20 }}>
          <Skel w={300} strong />
          <Pop at={t(70)}>
            <div style={{ width: 160, height: 46, borderRadius: 12, background: "linear-gradient(90deg, #F9A8D4, #DB2777)" }} />
          </Pop>
          {[0, 1, 2, 3].map((i) => (
            <Appear key={i} at={t(72) + i * 0.08}>
              <Skel w={340 - i * 40} />
            </Appear>
          ))}
          <div style={{ marginTop: "auto", height: 64, borderRadius: 32, background: "linear-gradient(90deg, #7C3AED, #4F46E5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShoppingCart size={34} color="white" strokeWidth={2.4} />
          </div>
        </div>
      </Glass>
    </Appear>
    <div style={{ position: "absolute", left: 1260, top: 300, display: "flex", flexDirection: "column", gap: 34 }}>
      {[
        { i: 69, icon: ImageIcon, tint: C.violet },
        { i: 70, icon: BarChart3, tint: C.pink },
        { i: 72, icon: BookOpen, tint: C.blue },
      ].map((r) => (
        <Appear key={r.i} at={t(r.i)}>
          <Glass style={{ padding: "16px 26px", display: "flex", alignItems: "center", gap: 18 }}>
            <IconTile icon={r.icon} tint={r.tint} size={70} />
            <Say from={r.i} to={r.i} size={46} />
          </Glass>
        </Appear>
      ))}
    </div>
  </>
);

// ---------- 9. the customer orders on their own ----------

const Order: React.FC = () => (
  <>
    <Wash tone="violet" />
    <Appear at={t(75)} style={{ position: "absolute", left: 360, top: 140 }}>
      <OrderPhone tapAt={t(77)} width={420} />
    </Appear>
    <Pop at={t(75)} style={{ position: "absolute", left: 1000, top: 300 }}>
      <IconTile icon={User} tint={C.blue} size={170} />
    </Pop>
    <Say from={75} to={78} hi={[76, 77]} size={76} align="left" style={{ position: "absolute", left: 1000, top: 540, width: 800 }} />
  </>
);

// ---------- 10. name, phone and address land in your list ----------

const List: React.FC = () => (
  <>
    <Wash tone="green" />
    <Say from={79} to={87} hi={[86, 87]} size={58} style={TOP} />
    <Appear at={t(83)} style={{ position: "absolute", left: 260, top: 280 }}>
      <Glass style={{ width: 1400, padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
        {[0, 1, 2].map((i) => (
          <Appear key={i} at={i === 0 ? t(85) : t(83)} rise={i === 0 ? 40 : 0}>
            <div style={{ display: "flex", alignItems: "center", gap: 40, padding: "20px 28px", borderRadius: 20, background: i === 0 ? "rgba(220,252,231,0.95)" : "rgba(248,250,252,0.9)", border: i === 0 ? "3px solid #86EFAC" : "3px solid transparent" }}>
              {[
                { icon: User, w: 200 },
                { icon: Phone, w: 180 },
                { icon: MapPin, w: 300 },
              ].map((c, k) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <c.icon size={36} color={i === 0 ? "#16A34A" : "#94A3B8"} strokeWidth={2.3} />
                  <Skel w={c.w - i * 20} strong={i === 0} />
                </div>
              ))}
              {i === 0 ? (
                <Pop at={t(87)} style={{ marginLeft: "auto" }}>
                  <CheckBadge size={56} />
                </Pop>
              ) : null}
            </div>
          </Appear>
        ))}
      </Glass>
    </Appear>
    <div style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", justifyContent: "center", gap: 30 }}>
      {[
        { i: 79, icon: User, tint: C.blue },
        { i: 80, icon: Phone, tint: C.green },
        { i: 82, icon: MapPin, tint: C.rose },
      ].map((r) => (
        <Pop key={r.i} at={t(r.i)}>
          <IconTile icon={r.icon} tint={r.tint} size={100} />
        </Pop>
      ))}
    </div>
  </>
);

// ---------- 11. Steadfast courier booking from the website ----------

const Courier: React.FC = () => {
  const drive = useProgress(t(90), t(92) + 0.8);
  return (
    <>
      <Wash tone="amber" />
      <Say from={88} to={92} hi={[88, 91]} size={70} style={TOP} />
      <Appear at={t(88)} style={{ position: "absolute", left: 220, top: 340 }}>
        <Card w={420} h={360}>
          <IconTile icon={Globe} tint={C.green} size={140} />
          <Say from={91} to={91} size={46} />
        </Card>
      </Appear>
      <div style={{ position: "absolute", left: 700, top: 660, width: 1000, height: 14, borderRadius: 9, background: "repeating-linear-gradient(90deg, #FDBA74 0 40px, transparent 40px 70px)" }} />
      <Appear at={t(89)} rise={0} style={{ position: "absolute", left: 700 + 780 * drive, top: 470 }}>
        <IconTile icon={Truck} tint={C.orange} size={180} />
      </Appear>
    </>
  );
};

// ---------- 12. orders, sales, all accounts in one place ----------

const Books: React.FC = () => {
  const up = useProgress(t(95), t(100) + 0.6);
  return (
    <>
      <Wash tone="violet" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 170, display: "flex", justifyContent: "center", gap: 60 }}>
        {[
          { a: 93, b: 94, icon: ShoppingCart, tint: C.blue, bar: "#2563EB" },
          { a: 95, b: 96, icon: BarChart3, tint: C.violet, bar: "#7C3AED" },
        ].map((c, k) => (
          <Appear key={k} at={t(c.a)}>
            <Glass style={{ width: 620, height: 520, padding: 34, display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <IconTile icon={c.icon} tint={c.tint} size={84} />
                <Say from={c.a} to={c.b} size={56} align="left" />
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 20 }}>
                {[0.35, 0.5, 0.45, 0.7, 0.9].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h * 100 * interpolate(up, [i * 0.1, i * 0.1 + 0.5], [0, 1], clamp)}%`, borderRadius: 12, background: `linear-gradient(180deg, ${c.tint[0]}, ${c.bar})` }} />
                ))}
              </div>
            </Glass>
          </Appear>
        ))}
      </div>
      <Pill from={97} to={100} hi={[98, 100]} top={760} size={60} />
    </>
  );
};

// ---------- 13. pixel and tracking are ready for ads later ----------

const Pixel: React.FC = () => (
  <>
    <Wash tone="teal" />
    <Say from={101} to={103} hi={[102]} size={66} style={TOP} />
    <Appear at={t(101)} style={{ position: "absolute", left: 260, top: 350 }}>
      <Float amp={6}>
        <IconTile icon={Megaphone} tint={C.violet} size={190} />
      </Float>
    </Appear>
    <div style={{ position: "absolute", left: 700, top: 300, display: "flex", gap: 40 }}>
      {[
        { i: 104, icon: Eye, tint: C.blue },
        { i: 106, icon: Activity, tint: C.teal },
      ].map((c) => (
        <Appear key={c.i} at={t(c.i)}>
          <Card w={440} h={360}>
            <IconTile icon={c.icon} tint={c.tint} size={140} />
            <Say from={c.i} to={c.i} size={52} />
            <Pop at={t(109)} style={{ position: "absolute", right: -18, top: -18 }}>
              <CheckBadge size={70} />
            </Pop>
          </Card>
        </Appear>
      ))}
    </div>
    <Appear at={t(107)} style={{ position: "absolute", left: 700, width: 920, top: 760, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", padding: "18px 52px", borderRadius: 999, background: "linear-gradient(90deg, #0D9488, #16A34A)", boxShadow: "0 18px 40px rgba(13,148,136,0.3)", overflow: "hidden" }}>
        <Say from={107} to={109} size={60} style={{ filter: "brightness(0) invert(1)" }} />
        <Sweep from={t(109)} to={t(109) + 1} />
      </div>
    </Appear>
  </>
);

// ---------- 14. no commission on sales ----------

const NoCom: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Appear at={t(110)} style={{ position: "absolute", left: 960 - 450, top: 200 }}>
      <Card w={900} h={600}>
        <Strike at={t(114)}>
          <IconTile icon={Percent} tint={C.pink} size={220} />
        </Strike>
        <Say from={110} to={114} hi={[113, 114]} size={72} />
      </Card>
    </Appear>
  </>
);

// ---------- 15. just share the link; the website does the rest ----------

const LinkEnd: React.FC = () => (
  <>
    <Wash tone="green" />
    <Say from={115} to={121} hi={[119, 120]} size={60} style={{ ...TOP, top: 90 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 240, display: "flex", justifyContent: "center", gap: 50 }}>
      {[
        { i: 115, icon: ImageIcon, tint: C.blue },
        { i: 117, icon: MessageCircle, tint: C.sky },
      ].map((c) => (
        <Appear key={c.i} at={t(c.i)}>
          <Glass style={{ width: 520, padding: 26, display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <IconTile icon={c.icon} tint={c.tint} size={70} />
              <Skel w={220} strong />
            </div>
            <Pop at={t(120)}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderRadius: 18, background: "rgba(220,252,231,0.95)", border: "3px solid #86EFAC" }}>
                <Link2 size={36} color="#16A34A" strokeWidth={2.5} />
                <div style={{ height: 14, width: 260, borderRadius: 9, background: "#4ADE80" }} />
              </div>
            </Pop>
          </Glass>
        </Appear>
      ))}
    </div>
    <Appear at={t(122)} style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
      <LogoCard size={170} />
      <div style={{ position: "relative", padding: "24px 56px", borderRadius: 999, background: "linear-gradient(90deg, #16A34A, #0D9488)", boxShadow: "0 18px 40px rgba(22,163,74,0.35)", overflow: "hidden" }}>
        <Say from={122} to={124} size={74} style={{ filter: "brightness(0) invert(1)" }} />
        <Sweep from={t(124)} to={t(124) + 1} />
      </div>
    </Appear>
  </>
);

// ---------- assembly ----------

const SCENES: Record<SceneKey, React.FC> = {
  hook: Hook,
  but: But,
  inbox: Inbox,
  khata: Khata,
  day: Day,
  split: Split,
  brand: Brand,
  page: ProductPage,
  order: Order,
  list: List,
  courier: Courier,
  books: Books,
  pixel: Pixel,
  nocom: NoCom,
  link: LinkEnd,
};
const ORDER = Object.keys(SCENE_START) as SceneKey[];
const PRE = 0.4;
export const TOTAL_SECONDS_14 = audioDuration + tail;
const NO_CORNER = new Set<SceneKey>(["brand", "link"]);

const cues: Cue[] = [
  ...Object.values(SCENE_START).slice(1).map((i): Cue => [W[i] - 0.45, "whoosh"]),
  ...[0, 3, 5, 15, 24, 26, 29, 40, 57, 69, 70, 72, 77, 79, 80, 82, 93, 95, 104, 106, 115, 117].map((i): Cue => [W[i], "pop"]),
  ...[9, 61, 66, 87, 100, 109, 120, 124].map((i): Cue => [W[i], "ding"]),
  [W[114], "stamp"],
];

export const Video14: React.FC = () => {
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
            const to = i === ORDER.length - 1 ? TOTAL_SECONDS_14 + 1 : W[SCENE_START[ORDER[i + 1]]] - PRE + overlap;
            return (
              <Scene key={key} from={Math.max(0, start - PRE)} to={to}>
                <Comp />
                {NO_CORNER.has(key) ? null : (
                  <Appear at={start - 0.3} rise={0} style={{ position: "absolute", right: 60, top: 36 }}>
                    <Glass style={{ padding: "8px 14px", borderRadius: 22, background: "rgba(255,255,255,0.94)" }}>
                      <LogoMark width={140} />
                    </Glass>
                  </Appear>
                )}
              </Scene>
            );
          })}
        </div>
        <Audio src={staticFile("voiceover-2026-11-16c.mp3")} />
        <SfxTrack cues={cues} />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
