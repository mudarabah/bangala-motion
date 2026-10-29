import { GraduationCap } from "lucide-react";
import React from "react";
import { AbsoluteFill } from "remotion";
import { useSceneTime } from "../components/anim";
import { HeroWord } from "../components/HeroWord";
import { IconOrb } from "../components/IconOrb";
import { PhraseLine } from "../components/PhraseLine";
import { Scrim } from "../components/Scrim";
import { T } from "../data/timeline";
import { layout } from "../theme";

// S5a — "এই কোর্সে আমরা দেখিয়েছি".
export const CourseIntroScene: React.FC = () => {
  const { at } = useSceneTime(T.courseIntro.start);
  const exitAt = at(T.courseIntro.exit);
  const heroAt = at(T.courseIntro.start) + 5; // as the footage settles back to full frame
  return (
    <AbsoluteFill>
      <Scrim at={heroAt} exitAt={exitAt} />
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", padding: layout.safe, paddingBottom: layout.bandBottom, gap: 10 }}>
        <IconOrb icon={GraduationCap} at={heroAt} exitAt={exitAt} size={230} style={{ marginBottom: 20 }} />
        <HeroWord at={heroAt} exitAt={exitAt} size={300}>
          এই কোর্সে
        </HeroWord>
        <PhraseLine words={["আমরা", "দেখিয়েছি"]} ats={T.courseIntro.words.map(at)} exitAt={exitAt} size={110} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
