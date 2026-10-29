import { ArrowRight, Clock, Sparkles } from "lucide-react";
import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { useEnter3D, useProgress, useSceneTime } from "../components/anim";
import { Cursor } from "../components/Cursor";
import { GlassPill } from "../components/GlassPill";
import { Reveal } from "../components/Reveal";
import { Scrim } from "../components/Scrim";
import { T } from "../data/timeline";
import { colors, fonts, gradients, layout } from "../theme";

const BTN = { width: 1300, height: 220, top: 2200 };
const BTN_LEFT = (layout.width - BTN.width) / 2;
const ROW_TOP = BTN.top - 190; // price + urgency pills
const BAR_TOP = BTN.top + BTN.height + 44; // offer timer

// S9 — the call to action, on the speaker full frame:
// "এজন্য কিন্তু আপনাকে আজকেই enroll করতে হবে। এরপরে offer নাও পেতে পারেন।"
// Price reminder → big "আজকেই এনরোল" button (clicked on "enroll") →
// urgency pill + a draining offer timer.
export const CTAScene: React.FC = () => {
  const { frame, at } = useSceneTime(T.cta.start);
  const enrollAt = at(T.cta.enroll);
  const clickAt = at(T.cta.click);
  const urgencyAt = at(T.cta.urgency);
  const button = useEnter3D(enrollAt, undefined, { tilt: 30, rise: 160 });
  const urgency = useProgress(urgencyAt, 14);
  const timeLeft = interpolate(frame, [urgencyAt, at(T.cta.end)], [1, 0.06], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const press = interpolate(frame, [clickAt - 1, clickAt + 1, clickAt + 6], [1, 0.95, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shineX = interpolate((frame - enrollAt - 12) % 45, [0, 20], [-40, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Scrim at={4} height={1300} />

      {/* Price reminder, then the urgency line beside it */}
      {/* The row opens up as the urgency pill arrives, so the price stays centred until then. */}
      <div style={{ position: "absolute", top: ROW_TOP, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 36 * urgency }}>
        <Reveal at={6}>
          <GlassPill icon={Sparkles} variant="amber" size={84}>
            ১৯০ টাকা
          </GlassPill>
        </Reveal>
        <div style={{ maxWidth: interpolate(urgency, [0, 1], [0, 1200]), overflow: "hidden", padding: 40, margin: -40, whiteSpace: "nowrap" }}>
          <Reveal at={urgencyAt}>
            <GlassPill icon={Clock} variant="danger" size={84}>
              অফার নাও পেতে পারেন
            </GlassPill>
          </Reveal>
        </div>
      </div>

      {/* The button */}
      <div style={{ position: "absolute", top: BTN.top, left: BTN_LEFT, width: BTN.width, height: BTN.height, ...button }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 44,
            borderRadius: 999,
            background: gradients.button,
            border: "4px solid rgba(255,255,255,0.45)",
            boxShadow: "0 40px 100px rgba(124,58,237,0.55), inset 0 4px 0 rgba(255,255,255,0.3)",
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 120,
            color: colors.white,
            scale: press,
          }}
        >
          <span style={{ paddingTop: 14 }}>আজকেই এনরোল</span>
          <ArrowRight size={120} color={colors.white} strokeWidth={2.6} />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "26%",
              left: `${shineX}%`,
              background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.45), rgba(255,255,255,0))",
              rotate: "15deg",
              scale: "1 1.6",
            }}
          />
        </div>
      </div>

      {/* Offer timer: drains during "এরপরে offer নাও পেতে পারেন" */}
      <div
        style={{
          position: "absolute",
          top: BAR_TOP,
          left: BTN_LEFT + 60,
          width: BTN.width - 120,
          height: 20,
          borderRadius: 99,
          background: "rgba(255,255,255,0.25)",
          opacity: urgency,
          overflow: "hidden",
        }}
      >
        <div style={{ width: `${timeLeft * 100}%`, height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${colors.danger}, ${colors.amber})` }} />
      </div>

      <Cursor
        from={[2080, 2690]}
        to={[BTN_LEFT + BTN.width * 0.82, BTN.top + BTN.height * 0.55]}
        moveAt={Math.max(enrollAt + 2, clickAt - 14)}
        clickAt={clickAt}
        size={130}
      />
    </AbsoluteFill>
  );
};
