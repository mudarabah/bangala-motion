// Inbox-reply ad (2026-11-19 voice): "price?" → you answer → no reply. Two mistakes (price-in-inbox
// posts, a bare price), how to write a reply that gets answered, one follow-up, then: your own website.
// Every line on screen is a range of spoken words (see ../v11/sayf.tsx).
import React from "react";
import { Audio } from "@remotion/media";
import {
  ArrowDown,
  ArrowLeftRight,
  Banknote,
  Briefcase,
  CheckCheck,
  Clock,
  Eye,
  HandCoins,
  HelpCircle,
  Link2,
  MessageCircle,
  Palette,
  Tag,
  Truck,
  User,
  UserMinus,
  X,
} from "lucide-react";
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, CheckBadge, Float, Glass, IconTile, LogoCard, LogoMark, PaletteProvider, Pop, Scene, useProgress, useTime } from "../components/kit";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import { design, fonts, greenPalette, motion } from "../theme";
import { Skel, Strike } from "../v2/ui";
import { Sweep } from "../v4/parts";
import { makeSay } from "../v11/sayf";
import { C, NumBadge, Wash } from "../v11/ui";
import { audioDuration, SCENE_START, tail, W, WORDS, type SceneKey } from "./timeline";

const { t, Say } = makeSay(W, WORDS, {});
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TOP: React.CSSProperties = { position: "absolute", left: 120, right: 120, top: 110 };

const Card: React.FC<{ w?: number; h?: number; active?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w = 320, h = 300, active, children, style }) => (
  <Glass active={active} style={{ width: w, height: h, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, position: "relative", ...style }}>
    {children}
  </Glass>
);

// Chat bubble: `me` = the seller (right, green); otherwise the customer (left, white).
const Bubble: React.FC<{ at: number; me?: boolean; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, me, children, style }) => (
  <Appear at={at} style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start" }}>
    <div
      style={{
        padding: "16px 26px",
        borderRadius: 28,
        borderBottomLeftRadius: me ? 28 : 8,
        borderBottomRightRadius: me ? 8 : 28,
        background: me ? "rgba(220,252,231,0.98)" : "rgba(255,255,255,0.98)",
        boxShadow: "0 8px 22px rgba(15,23,42,0.08)",
        ...style,
      }}
    >
      {children}
    </div>
  </Appear>
);

// A chat window with a header row.
const Chat: React.FC<{ w: number; h: number; children: React.ReactNode }> = ({ w, h, children }) => (
  <Glass style={{ width: w, height: h, padding: 26, display: "flex", flexDirection: "column", gap: 20 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 14, borderBottom: "2px solid rgba(226,232,240,0.9)" }}>
      <IconTile icon={User} tint={C.blue} size={60} />
      <Skel w={180} strong />
    </div>
    {children}
  </Glass>
);

const Shot: React.FC<{ src: string; w: number; h: number; pos?: string }> = ({ src, w, h, pos = "top" }) => (
  <Glass style={{ padding: 12, borderRadius: 40 }}>
    <img src={staticFile(`products/${src}`)} style={{ width: w, height: h, objectFit: "cover", objectPosition: pos, borderRadius: 28, display: "block" }} />
  </Glass>
);

const Head: React.FC<{ n: string; tint: [string, string]; from: number; to: number; hi?: number[] }> = ({ n, tint, from, to, hi }) => (
  <div style={{ position: "absolute", left: 140, top: 110, display: "flex", alignItems: "center", gap: 28 }}>
    <NumBadge at={t(from)} n={n} tint={tint} size={110} />
    <Say from={from} to={to} hi={hi} size={64} align="left" />
  </div>
);

// ---------- 1. "price?" — you answer — no reply ----------

