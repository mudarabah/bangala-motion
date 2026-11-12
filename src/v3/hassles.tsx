// The six hassles of starting alone (labels from the user's storyboard), shared by the
// pile, the overwhelm, the shatter and the ✅ tracker.
import React from "react";
import type { LucideIcon } from "lucide-react";
import { Check, FileText, Globe, Package, Search, Sheet, Warehouse } from "lucide-react";
import { useEnter, usePalette } from "../components/kit";
import { fonts, greenIconTints as T } from "../theme";

export type Hassle = { label: string; short: string; icon: LucideIcon; tint: [string, string] };

export const HASSLES: Hassle[] = [
  { label: "প্রোডাক্ট সোর্সিং", short: "প্রোডাক্ট", icon: Search, tint: T.sky },
  { label: "বাসায় স্টক রাখা", short: "স্টক", icon: Warehouse, tint: T.orange },
  { label: "ওয়েবসাইট তৈরি", short: "ওয়েবসাইট", icon: Globe, tint: T.teal },
  { label: "প্যাকেজিং", short: "প্যাকেজিং", icon: Package, tint: T.lime },
  { label: "কুরিয়ার একাউন্ট খোলা", short: "কুরিয়ার", icon: FileText, tint: T.green },
  { label: "কুরিয়ার ডাটা এন্ট্রি", short: "ডাটা এন্ট্রি", icon: Sheet, tint: T.rose },
];

// One hassle as a solid block for the pile.
export const HassleBlock: React.FC<{ h: Hassle; width?: number; style?: React.CSSProperties }> = ({ h, width = 470, style }) => {
  const pal = usePalette();
  const Icon = h.icon;
  return (
    <div
      style={{
        width,
        height: 92,
        borderRadius: 24,
        background: "rgba(255,255,255,0.95)",
        boxShadow: `0 14px 30px rgba(${pal.shadowRgb},0.14), 0 0 0 1px rgba(${pal.brandRgb},0.10)`,
        borderLeft: `10px solid ${h.tint[1]}`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "0 26px",
        fontFamily: fonts.display,
        fontWeight: 700,
        fontSize: 36,
        color: pal.ink,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <Icon size={40} color={h.tint[1]} strokeWidth={2.4} />
      {h.label}
    </div>
  );
};

// Row of the six hassles along the bottom; each turns ✅ at its cue.
export const SolvedTracker: React.FC<{ at: number; solvedAt: number[] }> = ({ at, solvedAt }) => {
  const pal = usePalette();
  const show = useEnter(at);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 952, display: "flex", justifyContent: "center", gap: 16, opacity: show }}>
      {HASSLES.map((h, i) => (
        <TrackerChip key={i} h={h} at={solvedAt[i]} ink={pal.ink} />
      ))}
    </div>
  );
};

const TrackerChip: React.FC<{ h: Hassle; at: number; ink: string }> = ({ h, at, ink }) => {
  const pal = usePalette();
  const p = useEnter(at);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 20px 8px 10px",
        borderRadius: 99,
        background: `rgba(255,255,255,${0.7 + 0.25 * p})`,
        boxShadow: `0 8px 20px rgba(${pal.shadowRgb},0.10), 0 0 0 ${2 * p}px rgba(${pal.glowRgb},0.6)`,
        fontFamily: fonts.body,
        fontWeight: 600,
        fontSize: 24,
        color: ink,
        opacity: 0.55 + 0.45 * p,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 99,
          background: p > 0.01 ? `linear-gradient(160deg, #6EE7B7, #16A34A)` : pal.lineStrong,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${0.7 + 0.3 * Math.max(p, 0.001)})`,
        }}
      >
        <Check size={22} color="white" strokeWidth={3.4} style={{ opacity: p }} />
      </div>
      {h.short}
    </div>
  );
};
