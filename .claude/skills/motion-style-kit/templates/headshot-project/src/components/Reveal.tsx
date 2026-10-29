import React from "react";
import { useEnterStyle } from "./anim";

// Wraps any element with the house enter/exit motion.
export const Reveal: React.FC<{
  at: number;
  exitAt?: number;
  rise?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ at, exitAt, rise, style, children }) => {
  const enter = useEnterStyle(at, exitAt, rise);
  return <div style={{ ...style, ...enter }}>{children}</div>;
};
