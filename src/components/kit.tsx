// Shared building blocks for the Lavender Glass style.
// Every component takes times in SECONDS (straight from src/data/timeline.ts).
import React, { createContext, useContext } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, glass, lavenderPalette, motion, type Palette } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- time ----------

// Absolute start frame of the scene we are inside, so seconds from the timeline
// can be turned into frames local to the scene's <Sequence>.
const StartCtx = createContext(0);

// Animations start a few frames before the word so they are settled as it is heard.
export const LEAD = 4;

export const useTime = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = useContext(StartCtx);
  const f = (sec: number) => Math.round(sec * fps) - start;
  return { frame, fps, f };
};

// Calm 0→1 spring that lands with the word at `at` seconds.
export const useEnter = (at: number, delayFrames = 0) => {
  const { frame, fps, f } = useTime();
  return spring({ frame: frame - (f(at) - LEAD + delayFrames), fps, config: motion.spring });
};

// 0→1 linear-eased progress between two times (seconds).
export const useProgress = (from: number, to: number, ease = Easing.inOut(Easing.cubic)) => {
  const { frame, f } = useTime();
  return interpolate(frame, [f(from), Math.max(f(to), f(from) + 1)], [0, 1], { ...clamp, easing: ease });
};

// 1 while `from` ≤ t < `to` (soft edges), used for the "active" highlight.
export const useActive = (from: number, to = Infinity) => {
  const { frame, f } = useTime();
  const on = interpolate(frame, [f(from) - LEAD, f(from) - LEAD + 10], [0, 1], clamp);
  const off = to === Infinity ? 1 : interpolate(frame, [f(to) - LEAD, f(to) - LEAD + 10], [1, 0], clamp);
  return Math.min(on, off);
};

// ---------- palette ----------

// Colours come from the palette in context (lavender unless a style provides another).
const PaletteCtx = createContext<Palette>(lavenderPalette);
export const PaletteProvider = PaletteCtx.Provider;
export const usePalette = () => useContext(PaletteCtx);

// ---------- helpers ----------

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
export const bn = (v: string | number) => String(v).replace(/\d/g, (d) => BN_DIGITS[+d]);
export const bnNumber = (n: number) => bn(Math.round(n).toLocaleString("en-US"));

// ---------- scene wrapper ----------

// One scene: soft blur-dissolve in and out, and a very slow camera push.
export const Scene: React.FC<{ from: number; to: number; children: React.ReactNode }> = ({ from, to, children }) => {
  const { fps } = useVideoConfig();
  const start = Math.max(0, Math.round(from * fps));
  const end = Math.round(to * fps);
  return (
    <Sequence from={start} durationInFrames={end - start} premountFor={fps}>
      <StartCtx.Provider value={start}>
        <SceneFrame duration={end - start}>{children}</SceneFrame>
      </StartCtx.Provider>
    </Sequence>
  );
};

