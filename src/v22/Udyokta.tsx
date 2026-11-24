// "11 pm, phone in hand" entrepreneur ad (2026-11-24, second voice): a mother scrolling at night thinks
// "I studied too" → business seems to need capital, a shop and risk → the problem is the platform →
// Mudarabah: no stock, 270+ products, packing and delivery done, training → a day in the new routine,
// honest costs, "we call you an entrepreneur" → free seminar.
// Style: green glass (Mudarabah). Every line on screen is a range of spoken words (../v11/sayf.tsx).
import React from "react";
import { Audio } from "@remotion/media";
import {
  Baby,
  CheckCheck,
  Clock,
  GraduationCap,
  HandCoins,
  Home,
  Megaphone,
  MessageCircle,
  Moon,
  Package,
  PenLine,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Sun,
  Sunrise,
  Truck,
  User,
  UserCheck,
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
const NIGHT: [string, string] = ["#C7D2FE", "#4F46E5"];
const PRODUCTS = ["prod-floral.jpg", "prod-brooch.jpg", "prod-pink.jpg", "prod-bows.jpg"];
const prod = (f: string) => staticFile(`products/${f}`);

const Card: React.FC<{ w?: number; h?: number; active?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w = 320, h = 300, active, children, style }) => (
  <Glass active={active} style={{ width: w, height: h, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, position: "relative", ...style }}>
    {children}
  </Glass>
);

const Row: React.FC<{ at: number; icon: typeof Home; tint: [string, string]; from: number; to: number; hi?: number[]; w?: number; size?: number }> = ({ at, icon, tint, from, to, hi, w = 760, size = 48 }) => (
  <Appear at={at}>
    <Glass style={{ width: w, padding: "18px 28px", display: "flex", alignItems: "center", gap: 20 }}>
      <IconTile icon={icon} tint={tint} size={76} />
      <Say from={from} to={to} hi={hi} size={size} align="left" />
    </Glass>
  </Appear>
);

// ---------- 1. 11 pm: child asleep, chores done, phone in hand ----------

const Night: React.FC = () => (
  <>
    <Wash tone="violet" />
    <div style={{ position: "absolute", left: 200, top: 220, display: "flex", flexDirection: "column", gap: 28 }}>
      <Appear at={t(1)} style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <IconTile icon={Moon} tint={NIGHT} size={120} />
        <Say from={0} to={2} hi={[1, 2]} size={80} align="left" />
      </Appear>
      <Row at={t(3)} icon={Baby} tint={C.sky} from={3} to={4} w={620} size={54} />
      <Row at={t(5)} icon={Home} tint={C.amber} from={5} to={7} w={620} size={54} />
    </div>
    <Appear at={t(8)} style={{ position: "absolute", left: 1300, top: 160 }}>
      <Glass style={{ padding: 14, borderRadius: 50 }}>
        <div style={{ width: 380, height: 680, borderRadius: 38, background: "white", overflow: "hidden", display: "flex", flexDirection: "column", gap: 14, padding: 18 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 99, background: ["#BFDBFE", "#FBCFE8", "#BBF7D0"][i] }} />
                <Skel w={140} strong />
              </div>
              <img src={prod(PRODUCTS[i])} style={{ width: "100%", height: 130, objectFit: "cover", borderRadius: 14 }} />
            </div>
          ))}
        </div>
      </Glass>
    </Appear>
    <Appear at={t(8)} style={{ position: "absolute", left: 200, top: 650, display: "flex", alignItems: "center", gap: 20 }}>
      <IconTile icon={Smartphone} tint={C.green} size={90} />
      <Say from={8} to={9} hi={[9]} size={60} align="left" />
    </Appear>
  </>
);

// ---------- 2. "I studied too. I was meant to do something." ----------

const Think: React.FC = () => (
  <>
    <Wash tone="violet" />
    <Say from={10} to={15} hi={[10, 12]} size={58} style={TOP} />
    <Appear at={t(16)} style={{ position: "absolute", left: 220, top: 300 }}>
      <Float amp={6}>
        <IconTile icon={GraduationCap} tint={C.violet} size={220} />
      </Float>
    </Appear>
    <div style={{ position: "absolute", left: 620, top: 300, display: "flex", flexDirection: "column", gap: 34 }}>
      <Appear at={t(16)}>
        <div style={{ padding: "26px 40px", borderRadius: 40, borderBottomLeftRadius: 10, background: "rgba(255,255,255,0.96)", boxShadow: "0 14px 34px rgba(20,83,45,0.1)" }}>
          <Say from={16} to={19} hi={[18]} size={70} align="left" />
        </div>
      </Appear>
      <Appear at={t(20)}>
        <div style={{ padding: "26px 40px", borderRadius: 40, borderBottomLeftRadius: 10, background: "rgba(255,255,255,0.96)", boxShadow: "0 14px 34px rgba(20,83,45,0.1)" }}>
          <Say from={20} to={24} hi={[22, 23]} size={70} align="left" />
        </div>
      </Appear>
    </div>
  </>
);

