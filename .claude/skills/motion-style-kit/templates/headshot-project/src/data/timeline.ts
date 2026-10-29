// Every timing in the edit, in SECONDS, taken from public/transcript.json —
// the ElevenLabs (Scribe) word-level transcript. Word *start* times are used
// (Scribe stretches a sentence's last word over the following pause).
// To fix sync, change a number here — frames are derived from FPS.
import { FPS } from "../constants";

export const toFrame = (sec: number) => Math.round(sec * FPS);

export const SWEEP_FRAMES = 20; // AI scan line duration (S2)

export const T = {
  // S1 — "এখন আপনি এই যে headshot video দেখতেছেন, এটা কিন্তু আমি একটা camera দিয়ে record করেছিলাম।"
  camera: {
    start: 0,
    headshot: 1.06, // "headshot" — focus box locks onto the head
    watching: 1.9, // "দেখতেছেন" — focus confirmed
    release: 2.48, // "এটা" — box opens back out, camera specs slide in
    camera: 3.5, // "camera"
    record: 4.019, // "record"
    end: 4.94,
  },
  // S2 — "কিন্তু videoটা edit করা হয়েছে AI দিয়ে।"
  ai: {
    start: 4.94, // "কিন্তু" — AI scan sweep, punch-in
    words: [5.18, 5.66, 5.92, 6.12], // videoটা · edit · করা · হয়েছে
    hero: 6.66, // "AI"
    exit: 7.85, // hero holds ~1.2 s (through "আপনার নিজের"), leaves just before "product"
    end: 7.9,
  },
  // S3 — "আপনার নিজের product promotion অথবা আপনার client দেয়া … এগুলোও আপনি AI দিয়ে editing করতে পারবেন।" (card frame)
  useCases: {
    start: 7.85,
    product: 7.94, // "product"
    or: 8.96, // "অথবা"
    client: 9.8, // "client"
    ai: 13.06, // "AI (দিয়ে editing)"
    exit: 14.6, // pause 14.44–14.69
    end: 14.76,
  },
  // S4 — "YouTube সার্চ করলে আপনি হয়তো ফ্রিতেই অনেক content পেয়ে যাবেন। কিন্তু advanced বিষয় এবং secrets গুলো কেউ আপনাকে দিবে না।" (PIP)
  search: {
    start: 14.6, // source cut 14.60; window lands on "YouTube" (14.76)
    typing: 15.1, // "সার্চ"
    click: 15.74, // "আপনি"
    results: 16.219, // "ফ্রিতেই"
    exit: 18.2, // world clears as the speaker comes back full frame at "কিন্তু"
    end: 18.3,
  },
  // S4b — the turn, back on the speaker: "কিন্তু advanced বিষয় এবং secrets গুলো কেউ আপনাকে দিবে না।"
  secrets: {
    start: 17.98, // "কিন্তু" — footage returns to full frame
    vault: 18.46, // "advanced"
    secrets: 19.58, // "secrets"
    nobody: 20.4, // "কেউ" — punch-in, lock turns red
    exit: 21.62, // holds into the pause
    end: 21.7,
  },
  // S5a — "এই course আমরা দেখিয়েছি"
  courseIntro: {
    start: 21.54,
    words: [22.12, 22.32], // আমরা · দেখিয়েছি
    exit: 22.85,
    end: 22.9,
  },
  // S5b — "AI দিয়ে আপনি যে voiceover generate করবেন সেটাতে কিভাবে emotion যুক্ত করতে হয়,
  // কিভাবে JSON prompt ব্যবহার করার মাধ্যমে আপনার editing skillটাকে next level নিয়ে যেতে পারেন।" (card frame)
  course: {
    start: 22.88, // source cut 22.88 (just before "AI দিয়ে আপনি যে voiceover…")
    voiceover: 24.04, // "voiceover"
    emotion: 26.32, // "emotion"
    json: 28.14, // "JSON"
    skill: 30.24, // "editing (skillটাকে)"
    level: 31.14, // "next (level)"
    exit: 32.56, // source cut 32.56
    end: 32.8,
  },
  // S6 — "After Effects মধ্যে যেসব কাজ ঘণ্টার পর ঘণ্টা … সেটা AI দিয়েই জাস্ট কয়েক মিনিটেই করে ফেলতে পারবেন।" (PIP)
  ae: {
    start: 32.8, // "After Effects"
    hours: 34.42, // "ঘণ্টার"
    ai: 37.46, // "AI"
    minutes: 38.4, // "কয়েক"
    exit: 39.96, // source cut 39.96
    end: 40.08,
  },
  // S7 — "কয়েকদিন আগেও … course টা আমরা ফ্রিতে দিয়েছিলাম। এখন কিন্তু এটা paid করা হয়েছে অনেক advanced বিষয় যুক্ত করার কারণে।"
  paid: {
    start: 40.08, // "কয়েকদিন আগেও"
    free: 41.88, // "ফ্রিতে"
    paid: 43.6, // "paid"
    advanced: 44.48, // "অনেক (advanced বিষয়)"
    exit: 46.3, // pause 46.25–46.40
    end: 46.46,
  },
  // S8 — "এটার দাম … মাত্র নয়শ পঞ্চাশ টাকা। কিন্তু আপনি যদি আজকে order করেন তাহলে আপনি একটা special offer মাত্র
  // একশ নব্বই টাকার মধ্যেই কিন্তু পেয়ে যাচ্ছেন। এজন্য কিন্তু আপনাকে আজকেই enroll করতে হবে। এরপরে offer নাও পেতে পারেন।" (card frame)
  offer: {
    start: 46.46, // "এটার দাম"
    price950: 48.12, // "নয়শ (পঞ্চাশ টাকা)"
    order: 50.36, // "আজকে (order করেন)"
    special: 52.44, // "special"
    price190: 53.7, // "একশ (নব্বই টাকার)"
    exit: 55.8, // source cut 55.80: card clears as the speaker comes back full frame
    end: 56.0,
  },
  // S9 — the call to action, on the speaker full frame:
  // "এজন্য কিন্তু আপনাকে আজকেই enroll করতে হবে। এরপরে offer নাও পেতে পারেন।"
  cta: {
    start: 55.96, // "এজন্য"
    enroll: 56.86, // "আজকেই (enroll)" — punch-in, button
    click: 57.3, // "enroll"
    urgency: 58.22, // "এরপরে offer নাও পেতে পারেন।"
    end: 59.86,
  },
} as const;

