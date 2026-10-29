import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { useEnterStyle, useProgress, useSceneTime } from "../components/anim";
import { Robot } from "../components/Robot";
import { Scrim } from "../components/Scrim";
import { SWEEP_FRAMES, T } from "../data/timeline";
import { colors, fonts, gradients, layout, textDepth } from "../theme";

const PHRASE = 112;
const HERO = 290;
const CHIP = 280;

// One word of the L2 line; `mark` draws a gradient highlighter under it.
const Word: React.FC<{ at: number; exitAt: number; mark?: boolean; children: string }> = ({ at, exitAt, mark, children }) => {
  const frame = useCurrentFrame();
  const style = useEnterStyle(at, exitAt, 30);
  const sweep = interpolate(frame, [at + 3, at + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <span style={{ display: "inline-block", position: "relative", ...style }}>
      {mark ? (
        <span
          style={{
            position: "absolute",
            left: -12,
            right: -12,
            bottom: PHRASE * 0.12,
            height: PHRASE * 0.42,
            borderRadius: 14,
            background: gradients.keyword,
            transformOrigin: "left center",
            transform: `scaleX(${sweep})`,
            zIndex: -1,
            boxShadow: "0 10px 30px rgba(192,38,211,0.45)",
          }}
        />
      ) : null}
      {children}
    </span>
  );
};

// "AI" set inside a glowing processor chip.
const AIChip: React.FC<{ at: number; exitAt: number }> = ({ at, exitAt }) => {
  const frame = useCurrentFrame();
  const p = useProgress(at, 14);
  const out = interpolate(frame, [exitAt - 7, exitAt], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shown = p * out;
  const glow = 0.6 + 0.4 * Math.sin((frame - at) / 5);
  const shine = interpolate(frame, [at + 10, at + 28], [130, -30], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pins = (side: "top" | "bottom" | "left" | "right") =>
    [0.3, 0.5, 0.7].map((f) => {
      const horizontal = side === "top" || side === "bottom";
      return (
        <div
          key={`${side}${f}`}
          style={{
            position: "absolute",
            width: horizontal ? 18 : 40,
            height: horizontal ? 40 : 18,
            borderRadius: 6,
            background: "linear-gradient(180deg, #F5F3FF, #C4B5FD)",
            [side]: -30,
            ...(horizontal ? { left: `calc(${f * 100}% - 9px)` } : { top: `calc(${f * 100}% - 9px)` }),
          }}
        />
      );
    });
  return (
    <div
      style={{
        position: "relative",
        width: CHIP,
        height: CHIP,
        flexShrink: 0,
        opacity: shown,
        transform: `perspective(1600px) rotateY(${(1 - shown) * 80}deg) scale(${0.8 + 0.2 * shown})`,
        filter: `blur(${(1 - shown) * 16}px)`,
      }}
    >
      {pins("top")}
      {pins("bottom")}
      {pins("left")}
      {pins("right")}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 64,
          background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.45), rgba(255,255,255,0) 45%), linear-gradient(145deg, ${colors.brand2}, ${colors.brand} 50%, ${colors.magenta})`,
          border: "5px solid rgba(255,255,255,0.7)",
          boxShadow: `0 0 ${50 + 50 * glow}px rgba(192,38,211,${0.45 + 0.3 * glow}), inset 0 -18px 40px rgba(30,19,64,0.35)`,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 26, borderRadius: 40, border: "3px dashed rgba(255,255,255,0.35)" }} />
        <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 168, color: "white", paddingTop: 20, letterSpacing: "-0.02em", textShadow: "0 6px 20px rgba(30,19,64,0.4)" }}>
          AI
        </span>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(105deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 60%)",
            backgroundSize: "300% 100%",
            backgroundPosition: `${shine}% 0`,
          }}
        />
      </div>
    </div>
  );
};

// S2 — "কিন্তু videoটা edit করা হয়েছে AI দিয়ে।"
// A robot pops in and "scans" the footage (the scan line turns the raw camera
// look into the finished grade), the line builds word by word with "এডিট"
// highlighted, then the robot points as "AI" lands in a glowing chip.
export const AIScene: React.FC = () => {
  const { frame, at } = useSceneTime(T.ai.start);
  const exitAt = at(T.ai.exit);
  const sweepY = interpolate(frame, [0, SWEEP_FRAMES], [0, layout.height], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sweepOpacity = interpolate(frame, [0, 2, SWEEP_FRAMES - 3, SWEEP_FRAMES], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const heroAt = at(T.ai.hero);
  const daiye = useEnterStyle(heroAt + 3, exitAt, 40);
  const words = ["ভিডিওটা", "এডিট", "করা", "হয়েছে"];

  return (
    <AbsoluteFill>
      {/* Scan line */}
      <AbsoluteFill style={{ opacity: sweepOpacity, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: sweepY - 420,
            height: 420,
            background: "linear-gradient(180deg, rgba(167,139,250,0) 0%, rgba(167,139,250,0.28) 80%, rgba(255,255,255,0.75) 100%)",
          }}
        />
        <div style={{ position: "absolute", left: 0, right: 0, top: sweepY - 3, height: 6, background: "white", boxShadow: "0 0 36px 10px rgba(168,85,247,0.85)" }} />
        {Array.from({ length: 18 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: random(`spark-x-${i}`) * layout.width,
              top: sweepY - 10 - random(`spark-y-${i}`) * 160,
              width: 10 + random(`spark-s-${i}`) * 14,
              height: 10 + random(`spark-s-${i}`) * 14,
              borderRadius: 99,
              background: "white",
              boxShadow: "0 0 18px 6px rgba(216,180,254,0.9)",
              opacity: 0.5 + random(`spark-o-${i}`) * 0.5,
            }}
          />
        ))}
      </AbsoluteFill>

      <Scrim at={2} exitAt={exitAt} height={1350} />

      {/* Robot, bottom-left */}
      <Robot at={0} scanAt={2} pointAt={heroAt - 2} exitAt={exitAt} scale={1.1} style={{ position: "absolute", left: 95, bottom: 150 }} />

      {/* Text block, right of the robot */}
      <div style={{ position: "absolute", left: 650, right: layout.safe, bottom: layout.bandBottom - 10, display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: PHRASE * 0.28,
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: PHRASE,
            lineHeight: 1.35,
            color: colors.white,
            textShadow: textDepth.onFootage,
            isolation: "isolate",
          }}
        >
          {words.map((w, i) => (
            <Word key={w} at={at(T.ai.words[i])} exitAt={exitAt} mark={i === 1}>
              {w}
            </Word>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 56, marginTop: 30 }}>
          <AIChip at={heroAt} exitAt={exitAt} />
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 800,
              fontSize: HERO,
              lineHeight: 1.1,
              paddingTop: HERO * 0.1,
              color: colors.white,
              textShadow: textDepth.onFootage,
              whiteSpace: "nowrap",
              ...daiye,
            }}
          >
            দিয়ে
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
