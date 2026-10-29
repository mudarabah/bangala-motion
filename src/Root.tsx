import { Composition } from "remotion";
import { TOTAL_SECONDS, Video } from "./Video";

// 3840x2160, 30 fps (see CLAUDE.md). Length = voiceover + 1 s.
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MudarabahInvestment"
      component={Video}
      durationInFrames={Math.ceil(TOTAL_SECONDS * 30)}
      fps={30}
      width={3840}
      height={2160}
    />
  );
};