const SceneFrame: React.FC<{ duration: number; children: React.ReactNode }> = ({ duration, children }) => {
  const frame = useCurrentFrame();
  const T = motion.transitionFrames;
  const p = Math.min(
    interpolate(frame, [0, T], [0, 1], clamp),
    interpolate(frame, [duration - T, duration], [1, 0], clamp),
  );
  const push = interpolate(frame, [0, duration], motion.cameraPush as unknown as number[]);
  return (
    <AbsoluteFill
      style={{
        opacity: p,
        filter: p < 1 ? `blur(${(1 - p) * 16}px)` : undefined,
        transform: `scale(${push})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// ---------- background ----------

// Near-white base with large soft colour fields that drift slowly (no blur filter:
// radial gradients are already soft and cheap to render at 4K).
export const Background: React.FC<{ clean?: boolean }> = ({ clean }) => {
  const frame = useCurrentFrame();
  const pal = usePalette();
  const d = (period: number, amp: number, phase = 0) => Math.sin((frame / period) * Math.PI * 2 + phase) * amp;
  const k = clean ? 0.55 : 1;
  return (
    <AbsoluteFill style={{ backgroundColor: pal.base, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1500,
          height: 1300,
          left: -520 + d(600, 60),
          top: -560 + d(700, 50, 1),
          background: `radial-gradient(closest-side, rgba(${pal.fieldA},${0.5 * k}), rgba(${pal.fieldA},0))`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 1200,
          right: -480 + d(650, 70, 2),
          bottom: -520 + d(560, 50, 3),
          background: `radial-gradient(closest-side, rgba(${pal.fieldB},${0.42 * k}), rgba(${pal.fieldB},0))`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 900,
          right: 120 + d(800, 80, 4),
          top: -520,
          background: `radial-gradient(closest-side, rgba(${pal.fieldC},${0.16 * k}), rgba(${pal.fieldC},0))`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -200,
          right: -200,
          bottom: -260,
          height: 520,
          background: `radial-gradient(50% 50% at 50% 50%, rgba(${pal.hazeRgb},0.95), rgba(${pal.hazeRgb},0))`,
        }}
      />
    </AbsoluteFill>
  );
};

// ---------- text ----------

// Signature move: one word resolves from blur as it is spoken.
export const Word: React.FC<{
  text: string;
  at: number;
  grad?: boolean;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ text, at, grad, delay = 0, style }) => {
  const { frame, f } = useTime();
  const pal = usePalette();
  const s = f(at) - LEAD + delay;
  const p = interpolate(frame, [s, s + motion.wordDuration], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const colour: React.CSSProperties = grad
    ? { backgroundImage: pal.keyword, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }
    : { color: pal.ink };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.1em 0.02em",
        opacity: p,
        filter: `blur(${(1 - p) * motion.wordBlurPx}px) drop-shadow(0 6px 18px rgba(${pal.shadowRgb},0.14))`,
        transform: `translateY(${(1 - p) * motion.wordRisePx}px)`,
        ...colour,
        ...style,
      }}
    >
      {text}
    </span>
  );
};

export type WordSpec = [text: string, at: number, grad?: boolean];

// A headline built from words, each appearing at its own spoken time.
export const Headline: React.FC<{
  words: WordSpec[];
  size?: number;
  align?: "center" | "left";
  style?: React.CSSProperties;
}> = ({ words, size = 92, align = "center", style }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: align === "center" ? "center" : "flex-start",
      columnGap: size * 0.26,
      fontFamily: fonts.display,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.15,
      letterSpacing: -0.5,
      ...style,
    }}
  >
    {words.map(([text, at, grad], i) => (
      <Word key={i} text={text} at={at} grad={grad} />
    ))}
  </div>
);

export const Label: React.FC<{ children: React.ReactNode; size?: number; muted?: boolean; style?: React.CSSProperties }> = ({
  children,
  size = 28,
  muted,
  style,
}) => {
  const pal = usePalette();
  return (
  <div
    style={{
      fontFamily: fonts.body,
      fontWeight: 600,
      fontSize: size,
      lineHeight: 1.3,
      color: muted ? pal.inkMuted : pal.ink,
      ...style,
    }}
  >
    {children}
  </div>
  );
};

// ---------- motion wrappers ----------

// Card-style entrance: rise + fade + slight scale.
export const Appear: React.FC<{
  at: number;
  delay?: number;
  rise?: number;
  scaleFrom?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ at, delay = 0, rise = motion.cardRisePx, scaleFrom = 0.96, style, children }) => {
  const p = useEnter(at, delay);
  return (
    <div
      style={{
        ...style,
        opacity: p,
        transform: `${style?.transform ?? ""} translateY(${(1 - p) * rise}px) scale(${scaleFrom + (1 - scaleFrom) * p})`,
      }}
    >
      {children}
    </div>
  );
};

// Pop-in for badges and icons (still no bounce).
export const Pop: React.FC<{ at: number; delay?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({
  at,
  delay = 0,
  style,
  children,
}) => {
  const p = useEnter(at, delay);
  return (
    <div style={{ ...style, opacity: Math.min(1, p * 1.6), transform: `${style?.transform ?? ""} scale(${0.6 + 0.4 * p})` }}>
      {children}
    </div>
  );
};

// Slow idle bob, each with its own phase.
export const Float: React.FC<{ phase?: number; amp?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({
  phase = 0,
  amp = motion.floatAmplitudePx,
  style,
  children,
}) => {
  const frame = useCurrentFrame();
  const a = (frame / motion.floatPeriodFrames) * Math.PI * 2 + phase;
  return (
    <div style={{ ...style, transform: `translateY(${Math.sin(a) * amp}px) rotate(${Math.sin(a * 0.7) * 2.5}deg)` }}>
      {children}
    </div>
  );
};

// ---------- glass ----------

export const Glass: React.FC<{ active?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  active = 0,
  style,
  children,
}) => {
  const pal = usePalette();
  return (
    <div
      style={{
        position: "relative",
        background: "rgba(255,255,255,0.8)",
        border: glass.border,
        borderRadius: glass.radius,
        padding: glass.padding,
        boxShadow: [
          `0 24px 60px rgba(${pal.shadowRgb},0.12), 0 4px 12px rgba(${pal.shadowRgb},0.06)`,
          `0 0 0 1px rgba(${pal.brandRgb},0.10)`,
          `0 0 0 2px rgba(${pal.glowRgb},${0.7 * active})`,
          `0 0 0 8px rgba(${pal.glowRgb},${0.12 * active})`,
          `0 24px 60px rgba(${pal.brandRgb},${0.14 * active})`,
        ].join(", "),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Glossy 3D app icon: gradient tile, top light, white glyph.
export const IconTile: React.FC<{ icon: LucideIcon; tint: [string, string]; size?: number; style?: React.CSSProperties }> = ({
  icon: Icon,
  tint,
  size = 96,
  style,
}) => (
  <div
    style={{
      position: "relative",
      width: size,
      height: size,
      flexShrink: 0,
      borderRadius: size * 0.26,
      background: `linear-gradient(160deg, ${tint[0]}, ${tint[1]})`,
      boxShadow: `inset 0 2px 0 rgba(255,255,255,0.55), inset 0 -${size * 0.06}px ${size * 0.14}px rgba(0,0,0,0.10), 0 ${size * 0.16}px ${size * 0.36}px ${tint[1]}55`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      ...style,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(255,255,255,0.42), rgba(255,255,255,0) 55%)",
      }}
    />
    <Icon size={size * 0.5} color="white" strokeWidth={2.2} style={{ position: "relative" }} />
  </div>
);

// White pill label.
export const Pill: React.FC<{ icon?: LucideIcon; size?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  icon: Icon,
  size = 26,
  children,
  style,
}) => {
  const pal = usePalette();
  return (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.45,
      padding: `${size * 0.42}px ${size * 0.95}px`,
      borderRadius: 999,
      background: "rgba(255,255,255,0.92)",
      boxShadow: `0 10px 30px rgba(${pal.shadowRgb},0.12), 0 0 0 1px rgba(${pal.brandRgb},0.08)`,
      fontFamily: fonts.body,
      fontWeight: 600,
      fontSize: size,
      color: pal.ink,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {Icon ? <Icon size={size * 1.1} color={pal.brand} strokeWidth={2.4} /> : null}
    <span>{children}</span>
  </div>
  );
};

// Violet gradient pill (buttons, key result).
export const GradPill: React.FC<{ icon?: LucideIcon; size?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  icon: Icon,
  size = 28,
  children,
  style,
}) => {
  const pal = usePalette();
  return (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.45,
      padding: `${size * 0.45}px ${size * 1.05}px`,
      borderRadius: 999,
      background: pal.button,
      boxShadow: `0 14px 34px rgba(${pal.brandRgb},0.32), inset 0 1px 0 rgba(255,255,255,0.35)`,
      fontFamily: fonts.body,
      fontWeight: 700,
      fontSize: size,
      color: "white",
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {Icon ? <Icon size={size * 1.1} color="white" strokeWidth={2.5} /> : null}
    <span>{children}</span>
  </div>
  );
};

// Small round green check badge.
export const CheckBadge: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 40, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 999,
      background: `linear-gradient(160deg, #6EE7B7, ${colors.success})`,
      boxShadow: `0 6px 16px ${colors.success}55, inset 0 1px 0 rgba(255,255,255,0.5)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}
  >
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
      <path d="M5 12.5l4.2 4.2L19 7" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// Number that counts up between two times, in Bangla digits.
export const Counter: React.FC<{ from: number; to: number; value: number; prefix?: string; style?: React.CSSProperties }> = ({
  from,
  to,
  value,
  prefix = "",
  style,
}) => {
  const p = useProgress(from, to, Easing.out(Easing.cubic));
  return (
    <span style={style}>
      {prefix}
      {bnNumber(value * p)}
    </span>
  );
};

// ---------- brand ----------

// The user's logo (white background) sitting on a white glass card.
// mix-blend-mode: multiply lets the logo's white disappear into the card.
export const LogoCard: React.FC<{ size: number; style?: React.CSSProperties }> = ({ size, style }) => (
  <Glass style={{ width: size, height: size, padding: 0, overflow: "hidden", background: "rgba(255,255,255,0.96)", ...style }}>
    <Img
      src={staticFile("logo.jpeg")}
      style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.12)", mixBlendMode: "multiply" }}
    />
  </Glass>
);

// Small logo mark (icon + wordmark region of the logo), for the corner badge.
export const LogoMark: React.FC<{ width: number }> = ({ width }) => {
  // Crop of the 1070x1070 logo: x 80–990, y 250–660.
  const k = width / 910;
  return (
    <div style={{ width, height: 410 * k, overflow: "hidden", position: "relative" }}>
      <Img
        src={staticFile("logo.jpeg")}
        style={{ position: "absolute", width: 1070 * k, left: -80 * k, top: -250 * k, mixBlendMode: "multiply" }}
      />
    </div>
  );
};