// ---------- 3. if that's your thought, this is for you ----------

const You: React.FC = () => (
  <>
    <Wash tone="green" />
    <Pop at={t(25)} style={{ position: "absolute", left: 960 - 100, top: 220 }}>
      <IconTile icon={User} tint={C.green} size={200} />
    </Pop>
    <Say from={25} to={29} size={64} style={{ position: "absolute", left: 120, right: 120, top: 500 }} />
    <Say from={30} to={33} hi={[31, 32, 33]} size={88} style={{ position: "absolute", left: 120, right: 120, top: 620 }} />
  </>
);

// ---------- 4. "business = big capital, a shop, risk" — the dream stays a dream ----------

const Myth: React.FC = () => (
  <>
    <Wash tone="amber" />
    <Say from={34} to={37} hi={[36]} size={64} style={TOP} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 280, display: "flex", justifyContent: "center", gap: 40 }}>
      {[
        { a: 38, b: 39, icon: HandCoins, tint: C.amber },
        { a: 40, b: 40, icon: Store, tint: C.orange },
        { a: 42, b: 42, icon: ShieldCheck, tint: C.rose },
      ].map((c) => (
        <Appear key={c.a} at={t(c.a)}>
          <Card w={440} h={380}>
            <IconTile icon={c.icon} tint={c.tint} size={140} />
            <Say from={c.a} to={c.b} hi={[c.b]} size={60} />
          </Card>
        </Appear>
      ))}
    </div>
    <Say from={43} to={47} hi={[44]} size={60} style={{ position: "absolute", left: 120, right: 120, top: 760 }} />
  </>
);

// ---------- 5. the problem isn't you; it's not having the right platform ----------

const Real: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(48)} style={{ position: "absolute", left: 220, top: 230 }}>
      <Strike at={t(52)}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <IconTile icon={GraduationCap} tint={C.violet} size={120} />
          <Say from={48} to={52} hi={[51]} size={70} align="left" />
        </div>
      </Strike>
    </Appear>
    <Appear at={t(53)} style={{ position: "absolute", left: 220, top: 500 }}>
      <Glass active={1} style={{ padding: "30px 44px", display: "flex", alignItems: "center", gap: 28 }}>
        <IconTile icon={Sparkles} tint={C.green} size={130} />
        <Say from={53} to={58} hi={[55, 56]} size={74} align="left" />
      </Glass>
    </Appear>
  </>
);

// ---------- 6. if only: no stock, 270+ products ready, just sell from your shop ----------

const IfOnly: React.FC = () => {
  const { frame, f } = useTime();
  const y = interpolate(frame, [f(t(68)), f(t(74)) + 30], [0, -30], clamp);
  return (
    <>
      <Wash tone="blue" />
      <Appear at={t(59)} style={{ position: "absolute", left: 140, top: 110, display: "flex", alignItems: "center", gap: 24 }}>
        <Strike at={t(67)}>
          <IconTile icon={Warehouse} tint={C.amber} size={100} />
        </Strike>
        <Say from={59} to={67} hi={[62, 63, 64]} size={60} align="left" />
      </Appear>
      <Appear at={t(68)} style={{ position: "absolute", left: 260, top: 280 }}>
        <Glass style={{ padding: 12, borderRadius: 40 }}>
          <div style={{ width: 380, height: 600, borderRadius: 28, overflow: "hidden" }}>
            <img src={prod("rk-grid.jpg")} style={{ width: 380, display: "block", transform: `translateY(${y}px)` }} />
          </div>
        </Glass>
      </Appear>
      <Appear at={t(68)} style={{ position: "absolute", left: 780, top: 300 }}>
        <Glass active={1} style={{ width: 960, padding: "24px 40px", display: "flex", alignItems: "center", gap: 24 }}>
          <IconTile icon={Package} tint={C.green} size={100} />
          <Say from={68} to={74} hi={[68, 69, 73]} size={62} align="left" />
        </Glass>
      </Appear>
      <Appear at={t(75)} style={{ position: "absolute", left: 780, top: 560, display: "flex", alignItems: "center", gap: 20 }}>
        <IconTile icon={Store} tint={C.blue} size={100} />
        <Say from={75} to={81} hi={[77, 80]} size={58} align="left" style={{ width: 820 }} />
      </Appear>
    </>
  );
};

