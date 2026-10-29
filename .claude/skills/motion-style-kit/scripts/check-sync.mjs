#!/usr/bin/env node
// Check how well a transcript's word timings match the real audio — without
// transcribing anything. It measures loudness every 25 ms, finds the clear
// pauses, and checks that speech resumes on a word START from the transcript.
//
// Reading the result: the median error is the clearest signal. ≤ 0.10 s means
// the timings are trustworthy (ElevenLabs Scribe scored 0.09–0.10 s on a real
// Bangla ad). ≥ 0.15 s means the tool estimated the timestamps (common with
// general chat models like Gemini) — get a better transcript
// (reference/transcripts.md) before building anything. Pass several transcripts
// to compare them on the same audio.
//
// Usage: node check-sync.mjs <video-or-audio> <transcript.json> [more transcripts…]
// Needs ffmpeg. Transcript formats: see transcript-words.mjs.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const [media, ...transcripts] = process.argv.slice(2);
if (!media || !transcripts.length) {
  console.error("Usage: node check-sync.mjs <video> <transcript.json> [more…]");
  process.exit(1);
}

const probe = execFileSync("ffprobe", ["-v", "error", "-select_streams", "a:0", "-show_entries", "stream=sample_rate", "-of", "csv=p=0", media]).toString().trim();
const win = Math.round(+probe * 0.025);
const log = execFileSync(
  "ffmpeg",
  ["-hide_banner", "-i", media, "-vn", "-af", `asetnsamples=n=${win},astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level:file=-`, "-f", "null", "-"],
  { maxBuffer: 1 << 28, stdio: ["ignore", "pipe", "ignore"] },
).toString().split("\n");

const v = [];
for (let i = 0; i < log.length; i++) {
  const m = log[i].match(/pts_time:([\d.]+)/);
  if (m) {
    const r = (log[i + 1] || "").match(/RMS_level=(-?[\d.]+|-inf)/);
    v.push([+m[1], r && r[1] !== "-inf" ? +r[1] : -90]);
  }
}
// Room tone differs per video: call "quiet" anything below the 10th percentile + 3 dB.
const sorted = v.map((x) => x[1]).sort((a, b) => a - b);
const th = sorted[Math.floor(sorted.length * 0.1)] + 3;
const pauses = [];
let s = null;
for (const [t, db] of v) {
  if (db < th) s ??= t;
  else if (s !== null) {
    if (t - s >= 0.075) pauses.push([s, t]);
    s = null;
  }
}
console.log(`Audio: ${v.length} windows, quiet threshold ${th.toFixed(1)} dB, ${pauses.length} clear pauses`);
console.log(`Pauses: ${pauses.map(([a, b]) => `${a.toFixed(2)}–${b.toFixed(2)}`).join("  ")}\n`);

for (const f of transcripts) {
  const json = JSON.parse(readFileSync(f, "utf8"));
  const starts = (json.segments ?? [])
    .flatMap((x) => x.words ?? [])
    .filter((w) => (w.text ?? w.word ?? "").trim())
    .map((w) => w.start_time ?? w.start)
    .sort((a, b) => a - b);
  const errs = pauses.map(([, e]) => {
    const next = starts.find((t) => t >= e - 0.35);
    return { at: e, err: next === undefined ? 9 : next - e };
  });
  const good = errs.filter((x) => Math.abs(x.err) <= 0.15).length;
  const med = errs.map((x) => Math.abs(x.err)).sort((a, b) => a - b)[Math.floor(errs.length / 2)];
  console.log(`${f}\n  speech resumes on a word start (±0.15 s): ${good}/${errs.length} (${Math.round((good / errs.length) * 100)}%)   median error ${med.toFixed(2)} s`);
  const worst = [...errs].sort((a, b) => Math.abs(b.err) - Math.abs(a.err)).slice(0, 5);
  console.log(`  worst: ${worst.map((x) => `${x.at.toFixed(2)}s (${x.err > 0 ? "+" : ""}${x.err.toFixed(2)})`).join("  ")}\n`);
}
