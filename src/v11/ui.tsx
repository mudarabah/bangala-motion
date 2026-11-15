// Shared pieces for the two-part Facebook ads story (Rumana): colour washes, extra tints,
// headers and small number cards. Light glass throughout; colour comes from washes and tiles.
import React from "react";
import type { LucideIcon } from "lucide-react";
import { useCurrentFrame } from "remotion";
import { Glass, IconTile, Pop } from "../components/kit";
import { fonts, greenIconTints as T } from "../theme";

// Extra tints so the long video is not all green.
export const C = {
  green: T.green,
  teal: T.teal,
  orange: T.orange,
  lime: T.lime,
  sky: T.sky,
  rose: T.rose,
  blue: ["#93C5FD", "#2563EB"] as [string, string],
  violet: ["#C4B5FD", "#7C3AED"] as [string, string],
  indigo: ["#A5B4FC", "#4F46E5"] as [string, string],
  pink: ["#F9A8D4", "#DB2777"] as [string, string],
  amber: ["#FDE68A", "#F59E0B"] as [string, string],
};

export const ROSE = "#E11D48";

// A large soft colour field behind a scene (two drifting blobs), e.g. "blue" for Facebook topics.
const WASH: Record<string, [string, string]> = {
  blue: ["96,165,250", "167,139,250"],
  violet: ["167,139,250", "244,114,182"],
  amber: ["252,211,77", "251,146,60"],
  pink: ["244,114,182", "253,186,140"],
  teal: ["45,212,191", "96,165,250"],
  green: ["134,239,172", "45,212,191"],
  rose: ["251,113,133", "252,211,77"],
};

export const Wash: React.FC<{ tone: keyof typeof WASH; k?: number }> = ({ tone, k = 1 }) => {
  const frame = useCurrentFrame();
  const [a, b] = WASH[tone];
  const d = (p: number, amp: number) => Math.sin(frame / p) * amp;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", width: 1300, height: 1100, left: 900 + d(90, 60), top: -420 + d(110, 40), background: `radial-gradient(closest-side, rgba(${a},${0.34 * k}), rgba(${a},0))` }} />
      <div style={{ position: "absolute", width: 1200, height: 1000, left: -380 + d(100, 50), top: 420 + d(80, 40), background: `radial-gradient(closest-side, rgba(${b},${0.26 * k}), rgba(${b},0))` }} />
    </div>
  );
};

// Round numbered badge in a given tint.
export const NumBadge: React.FC<{ at: number; n: string; tint?: [string, string]; size?: number }> = ({ at, n, tint = C.green, size = 110 }) => (
  <Pop at={at}>
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: `linear-gradient(160deg, ${tint[0]}, ${tint[1]})`,
        boxShadow: `0 14px 30px ${tint[1]}55, inset 0 2px 0 rgba(255,255,255,0.45)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.display,
        fontWeight: 800,
        fontSize: size * 0.58,
        color: "white",
        paddingTop: size * 0.05,
      }}
    >
      {n}
    </div>
  </Pop>
);

// Glass tile with a glossy icon, a big value and a small caption.
export const StatCard: React.FC<{ icon: LucideIcon; tint: [string, string]; value: React.ReactNode; caption?: React.ReactNode; width?: number; style?: React.CSSProperties }> = ({
  icon,
  tint,
  value,
  caption,
  width = 340,
  style,
}) => (
  <Glass style={{ width, padding: "26px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, ...style }}>
    <IconTile icon={icon} tint={tint} size={84} />
    <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 64, lineHeight: 1.1, color: tint[1] }}>{value}</div>
    {caption ? <div style={{ textAlign: "center" }}>{caption}</div> : null}
  </Glass>
);

// Big gradient number in Bangla digits.
export const BigNum: React.FC<{ children: React.ReactNode; size?: number; tint?: [string, string]; style?: React.CSSProperties }> = ({ children, size = 120, tint = ["#16A34A", "#0D9488"], style }) => (
  <span
    style={{
      fontFamily: fonts.display,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.1,
      backgroundImage: `linear-gradient(90deg, ${tint[0]}, ${tint[1]})`,
      WebkitBackgroundClip: "text",
      color: "transparent",
      padding: "0 0.05em",
      ...style,
    }}
  >
    {children}
  </span>
);