// ---------- 7. someone packs and delivers; someone teaches you ----------

const Help: React.FC = () => (
  <>
    <Wash tone="amber" />
    <Appear at={t(82)} style={{ position: "absolute", left: 140, top: 120, display: "flex", alignItems: "center", gap: 20 }}>
      <IconTile icon={Package} tint={C.orange} size={90} />
      <IconTile icon={Truck} tint={C.green} size={90} />
      <Say from={82} to={88} hi={[82, 84]} size={58} align="left" />
    </Appear>
    <Say from={89} to={94} hi={[91, 92, 93]} size={58} style={{ position: "absolute", left: 120, right: 120, top: 330 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 480, display: "flex", justifyContent: "center", gap: 36 }}>
      {[
        { a: 95, b: 97, icon: PenLine, tint: C.pink },
        { a: 98, b: 100, icon: Megaphone, tint: C.blue },
        { a: 101, b: 106, icon: MessageCircle, tint: C.green },
      ].map((c) => (
        <Appear key={c.a} at={t(c.a)}>
          <Card w={500} h={360}>
            <IconTile icon={c.icon} tint={c.tint} size={120} />
            <Say from={c.a} to={c.b} hi={[c.a]} size={46} style={{ padding: "0 24px" }} />
          </Card>
        </Appear>
      ))}
    </div>
  </>
);

// ---------- 8. Mudarabah does exactly this ----------

