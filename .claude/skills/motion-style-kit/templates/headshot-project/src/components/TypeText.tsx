import React from "react";
import { useCurrentFrame } from "remotion";
import { graphemes } from "./utils";

// Types text in, one grapheme cluster every `framesPer` frames, with a caret.
export const TypeText: React.FC<{
  text: string;
  at: number;
  framesPer?: number;
  caret?: boolean;
  caretColor?: string;
}> = ({ text, at, framesPer = 1, caret = true, caretColor = "currentColor" }) => {
  const frame = useCurrentFrame();
  const parts = graphemes(text);
  const n = Math.max(0, Math.min(parts.length, Math.floor((frame - at) / framesPer) + 1));
  const typing = frame >= at && n < parts.length;
  const blinkOn = typing || Math.floor(frame / 8) % 2 === 0;
  return (
    <span style={{ whiteSpace: "pre" }}>
      {frame >= at ? parts.slice(0, n).join("") : ""}
      {caret ? (
        <span
          style={{
            display: "inline-block",
            width: "0.08em",
            height: "1em",
            marginLeft: "0.06em",
            verticalAlign: "-0.12em",
            background: caretColor,
            opacity: blinkOn ? 1 : 0,
          }}
        />
      ) : null}
    </span>
  );
};
