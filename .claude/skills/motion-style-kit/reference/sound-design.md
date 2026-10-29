# Sound design

Sound carries about half of the "edited in After Effects" feeling. Keep it subtle: the voice is the star.

## Setup
- `bash scripts/get-sfx.sh public/sfx` — downloads Remotion's effects (whoosh, whip, page-turn,
  mouse-click, shutter-modern, ding, switch from remotion.media) and synthesises `robot-chirp` and `tick`.
  Check remotion.media's terms before redistributing those files; the two synthesised ones are free to share.
- Cues live in `src/components/SoundDesign.tsx` (`<Audio>` from `@remotion/media`, one `<Sequence>` per cue,
  `premountFor={fps}` so nothing stalls Studio playback). `SFX_ENABLED = false` mutes them all.

## Levels
Measure the voice: `ffmpeg -i public/source.mp4 -af volumedetect -f null -` (mean was about −17 dB on
a typical headshot). Effects sit **14–20 dB under the voice**. With effects peak-normalised to −3 dB, start at:

| Effect | Volume (0–1) |
|---|---|
| whoosh on framing moves | 0.16 |
| whoosh on a hero reveal / scan | 0.22–0.30 |
| ding (success, AI reveal) | 0.10–0.14 |
| mouse-click (UI click / CTA click) | 0.35–0.45 |
| typing (mouse-click every 0.08 s) | 0.09 |
| page-turn (panel push) | 0.30 (it is a quiet file) |
| whip (stamp) / switch (lock, price) | 0.25–0.30 |
| shutter (camera "record") | 0.28 |
| robot-chirp | 0.12–0.16 |
| tick (clock racing / urgency) | 0.10 fast / 0.22 slow |

## Cue map (what sounds where)
| Moment | Sound |
|---|---|
| Camera "record" | shutter |
| AI scan / big reveal | whoosh + ding; robot-chirp when the robot appears and points |
| Every framing move (not zooms, not cuts) | soft whoosh, 0.04 s before the move |
| Search typing / click | typing taps / mouse-click |
| Vault rises / lock turns red | whoosh / switch |
| Course panels pushing in | page-turn |
| Timer racing through hours | fast ticks; then whoosh on the AI sweep, ding when the clean clip lands |
| PAID stamp | whip |
| Price appears / new price | switch |
| CTA click | mouse-click |
| Urgency ("offer may end") | slow ticks to the end |

## Checks
- You cannot judge loudness by reading code: after a render (or an audio-only export to a scratch file),
  measure that the effects exist at their times and stay well under the voice; ask the user to listen.
- Background music (if the user supplies a licensed track) goes 22–26 dB under the voice and ducks
  further while they speak.
