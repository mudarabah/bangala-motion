// Theme for the "Headshot Lavender" style (motion-style-kit), sized for a
// 2160x2700 (4:5) talking-head canvas. Style sizes are written for 1080 px
// wide frames, so pixel values here are doubled.
import { loadFont as loadAnek } from "@remotion/google-fonts/AnekBangla";
import { loadFont as loadHind } from "@remotion/google-fonts/HindSiliguri";

const anek = loadAnek("normal", { weights: ["700", "800"], subsets: ["bengali", "latin"] });
const hind = loadHind("normal", { weights: ["600", "700"], subsets: ["bengali", "latin"] });

export const fonts = {
  display: anek.fontFamily, // L1 hero words, L2 phrases, big numerals
  body: hind.fontFamily, // L3 labels and pills
};

export const colors = {
  base: "#FBF9FF",
  ink: "#1E1340",
  inkMuted: "#6B6488",
  brand: "#7C3AED",
  brand2: "#A855F7",
  magenta: "#C026D3",
  extrudeTop: "#5B3DBA",
  extrudeBottom: "#3B2A7A",
  violetField: "#A78BFA",
  peachField: "#FDBA8C",
  success: "#10B981",
  danger: "#EF4444",
  amber: "#F5B300",
  white: "#FFFFFF",
};

export const gradients = {
  keyword: `linear-gradient(90deg, ${colors.brand}, ${colors.magenta})`,
  // Text fill: deep violet → magenta with a lighter band, readable on light backgrounds.
  text: "linear-gradient(100deg, #5B21B6 0%, #7C3AED 38%, #A21CAF 72%, #C026D3 100%)",
  button: `linear-gradient(90deg, ${colors.brand}, ${colors.brand2})`,
  scrim: "linear-gradient(180deg, rgba(27,16,64,0) 0%, rgba(27,16,64,0.35) 45%, rgba(27,16,64,0.6) 100%)",
};

// No backdrop-filter: it switches on/off whenever an ancestor animates
// `filter`, which reads as a blink. Fills are opaque enough on their own.
export const glass = {
  // Panels and pills over footage: frosted white so ink text stays readable on the suit.
  onFootage: {
    background: "rgba(255,255,255,0.88)",
    border: "2px solid rgba(255,255,255,0.95)",
    boxShadow: "0 48px 120px rgba(27,16,64,0.30), 0 8px 24px rgba(27,16,64,0.12)",
  },
  // Panels on the lavender brand background (card frame mode).
  onLight: {
    background: "rgba(255,255,255,0.8)",
    border: "2px solid rgba(255,255,255,0.9)",
    boxShadow: "0 48px 120px rgba(76,29,149,0.14), 0 8px 24px rgba(76,29,149,0.08)",
  },
} as const;

export const type = {
  hero: 300, // L1
  phrase: 128, // L2
  label: 80, // L3
};

// Hero text depth. One crisp fill, no stacked duplicates (those read as
// "double text"): a soft diffuse shadow lifts the word off the background.
export const textDepth = {
  // text-shadow for white text on footage
  onFootage: "0 3px 8px rgba(27,16,64,0.35), 0 16px 44px rgba(27,16,64,0.5)",
  // filter for gradient (background-clipped) text on the light world
  onLight: "drop-shadow(0 4px 6px rgba(76,29,149,0.18)) drop-shadow(0 18px 34px rgba(76,29,149,0.22))",
};

export const motion = {
  spring: { damping: 200 }, // smooth, no bounce
  enterFrames: 12,
  exitFrames: 7,
  risePx: 60,
  blurPx: 20,
  dissolveFrames: 12, // framing changes
};

export const layout = {
  width: 2160,
  height: 2700,
  safe: 80,
  // Speaker's face sits at roughly y 520–1500; over footage, graphics live below it.
  bandBottom: 200,
  // CARD framing: footage card at the top.
  cardScale: 0.5,
  cardTop: 110,
  cardRadius: 90,
  // Area below the footage card for world visuals.
  belowCardTop: 1560,
  // PIP framing: circle bottom-left.
  pipSize: 440,
  pipCx: 80 + 220,
  pipCy: 2700 - 80 - 220,
};