const Hook: React.FC = () => {
  const { frame, f } = useTime();
  const dots = interpolate(frame, [f(t(7)), f(t(7)) + 20, f(t(10)), f(t(10)) + 10], [0, 1, 1, 0], clamp);
  return (
    <>
      <Wash tone="blue" />
      <Appear at={t(0)} style={{ position: "absolute", left: 240, top: 150 }}>
        <Chat w={620} h={760}>
          <Bubble at={t(0)}>
            <Say from={0} to={1} size={48} align="left" />
          </Bubble>
          <Bubble at={t(4)} me>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Banknote size={40} color="#16A34A" strokeWidth={2.3} />
              <Skel w={160} strong />
            </div>
          </Bubble>
          <Appear at={t(6)} style={{ alignSelf: "flex-end", display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCheck size={34} color="#2563EB" strokeWidth={2.4} />
          </Appear>
          <div style={{ display: "flex", gap: 10, padding: "16px 22px", borderRadius: 24, background: "rgba(255,255,255,0.95)", alignSelf: "flex-start", opacity: dots }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 16, height: 16, borderRadius: 99, background: "#94A3B8", opacity: 0.4 + 0.6 * Math.abs(Math.sin(frame / 6 + i)) }} />
            ))}
          </div>
        </Chat>
      </Appear>
      <div style={{ position: "absolute", left: 1000, top: 300, width: 800, display: "flex", flexDirection: "column", gap: 34 }}>
        <Say from={0} to={3} hi={[0, 1]} size={60} align="left" />
        <Say from={4} to={6} size={60} align="left" />
        <Appear at={t(7)}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Say from={7} to={11} hi={[10, 11]} size={74} align="left" />
            <Pop at={t(11)}>
              <IconTile icon={X} tint={C.rose} size={80} />
            </Pop>
          </div>
        </Appear>
      </div>
    </>
  );
};

// ---------- 2. it happens every day ----------

const Daily: React.FC = () => (
  <>
    <Wash tone="rose" />
    <div style={{ position: "absolute", left: 360, top: 160, display: "flex", flexDirection: "column", gap: 18 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Appear key={i} at={t(12) + i * 0.1}>
          <Glass style={{ width: 760, padding: "16px 24px", display: "flex", alignItems: "center", gap: 20 }}>
            <IconTile icon={User} tint={[C.blue, C.violet, C.pink, C.teal, C.amber][i]} size={64} />
            <Skel w={260 - i * 20} strong />
            <CheckCheck size={34} color="#94A3B8" strokeWidth={2.4} style={{ marginLeft: "auto" }} />
          </Glass>
        </Appear>
      ))}
    </div>
    <Say from={12} to={14} hi={[12]} size={84} align="left" style={{ position: "absolute", left: 1200, top: 420, width: 640 }} />
  </>
);

// ---------- 3. mistake one: "price inbox" instead of the price ----------

const M1: React.FC = () => (
  <>
    <Wash tone="rose" />
    <Head n="১" tint={C.rose} from={15} to={21} hi={[16, 19, 20]} />
    <Appear at={t(18)} style={{ position: "absolute", left: 300, top: 270 }}>
      <Glass style={{ width: 760, padding: 26, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={staticFile("products/farha-fb.jpg")} style={{ width: 70, height: 70, borderRadius: 99, objectFit: "cover", objectPosition: "50% 22%" }} />
          <Skel w={200} strong />
        </div>
        <img src={staticFile("products/farha-fb.jpg")} style={{ width: "100%", height: 400, objectFit: "cover", objectPosition: "top", borderRadius: 18 }} />
        <Appear at={t(22)}>
          <div style={{ display: "inline-flex", padding: "10px 24px", borderRadius: 14, background: "rgba(255,241,242,0.95)", border: `3px solid #FDA4AF` }}>
            <Say from={22} to={24} hi={[22, 23]} size={46} align="left" />
          </div>
        </Appear>
      </Glass>
    </Appear>
    <Pop at={t(24)} style={{ position: "absolute", left: 1200, top: 420 }}>
      <IconTile icon={X} tint={C.rose} size={180} />
    </Pop>
  </>
);

// ---------- 4. customers suspect different prices for different people ----------

const Doubt: React.FC = () => (
  <>
    <Wash tone="amber" />
    <Say from={25} to={31} hi={[29, 30]} size={66} style={TOP} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 80 }}>
      {[C.blue, C.violet, C.pink].map((tint, i) => (
        <Appear key={i} at={t(27) + i * 0.15}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <IconTile icon={User} tint={tint} size={150} />
            <Pop at={t(29) + i * 0.12}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderRadius: 16, background: "rgba(255,255,255,0.95)", boxShadow: "0 8px 20px rgba(15,23,42,0.08)" }}>
                <Tag size={34} color={tint[1]} strokeWidth={2.4} />
                <Skel w={80 + i * 40} strong />
              </div>
            </Pop>
          </div>
        </Appear>
      ))}
    </div>
    <Appear at={t(32)} style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", justifyContent: "center", alignItems: "center", gap: 24 }}>
      <IconTile icon={HelpCircle} tint={C.amber} size={100} />
      <Say from={32} to={35} hi={[33]} size={72} />
    </Appear>
  </>
);

// ---------- 5. those who won't message just scroll past; you lose them ----------

