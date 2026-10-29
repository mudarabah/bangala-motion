#!/usr/bin/env bash
# Make a light preview proxy of a heavy source video so Remotion Studio plays
# smoothly (big 4K/high-bitrate files stutter in the browser and look like glitches).
# The template's Footage component uses public/source-proxy.mp4 in Studio only;
# renders always use the original public/source.mp4.
# Usage: bash make-proxy.sh public/source.mp4 [public/source-proxy.mp4] [width=1080]
set -euo pipefail
IN="${1:?Usage: make-proxy.sh <source.mp4> [out] [width]}"
OUT="${2:-$(dirname "$IN")/source-proxy.mp4}"
WIDTH="${3:-1080}"
ffmpeg -v error -y -i "$IN" -vf "scale=${WIDTH}:-2" -c:v libx264 -preset veryfast -crf 21 -g 12 \
  -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart "$OUT"
echo "Proxy written: $OUT"
