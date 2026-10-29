// "বিনিয়োগের স্বচ্ছতা নিশ্চিত করতে আপনার বিনিয়োগের সমপরিমাণ টাকার চেক প্রদান করা হবে এবং
//  তিনশত টাকার স্ট্যাম্পে কোম্পানির সাথে সরাসরি লিখিত চুক্তি সম্পাদন করা হবে।"
// Left: a cheque whose signature draws on "চেক". Right: stamp paper; lines write
// themselves on "লিখিত", the seal lands on "সম্পাদন".
import React from "react";
import { Banknote, FileSignature } from "lucide-react";
import {
  Appear,
  bn,
  CheckBadge,
  Glass,
  GradPill,
  Headline,
  IconTile,
  Label,
  Pop,
  useActive,
  useEnter,
  useProgress,
} from "../components/kit";
import type { Timeline } from "../data/timeline";
import { colors, fonts, iconTints } from "../theme";

const Line: React.FC<{ w: number; p?: number; strong?: boolean }> = ({ w, p = 1, strong }) => (
  <div style={{ height: strong ? 14 : 10, width: w * p, borderRadius: 8, background: strong ? "#D8CCFB" : "#ECE6FA" }} />
);

const Cheque: React.FC<{ sign: number }> = ({ sign }) => (
  <div
    style={{
      position: "relative",
      width: 620,
      height: 290,
      borderRadius: 22,
      background: "linear-gradient(135deg, #FFFFFF, #F4EFFF)",
      border: "1px solid rgba(124,58,237,0.16)",
      boxShadow: "0 14px 34px rgba(76,29,149,0.10)",
      overflow: "hidden",
    }}
  >
    <div style={{ height: 54, background: "linear-gradient(90deg, #EDE5FF, #FBE7F7)" }} />
    <div style={{ position: "absolute", left: 34, top: 88, display: "flex", flexDirection: "column", gap: 22 }}>
      <Line w={330} strong />
      <Line w={400} />
      <Line w={260} />
    </div>
    <div
      style={{
        position: "absolute",
        right: 30,
        top: 82,
        width: 170,
        height: 62,
        borderRadius: 14,
        border: "2px solid rgba(124,58,237,0.35)",
        display: "flex",
        alignItems: "center",
        paddingLeft: 18,
        fontFamily: fonts.display,
        fontWeight: 700,
        fontSize: 34,
        color: colors.brand,
      }}
    >
      ৳
    </div>
    {/* signature */}
    <svg width={220} height={90} style={{ position: "absolute", right: 30, bottom: 22 }}>
      <path
        d="M8 60 C 30 10, 50 10, 52 52 S 80 80, 98 40 S 130 20, 140 56 S 180 70, 212 30"
        fill="none"
        stroke={colors.brand}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={`${420 * sign} 420`}
      />
      <line x1={8} y1={78} x2={212} y2={78} stroke="#D8CCFB" strokeWidth={2} />
    </svg>
  </div>
);

const StampPaper: React.FC<{ write: number; seal: number; stampAt: number }> = ({ write, seal, stampAt }) => {
  const lines = [500, 540, 470, 520, 380];
  return (
    <div
      style={{
        position: "relative",
        width: 620,
        height: 400,
        borderRadius: 18,
        background: "#FFFFFF",
        border: "1px solid rgba(124,58,237,0.14)",
        boxShadow: "0 14px 34px rgba(76,29,149,0.10)",
        overflow: "hidden",
      }}
    >
      {/* stamp band */}
      <div style={{ height: 110, background: "linear-gradient(90deg, #F1EAFF, #FFF1E6)", display: "flex", alignItems: "center", paddingLeft: 30, gap: 20 }}>
        <Pop at={stampAt}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 999,
              border: `3px dashed ${colors.brand}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.display,
              fontWeight: 800,
              fontSize: 28,
              color: colors.brand,
            }}
          >
            ৳{bn(300)}
          </div>
        </Pop>
        <Line w={200} strong />
      </div>
      <div style={{ padding: "34px 34px", display: "flex", flexDirection: "column", gap: 24 }}>
        {lines.map((w, i) => (
          <Line key={i} w={w} p={Math.min(1, Math.max(0, write * lines.length - i))} />
        ))}
      </div>
      {/* seal */}
      <div
        style={{
          position: "absolute",
          right: 40,
          bottom: 34,
          width: 130,
          height: 130,
          borderRadius: 999,
          background: "radial-gradient(circle at 35% 30%, #C084FC, #7C3AED)",
          boxShadow: "0 10px 24px rgba(124,58,237,0.35), inset 0 0 0 6px rgba(255,255,255,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: Math.min(1, seal * 2),
          transform: `scale(${1.7 - 0.7 * seal}) rotate(${-14 + 4 * seal}deg)`,
        }}
      >
        <FileSignature size={60} color="white" strokeWidth={2.2} />
      </div>
    </div>
  );
};

export const TransparencyScene: React.FC<{ t: Timeline["transparency"] }> = ({ t }) => {
  const sign = useProgress(t.cheque, t.cheque + 0.9);
  const write = useProgress(t.likhito - 0.3, t.sompadon);
  const seal = useEnter(t.sompadon);
  const chequeActive = useActive(t.cheque, t.tinshoto);
  const paperActive = useActive(t.sompadon);

  return (
    <>
      <Headline
        style={{ position: "absolute", top: 80, left: 0, right: 0 }}
        words={[
          ["বিনিয়োগের", t.start],
          ["স্বচ্ছতা", t.sscchota, true],
        ]}
      />

      <Appear at={t.apnar} style={{ position: "absolute", left: 130, top: 250 }}>
        <Glass active={chequeActive} style={{ width: 760, height: 620, display: "flex", flexDirection: "column", alignItems: "center", gap: 40, padding: 46 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22, alignSelf: "flex-start" }}>
            <IconTile icon={Banknote} tint={iconTints.briefcase} size={84} />
            <Label size={40} style={{ fontWeight: 700 }}>
              সমপরিমাণ টাকার চেক
            </Label>
          </div>
          <Cheque sign={sign} />
          <Pop at={t.cheque} delay={20} style={{ position: "absolute", right: 30, top: 30 }}>
            <CheckBadge size={56} />
          </Pop>
        </Glass>
      </Appear>

      <Appear at={t.tinshoto} style={{ position: "absolute", left: 1030, top: 250 }}>
        <Glass active={paperActive} style={{ width: 760, height: 620, display: "flex", flexDirection: "column", alignItems: "center", gap: 30, padding: 46 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22, alignSelf: "flex-start" }}>
            <IconTile icon={FileSignature} tint={iconTints.document} size={84} />
            <Label size={40} style={{ fontWeight: 700 }}>
              {bn(300)} টাকার স্ট্যাম্পে চুক্তি
            </Label>
          </div>
          <StampPaper write={write} seal={seal} stampAt={t.stamp} />
        </Glass>
      </Appear>

      <Appear at={t.likhito} style={{ position: "absolute", left: 1030, width: 760, top: 900, display: "flex", justifyContent: "center" }}>
        <GradPill size={34}>লিখিত চুক্তি</GradPill>
      </Appear>
    </>
  );
};
