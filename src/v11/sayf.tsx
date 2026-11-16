// Turns a range of transcript words into a timed on-screen line, so every word on screen is the
// spoken word and appears exactly when it is said. One instance per part (each has its own transcript).
import React from "react";
import { MixLine, type MixSpec } from "../v5/parts";

// Bangla particles that attach to the Latin word before them ("Page" + "এ" → "Page-এ").
const PARTICLES = new Set(["এ", "এর", "কে", "তে", "ও", "এও", "দের", "টা", "টির", "ই", "কেই"]);
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const isLatin = (s: string) => /^[A-Za-z]/.test(s);
const clean = (s: string) => s.replace(/[।,?!]+$/u, "").replace(/[।,]/gu, "");
const cap = (s: string) => (s === s.toLowerCase() && isLatin(s) ? s[0].toUpperCase() + s.slice(1) : s);

export type SayProps = { from: number; to: number; hi?: number[]; size?: number; align?: "left" | "center"; style?: React.CSSProperties };

// `display` rewrites a few tokens on screen ("" hides a token, e.g. a sound tag or a merged word).
export const makeSay = (W: number[], WORDS: string[], display: Record<number, string>) => {
  const t = (i: number) => W[i];
  const say = (i0: number, i1: number, hi: number[] = []): MixSpec[] => {
    const out: MixSpec[] = [];
    for (let i = i0; i <= i1; i++) {
      let text = display[i] ?? clean(WORDS[i]);
      if (text === "") continue;
      const q = /[?]$/.test(WORDS[i]) && display[i] === undefined ? "?" : "";
      if (/^[\d.,]+$/.test(text)) text = text.replace(/\d/g, (d) => BN_DIGITS[+d]);
      const latin = isLatin(text);
      if (latin && display[i] === undefined) text = cap(text);
      // a Latin word with a Bangla ending in one token ("Pixelে", "Adও") → "Pixel|-এ", "Ad|-ও"
      const mixed = latin && display[i] === undefined ? text.match(/^([A-Za-z0-9.\-]+)([\u0980-\u09FF]+)$/) : null;
      if (mixed) {
        const suffix = mixed[2].replace(/^ে/, "এ").replace(/^া/, "আ").replace(/^ি/, "ই");
        out.push([`${mixed[1]}|-${suffix}`, W[i], hi.includes(i), true]);
        continue;
      }
      const next = i + 1 <= i1 ? clean(WORDS[i + 1]) : "";
      if (latin && PARTICLES.has(next) && display[i + 1] === undefined) {
        out.push([`${text}|-${next}`, W[i], hi.includes(i) || hi.includes(i + 1), true]);
        i++;
        continue;
      }
      out.push([text + q, W[i], hi.includes(i), latin]);
    }
    return out;
  };
  const Say: React.FC<SayProps> = ({ from, to, hi = [], size = 64, align = "center", style }) => (
    <MixLine align={align} size={size} style={style} words={say(from, to, hi)} />
  );
  return { t, say, Say };
};
