// "আমাদের কোম্পানি Joint Stock থেকে নিবন্ধিত এবং আমাদের registered ঠিকানা হাজী আলাউদ্দিন সুপার
//  মার্কেটের নিচতলা, বড়বাড়ি বাস স্ট্যান্ড, টঙ্গী, গাজীপুর।"
// Logo + registration badge; the address builds line by line next to a stylised map
// where a pin drops on "হাজী".
import React from "react";
import { BadgeCheck, Bus, MapPin, Store } from "lucide-react";
import { Appear, Float, Glass, GradPill, IconTile, Label, LogoMark, Pop, useEnter, useTime, Word } from "../components/kit";
import type { Timeline } from "../data/timeline";
import { colors, fonts, iconTints } from "../theme";

const MapArt: React.FC<{ pinAt: number }> = ({ pinAt }) => {
  const drop = useEnter(pinAt);
  const { frame, f } = useTime();
  const since = Math.max(0, frame - f(pinAt) - 8) / 30;
  const ripple = (k: number) => ((since + k * 0.7) % 1.4) / 1.4;
  return (
    <div style={{ position: "relative", width: 640, height: 640, borderRadius: 26, overflow: "hidden", background: "#F6F2FF" }}>
      <svg width={640} height={640} style={{ position: "absolute", inset: 0 }}>
        {/* blocks */}
        {[
          [40, 40, 170, 120],
          [250, 30, 150, 140],
          [450, 50, 150, 110],
          [30, 230, 140, 160],
          [440, 240, 170, 130],
          [60, 450, 180, 150],
          [290, 440, 120, 160],
          [460, 430, 150, 170],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx={18} fill={i % 3 === 0 ? "#EDE5FF" : "#FFFFFF"} />
        ))}
        {/* roads */}
        <path d="M -20 200 C 180 210, 420 190, 660 214" stroke="#FFFFFF" strokeWidth={34} fill="none" />
        <path d="M 225 -20 C 230 200, 210 420, 240 660" stroke="#FFFFFF" strokeWidth={30} fill="none" />
        <path d="M -20 410 C 200 420, 400 400, 660 420" stroke="#FFFFFF" strokeWidth={26} fill="none" />
        <path d="M 425 -20 C 420 200, 440 420, 430 660" stroke="#FFFFFF" strokeWidth={22} fill="none" />
        <path d="M -20 200 C 180 210, 420 190, 660 214" stroke="#D8CCFB" strokeWidth={3} strokeDasharray="14 14" fill="none" />
      </svg>
      {/* ripples + pin at the road crossing */}
      {[0, 1].map((k) => (
        <div
          key={k}
          style={{
            position: "absolute",
            left: 330 - 90,
            top: 312 - 30,
            width: 180,
            height: 60,
            borderRadius: "50%",
            border: `3px solid ${colors.brand2}`,
            opacity: drop > 0.9 ? (1 - ripple(k)) * 0.6 : 0,
            transform: `scale(${0.3 + ripple(k)})`,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: 330 - 50,
          top: 312 - 108,
          opacity: Math.min(1, drop * 2),
          transform: `translateY(${(1 - drop) * -160}px)`,
        }}
      >
        <IconTile icon={MapPin} tint={iconTints.image} size={100} />
      </div>
    </div>
  );
};

const AddressLine: React.FC<{ icon: typeof MapPin; tint: [string, string]; at: number; children: React.ReactNode }> = ({
  icon,
  tint,
  at,
  children,
}) => (
  <Appear at={at} rise={24} style={{ display: "flex", alignItems: "center", gap: 24 }}>
    <IconTile icon={icon} tint={tint} size={70} />
    <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 42, lineHeight: 1.25, color: colors.ink }}>{children}</div>
  </Appear>
);

export const AddressScene: React.FC<{ t: Timeline["address"] }> = ({ t }) => (
  <>
    <Appear at={t.start} style={{ position: "absolute", left: 150, top: 90 }}>
      <Glass style={{ padding: "18px 30px", background: "rgba(255,255,255,0.96)" }}>
        <LogoMark width={300} />
      </Glass>
    </Appear>
    <Appear at={t.joint} style={{ position: "absolute", left: 150, top: 300 }}>
      <GradPill icon={BadgeCheck} size={32}>
        <span style={{ fontFamily: fonts.ui, fontWeight: 600 }}>Joint Stock</span> থেকে নিবন্ধিত
      </GradPill>
    </Appear>

    <div style={{ position: "absolute", left: 150, top: 410, width: 900 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 18, fontFamily: fonts.display, fontWeight: 800, fontSize: 84 }}>
        <Label size={34} muted style={{ fontFamily: fonts.ui, fontWeight: 500 }}>
          registered
        </Label>
        <Word text="ঠিকানা" at={t.thikana} grad />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 26 }}>
        <AddressLine icon={Store} tint={iconTints.shop} at={t.haji}>
          হাজী আলাউদ্দিন সুপার মার্কেটের <Word text="নিচতলা" at={t.nichtola} />
        </AddressLine>
        <AddressLine icon={Bus} tint={iconTints.animation} at={t.borobari}>
          বড়বাড়ি বাস স্ট্যান্ড
        </AddressLine>
        <AddressLine icon={MapPin} tint={iconTints.image} at={t.tongi}>
          টঙ্গী, <Word text="গাজীপুর" at={t.gazipur} grad />
        </AddressLine>
      </div>
    </div>

    <Appear at={t.thikana} style={{ position: "absolute", left: 1080, top: 150 }}>
      <Float amp={4}>
        <Glass style={{ padding: 24 }}>
          <MapArt pinAt={t.haji} />
        </Glass>
      </Float>
    </Appear>
    <Pop at={t.tongi} style={{ position: "absolute", left: 1080 + 24 + 330 - 120, top: 150 + 24 + 340, width: 240, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          padding: "10px 26px",
          borderRadius: 99,
          background: "white",
          boxShadow: "0 10px 26px rgba(76,29,149,0.16)",
          fontFamily: fonts.body,
          fontWeight: 700,
          fontSize: 30,
          color: colors.ink,
        }}
      >
        টঙ্গী, গাজীপুর
      </div>
    </Pop>
  </>
);
