// Store ad, fifth voice (2026-11-16): new customers cost ad money, but a customer who is already here
// buying two instead of one costs almost nothing → the website does it on its own with a milestone bar,
// offers, discounts, campaigns and a minimum order → no commission → start today.
// Every line on screen is a range of spoken words (see ../v11/sayf.tsx).
import React from "react";
import { Audio } from "@remotion/media";
import { Banknote, Gift, Megaphone, MessageCircle, Percent, ShoppingBag, ShoppingCart, SlidersHorizontal, Tag, User } from "lucide-react";
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, CheckBadge, Float, Glass, IconTile, LogoCard, LogoMark, PaletteProvider, Pop, Scene, useProgress, useTime } from "../components/kit";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import { design, fonts, greenPalette, motion } from "../theme";
import { Skel, Strike } from "../v2/ui";
import { Sweep } from "../v4/parts";
import { makeSay } from "../v11/sayf";
import { C, Wash } from "../v11/ui";
import { audioDuration, SCENE_START, tail, W, WORDS, type SceneKey } from "./timeline";

// The transcript writes Bangla endings in Latin letters ("ad-e", "cart-e"); show them in Bangla.
const { t, Say } = makeSay(W, WORDS, {
  3: "Ad|-এ",
  19: "Inbox|-এ",
  23: "Website|-এ",
  28: "Mudarabah",
  30: "Limited|-এর",
  31: "Website|-এ",
  41: "Cart|-এ",
  52: "Order|-ও",
});
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TOP: React.CSSProperties = { position: "absolute", left: 120, right: 120, top: 110 };

const Card: React.FC<{ w?: number; h?: number; active?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w = 320, h = 300, active, children, style }) => (
  <Glass active={active} style={{ width: w, height: h, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, position: "relative", ...style }}>
    {children}
  </Glass>
);

const Product: React.FC<{ src: string; size?: number }> = ({ src, size = 200 }) => (
  <Glass style={{ padding: 10, borderRadius: 24 }}>
    <img src={staticFile(src)} style={{ width: size, height: size, objectFit: "cover", borderRadius: 16, display: "block" }} />
  </Glass>
);

// The bag page of a store built on the platform: its reward milestones and minimum order.
const BagShot: React.FC<{ at: number }> = ({ at }) => (
  <Appear at={at} style={{ position: "absolute", left: 180, top: 220 }}>
    <Glass style={{ padding: 12, borderRadius: 46 }}>
      <img src={staticFile("products/bag-milestone.jpg")} style={{ width: 420, height: 720, objectFit: "cover", objectPosition: "top", borderRadius: 34, display: "block" }} />
    </Glass>
  </Appear>
);

// ---------- 1. bringing a new customer costs ad money ----------

const Hook: React.FC = () => {
  const { frame, f } = useTime();
  const fly = (k: number) => interpolate(frame, [f(t(4)) + k * 6, f(t(4)) + k * 6 + 24], [0, 1], clamp);
  return (
    <>
      <Wash tone="amber" />
      <Appear at={t(3)} style={{ position: "absolute", left: 300, top: 300 }}>
        <Float amp={6}>
          <IconTile icon={Megaphone} tint={C.violet} size={200} />
        </Float>
      </Appear>
      {[0, 1, 2, 3].map((k) => (
        <div key={k} style={{ position: "absolute", left: 1300 - 760 * fly(k), top: 360 + k * 30 - 40 * Math.sin(fly(k) * Math.PI), opacity: fly(k) > 0 && fly(k) < 1 ? 1 : 0 }}>
          <IconTile icon={Banknote} tint={C.amber} size={90} />
        </div>
      ))}
      <Appear at={t(1)} style={{ position: "absolute", left: 1320, top: 300 }}>
        <IconTile icon={User} tint={C.blue} size={200} />
      </Appear>
      <Say from={0} to={5} hi={[3, 4]} size={78} style={{ position: "absolute", left: 120, right: 120, top: 700 }} />
    </>
  );
};

// ---------- 2. but the one already here buying two costs almost nothing ----------

const More: React.FC = () => (
  <>
    <Wash tone="green" />
    <Say from={6} to={18} hi={[13, 17, 18]} size={60} style={TOP} />
    <Appear at={t(7)} style={{ position: "absolute", left: 300, top: 360 }}>
      <IconTile icon={User} tint={C.blue} size={190} />
    </Appear>
    <div style={{ position: "absolute", left: 640, top: 340, display: "flex", gap: 30, alignItems: "center" }}>
      <Pop at={t(11)}>
        <Product src="products/prod-floral.jpg" size={230} />
      </Pop>
      <Pop at={t(13)}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 100, color: "#16A34A" }}>+</div>
      </Pop>
      <Pop at={t(13)}>
        <Product src="products/prod-pink.jpg" size={230} />
      </Pop>
    </div>
    <Appear at={t(15)} style={{ position: "absolute", left: 1460, top: 380 }}>
      <Card w={300} h={260}>
        <Strike at={t(18)}>
          <IconTile icon={Banknote} tint={C.amber} size={130} />
        </Strike>
      </Card>
    </Appear>
  </>
);

