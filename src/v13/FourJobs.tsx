// Store ad, second voice (2026-11-16): "a website is more than an address — it has four jobs"
// → the four jobs → what Mudarabah's store gives → start on a monthly subscription.
// Every line on screen is a range of spoken words (see ../v11/sayf.tsx).
import React from "react";
import { Audio } from "@remotion/media";
import {
  AlertTriangle,
  Banknote,
  BarChart3,
  CheckCircle2,
  Eye,
  Globe,
  Inbox,
  Lock,
  Megaphone,
  Package,
  Palette,
  Percent,
  Rocket,
  Server,
  ShoppingCart,
  Store,
  TrendingUp,
  Truck,
  User,
} from "lucide-react";
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, CheckBadge, Float, Glass, IconTile, LogoCard, LogoMark, PaletteProvider, Pop, Scene, useProgress, useTime } from "../components/kit";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import { design, fonts, greenPalette, motion } from "../theme";
import { Skel, Strike } from "../v2/ui";
import { Sweep } from "../v4/parts";
import { makeSay } from "../v11/sayf";
import { C, NumBadge, Wash } from "../v11/ui";
import { OrderPhone } from "../v12/Store";
import { audioDuration, SCENE_START, tail, W, WORDS, type SceneKey } from "./timeline";

const { t, Say } = makeSay(W, WORDS, { 106: "Built-in", 107: "" });
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
type Tone = "green" | "teal" | "blue" | "amber" | "pink" | "violet" | "rose";
const ARROW: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 800, fontSize: 90, color: "#94A3B8" };

// Numbered title row used by the four jobs and the store features.
const Head: React.FC<{ n?: string; tint?: [string, string]; at?: number; from: number; to: number; hi?: number[]; size?: number }> = ({ n, tint, at, from, to, hi, size = 64 }) => (
  <div style={{ position: "absolute", left: 140, top: 120, width: 1600, display: "flex", alignItems: "center", gap: 30 }}>
    {n ? <NumBadge at={at ?? t(from)} n={n} tint={tint} size={120} /> : null}
    <Say from={from} to={to} hi={hi} size={size} align="left" />
  </div>
);

const Sub: React.FC<{ from: number; to: number; hi?: number[]; top?: number }> = ({ from, to, hi, top = 850 }) => (
  <Appear at={t(from)} style={{ position: "absolute", left: 140, right: 140, top, display: "flex", justifyContent: "center" }}>
    <Glass style={{ padding: "18px 40px", borderRadius: 999 }}>
      <Say from={from} to={to} hi={hi} size={46} />
    </Glass>
  </Appear>
);

const Card: React.FC<{ w?: number; h?: number; active?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w = 320, h = 300, active, children, style }) => (
  <Glass active={active} style={{ width: w, height: h, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, position: "relative", ...style }}>
    {children}
  </Glass>
);

// ---------- 1. want to start selling online? ----------

const Hook: React.FC = () => (
  <>
    <Wash tone="blue" />
    <Appear at={t(0)} style={{ position: "absolute", left: 960 - 90, top: 230 }}>
      <Float amp={8}>
        <IconTile icon={Store} tint={C.green} size={180} />
      </Float>
    </Appear>
    <Say from={0} to={4} hi={[0, 1]} size={96} style={{ position: "absolute", left: 0, right: 0, top: 500 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 680, display: "flex", justifyContent: "center", gap: 24 }}>
      {[C.blue, C.violet, C.pink, C.amber].map((tint, i) => (
        <Pop key={i} at={t(2) + i * 0.12}>
          <div style={{ width: 22, height: 22, borderRadius: 99, background: `linear-gradient(160deg, ${tint[0]}, ${tint[1]})` }} />
        </Pop>
      ))}
    </div>
  </>
);

// ---------- 2. but a website seems to mean lots of money and hassle ----------

