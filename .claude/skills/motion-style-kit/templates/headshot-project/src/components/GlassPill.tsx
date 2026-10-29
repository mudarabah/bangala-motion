import type { LucideIcon } from "lucide-react";
import React from "react";
import { colors, fonts, glass, gradients, type } from "../theme";

type Variant = "footage" | "light" | "brand" | "amber" | "danger";

const variants: Record<Variant, { box: React.CSSProperties; text: string; chip: string; icon: string }> = {
  footage: { box: glass.onFootage, text: colors.ink, chip: gradients.keyword, icon: colors.white },
  light: { box: glass.onLight, text: colors.ink, chip: gradients.keyword, icon: colors.white },
  brand: {
    box: { background: gradients.button, boxShadow: "0 32px 80px rgba(124,58,237,0.45)", border: "2px solid rgba(255,255,255,0.35)" },
    text: colors.white,
    chip: "rgba(255,255,255,0.22)",
    icon: colors.white,
  },
  amber: {
    box: { background: colors.amber, boxShadow: "0 32px 80px rgba(245,179,0,0.35)", border: "2px solid rgba(255,255,255,0.5)" },
    text: colors.ink,
    chip: "rgba(255,255,255,0.45)",
    icon: colors.ink,
  },
  danger: {
    box: { background: colors.danger, boxShadow: "0 32px 80px rgba(239,68,68,0.4)", border: "2px solid rgba(255,255,255,0.5)" },
    text: colors.white,
    chip: "rgba(255,255,255,0.25)",
    icon: colors.white,
  },
};

// L3 label inside a glass pill, with an optional lucide icon chip.
export const GlassPill: React.FC<{
  icon?: LucideIcon;
  variant?: Variant;
  size?: number;
  style?: React.CSSProperties;
  iconNode?: React.ReactNode; // replaces the icon chip content (e.g. a crossfading icon)
  children: React.ReactNode;
}> = ({ icon: Icon, variant = "footage", size = type.label, style, iconNode, children }) => {
  const v = variants[variant];
  const chip = size * 1.5;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.4,
        padding: `${size * 0.28}px ${size * 0.6}px ${size * 0.28}px ${size * 0.28}px`,
        borderRadius: 999,
        fontFamily: fonts.body,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.25,
        color: v.text,
        whiteSpace: "nowrap",
        ...v.box,
        ...style,
      }}
    >
      {Icon || iconNode ? (
        <div
          style={{
            width: chip,
            height: chip,
            borderRadius: 999,
            background: v.chip,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative",
          }}
        >
          {iconNode ?? (Icon ? <Icon size={chip * 0.52} color={v.icon} strokeWidth={2.2} /> : null)}
        </div>
      ) : null}
      <span style={{ paddingTop: size * 0.08 }}>{children}</span>
    </div>
  );
};