const Scroll: React.FC = () => {
  const { frame, f } = useTime();
  const y = interpolate(frame, [f(t(43)), f(t(47)) + 20], [0, -180], clamp);
  const gone = useProgress(t(51), t(53));
  return (
    <>
      <Wash tone="violet" />
      <Say from={36} to={47} hi={[43, 44]} size={58} style={TOP} />
      <Appear at={t(36)} style={{ position: "absolute", left: 300, top: 260 }}>
        <Glass style={{ padding: 12, borderRadius: 40 }}>
          <div style={{ width: 420, height: 640, borderRadius: 28, overflow: "hidden" }}>
            <img src={staticFile("products/jk-fb.jpg")} style={{ width: 420, display: "block", transform: `translateY(${y}px)` }} />
          </div>
        </Glass>
      </Appear>
      <Appear at={t(48)} style={{ position: "absolute", left: 900, top: 420, width: 900, display: "flex", alignItems: "center", gap: 30 }}>
        <div style={{ opacity: 1 - 0.7 * gone }}>
          <IconTile icon={UserMinus} tint={C.rose} size={160} />
        </div>
        <Say from={48} to={53} hi={[52, 53]} size={66} align="left" />
      </Appear>
    </>
  );
};

// ---------- 6. mistake two: a bare price and nothing else ----------

const M2: React.FC = () => (
  <>
    <Wash tone="rose" />
    <Head n="২" tint={C.rose} from={54} to={56} hi={[55]} />
    <Appear at={t(57)} style={{ position: "absolute", left: 300, top: 280 }}>
      <Chat w={700} h={460}>
        <Bubble at={t(57)}>
          <Skel w={160} />
        </Bubble>
        <Bubble at={t(58)} me>
          <Say from={58} to={60} size={50} align="left" />
        </Bubble>
      </Chat>
    </Appear>
    <Appear at={t(61)} style={{ position: "absolute", left: 1120, top: 420, display: "flex", alignItems: "center", gap: 24 }}>
      <IconTile icon={X} tint={C.rose} size={120} />
      <Say from={57} to={63} hi={[61, 62, 63]} size={56} align="left" style={{ width: 560 }} />
    </Appear>
  </>
);

// ---------- 7. they see only the price, then compare on other pages ----------

const Compare: React.FC = () => (
  <>
    <Wash tone="amber" />
    <Say from={64} to={72} hi={[67, 70]} size={58} style={TOP} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 280, display: "flex", justifyContent: "center", alignItems: "center", gap: 40 }}>
      <Appear at={t(74)}>
        <Shot src="farha-fb.jpg" w={360} h={460} />
      </Appear>
      <Appear at={t(64)}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <IconTile icon={Eye} tint={C.blue} size={130} />
          <Pop at={t(78)}>
            <IconTile icon={ArrowLeftRight} tint={C.amber} size={100} />
          </Pop>
        </div>
      </Appear>
      <Appear at={t(75)}>
        <Shot src="jk-fb.jpg" w={360} h={460} />
      </Appear>
    </div>
    <Say from={73} to={79} hi={[77, 78]} size={52} style={{ position: "absolute", left: 120, right: 120, top: 900 }} />
  </>
);

// ---------- 8. your message asks nothing, so there's no reason to reply ----------

