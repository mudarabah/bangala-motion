// Store ad, fourth voice (2026-11-16): customers hesitate on a new page → a tidy website removes the
// doubt → Mudarabah's own website: premium theme, clear product page, easy order form → start today.
// Every line on screen is a range of spoken words (see ../v11/sayf.tsx).
import React from "react";
import { Audio } from "@remotion/media";
import { BadgeCheck, BarChart3, HelpCircle, Image as ImageIcon, Package, Palette, Percent, ShieldCheck, Sparkles, Truck, User } from "lucide-react";
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, CheckBadge, Float, Glass, IconTile, LogoCard, LogoMark, PaletteProvider, Pop, Scene, useProgress } from "../components/kit";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import { design, greenPalette, motion } from "../theme";
import { Skel, Strike } from "../v2/ui";
import { Sweep } from "../v4/parts";
import { makeSay } from "../v11/sayf";
import { C, Wash } from "../v11/ui";
import { audioDuration, SCENE_START, tail, W, WORDS, type SceneKey } from "./timeline";

const { t, Say } = makeSay(W, WORDS, { 39: "Mudarabah" });
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TOP: React.CSSProperties = { position: "absolute", left: 120, right: 120, top: 110 };

const Card: React.FC<{ w?: number; h?: number; active?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w = 320, h = 300, active, children, style }) => (
  <Glass active={active} style={{ width: w, height: h, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, position: "relative", ...style }}>
    {children}
  </Glass>
);

const GreenPill: React.FC<{ from: number; to: number; size?: number; sweepAt: number }> = ({ from, to, size = 70, sweepAt }) => (
  <div style={{ position: "relative", padding: "24px 56px", borderRadius: 999, background: "linear-gradient(90deg, #16A34A, #0D9488)", boxShadow: "0 18px 40px rgba(22,163,74,0.35)", overflow: "hidden" }}>
    <Say from={from} to={to} size={size} style={{ filter: "brightness(0) invert(1)" }} />
    <Sweep from={sweepAt} to={sweepAt + 1} />
  </div>
);

// Mini product page; img/price/ship/button are the times each part appears.
const ProductPage: React.FC<{ w: number; img: number; price: number; ship: number; button?: number }> = ({ w, img, price, ship, button }) => (
  <Glass style={{ width: w, padding: 22, display: "flex", gap: 26 }}>
    <Appear at={img} rise={0}>
      <img src={staticFile("products/earrings-green.jpg")} style={{ width: w * 0.44, height: w * 0.52, objectFit: "cover", borderRadius: 18 }} />
    </Appear>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20, paddingTop: 14 }}>
      <Skel w={w * 0.34} strong />
      <Pop at={price}>
        <div style={{ width: w * 0.2, height: 44, borderRadius: 12, background: "linear-gradient(90deg, #86EFAC, #16A34A)" }} />
      </Pop>
      <Appear at={ship}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Truck size={34} color="#EA580C" strokeWidth={2.3} />
          <Skel w={w * 0.2} />
        </div>
      </Appear>
      <Skel w={w * 0.3} />
      <Skel w={w * 0.26} />
      {button !== undefined ? (
        <Pop at={button} style={{ marginTop: "auto" }}>
          <div style={{ height: 60, borderRadius: 30, background: "linear-gradient(90deg, #7C3AED, #4F46E5)" }} />
        </Pop>
      ) : null}
    </div>
  </Glass>
);

// ---------- 1. on a new page, the customer hesitates ----------

