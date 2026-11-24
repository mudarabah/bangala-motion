// No-stock reseller ad (2026-11-24 voice): want to start online from home but no capital, no products,
// no delivery? → Mudarabah: no stock, 270+ products in your own shop and website, packing & courier
// done for you, your own price, training and mentors, clear costs → free seminar.
// Style: green glass (Mudarabah). Every line on screen is a range of spoken words (../v11/sayf.tsx).
import React from "react";
import { Audio } from "@remotion/media";
import {
  ArrowDown,
  Baby,
  Banknote,
  BookOpen,
  GraduationCap,
  Globe,
  HandCoins,
  HeadphonesIcon,
  Home,
  Megaphone,
  Package,
  PackageX,
  PenLine,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingDown,
  TrendingUp,
  Truck,
  User,
  UserCheck,
  Users,
  Warehouse,
} from "lucide-react";
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, CheckBadge, Float, Glass, IconTile, LogoCard, LogoMark, PaletteProvider, Pop, Scene, useProgress, useTime } from "../components/kit";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import { design, greenPalette, motion } from "../theme";
import { Skel, Strike } from "../v2/ui";
import { Sweep } from "../v4/parts";
import { makeSay } from "../v11/sayf";
import { C, Wash } from "../v11/ui";
import { audioDuration, SCENE_START, tail, W, WORDS, type SceneKey } from "./timeline";

const { t, Say } = makeSay(W, WORDS, {});
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TOP: React.CSSProperties = { position: "absolute", left: 120, right: 240, top: 110 };
const PRODUCTS = ["prod-floral.jpg", "prod-brooch.jpg", "prod-pink.jpg", "prod-bows.jpg"];
const prod = (f: string) => staticFile(`products/${f}`);

const Card: React.FC<{ w?: number; h?: number; active?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w = 320, h = 300, active, children, style }) => (
  <Glass active={active} style={{ width: w, height: h, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, position: "relative", ...style }}>
    {children}
  </Glass>
);

const Shot: React.FC<{ src: string; w: number; h: number; pos?: string }> = ({ src, w, h, pos = "top" }) => (
  <Glass style={{ padding: 12, borderRadius: 40 }}>
    <img src={prod(src)} style={{ width: w, height: h, objectFit: "cover", objectPosition: pos, borderRadius: 28, display: "block" }} />
  </Glass>
);

const Row: React.FC<{ at: number; icon: typeof Home; tint: [string, string]; from: number; to: number; hi?: number[]; w?: number; size?: number; strikeAt?: number }> = ({ at, icon, tint, from, to, hi, w = 760, size = 48, strikeAt }) => {
  const body = (
    <Glass style={{ width: w, padding: "18px 28px", display: "flex", alignItems: "center", gap: 20 }}>
      <IconTile icon={icon} tint={tint} size={76} />
      <Say from={from} to={to} hi={hi} size={size} align="left" />
    </Glass>
  );
  return <Appear at={at}>{strikeAt !== undefined ? <Strike at={strikeAt}>{body}</Strike> : body}</Appear>;
};

const GreenPill: React.FC<{ from: number; to: number; size?: number; sweepAt?: number }> = ({ from, to, size = 64, sweepAt }) => (
  <div style={{ position: "relative", padding: "22px 54px", borderRadius: 999, background: "linear-gradient(90deg, #16A34A, #0D9488)", boxShadow: "0 18px 40px rgba(22,163,74,0.32)", overflow: "hidden" }}>
    <Say from={from} to={to} size={size} style={{ filter: "brightness(0) invert(1)" }} />
    {sweepAt !== undefined ? <Sweep from={sweepAt} to={sweepAt + 1} /> : null}
  </div>
);

// ---------- 1. start an online business from home? ----------

