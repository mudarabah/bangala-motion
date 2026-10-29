import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { toFrame } from "../data/timeline";
import { motion } from "../theme";

// Inside a <Sequence> that starts at `sceneStartSec`, convert transcript
// seconds to the sequence's local frame.
export const useSceneTime = (sceneStartSec: number) => {
  const frame = useCurrentFrame();
  const offset = toFrame(sceneStartSec);
  return { frame, at: (sec: number) => toFrame(sec) - offset };
};

// 0 → 1 smooth spring starting at `at` (local frame). No bounce.
export const useProgress = (at: number, durationInFrames = motion.enterFrames) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - at, fps, config: motion.spring, durationInFrames });
};

// 1 → 0 over the exit window ending at `exitAt` (local frame).
export const exitFactor = (frame: number, exitAt?: number) =>
  exitAt === undefined
    ? 1
    : interpolate(frame, [exitAt - motion.exitFrames, exitAt], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

// 3D layer enter (After Effects style): tilts up from perspective, slides,
// sharpens from blur. `axis: "x"` pushes in from the right and out to the left.
export const useEnter3D = (
  at: number,
  exitAt?: number,
  opts: { tilt?: number; rise?: number; axis?: "x" | "y"; scaleFrom?: number } = {},
): React.CSSProperties => {
  const { tilt = 22, rise = 140, axis = "y", scaleFrom = 0.94 } = opts;
  const frame = useCurrentFrame();
  const p = useProgress(at, 16);
  const out = exitFactor(frame, exitAt);
  const shown = p * out;
  const leaving = p > 0.99 && out < 1;
  const offset = (1 - shown) * rise * (leaving && axis === "x" ? -1 : 1);
  const move = axis === "x" ? `translateX(${offset}px)` : `translateY(${offset}px)`;
  const rot = axis === "x" ? `rotateY(${(leaving ? 1 : -1) * (1 - shown) * tilt}deg)` : `rotateX(${(1 - shown) * tilt}deg)`;
  return {
    opacity: shown,
    transform: `perspective(2400px) ${move} ${rot} scale(${scaleFrom + (1 - scaleFrom) * shown})`,
    filter: shown >= 0.999 ? undefined : `blur(${(1 - shown) * 24}px)`,
  };
};

// Slow, continuous camera drift across a scene so nothing ever sits still.
export const useDrift = (durationInFrames: number, amount = 0.035): React.CSSProperties => {
  const frame = useCurrentFrame();
  const t = Math.min(1, Math.max(0, frame / Math.max(1, durationInFrames)));
  return {
    scale: 1 + amount * t,
    translate: `0px ${-30 * t}px`,
  };
};

// Style enter: fade + rise + blur → sharp. Exit: reverse.
// Uses `transform` so callers can still position with the `translate` property.
export const useEnterStyle = (
  at: number,
  exitAt?: number,
  risePx: number = motion.risePx,
): React.CSSProperties => {
  const frame = useCurrentFrame();
  const p = useProgress(at);
  const out = exitFactor(frame, exitAt);
  const shown = p * out;
  return {
    opacity: shown,
    transform: `translateY(${(1 - shown) * risePx}px)`,
    filter: shown >= 0.999 ? undefined : `blur(${(1 - shown) * motion.blurPx}px)`,
  };
};