const Hook: React.FC = () => {
  const stop = useProgress(t(8), t(9) + 0.3);
  return (
    <>
      <Wash tone="amber" />
      <Appear at={t(0)} style={{ position: "absolute", left: 220, top: 200 }}>
        <Glass style={{ width: 620, padding: 16 }}>
          <img src={staticFile("products/fb-page.jpg")} style={{ width: "100%", height: 560, objectFit: "cover", objectPosition: "top", borderRadius: 20 }} />
        </Glass>
      </Appear>
      <Appear at={t(6)} style={{ position: "absolute", left: 1040, top: 260 }}>
        <div style={{ transform: `translateX(${-60 * stop}px)` }}>
          <IconTile icon={User} tint={C.blue} size={190} />
        </div>
      </Appear>
      <Pop at={t(8)} style={{ position: "absolute", left: 1280, top: 230 }}>
        <IconTile icon={HelpCircle} tint={C.amber} size={120} />
      </Pop>
      <Say from={0} to={9} hi={[7, 8]} size={60} align="left" style={{ position: "absolute", left: 1000, top: 560, width: 800 }} />
    </>
  );
};

// ---------- 2. is the page real? will the product arrive? ----------

const Doubt: React.FC = () => (
  <>
    <Wash tone="rose" />
    <div style={{ position: "absolute", left: 0, right: 0, top: 230, display: "flex", justifyContent: "center", gap: 70 }}>
      {[
        { a: 10, b: 12, icon: ShieldCheck, tint: C.blue },
        { a: 13, b: 16, icon: Package, tint: C.orange },
      ].map((c) => (
        <Appear key={c.a} at={t(c.a)}>
          <Card w={680} h={520}>
            <div style={{ position: "relative" }}>
              <Float amp={6}>
                <IconTile icon={c.icon} tint={c.tint} size={170} />
              </Float>
              <Pop at={t(c.b)} style={{ position: "absolute", right: -40, top: -40 }}>
                <IconTile icon={HelpCircle} tint={C.rose} size={90} />
              </Pop>
            </div>
            <Say from={c.a} to={c.b} hi={[c.a + 1]} size={64} />
          </Card>
        </Appear>
      ))}
    </div>
  </>
);

// ---------- 3. a tidy website removes much of the doubt ----------

const Calm: React.FC = () => {
  const fade = useProgress(t(22), t(24) + 0.4);
  return (
    <>
      <Wash tone="green" />
      <Say from={17} to={24} hi={[18, 22, 23]} size={62} style={TOP} />
      <Appear at={t(17)} style={{ position: "absolute", left: 260, top: 300 }}>
        <Glass style={{ width: 900, padding: 16 }}>
          <img src={staticFile("products/site-mudarabah.jpg")} style={{ width: "100%", height: 520, objectFit: "cover", objectPosition: "50% 10%", borderRadius: 18 }} />
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 1320, top: 360, display: "flex", flexDirection: "column", gap: 30 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ opacity: 1 - fade, transform: `scale(${1 - 0.5 * fade})` }}>
            <Pop at={t(20) + i * 0.1}>
              <IconTile icon={HelpCircle} tint={C.rose} size={100} />
            </Pop>
          </div>
        ))}
      </div>
      <Pop at={t(23)} style={{ position: "absolute", left: 1330, top: 460 }}>
        <IconTile icon={BadgeCheck} tint={C.green} size={180} />
      </Pop>
    </>
  );
};

// ---------- 4. photo, price, delivery charge all clearly written ----------

const Clear: React.FC = () => (
  <>
    <Wash tone="blue" />
    <Say from={25} to={33} hi={[26, 27, 28, 29, 31]} size={58} style={TOP} />
    <Appear at={t(25)} style={{ position: "absolute", left: 220, top: 280 }}>
      <ProductPage w={900} img={t(26)} price={t(27)} ship={t(28)} />
    </Appear>
    <div style={{ position: "absolute", left: 1240, top: 300, display: "flex", flexDirection: "column", gap: 30 }}>
      {[
        { i: 26, j: 26, icon: ImageIcon, tint: C.violet },
        { i: 27, j: 27, icon: BarChart3, tint: C.green },
        { i: 28, j: 29, icon: Truck, tint: C.orange },
      ].map((r) => (
        <Appear key={r.i} at={t(r.i)}>
          <Glass style={{ padding: "16px 26px", display: "flex", alignItems: "center", gap: 18 }}>
            <IconTile icon={r.icon} tint={r.tint} size={74} />
            <Say from={r.i} to={r.j} size={48} />
            <Pop at={t(31)}>
              <CheckBadge size={44} />
            </Pop>
          </Glass>
        </Appear>
      ))}
    </div>
  </>
);

