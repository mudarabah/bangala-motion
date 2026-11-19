// Shared pieces for the Mishtio (pink glass) videos: cake photos, logo cards and tints.
// Pieces that show spoken words live in each video, because each has its own transcript.
import React from "react";
import { staticFile } from "remotion";
import { Appear, Glass } from "../components/kit";

export const PINK: [string, string] = ["#F9A8D4", "#E11D74"];
export const BERRY: [string, string] = ["#F0ABFC", "#A21CAF"];
export const CHOC: [string, string] = ["#D6A88A", "#7C3A1D"];

export const cake = (name: string) => staticFile(`products/cakes/${name}.jpg`);
export const CAKES = {
  drip: "cake-white-choco-drip",
  forest: "cake-black-forest",
  sparkle: "cake-sparkler-orange",
  straw: "cake-strawberry-naked",
  cup: "cupcake-strawberry",
  candles: "cake-choco-candles-dark",
  lilac: "cake-lilac-blackberry",
  slice: "cake-choco-slice",
  bday: "cake-birthday-candles",
};

export const LOGO = staticFile("brand/mishtio-logo-trim.png"); // 1006x950

export const Card: React.FC<{ w?: number; h?: number; active?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w = 320, h = 300, active, children, style }) => (
  <Glass active={active} style={{ width: w, height: h, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, position: "relative", ...style }}>
    {children}
  </Glass>
);

// A cake photo in a glass frame.
export const Photo: React.FC<{ src: string; w: number; h: number; pos?: string; style?: React.CSSProperties }> = ({ src, w, h, pos = "center", style }) => (
  <Glass style={{ padding: 10, borderRadius: 32, ...style }}>
    <img src={cake(src)} style={{ width: w, height: h, objectFit: "cover", objectPosition: pos, borderRadius: 24, display: "block" }} />
  </Glass>
);

// The Mishtio logo on a white glass card.
export const MishtioCard: React.FC<{ w: number }> = ({ w }) => (
  <Glass style={{ padding: 18, borderRadius: 36, background: "rgba(255,255,255,0.97)" }}>
    <img src={LOGO} style={{ width: w, height: (w * 950) / 1006, display: "block", mixBlendMode: "multiply" }} />
  </Glass>
);

export const Corner: React.FC<{ at: number }> = ({ at }) => (
  <Appear at={at} rise={0} style={{ position: "absolute", right: 60, top: 30 }}>
    <Glass style={{ padding: "6px 10px", borderRadius: 22, background: "rgba(255,255,255,0.95)" }}>
      <img src={LOGO} style={{ width: 96, height: 91, display: "block", mixBlendMode: "multiply" }} />
    </Glass>
  </Appear>
);

// Pink gradient pill; put white spoken words inside.
export const PinkBox: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ position: "relative", padding: "22px 54px", borderRadius: 999, background: "linear-gradient(90deg, #E11D74, #F472B6)", boxShadow: "0 18px 40px rgba(225,29,116,0.32)", overflow: "hidden", ...style }}>
    {children}
  </div>
);
