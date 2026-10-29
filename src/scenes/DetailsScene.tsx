// "বিনিয়োগের বিবরণ, সর্বনিম্ন বিনিয়োগ পঁচিশ হাজার টাকা। বিনিয়োগের মেয়াদ ছয় মাস, নয় মাস, বারো মাস।"
// Two cards: minimum amount counting up; three term options lighting up as spoken.
import React from "react";
import { CalendarDays, Coins } from "lucide-react";
import { Appear, bn, Counter, Glass, Headline, IconTile, Label, Pop, useActive } from "../components/kit";
import type { Timeline } from "../data/timeline";
import { colors, fonts, gradients, iconTints } from "../theme";

const Term: React.FC<{ months: number; at: number; until?: number }> = ({ months, at, until }) => {
  const a = useActive(at, until);
  return (
    <Pop at={at}>
      <div
        style={{
          width: 180,
          height: 200,
          borderRadius: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: "rgba(255,255,255,0.95)",
          boxShadow: `0 14px 34px rgba(76,29,149,${0.1 + 0.2 * a}), 0 0 0 ${1 + 2 * a}px rgba(124,58,237,${0.12 + 0.5 * a})`,
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: gradients.button, opacity: a }} />
        <div style={{ position: "relative", fontFamily: fonts.display, fontWeight: 800, fontSize: 92, lineHeight: 1, color: a > 0.5 ? "white" : colors.ink }}>
          {bn(months)}
        </div>
        <div style={{ position: "relative", fontFamily: fonts.body, fontWeight: 600, fontSize: 34, color: a > 0.5 ? "white" : colors.inkMuted }}>
          মাস
        </div>
      </div>
    </Pop>
  );
};

export const DetailsScene: React.FC<{ t: Timeline["details"] }> = ({ t }) => {
  const amountActive = useActive(t.pochish, t.meyad);
  return (
    <>
      <Headline
        style={{ position: "absolute", top: 80, left: 0, right: 0 }}
        words={[
          ["বিনিয়োগের", t.start],
          ["বিবরণ", t.biboron, true],
        ]}
      />

      <Appear at={t.sorbonimno} style={{ position: "absolute", left: 150, top: 270 }}>
        <Glass active={amountActive} style={{ width: 780, height: 560, display: "flex", flexDirection: "column", gap: 30, padding: 52 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <IconTile icon={Coins} tint={iconTints.coin} size={96} />
            <Label size={46} style={{ fontWeight: 700 }}>
              সর্বনিম্ন বিনিয়োগ
            </Label>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Pop at={t.pochish}>
              <Counter
                from={t.pochish - 0.1}
                to={t.pochish + 0.8}
                value={25000}
                prefix="৳"
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 800,
                  fontSize: 140,
                  lineHeight: 1.2,
                  padding: "0.05em 0.05em",
                  backgroundImage: gradients.keyword,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              />
            </Pop>
          </div>
        </Glass>
      </Appear>

      <Appear at={t.meyad} style={{ position: "absolute", left: 990, top: 270 }}>
        <Glass style={{ width: 780, height: 560, display: "flex", flexDirection: "column", gap: 30, padding: 52 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <IconTile icon={CalendarDays} tint={iconTints.animation} size={96} />
            <Label size={46} style={{ fontWeight: 700 }}>
              মেয়াদ
            </Label>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 34 }}>
            <Term months={6} at={t.chhoy} until={t.noy} />
            <Term months={9} at={t.noy} until={t.baro} />
            <Term months={12} at={t.baro} />
          </div>
        </Glass>
      </Appear>
    </>
  );
};
