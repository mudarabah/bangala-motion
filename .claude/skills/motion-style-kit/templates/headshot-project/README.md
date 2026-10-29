# Headshot project template (Remotion)

A complete, working edit of a 60 s Bangla talking-head course ad (4:5, 2160x2700, 25 fps), built with
the headshot-lavender style. Copy this folder, swap in your video and transcript, and adapt the scenes.

## Start
```bash
npm install
bash <kit>/scripts/get-sfx.sh public/sfx          # sound effects
cp /path/to/video.mp4 public/source.mp4
bash <kit>/scripts/make-proxy.sh public/source.mp4  # smooth Studio preview
npm run dev                                         # Remotion Studio → composition "Edit"
```
Without `public/source.mp4` the composition shows a placeholder.

## What to change for a new video
| File | What it holds | Change it |
|---|---|---|
| `src/constants.ts` | Width, height, fps | Match your source |
| `src/data/timeline.ts` | **Every cue time** (word starts), `SOURCE_CUTS`, `FRAMING` | Rewrite from your transcript; list your jump cuts |
| `src/scenes/*.tsx` | One file per story beat; on-screen text lives here | Keep, edit or delete per your story |
| `src/Video.tsx` | Layer stack + which scene plays when | Add/remove scene sequences |
| `src/components/SoundDesign.tsx` | Sound cues and levels | Point cues at your timeline |
| `src/components/Footage.tsx` | Framing engine (full / punch / tight / card / cardTight / pip, cuts, push, proxy) | `FACE` position if the speaker sits elsewhere |
| `src/theme.ts` | Fonts, colours, glass, text depth, layout | Usually unchanged (house style) |

## Reusable components (`src/components/`)
HeroWord, PhraseLine, GlassPill, Reveal, Scrim, StrikeLine, IconOrb, Robot, GlassWindow, VideoThumb,
ClipThumb, TypeText, Cursor, Ambient (BrandBackground, Bokeh, LightSweep), SoundDesign, anim helpers
(`useEnterStyle`, `useEnter3D`, `useDrift`, `useSceneTime`, `useProgress`).

## Public folder
```
public/source.mp4         your full video (not in git)
public/source-proxy.mp4   preview proxy (not in git)
public/transcript.json    word-level transcript (readable copy)
public/broll/             your clips (product-promo.mp4, client-video.mp4 are used by UseCasesWorld)
public/screens/           screenshots
public/sfx/               sound effects (get-sfx.sh)
```

## Commands
- `npm run dev` — preview. `npm run render` — standard render. `npm run render:max` — maximum quality.
- Render only when the person you edit for says "render".
