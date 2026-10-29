import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { BrandBackground, LightSweep } from "./components/Ambient";
import { Footage } from "./components/Footage";
import { SoundDesign } from "./components/SoundDesign";
import { FRAMING_MOVES, SWEEP_FRAMES, T, toFrame } from "./data/timeline";
import { AEWorld } from "./scenes/AEWorld";
import { AIScene } from "./scenes/AIScene";
import { CameraScene, RawLook } from "./scenes/CameraScene";
import { CourseIntroScene } from "./scenes/CourseIntroScene";
import { CourseWorld } from "./scenes/CourseWorld";
import { CTAScene } from "./scenes/CTAScene";
import { OfferWorld } from "./scenes/OfferWorld";
import { PaidScene } from "./scenes/PaidScene";
import { SearchWorld } from "./scenes/SearchWorld";
import { SecretsScene } from "./scenes/SecretsScene";
import { UseCasesWorld } from "./scenes/UseCasesWorld";

export type VideoProps = {
  hasSource: boolean;
};

const span = (start: number, end: number) => ({ from: toFrame(start), durationInFrames: toFrame(end) - toFrame(start) });

// Layer stack (back → front):
// 1. lavender world background  2. world scenes (revealed when the footage shrinks)
// 3. the speaker footage (full / punch / card / PIP)  4. overlays on the footage
// 5. light sweeps on framing changes
export const Video: React.FC<VideoProps> = ({ hasSource }) => {
  const { fps, durationInFrames } = useVideoConfig();

  if (!hasSource) {
    return (
      <AbsoluteFill style={{ backgroundColor: "black", justifyContent: "center", alignItems: "center", color: "white", fontSize: 72 }}>
        Add public/source.mp4
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill
      style={{
        translate: "-3.2px 4.1px",
        scale: 1.003
      }}
    >
      <BrandBackground />

      {/* World scenes */}
      <Sequence name="S3 Use cases (card)" {...span(T.useCases.start, T.useCases.end)} premountFor={fps}>
        <UseCasesWorld />
      </Sequence>
      <Sequence name="S4 Search world (PIP)" {...span(T.search.start, T.search.end)} premountFor={fps}>
        <SearchWorld />
      </Sequence>
      <Sequence name="S5b Course panels (card)" {...span(T.course.start, T.course.end)} premountFor={fps}>
        <CourseWorld />
      </Sequence>
      <Sequence name="S6 After Effects world (PIP)" {...span(T.ae.start, T.ae.end)} premountFor={fps}>
        <AEWorld />
      </Sequence>
      <Sequence name="S8 Offer (card)" {...span(T.offer.start, T.offer.end)} premountFor={fps}>
        <OfferWorld />
      </Sequence>

      {/* The speaker — one continuous shot */}
      <Footage />
      <Sequence name="Raw camera look (until the AI scan)" from={0} durationInFrames={toFrame(T.ai.start) + SWEEP_FRAMES + 2}>
        <RawLook />
      </Sequence>

      {/* Overlays on the footage */}
      <Sequence name="S1 Camera HUD" from={0} durationInFrames={toFrame(T.ai.start) + SWEEP_FRAMES + 2} premountFor={fps}>
        <CameraScene />
      </Sequence>
      <Sequence name="S2 AI reveal" {...span(T.ai.start, T.ai.end)} premountFor={fps}>
        <AIScene />
      </Sequence>
      <Sequence name="S4b The turn (full frame)" {...span(T.secrets.start, T.secrets.end)} premountFor={fps}>
        <SecretsScene />
      </Sequence>
      <Sequence name="S5a Course intro" {...span(T.courseIntro.start, T.courseIntro.end)} premountFor={fps}>
        <CourseIntroScene />
      </Sequence>
      <Sequence name="S7 Free → paid" {...span(T.paid.start, T.paid.end)} premountFor={fps}>
        <PaidScene />
      </Sequence>
      <Sequence name="S9 Call to action (full frame)" from={toFrame(T.cta.start)} durationInFrames={durationInFrames - toFrame(T.cta.start)} premountFor={fps}>
        <CTAScene />
      </Sequence>

      {/* Sound design (effects only; the voice comes from the footage) */}
      <SoundDesign />

      <Sequence name="Light sweep (open)" from={2} durationInFrames={18}>
        <LightSweep />
      </Sequence>
      {/* Soft light sweep on every framing change (not on punch-ins) */}
      {FRAMING_MOVES
        .map((f) => (
          <Sequence key={f.at} name={`Light sweep → ${f.mode}`} from={toFrame(f.at) - 2} durationInFrames={18}>
            <LightSweep />
          </Sequence>
        ))}
    </AbsoluteFill>
  );
};
