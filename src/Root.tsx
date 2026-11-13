import { Composition, Folder } from "remotion";
import { TOTAL_SECONDS_2, Video2 } from "./v2/Video2";
import { TOTAL_SECONDS_3, Video3 } from "./v3/Video3";
import { TOTAL_SECONDS_4, Video4 } from "./v4/Video4";
import { TOTAL_SECONDS_5, Video5 } from "./v5/Video5";
import { TOTAL_SECONDS_6, Video6 } from "./v6/Video6";
import { TOTAL_SECONDS_7, Video7 } from "./v7/Video7";
import { TOTAL_SECONDS_8, Video8 } from "./v8/Video8";
import { TOTAL_SECONDS_9, Video9 } from "./v9/Video9";
import { TOTAL_SECONDS_10, Video10 } from "./v10/Video10";
import { TOTAL_SECONDS, Video } from "./Video";

// Every video is 3840x2160, 30 fps (see CLAUDE.md). Length = voiceover + 1 s.
export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Mudarabah">
      <Composition
        id="MetaPixel"
        component={Video10}
        durationInFrames={Math.ceil(TOTAL_SECONDS_10 * 30)}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="OwnHome"
        component={Video9}
        durationInFrames={Math.ceil(TOTAL_SECONDS_9 * 30)}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="DarkSides"
        component={Video8}
        durationInFrames={Math.ceil(TOTAL_SECONDS_8 * 30)}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="ProbashiInvest"
        component={Video7}
        durationInFrames={Math.ceil(TOTAL_SECONDS_7 * 30)}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="IdealWebsite"
        component={Video6}
        durationInFrames={Math.ceil(TOTAL_SECONDS_6 * 30)}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="FashionAccessory"
        component={Video5}
        durationInFrames={Math.ceil(TOTAL_SECONDS_5 * 30)}
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="MudarabahExplainer"
        component={Video4}
        durationInFrames={Math.ceil(TOTAL_SECONDS_4 * 30)}
        fps={30}
        width={3840}
        height={2160}
      />
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