const Fear: React.FC = () => (
  <>
    <Wash tone="rose" />
    <div style={{ position: "absolute", left: 140, top: 130, display: "flex", alignItems: "center", gap: 26 }}>
      <IconTile icon={Globe} tint={C.sky} size={100} />
      <Say from={5} to={9} hi={[8]} size={70} align="left" />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center", gap: 90 }}>
      <Appear at={t(10)}>
        <Card w={560} h={400}>
          <Float amp={6}>
            <IconTile icon={Banknote} tint={C.amber} size={150} />
          </Float>
          <Say from={10} to={11} hi={[11]} size={62} />
        </Card>
      </Appear>
      <Appear at={t(12)}>
        <Card w={560} h={400} style={{ background: "rgba(255,241,242,0.92)" }}>
          <Float amp={6}>
            <IconTile icon={AlertTriangle} tint={C.rose} size={150} />
          </Float>
          <Say from={12} to={14} hi={[14]} size={62} />
        </Card>
      </Appear>
    </div>
  </>
);

// ---------- 3. a website is not just an address; it has four real jobs ----------

const More: React.FC = () => {
  const out = useProgress(t(21) - 0.2, t(21) + 0.4);
  return (
    <>
      <Wash tone="violet" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 160, display: "flex", flexDirection: "column", alignItems: "center", gap: 40, opacity: 1 - 0.55 * out, transform: `scale(${1 - 0.12 * out})` }}>
        <Appear at={t(15)}>
          <Glass style={{ width: 900, padding: "22px 30px", borderRadius: 999, display: "flex", alignItems: "center", gap: 18 }}>
            <Globe size={44} color="#7C3AED" strokeWidth={2.3} />
            <Skel w={420} strong />
          </Glass>
        </Appear>
        <Say from={15} to={20} hi={[19]} size={64} />
      </div>
      <Say from={21} to={24} hi={[22, 24]} size={86} style={{ position: "absolute", left: 0, right: 0, top: 560 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 740, display: "flex", justifyContent: "center", gap: 30 }}>
        {[C.green, C.blue, C.orange, C.violet].map((tint, i) => (
          <NumBadge key={i} at={t(24) + i * 0.12} n={["১", "২", "৩", "৪"][i]} tint={tint} size={110} />
        ))}
      </div>
    </>
  );
};

// ---------- 4–7. the four jobs ----------

const J1: React.FC = () => (
  <>
    <Wash tone="green" />
    <Head n="১" tint={C.green} from={25} to={31} hi={[28, 29]} />
    <Appear at={t(26)} style={{ position: "absolute", left: 360, top: 300 }}>
      <OrderPhone tapAt={t(29)} width={330} />
    </Appear>
    <Pop at={t(26)} style={{ position: "absolute", left: 980, top: 440 }}>
      <IconTile icon={User} tint={C.blue} size={160} />
    </Pop>
    <Pop at={t(29) + 0.3} style={{ position: "absolute", left: 1220, top: 450 }}>
      <CheckBadge size={140} />
    </Pop>
  </>
);

const J2: React.FC = () => {
  const go = useProgress(t(36), t(39) + 0.3);
  return (
    <>
      <Wash tone="blue" />
      <Head n="২" tint={C.blue} from={32} to={39} hi={[36, 37]} />
      <Appear at={t(33)} style={{ position: "absolute", left: 300, top: 380 }}>
        <Card>
          <IconTile icon={ShoppingCart} tint={C.violet} size={140} />
        </Card>
      </Appear>
      <div style={{ position: "absolute", left: 680, top: 510, width: 560, height: 10, borderRadius: 9, background: "rgba(147,197,253,0.5)" }} />
      <div style={{ position: "absolute", left: 680 + 500 * go, top: 485, opacity: go > 0 && go < 1 ? 1 : 0 }}>
        <IconTile icon={Package} tint={C.blue} size={60} />
      </div>
      <Appear at={t(37)} style={{ position: "absolute", left: 1280, top: 380 }}>
        <Card active={go}>
          <IconTile icon={Inbox} tint={C.green} size={140} />
          <Pop at={t(39)} style={{ position: "absolute", right: -20, top: -20 }}>
            <CheckBadge size={80} />
          </Pop>
        </Card>
      </Appear>
    </>
  );
};

