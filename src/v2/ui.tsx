// Small building blocks shared by the Reseller & Investment scenes (green-glass).
import React from "react";
import type { LucideIcon } from "lucide-react";
import { Appear, Glass, Headline, IconTile, Label, useActive, useProgress, usePalette, type WordSpec } from "../components/kit";
import { fonts } from "../theme";

// Headline across the top of the frame.
export const TopLine: React.FC<{ words: WordSpec[]; size?: number; top?: number }> = ({ words, size = 92, top = 90 }) => (
  <Headline style={{ position: "absolute", top, left: 80, right: 80 }} size={size} words={words} />
);

// Glass card with a glossy icon and a label, entering at `at`.
export const IconCard: React.FC<{
  at: number;
  icon: LucideIcon;
  tint: [string, string];
  label: React.ReactNode;
  sub?: React.ReactNode;
  width?: number;
  iconSize?: number;
  activeFrom?: number;
  activeTo?: number;
  style?: React.CSSProperties;
  row?: boolean;
}> = ({ at, icon, tint, label, sub, width = 340, iconSize = 104, activeFrom, activeTo, style, row }) => {
  const active = useActive(activeFrom ?? 0, activeTo);
  return (
    <Appear at={at} style={style}>
      <Glass
        active={activeFrom === undefined ? 0 : active}
        style={{
          width,
          display: "flex",
          flexDirection: row ? "row" : "column",
          alignItems: "center",
          gap: row ? 26 : 20,
          padding: row ? "26px 34px" : "34px 28px",
          textAlign: row ? "left" : "center",
        }}
      >
        <IconTile icon={icon} tint={tint} size={iconSize} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Label size={40} style={{ fontFamily: fonts.display, fontWeight: 700, lineHeight: 1.25 }}>
            {label}
          </Label>
          {sub ? (
            <Label size={28} muted>
              {sub}
            </Label>
          ) : null}
        </div>
      </Glass>
    </Appear>
  );
};

// Latin words inside Bangla text.
export const En: React.FC<{ children: React.ReactNode; weight?: number }> = ({ children, weight = 600 }) => (
  <span style={{ fontFamily: fonts.ui, fontWeight: weight, fontSize: "0.86em" }}>{children}</span>
);

// Horizontal connector that draws itself between `from` and `to`.
export const Connector: React.FC<{ x: number; y: number; width: number; from: number; to: number; dashed?: boolean }> = ({
  x,
  y,
  width,
  from,
  to,
  dashed,
}) => {
  const pal = usePalette();
  const p = useProgress(from, to);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y - 3,
        width: width * p,
        height: 6,
        borderRadius: 6,
        background: dashed ? `repeating-linear-gradient(90deg, ${pal.brand} 0 14px, transparent 14px 26px)` : pal.keyword,
        opacity: 0.7,
      }}
    />
  );
};

// A red line drawn through something that is ruled out.
export const Strike: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, children, style }) => {
  const p = useProgress(at, at + 0.35);
  return (
    <span style={{ position: "relative", display: "inline-block", ...style }}>
      {children}
      <span
        style={{
          position: "absolute",
          left: -6,
          top: "52%",
          height: 7,
          width: `calc(${p * 100}% + 12px)`,
          borderRadius: 6,
          background: "#EF4444",
          boxShadow: "0 4px 10px rgba(239,68,68,0.35)",
        }}
      />
    </span>
  );
};

// Skeleton line for UI mocks.
export const Skel: React.FC<{ w: number; strong?: boolean; p?: number }> = ({ w, strong, p = 1 }) => {
  const pal = usePalette();
  return <div style={{ height: strong ? 14 : 10, width: w * p, borderRadius: 8, background: strong ? pal.lineStrong : pal.lineSoft }} />;
};

// Text filled with the keyword gradient (for numbers and short labels).
export const GradText: React.FC<{ children: React.ReactNode; size: number; style?: React.CSSProperties }> = ({ children, size, style }) => {
  const pal = usePalette();
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: fonts.display,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.2,
        padding: "0.05em 0.06em",
        backgroundImage: pal.keyword,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        ...style,
      }}
    >
      {children}
    </span>
  );
};

// Small round person avatar (no faces: initials-free glossy dot with an icon).
export const Avatar: React.FC<{ size?: number; tint: [string, string]; icon: LucideIcon; style?: React.CSSProperties }> = ({
  size = 64,
  tint,
  icon: Icon,
  style,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 999,
      background: `linear-gradient(160deg, ${tint[0]}, ${tint[1]})`,
      boxShadow: `0 ${size * 0.12}px ${size * 0.3}px ${tint[1]}55, inset 0 2px 0 rgba(255,255,255,0.5)`,
      border: "3px solid white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}
  >
    <Icon size={size * 0.5} color="white" strokeWidth={2.4} />
  </div>
);
