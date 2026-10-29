# Production workflow (with review gates)

Stop at every **GATE** and wait for the user's approval.

## 0. Inputs
- Final Bangla script (the true text; never reword it).
- Voiceover file in `public/voiceover.mp3` (or .wav).
- Style name (default: lavender-glass) and format (9:16 or 16:9).
- Optional: line timestamps from the user, URLs or screenshots to show, logo files.

## 1. Setup
- Confirm a Remotion project exists; `npm install`; install matching `@remotion/google-fonts`, `@remotion/transitions`, `@remotion/media-utils`, and `lucide-react`.
- Copy `templates/theme.<style>.ts` to `src/theme.ts`.
- Create/append the project `CLAUDE.md` with: style name, format, safe zones, the style's Do/Don't, and "timing lives in src/data/timeline.ts".
- Commit a git checkpoint.

## 2. Timing
- Preferred: user gives start times per line → write `src/data/timeline.ts`.
- Fallback: detect pauses with ffmpeg `silencedetect` and map them to script sentences; transcription (multilingual Whisper) only if needed.
- Each entry: `{ id, start, end, text, keywords[] }` in frames.
- Duration of the composition = audio length + 1 s.

## 3. Scene plan → GATE
- Map each line to a pattern from `reference/scene-patterns.md`.
- Show a table: scene | time | line | pattern | on-screen elements | key motion.

## 4. Style frames → GATE
- Build shared components first (Background, GlassCard, Keyword/WordBlurIn, IconTile, PillButton, PhoneFrame, LaptopFrame).
- Build the hook scene and the most important proof scene only. Open Remotion Studio. User reviews look and feel.

## 5. Remaining scenes (batches of 3–4) → GATE after each batch
- Commit a checkpoint after each approved batch.

## 6. Polish
- Step through every scene: sync to voice, Bangla rendering, safe zones, overflow, one focal point per moment, transitions.

## 7. Render
- `npx remotion render AdReel out/<name>.mp4` (H.264). Report the command and output path.
- User checks on a real phone.

## 8. Variants (optional)
- 15–20 s cut-down, alternative hooks, 16:9 version, captions version.
