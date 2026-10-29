// "মুদারাবা ট্রেড লিমিটেড সরকার কর্তৃক নিবন্ধিত একটি Private Limited Company।"
// The logo on a large glass card; a verified shield lands on its corner on "নিবন্ধিত".
import React from "react";
import { Building2, ShieldCheck } from "lucide-react";
import { Appear, Float, GradPill, Headline, IconTile, LogoCard, Pop, Word } from "../components/kit";
import type { Timeline } from "../data/timeline";
import { fonts, iconTints } from "../theme";

export const CompanyScene: React.FC<{ t: Timeline["company"] }> = ({ t }) => (
  <>
    <Appear at={t.start} scaleFrom={0.9} style={{ position: "absolute", left: 200, top: 250 }}>
      <Float amp={5}>
        <LogoCard size={580} />
      </Float>
    </Appear>
    <Pop at={t.nibondhito} style={{ position: "absolute", left: 200 + 580 - 70, top: 250 - 40 }}>
      <IconTile icon={ShieldCheck} tint={iconTints.briefcase} size={120} />
    </Pop>

    <div style={{ position: "absolute", left: 900, top: 300, width: 900 }}>
      <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 60, lineHeight: 1.2 }}>
        <Word text="মুদারাবা" at={t.start} />{" "}
        <Word text="ট্রেড" at={t.trade} />{" "}
        <Word text="লিমিটেড" at={t.limited} />
      </div>
      <Headline
        align="left"
        size={104}
        style={{ marginTop: 18 }}
        words={[
          ["সরকার", t.sorkar],
          ["কর্তৃক", t.kortrik],
          ["নিবন্ধিত", t.nibondhito, true],
        ]}
      />
      <Appear at={t.privateLtd} style={{ marginTop: 48 }}>
        <GradPill icon={Building2} size={38} style={{ padding: "22px 44px", fontFamily: fonts.ui, fontWeight: 600 }}>
          Private Limited Company
        </GradPill>
      </Appear>
    </div>
  </>
);
