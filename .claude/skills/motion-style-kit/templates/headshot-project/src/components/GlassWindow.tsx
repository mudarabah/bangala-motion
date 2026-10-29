import React from "react";
import { colors, fonts, glass } from "../theme";

// Generic app window: glass body with a slim title bar and traffic-light dots.
export const GlassWindow: React.FC<{
  title?: React.ReactNode;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ title, style, bodyStyle, children }) => (
  <div
    style={{
      borderRadius: 56,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      ...glass.onLight,
      background: "rgba(255,255,255,0.86)",
      ...style,
    }}
  >
    <div
      style={{
        height: 110,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "0 44px",
        borderBottom: "2px solid rgba(124,58,237,0.08)",
        background: "rgba(255,255,255,0.6)",
      }}
    >
      {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
        <div key={c} style={{ width: 30, height: 30, borderRadius: 999, background: c }} />
      ))}
      {title ? (
        <div style={{ marginLeft: 28, fontFamily: fonts.body, fontWeight: 600, fontSize: 48, color: colors.inkMuted, paddingTop: 6 }}>
          {title}
        </div>
      ) : null}
    </div>
    <div style={{ flex: 1, position: "relative", ...bodyStyle }}>{children}</div>
  </div>
);
