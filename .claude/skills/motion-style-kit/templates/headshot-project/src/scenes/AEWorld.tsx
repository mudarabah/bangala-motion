import { Check, Clock, Film, Sparkles, Zap } from "lucide-react";
import React from "react";
import { AbsoluteFill, Easing, interpolate, interpolateColors, random } from "remotion";
import { useDrift, useEnter3D, useProgress, useSceneTime } from "../components/anim";
import { Bokeh } from "../components/Ambient";
import { GlassPill } from "../components/GlassPill";
import { GlassWindow } from "../components/GlassWindow";
import { HeroWord } from "../components/HeroWord";
import { IconOrb } from "../components/IconOrb";
import { Reveal } from "../components/Reveal";
import { toBangla } from "../components/utils";
import { T, toFrame } from "../data/timeline";
import { colors, fonts, glass, gradients, layout } from "../theme";

const WIN = { left: 120, top: 330, width: 1920, height: 1140 };
const LAYER_COL = 360;
const TRACKS = 7;
const TRACK_H = 112;
const TRACK_W = WIN.width - LAYER_COL - 80; // track area width
const CLIP_COLORS = ["#A78BFA", "#F0ABFC", "#93C5FD", "#FCD34D", "#6EE7B7", "#FDA4AF", "#C4B5FD"];

const pad = (n: number) => String(n).padStart(2, "0");
const hms = (sec: number) => toBangla(`${pad(Math.floor(sec / 3600))}:${pad(Math.floor((sec % 3600) / 60))}:${pad(Math.floor(sec % 60))}`);

