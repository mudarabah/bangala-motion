import type { LucideIcon } from "lucide-react";
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { exitFactor, useProgress } from "./anim";

const TINTS = {
  brand: [colors.brand2, colors.brand, "rgba(124,58,237,0.55)"],
  magenta: ["#E879F9", colors.magenta, "rgba(192,38,211,0.5)"],
  amber: ["#FFD452", "#E09A00", "rgba(245,179,0,0.5)"],
  danger: ["#FF8A8A", colors.danger, "rgba(239,68,68,0.5)"],
  success: ["#6EE7B7", colors.success, "rgba(16,185,129,0.5)"],
} as const;

// Glossy 3D icon sphere with soft glow; floats gently once in.
export const IconOrb: React.FC<{
  icon: LucideIcon;
  at: number;
  exitAt?: number;
  size?: number;
  tint?: keyof typeof TINTS;
  bob?: boolean;
  style?: React.CSSProperties;
}> = ({ icon: Icon, at, exitAt, size = 260, tint = "brand", bob = true, style }) => {
  const frame = useCurrentFrame();
  const p = useProgress(at, 14);
  const shown = p * exitFactor(frame, exitAt);
  const [light, dark, glow] = TINTS[tint];
  const float = bob ? Math.sin((frame - at) / 18) * 10 : 0;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        position: "relative",
        background: `radial-gradient(circle at 32% 26%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 32%), linear-gradient(150deg, ${light}, ${dark})`,
        boxShadow: `inset -${size * 0.06}px -${size * 0.08}px ${size * 0.16}px rgba(30,19,64,0.35), inset ${size * 0.04}px ${size * 0.05}px ${size * 0.1}px rgba(255,255,255,0.45), 0 ${size * 0.18}px ${size * 0.4}px ${glow}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: shown,
        scale: interpolate(shown, [0, 1], [0.6, 1]),
        transform: `translateY(${float + (1 - shown) * 40}px)`,
        filter: shown >= 0.999 ? undefined : `blur(${(1 - shown) * 16}px)`,
        ...style,
      }}
    >
      <Icon size={size * 0.46} color="#FFFFFF" strokeWidth={2} style={{ filter: "drop-shadow(0 6px 10px rgba(30,19,64,0.35))" }} />
    </div>
  );
};
