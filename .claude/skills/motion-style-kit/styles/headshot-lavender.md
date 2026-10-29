# Style: Headshot Lavender (talking-head editing, light + purple) — v2

For talking-head videos of any length (30 s reels to 10-minute explainers). The person on camera is the
hero; motion graphics turn each spoken idea into a small visual story. Light theme, purple branding,
glass panels, clean depth on hero words, strict hierarchy, no visual noise.

The working implementation of everything below is in `templates/headshot-project/` — use it, and
treat this file as the "why" behind it.

## 1. Mood in one line
"A calm premium explainer that never stands still": every spoken idea gets a visual, everything moves
softly, nothing shouts.

## 2. Reference library (what each taught us)
| Ref | Format | Take from it |
|---|---|---|
| A. Rooftop reel (blue) | 9:16, 54 s | Keyword-first text with one giant word; frame changes (full → card → avatar bubble); product card + counter; date/price pills |
| B. "Genius Code" long-form (purple) | 4:3 | Numbered chapter markers; English hero word + Bangla line pairs; floating 3D prop beside speaker; full cut-aways to brand background; giant numbers |
| C. "Genius Code" part 2 | 4:3 | Dual label pills with icons; rounded highlight frame around speaker; two-column comparisons; offer end card |
| D. Desk studio long-form (blue) | 16:9 | Speaker PIP inside a 3D brand space; floating screenshot cards with parallax; typed search bar; before/after; step pills; counters |
| E. AI-editing course ad (this kit's template) | 4:5, 60 s | Camera viewfinder → AI scan reveal; robot mascot; platform search UI world; vault "turn"; course panels; AE timeline collapse; ticket + PAID stamp; offer card; full-frame CTA with draining timer |

## 3. Corrections we apply
| Tempting | Ours |
|---|---|
| Saturated purple gradients everywhere | Soft lavender light background; purple only on keywords, buttons, props |
| Chrome/metallic or stacked-shadow 3D text | Crisp single fill + soft diffuse shadow (see §6) — stacked offsets read as "double text" |
| Text-only overlays | Every idea gets a visual metaphor; text is the keyword layer on top |
| Hard white flash between scenes | 12-frame spring + blur dissolve, or a soft diagonal light sweep (fades in and out, starts off-screen) |
| Speaker small for most of the video | Return to full frame for the story's turn and for the CTA; face time ≥ ~40% |
| Static frames between graphics | Continuous slow push on the footage and drift on worlds |
| Real brand logos/UIs | Generic look-alikes (e.g. a video-platform search UI with no real logo) unless the user supplies files |
| Yellow as a second accent everywhere | Amber `#F5B300` for ONE element per chapter (a price, a special-offer pill) |

## 4. Canvas
| Format | Size | Fps | Safe margin | Face zone | Graphics zone |
|---|---|---|---|---|---|
| 9:16 reel | 1080x1920 | 30/25 | 220 top, 380 bottom, 80 sides | top 45% | lower band, opposite the gesture hand |
| **4:5 feed** | 2160x2700 (or 1080x1350) | match source | 80 all sides | ~19–56% of height | lower band y ≈ 1650–2620 (2160 wide) |
| 16:9 long-form | 1920x1080 | 30/25 | 80 all sides | upper centre | side opposite the speaker |

- Always match the source's resolution and fps; output length = source length unless the user agrees to an end card.
- Sizes in this file are for a **1080-wide** frame. On 2160-wide canvases multiply by 2.
- Find the face position from a contact sheet before placing anything (`scripts/extract-frames.sh`).

## 5. Color tokens
| Token | Value | Use |
|---|---|---|
| base | `#FBF9FF` | World background |
| violetField / peachField / pink | `#A78BFA` 40% / `#FDBA8C` 30% / `#F0ABFC` 22%, blurred 240–280 px, drifting | Colour fields on base |
| ink / inkMuted | `#1E1340` / `#6B6488` | Text on light |
| brand / brand2 / magenta | `#7C3AED` / `#A855F7` / `#C026D3` | Purple family |
| keyword gradient | `#7C3AED → #C026D3` | Buttons, chips, highlighter bars |
| **text gradient** | `100deg, #5B21B6 0%, #7C3AED 38%, #A21CAF 72%, #C026D3 100%` | Gradient hero words (deeper start = readable on light) |
| scrim | `rgba(27,16,64,0) → 0.35 @45% → 0.6` bottom | Behind text over footage |
| glass on footage | `rgba(255,255,255,0.88)`, 2 px white border, deep soft shadow | Panels/pills over video |
| glass on light | `rgba(255,255,255,0.80)`, 2 px white border | Panels in worlds |
| success / danger / amber | `#10B981` / `#EF4444` / `#F5B300` | Checks, X / lock / urgency, single accent |

No `backdrop-filter`: it switches off whenever an ancestor animates `filter` or `opacity` and the panel
"blinks". The fills above are opaque enough on their own.

## 6. Typography: 3 levels, clean depth
- **L1 Hero** (one per beat): Anek Bangla 800, 140–180 px (9:16), 110–140 px (16:9), 150–165 px (4:5 at 1080 wide). Fill white (over footage) or the text gradient (on light). Enters blur 24→0 + scale 0.92→1 + tracking-in (0.08em → −0.01em) over 14 frames, then one soft light sweep crosses it. Word spacing 0.14em.
- **Depth recipe** (this replaces the old stacked emboss):
  - White on footage: `text-shadow: 0 3px 8px rgba(27,16,64,.35), 0 16px 44px rgba(27,16,64,.5)`.
  - Gradient on light: fill via `background-clip: text`; depth via `filter: drop-shadow(0 4px 6px rgba(76,29,149,.18)) drop-shadow(0 18px 34px rgba(76,29,149,.22))` on the wrapper.
  - Never several hard-offset shadow copies, never a dark extrusion under purple text — that is what viewers call "double text".
- **L2 Phrase**: Anek Bangla 700, 56–72 px, white with the soft shadow, word-by-word on each spoken word.
- **L3 Label / pill**: Hind Siliguri 700, 34–44 px, inside a glass pill with a lucide icon chip.
- **Readable time**: hero ≥ 1.0 s fully visible, 4-word line ≥ 1.2 s. If the next idea comes too fast, hold the graphic over the start of the next sentence rather than flashing it.
- Max ~7 words on screen. Typing text types by grapheme cluster (`Intl.Segmenter`) so conjuncts never appear half-formed.
- On-screen spelling: Bangla script for spoken English words unless they are brand/tech names (AI, JSON, After Effects, YouTube); prices as digits (৯৫০ টাকা).

## 7. Framing (the edit vocabulary)
One continuous `<OffthreadVideo>` of the speaker, moved by a framing engine (template: `src/components/Footage.tsx`, keyframes in `FRAMING` in `src/data/timeline.ts`).

| Mode | Look | Use for |
|---|---|---|
| **full** | Footage full frame (+ slow push 1.00→1.045 per segment) | Default; the turn; the CTA |
| **punch** / **tight** | Zoom 1.08 / 1.16 around the face | Emphasis; punch cuts |
| **card** | Footage shrinks to a rounded card at the top (scale 0.5, radius 90); visuals below on the lavender world | Lists, panels, offers |
| **cardTight** | Same card, footage zoomed inside it (85% crop) | Hiding a jump cut during a card section |
| **pip** | Footage becomes a circle bottom-left (440 px at 2160 wide); a full-screen world takes over | UI worlds (search, timelines), concept scenes |

- Moves: 12-frame spring + blur dissolve (peak 14 px) + soft light sweep + whoosh. Zooms: 8-frame spring, no blur.
- **Cuts** (`cut: true`): switch instantly on a source jump cut. Punch cuts must change the zoom ≥ 15% (wide 1.0 ↔ tight 1.16) to read as deliberate; an 8% change looks like a glitch.
- The lavender world sits *behind* the footage, so shrinking the speaker reveals it.
- Rack-focus open: first ~1 s goes from soft (blur 16) and slightly zoomed to sharp.

## 8. Element library (all in the template)
| Element | What it is |
|---|---|
| HeroWord / PhraseLine / GlassPill | The three text levels |
| IconOrb | Glossy 3D sphere with a lucide icon, glow, gentle bob; tints brand/magenta/amber/danger/success |
| Robot | Vector 3D mascot (head, face screen, glowing blinking eyes, antenna, chest core, arm that points) for "AI" moments |
| AI chip | "AI" inside a glowing processor-chip square with pins and a shine sweep |
| Camera HUD | Viewfinder corners that lock onto the head, REC + timecode, camera specs, audio meter |
| Raw → AI scan | Footage starts slightly desaturated ("raw camera"); a scan line sweeps down and leaves the finished grade and no HUD above it |
| GlassWindow | Generic app window (traffic-light dots) for UI worlds |
| VideoThumb / ClipThumb | Vector thumbnail / the user's clip playing inside a 16:9 card (muted; usable part can loop with a dissolve) |
| TypeText + Cursor | Grapheme-safe typing; cursor glide + press + ripple |
| StrikeLine | Strike-through that draws across a word or price |
| Vault card | Lock orb + two-line gradient hero; lock crossfades to red on the denial |
| Course panels | Voice generator (live waveform, emotion icons), JSON editor typing with syntax colours, skill bars + rising line |
| AE timeline | Generic layered timeline with keyframes; an AI sweep collapses the clutter into one clean clip; timer races through hours then rewinds to minutes |
| Ticket + stamp | "Free" ticket, a "PAID" stamp lands, module tiles slot in |
| Offer card | Cover, price → struck price + counting new price, special-offer pill, button with shine |
| CTA | Price reminder pill, big button clicked on the spoken word, urgency pill + draining timer |
| Ambient | Drifting colour fields, floating bokeh (back + soft front layer), light sweep |

## 9. Motion rules
- Springs with damping 200 (no bounce). Enter: fade + rise + blur → sharp; 3D layers tilt up from perspective (rotateX 18–35°). Exit: reverse, 7 frames.
- Everything is tied to a word start in `timeline.ts`.
- Something always moves: footage push, world drift (scale 1→1.035 over the scene), bokeh, idle bob on orbs and the robot.
- Colour changes interpolate (`interpolateColors`), never flip in one frame.
- Transitions never start with an element already on screen (light sweeps start off-screen and fade in).
- Density: a new visual roughly every 1–3 s inside a scene is fine when it serves the story; keep one focal point at a time.

## 10. Storytelling rhythm
Short (≤ 90 s): **Hook → Promise → Problem → Turn → Evidence → Offer → CTA**.
1. **Hook (0–7 s)**: an unexpected visual claim (raw camera → AI scan → "AI দিয়ে" with the robot). The speaker is full frame.
2. **Promise**: use-case cards with the user's own clips.
3. **Problem**: a world scene (search UI full of free content).
4. **Turn**: back to the speaker full frame, punch-in, the "but…" visual (vault, red lock).
5. **Evidence**: card or PIP with panels (what the course teaches, before/after time).
6. **Offer**: ticket → paid; price card with the new price counting in.
7. **CTA**: speaker full frame, big button clicked on the word, urgency.

## 11. B-roll and assets
- Use `public/broll/` and `public/screens/` first; put the user's clips inside cards (ClipThumb), muted.
- Check each clip's content (contact sheet) and use only the usable part (e.g. stop before an empty background tail).
- Missing footage → one NEEDS list with a motion-graphics fallback per item.
- No celebrity photos, no real logos/brand UIs unless supplied.

## 12. Do / Don't
Do: a visual for every idea, the speaker full frame at the turn and CTA, clean text depth, word-start sync, hide every source jump cut, sound design under the voice, a still check of every scene.
Don't: stacked-shadow text, backdrop-filter on animated panels, one-frame colour flips, text shorter than readable time, white flashes, bounce/shake, real logos you don't own.