// ---------- 3. hard to do in the inbox ----------

const Inbox: React.FC = () => (
  <>
    <Wash tone="rose" />
    <Appear at={t(19)} style={{ position: "absolute", left: 420, top: 220 }}>
      <Glass style={{ width: 620, height: 560, padding: 30, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <IconTile icon={MessageCircle} tint={C.blue} size={64} />
          <Skel w={180} strong />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ alignSelf: i % 2 ? "flex-end" : "flex-start", width: 300 - i * 20, height: 60, borderRadius: 24, background: i % 2 ? "rgba(220,252,231,0.95)" : "rgba(241,245,249,0.95)" }} />
        ))}
      </Glass>
    </Appear>
    <Say from={19} to={22} hi={[22]} size={84} align="left" style={{ position: "absolute", left: 1120, top: 420, width: 700 }} />
  </>
);

// ---------- 4. on the website it happens by itself ----------

const Site: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(23)} style={{ position: "absolute", left: 220, top: 200 }}>
      <Glass style={{ width: 860, padding: 16 }}>
        <img src={staticFile("products/rk-home.jpg")} style={{ width: "100%", height: 580, objectFit: "cover", objectPosition: "top", borderRadius: 18 }} />
      </Glass>
    </Appear>
    <Say from={23} to={27} hi={[25, 26]} size={80} align="left" style={{ position: "absolute", left: 1160, top: 380, width: 660 }} />
    <Pop at={t(27)} style={{ position: "absolute", left: 1160, top: 620 }}>
      <CheckBadge size={100} />
    </Pop>
  </>
);

// ---------- 5. Mudarabah's website ----------

