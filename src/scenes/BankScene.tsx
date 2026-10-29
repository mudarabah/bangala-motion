// "এছাড়া বিনিয়োগের সম্পূর্ণ লেনদেন কোম্পানির ব্যাংক account এর মাধ্যমে সম্পন্ন করা হবে,
//  যাতে প্রতিটি লেনদেনের যথাযথ record থাকে।"
// Bank card on the left; a ledger fills on the right; every row is ticked on "প্রতিটি".
import React from "react";
import { ArrowLeftRight, FileCheck2, Landmark } from "lucide-react";
import { Appear, CheckBadge, Glass, GradPill, Headline, IconTile, Label, Pop, useActive } from "../components/kit";
import type { Timeline } from "../data/timeline";
import { fonts, iconTints } from "../theme";

const ROWS = 5;

export const BankScene: React.FC<{ t: Timeline["bank"] }> = ({ t }) => {
  const ledgerActive = useActive(t.record);
  const bankActive = useActive(t.bank, t.protiti);
  return (
    <>
      <Headline
        style={{ position: "absolute", top: 80, left: 0, right: 0 }}
        words={[
          ["বিনিয়োগের", t.biniyog],
          ["সম্পূর্ণ", t.sompurno, true],
          ["লেনদেন", t.lenden],
        ]}
      />

      <Appear at={t.bank} style={{ position: "absolute", left: 150, top: 270 }}>
        <Glass
          active={bankActive}
          style={{ width: 620, height: 580, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 34 }}
        >
          <IconTile icon={Landmark} tint={iconTints.video} size={170} />
          <Label size={48} style={{ fontWeight: 700, textAlign: "center" }}>
            কোম্পানির ব্যাংক
            <br />
            <span style={{ fontFamily: fonts.ui, fontWeight: 600 }}>account</span>
          </Label>
        </Glass>
      </Appear>

      <Appear at={t.lenden} style={{ position: "absolute", left: 840, top: 270 }}>
        <Glass active={ledgerActive} style={{ width: 930, height: 580, padding: "36px 44px", display: "flex", flexDirection: "column", gap: 18 }}>
          {Array.from({ length: ROWS }).map((_, i) => (
            <Appear key={i} at={t.lenden} delay={6 + i * 5} rise={20}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  padding: "14px 20px",
                  borderRadius: 20,
                  background: "rgba(246,242,255,0.9)",
                }}
              >
                <IconTile icon={ArrowLeftRight} tint={i % 2 ? iconTints.animation : iconTints.document} size={56} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ height: 12, width: 260 + ((i * 70) % 160), borderRadius: 8, background: "#D8CCFB" }} />
                  <div style={{ height: 10, width: 160 + ((i * 50) % 90), borderRadius: 8, background: "#ECE6FA" }} />
                </div>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 30, color: "#7C3AED" }}>৳</div>
                <div style={{ height: 12, width: 110, borderRadius: 8, background: "#D8CCFB" }} />
                <div style={{ width: 44, height: 44 }}>
                  <Pop at={t.protiti} delay={i * 6}>
                    <CheckBadge size={44} />
                  </Pop>
                </div>
              </div>
            </Appear>
          ))}
        </Glass>
      </Appear>

      <Appear at={t.record} style={{ position: "absolute", left: 840, width: 930, top: 890, display: "flex", justifyContent: "center" }}>
        <GradPill icon={FileCheck2} size={36} style={{ fontFamily: fonts.ui, fontWeight: 600 }}>
          record
        </GradPill>
      </Appear>
    </>
  );
};