const Hook: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(0)} style={{ position: "absolute", left: 220, top: 220 }}>
      <div style={{ position: "relative" }}>
        <Float amp={8}>
          <IconTile icon={Home} tint={C.green} size={260} />
        </Float>
        <Pop at={t(6)} style={{ position: "absolute", right: -60, top: -50 }}>
          <IconTile icon={ShoppingBag} tint={C.pink} size={130} />
        </Pop>
      </div>
    </Appear>
    <Say from={0} to={10} hi={[2, 3, 6, 7]} size={76} align="left" style={{ position: "absolute", left: 700, top: 280, width: 1080 }} />
    <div style={{ position: "absolute", left: 700, top: 640, display: "flex", gap: 22 }}>
      {PRODUCTS.map((p, i) => (
        <Pop key={p} at={t(7) + i * 0.12}>
          <img src={prod(p)} style={{ width: 180, height: 180, objectFit: "cover", borderRadius: 24, boxShadow: "0 14px 30px rgba(20,83,45,0.16)" }} />
        </Pop>
      ))}
    </div>
  </>
);

// ---------- 2. no capital, no products, no delivery? ----------

const Worry: React.FC = () => (
  <>
    <Wash tone="amber" />
    <Say from={11} to={12} size={66} style={TOP} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 280, display: "flex", justifyContent: "center", gap: 40 }}>
      {[
        { a: 13, b: 14, icon: Banknote, tint: C.amber },
        { a: 15, b: 17, icon: Package, tint: C.violet },
        { a: 18, b: 20, icon: Truck, tint: C.orange },
      ].map((c) => (
        <Appear key={c.a} at={t(c.a)}>
          <Card w={500} h={460}>
            <div style={{ position: "relative" }}>
              <IconTile icon={c.icon} tint={c.tint} size={150} />
              <Pop at={t(c.b)} style={{ position: "absolute", right: -30, top: -30, fontSize: 70, fontWeight: 800, color: "#E11D48" }}>
                ?
              </Pop>
            </div>
            <Say from={c.a} to={c.b} hi={[c.a]} size={54} />
          </Card>
        </Appear>
      ))}
    </div>
  </>
);

// ---------- 3. then the next two minutes are for you ----------

