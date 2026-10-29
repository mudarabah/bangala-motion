// Theme for the "Lavender Glass" style. Copy into the project as src/theme.ts.
// Requires: @remotion/google-fonts (same version as the project's remotion package).
import { loadFont as loadAnek } from "@remotion/google-fonts/AnekBangla";
import { loadFont as loadHind } from "@remotion/google-fonts/HindSiliguri";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";

const anek = loadAnek("normal", { weights: ["600", "700", "800"], subsets: ["bengali", "latin"] });
const hind = loadHind("normal", { weights: ["400", "500", "600"], subsets: ["bengali", "latin"] });
const poppins = loadPoppins("normal", { weights: ["500", "600"], subsets: ["latin"] });

export const fonts = {
  display: anek.fontFamily, // Bangla headlines, big numerals
  body: hind.fontFamily, // Bangla labels and body
  ui: poppins.fontFamily, // Latin UI text, timers
};

export const colors = {
  base: "#FBF9FF",
  ink: "#1E1340",
  inkMuted: "#6B6488",
  brand: "#7C3AED",
  brand2: "#A855F7",
  magenta: "#C026D3",
  success: "#10B981",
  danger: "#EF4444",
  amber: "#F5B300",
  violetField: "#A78BFA",
  peachField: "#FDBA8C",
  lavenderHaze: "#E6DCFD",
};

export const gradients = {
  keyword: `linear-gradient(90deg, ${colors.brand}, ${colors.magenta})`,
  button: `linear-gradient(90deg, ${colors.brand}, ${colors.brand2})`,
};

export const glass = {
  fill: "rgba(255,255,255,0.72)",
  blur: 24, // px, for backdropFilter — static cards only; animated cards blink with it (see reference/qa-and-troubleshooting.md)
  border: "1px solid rgba(255,255,255,0.9)",
  outline: "0 0 0 1px rgba(124,58,237,0.10)",
  shadow: "0 24px 60px rgba(76,29,149,0.12), 0 4px 12px rgba(76,29,149,0.06)",
  radius: 32,
  padding: 36,
  activeBorder: "2px solid rgba(168,85,247,0.7)",
  activeGlow: "0 0 0 6px rgba(168,85,247,0.12), 0 24px 60px rgba(124,58,237,0.22)",
};

export const motion = {
  wordBlurPx: 14,
  wordRisePx: 14,
  wordDuration: 12, // frames
  wordStagger: 5, // frames
  cardRisePx: 36,
  cardStagger: 6,
  spring: { damping: 200, stiffness: 120, mass: 1 }, // smooth, no bounce
  transitionFrames: 12,
  floatAmplitudePx: 8,
  floatPeriodFrames: 105, // ~3.5 s at 30 fps
  cameraPush: [1.0, 1.04] as const,
};

export const safeZone = {
  vertical: { top: 220, bottom: 380, side: 80 }, // 1080x1920
  horizontal: { top: 80, bottom: 80, side: 80 }, // 1920x1080
};

export const iconTints: Record<string, [string, string]> = {
  document: ["#C4B5FD", "#8B5CF6"],
  image: ["#FDA4AF", "#F43F5E"],
  animation: ["#93C5FD", "#3B82F6"],
  sound: ["#86EFAC", "#16A34A"],
  video: ["#C084FC", "#7C3AED"],
  camera: ["#FDBA74", "#F97316"],
  shop: ["#C4B5FD", "#7C3AED"],
  briefcase: ["#6EE7B7", "#059669"],
  coin: ["#FDE68A", "#F5B300"],
};

// Brand colours sampled from public/logo.jpeg (Mudarabah Trade Limited).
export const brandColors = {
  green: "#2DB84C",
  orange: "#F7B44F",
};

// The video is 3840x2160. Everything is laid out in 1920x1080 design units
// (the size the style guide uses) and zoomed 2x, so text stays sharp.
export const design = { width: 1920, height: 1080, zoom: 2 };

export const textDepth = "drop-shadow(0 6px 18px rgba(76,29,149,0.14))";
