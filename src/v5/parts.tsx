// Shared pieces for the fashion accessory ad (2026-11-12, second voice, green-glass).
import React from "react";
import { Img, staticFile } from "remotion";
import { Glass, usePalette, useEnter, useTime, Word } from "../components/kit";
import { fonts } from "../theme";

// A headline that mixes Bangla words with spoken English words (set in the Latin face).
export type MixSpec = [text: string, at: number, grad?: boolean, en?: boolean];

export const MixLine: React.FC<{ words: MixSpec[]; size?: number; align?: "center" | "left"; style?: React.CSSProperties }> = ({
  words,
  size = 92,
  align = "center",
  style,
}) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "baseline",
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
    {words.map(([text, at, grad, en], i) => {
      if (!en) return <Word key={i} text={text} at={at} grad={grad} />;
      // "Size|-এর": Latin word with a Bangla suffix attached (Bangla signs cannot join Latin letters)
      const [latin, suffix] = text.split("|");
      return (
        <span key={i} style={{ display: "inline-flex", alignItems: "baseline" }}>
          <Word text={latin} at={at} grad={grad} style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: "0.84em", letterSpacing: -1 }} />
          {suffix ? <Word text={suffix} at={at} grad={grad} /> : null}
        </span>
      );
    })}
  </div>
);

// One gold drop earring (hook, ring, green gem, pearl). Drawn in SVG so it stays sharp at 4K.
export const Earring: React.FC<{ size?: number; flip?: boolean; style?: React.CSSProperties }> = ({ size = 240, flip, style }) => (
  <svg viewBox="0 0 200 320" width={size} height={size * 1.6} style={{ overflow: "visible", transform: flip ? "scaleX(-1)" : undefined, ...style }}>
    <defs>
      <linearGradient id="gold5" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFF3C4" />
        <stop offset="0.5" stopColor="#FBBF24" />
        <stop offset="1" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="gem5" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#A7F3D0" />
        <stop offset="0.55" stopColor="#10B981" />
        <stop offset="1" stopColor="#065F46" />
      </linearGradient>
      <radialGradient id="pearl5" cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#E7E5E4" />
      </radialGradient>
    </defs>
    <path d="M100 70 C 100 20, 150 10, 150 50" fill="none" stroke="url(#gold5)" strokeWidth={8} strokeLinecap="round" />
    <circle cx={100} cy={92} r={22} fill="none" stroke="url(#gold5)" strokeWidth={10} />
    <path d="M100 118 C 140 150, 150 200, 100 250 C 50 200, 60 150, 100 118 Z" fill="url(#gem5)" stroke="url(#gold5)" strokeWidth={8} />
    <path d="M86 150 C 80 170, 82 190, 92 205" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth={7} strokeLinecap="round" />
    <circle cx={100} cy={276} r={20} fill="url(#pearl5)" stroke="url(#gold5)" strokeWidth={4} />
  </svg>
);

// A glinting sparkle that twinkles slowly.
export const Twinkle: React.FC<{ x: number; y: number; size?: number; phase?: number }> = ({ x, y, size = 40, phase = 0 }) => {
  const { frame } = useTime();
  const s = 0.55 + 0.45 * Math.sin(frame / 12 + phase);
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ position: "absolute", left: x - size / 2, top: y - size / 2, transform: `scale(${s}) rotate(${frame * 0.6}deg)`, opacity: 0.4 + 0.6 * s }}>
      <path d="M20 0 L24 16 L40 20 L24 24 L20 40 L16 24 L0 20 L16 16 Z" fill="#FDE68A" />
    </svg>
  );
};

// Numbered badge for the five reasons (Bangla digit).
const DIGITS = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮"];

export const ReasonBadge: React.FC<{ n: number; at: number; size?: number; style?: React.CSSProperties }> = ({ n, at, size = 150, style }) => {
  const pal = usePalette();
  const p = useEnter(at);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: pal.button,
        boxShadow: `0 20px 44px rgba(${pal.brandRgb},0.35), inset 0 2px 0 rgba(255,255,255,0.45)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.display,
        fontWeight: 800,
        fontSize: size * 0.6,
        color: "white",
        lineHeight: 1,
        paddingTop: size * 0.06,
        opacity: Math.min(1, p * 1.5),
        transform: `scale(${0.6 + 0.4 * p}) rotate(${(1 - p) * -20}deg)`,
        flexShrink: 0,
        ...style,
      }}
    >
      {DIGITS[n - 1]}
    </div>
  );
};

// Small numbered progress dots across the top: done ones ticked, the current one glowing.
export const ReasonDots: React.FC<{ current: number; at: number; total?: number }> = ({ current, at, total = 5 }) => {
  const pal = usePalette();
  const p = useEnter(at);
  return (
    <div style={{ position: "absolute", top: 70, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 18, opacity: p }}>
      {DIGITS.slice(0, total).map((d, i) => {
        const on = i + 1 === current;
        const done = i + 1 < current;
        return (
          <div
            key={i}
            style={{
              width: on ? 64 : 48,
              height: on ? 64 : 48,
              borderRadius: 99,
              background: on ? pal.button : done ? "rgba(34,197,94,0.22)" : "rgba(255,255,255,0.85)",
              boxShadow: on ? `0 10px 24px rgba(${pal.brandRgb},0.3)` : `0 0 0 1px rgba(${pal.brandRgb},0.15)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.display,
              fontWeight: 800,
              fontSize: on ? 34 : 26,
              color: on ? "white" : done ? pal.brand : pal.inkMuted,
              alignSelf: "center",
            }}
          >
            {d}
          </div>
        );
      })}
    </div>
  );
};

// Glass row: glossy icon on the left, content on the right.
export const Row: React.FC<{ children: React.ReactNode; width?: number; style?: React.CSSProperties }> = ({ children, width = 820, style }) => (
  <Glass style={{ width, padding: "24px 34px", display: "flex", alignItems: "center", gap: 28, ...style }}>{children}</Glass>
);

// The user's product photo (public/products/earrings.jpg, tag text removed) in a glass frame,
// with a slow push-in so it is never static.
export const ProductPhoto: React.FC<{ src?: string; size: number; radius?: number; pushFrom?: number; style?: React.CSSProperties }> = ({
  src = "products/earrings.jpg",
  size,
  radius = 44,
  pushFrom = 1.0,
  style,
}) => {
  const { frame } = useTime();
  const push = pushFrom + Math.min(frame, 300) * 0.00025;
  return (
    <Glass style={{ width: size, height: size, padding: 14, borderRadius: radius, ...style }}>
      <div style={{ width: "100%", height: "100%", borderRadius: radius - 12, overflow: "hidden" }}>
        <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${push})` }} />
      </div>
    </Glass>
  );
};