const Two: React.FC = () => {
  const { frame, f } = useTime();
  const sweep = interpolate(frame, [f(t(21)), f(t(26)) + 20], [0, 1], clamp);
  return (
    <>
      <Wash tone="green" />
      <Appear at={t(21)} style={{ position: "absolute", left: 960 - 160, top: 170 }}>
        <div style={{ position: "relative", width: 320, height: 320, borderRadius: 999, background: `conic-gradient(#16A34A ${sweep * 360}deg, rgba(220,252,231,0.9) 0deg)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 50px rgba(22,163,74,0.25)" }}>
          <div style={{ width: 240, height: 240, borderRadius: 999, background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Say from={23} to={24} size={56} />
          </div>
        </div>
      </Appear>
      <Say from={21} to={26} hi={[23, 24, 25, 26]} size={84} style={{ position: "absolute", left: 120, right: 120, top: 600 }} />
    </>
  );
};

// ---------- 4. why most people get stuck ----------

const Stuck: React.FC = () => (
  <>
    <Wash tone="rose" />
    <Say from={27} to={34} hi={[33, 34]} size={60} style={TOP} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 250, display: "grid", gridTemplateColumns: "760px 760px", justifyContent: "center", gap: 26 }}>
      <Row at={t(35)} icon={Warehouse} tint={C.amber} from={35} to={38} hi={[37]} />
      <Row at={t(39)} icon={TrendingDown} tint={C.rose} from={39} to={44} hi={[43]} />
      <Row at={t(45)} icon={Package} tint={C.orange} from={45} to={49} hi={[49]} />
      <Row at={t(50)} icon={User} tint={C.violet} from={50} to={55} hi={[54, 55]} />
    </div>
    <Pop at={t(55)} style={{ position: "absolute", left: 960 - 60, top: 720 }}>
      <IconTile icon={PackageX} tint={C.rose} size={120} />
    </Pop>
  </>
);

// ---------- 5. join Mudarabah: no stock to buy ----------

const Join: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(56)} rise={70} scaleFrom={0.9} style={{ position: "absolute", left: 220, top: 230 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={380} />
        <Sweep from={t(56) + 0.2} to={t(56) + 1.2} />
      </div>
    </Appear>
    <Say from={56} to={62} hi={[59, 61]} size={64} align="left" style={{ position: "absolute", left: 720, top: 260, width: 1060 }} />
    <Appear at={t(63)} style={{ position: "absolute", left: 720, top: 520, display: "flex", alignItems: "center", gap: 30 }}>
      <Strike at={t(66)}>
        <IconTile icon={Warehouse} tint={C.amber} size={140} />
      </Strike>
      <Say from={63} to={66} hi={[65, 66]} size={84} align="left" />
    </Appear>
  </>
);

// ---------- 6. put products in your own shop: 270+ products ----------

const Shop: React.FC = () => {
  const { frame, f } = useTime();
  const y = interpolate(frame, [f(t(76)), f(t(80)) + 30], [0, -27], clamp);
  return (
    <>
      <Wash tone="blue" />
      <Say from={67} to={75} hi={[69, 70, 71, 73]} size={58} style={TOP} />
      <Appear at={t(69)} style={{ position: "absolute", left: 260, top: 260 }}>
        <Glass style={{ padding: 12, borderRadius: 40 }}>
          <div style={{ width: 400, height: 640, borderRadius: 28, overflow: "hidden" }}>
            <img src={prod("rk-grid.jpg")} style={{ width: 400, display: "block", transform: `translateY(${y}px)` }} />
          </div>
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 780, top: 300, display: "flex", gap: 20 }}>
        {PRODUCTS.map((p, i) => (
          <Pop key={p} at={t(71) + i * 0.15}>
            <div style={{ position: "relative" }}>
              <img src={prod(p)} style={{ width: 210, height: 210, objectFit: "cover", borderRadius: 24, display: "block" }} />
              <div style={{ position: "absolute", right: -12, bottom: -12 }}>
                <CheckBadge size={52} />
              </div>
            </div>
          </Pop>
        ))}
      </div>
      <Appear at={t(76)} style={{ position: "absolute", left: 780, top: 620 }}>
        <Glass active={1} style={{ width: 960, padding: "26px 44px", display: "flex", alignItems: "center", gap: 24 }}>
          <IconTile icon={Store} tint={C.green} size={110} />
          <Say from={76} to={80} hi={[76, 77, 79]} size={72} align="left" />
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 7. your own e-commerce website in your name ----------

const Site: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(81)} style={{ position: "absolute", left: 220, top: 160 }}>
      <Glass style={{ padding: 14, borderRadius: 40 }}>
        <img src={prod("rk-home.jpg")} style={{ width: 440, height: 720, objectFit: "cover", objectPosition: "top", borderRadius: 28, display: "block" }} />
      </Glass>
    </Appear>
    <div style={{ position: "absolute", left: 800, top: 330, width: 960, display: "flex", flexDirection: "column", gap: 30 }}>
      <Appear at={t(81)} style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <IconTile icon={Globe} tint={C.green} size={110} />
        <IconTile icon={PenLine} tint={C.violet} size={90} />
      </Appear>
      <Say from={81} to={85} hi={[82, 84, 85]} size={84} align="left" />
    </div>
  </>
);

// ---------- 8. we pack and courier; customer pays delivery; damage is on us ----------

const Pack: React.FC = () => {
  const drive = useProgress(t(89), t(92) + 0.6);
  return (
    <>
      <Wash tone="amber" />
      <Say from={86} to={92} hi={[88, 90, 91]} size={64} style={TOP} />
      <Appear at={t(88)} style={{ position: "absolute", left: 220, top: 300 }}>
        <IconTile icon={Package} tint={C.orange} size={170} />
      </Appear>
      <div style={{ position: "absolute", left: 440, top: 470, width: 1240, height: 14, borderRadius: 9, background: "repeating-linear-gradient(90deg, #FDBA74 0 40px, transparent 40px 70px)" }} />
      <Appear at={t(90)} rise={0} style={{ position: "absolute", left: 460 + 1000 * drive, top: 290 }}>
        <IconTile icon={Truck} tint={C.green} size={170} />
      </Appear>
      <div style={{ position: "absolute", left: 0, right: 0, top: 620, display: "flex", justifyContent: "center", gap: 40 }}>
        <Row at={t(93)} icon={User} tint={C.blue} from={93} to={96} hi={[93, 94]} w={720} />
        <Row at={t(97)} icon={ShieldCheck} tint={C.green} from={97} to={102} hi={[99, 102]} w={720} />
      </div>
    </>
  );
};

// ---------- 9. sell at your own price; the margin minus packaging is your profit ----------

const Price: React.FC = () => {
  const grow = useProgress(t(108), t(112) + 0.5);
  const cut = useProgress(t(113), t(117) + 0.3);
  return (
    <>
      <Wash tone="green" />
      <Say from={103} to={107} hi={[104, 105]} size={66} style={TOP} />
      <Appear at={t(108)} style={{ position: "absolute", left: 300, top: 260 }}>
        <Glass style={{ width: 620, height: 600, padding: 40, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 0 }}>
          <div style={{ width: 240, display: "flex", flexDirection: "column-reverse" }}>
            <div style={{ height: 260, borderRadius: "0 0 18px 18px", background: "linear-gradient(180deg, #CBD5E1, #94A3B8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Warehouse size={60} color="white" strokeWidth={2.2} />
            </div>
            <div style={{ height: 200 * grow, background: "linear-gradient(180deg, #86EFAC, #16A34A)", borderRadius: "18px 18px 0 0", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34 * cut, background: "repeating-linear-gradient(45deg, #FCA5A5 0 10px, #FECACA 10px 20px)" }} />
            </div>
          </div>
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 1000, top: 300, display: "flex", flexDirection: "column", gap: 24, width: 780 }}>
        <Row at={t(108)} icon={Warehouse} tint={[ "#CBD5E1", "#64748B"]} from={108} to={112} hi={[108]} w={780} />
        <Row at={t(113)} icon={Package} tint={C.rose} from={113} to={117} hi={[115, 116]} w={780} />
        <Appear at={t(118)}>
          <Glass active={1} style={{ width: 780, padding: "22px 30px", display: "flex", alignItems: "center", gap: 20 }}>
            <IconTile icon={HandCoins} tint={C.green} size={90} />
            <Say from={118} to={120} hi={[120]} size={64} align="left" />
          </Glass>
        </Appear>
      </div>
    </>
  );
};

// ---------- 10. don't know anything? we teach you ----------

const Learn: React.FC = () => (
  <>
    <Wash tone="violet" />
    <Say from={121} to={126} hi={[125, 126]} size={66} style={TOP} />
    <Appear at={t(127)} style={{ position: "absolute", left: 140, top: 260, display: "flex", alignItems: "center", gap: 18 }}>
      <IconTile icon={GraduationCap} tint={C.violet} size={90} />
      <Say from={127} to={128} hi={[128]} size={56} align="left" />
    </Appear>
    <div style={{ position: "absolute", left: 0, right: 0, top: 420, display: "flex", justifyContent: "center", gap: 30 }}>
      {[
        { a: 129, b: 130, icon: PenLine, tint: C.pink },
        { a: 131, b: 132, icon: Megaphone, tint: C.blue },
        { a: 133, b: 133, icon: TrendingUp, tint: C.green },
        { a: 135, b: 136, icon: HeadphonesIcon, tint: C.orange },
      ].map((c) => (
        <Appear key={c.a} at={t(c.a)}>
          <Card w={390} h={360}>
            <IconTile icon={c.icon} tint={c.tint} size={120} />
            <Say from={c.a} to={c.b} size={46} />
          </Card>
        </Appear>
      ))}
    </div>
  </>
);

// ---------- 11. training course and experienced mentors ----------

const Mentor: React.FC = () => (
  <>
    <Wash tone="blue" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 240, display: "flex", justifyContent: "center", gap: 60 }}>
      <Appear at={t(138)}>
        <Card w={600} h={480}>
          <Float amp={6}>
            <IconTile icon={BookOpen} tint={C.blue} size={170} />
          </Float>
          <Say from={137} to={139} hi={[138, 139]} size={58} />
        </Card>
      </Appear>
      <Appear at={t(141)}>
        <Card w={600} h={480} active={1}>
          <Float amp={6}>
            <IconTile icon={UserCheck} tint={C.green} size={170} />
          </Float>
          <Say from={140} to={142} hi={[141, 142]} size={58} />
        </Card>
      </Appear>
    </div>
  </>
);

// ---------- 12. all costs told up front ----------

const Costs: React.FC = () => (
  <>
    <Wash tone="amber" />
    <div style={{ position: "absolute", left: 140, top: 110, display: "flex", alignItems: "center", gap: 22 }}>
      <IconTile icon={ShieldCheck} tint={C.green} size={100} />
      <Say from={143} to={149} hi={[145, 146, 147]} size={64} align="left" />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center", gap: 50 }}>
      <Appear at={t(150)}>
        <Card w={760} h={440}>
          <IconTile icon={Package} tint={C.orange} size={150} />
          <Say from={150} to={156} hi={[154, 155]} size={52} style={{ padding: "0 30px" }} />
        </Card>
      </Appear>
      <Appear at={t(157)}>
        <Card w={760} h={440}>
          <IconTile icon={RotateCcw} tint={C.rose} size={150} />
          <Say from={157} to={162} hi={[160, 161, 162]} size={52} style={{ padding: "0 30px" }} />
        </Card>
      </Appear>
    </div>
  </>
);

// ---------- 13. your profit depends on your effort ----------

const Effort: React.FC = () => {
  const up = useProgress(t(163), t(171) + 0.4);
  return (
    <>
      <Wash tone="green" />
      <Appear at={t(163)} style={{ position: "absolute", left: 300, top: 220 }}>
        <Glass style={{ width: 700, height: 560, padding: 40, display: "flex", alignItems: "flex-end", gap: 24 }}>
          {[0.2, 0.35, 0.5, 0.7, 0.95].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h * 100 * interpolate(up, [i * 0.12, i * 0.12 + 0.4], [0, 1], clamp)}%`, borderRadius: 14, background: "linear-gradient(180deg, #86EFAC, #16A34A)" }} />
          ))}
        </Glass>
      </Appear>
      <Say from={163} to={171} hi={[163, 169, 170]} size={70} align="left" style={{ position: "absolute", left: 1100, top: 340, width: 700 }} />
      <Pop at={t(170)} style={{ position: "absolute", left: 1100, top: 640 }}>
        <IconTile icon={Sparkles} tint={C.amber} size={110} />
      </Pop>
    </>
  );
};

