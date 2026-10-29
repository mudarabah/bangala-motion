---
name: motion-style-kit
description: House style system and production kit for premium Bangla motion-graphics videos in Remotion — talking-head (headshot) edits with motion graphics, ads, reels and explainers. Use it whenever someone wants to edit a talking-head/headshot video with animations, B-roll or text overlays from a transcript, build a Remotion ad/reel/explainer, apply or switch a saved visual style (headshot-lavender, lavender-glass), fix sync between animations and speech, hide glitches or jump cuts, add sound design, turn a reference video into a new style, or show a web page in a phone/laptop mockup — even if they only say "edit my video", "make it premium" or "After Effects vibe".
---

# Motion Style Kit (v2)

A reusable system for premium Bangla motion-graphics videos in Remotion. It separates
**what the video says** (footage, transcript, script — new every project) from **how it looks**
(a style file + a starter template — reused across projects), and carries the lessons from
real projects so each new edit starts at the quality the last one ended at.

## Folder map

| Path | What it is | Read it when |
|---|---|---|
| `styles/headshot-lavender.md` | Talking-head style: canvas sizes (9:16, 4:5, 16:9), type hierarchy, text depth, framing modes, element library, motion, story rhythm | Any headshot edit |
| `styles/lavender-glass.md` | Fully animated (no footage) ad/reel style | Ads/explainers without a speaker |
| `styles/_TEMPLATE.md` | Blank style for a new look | Job 2 |
| `templates/headshot-project/` | **Working Remotion project** (framing engine, robot, glass UI, sound design, 11 scenes) from a real 60 s Bangla course ad | Start of every headshot edit |
| `templates/theme.lavender-glass.ts` | Theme file for lavender-glass | Job 1 |
| `reference/headshot-workflow.md` | Step-by-step pipeline with gates, from inputs to final render | Job 1b, always |
| `reference/transcripts.md` | Getting reliable word timings (ElevenLabs vs Gemini vs SRT), checking them against the audio | Before writing any timing |
| `reference/sound-design.md` | Which sound on which moment, at what level | Build + polish |
| `reference/qa-and-troubleshooting.md` | Glitch/blink causes and fixes, QA commands, render settings, environment problems | Before showing the user anything, and when something looks wrong |
| `reference/scene-patterns.md` | Scene recipes per story beat (hook, problem, turn, offer, CTA…) | Planning |
| `reference/workflow.md` | Pipeline for fully animated videos | Job 1 |
| `scripts/` | `detect-cuts.sh`, `check-sync.mjs`, `transcript-words.mjs`, `make-proxy.sh`, `get-sfx.sh`, `qa-frames.cjs`, `qa-glitch.mjs`, `extract-frames.sh`, `capture-page.mjs` | As the workflow says |
| `prompts/` | Fill-in prompts users paste | Hand to the user |
| `CHANGELOG.md` | What changed between versions | Updating the kit |

## Job 1b: Edit a talking-head (headshot) video — the common job

Follow `reference/headshot-workflow.md`. The short version:

1. **Copy `templates/headshot-project/`** into the user's folder, set the canvas to the source's size and fps, run `scripts/get-sfx.sh` and `scripts/make-proxy.sh`. Don't rebuild the framing engine, glass UI or robot from scratch — they already solve problems that cost many review rounds.
2. **Timing first.** Get a word-level transcript (ElevenLabs Scribe is the reliable choice for Bangla; Gemini-style chat models guess timestamps and drift). Run `scripts/check-sync.mjs` on it. Write `src/data/timeline.ts` from word **start** times.
3. **Find jump cuts already in the footage** with `scripts/detect-cuts.sh` and plan to hide every one (a framing move lands on it, or a ≥15% punch cut).
4. **Plan → gate.** Chapter table, then a scene plan (time | spoken line | framing | what animates | exact on-screen text | asset or NEEDS). Ask for missing assets once.
5. **Build scene by scene**, reusing template components. Preview stills, not just code.
6. **QA before showing**: `scripts/qa-frames.cjs` + `scripts/qa-glitch.mjs`, stills at every key word, read every on-screen word in a still.
7. **Render only when the user says "render".**

## What makes these edits look premium (keep these even when improvising)

- **Story, not captions.** Each idea gets a visual metaphor (camera viewfinder → AI scan, search UI → locked vault, timeline clutter → one clean clip, free ticket → PAID stamp). Text is a keyword layer on top, never the whole idea.
- **One continuous shot of the speaker**, moved between framings (full, tight, card, corner circle). Shrinking the speaker reveals an animated "world" behind; bring them back full frame for the turn of the story and for the call to action.
- **Something is always moving**: slow camera push on the footage, drift on world scenes, floating light particles, light sweeps on framing changes. Calm springs, no bounce, shake or glitch effects.
- **Three text levels** with clean depth: crisp fill + soft diffuse shadow. Stacked offset shadows read as "double text" — don't use them.
- **Readable time**: a hero word stays ≥ 1 s fully visible; a 4-word line ≥ 1.2 s.
- **Sound design** under the voice (see `reference/sound-design.md`) — it carries half the "After Effects" feel.

## Job 1: Build a fully animated video (no speaker)

Follow `reference/workflow.md` with `styles/lavender-glass.md` and `templates/theme.lavender-glass.ts`.
The timing, text-depth, glass and QA lessons in `reference/` apply here too.

## Job 2: Create a new style from a reference video or images

1. `bash scripts/extract-frames.sh <video> <out-dir>`; look at every contact sheet.
2. Copy `styles/_TEMPLATE.md` to `styles/<new-name>.md`; fill every section from what you see (sample real pixel colours with a script).
3. Write `templates/theme.<new-name>.ts`, build a 10-second style test, refine until approved.
4. Extract the visual language, never the reference's logos, characters, brand names or exact layouts.

## Job 3: Show a web page (by URL) in the video

1. `node scripts/capture-page.mjs <url> <out-dir> [--mobile] [--desktop] [--full]` (needs Playwright).
2. Place screenshots in generic device frames; rebuild anything that must zoom or animate as a real component so text stays crisp.
3. Pages behind login, cookie walls or bot protection capture badly — ask for a manual screenshot. Only capture pages the user may show; otherwise build a generic look-alike with no real brand marks.

## Universal rules

- Bangla fonts via `@remotion/google-fonts` with the Bengali subset (Anek Bangla for headlines, Hind Siliguri for labels); check conjuncts (যুক্তাক্ষর) in a still at every size.
- Wording comes from the user's transcript or script; spelling style (Bangla vs Latin script for English words, digits vs words for numbers) may follow the style rules, but never change the words.
- All timing lives in `src/data/timeline.ts`, one number per cue, so sync fixes are one-line edits.
- No real third-party logos or brand UIs unless the user supplies the files; build generic look-alikes.
- All `remotion` / `@remotion/*` packages pinned to the same exact version.
- Keep the user able to go back: commit before big changes (a git branch per experiment works well).

## After every project: update the kit

The kit only gets better if each project feeds it. When an edit is finished, add what the user
corrected to the right file (style rule, workflow step, troubleshooting entry), promote any reusable
component into `templates/`, bump the version in `CHANGELOG.md`, and keep this file short —
details belong in `reference/`.