const J3: React.FC = () => {
  const drive = useProgress(t(45), t(47) + 0.8);
  return (
    <>
      <Wash tone="amber" />
      <Head n="৩" tint={C.orange} from={40} to={47} hi={[43, 44, 45]} />
      <Appear at={t(41)} style={{ position: "absolute", left: 240, top: 400 }}>
        <IconTile icon={Package} tint={C.orange} size={170} />
      </Appear>
      <div style={{ position: "absolute", left: 460, top: 620, width: 1220, height: 14, borderRadius: 9, background: "repeating-linear-gradient(90deg, #FDBA74 0 40px, transparent 40px 70px)" }} />
      <Appear at={t(45)} rise={0} style={{ position: "absolute", left: 480 + 1000 * drive, top: 440 }}>
        <IconTile icon={Truck} tint={C.green} size={170} />
      </Appear>
    </>
  );
};

const J4: React.FC = () => {
  const pick = useProgress(t(57), t(58) + 0.3);
  return (
    <>
      <Wash tone="violet" />
      <Head n="৪" tint={C.violet} at={t(49)} from={48} to={58} hi={[51, 57, 58]} size={58} />
      <Appear at={t(51)} style={{ position: "absolute", left: 220, top: 400 }}>
        <Float amp={6}>
          <IconTile icon={Megaphone} tint={C.violet} size={170} />
        </Float>
      </Appear>
      <div style={{ position: "absolute", left: 560, top: 420, display: "flex", gap: 34 }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const buyer = i === 2;
          return (
            <Pop key={i} at={t(55) + i * 0.08}>
              <div style={{ position: "relative", opacity: buyer ? 1 : 1 - 0.55 * pick, transform: `scale(${buyer ? 1 + 0.15 * pick : 1})` }}>
                <IconTile icon={User} tint={buyer ? C.green : C.sky} size={160} />
                {buyer ? (
                  <Pop at={t(58)} style={{ position: "absolute", right: -16, top: -16 }}>
                    <CheckBadge size={60} />
                  </Pop>
                ) : null}
              </div>
            </Pop>
          );
        })}
      </div>
    </>
  );
};

// ---------- 8. when these four work, the site sells ----------

