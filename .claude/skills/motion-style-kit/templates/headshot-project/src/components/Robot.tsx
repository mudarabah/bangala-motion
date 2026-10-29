import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { exitFactor, useProgress } from "./anim";

// Vector 3D robot mascot (no image file). Designed in a 500 x 640 box.
// at: pops in · scanAt: eyes flash (it "scans" the footage) · pointAt: right
// arm rises to point at the text on its right · exitAt: leaves.
const SHELL = "linear-gradient(160deg, #FFFFFF 0%, #F1ECFF 45%, #CDBDFF 100%)";
const SHELL_SHADOW =
  "inset -18px -24px 40px rgba(76,29,149,0.28), inset 12px 14px 26px rgba(255,255,255,0.95), 0 30px 60px rgba(27,16,64,0.35)";

export const Robot: React.FC<{
  at: number;
  scanAt?: number;
  pointAt?: number;
  exitAt?: number;
  scale?: number;
  style?: React.CSSProperties;
}> = ({ at, scanAt, pointAt, exitAt, scale = 1, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = useProgress(at, 18);
  const shown = enter * exitFactor(frame, exitAt);
  const t = frame - at;
  const bob = Math.sin(t / 14) * 10;
  const sway = Math.sin(t / 22) * 2;
  // blink every ~2.4 s, 4 frames long
  const phase = ((t % 60) + 60) % 60;
  const blink = phase >= 52 && phase < 56 ? 0.12 : 1;
  const scan = scanAt === undefined ? 0 : interpolate(frame, [scanAt, scanAt + 4, scanAt + 18], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const point = pointAt === undefined ? 0 : spring({ frame: frame - pointAt, fps, config: { damping: 200 }, durationInFrames: 14 });
  const look = 10 + point * 10; // eyes drift toward the text (right)
  const core = 0.75 + 0.25 * Math.sin(t / 6);
  const antenna = 0.6 + 0.4 * Math.sin(t / 5);

  const abs = (s: React.CSSProperties): React.CSSProperties => ({ position: "absolute", ...s });
  const eye = (left: number): React.CSSProperties =>
    abs({
      left,
      top: 168,
      width: 66,
      height: 84,
      borderRadius: 40,
      background: "#FFFFFF",
      transform: `translateX(${look}px) scaleY(${blink})`,
      boxShadow: `0 0 ${24 + 40 * scan}px ${6 + 14 * scan}px rgba(232,121,249,${0.75 + 0.25 * scan})`,
    });

  return (
    <div
      style={{
        width: 500,
        height: 640,
        position: "relative",
        transformOrigin: "50% 100%",
        opacity: shown,
        transform: `translateY(${(1 - shown) * 220 + bob}px) rotate(${(1 - shown) * -10 + sway}deg) scale(${scale * interpolate(shown, [0, 1], [0.7, 1])})`,
        filter: shown >= 0.999 ? "drop-shadow(0 40px 60px rgba(27,16,64,0.45))" : `blur(${(1 - shown) * 18}px) drop-shadow(0 40px 60px rgba(27,16,64,0.45))`,
        ...style,
      }}
    >
      {/* antenna */}
      <div style={abs({ left: 245, top: 6, width: 10, height: 70, borderRadius: 6, background: "#B9A5F5" })} />
      <div
        style={abs({
          left: 226,
          top: -14,
          width: 48,
          height: 48,
          borderRadius: 99,
          background: `radial-gradient(circle at 35% 30%, #FFFFFF, ${colors.magenta} 60%)`,
          boxShadow: `0 0 ${20 + 26 * antenna}px rgba(192,38,211,${0.5 + 0.4 * antenna})`,
        })}
      />
      {/* ears */}
      <div style={abs({ left: 8, top: 178, width: 70, height: 110, borderRadius: 36, background: `linear-gradient(160deg, ${colors.brand2}, ${colors.brand})`, boxShadow: SHELL_SHADOW })} />
      <div style={abs({ left: 422, top: 178, width: 70, height: 110, borderRadius: 36, background: `linear-gradient(160deg, ${colors.brand2}, ${colors.brand})`, boxShadow: SHELL_SHADOW })} />
      {/* head */}
      <div style={abs({ left: 40, top: 60, width: 420, height: 320, borderRadius: 140, background: SHELL, boxShadow: SHELL_SHADOW })} />
      {/* face screen */}
      <div
        style={abs({
          left: 92,
          top: 118,
          width: 316,
          height: 210,
          borderRadius: 92,
          background: "linear-gradient(160deg, #2B1A5E, #120A2E)",
          boxShadow: "inset 0 0 0 4px rgba(167,139,250,0.45), inset 0 18px 30px rgba(255,255,255,0.08)",
          overflow: "hidden",
        })}
      >
        <div style={abs({ left: -60, top: -80, width: 260, height: 160, borderRadius: 99, background: "rgba(255,255,255,0.08)", rotate: "-18deg" })} />
      </div>
      <div style={eye(150)} />
      <div style={eye(284)} />
      {/* smile */}
      <div
        style={abs({
          left: 214 + look * 0.6,
          top: 262,
          width: 72,
          height: 30,
          borderBottom: "7px solid rgba(255,255,255,0.85)",
          borderRadius: "0 0 40px 40px",
        })}
      />
      {/* neck + body */}
      <div style={abs({ left: 210, top: 372, width: 80, height: 44, borderRadius: 12, background: "#B9A5F5" })} />
      <div style={abs({ left: 110, top: 404, width: 280, height: 210, borderRadius: 96, background: SHELL, boxShadow: SHELL_SHADOW })} />
      <div
        style={abs({
          left: 212,
          top: 466,
          width: 76,
          height: 76,
          borderRadius: 99,
          background: `radial-gradient(circle at 35% 30%, #FFFFFF, ${colors.brand2} 45%, ${colors.brand})`,
          boxShadow: `0 0 ${18 + 30 * core}px rgba(168,85,247,${0.4 + 0.4 * core})`,
        })}
      />
      {/* left arm (hangs) */}
      <div style={abs({ left: 52, top: 420, width: 64, height: 170, borderRadius: 40, background: SHELL, boxShadow: SHELL_SHADOW, transformOrigin: "50% 12%", rotate: `${12 + Math.sin(t / 18) * 3}deg` })} />
      {/* right arm: rises to point at the text */}
      <div
        style={abs({
          left: 384,
          top: 420,
          width: 64,
          height: 170,
          borderRadius: 40,
          background: SHELL,
          boxShadow: SHELL_SHADOW,
          transformOrigin: "50% 12%",
          rotate: `${interpolate(point, [0, 1], [-12, -118], { easing: Easing.out(Easing.cubic) })}deg`,
        })}
      >
        <div style={abs({ left: 2, top: 140, width: 60, height: 60, borderRadius: 99, background: `linear-gradient(160deg, ${colors.brand2}, ${colors.brand})` })} />
      </div>
    </div>
  );
};
