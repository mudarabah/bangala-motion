#!/usr/bin/env node
// Read a word-level transcript and print every word with its START time, so
// timeline.ts can be written from it. Optionally save a readable copy.
//
// Understands:
//  - ElevenLabs Scribe export: { segments: [{ words: [{ text, start_time, end_time }] }] }
//    (spaces appear as separate " " entries; Bangla may be stored as এ… escapes)
//  - Simple format: { segments: [{ words: [{ word, start, end }] }] }
//  - SRT files (segment-level only).
//
// Usage: node transcript-words.mjs <transcript.json|.srt> [--out readable.json]
import { readFile, writeFile } from "node:fs/promises";

const [file, ...rest] = process.argv.slice(2);
if (!file) {
  console.error("Usage: node transcript-words.mjs <transcript.json|.srt> [--out readable.json]");
  process.exit(1);
}
const outIdx = rest.indexOf("--out");
const out = outIdx >= 0 ? rest[outIdx + 1] : undefined;
const raw = await readFile(file, "utf8");

const toSec = (s) => {
  const [h, m, rest2] = s.trim().split(":");
  const [sec, ms] = rest2.split(/[,.]/);
  return +h * 3600 + +m * 60 + +sec + +(ms || 0) / 1000;
};

let words = [];
if (file.toLowerCase().endsWith(".srt")) {
  for (const block of raw.split(/\r?\n\r?\n/)) {
    const lines = block.trim().split(/\r?\n/);
    const timeLine = lines.find((l) => l.includes("-->"));
    if (!timeLine) continue;
    const [a, b] = timeLine.split("-->");
    words.push({ text: lines.slice(lines.indexOf(timeLine) + 1).join(" "), start: toSec(a), end: toSec(b) });
  }
  console.log("SRT has segment times only. For word-level sync use a word-level transcript (see reference/transcripts.md).");
} else {
  const json = JSON.parse(raw); // decodes এ… escapes into real Bangla
  for (const seg of json.segments ?? []) {
    for (const w of seg.words ?? []) {
      const text = (w.text ?? w.word ?? "").trim();
      if (!text) continue;
      words.push({ text, start: w.start_time ?? w.start, end: w.end_time ?? w.end });
    }
  }
  if (out) {
    await writeFile(out, JSON.stringify(json, null, 2), "utf8");
    console.log(`Readable copy written: ${out}`);
  }
}

console.log(`${words.length} words, ${words[0]?.start}s → ${words.at(-1)?.end}s\n`);
let line = "";
for (const w of words) {
  const cell = `${w.start.toFixed(2).padStart(6)} ${w.text}`;
  if (line.length + cell.length > 110) {
    console.log(line);
    line = "";
  }
  line += cell + "   ";
  if (/[।.!?]$/.test(w.text)) {
    console.log(line + " ⏎");
    line = "";
  }
}
if (line) console.log(line);
console.log("\nUse START times for animation cues. Some tools stretch a sentence's last word over the pause after it.");
