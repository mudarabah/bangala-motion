import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { colors } from "../theme";

// Lavender world behind the footage: slowly drifting colour fields.
export const BrandBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const d = (speed: number, amp: number, phase = 0) => Math.sin(frame / speed + phase) * amp;
  const field = (style: React.CSSProperties): React.CSSProperties => ({ position: "absolute", borderRadius: 999, ...style });
  return (
    <AbsoluteFill style={{ backgroundColor: colors.base, overflow: "hidden" }}>
      <div style={field({ width: 1700, height: 1700, left: -600 + d(90, 120), top: 1250 + d(110, 90, 1), background: colors.violetField, opacity: 0.42, filter: "blur(280px)" })} />
      <div style={field({ width: 1400, height: 1400, right: -500 + d(100, 110, 2), top: -350 + d(80, 80), background: colors.peachField, opacity: 0.32, filter: "blur(260px)" })} />
      <div style={field({ width: 1100, height: 1100, right: -200 + d(120, 140, 3), top: 1500 + d(95, 100, 2), background: "#F0ABFC", opacity: 0.22, filter: "blur(240px)" })} />
      <Bokeh seed="back" count={22} />
    </AbsoluteFill>
  );
};

// Soft floating light particles. `front` = bigger, blurrier, faster (depth of field).
export const Bokeh: React.FC<{ seed: string; count?: number; front?: boolean; opacity?: number }> = ({
  seed,
  count = 14,
  front = false,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      {Array.from({ length: count }, (_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const size = front ? 60 + r("s") * 140 : 14 + r("s") * 46;
        const speed = (front ? 1.6 : 0.6) + r("v") * 0.8;
        const y = ((r("y") * 3400 - frame * speed) % 3400 + 3400) % 3400 - 400; // wraps at -400 / 3000, always off-screen
        const x = r("x") * 2160 + Math.sin(frame / (40 + r("p") * 40) + i) * 30;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: 999,
              background: front ? "rgba(255,255,255,0.55)" : r("c") > 0.5 ? "rgba(168,85,247,0.35)" : "rgba(255,255,255,0.8)",
              filter: `blur(${front ? 18 + r("b") * 14 : 2 + r("b") * 5}px)`,
              opacity: 0.35 + r("o") * 0.5,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Soft diagonal light sweep, used on framing changes (never a hard flash).
// Starts and ends fully off-screen and fades at both ends, so it never pops.
export const LightSweep: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 18], [-140, 190]);
  const opacity = interpolate(frame, [0, 5, 13, 18], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden", opacity }}>
      <div
        style={{
          position: "absolute",
          top: "-30%",
          bottom: "-30%",
          left: `${x}%`,
          width: "40%",
          rotate: "18deg",
          background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
