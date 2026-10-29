// "বিনিয়োগের নিরাপত্তার জন্য নিম্নোক্ত document প্রদান করা হবে। এক, … পাঁচ, …"
// Five document cards; each lands when its number is spoken, becomes the active card,
// and gets a green tick when the next one arrives.
import React from "react";
import type { LucideIcon } from "lucide-react";
import { Award, Banknote, FileBadge, FileSignature, FileText, ShieldCheck } from "lucide-react";
import { Appear, bn, CheckBadge, Glass, Headline, IconTile, Pill, Pop, useActive } from "../components/kit";
import type { Timeline } from "../data/timeline";
import { colors, fonts, gradients, iconTints } from "../theme";

const CARD_W = 318;
const GAP = 30;
const LEFT = (1920 - (CARD_W * 5 + GAP * 4)) / 2;

const DocCard: React.FC<{
  n: number;
  icon: LucideIcon;
  tint: [string, string];
  title: React.ReactNode;
  at: number;
  next: number;
}> = ({ n, icon, tint, title, at, next }) => {
  const active = useActive(at, next);
  return (
    <Appear at={at} style={{ position: "absolute", left: LEFT + (n - 1) * (CARD_W + GAP), top: 370 }}>
      <Glass
        active={active}
        style={{
          width: CARD_W,
          height: 470,
          padding: "34px 26px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          transform: `translateY(${-14 * active}px)`,
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            padding: "6px 18px",
            borderRadius: 99,
            background: gradients.button,
            color: "white",
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 30,
          }}
        >
          {bn(String(n).padStart(2, "0"))}
        </div>
        <IconTile icon={icon} tint={tint} size={112} />
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 34,
            lineHeight: 1.3,
            textAlign: "center",
            color: colors.ink,
          }}
        >
          {title}
        </div>
        <Pop at={next} style={{ position: "absolute", right: 22, top: 26 }}>
          <CheckBadge size={48} />
        </Pop>
      </Glass>
    </Appear>
  );
};

const latin: React.CSSProperties = { fontFamily: fonts.ui, fontWeight: 600, fontSize: 30 };

export const SecurityScene: React.FC<{ t: Timeline["security"]; end: number }> = ({ t, end }) => (
  <>
    <div style={{ position: "absolute", top: 70, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
      <Pop at={t.nirapotta}>
        <IconTile icon={ShieldCheck} tint={iconTints.briefcase} size={100} />
      </Pop>
      <Headline
        words={[
          ["বিনিয়োগের", t.start],
          ["নিরাপত্তার", t.nirapotta, true],
        ]}
      />
    </div>
    <Appear at={t.document} style={{ position: "absolute", left: 0, right: 0, top: 230, display: "flex", justifyContent: "center" }}>
      <Pill size={32}>
        নিম্নোক্ত <span style={{ fontFamily: fonts.ui }}>document</span>
      </Pill>
    </Appear>

    <DocCard n={1} icon={Banknote} tint={iconTints.briefcase} at={t.d1} next={t.d2} title="সমপরিমাণ টাকার চেক" />
    <DocCard
      n={2}
      icon={FileSignature}
      tint={iconTints.document}
      at={t.d2}
      next={t.d3}
      title={<>{bn(300)} টাকার স্ট্যাম্পে চুক্তিপত্র</>}
    />
    <DocCard
      n={3}
      icon={FileBadge}
      tint={iconTints.camera}
      at={t.d3}
      next={t.d4}
      title={
        <>
          <span style={latin}>trade license</span> এর <span style={latin}>copy</span>
        </>
      }
    />
    <DocCard
      n={4}
      icon={FileText}
      tint={iconTints.animation}
      at={t.d4}
      next={t.d5}
      title={
        <>
          <span style={latin}>TIN certificate</span> এর <span style={latin}>copy</span>
        </>
      }
    />
    <DocCard
      n={5}
      icon={Award}
      tint={iconTints.video}
      at={t.d5}
      next={end}
      title={
        <>
          <span style={latin}>registration certificate</span> এর <span style={latin}>copy</span>
        </>
      }
    />
  </>
);
