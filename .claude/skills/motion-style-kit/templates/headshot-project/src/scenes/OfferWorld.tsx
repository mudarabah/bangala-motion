import { ArrowRight, GraduationCap, Play, Sparkles, Tag } from "lucide-react";
import React from "react";
import { AbsoluteFill, interpolate, interpolateColors } from "remotion";
import { useEnter3D, useProgress, useSceneTime } from "../components/anim";
import { Bokeh } from "../components/Ambient";
import { GlassPill } from "../components/GlassPill";
import { IconOrb } from "../components/IconOrb";
import { Reveal } from "../components/Reveal";
import { StrikeLine } from "../components/StrikeLine";
import { toBangla } from "../components/utils";
import { T } from "../data/timeline";
import { colors, fonts, glass, gradients, layout, textDepth } from "../theme";

const CARD = { left: 120, width: 1920, pad: 56, cover: 720 };
const CARD_H = CARD.cover + CARD.pad * 2;
const CARD_TOP = layout.belowCardTop + Math.round((2620 - layout.belowCardTop - CARD_H) / 2);
const COL_LEFT = CARD.left + CARD.pad + CARD.cover + 64; // right column, screen x
const BUTTON = { top: 570, height: 150, width: 800 };

// S8 — "এটার দাম রাখা হয়েছে মাত্র নয়শ পঞ্চাশ টাকা। কিন্তু আপনি যদি আজকে order করেন তাহলে
// আপনি একটা special offer মাত্র একশ নব্বই টাকার মধ্যেই কিন্তু পেয়ে যাচ্ছেন।"
// Offer card below the footage card; it changes state with the words.
// The call to action that follows is S9 (CTAScene), on the speaker full frame.
export const OfferWorld: React.FC = () => {
  const { frame, at } = useSceneTime(T.offer.start);
  const exitAt = at(T.offer.exit);
  const card = useEnter3D(at(T.offer.start) + 6, exitAt, { tilt: 26, rise: 200 });
  const drop = useProgress(at(T.offer.price190), 16);
  const price190 = toBangla(Math.round(interpolate(drop, [0, 1], [950, 190]) / 10) * 10);
  const orderAt = at(T.offer.order);
  const shineX = interpolate((frame - orderAt - 10) % 50, [0, 22], [-40, 140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const big: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 800, lineHeight: 1.1, whiteSpace: "nowrap", paddingTop: 20 };

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: CARD.left, top: CARD_TOP, width: CARD.width, height: CARD_H, ...card }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 80, ...glass.onLight, background: "rgba(255,255,255,0.82)" }} />

        {/* Course cover (vector, no title) */}
        <div
          style={{
            position: "absolute",
            left: CARD.pad,
            top: CARD.pad,
            width: CARD.cover,
            height: CARD.cover,
            borderRadius: 56,
            overflow: "hidden",
            background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.45), rgba(255,255,255,0) 45%), linear-gradient(145deg, ${colors.brand2}, ${colors.brand} 55%, ${colors.magenta})`,
            boxShadow: "0 30px 70px rgba(124,58,237,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "absolute", width: 900, height: 900, borderRadius: 999, border: "3px solid rgba(255,255,255,0.18)", scale: 1 + 0.04 * Math.sin(frame / 20) }} />
          <div style={{ position: "absolute", width: 620, height: 620, borderRadius: 999, border: "3px solid rgba(255,255,255,0.22)" }} />
          <IconOrb icon={GraduationCap} at={at(T.offer.start) + 10} size={300} tint="magenta" />
          <div style={{ position: "absolute", left: 40, bottom: 40, width: 120, height: 120, borderRadius: 999, background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Play size={54} color={colors.brand} fill={colors.brand} style={{ marginLeft: 8 }} />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(105deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 60%)",
              backgroundSize: "300% 100%",
              backgroundPosition: `${interpolate((frame % 75) / 75, [0, 0.5], [130, -30], { extrapolateRight: "clamp" })}% 0`,
            }}
          />
        </div>

        {/* Right column */}
        <div style={{ position: "absolute", left: COL_LEFT - CARD.left, right: CARD.pad, top: CARD.pad, height: CARD.cover }}>
          {/* Kicker: দাম → স্পেশাল অফারে */}
          <div style={{ position: "relative", height: 150 }}>
            <Reveal at={at(T.offer.start) + 12} exitAt={at(T.offer.special)} style={{ position: "absolute" }}>
              <GlassPill icon={Tag} variant="light" size={76}>
                দাম
              </GlassPill>
            </Reveal>
            <Reveal at={at(T.offer.special)} style={{ position: "absolute" }}>
              <GlassPill icon={Sparkles} variant="amber" size={76}>
                স্পেশাল অফারে
              </GlassPill>
            </Reveal>
          </div>

          {/* Price: ৯৫০ টাকা → struck ৯৫০ + ১৯০ টাকা */}
          <div style={{ position: "relative", height: 400 }}>
            <Reveal at={at(T.offer.price950)} style={{ position: "absolute", left: 0, top: interpolate(drop, [0, 1], [60, 0]), transformOrigin: "left top" }}>
              <div style={{ ...big, fontSize: interpolate(drop, [0, 1], [220, 110]), color: interpolateColors(drop, [0, 1], [colors.ink, colors.inkMuted]), display: "flex", alignItems: "baseline" }}>
                <StrikeLine at={at(T.offer.price190) + 8} thickness={14}>
                  <span>৯৫০</span>
                </StrikeLine>
                <span style={{ display: "inline-block", overflow: "hidden", maxWidth: interpolate(drop, [0, 1], [520, 0]), opacity: 1 - drop }}>
                  <span style={{ paddingLeft: 36 }}>টাকা</span>
                </span>
              </div>
            </Reveal>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 130,
                opacity: drop,
                scale: interpolate(drop, [0, 1], [0.9, 1]),
                transformOrigin: "left center",
                filter: drop >= 0.999 ? undefined : `blur(${(1 - drop) * 24}px)`,
              }}
            >
              <div style={{ filter: textDepth.onLight }}>
                <div style={{ ...big, fontSize: 210, backgroundImage: gradients.text, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  {price190} টাকা
                </div>
              </div>
            </div>
          </div>

          {/* Order button */}
          <Reveal at={orderAt} style={{ position: "absolute", top: BUTTON.top, left: 0 }}>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                width: BUTTON.width,
                height: BUTTON.height,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 34,
                borderRadius: 999,
                background: gradients.button,
                boxShadow: "0 32px 80px rgba(124,58,237,0.45), inset 0 3px 0 rgba(255,255,255,0.3)",
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 84,
                color: colors.white,
              }}
            >
              <span style={{ paddingTop: 10 }}>অর্ডার করেন</span>
              <ArrowRight size={80} color={colors.white} strokeWidth={2.6} />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: "30%",
                  left: `${shineX}%`,
                  background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.4), rgba(255,255,255,0))",
                  rotate: "15deg",
                  scale: "1 1.6",
                }}
              />
            </div>
          </Reveal>
        </div>
      </div>

      <Bokeh seed="offer" count={6} front opacity={0.6} />
    </AbsoluteFill>
  );
};
