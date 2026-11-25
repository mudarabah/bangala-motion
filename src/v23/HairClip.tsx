// Hair-clip story ad (2026-11-25 voice): a hair clip on a warehouse shelf tells how an entrepreneur
// added it to her shop, posted it, got an order, and how Mudarabah packed and shipped it.
// The eight illustrations come from the user's scene pack (speech bubbles cropped off); every line of
// text is a range of spoken words (../v11/sayf.tsx). Style: green glass (Mudarabah).
import React from "react";
import { Audio } from "@remotion/media";
import { Bell, CheckCheck, Coffee, GraduationCap, HandCoins, Heart, MousePointerClick, Package, RotateCcw, ShieldCheck, Smartphone, Sparkles, Store, Truck, Warehouse } from "lucide-react";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Appear, Background, Float, Glass, IconTile, LogoCard, LogoMark, PaletteProvider, Pop, Scene, useProgress } from "../components/kit";
import { SfxTrack, type Cue } from "../components/SoundDesign";
import { design, greenPalette, motion } from "../theme";
import { Sweep } from "../v4/parts";
import { makeSay } from "../v11/sayf";
import { C, Wash } from "../v11/ui";
import { audioDuration, SCENE_START, tail, W, WORDS, type SceneKey } from "./timeline";

// The transcript writes Bangla endings in Latin letters ("website-e"); show them in Bangla.
// Word 5 is transcribed as "tip", but the script and every picture say "clip".
const { t, Say } = makeSay(W, WORDS, {
  5: "Clip",
  32: "Website|-এ",
  43: "Click|-এ",
  46: "Shop|-এ",
  77: "Limited|-এর",
  80: "Mentor|-দের",
  113: "Packing|-এর",
  125: "Courier|-এ",
  144: "Packing|-এর",
  152: "Account|-এ",
});
const img = (n: number) => staticFile(`products/hairclip/s${n}.jpg`);

// The scene's illustration in a glass frame with a slow push-in.
const Picture: React.FC<{ n: number; from: number; to: number; pos?: string }> = ({ n, from, to, pos = "center" }) => {
  const k = useProgress(t(from), t(to) + 1);
  return (
    <Appear at={t(from) - 0.2} rise={40} scaleFrom={0.96} style={{ position: "absolute", left: 110, top: 150 }}>
      <Glass style={{ padding: 14, borderRadius: 44 }}>
        <div style={{ width: 900, height: 760, borderRadius: 32, overflow: "hidden" }}>
          <img src={img(n)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, transform: `scale(${1 + 0.06 * k})`, display: "block" }} />
        </div>
      </Glass>
    </Appear>
  );
};

type L = { a: number; b: number; hi?: number[]; icon?: typeof Bell; tint?: [string, string]; size?: number };

// The spoken lines of a scene, stacked on the right; each line may carry an icon tile.
const Lines: React.FC<{ lines: L[]; top?: number }> = ({ lines, top = 190 }) => (
  <div style={{ position: "absolute", left: 1090, top, width: 720, display: "flex", flexDirection: "column", gap: 30 }}>
    {lines.map((l) => (
      <Appear key={l.a} at={t(l.a)} style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {l.icon ? <IconTile icon={l.icon} tint={l.tint ?? C.green} size={78} /> : null}
        <Say from={l.a} to={l.b} hi={l.hi} size={l.size ?? 48} align="left" />
      </Appear>
    ))}
  </div>
);

// ---------- 1. on the warehouse shelf ----------

const S1: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Picture n={1} from={0} to={22} />
    <Lines
      lines={[
        { a: 0, b: 5, hi: [3, 4, 5], size: 60 },
        { a: 6, b: 15, hi: [9, 10, 11], icon: Warehouse, tint: C.amber },
        { a: 16, b: 22, hi: [20, 21], icon: Sparkles, tint: C.pink },
      ]}
    />
  </>
);

// ---------- 2. on an entrepreneur's website — added with one click ----------

const S2: React.FC = () => (
  <>
    <Wash tone="violet" />
    <Picture n={2} from={23} to={55} />
    <Lines
      top={150}
      lines={[
        { a: 23, b: 32, hi: [27, 32], icon: Smartphone, tint: C.blue, size: 44 },
        { a: 33, b: 40, hi: [37, 38, 39], size: 44 },
        { a: 41, b: 48, hi: [43, 46], icon: MousePointerClick, tint: C.violet, size: 44 },
        { a: 49, b: 55, hi: [51, 53], icon: HandCoins, tint: C.green, size: 44 },
      ]}
    />
  </>
);

// ---------- 3. the Facebook post; she learned from training and mentors ----------

const S3: React.FC = () => (
  <>
    <Wash tone="blue" />
    <Picture n={3} from={56} to={81} />
    <Lines
      lines={[
        { a: 56, b: 64, hi: [61, 63], size: 46 },
        { a: 65, b: 71, hi: [66, 69], size: 46 },
        { a: 72, b: 81, hi: [75, 76, 77, 78, 80], icon: GraduationCap, tint: C.violet, size: 46 },
      ]}
    />
  </>
);

