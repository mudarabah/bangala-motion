// Shared pieces for the Mudarabah explainer (2026-11-12 voice, green-glass):
// the savings jar, the two partner nodes, coins, the balance scale and light sweeps.
import React from "react";
import type { LucideIcon } from "lucide-react";
import { Easing, interpolate } from "remotion";
import { Glass, IconTile, Label, useEnter, usePalette, useProgress, useTime } from "../components/kit";
import { fonts } from "../theme";
import { GradText } from "../v2/ui";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- coin ----------

export const Coin: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 56, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 999,
      background: "radial-gradient(circle at 35% 30%, #FFF3C4, #FCD34D 45%, #F59E0B)",
      boxShadow: `inset 0 -${size * 0.06}px ${size * 0.12}px rgba(180,83,9,0.35), 0 ${size * 0.12}px ${size * 0.3}px rgba(245,158,11,0.35)`,
      border: `${Math.max(2, size * 0.05)}px solid #FDE68A`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: fonts.display,
      fontWeight: 800,
      fontSize: size * 0.5,
      color: "#B45309",
      lineHeight: 1,
      ...style,
    }}
  >
    ৳
  </div>
);

// ---------- savings jar ----------

// A frosted glass jar of coins. `fog` 0..1 frosts it over (idle money);
// `glow` 0..1 makes it bright and alive.
export const Jar: React.FC<{ fog: number; glow?: number; coinsIn?: Partial<Record<number, number>>; lift?: number; scale?: number }> = ({
  fog,
  glow = 0,
  coinsIn,
  lift = 0,
  scale = 1,
}) => {
  const { frame } = useTime();
  const W = 420;
  const H = 520;
  // eleven coins resting in the jar, stacked loosely
  const rest: [number, number][] = [
    [90, 430], [150, 440], [210, 436], [270, 442], [330, 432],
    [120, 384], [184, 392], [248, 388], [306, 380],
    [154, 340], [222, 344],
  ];
  return (
    <div style={{ position: "relative", width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
      {/* glow behind */}
      <div
        style={{
          position: "absolute",
          inset: -120,
          background: `radial-gradient(closest-side, rgba(34,197,94,${0.35 * glow}), rgba(34,197,94,0))`,
        }}
      />
      {/* lid */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 20,
          width: 200,
          height: 52,
          borderRadius: 16,
          background: "linear-gradient(180deg, #D1FAE5, #86EFAC)",
          boxShadow: "inset 0 2px 0 rgba(255,255,255,0.7), 0 8px 18px rgba(20,83,45,0.12)",
        }}
      />
      {/* body */}
      <div
        style={{
          position: "absolute",
          left: 30,
          top: 70,
          width: 360,
          height: 430,
          borderRadius: "60px 60px 80px 80px",
          background: "linear-gradient(160deg, rgba(255,255,255,0.75), rgba(220,252,231,0.45))",
          border: "2px solid rgba(255,255,255,0.95)",
          boxShadow: `0 30px 70px rgba(20,83,45,0.14), inset 0 0 0 1px rgba(22,163,74,0.12), 0 0 0 ${6 * glow}px rgba(34,197,94,${0.18 * glow})`,
          overflow: "hidden",
        }}
      >
        {rest.map(([x, y], i) => {
          // coins that drop in at given times (seconds) start above the jar
          const at = coinsIn?.[i];
          return <JarCoin key={i} x={x - 30} y={y - 70} at={at} lift={lift} i={i} frame={frame} />;
        })}
        {/* frost */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(241,245,243,0.92), rgba(226,232,229,0.85))",
            opacity: fog * 0.85,
          }}
        />
        {/* highlight */}
        <div
          style={{
            position: "absolute",
            left: 34,
            top: 40,
            width: 34,
            height: 300,
            borderRadius: 30,
            background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0))",
          }}
        />
      </div>
    </div>
  );
};