// S6 — "After Effects মধ্যে যেসব কাজ ঘণ্টার পর ঘণ্টা সময় ধরে আপনাকে করা লাগত
// সেটা এআই দিয়েই জাস্ট কয়েক মিনিটেই করে ফেলতে পারবেন". Full-screen world, speaker in PIP.
export const AEWorld: React.FC = () => {
  const { frame, at } = useSceneTime(T.ae.start);
  const exitAt = at(T.ae.exit);
  const hoursAt = at(T.ae.hours);
  const aiAt = at(T.ae.ai);
  const minutesAt = at(T.ae.minutes);
  const drift = useDrift(toFrame(T.ae.end - T.ae.start));
  const win = useEnter3D(4, exitAt, { tilt: 20, rise: 220, scaleFrom: 0.9 });
  const timerCard = useEnter3D(hoursAt - 4, exitAt, { tilt: 24, rise: 160 });
  const SWEEP = 20;
  const sweepX = interpolate(frame, [aiAt, aiAt + SWEEP], [-0.1, 1.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  // Clutter disappears where the sweep has passed (x in 0..1 of the track area).
  const cleared = (x: number) => (frame < aiAt ? 0 : Math.min(1, Math.max(0, (sweepX - x) * 6)));
  const aiClip = interpolate(frame, [aiAt + 4, aiAt + SWEEP + 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const aiDone = useProgress(aiAt + SWEEP + 6, 10);
  const playhead = interpolate(frame, [10, aiAt], [0.02, 0.92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Timer: counts up through hours, then rewinds to two minutes when the AI sweeps.
  const upTo = 5 * 3600 + 47 * 60 + 18;
  const counted = interpolate(frame, [hoursAt, aiAt], [0, upTo], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });
  const seconds = interpolate(frame, [aiAt, minutesAt], [counted, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const shownSec = frame < aiAt ? counted : seconds;
  const fast = useProgress(minutesAt, 12);

  // Keyframe diamonds appear faster and faster before the AI arrives.
  const keyframes = Array.from({ length: 46 }, (_, k) => {
    const track = Math.floor(random(`kt${k}`) * TRACKS);
    const x = 0.04 + random(`kx${k}`) * 0.9;
    const appear = 8 + Math.pow(k / 46, 0.7) * (aiAt - 12);
    return { track, x, appear };
  });
  const clips = Array.from({ length: TRACKS }, (_, t) =>
    Array.from({ length: 2 + Math.floor(random(`cn${t}`) * 2) }, (_, c) => {
      const start = 0.03 + c * 0.32 + random(`cs${t}${c}`) * 0.08;
      return { start, width: 0.16 + random(`cw${t}${c}`) * 0.12, appear: 6 + t * 2 + c * 3 };
    }),
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill style={drift}>
        <Reveal at={2} exitAt={exitAt} style={{ position: "absolute", top: 130, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <GlassPill icon={Film} variant="light" size={90}>
            After Effects
          </GlassPill>
        </Reveal>

        {/* Generic timeline editor */}
        <div style={{ position: "absolute", ...WIN, top: WIN.top + 60, ...win }}>
          <GlassWindow style={{ width: "100%", height: "100%" }}>
            <div style={{ position: "absolute", inset: 0, padding: "30px 40px" }}>
              {/* ruler */}
              <div style={{ marginLeft: LAYER_COL, height: 60, display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "2px solid rgba(124,58,237,0.12)" }}>
                {Array.from({ length: 13 }, (_, i) => (
                  <div key={i} style={{ width: 3, height: i % 2 ? 18 : 34, background: "rgba(107,100,136,0.4)" }} />
                ))}
              </div>
              {Array.from({ length: TRACKS }, (_, t) => (
                <div key={t} style={{ display: "flex", height: TRACK_H, alignItems: "center", borderBottom: "2px solid rgba(124,58,237,0.06)" }}>
                  <div style={{ width: LAYER_COL, display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: CLIP_COLORS[t] }} />
                    <div style={{ height: 22, width: 160 + random(`ln${t}`) * 100, borderRadius: 99, background: "rgba(30,19,64,0.14)" }} />
                  </div>
                  <div style={{ position: "relative", width: TRACK_W, height: TRACK_H }}>
                    {clips[t].map((c, ci) => (
                      <div
                        key={ci}
                        style={{
                          position: "absolute",
                          left: `${c.start * 100}%`,
                          width: `${c.width * 100}%`,
                          top: 22,
                          height: TRACK_H - 44,
                          borderRadius: 18,
                          background: CLIP_COLORS[(t + ci) % CLIP_COLORS.length],
                          opacity: interpolate(frame, [c.appear, c.appear + 6], [0, 0.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * (1 - cleared(c.start + c.width / 2)),
                          scale: `${1 - cleared(c.start) * 0.3} 1`,
                          transformOrigin: "left center",
                        }}
                      />
                    ))}
                    {keyframes
                      .filter((k) => k.track === t)
                      .map((k, ki) => {
                        const show = interpolate(frame, [k.appear, k.appear + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                        return (
                          <div
                            key={ki}
                            style={{
                              position: "absolute",
                              left: `${k.x * 100}%`,
                              top: TRACK_H / 2 - 18,
                              width: 36,
                              height: 36,
                              rotate: "45deg",
                              borderRadius: 6,
                              background: colors.ink,
                              border: "4px solid white",
                              opacity: show * (1 - cleared(k.x)),
                              scale: 0.5 + 0.5 * show,
                            }}
                          />
                        );
                      })}
                    {/* The single clean AI clip */}
                    {t === 3 ? (
                      <div
                        style={{
                          position: "absolute",
                          left: "2%",
                          width: `${aiClip * 94}%`,
                          top: 14,
                          height: TRACK_H - 28,
                          borderRadius: 24,
                          background: gradients.keyword,
                          boxShadow: "0 16px 40px rgba(124,58,237,0.45)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0 26px",
                          overflow: "hidden",
                          opacity: aiClip > 0 ? 1 : 0,
                        }}
                      >
                        <Sparkles size={52} color="white" />
                        <div style={{ width: 60, height: 60, borderRadius: 99, background: colors.success, display: "flex", alignItems: "center", justifyContent: "center", opacity: aiDone }}>
                          <Check size={40} color="white" strokeWidth={3.4} />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
              {/* playhead */}
              <div
                style={{
                  position: "absolute",
                  top: 30,
                  bottom: 30,
                  left: 40 + LAYER_COL + playhead * TRACK_W,
                  width: 6,
                  background: colors.danger,
                  borderRadius: 3,
                  opacity: 1 - cleared(playhead),
                }}
              >
                <div style={{ position: "absolute", top: -6, left: -15, width: 36, height: 36, background: colors.danger, borderRadius: 8, rotate: "45deg" }} />
              </div>
            </div>
          </GlassWindow>
          {/* AI sweep orb crossing the timeline */}
          {frame >= aiAt && frame <= aiAt + SWEEP + 6 ? (
            <IconOrb
              icon={Sparkles}
              tint="magenta"
              at={aiAt}
              exitAt={aiAt + SWEEP + 6}
              size={240}
              bob={false}
              style={{ position: "absolute", top: WIN.height / 2 - 120, left: 40 + LAYER_COL + sweepX * TRACK_W - 120 }}
            />
          ) : null}
        </div>

        {/* Timer card */}
        <div style={{ position: "absolute", left: 120, right: 120, top: 1610, height: 360, ...timerCard }}>
          <div style={{ height: "100%", borderRadius: 72, ...glass.onLight, display: "flex", alignItems: "center", gap: 60, padding: "0 70px" }}>
            <div style={{ position: "relative", width: 240, height: 240 }}>
              <IconOrb icon={Clock} at={hoursAt} exitAt={minutesAt} size={240} tint="danger" bob={false} style={{ position: "absolute" }} />
              <IconOrb icon={Zap} at={minutesAt} size={240} tint="success" bob={false} style={{ position: "absolute" }} />
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: 210,
                lineHeight: 1,
                paddingTop: 30,
                color: interpolateColors(fast, [0, 1], [colors.ink, colors.success]),
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {hms(shownSec)}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Message zone (right of the PIP) */}
      <div style={{ position: "absolute", left: layout.pipCx + layout.pipSize / 2 + 70, right: layout.safe, top: 2060, bottom: layout.safe }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
          <HeroWord at={hoursAt + 2} exitAt={minutesAt} fill="gradient" size={160}>
            ঘণ্টার পর ঘণ্টা
          </HeroWord>
        </div>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
          <HeroWord at={minutesAt} exitAt={exitAt} fill="gradient" size={190}>
            কয়েক মিনিটেই
          </HeroWord>
        </div>
      </div>
      <Bokeh seed="ae" count={7} front opacity={0.6} />
    </AbsoluteFill>
  );
};
