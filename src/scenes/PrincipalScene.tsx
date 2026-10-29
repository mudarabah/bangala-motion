// "মেয়াদ শেষে বিনিয়োগের মূল টাকা সম্পূর্ণ ফেরত প্রদান করা হবে।"
// A term bar fills to the end; then a wallet card shows the principal coming back in full.
import React from "react";
import { Hourglass, Undo2, Wallet } from "lucide-react";
import { Appear, CheckBadge, Glass, Headline, IconTile, Label, Pop, useEnter, useProgress, Word } from "../components/kit";
import type { Timeline } from "../data/timeline";
import { fonts, gradients, iconTints } from "../theme";

export const PrincipalScene: React.FC<{ t: Timeline["principal"] }> = ({ t }) => {
  const fill = useProgress(t.start, t.sheshe + 0.5);
  const back = useEnter(t.ferot);
  return (
    <>
      <Headline
        style={{ position: "absolute", top: 80, left: 0, right: 0 }}
        words={[
          ["মেয়াদ", t.start],
          ["শেষে", t.sheshe, true],
        ]}
      />

      {/* Term bar */}
      <Appear at={t.start} style={{ position: "absolute", left: 260, right: 260, top: 250 }}>
        <Glass style={{ display: "flex", alignItems: "center", gap: 30, padding: "28px 40px" }}>
          <IconTile icon={Hourglass} tint={iconTints.animation} size={72} />
          <div style={{ flex: 1, height: 26, borderRadius: 99, background: "#ECE6FA", overflow: "hidden" }}>
            <div style={{ width: `${fill * 100}%`, height: "100%", borderRadius: 99, background: gradients.button }} />
          </div>
          <div style={{ width: 52, height: 52 }}>
            <Pop at={t.sheshe} delay={14}>
              <CheckBadge size={52} />
            </Pop>
          </div>
        </Glass>
      </Appear>

      {/* Principal returned */}
      <Appear at={t.mul} style={{ position: "absolute", left: 360, right: 360, top: 470 }}>
        <Glass active={back} style={{ display: "flex", alignItems: "center", gap: 56, padding: "56px 70px" }}>
          <div style={{ position: "relative" }}>
            <IconTile icon={Wallet} tint={iconTints.briefcase} size={200} />
            <div
              style={{
                position: "absolute",
                right: -34,
                top: -34,
                opacity: back,
                transform: `rotate(${(1 - back) * -120}deg) scale(${0.5 + 0.5 * back})`,
              }}
            >
              <IconTile icon={Undo2} tint={iconTints.video} size={96} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Label size={50} muted style={{ fontWeight: 600 }}>
              বিনিয়োগের মূল টাকা
            </Label>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 104, lineHeight: 1.2, display: "flex", gap: 26 }}>
              <Word text="সম্পূর্ণ" at={t.sompurno} />
              <Word text="ফেরত" at={t.ferot} grad />
            </div>
          </div>
        </Glass>
      </Appear>
    </>
  );
};
