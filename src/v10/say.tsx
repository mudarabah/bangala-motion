// Turns a range of transcript words into a timed on-screen line, so every word on screen
// is the spoken word and appears exactly when it is said.
import React from "react";
import { MixLine, type MixSpec } from "../v5/parts";
import { W, WORDS } from "./timeline";

// Start time (s) of transcript word i.
export const t = (i: number) => W[i];

// How a few spoken tokens are written on screen ("" hides a token merged into the one before it).
const DISPLAY: Record<number, string> = {
  0: "Ad",
  99: "Page",
  100: "View",
  104: "View",
  105: "Content",
  110: "Add",
  111: "to",
  112: "Cart",
  117: "Checkout",
  123: "Purchase",
  175: "content_ids",
  176: "",
  177: "",
  192: "Dynamic",
  193: "Ad",
  198: "Advantage+",
  199: "",
  201: "Ad",
  212: "Ad",
  219: "Ad",
  437: "SHA-256",
  438: "",
  568: "event_id",
  569: "",
  570: "",
};

// Bangla particles that attach to the Latin word before them ("Page" + "এ" → "Page-এ").
const PARTICLES = new Set(["এ", "এর", "কে", "তে", "ও", "এও", "দের", "টা", "টির"]);
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

const isLatin = (s: string) => /^[A-Za-z]/.test(s);
const clean = (s: string) => s.replace(/[।,?!]+$/u, "").replace(/[।,]/gu, "");
const cap = (s: string) => (s === s.toLowerCase() && isLatin(s) && s !== "iPhone" ? s[0].toUpperCase() + s.slice(1) : s);

// Words i0..i1 (inclusive) as MixLine specs. `hi` lists word indices to show in the keyword gradient.
export const say = (i0: number, i1: number, hi: number[] = []): MixSpec[] => {
  const out: MixSpec[] = [];
  for (let i = i0; i <= i1; i++) {
    let text = DISPLAY[i] ?? clean(WORDS[i]);
    if (text === "") continue;
    const tail = clean(WORDS[i]) !== WORDS[i] && /[?]$/.test(WORDS[i]) ? "?" : "";
    if (/^\d+$/.test(text)) text = text.replace(/\d/g, (d) => BN_DIGITS[+d]);
    const latin = isLatin(text);
    if (latin && DISPLAY[i] === undefined) text = cap(text);
    // glue a following particle onto a Latin word
    const next = i + 1 <= i1 ? clean(WORDS[i + 1]) : "";
    if (latin && PARTICLES.has(next) && DISPLAY[i + 1] === undefined) {
      out.push([`${text}|-${next}`, W[i], hi.includes(i) || hi.includes(i + 1), true]);
      i++;
      continue;
    }
    out.push([text + tail, W[i], hi.includes(i), latin]);
  }
  return out;
};

// A spoken line on screen.
export const Say: React.FC<{ from: number; to: number; hi?: number[]; size?: number; align?: "left" | "center"; style?: React.CSSProperties }> = ({
  from,
  to,
  hi = [],
  size = 64,
  align = "center",
  style,
}) => <MixLine align={align} size={size} style={style} words={say(from, to, hi)} />;
