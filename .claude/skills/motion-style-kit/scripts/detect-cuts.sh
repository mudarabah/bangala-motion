#!/usr/bin/env bash
# Find jump cuts that are already inside a source video (e.g. pauses trimmed by
# an earlier edit or an AI tool). Each one looks like a "glitch" unless the edit
# hides it — see reference/headshot-workflow.md → "Hide source jump cuts".
# Usage: bash detect-cuts.sh <video> [threshold=0.08]
# Needs ffmpeg.
set -euo pipefail
VIDEO="${1:?Usage: detect-cuts.sh <video> [threshold]}"
TH="${2:-0.08}"
FPS=$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$VIDEO" | awk -F/ '{ if ($2) printf "%.3f", $1/$2; else print $1 }')
echo "Video fps: $FPS   (scene threshold $TH; lower it to 0.06 if cuts are missed)"
ffmpeg -hide_banner -i "$VIDEO" -an -vf "scale=216:-2,select='gt(scene,$TH)',metadata=print:file=-" -f null - 2>/dev/null \
  | grep -E "pts_time|scene_score" | paste - - \
  | awk -v fps="$FPS" '{for(i=1;i<=NF;i++){if($i ~ /pts_time/){split($i,a,":");t=a[2]} if($i ~ /scene_score/){split($i,b,"=");s=b[2]}} printf "cut at %6.2fs  (frame %d @ %s fps)  score %.3f\n", t, int(t*fps+0.5), fps, s}'
