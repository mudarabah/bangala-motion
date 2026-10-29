import type { LucideIcon } from "lucide-react";
import { Play } from "lucide-react";
import React from "react";

const HUES = [
  ["#C4B5FD", "#7C3AED"],
  ["#FBCFE8", "#DB2777"],
  ["#BAE6FD", "#0284C7"],
  ["#FDE68A", "#D97706"],
  ["#A7F3D0", "#059669"],
  ["#DDD6FE", "#6D28D9"],
] as const;

// Vector video thumbnail: gradient scene, abstract shapes, play button,
// duration badge, and skeleton title lines (no real text or brands).
export const VideoThumb: React.FC<{
  hue?: number;
  icon?: LucideIcon;
  duration?: string;
  width: number;
  showMeta?: boolean;
  style?: React.CSSProperties;
}> = ({ hue = 0, icon: Icon, duration, width, showMeta = true, style }) => {
  const [a, b] = HUES[hue % HUES.length];
  const h = (width * 9) / 16;
  return (
    <div style={{ width, ...style }}>
      <div
        style={{
          width,
          height: h,
          borderRadius: width * 0.06,
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${a}, ${b})`,
          boxShadow: "0 18px 40px rgba(30,19,64,0.18)",
        }}
      >
        <div style={{ position: "absolute", width: h * 1.1, height: h * 1.1, borderRadius: 999, right: -h * 0.3, top: -h * 0.4, background: "rgba(255,255,255,0.22)" }} />
        <div style={{ position: "absolute", width: h * 0.7, height: h * 0.7, borderRadius: 999, left: -h * 0.2, bottom: -h * 0.35, background: "rgba(255,255,255,0.16)" }} />
        {Icon ? (
          <div style={{ position: "absolute", left: width * 0.08, top: h * 0.2 }}>
            <Icon size={h * 0.42} color="rgba(255,255,255,0.92)" strokeWidth={1.8} />
          </div>
        ) : null}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            translate: "-50% -50%",
            width: h * 0.34,
            height: h * 0.34,
            borderRadius: 999,
            background: "rgba(255,255,255,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 24px rgba(30,19,64,0.25)",
          }}
        >
          <Play size={h * 0.15} color={b} fill={b} style={{ marginLeft: h * 0.02 }} />
        </div>
        {duration ? (
          <div
            style={{
              position: "absolute",
              right: width * 0.04,
              bottom: width * 0.04,
              padding: `${width * 0.01}px ${width * 0.025}px`,
              borderRadius: width * 0.02,
              background: "rgba(15,10,30,0.78)",
              color: "white",
              fontFamily: "sans-serif",
              fontWeight: 700,
              fontSize: width * 0.055,
            }}
          >
            {duration}
          </div>
        ) : null}
      </div>
      {showMeta ? (
        <div style={{ display: "flex", gap: width * 0.04, marginTop: width * 0.05 }}>
          <div style={{ width: width * 0.13, height: width * 0.13, borderRadius: 999, background: `linear-gradient(135deg, ${a}, ${b})`, flexShrink: 0 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: width * 0.025, paddingTop: width * 0.01 }}>
            <div style={{ height: width * 0.04, borderRadius: 99, background: "rgba(30,19,64,0.16)", width: "92%" }} />
            <div style={{ height: width * 0.04, borderRadius: 99, background: "rgba(30,19,64,0.1)", width: "64%" }} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
