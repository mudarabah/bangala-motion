#!/usr/bin/env bash
# Turn a reference video into contact sheets + key frames for style analysis.
# Usage: bash extract-frames.sh <video> [outDir] [secondsBetweenFrames]
# Needs ffmpeg (Mac: brew install ffmpeg).
set -euo pipefail
VIDEO="${1:?Usage: extract-frames.sh <video> [outDir] [seconds]}"
OUT="${2:-reference-frames}"
EVERY="${3:-2.5}"
mkdir -p "$OUT"

DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VIDEO")
echo "Duration: ${DUR}s"

# Contact sheets: 8 frames per sheet (4x2), one frame every $EVERY seconds.
ffmpeg -v error -i "$VIDEO" -vf "fps=1/${EVERY},scale=480:-1,tile=4x2" "$OUT/sheet_%02d.png"

# Full-size key frames every 5 seconds (for color sampling and detail).
# (Scene-change detection is unreliable for soft blur/dissolve styles, so fixed spacing is used.)
ffmpeg -v error -i "$VIDEO" -vf "fps=1/5,scale=1280:-1" "$OUT/frame_%03d.png"

echo "Contact sheets and scene frames saved in $OUT"
echo "Next: look at every sheet, sample colors from frame_*.png, then fill styles/_TEMPLATE.md"