const Mudarabah: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(107)} rise={70} scaleFrom={0.9} style={{ position: "absolute", left: 960 - 180, top: 180 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={360} />
        <Sweep from={t(107) + 0.2} to={t(107) + 1.2} />
      </div>
    </Appear>
    <Say from={107} to={112} hi={[110, 111]} size={80} style={{ position: "absolute", left: 0, right: 0, top: 640 }} />
  </>
);

// ---------- 9. a day: post in the morning, reply at noon, confirm; the rest is ours ----------

const Day: React.FC = () => {
  const line = useProgress(t(113), t(131));
  return (
    <>
      <Wash tone="green" />
      <div style={{ position: "absolute", left: 220, top: 520, width: 1480 * line, height: 8, borderRadius: 9, background: "linear-gradient(90deg, #FCD34D, #22C55E, #0D9488)" }} />
      <div style={{ position: "absolute", left: 120, right: 120, top: 200, display: "flex", justifyContent: "space-between" }}>
        {[
          { a: 113, b: 121, icon: Sunrise, tint: C.amber, img: PRODUCTS[0] },
          { a: 122, b: 128, icon: Sun, tint: C.orange, img: undefined },
          { a: 129, b: 131, icon: CheckCheck, tint: C.green, img: undefined },
        ].map((s) => (
          <Appear key={s.a} at={t(s.a)}>
            <Card w={520} h={560} style={{ justifyContent: "flex-start", paddingTop: 34 }}>
              <IconTile icon={s.icon} tint={s.tint} size={110} />
              <div style={{ height: 160, display: "flex", alignItems: "center" }}>
                {s.img ? (
                  <img src={prod(s.img)} style={{ width: 200, height: 150, objectFit: "cover", borderRadius: 16 }} />
                ) : s.a === 122 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ width: 220, height: 44, borderRadius: 22, background: "rgba(241,245,249,0.95)" }} />
                    <div style={{ width: 180, height: 44, borderRadius: 22, background: "rgba(220,252,231,0.95)", alignSelf: "flex-end" }} />
                  </div>
                ) : (
                  <CheckBadge size={110} />
                )}
              </div>
              <Say from={s.a} to={s.b} hi={[s.a]} size={44} style={{ padding: "0 26px" }} />
            </Card>
          </Appear>
        ))}
      </div>
      <Appear at={t(132)} style={{ position: "absolute", left: 0, right: 0, top: 820, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", padding: "20px 54px", borderRadius: 999, background: "linear-gradient(90deg, #16A34A, #0D9488)", boxShadow: "0 18px 40px rgba(22,163,74,0.32)", overflow: "hidden" }}>
          <Say from={132} to={134} size={64} style={{ filter: "brightness(0) invert(1)" }} />
          <Sweep from={t(134)} to={t(134) + 1} />
        </div>
      </Appear>
    </>
  );
};

// ---------- 10. the profit: margin over wholesale minus twenty taka packaging ----------

const Profit: React.FC = () => {
  const grow = useProgress(t(138), t(142) + 0.5);
  const cut = useProgress(t(143), t(147) + 0.3);
  return (
    <>
      <Wash tone="green" />
      <Appear at={t(135)} style={{ position: "absolute", left: 300, top: 200 }}>
        <Glass style={{ width: 600, height: 640, padding: 40, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ width: 240, display: "flex", flexDirection: "column-reverse" }}>
            <div style={{ height: 280, borderRadius: "0 0 18px 18px", background: "linear-gradient(180deg, #CBD5E1, #94A3B8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Warehouse size={60} color="white" strokeWidth={2.2} />
            </div>
            <div style={{ height: 220 * grow, background: "linear-gradient(180deg, #86EFAC, #16A34A)", borderRadius: "18px 18px 0 0", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 36 * cut, background: "repeating-linear-gradient(45deg, #FCA5A5 0 10px, #FECACA 10px 20px)" }} />
            </div>
          </div>
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 1000, top: 240, display: "flex", flexDirection: "column", gap: 24, width: 780 }}>
        <Row at={t(135)} icon={Truck} tint={C.blue} from={135} to={137} w={780} />
        <Row at={t(138)} icon={Warehouse} tint={["#CBD5E1", "#64748B"]} from={138} to={142} hi={[138, 142]} w={780} />
        <Row at={t(143)} icon={Package} tint={C.rose} from={143} to={147} hi={[145, 146]} w={780} />
        <Appear at={t(148)}>
          <Glass active={1} style={{ width: 780, padding: "22px 30px", display: "flex", alignItems: "center", gap: 20 }}>
            <IconTile icon={HandCoins} tint={C.green} size={90} />
            <Say from={148} to={149} hi={[149]} size={66} align="left" />
          </Glass>
        </Appear>
      </div>
    </>
  );
};

// ---------- 11. no need to leave home; work on your own time ----------

const HomeScene: React.FC = () => (
  <>
    <Wash tone="pink" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 220, display: "flex", justifyContent: "center", gap: 60 }}>
      <Appear at={t(150)}>
        <Card w={620} h={480}>
          <Float amp={6}>
            <IconTile icon={Home} tint={C.green} size={170} />
          </Float>
          <Say from={150} to={155} hi={[154, 155]} size={54} style={{ padding: "0 30px" }} />
        </Card>
      </Appear>
      <Appear at={t(156)}>
        <Card w={620} h={480} active={1}>
          <Float amp={6}>
            <IconTile icon={Clock} tint={C.violet} size={170} />
          </Float>
          <Say from={156} to={158} hi={[156, 157]} size={62} />
        </Card>
      </Appear>
    </div>
  </>
);

// ---------- 12. honest: no overnight riches; the costs; effort and marketing ----------

const Honest: React.FC = () => (
  <>
    <Wash tone="amber" />
    <Appear at={t(159)} style={{ position: "absolute", left: 140, top: 110, display: "flex", alignItems: "center", gap: 22 }}>
      <IconTile icon={ShieldCheck} tint={C.green} size={96} />
      <Say from={159} to={165} hi={[160, 161]} size={60} align="left" />
    </Appear>
    <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 40 }}>
      <Appear at={t(166)}>
        <Card w={560} h={380}>
          <IconTile icon={Package} tint={C.orange} size={130} />
          <Say from={166} to={173} hi={[169, 170]} size={48} style={{ padding: "0 26px" }} />
        </Card>
      </Appear>
      <Appear at={t(174)}>
        <Card w={560} h={380}>
          <IconTile icon={RotateCcw} tint={C.rose} size={130} />
          <Say from={174} to={178} hi={[176, 177]} size={48} style={{ padding: "0 26px" }} />
        </Card>
      </Appear>
      <Appear at={t(179)}>
        <Card w={560} h={380}>
          <IconTile icon={Megaphone} tint={C.blue} size={130} />
          <Say from={179} to={183} hi={[179, 181]} size={48} style={{ padding: "0 26px" }} />
        </Card>
      </Appear>
    </div>
    <Appear at={t(184)} style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", justifyContent: "center" }}>
      <Glass active={1} style={{ padding: "20px 50px", borderRadius: 999 }}>
        <Say from={184} to={189} hi={[185, 187]} size={62} />
      </Glass>
    </Appear>
  </>
);