// Jump cuts inside public/source.mp4 (pauses trimmed out before editing),
// found with scene detection. Each one is hidden: a framing move lands on it,
// or the zoom changes exactly on it ("punch cut", `cut: true`).
export const SOURCE_CUTS = [4.8, 7.2, 14.6, 21.36, 22.88, 27.56, 32.56, 39.96, 42.8, 46.32, 55.8, 58.04] as const;

// Framing keyframes: from `at` the footage moves to `mode` (12-frame spring),
// or switches instantly when `cut` is set (on a source jump cut).
export type FramingMode = "full" | "punch" | "tight" | "card" | "cardTight" | "pip";
export const FRAMING: readonly { at: number; mode: FramingMode; cut?: boolean }[] = [
  { at: 0, mode: "full" },
  // Punch cuts alternate wide (1.0) ↔ tight (1.16): a 16% change reads as a deliberate edit.
  { at: 4.8, mode: "tight", cut: true }, // cut, just before "কিন্তু"
  { at: 7.2, mode: "full", cut: true }, // cut, on "AI দিয়ে"
  { at: T.useCases.start, mode: "card" },
  { at: 14.6, mode: "pip" }, // cut
  { at: T.secrets.start, mode: "full" }, // the turn: back to the speaker
  { at: T.secrets.nobody, mode: "tight" }, // eases in on "কেউ"
  { at: 21.36, mode: "full", cut: true }, // cut
  { at: 22.88, mode: "card" }, // cut
  { at: 27.56, mode: "cardTight", cut: true }, // cut, inside the card
  { at: 32.56, mode: "pip" }, // cut
  { at: 39.96, mode: "full" }, // cut
  { at: 42.8, mode: "tight", cut: true }, // cut, on "এখন কিন্তু এটা paid"
  { at: 46.32, mode: "card" }, // cut
  { at: 55.8, mode: "full" }, // cut: the CTA, speaker full frame
  { at: 58.04, mode: "tight", cut: true }, // cut, on "এরপরে offer নাও পেতে পারেন"
];

const ZOOMS: FramingMode[] = ["punch", "tight"];
// Framing changes that are real moves (get a light sweep + whoosh): not cuts,
// not zooms, not a zoom easing back to full.
export const FRAMING_MOVES = FRAMING.filter(
  (f, i) => i > 0 && !f.cut && !ZOOMS.includes(f.mode) && !(f.mode === "full" && ZOOMS.includes(FRAMING[i - 1].mode)),
);
