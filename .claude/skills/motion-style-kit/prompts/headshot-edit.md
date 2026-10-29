# Prompt: edit a talking-head video (paste into the agent, fill the blanks)

```
Use the motion-style-kit skill, style: headshot-lavender, workflow: reference/headshot-workflow.md.
Start from templates/headshot-project/.

Source video: public/source.mp4  (the full video, not pieces)
Transcript: public/transcript.json  (ElevenLabs word-level export; this is the exact wording)
B-roll / screenshots: public/broll/ (list or "none"), public/screens/ (list or "none")
Brand: <course/brand name, logo file in public/, or "none">
CTA: <button text, link or price>
Leave untouched: <time ranges, or "none">
Audience & goal: <who watches, what they should do at the end>

Rules:
- Same resolution and fps as the source; output length = source length.
- On-screen language Bangla (English allowed for brand/tech terms). Never change the words.
- Never transcribe; check my transcript against the audio with scripts/check-sync.mjs and tell me if it drifts.
- Hide every jump cut in my footage.
- Never render until I say "render".

Step 1: setup + timing check + jump-cut list + chapter table, then stop.
Step 2 (after my OK): scene plan with exact on-screen text and one NEEDS list, then stop.
Step 3 (after my OK): build the hook, show stills and the Studio link, then stop.
```
