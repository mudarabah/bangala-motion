# Headshot (talking-head) editing workflow — v2

Use with `styles/headshot-lavender.md` and `templates/headshot-project/`. Stop at every **GATE** and
wait for the user. Scripts are in `<kit>/scripts/`.

## 0. Set up (once per project)
1. Copy `templates/headshot-project/` into the user's project folder (or into an empty folder, then `npm install`).
   Keep every `remotion` / `@remotion/*` package on one exact version.
2. Put the full source video at `public/source.mp4` (never ask the user to trim it).
3. `ffprobe` it; set `WIDTH`, `HEIGHT`, `FPS` in `src/constants.ts` to match. Output length = source length.
4. `bash scripts/make-proxy.sh public/source.mp4` — Studio previews the light proxy; renders use the original.
5. `bash scripts/get-sfx.sh public/sfx`.
6. `bash scripts/extract-frames.sh public/source.mp4 <scratch>` — find where the face sits; adjust `FACE`
   in `src/components/Footage.tsx` and the `HEAD` box in `CameraScene.tsx` if the framing differs.
7. `git init` + first commit, so every later experiment can be undone.

## 1. Timing (before any design) → see `reference/transcripts.md`
1. Get a **word-level** transcript (ElevenLabs Scribe recommended for Bangla). If the user gives
   several versions, compare them: `node scripts/check-sync.mjs public/source.mp4 a.json b.json`.
   Pick the one with the lowest median error; tell the user which and why.
2. Save it readable: `node scripts/transcript-words.mjs <file> --out public/transcript.json`
   (this also prints every word with its start time).
3. **Jump cuts in the source**: `bash scripts/detect-cuts.sh public/source.mp4`. List them; each
   one must be hidden in step 4.

## 2. Read and chapter → GATE
Chapter table: # | time range | one-line idea | beat (hook / promise / problem / turn / evidence / offer / CTA).
Mark ranges the user wants untouched.

## 3. Scene plan → GATE
For every chapter: time | spoken line (verbatim, trimmed) | framing (full / tight / card / pip) |
what animates (the visual metaphor, not just text) | exact on-screen text (≤7 words) | asset or NEEDS.
- Reuse the template's scenes and elements where the idea fits; invent new metaphors where it doesn't.
- Plan the speaker **full frame** for the hook, the turn and the CTA.
- One NEEDS list at the end (missing footage, logo, thumbnail, music), each with a fallback.

## 4. Build
- **Timeline**: write `src/data/timeline.ts` — every cue is a word **start** time (seconds) with the
  word in a comment. Give heroes ≥ 1 s and 4-word lines ≥ 1.2 s; if speech is faster, hold the
  graphic over the next words.
- **Framing**: write `FRAMING`. For each source jump cut, either move a planned framing change onto it,
  or add a `cut: true` punch cut that changes zoom ≥ 15% (full 1.0 ↔ tight 1.16; card ↔ cardTight).
  Record the list in `SOURCE_CUTS`.
- **Scenes**: overlays on the footage (`src/scenes/*Scene.tsx`) or worlds behind it (`*World.tsx`),
  each in a `<Sequence>` from `Video.tsx`; every media/audio sequence gets `premountFor={fps}`.
- **Clips**: user B-roll goes in `ClipThumb` (muted; `usableSec` if the clip has dead frames).
- **Sound**: add cues in `src/components/SoundDesign.tsx` (see `reference/sound-design.md`).
- Build the hook first → show stills → **GATE** (style frame). Then the rest in 2–3 batches, a gate each.
  Commit after each gate.

## 5. QA before every "have a look" → see `reference/qa-and-troubleshooting.md`
1. `npx tsc --noEmit`.
2. Stills at every key word (renderStill at scale 0.2–0.25) as contact sheets; read every on-screen word,
   check Bangla conjuncts, check nothing covers eyes/mouth.
3. Whole-timeline glitch scan: `node scripts/qa-frames.cjs . <scratch>/frames` then
   `node scripts/qa-glitch.mjs <scratch>/frames <fps>`. Every JUMP must be a planned punch cut or the
   first frames of a move; every FLASH is a bug.
4. Tell the user what to watch for in Studio (link `http://localhost:3000/Edit`, port may differ).

## 6. Revise
Apply the user's notes, keep Studio running, re-run QA for touched scenes. For big experiments use a
git branch so "go back" is one command (`git checkout main`).

## 7. Render (only when the user says "render")
- Standard: `npx remotion render Edit out/final.mp4 --codec=h264 --crf=18`.
- Maximum quality: `npm run render:max` (H.264 CRF 10, PNG frames, x264 slow, 320 kbps audio, BT.709, yuv420p).
- After rendering: `ffprobe` size/duration/fps, and check the audio has the sound effects at their times.

## 8. Close the loop
Add what the user corrected to the kit (style rule, workflow step, troubleshooting entry) and log it in `CHANGELOG.md`.
