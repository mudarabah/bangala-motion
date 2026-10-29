import React from "react";
import { AbsoluteFill, Easing, OffthreadVideo, getRemotionEnvironment, getStaticFiles, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SOURCE, SOURCE_PROXY } from "../constants";
import { FRAMING, FramingMode, toFrame } from "../data/timeline";
import { layout, motion } from "../theme";

// A framing state: which part of the footage is visible (clip rect + corner
// radius, in source pixels) and where its centre lands on screen at what scale.
type State = { x: number; y: number; w: number; h: number; r: number; s: number; dx: number; dy: number };

const W = layout.width;
const H = layout.height;
const FACE = { x: 1080, y: 1000 }; // speaker's face centre in the source
const PIP_SRC = 1300; // square around the face that becomes the PIP circle

const STATES: Record<FramingMode, State> = {
  full: { x: 0, y: 0, w: W, h: H, r: 0, s: 1, dx: W / 2, dy: H / 2 },
  // Zoom 1.08 / 1.16 around the face.
  punch: { x: 0, y: 0, w: W, h: H, r: 0, s: 1.08, dx: W / 2, dy: FACE.y + 1.08 * (H / 2 - FACE.y) },
  tight: { x: 0, y: 0, w: W, h: H, r: 0, s: 1.16, dx: W / 2, dy: FACE.y + 1.16 * (H / 2 - FACE.y) },
  card: {
    x: 0,
    y: 0,
    w: W,
    h: H,
    r: layout.cardRadius / layout.cardScale,
    s: layout.cardScale,
    dx: W / 2,
    dy: layout.cardTop + (H * layout.cardScale) / 2,
  },
  // Same card on screen, footage inside it zoomed in (85% crop around the face).
  cardTight: {
    x: (W - W * 0.85) / 2,
    y: FACE.y * 0.15,
    w: W * 0.85,
    h: H * 0.85,
    r: layout.cardRadius / (layout.cardScale / 0.85),
    s: layout.cardScale / 0.85,
    dx: W / 2,
    dy: layout.cardTop + (H * layout.cardScale) / 2,
  },
  pip: {
    x: FACE.x - PIP_SRC / 2,
    y: FACE.y - PIP_SRC / 2,
    w: PIP_SRC,
    h: PIP_SRC,
    r: PIP_SRC / 2,
    s: layout.pipSize / PIP_SRC,
    dx: layout.pipCx,
    dy: layout.pipCy,
  },
};

const mix = (a: State, b: State, p: number): State => {
  const m = (k: keyof State) => a[k] + (b[k] - a[k]) * p;
  return { x: m("x"), y: m("y"), w: m("w"), h: m("h"), r: m("r"), s: m("s"), dx: m("dx"), dy: m("dy") };
};

const useFraming = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let i = 0;
  while (i + 1 < FRAMING.length && frame >= toFrame(FRAMING[i + 1].at)) i++;
  const cur = FRAMING[i];
  const prev = FRAMING[Math.max(0, i - 1)];
  // Cuts switch instantly (they sit on a jump cut in the source). Zooms (and
  // back to full) are quick and stay sharp; every other change is a 12-frame
  // move with a blur dissolve.
  const zoom = (m: FramingMode) => m === "punch" || m === "tight";
  const isPunch = zoom(cur.mode) || (zoom(prev.mode) && cur.mode === "full");
  const p = cur.cut
    ? 1
    : spring({
        frame: frame - toFrame(cur.at),
        fps,
        config: motion.spring,
        durationInFrames: isPunch ? 8 : motion.dissolveFrames,
      });
  const state = mix(STATES[prev.mode], STATES[cur.mode], i === 0 ? 1 : p);
  const changing = prev.mode !== cur.mode && !isPunch && !cur.cut;
  // Rack-focus open: the first second pulls from soft to sharp.
  const introBlur = interpolate(frame, [0, 22], [16, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const blur = Math.max(changing ? 4 * p * (1 - p) * 14 : 0, introBlur);
  const intro = interpolate(frame, [0, 32], [1.07, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  // Continuous slow push-in through each framing segment (camera never rests).
  const segStart = toFrame(cur.at);
  const segEnd = i + 1 < FRAMING.length ? toFrame(FRAMING[i + 1].at) : segStart + 10 * fps;
  const PUSH = 0.045;
  const segPush = 1 + PUSH * Easing.inOut(Easing.sin)(Math.min(1, (frame - segStart) / Math.max(1, segEnd - segStart)));
  // Blend from the previous segment's end value so the reset never snaps.
  const push = i === 0 || cur.cut ? segPush : 1 + PUSH + (segPush - 1 - PUSH) * p;
  return { state, blur, push: push * intro };
};

// Studio previews a light proxy (smooth playback); renders use the original.
const useSource = () => {
  const { isRendering } = getRemotionEnvironment();
  const hasProxy = getStaticFiles().some((f) => f.name === SOURCE_PROXY);
  return staticFile(!isRendering && hasProxy ? SOURCE_PROXY : SOURCE);
};

// The source video, played in full, moved between framing modes.
export const Footage: React.FC = () => {
  const src = useSource();
  const { state: st, blur, push } = useFraming();
  const tx = st.dx - st.s * (st.x + st.w / 2);
  const ty = st.dy - st.s * (st.y + st.h / 2);
  const framed = Math.min(1, Math.max(0, (1 - st.s) / 0.15)); // 0 full/punch → 1 card/pip
  const rect = {
    left: st.dx - (st.s * st.w) / 2,
    top: st.dy - (st.s * st.h) / 2,
    width: st.s * st.w,
    height: st.s * st.h,
    borderRadius: st.s * st.r,
  };
  return (
    <AbsoluteFill>
      {framed > 0 ? (
        <div
          style={{
            position: "absolute",
            ...rect,
            boxShadow: `0 60px 140px rgba(76,29,149,${0.3 * framed}), 0 12px 30px rgba(76,29,149,${0.15 * framed})`,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: W,
          height: H,
          transformOrigin: "0 0",
          transform: `translate(${tx}px, ${ty}px) scale(${st.s})`,
          clipPath: `inset(${st.y}px ${W - st.x - st.w}px ${H - st.y - st.h}px ${st.x}px round ${st.r}px)`,
          filter: blur > 0.1 ? `blur(${blur}px)` : undefined,
        }}
      >
        <div style={{ width: W, height: H, scale: push, transformOrigin: `${FACE.x}px ${FACE.y}px` }}>
          <OffthreadVideo src={src} style={{ width: W, height: H }} />
        </div>
      </div>
      {framed > 0 ? (
        <div
          style={{
            position: "absolute",
            ...rect,
            border: `${8 * framed}px solid rgba(255,255,255,0.92)`,
            boxSizing: "border-box",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
