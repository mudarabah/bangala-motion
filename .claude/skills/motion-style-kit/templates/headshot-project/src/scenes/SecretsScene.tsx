import { LockKeyhole, X } from "lucide-react";
import React from "react";
import { AbsoluteFill, interpolateColors } from "remotion";
import { useEnter3D, useProgress, useSceneTime } from "../components/anim";
import { GlassPill } from "../components/GlassPill";
import { HeroWord } from "../components/HeroWord";
import { IconOrb } from "../components/IconOrb";
import { Reveal } from "../components/Reveal";
import { Scrim } from "../components/Scrim";
import { T } from "../data/timeline";
import { glass, layout } from "../theme";

// S4b — the turn, on the speaker full frame:
// "কিন্তু advanced বিষয় এবং secrets গুলো কেউ আপনাকে দিবে না।"
// A locked vault card rises under the speaker; at "কেউ" the frame punches in,
// the lock turns red and the denial lands.
export const SecretsScene: React.FC = () => {
  const { at } = useSceneTime(T.secrets.start);
  const exitAt = at(T.secrets.exit);
  const vaultAt = at(T.secrets.vault);
  const nobodyAt = at(T.secrets.nobody);
  const card = useEnter3D(vaultAt - 4, exitAt, { tilt: 26, rise: 180 });
  const deny = useProgress(nobodyAt, 12);
  return (
    <AbsoluteFill>
      <Scrim at={vaultAt - 6} exitAt={exitAt} height={1350} />
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", padding: layout.safe, paddingBottom: layout.bandBottom - 20, gap: 44 }}>
        <div style={card}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 60,
              padding: "56px 90px 56px 64px",
              borderRadius: 80,
              ...glass.onFootage,
              border: `4px solid ${interpolateColors(deny, [0, 1], ["rgba(255,255,255,0.95)", "rgba(239,68,68,0.6)"])}`,
              boxShadow: `${glass.onFootage.boxShadow}, 0 0 0 ${16 * deny}px rgba(239,68,68,${0.14 * deny})`,
            }}
          >
            <div style={{ position: "relative", width: 260, height: 260, flexShrink: 0 }}>
              <div style={{ position: "absolute", opacity: 1 - deny }}>
                <IconOrb icon={LockKeyhole} at={vaultAt} size={260} />
              </div>
              <IconOrb icon={LockKeyhole} at={nobodyAt} size={260} tint="danger" style={{ position: "absolute" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <HeroWord at={vaultAt + 2} fill="gradient" size={150}>
                এডভান্স বিষয়
              </HeroWord>
              <HeroWord at={at(T.secrets.secrets)} fill="gradient" size={150} style={{ marginTop: -30 }}>
                সিক্রেটসগুলো
              </HeroWord>
            </div>
          </div>
        </div>
        <Reveal at={nobodyAt} exitAt={exitAt}>
          <GlassPill icon={X} variant="danger" size={96}>
            কেউ আপনাকে দিবে না
          </GlassPill>
        </Reveal>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
