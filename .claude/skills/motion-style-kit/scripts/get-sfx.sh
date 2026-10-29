#!/usr/bin/env bash
# Put the sound effects the template's SoundDesign.tsx expects into public/sfx/.
# - Downloads Remotion's own effects from remotion.media (whoosh, whip, page-turn,
#   mouse-click, shutter-modern, ding, switch).
# - Synthesises two more with ffmpeg: robot-chirp and tick.
# All files are peak-normalised to about -3 dB; levels are then set per cue in code.
# Usage: bash get-sfx.sh [public/sfx]
set -euo pipefail
DIR="${1:-public/sfx}"
mkdir -p "$DIR"
for f in whoosh whip page-turn mouse-click shutter-modern ding switch; do
  curl -sSfL "https://remotion.media/$f.wav" -o "$DIR/$f.wav" && echo "downloaded $f.wav"
done
# Robot chirp: three quick rising tones with a short echo.
ffmpeg -v error -y -f lavfi -i "sine=frequency=1175:duration=0.07" -f lavfi -i "sine=frequency=1568:duration=0.06" \
  -f lavfi -i "sine=frequency=2093:duration=0.1" -filter_complex \
  "[0]afade=t=in:d=0.004,afade=t=out:st=0.05:d=0.02[a];[1]afade=t=in:d=0.004,afade=t=out:st=0.04:d=0.02[b];[2]afade=t=in:d=0.004,afade=t=out:st=0.05:d=0.05[c];[a][b][c]concat=n=3:v=0:a=1,aecho=0.6:0.4:40:0.25,volume=0.7,volume=27.5dB" \
  -ar 44100 "$DIR/robot-chirp.wav" && echo "made robot-chirp.wav"
# Clock tick: a very short band-passed noise click.
ffmpeg -v error -y -f lavfi -i "anoisesrc=d=0.035:c=pink:a=0.9" \
  -af "highpass=f=1800,lowpass=f=7000,afade=t=in:d=0.002,afade=t=out:st=0.006:d=0.028,volume=2.2,volume=5.6dB" \
  -ar 44100 "$DIR/tick.wav" && echo "made tick.wav"