// ---------- 5. the customer sees a serious business ----------

const Serious: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(34)} style={{ position: "absolute", left: 960 - 95, top: 200 }}>
      <div style={{ position: "relative" }}>
        <IconTile icon={User} tint={C.blue} size={190} />
        <Pop at={t(38)} style={{ position: "absolute", right: -30, top: -30 }}>
          <CheckBadge size={90} />
        </Pop>
      </div>
    </Appear>
    <Say from={34} to={38} hi={[37, 38]} size={92} style={{ position: "absolute", left: 120, right: 120, top: 520 }} />
  </>
);

// ---------- 6. your own website at Mudarabah ----------

const Brand: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(39)} rise={70} scaleFrom={0.9} style={{ position: "absolute", left: 960 - 160, top: 170 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={320} />
        <Sweep from={t(39) + 0.2} to={t(39) + 1.2} />
      </div>
    </Appear>
    <Say from={39} to={43} hi={[42, 43]} size={74} style={{ position: "absolute", top: 580, left: 0, right: 0 }} />
  </>
);

// ---------- 7. a premium theme looks like its own brand ----------

const Theme: React.FC = () => {
  const swap = useProgress(t(46), t(48));
  const themes = [
    ["#F9A8D4", "#DB2777"],
    ["#C4B5FD", "#7C3AED"],
    ["#86EFAC", "#16A34A"],
  ];
  const k = Math.min(2, Math.floor(swap * 3));
  return (
    <>
      <Wash tone="violet" />
      <Say from={44} to={50} hi={[44, 45, 49]} size={62} style={TOP} />
      <Appear at={t(44)} style={{ position: "absolute", left: 300, top: 290 }}>
        <Glass style={{ width: 900, height: 560, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ height: 90, borderRadius: 18, background: `linear-gradient(90deg, ${themes[k][0]}, ${themes[k][1]})`, display: "flex", alignItems: "center", padding: "0 26px", gap: 16 }}>
            <div style={{ width: 50, height: 50, borderRadius: 99, background: "rgba(255,255,255,0.9)" }} />
            <div style={{ width: 200, height: 16, borderRadius: 9, background: "rgba(255,255,255,0.85)" }} />
          </div>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ borderRadius: 16, overflow: "hidden", background: "rgba(248,250,252,0.95)", display: "flex", flexDirection: "column" }}>
                <img src={staticFile(i === 1 ? "products/earrings.jpg" : "products/earrings-green.jpg")} style={{ width: "100%", height: 250, objectFit: "cover" }} />
                <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                  <Skel w={160} strong />
                  <div style={{ width: 90, height: 30, borderRadius: 9, background: themes[k][1], opacity: 0.85 }} />
                </div>
              </div>
            ))}
          </div>
        </Glass>
      </Appear>
      <div style={{ position: "absolute", left: 1300, top: 330, display: "flex", flexDirection: "column", gap: 30, alignItems: "center" }}>
        <Pop at={t(44)}>
          <IconTile icon={Palette} tint={C.pink} size={150} />
        </Pop>
        <Pop at={t(49)}>
          <IconTile icon={Sparkles} tint={C.violet} size={150} />
        </Pop>
      </div>
    </>
  );
};

// ---------- 8. clear product page and an easy order form ----------