const Brand: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(28)} rise={70} scaleFrom={0.9} style={{ position: "absolute", left: 960 - 160, top: 190 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={320} />
        <Sweep from={t(28) + 0.2} to={t(28) + 1.2} />
      </div>
    </Appear>
    <Say from={28} to={31} hi={[31]} size={74} style={{ position: "absolute", top: 600, left: 0, right: 0 }} />
  </>
);

// ---------- 6. a milestone bar: buy 200 taka and get the offer ----------

const Bar: React.FC = () => {
  const fill = useProgress(t(35), t(37) + 0.5);
  return (
    <>
      <Wash tone="violet" />
      <Say from={32} to={33} hi={[32, 33]} size={78} style={TOP} />
      <BagShot at={t(32)} />
      <Appear at={t(32)} style={{ position: "absolute", left: 700, top: 380 }}>
        <Glass style={{ width: 1060, padding: "50px 50px", display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <IconTile icon={ShoppingCart} tint={C.blue} size={90} />
            <div style={{ position: "relative", flex: 1, height: 44, borderRadius: 999, background: "rgba(226,232,240,0.9)" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${8 + 92 * fill}%`, borderRadius: 999, background: "linear-gradient(90deg, #A78BFA, #7C3AED, #16A34A)" }} />
            </div>
            <div style={{ transform: `scale(${1 + 0.25 * fill})` }}>
              <IconTile icon={Gift} tint={fill >= 1 ? C.green : C.pink} size={110} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
            <Say from={34} to={38} hi={[35, 36, 38]} size={74} />
          </div>
        </Glass>
      </Appear>
      <Pop at={t(38)} style={{ position: "absolute", left: 1700, top: 330 }}>
        <CheckBadge size={90} />
      </Pop>
    </>
  );
};

// ---------- 7. the customer adds to the cart themselves ----------

const Cart: React.FC = () => {
  const drop = useProgress(t(41), t(42) + 0.4);
  return (
    <>
      <Wash tone="blue" />
      <Say from={39} to={43} hi={[40, 41]} size={78} style={TOP} />
      <Appear at={t(39)} style={{ position: "absolute", left: 360, top: 360 }}>
        <IconTile icon={User} tint={C.blue} size={200} />
      </Appear>
      <div style={{ position: "absolute", left: 760 + 420 * drop, top: 330 + 120 * drop, transform: `scale(${1 - 0.5 * drop})`, opacity: drop < 1 ? 1 : 0 }}>
        <Appear at={t(40)}>
          <Product src="products/prod-brooch.jpg" size={200} />
        </Appear>
      </div>
      <Appear at={t(41)} style={{ position: "absolute", left: 1200, top: 360 }}>
        <div style={{ position: "relative" }}>
          <IconTile icon={ShoppingBag} tint={C.green} size={240} />
          <Pop at={t(42) + 0.2} style={{ position: "absolute", right: -24, top: -24 }}>
            <div style={{ width: 80, height: 80, borderRadius: 99, background: "linear-gradient(160deg, #F9A8D4, #DB2777)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: fonts.display, fontWeight: 800, fontSize: 46 }}>
              +
            </div>
          </Pop>
        </div>
      </Appear>
    </>
  );
};

// ---------- 8. set discounts and campaigns your way ----------

const Discount: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Say from={44} to={50} hi={[44, 46, 49, 50]} size={70} style={TOP} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", gap: 50 }}>
      {[
        { a: 44, b: 44, icon: Percent, tint: C.pink },
        { a: 46, b: 46, icon: Tag, tint: C.violet },
        { a: 47, b: 50, icon: SlidersHorizontal, tint: C.teal },
      ].map((c) => (
        <Appear key={c.a} at={t(c.a)}>
          <Card w={460} h={440}>
            <Float amp={6}>
              <IconTile icon={c.icon} tint={c.tint} size={160} />
            </Float>
            <Say from={c.a} to={c.b} size={56} />
          </Card>
        </Appear>
      ))}
    </div>
  </>
);

// ---------- 9. set a minimum order too ----------

const Minimum: React.FC = () => {
  const slide = useProgress(t(53), t(55) + 0.3);
  return (
    <>
      <Wash tone="teal" />
      <Say from={51} to={55} hi={[51, 52]} size={78} style={TOP} />
      <BagShot at={t(51)} />
      <Appear at={t(51)} style={{ position: "absolute", left: 700, top: 440 }}>
        <Glass style={{ width: 1060, padding: "60px 60px", display: "flex", alignItems: "center", gap: 40 }}>
          <IconTile icon={ShoppingCart} tint={C.teal} size={110} />
          <div style={{ position: "relative", flex: 1, height: 20, borderRadius: 999, background: "rgba(204,251,241,0.9)" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${15 + 45 * slide}%`, borderRadius: 999, background: "linear-gradient(90deg, #5EEAD4, #0D9488)" }} />
            <div style={{ position: "absolute", left: `calc(${15 + 45 * slide}% - 30px)`, top: -20, width: 60, height: 60, borderRadius: 99, background: "white", border: "6px solid #0D9488", boxShadow: "0 8px 20px rgba(13,148,136,0.35)" }} />
          </div>
          <Pop at={t(55)}>
            <CheckBadge size={80} />
          </Pop>
        </Glass>
      </Appear>
    </>
  );
};

// ---------- 10. no commission ----------

const NoCom: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Appear at={t(56)} style={{ position: "absolute", left: 960 - 450, top: 200 }}>
      <Card w={900} h={600}>
        <Strike at={t(60)}>
          <IconTile icon={Percent} tint={C.pink} size={220} />
        </Strike>
        <Say from={56} to={60} hi={[59, 60]} size={72} />
      </Card>
    </Appear>
  </>
);

// ---------- 11. start your own website today ----------

const Cta: React.FC = () => (
  <>
    <Wash tone="green" />
    <Appear at={t(61)} rise={60} style={{ position: "absolute", left: 960 - 160, top: 150 }}>
      <div style={{ position: "relative", borderRadius: 32 }}>
        <LogoCard size={320} />
        <Sweep from={t(61) + 0.2} to={t(61) + 1.2} />
      </div>
    </Appear>
    <Appear at={t(61)} style={{ position: "absolute", left: 0, right: 0, top: 560, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", padding: "26px 60px", borderRadius: 999, background: "linear-gradient(90deg, #16A34A, #0D9488)", boxShadow: "0 18px 40px rgba(22,163,74,0.35)", overflow: "hidden" }}>
        <Say from={61} to={65} size={80} style={{ filter: "brightness(0) invert(1)" }} />
        <Sweep from={t(64)} to={t(64) + 1} />
      </div>
    </Appear>
  </>
);

// ---------- assembly ----------

const SCENES: Record<SceneKey, React.FC> = { hook: Hook, more: More, inbox: Inbox, site: Site, brand: Brand, bar: Bar, cart: Cart, discount: Discount, minimum: Minimum, nocom: NoCom, cta: Cta };
const ORDER = Object.keys(SCENE_START) as SceneKey[];
const PRE = 0.4;
export const TOTAL_SECONDS_16 = audioDuration + tail;
const NO_CORNER = new Set<SceneKey>(["brand", "cta"]);

const cues: Cue[] = [
  ...Object.values(SCENE_START).slice(1).map((i): Cue => [W[i] - 0.45, "whoosh"]),
  ...[1, 3, 11, 13, 40, 44, 46, 48].map((i): Cue => [W[i], "pop"]),
  ...[27, 31, 38, 42, 55, 64].map((i): Cue => [W[i], "ding"]),
  [W[18], "stamp"],
  [W[22], "stamp"],
  [W[60], "stamp"],
];

export const Video16: React.FC = () => {
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
            const to = i === ORDER.length - 1 ? TOTAL_SECONDS_16 + 1 : W[SCENE_START[ORDER[i + 1]]] - PRE + overlap;
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
        <Audio src={staticFile("voiceover-2026-11-16e.mp3")} />
        <SfxTrack cues={cues} />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
