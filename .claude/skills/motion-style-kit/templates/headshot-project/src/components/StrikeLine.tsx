import React from "react";
import { interpolate } from "remotion";
import { colors } from "../theme";
import { useProgress } from "./anim";

// Draws a strike-through across its child, left to right, starting at `at`.
export const StrikeLine: React.FC<{
  at: number;
  color?: string;
  thickness?: number;
  children: React.ReactNode;
}> = ({ at, color = colors.danger, thickness = 12, children }) => {
  const p = useProgress(at, 10);
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      {children}
      <div
        style={{
          position: "absolute",
          left: "-4%",
          top: "50%",
          height: thickness,
          width: `${interpolate(p, [0, 1], [0, 108])}%`,
          marginTop: -thickness / 2,
          borderRadius: thickness,
          background: color,
          rotate: "-4deg",
          transformOrigin: "left center",
        }}
      />
    </div>
  );
};