const JarCoin: React.FC<{ x: number; y: number; at?: number; lift: number; i: number; frame: number }> = ({ x, y, at, lift, i, frame }) => {
  const { f } = useTime();
  const drop = at === undefined ? 1 : interpolate(frame, [f(at) - 4, f(at) + 8], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  const bob = lift * (Math.sin(frame / 14 + i * 1.3) * 0.5 + 0.5) * (i % 3 === 0 ? 60 : 24);
  return (
    <div style={{ position: "absolute", left: x, top: y - (1 - drop) * 520 - bob, opacity: at === undefined ? 1 : Math.min(1, drop * 3) }}>
      <Coin size={58} />
    </div>
  );
};

// ---------- small clock ----------

// A glass clock whose hand turns, stops at `stopAt`, and (optionally) starts again at `startAt`.
export const Clock: React.FC<{ stopAt?: number; startAt?: number; size?: number; style?: React.CSSProperties }> = ({
  stopAt,
  startAt,
  size = 110,
  style,
}) => {
  const { frame, f } = useTime();
  const pal = usePalette();
  let t = frame;
  if (stopAt !== undefined && frame > f(stopAt)) t = f(stopAt);
  if (startAt !== undefined) t = frame < f(startAt) ? 0 : frame - f(startAt);
  const angle = t * 6;
  return (
    <Glass style={{ width: size, height: size, padding: 0, borderRadius: 999, ...style }}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx={50} cy={50} r={4} fill={pal.brand} />
        {[0, 90, 180, 270].map((a) => (
          <rect key={a} x={48.5} y={12} width={3} height={8} rx={1.5} fill={pal.lineStrong} transform={`rotate(${a} 50 50)`} />
        ))}
        <line x1={50} y1={50} x2={50} y2={22} stroke={pal.ink} strokeWidth={4} strokeLinecap="round" transform={`rotate(${angle} 50 50)`} />
        <line x1={50} y1={50} x2={66} y2={50} stroke={pal.brand} strokeWidth={4} strokeLinecap="round" />
      </svg>
    </Glass>
  );
};

// ---------- partner node ----------

// One partner in the diagram: a round glass disc with a glossy icon and a label.
export const NODE_L = { x: 420, y: 470 };
export const NODE_R = { x: 1500, y: 470 };
export const NODE_SIZE = 240;

export const PartnerNode: React.FC<{
  x: number;
  y: number;
  icon: LucideIcon;
  tint: [string, string];
  at: number;
  label?: React.ReactNode;
  sub?: React.ReactNode;
  active?: number;
  dim?: number;
  size?: number;
  children?: React.ReactNode;
}> = ({ x, y, icon, tint, at, label, sub, active = 0, dim = 0, size = NODE_SIZE, children }) => {
  const p = useEnter(at);
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        opacity: p * (1 - 0.6 * dim),
        transform: `scale(${0.9 + 0.1 * p})`,
        filter: dim > 0 ? `blur(${dim * 3}px)` : undefined,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Glass active={active} style={{ width: size, height: size, padding: 0, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <IconTile icon={icon} tint={tint} size={size * 0.46} />
        {children}
      </Glass>
      {label ? <div style={{ marginTop: 22, textAlign: "center", whiteSpace: "nowrap" }}>{label}</div> : null}
      {sub ? (
        <Label size={34} muted style={{ marginTop: 4, textAlign: "center", whiteSpace: "nowrap" }}>
          {sub}
        </Label>
      ) : null}
    </div>
  );
};

// ---------- light ----------

// A soft band of light that passes once across its parent.
export const Sweep: React.FC<{ from: number; to: number; strength?: number }> = ({ from, to, strength = 0.85 }) => {
  const p = useProgress(from, to);
  if (p <= 0 || p >= 1) return null;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", borderRadius: "inherit" }}>
      <div
        style={{
          position: "absolute",
          top: "-30%",
          bottom: "-30%",
          width: "28%",
          left: `${-30 + p * 140}%`,
          transform: "skewX(-18deg)",
          background: `linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,${strength}), rgba(255,255,255,0))`,
        }}
      />
    </div>
  );
};

// A big hero word: rises out of a mask with a light sweep across it.
export const HeroWord: React.FC<{ text: React.ReactNode; at: number; size: number; style?: React.CSSProperties }> = ({ text, at, size, style }) => {
  const { frame, f } = useTime();
  const s = f(at) - 4;
  const p = interpolate(frame, [s, s + 16], [0, 1], { ...clamp, easing: Easing.bezier(0.22, 1, 0.36, 1) });
  return (
    <div style={{ position: "relative", display: "inline-block", overflow: "hidden", padding: "0 0.1em", ...style }}>
      <div style={{ transform: `translateY(${(1 - p) * 70}%) scale(${0.96 + 0.04 * p})`, opacity: Math.min(1, p * 1.5) }}>
        <GradText size={size} style={{ whiteSpace: "nowrap", filter: "drop-shadow(0 10px 26px rgba(20,83,45,0.18))" }}>
          {text}
        </GradText>
      </div>
      <Sweep from={at + 0.25} to={at + 1.15} strength={0.9} />
    </div>
  );
};

// ---------- balance scale ----------

// A glass balance. `tilt` in degrees (positive = right pan down).
export const Balance: React.FC<{ tilt: number; width?: number; left?: React.ReactNode; right?: React.ReactNode }> = ({
  tilt,
  width = 860,
  left,
  right,
}) => {
  const pal = usePalette();
  const H = width * 0.62;
  const cx = width / 2;
  const beamY = H * 0.2;
  const arm = width * 0.4;
  const rad = (tilt * Math.PI) / 180;
  const lx = cx - arm * Math.cos(rad);
  const ly = beamY - arm * Math.sin(rad);
  const rx = cx + arm * Math.cos(rad);
  const ry = beamY + arm * Math.sin(rad);
  const drop = H * 0.34;
  const Pan: React.FC<{ x: number; y: number; children?: React.ReactNode }> = ({ x, y, children }) => (
    <>
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={width} height={H}>
        <line x1={x} y1={y} x2={x - 90} y2={y + drop} stroke={pal.lineStrong} strokeWidth={4} />
        <line x1={x} y1={y} x2={x + 90} y2={y + drop} stroke={pal.lineStrong} strokeWidth={4} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: x - 130,
          top: y + drop - 10,
          width: 260,
          height: 40,
          borderRadius: "0 0 130px 130px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(209,250,229,0.9))",
          boxShadow: `0 16px 34px rgba(${pal.shadowRgb},0.16), 0 0 0 1px rgba(${pal.brandRgb},0.12)`,
        }}
      />
      <div style={{ position: "absolute", left: x - 70, top: y + drop - 150, width: 140, height: 140, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        {children}
      </div>
    </>
  );
  return (
    <div style={{ position: "relative", width, height: H + 90 }}>
      {/* post and base */}
      <div style={{ position: "absolute", left: cx - 9, top: beamY, width: 18, height: H * 0.78, borderRadius: 9, background: "linear-gradient(180deg, #BBF7D0, #86EFAC)" }} />
      <div
        style={{
          position: "absolute",
          left: cx - 150,
          top: beamY + H * 0.76,
          width: 300,
          height: 46,
          borderRadius: 24,
          background: "rgba(255,255,255,0.92)",
          boxShadow: `0 16px 34px rgba(${pal.shadowRgb},0.14), 0 0 0 1px rgba(${pal.brandRgb},0.12)`,
        }}
      />
      {/* beam */}
      <div
        style={{
          position: "absolute",
          left: cx - arm - 20,
          top: beamY - 11,
          width: arm * 2 + 40,
          height: 22,
          borderRadius: 11,
          background: pal.keyword,
          transform: `rotate(${tilt}deg)`,
          transformOrigin: "50% 50%",
          boxShadow: `0 10px 24px rgba(${pal.brandRgb},0.25)`,
        }}
      />
      <div style={{ position: "absolute", left: cx - 26, top: beamY - 26, width: 52, height: 52, borderRadius: 99, background: "white", boxShadow: `0 6px 16px rgba(${pal.shadowRgb},0.18)` }} />
      <Pan x={lx} y={ly}>{left}</Pan>
      <Pan x={rx} y={ry}>{right}</Pan>
    </div>
  );
};

// ---------- text helpers ----------

// A short Bangla label in the display face.
export const Tag: React.FC<{ children: React.ReactNode; size?: number; muted?: boolean; style?: React.CSSProperties }> = ({
  children,
  size = 44,
  muted,
  style,
}) => {
  const pal = usePalette();
  return (
    <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: size, color: muted ? pal.inkMuted : pal.ink, lineHeight: 1.2, ...style }}>
      {children}
    </span>
  );
};

// Moves a value along a path between two times: returns 0..1 with a calm ease.
export const useTravel = (from: number, to: number) => useProgress(from, to, Easing.bezier(0.45, 0, 0.25, 1));
