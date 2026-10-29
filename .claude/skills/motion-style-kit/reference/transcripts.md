# Transcripts and timing

Animation sync is only as good as the word timings. Most "the animation doesn't match the speech"
complaints are transcript problems, not animation problems.

## Which source to trust
| Source | Word timings | Verdict |
|---|---|---|
| **ElevenLabs Scribe** (speech-to-text) | Measured from the audio, word level | Recommended for Bangla. On a real 60 s ad: median error 0.09–0.10 s |
| **Forced alignment** (audio + the exact script → word times; ElevenLabs offers this, as do WhisperX-style aligners) | Measured, and the wording is exactly the script | Best when the exact script exists |
| Whisper / WhisperX / Remotion's whisper.cpp | Measured | Fine for English; weaker Bangla wording and alignment |
| **Gemini / general chat models** | Estimated by the model | Unreliable: drifted 0.2–8 s on the same video, invented pauses, sometimes compressed the timeline. Use for wording ideas only, never for timing |
| SRT from a captioning tool | Segment level only | Usable for chapters; not precise enough for word-synced graphics |

Never transcribe yourself if the user's rules forbid it — but you can always *check* a transcript
against the audio (`scripts/check-sync.mjs`), which measures pauses and does not transcribe.

## Reading an ElevenLabs Scribe export
- Shape: `segments[].words[]` with `text`, `start_time`, `end_time`; spaces are separate `" "` entries.
- Bangla may appear as `এখন…` in a text editor. That is standard JSON escaping of
  Unicode — any JSON reader decodes it to "এখন". `scripts/transcript-words.mjs --out` saves a copy
  with real Bangla so people can read it.
- Scribe writes spoken English words in Latin script ("product promotion", "next level") and numbers as
  words ("নয়শ পঞ্চাশ টাকা"). On screen you may spell them in Bangla script / digits — same words, house
  spelling — but say so to the user.
- Scribe stretches the **last word of a sentence** over the pause after it. Use word **start** times
  for cues; never use a sentence-final word's end time as "speech ended".

## Checking timings against the audio
`node scripts/check-sync.mjs public/source.mp4 transcript-a.json transcript-b.json`
- Finds clear pauses (quiet = 10th-percentile loudness + 3 dB, ≥ 75 ms) and checks that speech resumes on a word start.
- Median error ≤ 0.10 s → trust it. ≥ 0.15 s → the timestamps were estimated; ask for a better transcript.
- The pauses it prints are also useful anchors: a scene or exit often lands well right after one.
- If the user insists on a transcript that fails the check, use it (it is their call) but name the exact
  moments to verify in Studio, and keep the previous version in git.

## Writing `timeline.ts`
- One object per scene, every value a word start in seconds with the word in a comment:
  `hero: 6.66, // "AI"`.
- `exit` = a little after the sentence ends (or the next scene's start); `end` ≥ `exit`.
- Readable time: heroes ≥ 1 s, 4-word lines ≥ 1.2 s; hold over the next words rather than flash.
- If part of the audio is missing from the transcript (it ends before the speech does), place those
  beats from the measured pauses and mark them `// ESTIMATED` so the user can correct one number.
