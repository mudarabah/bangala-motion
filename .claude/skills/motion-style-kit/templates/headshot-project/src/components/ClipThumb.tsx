import type { LucideIcon } from "lucide-react";
import React from "react";
import { OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const XFADE = 10; // frames of dissolve when the usable part loops

const ClipPass: React.FC<{ src: string; playbackRate: number; fadeIn: boolean }> = ({ src, playbackRate, fadeIn }) => {
  const frame = useCurrentFrame();
  return (
    <OffthreadVideo
      src={staticFile(src)}
      muted
      playbackRate={playbackRate}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: fadeIn ? interpolate(frame, [0, XFADE], [0, 1], { extrapolateRight: "clamp" }) : 1,
      }}
    />
  );
};

// A user-supplied clip playing inside a rounded 16:9 card thumbnail, muted so
// the speaker stays clear. It starts at `startAt` (local frame). If only the
// first `usableSec` of the source is wanted, that part repeats with a soft
// dissolve instead of running into the rest of the file.
export const ClipThumb: React.FC<{
  src: string; // path inside public/
  width: number;
  startAt: number;
  playbackRate?: number;
  usableSec?: number;
  icon?: LucideIcon;
}> = ({ src, width, startAt, playbackRate = 1, usableSec, icon: Icon }) => {
  const { fps } = useVideoConfig();
  const h = (width * 9) / 16;
  const pass = usableSec ? Math.floor((usableSec / playbackRate) * fps) : undefined;
  const passes = pass ? 3 : 1;
  return (
    <div
      style={{
        width,
        height: h,
        borderRadius: width * 0.06,
        position: "relative",
        overflow: "hidden",
        background: "#1E1340",
        boxShadow: "0 18px 40px rgba(30,19,64,0.22)",
      }}
    >
      {Array.from({ length: passes }, (_, k) => (
        <Sequence
          key={k}
          name={`Clip pass ${k + 1}`}
          from={startAt + (pass ? k * (pass - XFADE) : 0)}
          durationInFrames={pass}
          premountFor={fps}
        >
          <ClipPass src={src} playbackRate={playbackRate} fadeIn={k > 0} />
        </Sequence>
      ))}
      {/* soft inner vignette + label chip */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(30,19,64,0.25) 0%, rgba(30,19,64,0) 30%, rgba(30,19,64,0) 70%, rgba(30,19,64,0.3) 100%)",
          boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.25)",
          borderRadius: width * 0.06,
        }}
      />
      {Icon ? (
        <div
          style={{
            position: "absolute",
            left: width * 0.04,
            top: width * 0.04,
            width: width * 0.11,
            height: width * 0.11,
            borderRadius: 999,
            background: "rgba(255,255,255,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 16px rgba(30,19,64,0.25)",
          }}
        >
          <Icon size={width * 0.06} color="#7C3AED" strokeWidth={2.2} />
        </div>
      ) : null}
    </div>
  );
};
