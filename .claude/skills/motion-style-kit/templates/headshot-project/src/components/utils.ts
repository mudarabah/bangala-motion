const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export const toBangla = (n: number | string) => String(n).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

// Split text into grapheme clusters so Bangla conjuncts never appear half-typed.
const segmenter = new Intl.Segmenter("bn", { granularity: "grapheme" });
export const graphemes = (text: string) => Array.from(segmenter.segment(text), (s) => s.segment);

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
