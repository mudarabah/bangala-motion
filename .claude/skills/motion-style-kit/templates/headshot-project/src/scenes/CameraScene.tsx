import { Camera, Video } from "lucide-react";
import React from "react";
import { AbsoluteFill, interpolate, interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";
import { useProgress, useSceneTime } from "../components/anim";
import { GlassPill } from "../components/GlassPill";
import { IconOrb } from "../components/IconOrb";
import { Reveal } from "../components/Reveal";
import { Scrim } from "../components/Scrim";
import { SWEEP_FRAMES, T, toFrame } from "../data/timeline";
import { layout } from "../theme";

type Rect = { l: number; t: number; r: number; b: number };
const FRAME: Rect = { l: 150, t: 150, r: layout.width - 150, b: layout.height - 150 };
const HEAD: Rect = { l: 640, t: 380, r: 1520, b: 1560 }; // speaker's head and beard
const ARM = 170;
const THICK = 12;
const MONO = "Menlo, monospace";

const mixRect = (a: Rect, b: Rect, p: number): Rect => ({
  l: a.l + (b.l - a.l) * p,
  t: a.t + (b.t - a.t) * p,
  r: a.r + (b.r - a.r) * p,
  b: a.b + (b.b - a.b) * p,
});

const Corners: React.FC<{ rect: Rect; color: string }> = ({ rect, color }) => {
  const corner = (top: boolean, left: boolean): React.CSSProperties => ({
    position: "absolute",
    width: ARM,
    height: ARM,
    left: left ? rect.l : rect.r - ARM,
    top: top ? rect.t : rect.b - ARM,
    borderStyle: "solid",
    borderColor: color,
    borderWidth: 0,
    [top ? "borderTopWidth" : "borderBottomWidth"]: THICK,
    [left ? "borderLeftWidth" : "borderRightWidth"]: THICK,
    [`border${top ? "Top" : "Bottom"}${left ? "Left" : "Right"}Radius`]: 34,
    filter: "drop-shadow(0 4px 12px rgba(27,16,64,0.45))",
  });
  return (
    <>
      <div style={corner(true, true)} />
      <div style={corner(true, false)} />
      <div style={corner(false, true)} />
      <div style={corner(false, false)} />
    </>
  );
};

const hudText: React.CSSProperties = {
  position: "absolute",
  fontFamily: MONO,
  fontWeight: 700,
  fontSize: 54,
  color: "white",
  textShadow: "0 3px 10px rgba(27,16,64,0.6)",
  display: "flex",
  alignItems: "center",
  gap: 22,
  whiteSpace: "nowrap",
};

// S1 — "এখন আপনি এই যে হেডশট ভিডিওটা দেখতেছেন, এটা কিন্তু আমি একটা ক্যামেরা দিয়ে রেকর্ড করেছিলাম।"
// A real-camera viewfinder: the focus box locks onto the head ("হেডশট"),
// confirms, opens back out as the camera specs come in, then REC pulses.
// At "কিন্তু" (S2) the AI scan line wipes the whole HUD away from the top.
export const CameraScene: React.FC = () => {
  const { frame, at } = useSceneTime(T.camera.start);
  const { fps } = useVideoConfig();
  const lock = useProgress(at(T.camera.headshot), 16);
  const confirm = useProgress(at(T.camera.watching), 8);
  const release = useProgress(at(T.camera.release), 16);
  const specs = useProgress(at(T.camera.release) + 4, 14);
  const rec = useProgress(at(T.camera.record), 10);
  const hudIn = useProgress(4, 14);
  const rect = mixRect(FRAME, HEAD, lock * (1 - release));
  const focusPulse = interpolate(frame, [at(T.camera.watching), at(T.camera.watching) + 10], [1.05, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cornerColor = interpolateColors(confirm * (1 - release), [0, 1], ["rgba(255,255,255,0.95)", "rgba(52,211,153,1)"]);
  const sweepY = interpolate(frame, [at(T.ai.start), at(T.ai.start) + SWEEP_FRAMES], [0, layout.height], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const recOn = Math.floor(frame / 12) % 2 === 0;
  const tc = (() => {
    const s = Math.floor(frame / fps);
    const f = frame % fps;
    const p = (n: number) => String(n).padStart(2, "0");
    return `00:00:${p(s)}:${p(f)}`;
  })();
  const meter = (k: number) => 0.35 + 0.55 * Math.abs(Math.sin(frame * 0.45 + k) * Math.cos(frame * 0.17 + k * 2));

  return (
    <AbsoluteFill>
      {/* Everything below the AI scan line is still "camera"; above it is gone. */}
      <AbsoluteFill style={{ clipPath: `inset(${sweepY}px 0 0 0)`, opacity: hudIn }}>
        <div style={{ position: "absolute", inset: 0, scale: lock > 0 && release < 0.5 ? focusPulse : 1, transformOrigin: `${(HEAD.l + HEAD.r) / 2}px ${(HEAD.t + HEAD.b) / 2}px` }}>
          <Corners rect={rect} color={cornerColor} />
        </div>
        {/* Centre cross, visible while the box is on the frame */}
        <div style={{ position: "absolute", left: layout.width / 2 - 40, top: 1050, width: 80, height: 4, background: "rgba(255,255,255,0.7)", opacity: 1 - lock * (1 - release) }} />
        <div style={{ position: "absolute", left: layout.width / 2 - 2, top: 1012, width: 4, height: 80, background: "rgba(255,255,255,0.7)", opacity: 1 - lock * (1 - release) }} />

        <div style={{ ...hudText, left: FRAME.l + 60, top: FRAME.t + 44 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 99,
              background: "#FF3B30",
              opacity: recOn || rec > 0.5 ? 1 : 0.25,
              scale: 1 + 0.35 * rec * (0.5 + 0.5 * Math.sin(frame / 3)),
              boxShadow: `0 0 ${24 + 30 * rec}px #FF3B30`,
            }}
          />
          REC
        </div>
        <div style={{ ...hudText, right: FRAME.l + 60, top: FRAME.t + 44 }}>{tc}</div>

        {/* Camera specs */}
        <div style={{ ...hudText, left: FRAME.l + 60, bottom: FRAME.t + 50, opacity: specs, transform: `translateX(${(1 - specs) * -40}px)` }}>
          4K · 25P
        </div>
        <div style={{ ...hudText, right: FRAME.l + 60, bottom: FRAME.t + 50, opacity: specs, transform: `translateX(${(1 - specs) * 40}px)` }}>
          ISO 400 · f/2.8 · 1/50
        </div>
        <div style={{ position: "absolute", left: FRAME.l + 40, top: 900, display: "flex", gap: 14, alignItems: "flex-end", height: 360, opacity: specs }}>
          {[0, 1].map((k) => (
            <div key={k} style={{ width: 22, height: "100%", borderRadius: 11, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
              <div style={{ width: "100%", height: `${meter(k) * 100}%`, background: "linear-gradient(0deg, #34D399, #FCD34D 75%, #EF4444)" }} />
            </div>
          ))}
        </div>

        {/* Focus label on the head box */}
        <Reveal at={at(T.camera.headshot) + 6} exitAt={at(T.camera.release)} rise={20} style={{ position: "absolute", left: HEAD.l, top: HEAD.t - 150 }}>
          <GlassPill icon={Video} size={70}>
            হেডশট ভিডিওটা
          </GlassPill>
        </Reveal>
      </AbsoluteFill>

      {/* "Recorded on a camera" */}
      <Scrim at={at(T.camera.camera) - 4} exitAt={at(T.camera.end)} height={900} strength={0.7} />
      <Reveal at={at(T.camera.camera)} exitAt={at(T.camera.end)} style={{ position: "absolute", left: 0, right: 0, bottom: FRAME.t + 170, display: "flex", justifyContent: "center" }}>
        <GlassPill icon={Camera}>ক্যামেরা দিয়ে রেকর্ড</GlassPill>
      </Reveal>
      <IconOrb
        icon={Camera}
        at={at(T.camera.camera)}
        exitAt={at(T.camera.end)}
        size={300}
        style={{ position: "absolute", right: layout.safe + 90, top: 520 }}
      />
    </AbsoluteFill>
  );
};

// Raw camera look on the footage until the AI scan line passes over it:
// partly desaturated and flat. Above the line the footage is the finished grade.
export const RawLook: React.FC = () => {
  const frame = useCurrentFrame();
  const start = toFrame(T.ai.start);
  const sweepY = interpolate(frame, [start, start + SWEEP_FRAMES], [0, layout.height], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ clipPath: `inset(${sweepY}px 0 0 0)`, pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: "#808080", mixBlendMode: "saturation", opacity: 0.42 }} />
      <AbsoluteFill style={{ background: "rgba(150,148,160,0.05)" }} />
    </AbsoluteFill>
  );
};