const Sum: React.FC = () => {
  const up = useProgress(t(65), t(68) + 0.6);
  return (
    <>
      <Wash tone="green" />
      <div style={{ position: "absolute", left: 220, top: 260, display: "flex", flexDirection: "column", gap: 22 }}>
        {[C.green, C.blue, C.orange, C.violet].map((tint, i) => (
          <Appear key={i} at={t(59) + i * 0.15}>
            <Glass style={{ width: 520, padding: "18px 24px", display: "flex", alignItems: "center", gap: 20 }}>
              <NumBadge at={t(59) + i * 0.15} n={["১", "২", "৩", "৪"][i]} tint={tint} size={64} />
              <Skel w={240} strong />
              <Pop at={t(62) + i * 0.1} style={{ marginLeft: "auto" }}>
                <CheckCircle2 size={44} color="#16A34A" strokeWidth={2.4} />
              </Pop>
            </Glass>
          </Appear>
        ))}
      </div>
      <Appear at={t(64)} style={{ position: "absolute", left: 900, top: 240 }}>
        <Glass style={{ width: 800, height: 470, padding: 36, display: "flex", alignItems: "flex-end", gap: 26 }}>
          {[0.25, 0.4, 0.55, 0.75, 0.95].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h * 100 * interpolate(up, [i * 0.1, i * 0.1 + 0.5], [0, 1], clamp)}%`, borderRadius: 14, background: "linear-gradient(180deg, #86EFAC, #16A34A)" }} />
          ))}
          <div style={{ position: "absolute", right: 30, top: 26 }}>
            <IconTile icon={TrendingUp} tint={C.green} size={80} />
          </div>
        </Glass>
      </Appear>
      <Say from={59} to={68} hi={[64, 67]} size={56} style={{ position: "absolute", left: 120, right: 120, top: 820 }} />
    </>
  );
};

// ---------- 9. Mudarabah's store has these ----------

const Brand: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(69)} rise={70} scaleFrom={0.9} style={{ position: "absolute", left: 960 - 160, top: 170 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={320} />
        <Sweep from={t(69) + 0.2} to={t(69) + 1.2} />
      </div>
    </Appear>
    <Say from={69} to={77} hi={[76]} size={60} style={{ position: "absolute", top: 580, left: 0, right: 0 }} />
  </>
);

// ---------- 10. pick a theme, add products, store live ----------

const Launch: React.FC = () => {
  const steps = [
    { a: 78, b: 80, icon: Palette, tint: C.pink },
    { a: 81, b: 82, icon: Package, tint: C.orange },
    { a: 83, b: 84, icon: Rocket, tint: C.green },
  ];
  return (
    <>
      <Wash tone="pink" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", alignItems: "center", gap: 36 }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            {i > 0 ? (
              <Appear at={t(s.a)}>
                <div style={ARROW}>→</div>
              </Appear>
            ) : null}
            <Appear at={t(s.a)}>
              <Card w={420} h={420} active={i === 2 ? 1 : undefined}>
                <Float amp={6}>
                  <IconTile icon={s.icon} tint={s.tint} size={150} />
                </Float>
                <Say from={s.a} to={s.b} hi={[s.a]} size={54} />
              </Card>
            </Appear>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

// ---------- 11. Steadfast courier booking from the dashboard ----------

const Courier: React.FC = () => (
  <>
    <Wash tone="amber" />
    <Head from={85} to={91} hi={[85, 90]} size={62} />
    <Appear at={t(87)} style={{ position: "absolute", left: 220, top: 300 }}>
      <Glass style={{ width: 900, padding: 26, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <IconTile icon={BarChart3} tint={C.orange} size={70} />
          <Skel w={220} strong />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 18px", borderRadius: 16, background: "rgba(255,247,237,0.95)" }}>
            <Package size={36} color="#EA580C" strokeWidth={2.3} />
            <Skel w={200 - i * 20} strong />
            <Pop at={t(88) + i * 0.2} style={{ marginLeft: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 999, background: "linear-gradient(90deg, #22C55E, #16A34A)" }}>
                <Truck size={28} color="white" strokeWidth={2.4} />
                <CheckBadge size={30} />
              </div>
            </Pop>
          </div>
        ))}
      </Glass>
    </Appear>
    <Pop at={t(85)} style={{ position: "absolute", left: 1260, top: 360 }}>
      <IconTile icon={Truck} tint={C.green} size={220} />
    </Pop>
    <Sub from={92} to={97} hi={[96, 97]} />
  </>
);

// ---------- 12. Pixel, server-side tracking and catalog feed are built in ----------

const Track: React.FC = () => {
  const chips = [
    { a: 98, b: 98, icon: Eye, tint: C.blue },
    { a: 99, b: 101, icon: Server, tint: C.teal },
    { a: 103, b: 104, icon: ShoppingCart, tint: C.violet },
  ];
  return (
    <>
      <Wash tone="teal" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 230, display: "flex", justifyContent: "center", gap: 40 }}>
        {chips.map((c, i) => (
          <Appear key={i} at={t(c.a)}>
            <Card w={480} h={380}>
              <IconTile icon={c.icon} tint={c.tint} size={140} />
              <Say from={c.a} to={c.b} size={50} />
              <Pop at={t(106)} style={{ position: "absolute", right: -18, top: -18 }}>
                <CheckBadge size={70} />
              </Pop>
            </Card>
          </Appear>
        ))}
      </div>
      <Appear at={t(105)} style={{ position: "absolute", left: 0, right: 0, top: 720, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", padding: "20px 56px", borderRadius: 999, background: "linear-gradient(90deg, #0D9488, #16A34A)", boxShadow: "0 18px 40px rgba(13,148,136,0.3)", overflow: "hidden" }}>
          <Say from={105} to={107} size={66} style={{ filter: "brightness(0) invert(1)" }} />
          <Sweep from={t(106)} to={t(106) + 1} />
        </div>
      </Appear>
    </>
  );
};

// ---------- 13. orders and accounts in one place ----------

const Books: React.FC = () => {
  const join = useProgress(t(111), t(112) + 0.5);
  return (
    <>
      <Wash tone="violet" />
      <Say from={108} to={112} hi={[108, 110, 112]} size={80} style={{ position: "absolute", left: 0, right: 0, top: 130 }} />
      <Appear at={t(108)} style={{ position: "absolute", left: 420 + 240 * join, top: 380 }}>
        <Card w={340} h={340}>
          <IconTile icon={ShoppingCart} tint={C.blue} size={140} />
        </Card>
      </Appear>
      <Appear at={t(110)} style={{ position: "absolute", left: 1160 - 240 * join, top: 380 }}>
        <Card w={340} h={340}>
          <IconTile icon={BarChart3} tint={C.violet} size={140} />
        </Card>
      </Appear>
      <Pop at={t(112) + 0.3} style={{ position: "absolute", left: 960 - 50, top: 760 }}>
        <CheckBadge size={100} />
      </Pop>
    </>
  );
};

// ---------- 14. no commission; no big sum locked up ----------

const Money: React.FC = () => (
  <>
    <Wash tone="pink" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 200, display: "flex", justifyContent: "center", gap: 60 }}>
      <Appear at={t(113)}>
        <Card w={740} h={480}>
          <Strike at={t(117)}>
            <IconTile icon={Percent} tint={C.pink} size={160} />
          </Strike>
          <Say from={113} to={117} hi={[116, 117]} size={54} />
        </Card>
      </Appear>
      <Appear at={t(118)}>
        <Card w={740} h={480}>
          <Strike at={t(125)}>
            <div style={{ display: "flex", gap: 10 }}>
              <IconTile icon={Banknote} tint={C.amber} size={160} />
              <IconTile icon={Lock} tint={C.rose} size={100} />
            </div>
          </Strike>
          <Say from={118} to={125} hi={[124, 125]} size={50} />
        </Card>
      </Appear>
    </div>
  </>
);

// ---------- 15. start on a monthly subscription ----------

const Cta: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(126)} rise={60} style={{ position: "absolute", left: 960 - 160, top: 150 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={320} />
        <Sweep from={t(126) + 0.2} to={t(126) + 1.2} />
      </div>
    </Appear>
    <Appear at={t(126)} style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", padding: "28px 64px", borderRadius: 999, background: "linear-gradient(90deg, #16A34A, #0D9488)", boxShadow: "0 18px 40px rgba(22,163,74,0.35)", overflow: "hidden" }}>
        <Say from={126} to={130} size={78} style={{ filter: "brightness(0) invert(1)" }} />
        <Sweep from={t(129)} to={t(129) + 1} />
      </div>
    </Appear>
  </>
);

// ---------- assembly ----------

const SCENES: Record<SceneKey, React.FC> = { hook: Hook, fear: Fear, more: More, j1: J1, j2: J2, j3: J3, j4: J4, sum: Sum, brand: Brand, launch: Launch, courier: Courier, track: Track, books: Books, money: Money, cta: Cta };
const ORDER = Object.keys(SCENE_START) as SceneKey[];
const PRE = 0.4;
export const TOTAL_SECONDS_13 = audioDuration + tail;
const NO_CORNER = new Set<SceneKey>(["brand", "cta"]);

const cues: Cue[] = [
  ...Object.values(SCENE_START).slice(1).map((i): Cue => [W[i] - 0.45, "whoosh"]),
  ...[10, 12, 24, 29, 39, 45, 58, 78, 81, 83, 88, 98, 99, 103, 108, 110].map((i): Cue => [W[i], "pop"]),
  ...[4, 68, 77, 84, 106, 112, 129].map((i): Cue => [W[i], "ding"]),
  [W[117], "stamp"],
  [W[125], "stamp"],
];

export const Video13: React.FC = () => {
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
            const to = i === ORDER.length - 1 ? TOTAL_SECONDS_13 + 1 : W[SCENE_START[ORDER[i + 1]]] - PRE + overlap;
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
        <Audio src={staticFile("voiceover-2026-11-16b.mp3")} />
        <SfxTrack cues={cues} />
      </AbsoluteFill>
    </PaletteProvider>
  );
};

