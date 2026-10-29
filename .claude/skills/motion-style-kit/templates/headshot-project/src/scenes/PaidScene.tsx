import { Braces, CalendarDays, Film, Gift, Mic, Plus, Wand2 } from "lucide-react";
import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { useEnterStyle, useProgress, useSceneTime } from "../components/anim";
import { GlassPill } from "../components/GlassPill";
import { HeroWord } from "../components/HeroWord";
import { IconOrb } from "../components/IconOrb";
import { Reveal } from "../components/Reveal";
import { Scrim } from "../components/Scrim";
import { StrikeLine } from "../components/StrikeLine";
import { T } from "../data/timeline";
import { colors, fonts, glass, gradients, layout } from "../theme";

const MODULES = [Mic, Braces, Wand2, Film];

const ModuleTile: React.FC<{ icon: typeof Mic; at: number; exitAt: number }> = ({ icon: Icon, at, exitAt }) => {
  const style = useEnterStyle(at, exitAt, 80);
  return (
    <div
      style={{
        width: 150,
        height: 150,
        borderRadius: 44,
        background: gradients.keyword,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 20px 44px rgba(124,58,237,0.45), inset 0 3px 0 rgba(255,255,255,0.35)",
        ...style,
      }}
    >
      <Icon size={80} color="white" strokeWidth={2.1} />
    </div>
  );
};

// S7 — "কয়েকদিন আগেও … ফ্রিতে দিয়েছিলাম / এখন কিন্তু এটা পেইড … অনেক এডভান্স বিষয় যুক্ত করার কারণে".
export const PaidScene: React.FC = () => {
  const { at } = useSceneTime(T.paid.start);
  const exitAt = at(T.paid.exit);
  const freeAt = at(T.paid.free);
  const paidAt = at(T.paid.paid);
  const stamp = useProgress(paidAt, 8);
  const advAt = at(T.paid.advanced);
  return (
    <AbsoluteFill>
      <Scrim at={at(T.paid.start)} exitAt={exitAt} height={1250} />
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", padding: layout.safe, paddingBottom: layout.bandBottom - 40, gap: 48 }}>
        {/* Calendar kicker, then the free ticket */}
        <div style={{ position: "relative", height: 470, width: 1640, display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
          <Reveal at={at(T.paid.start) + 3} exitAt={freeAt} style={{ position: "absolute", bottom: 150 }}>
            <GlassPill icon={CalendarDays} size={96}>
              কয়েকদিন আগেও
            </GlassPill>
          </Reveal>
          <Reveal at={freeAt} exitAt={exitAt} style={{ position: "absolute", inset: 0 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 64,
                display: "flex",
                alignItems: "center",
                gap: 64,
                padding: "0 90px",
                ...glass.onFootage,
              }}
            >
              <IconOrb icon={Gift} at={freeAt + 2} size={250} tint="success" bob={false} />
              <div style={{ borderLeft: "6px dashed rgba(124,58,237,0.25)", alignSelf: "stretch", margin: "60px 0" }} />
              <div style={{ opacity: interpolate(stamp, [0, 1], [1, 0.45]) }}>
                <StrikeLine at={paidAt + 4} thickness={20}>
                  <HeroWord at={freeAt} fill="gradient" size={240}>
                    ফ্রিতে
                  </HeroWord>
                </StrikeLine>
              </div>
            </div>
            {/* PAID stamp lands on the ticket */}
            <div
              style={{
                position: "absolute",
                right: 70,
                top: 70,
                padding: "26px 64px 18px",
                borderRadius: 40,
                border: `12px solid ${colors.brand}`,
                color: colors.brand,
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: 170,
                lineHeight: 1.1,
                background: "rgba(255,255,255,0.88)",
                rotate: "-10deg",
                opacity: stamp,
                scale: interpolate(stamp, [0, 1], [1.5, 1]),
                boxShadow: "0 24px 60px rgba(124,58,237,0.35)",
              }}
            >
              পেইড
            </div>
          </Reveal>
        </div>

        {/* Advanced modules slot in */}
        <div style={{ display: "flex", alignItems: "center", gap: 28, height: 170 }}>
          <Reveal at={advAt} exitAt={exitAt}>
            <GlassPill icon={Plus} variant="brand" size={84}>
              অনেক এডভান্স বিষয়
            </GlassPill>
          </Reveal>
          {MODULES.map((Icon, i) => (
            <ModuleTile key={i} icon={Icon} at={advAt + 4 + i * 3} exitAt={exitAt} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
