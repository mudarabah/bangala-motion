// All timing for the milestone-offer store ad (2026-11-16, fifth voice), in seconds.
// W[i] is the START time of transcript word i (public/transcript-2026-11-16e.json); the word is in the comment.
// Scenes start at a word index. To fix sync, change one number here. Do not guess times.

export const W: number[] = [
  0.22, // 0 "নতুন"
  0.58, // 1 "customer"
  1.06, // 2 "আনতে"
  1.66, // 3 "ad-e"
  2.00, // 4 "টাকা"
  2.34, // 5 "লাগে।"
  3.14, // 6 "কিন্তু"
  3.40, // 7 "যিনি"
  3.74, // 8 "এসেই"
  4.06, // 9 "গেছেন,"
  4.76, // 10 "তিনি"
  5.10, // 11 "একটার"
  5.46, // 12 "জায়গায়"
  5.86, // 13 "দুটো"
  6.18, // 14 "কিনলে"
  6.84, // 15 "বাড়তি"
  7.20, // 16 "খরচ"
  7.56, // 17 "প্রায়"
  7.88, // 18 "নেই।"
  9.46, // 19 "Inbox-e"
  10.30, // 20 "এটা"
  10.50, // 21 "করা"
  10.78, // 22 "কঠিন।"
  11.88, // 23 "Website-e"
  12.72, // 24 "এটা"
  12.94, // 25 "নিজে"
  13.18, // 26 "থেকেই"
  13.50, // 27 "হয়।"
  14.46, // 28 "Mudharabah"
  15.10, // 29 "Trade"
  15.36, // 30 "Limited-er"
  15.94, // 31 "website-e"
  17.22, // 32 "milestone"
  17.80, // 33 "bar,"
  18.54, // 34 "আর"
  18.82, // 35 "200"
  19.00, // 36 "টাকা"
  19.26, // 37 "কিনলেই"
  19.66, // 38 "offer।"
  20.48, // 39 "Customer"
  20.98, // 40 "নিজেই"
  21.32, // 41 "cart-e"
  21.60, // 42 "যোগ"
  21.80, // 43 "করেন।"
  22.84, // 44 "Discount"
  23.46, // 45 "আর"
  23.64, // 46 "campaign"
  24.10, // 47 "set"
  24.34, // 48 "করুন"
  24.72, // 49 "নিজের"
  25.06, // 50 "মতো।"
  25.80, // 51 "Minimum"
  26.26, // 52 "order-o"
  26.62, // 53 "ঠিক"
  26.82, // 54 "করে"
  27.02, // 55 "দিন।"
  27.86, // 56 "আর"
  28.10, // 57 "বিক্রিতে"
  28.88, // 58 "কোনো"
  29.16, // 59 "commission"
  29.62, // 60 "নেই।"
  30.36, // 61 "আজই"
  30.60, // 62 "নিজের"
  30.90, // 63 "website"
  31.30, // 64 "শুরু"
  31.52, // 65 "করুন।"
];

export const WORDS: string[] = ["নতুন","customer","আনতে","ad-e","টাকা","লাগে।","কিন্তু","যিনি","এসেই","গেছেন,","তিনি","একটার","জায়গায়","দুটো","কিনলে","বাড়তি","খরচ","প্রায়","নেই।","Inbox-e","এটা","করা","কঠিন।","Website-e","এটা","নিজে","থেকেই","হয়।","Mudharabah","Trade","Limited-er","website-e","milestone","bar,","আর","200","টাকা","কিনলেই","offer।","Customer","নিজেই","cart-e","যোগ","করেন।","Discount","আর","campaign","set","করুন","নিজের","মতো।","Minimum","order-o","ঠিক","করে","দিন।","আর","বিক্রিতে","কোনো","commission","নেই।","আজই","নিজের","website","শুরু","করুন।"];

export const SCENE_START = {
  "hook": 0,
  "more": 6,
  "inbox": 19,
  "site": 23,
  "brand": 28,
  "bar": 32,
  "cart": 39,
  "discount": 44,
  "minimum": 51,
  "nocom": 56,
  "cta": 61
} as const;

export type SceneKey = keyof typeof SCENE_START;

export const audioDuration = 32.03; // ffprobe of public/voiceover-2026-11-16e.mp3
export const tail = 2;