// ---------- 13. not a reseller — an entrepreneur: your website, brand, customers ----------

const Founder: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(190)} style={{ position: "absolute", left: 140, top: 110, display: "flex", alignItems: "center", gap: 26 }}>
      <Strike at={t(195)}>
        <Say from={190} to={195} hi={[193]} size={58} align="left" />
      </Strike>
    </Appear>
    <Appear at={t(196)} style={{ position: "absolute", left: 140, top: 230, display: "flex", alignItems: "center", gap: 24 }}>
      <IconTile icon={UserCheck} tint={C.green} size={110} />
      <Say from={196} to={197} hi={[197]} size={96} align="left" />
    </Appear>
    <Appear at={t(199)} style={{ position: "absolute", left: 140, top: 430 }}>
      <Glass style={{ padding: 12, borderRadius: 36 }}>
        <img src={prod("rk-home.jpg")} style={{ width: 360, height: 460, objectFit: "cover", objectPosition: "top", borderRadius: 26, display: "block" }} />
      </Glass>
    </Appear>
    <div style={{ position: "absolute", left: 620, top: 470, display: "flex", flexDirection: "column", gap: 24 }}>
      <Row at={t(199)} icon={Smartphone} tint={C.blue} from={199} to={204} hi={[203]} w={1000} size={52} />
      <Row at={t(205)} icon={Sparkles} tint={C.violet} from={205} to={207} hi={[206]} w={1000} size={52} />
      <Row at={t(208)} icon={User} tint={C.pink} from={208} to={210} hi={[209]} w={1000} size={52} />
    </div>
  </>
);

// ---------- 14. nervous to start? register for the free seminar first ----------

const Cta: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(211)} rise={60} style={{ position: "absolute", left: 960 - 150, top: 100 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={300} />
        <Sweep from={t(211) + 0.2} to={t(211) + 1.2} />
      </div>
    </Appear>
    <Say from={211} to={216} hi={[212]} size={64} style={{ position: "absolute", left: 120, right: 120, top: 470 }} />
    <Appear at={t(217)} style={{ position: "absolute", left: 0, right: 0, top: 630, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", padding: "24px 60px", borderRadius: 999, background: "linear-gradient(90deg, #16A34A, #0D9488)", boxShadow: "0 18px 40px rgba(22,163,74,0.35)", overflow: "hidden" }}>
        <Say from={217} to={221} size={72} style={{ filter: "brightness(0) invert(1)" }} />
        <Sweep from={t(220)} to={t(220) + 1} />
      </div>
    </Appear>
  </>
);

// ---------- assembly ----------

const SCENES: Record<SceneKey, React.FC> = {
  night: Night,
  think: Think,
  you: You,
  myth: Myth,
  real: Real,
  ifonly: IfOnly,
  help: Help,
  mudarabah: Mudarabah,
  day: Day,
  profit: Profit,
  home: HomeScene,
  honest: Honest,
  founder: Founder,
  cta: Cta,
};
const ORDER = Object.keys(SCENE_START) as SceneKey[];
const PRE = 0.4;
export const TOTAL_SECONDS_22 = audioDuration + tail;
const NO_CORNER = new Set<SceneKey>(["mudarabah", "cta"]);

const cues: Cue[] = [
  ...Object.values(SCENE_START).slice(1).map((i): Cue => [W[i] - 0.45, "whoosh"]),
  ...[3, 5, 8, 16, 20, 38, 40, 42, 68, 75, 95, 98, 101, 113, 122, 129, 138, 143, 166, 174, 179, 199, 205, 208].map((i): Cue => [W[i], "pop"]),
  ...[33, 58, 112, 134, 149, 158, 189, 197, 221].map((i): Cue => [W[i], "ding"]),
  [W[52], "stamp"],
  [W[67], "stamp"],
  [W[195], "stamp"],
];

export const Video22: React.FC = () => {
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
            const to = i === ORDER.length - 1 ? TOTAL_SECONDS_22 + 1 : W[SCENE_START[ORDER[i + 1]]] - PRE + overlap;
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
        <Audio src={staticFile("voiceover-2026-11-24b.mp3")} />
        <SfxTrack cues={cues} />
      </AbsoluteFill>
    </PaletteProvider>
  );
};

