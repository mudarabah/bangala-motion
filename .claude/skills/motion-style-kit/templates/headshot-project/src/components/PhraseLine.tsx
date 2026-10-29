import React from "react";
import { colors, fonts, textDepth, type } from "../theme";
import { useEnterStyle } from "./anim";

const Word: React.FC<{ at: number; exitAt?: number; children: string }> = ({ at, exitAt, children }) => {
  const style = useEnterStyle(at, exitAt, 30);
  return <span style={{ display: "inline-block", ...style }}>{children}</span>;
};

// L2 phrase: each word enters on its own spoken frame.
export const PhraseLine: React.FC<{
  words: readonly string[];
  ats: readonly number[]; // local frame per word
  exitAt?: number;
  size?: number;
  onFootage?: boolean;
  style?: React.CSSProperties;
}> = ({ words, ats, exitAt, size = type.phrase, onFootage = true, style }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        columnGap: size * 0.28,
        fontFamily: fonts.display,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.3,
        color: onFootage ? colors.white : colors.ink,
        textShadow: onFootage ? textDepth.onFootage : undefined,
        ...style,
      }}
    >
      {words.map((w, i) => (
        <Word key={i} at={ats[i]} exitAt={exitAt}>
          {w}
        </Word>
      ))}
    </div>
  );
};
