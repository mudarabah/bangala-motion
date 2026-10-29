import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/HindSiliguri";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["bengali"],
});

// খালি ক্যানভাস — ভয়েসওভার আর ট্রান্সক্রিপ্ট এলে এখানে ভিডিও বানানো হবে।
export const Main: React.FC = () => {
  return <AbsoluteFill style={{ backgroundColor: "#0b0b12", fontFamily }} />;
};
