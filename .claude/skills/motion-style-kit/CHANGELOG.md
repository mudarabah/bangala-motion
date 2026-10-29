# Changelog

Add an entry after every project that taught the kit something. Bump the version in SKILL.md's title.

## v2 — 2026-10-16 (from the 60 s AI-editing course ad, 4:5)
**Added**
- `templates/headshot-project/`: complete working Remotion project (framing engine with full / punch /
  tight / card / cardTight / pip and instant cuts, robot mascot, AI chip, camera HUD + raw→AI scan,
  platform search world, vault turn, course panels, AE timeline collapse, ticket + stamp, offer card,
  full-frame CTA, sound design, ambient layers).
- `reference/transcripts.md`: which transcript sources give real timings (ElevenLabs Scribe yes, chat
  models no), reading Scribe exports, checking timings against audio.
- `reference/sound-design.md`: cue map and levels.
- `reference/qa-and-troubleshooting.md`: glitch causes/fixes, QA routine, environment fixes, render settings.
- Scripts: `detect-cuts.sh`, `check-sync.mjs`, `transcript-words.mjs`, `make-proxy.sh`, `get-sfx.sh`,
  `qa-frames.cjs`, `qa-glitch.mjs`.
- Prompts: updated `headshot-edit.md`; new `polish.md`.
- 4:5 canvas; story rhythm with the speaker full frame at the turn and CTA; readable-time rule.

**Changed**
- Text depth: single crisp fill + soft diffuse shadow replaces the stacked emboss (it read as "double text").
- No backdrop-filter on animated glass (it blinks).
- Punch cuts must change zoom ≥ 15%.
- Workflow now: timing check + jump-cut detection before planning; frame-level QA before every review.

## v1
Initial kit: lavender-glass and headshot-lavender styles, workflows, scene patterns, page capture,
frame extraction, prompts.
