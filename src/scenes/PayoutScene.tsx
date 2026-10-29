// "মুনাফা প্রদান, মুরাবাহা মুয়াজ্জাল পদ্ধতি অনুযায়ী প্রতি মাসের দশ তারিখের মধ্যে
//  একটি শেয়ারের বিপরীতে সাতশো পঞ্চাশ টাকা প্রদান করা হবে।"
// A month calendar circles the 10th; a payout card counts up to ৳750 per share.
import React from "react";
import { CalendarDays, HandCoins, ScrollText } from "lucide-react";
import {
  Appear,
  bn,
  CheckBadge,
  Counter,
  Glass,
  Headline,
  IconTile,
  Label,
  Pill,
  Pop,
  useActive,
  useEnter,
  useTime,
} from "../components/kit";
import type { Timeline } from "../data/timeline";
import { colors, fonts, gradients, iconTints } from "../theme";

const Calendar: React.FC<{ markAt: number }> = ({ markAt }) => {
  const mark = useEnter(markAt);
  const { frame, f } = useTime();
  const pulse = Math.max(0, frame - f(markAt)) / 30; // seconds since the mark
  const ring = pulse % 1.4;
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 74px)", gap: 10, justifyContent: "center" }}>
      {days.map((d) => {
        const isTen = d === 10;
        return (
          <div
            key={d}
            style={{
              position: "relative",
              height: 58,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.display,
              fontWeight: isTen ? 800 : 600,
              fontSize: isTen ? 32 : 26,
              color: isTen && mark > 0.5 ? "white" : colors.inkMuted,
              background: isTen ? undefined : "rgba(246,242,255,0.8)",
            }}
          >
            {isTen ? (
              <>
                <div
                  style={{
                    position: "absolute",
                    inset: -6,
                    borderRadius: 20,
                    background: gradients.button,
                    opacity: mark,
                    transform: `scale(${0.6 + 0.4 * mark})`,
                    boxShadow: "0 10px 26px rgba(124,58,237,0.4)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: -6,
                    borderRadius: 22,
                    border: `3px solid ${colors.brand2}`,
                    opacity: mark > 0.9 ? Math.max(0, 1 - ring / 1.1) * 0.7 : 0,
                    transform: `scale(${1 + ring * 0.5})`,
                  }}
                />
              </>
            ) : null}
            <span style={{ position: "relative" }}>{bn(d)}</span>
          </div>
        );
      })}
    </div>
  );
};

export const PayoutScene: React.FC<{ t: Timeline["payout"] }> = ({ t }) => {
  const calActive = useActive(t.dosh, t.sheyar);
  const payActive = useActive(t.satsho);
  return (
    <>
      <Headline
        style={{ position: "absolute", top: 70, left: 0, right: 0 }}
        words={[
          ["মুনাফা", t.start, true],
          ["প্রদান", t.prodan],
        ]}
      />
      <Appear at={t.murabaha} style={{ position: "absolute", left: 0, right: 0, top: 205, display: "flex", justifyContent: "center" }}>
        <Pill icon={ScrollText} size={32}>
          মুরাবাহা মুয়াজ্জাল পদ্ধতি
        </Pill>
      </Appear>

      <Appear at={t.proti} style={{ position: "absolute", left: 150, top: 320 }}>
        <Glass active={calActive} style={{ width: 760, height: 620, padding: "38px 40px", display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <IconTile icon={CalendarDays} tint={iconTints.animation} size={80} />
            <Label size={42} style={{ fontWeight: 700 }}>
              প্রতি মাসের <span style={{ color: colors.brand }}>{bn(10)} তারিখের</span> মধ্যে
            </Label>
          </div>
          <Calendar markAt={t.dosh} />
        </Glass>
      </Appear>

      <Appear at={t.sheyar} style={{ position: "absolute", left: 1010, top: 320 }}>
        <Glass
          active={payActive}
          style={{ width: 760, height: 620, padding: 48, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26 }}
        >
          <IconTile icon={HandCoins} tint={iconTints.coin} size={130} />
          <Label size={44} style={{ fontWeight: 700 }}>
            একটি শেয়ারের বিপরীতে
          </Label>
          <Pop at={t.satsho}>
            <Counter
              from={t.satsho - 0.1}
              to={t.taka}
              value={750}
              prefix="৳"
              style={{
                display: "inline-block",
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: 150,
                lineHeight: 1.2,
                padding: "0.04em 0.06em",
                backgroundImage: gradients.keyword,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            />
          </Pop>
          <Pop at={t.taka} delay={8} style={{ position: "absolute", top: 30, right: 30 }}>
            <CheckBadge size={56} />
          </Pop>
        </Glass>
      </Appear>
    </>
  );
};
