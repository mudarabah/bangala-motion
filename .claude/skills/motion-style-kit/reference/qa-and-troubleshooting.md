# QA and troubleshooting

## QA routine (before showing anything)
1. `npx tsc --noEmit`.
2. Stills: render the key moments with `renderStill` (scale 0.2–0.25) and tile them with ffmpeg `xstack`
   into a contact sheet. Read every word; check conjuncts, overlaps, face coverage, word fit inside cards.
3. Half-resolution crop of hero text to judge real sharpness (thumbnails exaggerate muddiness).
4. Glitch scan of the whole timeline:
   `node scripts/qa-frames.cjs <project> <scratch>/frames` → `node scripts/qa-glitch.mjs <scratch>/frames <fps>`.
   - FLASH = something appears/disappears for one frame → always a bug.
   - JUMP = cut-like change → fine only if it is a planned punch cut or the first frames of a move;
     otherwise compare with `scripts/detect-cuts.sh` (source jump cut) and fix.
5. Rendering stills/frames for QA into a scratch folder is a check, not "rendering the video" — still,
   never write to `out/` unless the user said "render".

## Glitches and their causes
| Symptom | Cause | Fix |
|---|---|---|
| Head/hands jump at random moments | **Jump cuts already in the source** (pauses trimmed earlier) | `detect-cuts.sh`; land a framing move on each, or a `cut: true` punch cut with ≥15% zoom change |
| A small punch cut still looks like a glitch | Zoom change too small (8%) | Use wide 1.0 ↔ tight 1.16 |
| Glass panel "blinks" when it finishes entering or starts leaving | `backdrop-filter` turns off while an ancestor animates `filter`/`opacity` | Don't use backdrop-filter on animated elements; use opaque-enough fills |
| Bright band pops in on transitions | Light sweep starts inside the frame | Start off-screen and fade in/out |
| Particle vanishes at the top edge | Wrap point inside the frame | Wrap well outside (e.g. −400 / height + 300) |
| Colour snaps (lock turns red, timer turns green) | Ternary on progress > 0.5 | `interpolateColors` |
| Snap when the camera push restarts | Push resets at each framing keyframe | Blend from the previous segment's end value (template does this) |
| Studio playback stutters / freezes / "jumps" | Heavy source in the browser; media mounting late | Preview proxy (`make-proxy.sh`); `premountFor={fps}` on every video/audio sequence |
| One-frame blank inside a clip card | Clip ran out before the card left | Slower `playbackRate` or `usableSec` loop with dissolve |
| Text looks doubled / blurry | Stacked offset shadows / dark extrusion under coloured text | Single fill + soft diffuse shadow (style §6) |
| Hero barely readable | On screen < 1 s | Hold it over the next words |
| Animation ahead of the voice | Transcript timestamps estimated | `check-sync.mjs`; get a measured transcript |

## Environment problems
- **Headless Chrome crashes ("Target closed") / "icudtl.dat not found"** when the project path has odd
  characters (e.g. a double space "Headshop  Video Editing"): copy Chrome to a path without spaces and
  point Remotion at it — `cp -R node_modules/.remotion/chrome-headless-shell/<platform>/chrome-headless-shell-<platform> ~/.remotion-chrome/`
  then `Config.setBrowserExecutable(<copy>/chrome-headless-shell)` in `remotion.config.ts` (the template
  does this automatically when `~/.remotion-chrome` exists). A symlink does not work. Or rename the folder.
- Download of Chrome interrupted → delete `node_modules/.remotion/chrome-headless-shell` and run
  `npx remotion browser ensure`.
- Large media (source, proxy, clips) stays out of git: ignore `public/**/*.mp4|mov|wav|m4a`, but keep small SFX tracked.

## Render settings
| Goal | Command |
|---|---|
| Review copy | `npx remotion render Edit out/review.mp4 --codec=h264 --crf=23 --scale=0.5` |
| Standard | `npx remotion render Edit out/final.mp4 --codec=h264 --crf=18` |
| Maximum quality (social-safe) | `--codec=h264 --crf=10 --image-format=png --x264-preset=slow --audio-bitrate=320k --color-space=bt709 --pixel-format=yuv420p` |
| Editing master | `--codec=prores --prores-profile=hq` (very large files) |
Renders always use the original `source.mp4`, never the proxy.
