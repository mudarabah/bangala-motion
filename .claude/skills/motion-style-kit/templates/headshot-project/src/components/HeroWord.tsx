import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { fonts, gradients, textDepth, type } from "../theme";
import { exitFactor, useProgress } from "./anim";

// L1 hero word. One crisp fill (white on footage, violet gradient on light),
// lifted by a soft diffuse shadow. Enters with blur → sharp, scale 0.92 → 1 and
// tracking-in, then a soft light sweep crosses it once.
export const HeroWord: React.FC<{
  at: number;
  exitAt?: number;
  size?: number;
  fill?: "white" | "gradient";
  shine?: boolean;
  style?: React.CSSProperties;
  children: string;
}> = ({ at, exitAt, size = type.hero, fill = "white", shine = true, style, children }) => {
  const frame = useCurrentFrame();
  const p = useProgress(at, 14);
  const shown = p * exitFactor(frame, exitAt);
  const sweep = interpolate(frame, [at + 10, at + 34], [130, -30], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const text: React.CSSProperties = {
    fontFamily: fonts.display,
    fontWeight: 800,
    fontSize: size,
    lineHeight: 1.15,
    letterSpacing: `${interpolate(shown, [0, 1], [0.08, -0.01])}em`,
    wordSpacing: "0.14em",
    whiteSpace: "nowrap",
    paddingTop: size * 0.1,
  };
  const clipped: React.CSSProperties = {
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };
  const blur = (1 - shown) * 24;
  return (
    <div
      style={{
        position: "relative",
        opacity: shown,
        scale: interpolate(shown, [0, 1], [0.92, 1]),
        filter: fill === "gradient" ? `blur(${blur}px) ${textDepth.onLight}` : `blur(${blur}px)`,
        ...style,
      }}
    >
      {fill === "white" ? (
        <div style={{ ...text, color: "#FFFFFF", textShadow: textDepth.onFootage }}>{children}</div>
      ) : (
        <div style={{ ...text, ...clipped, backgroundImage: gradients.text }}>{children}</div>
      )}
      {shine ? (
        <div
          style={{
            ...text,
            ...clipped,
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(105deg, rgba(255,255,255,0) 42%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 58%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${sweep}% 0`,
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};
