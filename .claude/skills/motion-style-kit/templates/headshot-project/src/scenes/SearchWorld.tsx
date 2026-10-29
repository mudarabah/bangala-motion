import { Clapperboard, Clock, Film, Mic, Play, Search, ShoppingBag, Sparkles, Wand2 } from "lucide-react";
import React from "react";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { useDrift, useEnter3D, useSceneTime } from "../components/anim";
import { Bokeh } from "../components/Ambient";
import { Cursor } from "../components/Cursor";
import { GlassWindow } from "../components/GlassWindow";
import { HeroWord } from "../components/HeroWord";
import { TypeText } from "../components/TypeText";
import { VideoThumb } from "../components/VideoThumb";
import { T, toFrame } from "../data/timeline";
import { colors, fonts, layout } from "../theme";

const WIN = { left: 120, top: 150, width: 1920, height: 1820 };
const THUMB_W = 560;
const GRID_GAP = 60;
const THUMB_ICONS = [Film, Mic, Wand2, Clapperboard, Sparkles, Clock, ShoppingBag, Play, Film, Wand2, Mic, Sparkles];
const DURATIONS = ["12:45", "8:02", "21:17", "5:39", "15:08", "9:54", "18:30", "6:12", "11:41", "7:25", "13:03", "10:10"];

const ResultThumb: React.FC<{ i: number; at: number }> = ({ i, at }) => {
  const style = useEnter3D(at, undefined, { tilt: 35, rise: 90, scaleFrom: 0.85 });
  return (
    <div style={style}>
      <VideoThumb width={THUMB_W} hue={i} icon={THUMB_ICONS[i]} duration={DURATIONS[i]} />
    </div>
  );
};

// S4 — "YouTube সার্চ করলে আপনি হয়তো ফ্রিতেই অনেক content পেয়ে যাবেন।" (the turn after it is S4b, SecretsScene)
// Full-screen world; the speaker sits in the PIP circle bottom-left.
// The platform is a generic look-alike: no real logo or brand UI.
export const SearchWorld: React.FC = () => {
  const { frame, at } = useSceneTime(T.search.start);
  const exitAt = at(T.search.exit);
  const drift = useDrift(toFrame(T.search.end - T.search.start));
  const win = useEnter3D(4, exitAt, { tilt: 18, rise: 200, scaleFrom: 0.9 });
  const resultsAt = at(T.search.results);
  const scroll = interpolate(frame, [resultsAt + 22, exitAt], [0, -420], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const searchBtn = { x: WIN.left + WIN.width - 60 - 110, y: WIN.top + 110 + 60 + 75 };

  return (
    <AbsoluteFill>
      <AbsoluteFill style={drift}>
        {/* Platform window */}
        <div
          style={{
            position: "absolute",
            ...WIN,
            ...win,
          }}
        >
          <GlassWindow style={{ width: "100%", height: "100%" }} bodyStyle={{ overflow: "hidden" }}>
            {/* Search row */}
            <div style={{ display: "flex", alignItems: "center", gap: 40, padding: "60px 60px 0" }}>
              <div style={{ width: 120, height: 120, borderRadius: 999, background: "#FF3B30", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Play size={56} color="white" fill="white" style={{ marginLeft: 8 }} />
              </div>
              <div
                style={{
                  flex: 1,
                  height: 150,
                  borderRadius: 999,
                  border: "4px solid rgba(124,58,237,0.25)",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 56px",
                  fontFamily: fonts.body,
                  fontWeight: 600,
                  fontSize: 72,
                  color: colors.ink,
                  boxShadow: "0 12px 30px rgba(76,29,149,0.08)",
                }}
              >
                <span style={{ paddingTop: 10 }}>
                  <TypeText text="AI দিয়ে ভিডিও এডিটিং" at={at(T.search.typing)} caretColor={colors.brand} />
                </span>
              </div>
              <div
                style={{
                  width: 220,
                  height: 150,
                  borderRadius: 999,
                  background: "#F1EEFB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  scale: interpolate(frame, [at(T.search.click) - 1, at(T.search.click) + 1, at(T.search.click) + 5], [1, 0.92, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <Search size={72} color={colors.ink} strokeWidth={2.4} />
              </div>
            </div>
            {/* Results grid, scrolling like a feed */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(3, ${THUMB_W}px)`,
                gap: GRID_GAP,
                padding: `80px 60px`,
                translate: `0px ${scroll}px`,
              }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <ResultThumb key={i} i={i} at={resultsAt + i * 2} />
              ))}
            </div>
          </GlassWindow>
        </div>

        <Cursor
          from={[1500, 1400]}
          to={[searchBtn.x - 20, searchBtn.y - 10]}
          moveAt={at(T.search.typing)}
          clickAt={at(T.search.click)}
          exitAt={resultsAt + 6}
        />
      </AbsoluteFill>

      {/* Message zone (right of the PIP) */}
      <div style={{ position: "absolute", left: layout.pipCx + layout.pipSize / 2 + 70, right: layout.safe, top: 2040, bottom: layout.safe, display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
          <HeroWord at={resultsAt + 4} exitAt={exitAt} fill="gradient" size={150}>
            ফ্রিতেই অনেক কন্টেন্ট
          </HeroWord>
        </div>
      </div>
      <Bokeh seed="search" count={7} front opacity={0.6} />
    </AbsoluteFill>
  );
};
