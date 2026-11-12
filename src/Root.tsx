import { Composition, Folder } from "remotion";
import { TOTAL_SECONDS_2, Video2 } from "./v2/Video2";
import { TOTAL_SECONDS_3, Video3 } from "./v3/Video3";
import { TOTAL_SECONDS, Video } from "./Video";

// Every video is 3840x2160, 30 fps (see CLAUDE.md). Length = voiceover + 1 s.
export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Mudarabah">
      <Composition
        id="UddoktaJourney"
        component={Video3}
        durationInFrames={Math.ceil(TOTAL_SECONDS_3 * 30)}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="ResellerInvest"
        component={Video2}
        durationInFrames={Math.ceil(TOTAL_SECONDS_2 * 30)}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="MudarabahInvestment"
        component={Video}
        durationInFrames={Math.ceil(TOTAL_SECONDS * 30)}
        fps={30}
        width={3840}
        height={2160}
      />
    </Folder>
  );
};
