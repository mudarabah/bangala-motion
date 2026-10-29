import { Composition } from "remotion";
import { Main } from "./Main";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Main"
      component={Main}
      durationInFrames={150}
      fps={30}
      width={3840}
      height={2160}
    />
  );
};
