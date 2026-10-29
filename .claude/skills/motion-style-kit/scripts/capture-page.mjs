#!/usr/bin/env node
// Capture a web page for use inside phone/laptop mockups in Remotion.
// Usage: node capture-page.mjs <url> <outDir> [--mobile] [--desktop] [--full] [--dark]
// Default (no flags): mobile + desktop, viewport + full page.
// First run: npm i -D playwright && npx playwright install chromium

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const [, , url, outDir = "public/screens", ...flags] = process.argv;
if (!url) {
  console.error("Usage: node capture-page.mjs <url> <outDir> [--mobile] [--desktop] [--full] [--dark]");
  process.exit(1);
}

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright is missing. Run: npm i -D playwright && npx playwright install chromium");
  process.exit(1);
}

const wantMobile = flags.includes("--mobile") || !flags.some((f) => f === "--desktop" || f === "--mobile");
const wantDesktop = flags.includes("--desktop") || !flags.some((f) => f === "--desktop" || f === "--mobile");
const colorScheme = flags.includes("--dark") ? "dark" : "light";

const targets = [];
if (wantMobile) targets.push({ name: "mobile", viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
if (wantDesktop) targets.push({ name: "desktop", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const summary = { url, capturedAt: new Date().toISOString(), files: [] };

for (const t of targets) {
  const context = await browser.newContext({ ...t, colorScheme });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => page.goto(url, { waitUntil: "load" }));

  // Scroll through the page so lazy-loaded images and animations appear, then return to top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);

  // Hide common cookie banners / chat widgets (best effort).
  await page.addStyleTag({
    content: `[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i],iframe[src*="chat" i]{display:none!important}`,
  });

  const vp = path.join(outDir, `${t.name}.png`);
  await page.screenshot({ path: vp });
  summary.files.push(vp);
  const full = path.join(outDir, `${t.name}-full.png`);
  await page.screenshot({ path: full, fullPage: true });
  summary.files.push(full);

  if (t.name === (wantMobile ? "mobile" : "desktop")) {
    summary.content = await page.evaluate(() => {
      const txt = (sel) => [...document.querySelectorAll(sel)].map((e) => e.innerText.trim()).filter(Boolean).slice(0, 30);
      const bodyStyle = getComputedStyle(document.body);
      return {
        title: document.title,
        h1: txt("h1"),
        h2: txt("h2"),
        h3: txt("h3"),
        buttons: txt("button, a[class*='btn' i], a[class*='button' i]"),
        bodyFont: bodyStyle.fontFamily,
        bodyBackground: bodyStyle.backgroundColor,
        bodyColor: bodyStyle.color,
      };
    });
  }
  await context.close();
}

await browser.close();
await writeFile(path.join(outDir, "content.json"), JSON.stringify(summary, null, 2));
console.log("Saved:\n" + summary.files.join("\n") + `\n${path.join(outDir, "content.json")}`);
