import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { gradients } from "../theme";
import { exitFactor, useProgress } from "./anim";

// Soft dark gradient on the lower part of the footage, behind text.
export const Scrim: React.FC<{ at: number; exitAt?: number; height?: number; strength?: number }> = ({
  at,
  exitAt,
  height = 1300,
  strength = 1,
}) => {
  const frame = useCurrentFrame();
  const p = useProgress(at, 16);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", pointerEvents: "none" }}>
      <div
        style={{
          height,
          background: gradients.scrim,
          opacity: p * exitFactor(frame, exitAt) * strength,
        }}
      />
    </AbsoluteFill>
  );
};