const Form: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Say from={51} to={57} hi={[52, 53, 56, 57]} size={62} style={TOP} />
    <Appear at={t(51)} style={{ position: "absolute", left: 160, top: 290 }}>
      <ProductPage w={860} img={t(51)} price={t(52)} ship={t(53)} button={t(53)} />
    </Appear>
    <Appear at={t(55)} style={{ position: "absolute", left: 1120, top: 290 }}>
      <Glass active={1} style={{ width: 640, padding: 30, display: "flex", flexDirection: "column", gap: 20 }}>
        {[0, 1, 2].map((i) => (
          <Appear key={i} at={t(55) + i * 0.12}>
            <div style={{ height: 70, borderRadius: 16, border: "3px solid #E2E8F0", background: "white", display: "flex", alignItems: "center", padding: "0 20px" }}>
              <Skel w={180 - i * 20} />
            </div>
          </Appear>
        ))}
        <Pop at={t(57)}>
          <div style={{ height: 76, borderRadius: 38, background: "linear-gradient(90deg, #16A34A, #0D9488)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckBadge size={44} />
          </div>
        </Pop>
      </Glass>
    </Appear>
  </>
);

// ---------- 9. courier booking and order accounts in one place ----------

const Ops: React.FC = () => {
  const join = useProgress(t(63), t(64) + 0.5);
  return (
    <>
      <Wash tone="amber" />
      <Say from={58} to={64} hi={[58, 59, 62, 64]} size={62} style={TOP} />
      <Appear at={t(58)} style={{ position: "absolute", left: 360 + 150 * join, top: 340 }}>
        <Card w={420} h={420}>
          <IconTile icon={Truck} tint={C.orange} size={160} />
          <Say from={58} to={59} size={46} />
        </Card>
      </Appear>
      <Appear at={t(61)} style={{ position: "absolute", left: 1140 - 150 * join, top: 340 }}>
        <Card w={420} h={420}>
          <IconTile icon={BarChart3} tint={C.violet} size={160} />
          <Say from={61} to={62} size={46} />
        </Card>
      </Appear>
      <Pop at={t(64) + 0.3} style={{ position: "absolute", left: 960 - 55, top: 800 }}>
        <CheckBadge size={110} />
      </Pop>
    </>
  );
};

// ---------- 10. no commission ----------

const NoCom: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Appear at={t(65)} style={{ position: "absolute", left: 960 - 450, top: 200 }}>
      <Card w={900} h={600}>
        <Strike at={t(69)}>
          <IconTile icon={Percent} tint={C.pink} size={220} />
        </Strike>
        <Say from={65} to={69} hi={[68, 69]} size={72} />
      </Card>
    </Appear>
  </>
);

// ---------- 11. start your own website today ----------

const Cta: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(70)} rise={60} style={{ position: "absolute", left: 960 - 160, top: 150 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={320} />
        <Sweep from={t(70) + 0.2} to={t(70) + 1.2} />
      </div>
    </Appear>
    <Appear at={t(70)} style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center" }}>
      <GreenPill from={70} to={74} size={80} sweepAt={t(73)} />
    </Appear>
  </>
);

// ---------- assembly ----------

const SCENES: Record<SceneKey, React.FC> = { hook: Hook, doubt: Doubt, calm: Calm, clear: Clear, serious: Serious, brand: Brand, theme: Theme, form: Form, ops: Ops, nocom: NoCom, cta: Cta };
const ORDER = Object.keys(SCENE_START) as SceneKey[];
const PRE = 0.4;
export const TOTAL_SECONDS_15 = audioDuration + tail;
const NO_CORNER = new Set<SceneKey>(["brand", "cta"]);

const cues: Cue[] = [
  ...Object.values(SCENE_START).slice(1).map((i): Cue => [W[i] - 0.45, "whoosh"]),
  ...[6, 8, 12, 16, 20, 26, 27, 28, 44, 49, 55, 58, 61].map((i): Cue => [W[i], "pop"]),
  ...[23, 31, 38, 43, 57, 64, 73].map((i): Cue => [W[i], "ding"]),
  [W[69], "stamp"],
];

export const Video15: React.FC = () => {
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
            const to = i === ORDER.length - 1 ? TOTAL_SECONDS_15 + 1 : W[SCENE_START[ORDER[i + 1]]] - PRE + overlap;
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
        <Audio src={staticFile("voiceover-2026-11-16d.mp3")} />
        <SfxTrack cues={cues} />
      </AbsoluteFill>
    </PaletteProvider>
  );
};

