# Style: Lavender Glass (light)

Derived from a reference Bangla AI-course ad (16:9, ~70 s). Bright, airy, premium SaaS feel: soft lavender-to-peach light, frosted white cards, glossy 3D app icons, bold Bangla headlines that resolve from blur word by word. Calm and clean, never busy.

## 1. Mood in one line
"Apple keynote meets a friendly Bangla edtech app": light, soft, confident, optimistic.

## 2. Canvas
- Formats: 1920x1080 (16:9, reference) and 1080x1920 (9:16 reels). 30 fps.
- 9:16 safe zone: keep key content 220 px from top, 380 px from bottom, 80 px sides.
- 16:9 safe zone: 80 px all sides.

## 3. Background
- Base: near-white `#FBF9FF`.
- Two to three large, very soft blurred color fields (blur 120–200 px) that drift slowly:
  - violet `#A78BFA` / `#8B5CF6` at 35–55% opacity (usually top-left or left)
  - peach `#FDBA8C` / soft coral `#FBC8B4` at 30–45% (usually right or bottom-right)
  - lavender haze `#E6DCFD` along the bottom edge, like a low cloud bank.
- Some scenes use a cleaner variant: almost pure white with only the bottom lavender haze. Use it for data/UI-heavy moments (timelines, invoices, comparisons) so the UI reads clearly.
- No grids, no particles, no noise texture, no hard gradients.

## 4. Color tokens
| Token | Value | Use |
|---|---|---|
| ink | `#1E1340` | Headlines, primary text |
| inkMuted | `#6B6488` | Sub-labels, captions |
| brand | `#7C3AED` | Primary violet |
| brand2 | `#A855F7` | Gradient end, hover/active |
| magenta | `#C026D3` | Keyword gradient end |
| keywordGradient | `#7C3AED → #C026D3` (left→right) | Highlighted Bangla keywords ("AI", "কমান্ড", "পুরো") |
| buttonGradient | `#7C3AED → #A855F7` | Pills and CTA buttons |
| success | `#22C55E` / `#10B981` | Audio waveform, check marks, growth line |
| danger | `#EF4444` | X badges, cut markers, "offer" badge |
| amber | `#F5B300` | Coins, star icons |
| cardFill | `rgba(255,255,255,0.72)` | Glass cards |
| cardBorder | `rgba(255,255,255,0.9)` + outer `rgba(124,58,237,0.10)` | Card edges |
| cardShadow | `0 24px 60px rgba(76,29,149,0.12), 0 4px 12px rgba(76,29,149,0.06)` | Card depth |

## 5. Typography
- Bangla display: **Anek Bangla** 700–800 (alternatives: Hind Siliguri 700, Baloo Da 2 800). Tight, heavy, rounded feel.
- Bangla body/labels: **Hind Siliguri** 500–600.
- Latin and numbers in UI (timers, "Timeline", "AI Video Studio"): **Poppins** 500–600.
- Big numerals (e.g. "২০২৬", "৫০%"): Bangla digits in the display font, keyword gradient fill.
- Sizes at 1920x1080: headline 72–110 px, sub-headline 40–52 px, card title 34–40 px, card body 22–26 px, pill text 20–24 px. For 9:16 scale ×1.15.
- Headlines: one line where possible; two lines max. A two-line headline often mixes a gradient keyword line with an ink line ("ঘণ্টার পর ঘণ্টা" gradient / "কাট আর অ্যানিমেশন" ink).

## 6. Components
- **GlassCard**: radius 28–36 px, cardFill, cardBorder, cardShadow, padding 32–40 px. Backdrop blur only on cards that never animate `filter`/`opacity` (otherwise it blinks); animated cards use a more opaque fill instead.
- **Active card**: same card plus a 2 px violet border (`#A855F7` at 70%) and a soft violet outer glow; or a full violet gradient fill with white text for the final/"result" step.
- **Pill label**: white pill, radius full, small shadow, ink text; sits centred under a card or showcase (e.g. "মোশন ভিডিও", "বিজনেস অ্যাড").
- **Pill button**: buttonGradient fill, white text, leading icon (clock, arrow, ৳), radius full, soft violet shadow.
- **3D app icon**: rounded square 22–28% radius, glossy gradient fill (top-light), subtle inner highlight and drop shadow below. Palette per meaning: document = lavender, image = coral-pink, animation = blue, sound = green, video/play = violet, camera = orange, shop = violet, briefcase = green, coin = amber. Use one consistent icon family (draw in SVG/CSS; lucide glyph in white on top of the glossy tile).
- **Floating icon cluster**: 6–10 small glossy icons (play, music, camera, chat, star, heart, magic wand, layers) scattered around a hero object at different depths; far ones smaller and slightly blurred.
- **Step chain**: numbered cards ("01", "02"…) in a row, joined by a thin violet line with small dots; last card is the active/result card.
- **UI mocks**: Timeline editor (window dots, V2/V1/A1 tracks, violet/blue clips, green waveform, playhead), invoice card (line items with ৳ prices, total in gradient), progress bar with %, before/after bar comparison, chat/assistant screen. Always clean, light, few elements.
- **Device**: realistic modern phone (dynamic-island style notch, 9:41 status bar) shown upright or held by a soft, slightly blurred hand; screen content is a light app UI. Generic, no brand marks.

## 7. Motion language
- **Word-by-word blur-in** (signature move): each Bangla word goes from blur 14 px, opacity 0, y +14 px → sharp, opacity 1, y 0 over ~12 frames; stagger 4–6 frames per word, synced to the voice. The upcoming word can sit faint and blurred for a beat before resolving.
- **Card entrances**: rise 30–40 px + fade + slight scale 0.96→1 with a gentle spring (damping ~200, no bounce). Stagger 5–8 frames.
- **Depth carousel**: showcases slide horizontally; the focused card is sharp at scale 1; neighbours scale 0.88, blur 6–10 px, opacity 0.6.
- **Floating idle**: icons bob 6–10 px on a slow sine (period 3–4 s), each with its own phase; tiny rotation ±3°.
- **Counters and clocks**: numbers tick up (timer "00:27:20 → 03:05:07", prices, %), clock hands spin to show time passing.
- **Highlights**: the active step/card gets the violet border + glow as the voice reaches it; previous ones stay but lose emphasis.
- **Transitions**: soft blur-dissolve (outgoing blur 0→16 px + fade, incoming the reverse) or a short slide with depth blur. 10–14 frames. No wipes, no spins, no glitch.
- **Camera**: very slow push (scale 1.00→1.04 across a scene). Never fast zooms.
- **Ending**: clean CTA card: icon at top, headline with gradient keyword, white price pill ("মাত্র ৯৯৯ টাকা"), gradient pill button with arrow, floating icons around, background at its most colorful.

## 8. Layout habits
- 16:9: text block left, visual right (or centred hero with headline on top).
- 9:16: headline top third, visual centre, button/pill lower-middle (above the 380 px bottom safe zone).
- Generous whitespace; one idea per scene; at most 3–5 cards visible.

## 9. Do / Don't
Do: soft light, lots of air, glossy friendly icons, gradient only on keywords and buttons, realistic UI mocks, sync every keyword to speech.
Don't: dark backgrounds, neon, heavy drop shadows, more than one gradient pair, full-sentence subtitles, stock photos, emoji, real brand logos, cluttered screens, bouncy cartoon motion.