const NoQ: React.FC = () => (
  <>
    <Wash tone="violet" />
    <Appear at={t(80)} style={{ position: "absolute", left: 0, right: 0, top: 170, display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
      <IconTile icon={MessageCircle} tint={C.blue} size={110} />
      <Say from={80} to={85} hi={[84, 85]} size={72} />
    </Appear>
    <Pop at={t(84)} style={{ position: "absolute", left: 960 - 110, top: 360 }}>
      <Strike at={t(85)}>
        <IconTile icon={HelpCircle} tint={C.violet} size={220} />
      </Strike>
    </Pop>
    <Say from={86} to={92} hi={[88, 91, 92]} size={64} style={{ position: "absolute", left: 120, right: 120, top: 700 }} />
  </>
);

// ---------- 9. write it like this ----------

const LINES: [number, number, number[]][] = [
  [95, 100, [98, 99, 100]],
  [101, 111, [101, 102, 104, 105]],
  [112, 115, [113, 114]],
  [116, 121, []],
  [122, 125, [122, 123]],
  [126, 130, [127, 130]],
];

const Good: React.FC = () => (
  <>
    <Wash tone="green" />
    <div style={{ position: "absolute", left: 140, top: 100, display: "flex", alignItems: "center", gap: 24 }}>
      <CheckBadge size={80} />
      <Say from={93} to={94} hi={[93, 94]} size={72} align="left" />
    </div>
    <Appear at={t(95)} style={{ position: "absolute", left: 140, top: 220 }}>
      <div style={{ width: 1080, padding: "30px 40px", borderRadius: 36, borderBottomRightRadius: 10, background: "rgba(220,252,231,0.97)", boxShadow: "0 16px 40px rgba(22,163,74,0.16)", display: "flex", flexDirection: "column", gap: 18 }}>
        {LINES.map(([a, b, hi]) => (
          <Say key={a} from={a} to={b} hi={hi} size={44} align="left" />
        ))}
      </div>
    </Appear>
    <Appear at={t(96)} style={{ position: "absolute", left: 1300, top: 220 }}>
      <Shot src="farha-fb.jpg" w={460} h={320} />
    </Appear>
    <div style={{ position: "absolute", left: 1310, top: 620, display: "grid", gridTemplateColumns: "repeat(3, 150px)", gap: 24 }}>
      {[
        { i: 98, icon: Banknote, tint: C.green },
        { i: 101, icon: Briefcase, tint: C.violet },
        { i: 112, icon: Truck, tint: C.orange },
        { i: 122, icon: HandCoins, tint: C.teal },
        { i: 127, icon: Palette, tint: C.pink },
      ].map((c) => (
        <Pop key={c.i} at={t(c.i)}>
          <IconTile icon={c.icon} tint={c.tint} size={120} />
        </Pop>
      ))}
    </div>
  </>
);

// ---------- 10. price, benefits, delivery, and a question ----------

const Why: React.FC = () => (
  <>
    <Wash tone="blue" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 110, display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
      <IconTile icon={MessageCircle} tint={C.green} size={90} />
      <Say from={131} to={132} size={66} />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 260, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
      {[
        { a: 133, b: 134, icon: Banknote, tint: C.green },
        { a: 135, b: 137, icon: Briefcase, tint: C.violet },
        { a: 138, b: 140, icon: Truck, tint: C.orange },
        { a: 141, b: 144, icon: HelpCircle, tint: C.blue },
      ].map((r) => (
        <Appear key={r.a} at={t(r.a)}>
          <Glass active={r.a === 141 ? 1 : undefined} style={{ width: 900, padding: "18px 30px", display: "flex", alignItems: "center", gap: 26 }}>
            <IconTile icon={r.icon} tint={r.tint} size={84} />
            <Say from={r.a} to={r.b} hi={[r.b - 1]} size={52} align="left" />
            <Pop at={t(r.b)} style={{ marginLeft: "auto" }}>
              <CheckBadge size={56} />
            </Pop>
          </Glass>
        </Appear>
      ))}
    </div>
  </>
);

// ---------- 11. ask "which one?", not "will you take it?" ----------

const Ask: React.FC = () => (
  <>
    <Wash tone="teal" />
    <Say from={145} to={150} hi={[146, 150]} size={62} style={TOP} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 320, display: "flex", justifyContent: "center", gap: 60 }}>
      <Appear at={t(151)}>
        <Card w={720} h={420} style={{ background: "rgba(255,241,242,0.94)" }}>
          <IconTile icon={X} tint={C.rose} size={120} />
          <Say from={151} to={155} hi={[151, 152]} size={52} />
        </Card>
      </Appear>
      <Appear at={t(156)}>
        <Card w={720} h={420} active={1}>
          <CheckBadge size={110} />
          <Say from={156} to={159} hi={[158, 159]} size={56} />
        </Card>
      </Appear>
    </div>
  </>
);

// ---------- 12. no reply? one follow-up a few hours later ----------

