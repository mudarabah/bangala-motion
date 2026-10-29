import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

// Pointer that glides from `from` to `to` and presses at `clickAt` (local frames).
export const Cursor: React.FC<{
  from: [number, number];
  to: [number, number];
  moveAt: number;
  clickAt: number;
  exitAt?: number;
  size?: number;
}> = ({ from, to, moveAt, clickAt, exitAt, size = 110 }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [moveAt, clickAt - 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.33, 0, 0.2, 1),
  });
  const press = interpolate(frame, [clickAt - 2, clickAt, clickAt + 4], [1, 0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple = interpolate(frame, [clickAt, clickAt + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity =
    interpolate(frame, [moveAt - 6, moveAt], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) *
    (exitAt === undefined ? 1 : interpolate(frame, [exitAt - 6, exitAt], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const x = from[0] + (to[0] - from[0]) * t;
  const y = from[1] + (to[1] - from[1]) * t;
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity, pointerEvents: "none" }}>
      {frame >= clickAt ? (
        <div
          style={{
            position: "absolute",
            left: -size * 0.6,
            top: -size * 0.6,
            width: size * 1.2,
            height: size * 1.2,
            borderRadius: 999,
            border: "6px solid rgba(124,58,237,0.7)",
            opacity: 1 - ripple,
            scale: 0.4 + ripple,
          }}
        />
      ) : null}
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ scale: press, transformOrigin: "0 0", filter: "drop-shadow(0 8px 14px rgba(30,19,64,0.35))" }}>
        <path d="M3 2 L3 19 L7.5 14.8 L10.6 21.5 L13.6 20.2 L10.6 13.6 L16.8 13.6 Z" fill="#1E1340" stroke="white" strokeWidth={1.4} strokeLinejoin="round" />
      </svg>
    </div>
  );
};
