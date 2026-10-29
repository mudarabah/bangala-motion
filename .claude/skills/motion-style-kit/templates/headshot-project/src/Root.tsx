import { getVideoMetadata } from "@remotion/media-utils";
import React from "react";
import { CalculateMetadataFunction, Composition, getStaticFiles, staticFile } from "remotion";
import { FPS, HEIGHT, SOURCE, WIDTH } from "./constants";
import { Video, VideoProps } from "./Video";

const FALLBACK_DURATION_IN_FRAMES = FPS * 10;

// Match the composition length to public/source.mp4 when it exists.
const calculateMetadata: CalculateMetadataFunction<VideoProps> = async () => {
  const hasSource = getStaticFiles().some((f) => f.name === SOURCE);
  if (!hasSource) {
    return { durationInFrames: FALLBACK_DURATION_IN_FRAMES, props: { hasSource: false } };
  }
  const { durationInSeconds } = await getVideoMetadata(staticFile(SOURCE));
  return {
    durationInFrames: Math.max(1, Math.round(durationInSeconds * FPS)),
    props: { hasSource: true },
  };
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Edit"
      component={Video}
      durationInFrames={FALLBACK_DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{ hasSource: false }}
      calculateMetadata={calculateMetadata}
    />
  );
};