const Follow: React.FC = () => {
  const { frame, f } = useTime();
  const spin = Math.max(0, frame - f(t(163))) * 6;
  return (
    <>
      <Wash tone="amber" />
      <Say from={160} to={169} hi={[163, 164, 166, 167, 168]} size={58} style={TOP} />
      <Appear at={t(163)} style={{ position: "absolute", left: 260, top: 330 }}>
        <div style={{ transform: `rotate(${spin}deg)` }}>
          <IconTile icon={Clock} tint={C.amber} size={200} />
        </div>
      </Appear>
      <Appear at={t(170)} style={{ position: "absolute", left: 620, top: 300 }}>
        <Chat w={1040} h={380}>
          <Bubble at={t(170)} me>
            <Say from={170} to={177} hi={[171, 173, 174]} size={46} align="left" />
          </Bubble>
        </Chat>
      </Appear>
      <Appear at={t(178)} style={{ position: "absolute", left: 0, right: 0, top: 790, display: "flex", justifyContent: "center" }}>
        <Glass style={{ padding: "18px 44px", borderRadius: 999 }}>
          <Say from={178} to={181} hi={[178]} size={56} />
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 13. better still: your own website ----------

const Site: React.FC = () => (
  <>
    <Wash tone="green" />
    <Say from={182} to={187} hi={[186, 187]} size={66} style={TOP} />
    <Appear at={t(186)} style={{ position: "absolute", left: 200, top: 240 }}>
      <Shot src="rk-home.jpg" w={420} h={600} />
    </Appear>
    <Appear at={t(188)} style={{ position: "absolute", left: 760, top: 240 }}>
      <Shot src="card-floral.jpg" w={330} h={490} />
    </Appear>
    <div style={{ position: "absolute", left: 1170, top: 260, display: "flex", flexDirection: "column", gap: 24 }}>
      {[
        { a: 189, b: 189, icon: Banknote, tint: C.green },
        { a: 190, b: 190, icon: Eye, tint: C.violet },
        { a: 192, b: 193, icon: CheckCheck, tint: C.blue },
      ].map((r) => (
        <Appear key={r.a} at={t(r.a)}>
          <Glass style={{ padding: "14px 26px", display: "flex", alignItems: "center", gap: 18 }}>
            <IconTile icon={r.icon} tint={r.tint} size={70} />
            <Say from={r.a} to={r.b} size={48} />
          </Glass>
        </Appear>
      ))}
      <Say from={194} to={197} hi={[195, 196]} size={50} align="left" />
    </div>
    <Appear at={t(198)} style={{ position: "absolute", left: 0, right: 0, top: 900, display: "flex", justifyContent: "center" }}>
      <Glass style={{ padding: "16px 40px", borderRadius: 999 }}>
        <Say from={198} to={204} hi={[200, 201]} size={46} />
      </Glass>
    </Appear>
  </>
);

// ---------- 14. start with Mudarabah ----------

const Cta: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(205)} rise={60} style={{ position: "absolute", left: 960 - 150, top: 120 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={300} />
        <Sweep from={t(205) + 0.2} to={t(205) + 1.2} />
      </div>
    </Appear>
    <Appear at={t(205)} style={{ position: "absolute", left: 0, right: 0, top: 520, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", padding: "26px 60px", borderRadius: 999, background: "linear-gradient(90deg, #16A34A, #0D9488)", boxShadow: "0 18px 40px rgba(22,163,74,0.35)", overflow: "hidden" }}>
        <Say from={205} to={211} size={68} style={{ filter: "brightness(0) invert(1)" }} />
        <Sweep from={t(210)} to={t(210) + 1} />
      </div>
    </Appear>
    <Appear at={t(212)} style={{ position: "absolute", left: 0, right: 0, top: 740, display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
      <Glass style={{ padding: "16px 36px", borderRadius: 999, display: "flex", alignItems: "center", gap: 18 }}>
        <Link2 size={40} color="#16A34A" strokeWidth={2.5} />
        <Say from={212} to={213} size={52} />
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
  daily: Daily,
  m1: M1,
  doubt: Doubt,
  scroll: Scroll,
  m2: M2,
  compare: Compare,
  noq: NoQ,
  good: Good,
  why: Why,
  ask: Ask,
  follow: Follow,
  site: Site,
  cta: Cta,
};
const ORDER = Object.keys(SCENE_START) as SceneKey[];
const PRE = 0.4;
export const TOTAL_SECONDS_17 = audioDuration + tail;
const NO_CORNER = new Set<SceneKey>(["cta"]);

const cues: Cue[] = [
  ...Object.values(SCENE_START).slice(1).map((i): Cue => [W[i] - 0.45, "whoosh"]),
  ...[0, 4, 22, 29, 58, 74, 75, 98, 101, 112, 122, 127, 151, 156, 170, 189, 190, 192].map((i): Cue => [W[i], "pop"]),
  ...[94, 134, 137, 140, 144, 159, 187, 211].map((i): Cue => [W[i], "ding"]),
  [W[11], "stamp"],
  [W[24], "stamp"],
  [W[63], "stamp"],
  [W[85], "stamp"],
];

export const Video17: React.FC = () => {
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
            const to = i === ORDER.length - 1 ? TOTAL_SECONDS_17 + 1 : W[SCENE_START[ORDER[i + 1]]] - PRE + overlap;
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
        <Audio src={staticFile("voiceover-2026-11-19.mp3")} />
        <SfxTrack cues={cues} />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