// ---------- 4. ting! an order; she confirms and has tea ----------

const S4: React.FC = () => (
  <>
    <Wash tone="amber" />
    <Picture n={4} from={82} to={104} />
    <Pop at={t(82)} style={{ position: "absolute", left: 1090, top: 130, display: "flex", alignItems: "center", gap: 20 }}>
      <Float amp={6}>
        <IconTile icon={Bell} tint={C.amber} size={100} />
      </Float>
      <Say from={82} to={82} hi={[82]} size={84} align="left" />
    </Pop>
    <Lines
      top={300}
      lines={[
        { a: 83, b: 87, hi: [86], size: 46 },
        { a: 88, b: 93, hi: [91, 92], icon: CheckCheck, tint: C.green, size: 46 },
        { a: 94, b: 99, hi: [96, 97], icon: Coffee, tint: C.orange, size: 46 },
        { a: 100, b: 104, hi: [102, 103], size: 46 },
      ]}
    />
  </>
);

// ---------- 5. Mudarabah packs it (20 taka) and hands it to the courier ----------

const S5: React.FC = () => (
  <>
    <Wash tone="green" />
    <Picture n={5} from={105} to={130} />
    <Lines
      top={160}
      lines={[
        { a: 105, b: 111, hi: [105, 108, 110], icon: Package, tint: C.orange, size: 46 },
        { a: 112, b: 121, hi: [119, 120, 121], size: 46 },
        { a: 122, b: 125, hi: [125], icon: Truck, tint: C.green, size: 46 },
        { a: 126, b: 130, hi: [126, 127, 130], size: 46 },
      ]}
    />
  </>
);

// ---------- 6. delivered: everyone's happy; the profit goes to her account ----------

const S6: React.FC = () => (
  <>
    <Wash tone="pink" />
    <Picture n={6} from={131} to={152} />
    <Lines
      top={170}
      lines={[
        { a: 131, b: 132, hi: [131, 132], icon: Heart, tint: C.pink, size: 60 },
        { a: 133, b: 136, hi: [134, 136], size: 50 },
        { a: 137, b: 138, size: 50 },
        { a: 139, b: 152, hi: [143, 151, 152], icon: HandCoins, tint: C.green, size: 44 },
      ]}
    />
  </>
);

// ---------- 7. honestly: returns cost her; breakage is on the company ----------

const S7: React.FC = () => (
  <>
    <Wash tone="rose" />
    <Picture n={7} from={153} to={181} />
    <Lines
      top={190}
      lines={[
        { a: 153, b: 161, hi: [159], size: 46 },
        { a: 162, b: 172, hi: [168, 169], icon: RotateCcw, tint: C.rose, size: 46 },
        { a: 173, b: 181, hi: [180, 181], icon: ShieldCheck, tint: C.green, size: 46 },
      ]}
    />
  </>
);

// ---------- 8. my siblings are still waiting — maybe for you ----------

const S8: React.FC = () => (
  <>
    <Wash tone="green" />
    <Picture n={8} from={182} to={193} />
    <Lines top={170} lines={[{ a: 182, b: 190, hi: [188, 189], icon: Store, tint: C.amber, size: 52 }]} />
    <Appear at={t(191)} style={{ position: "absolute", left: 1090, top: 470 }}>
      <div style={{ position: "relative", padding: "24px 50px", borderRadius: 999, background: "linear-gradient(90deg, #16A34A, #0D9488)", boxShadow: "0 18px 40px rgba(22,163,74,0.35)", overflow: "hidden" }}>
        <Say from={191} to={193} size={52} style={{ filter: "brightness(0) invert(1)" }} />
        <Sweep from={t(192)} to={t(192) + 1} />
      </div>
    </Appear>
    <Appear at={t(191)} style={{ position: "absolute", left: 1090, top: 660 }}>
      <LogoCard size={220} />
    </Appear>
  </>
);

// ---------- assembly ----------

const SCENES: Record<SceneKey, React.FC> = { s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, s7: S7, s8: S8 };
const ORDER = Object.keys(SCENE_START) as SceneKey[];
const PRE = 0.4;
export const TOTAL_SECONDS_23 = audioDuration + tail;
const NO_CORNER = new Set<SceneKey>(["s8"]);

const cues: Cue[] = [
  ...Object.values(SCENE_START).slice(1).map((i): Cue => [W[i] - 0.45, "whoosh"]),
  ...[9, 43, 46, 63, 88, 110, 125, 131].map((i): Cue => [W[i], "pop"]),
  ...[82, 92, 152, 193].map((i): Cue => [W[i], "ding"]),
  [W[168], "stamp"],
];

export const Video23: React.FC = () => {
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
            const to = i === ORDER.length - 1 ? TOTAL_SECONDS_23 + 1 : W[SCENE_START[ORDER[i + 1]]] - PRE + overlap;
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
        <Audio src={staticFile("voiceover-hairclip.mp3")} />
        <SfxTrack cues={cues} />
      </AbsoluteFill>
    </PaletteProvider>
  );
};
