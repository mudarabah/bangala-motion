#!/usr/bin/env node
// Render every frame of a composition as tiny JPEGs for automated QA
// (glitch detection with qa-glitch.mjs, contact sheets). This is a check, not
// the final render — it is small and fast (~5 min for 60 s of 4K-class video).
//
// Usage: node qa-frames.cjs <project-dir> <out-dir> [compositionId=Edit] [scale=0.1]
// Optional: REMOTION_CHROME=/path/to/chrome-headless-shell (see qa-and-troubleshooting.md)
const { createRequire } = require("module");
const path = require("path");
const [proj, out, id = "Edit", scale = "0.1"] = process.argv.slice(2);
if (!proj || !out) {
  console.error("Usage: node qa-frames.cjs <project-dir> <out-dir> [compositionId] [scale]");
  process.exit(1);
}
const req = createRequire(path.join(path.resolve(proj), "package.json"));
const { bundle } = req("@remotion/bundler");
const { selectComposition, renderFrames } = req("@remotion/renderer");
const browserExecutable = process.env.REMOTION_CHROME || null;
(async () => {
  const serveUrl = await bundle({ entryPoint: path.join(proj, "src/index.ts"), publicDir: path.join(proj, "public") });
  const composition = await selectComposition({ serveUrl, id, browserExecutable });
  const t0 = Date.now();
  await renderFrames({
    serveUrl,
    composition,
    outputDir: out,
    imageFormat: "jpeg",
    jpegQuality: 70,
    scale: +scale,
    browserExecutable,
    onStart: () => console.log(`Rendering ${composition.durationInFrames} frames at ${composition.fps} fps…`),
    onFrameUpdate: (n) => n % 250 === 0 && console.log(`  ${n} frames, ${Math.round((Date.now() - t0) / 1000)} s`),
  });
  console.log(`Done in ${Math.round((Date.now() - t0) / 1000)} s → ${out}`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