// ---------- 14. who it's for ----------

const Who: React.FC = () => (
  <>
    <Wash tone="pink" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 120, display: "flex", justifyContent: "center", gap: 30 }}>
      {[
        { a: 172, b: 173, icon: Home, tint: C.pink },
        { a: 174, b: 174, icon: GraduationCap, tint: C.violet },
        { a: 176, b: 177, icon: Users, tint: C.blue },
      ].map((c) => (
        <Appear key={c.a} at={t(c.a)}>
          <Glass style={{ padding: "18px 30px", display: "flex", alignItems: "center", gap: 18 }}>
            <IconTile icon={c.icon} tint={c.tint} size={80} />
            <Say from={c.a} to={c.b} size={50} />
          </Glass>
        </Appear>
      ))}
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 320, display: "flex", justifyContent: "center", gap: 50 }}>
      <Appear at={t(179)}>
        <Glass style={{ width: 620, padding: 22, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            {PRODUCTS.slice(0, 3).map((p) => (
              <img key={p} src={prod(p)} style={{ flex: 1, height: 170, objectFit: "cover", borderRadius: 16 }} />
            ))}
          </div>
          <Say from={179} to={180} hi={[179, 180]} size={50} />
        </Glass>
      </Appear>
      <Appear at={t(182)}>
        <Card w={620} h={290}>
          <IconTile icon={Baby} tint={C.sky} size={130} />
          <Say from={182} to={185} hi={[182, 184]} size={50} />
        </Card>
      </Appear>
    </div>
    <Say from={186} to={193} hi={[191, 192, 193]} size={56} style={{ position: "absolute", left: 120, right: 120, top: 760 }} />
  </>
);

// ---------- 15. free seminar: register now ----------

const Cta: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(194)} rise={60} style={{ position: "absolute", left: 960 - 150, top: 80 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={300} />
        <Sweep from={t(194) + 0.2} to={t(194) + 1.2} />
      </div>
    </Appear>
    <Appear at={t(194)} style={{ position: "absolute", left: 0, right: 0, top: 440, display: "flex", justifyContent: "center", alignItems: "center", gap: 24 }}>
      <IconTile icon={Users} tint={C.green} size={100} />
      <Say from={194} to={199} hi={[195, 196]} size={70} />
    </Appear>
    <Appear at={t(200)} style={{ position: "absolute", left: 0, right: 0, top: 620, display: "flex", justifyContent: "center" }}>
      <GreenPill from={200} to={202} size={72} sweepAt={t(202)} />
    </Appear>
    <Appear at={t(203)} style={{ position: "absolute", left: 0, right: 0, top: 820, display: "flex", justifyContent: "center" }}>
      <Glass style={{ padding: "14px 34px", borderRadius: 999, display: "flex", alignItems: "center", gap: 16 }}>
        <Say from={203} to={203} size={52} />
        <Float amp={8}>
          <ArrowDown size={44} color="#16A34A" strokeWidth={2.6} />
        </Float>
      </Glass>
    </Appear>
  </>
);

// ---------- assembly ----------

const SCENES: Record<SceneKey, React.FC> = {
  hook: Hook,
  worry: Worry,
  two: Two,
  stuck: Stuck,
  join: Join,
  shop: Shop,
  site: Site,
  pack: Pack,
  price: Price,
  learn: Learn,
  mentor: Mentor,
  costs: Costs,
  effort: Effort,
  who: Who,
  cta: Cta,
};
const ORDER = Object.keys(SCENE_START) as SceneKey[];
const PRE = 0.4;
export const TOTAL_SECONDS_21 = audioDuration + tail;
const NO_CORNER = new Set<SceneKey>(["join", "cta"]);

const cues: Cue[] = [
  ...Object.values(SCENE_START).slice(1).map((i): Cue => [W[i] - 0.45, "whoosh"]),
  ...[13, 15, 18, 35, 39, 45, 50, 71, 93, 97, 108, 113, 129, 131, 133, 135, 150, 157, 174, 176, 179, 182].map((i): Cue => [W[i], "pop"]),
  ...[26, 80, 85, 92, 120, 142, 149, 171, 202].map((i): Cue => [W[i], "ding"]),
  [W[55], "stamp"],
  [W[66], "stamp"],
];

export const Video21: React.FC = () => {
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
            const to = i === ORDER.length - 1 ? TOTAL_SECONDS_21 + 1 : W[SCENE_START[ORDER[i + 1]]] - PRE + overlap;
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
        <Audio src={staticFile("voiceover-2026-11-24.mp3")} />
        <SfxTrack cues={cues} />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
