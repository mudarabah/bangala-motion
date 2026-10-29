#!/usr/bin/env node
// Find glitches in a rendered frame sequence (from qa-frames.cjs):
//  FLASH — one frame differs from both neighbours while they match each other
//          (a blink: something popping in/out for a single frame).
//  JUMP  — a change far bigger than the motion around it (a cut). Expected on
//          purpose-made punch cuts and the first frames of fast moves; anything
//          else is a glitch — often a jump cut inside the source footage.
// Compare JUMP times with scripts/detect-cuts.sh output and with FRAMING in timeline.ts.
//
// Usage: node qa-glitch.mjs <frames-dir> [fps=25]
// Needs ffmpeg. Frames are read in name order (element-0000.jpeg …).
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import path from "node:path";

const [dir, fpsArg = "25"] = process.argv.slice(2);
if (!dir) {
  console.error("Usage: node qa-glitch.mjs <frames-dir> [fps]");
  process.exit(1);
}
const fps = +fpsArg;
const first = readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()[0];
const m = first.match(/^(.*?)(\d+)(\.\w+)$/);
const pattern = path.join(dir, `${m[1]}%0${m[2].length}d${m[3]}`);
const W = 108;
const H = 135;
const buf = execFileSync("ffmpeg", ["-v", "error", "-start_number", String(+m[2]), "-i", pattern, "-vf", `scale=${W}:${H},format=gray`, "-f", "rawvideo", "-"], {
  maxBuffer: 1 << 30,
});
const N = Math.floor(buf.length / (W * H));
const fr = (i) => buf.subarray(i * W * H, (i + 1) * W * H);
const diff = (a, b) => {
  let s = 0;
  const A = fr(a);
  const B = fr(b);
  for (let k = 0; k < A.length; k++) s += Math.abs(A[k] - B[k]);
  return s / A.length;
};
const d1 = Array.from({ length: N }, (_, i) => (i ? diff(i - 1, i) : 0));
let found = 0;
for (let i = 1; i < N - 1; i++) {
  const flash = Math.min(d1[i], d1[i + 1]) - diff(i - 1, i + 1);
  const local = [d1[i - 3], d1[i - 2], d1[i + 2], d1[i + 3]].filter((x) => x !== undefined).sort((a, b) => a - b);
  const med = local[Math.floor(local.length / 2)] || 0;
  const jump = d1[i] - Math.max(med * 2.5, med + 4);
  const t = (i / fps).toFixed(2);
  if (flash > 2.5) {
    console.log(`FLASH  ${t}s  frame ${i}  score ${flash.toFixed(1)}`);
    found++;
  } else if (jump > 4) {
    console.log(`JUMP   ${t}s  frame ${i}  change ${d1[i].toFixed(1)} vs ~${med.toFixed(1)} around it`);
    found++;
  }
}
console.log(`\n${N} frames checked, ${found} flagged.`);
