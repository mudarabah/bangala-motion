# Scene patterns

Reusable scene recipes mapped to story beats. Pick one pattern per voice beat. Each pattern works in any style; the style file decides colors, fonts and motion details.

| Beat | Pattern | What's on screen | Key motion |
|---|---|---|---|
| Hook / claim | **Hero device + floating icons** | Headline on top with one gradient keyword; phone (held or floating) showing the product UI; 6–10 icons around | Headline word blur-in; phone rises; icons fade in at staggered depths, then bob |
| Hook / mystery | **Typing reveal** | Near-empty screen, cursor, one line types in, a keyword resolves | Type-on, then keyword blur-in + light sweep |
| Problem: cost | **Invoice card** | Left: two-line headline ("এডিটরকে / হাজার"); right: invoice with ৳ line items and a gradient total | Line items slide in one by one; total counts up |
| Problem: time | **Timer + timeline editor** | Clock icon + running timer; headline ("ঘণ্টার পর ঘণ্টা"); a busy timeline editor with tracks, keyframes, red cut markers | Timer ticks fast; clock hand spins; clips and markers pop in |
| Problem: barriers | **Crossed-out requirement cards** | 2–3 cards ("কম্পিউটার", "দামি সফটওয়্যার") each getting a red X badge, then a word like "কিছুই" resolves | Cards in; X badges pop; word blur-in under them |
| Solution: how | **Command → result in phone** | Phone with a chat/prompt field; message types; result card appears ("ভিডিও রেডি") | Typing, send, result card scales in with check badge |
| Solution: pipeline | **Step chain** | Numbered cards 01→04 (+ active 05 result card) joined by a line | Cards appear exactly as each step is spoken; line draws between them; final card gets gradient fill |
| Proof / outputs | **Depth carousel** | Large showcase cards (motion video, glass UI, business ad) with a pill label under the focused one | Horizontal slide; neighbours blurred and scaled down |
| Audience / use cases | **Persona cards** | 3 glass cards (content creator, business owner, freelancer), each: 3D icon, title, one-line benefit, pill button; small accent graphic top-right (spinner, coin, growth line) | Cards enter one by one; current one gets active border |
| Urgency / timing | **Big number + progress** | Huge gradient numeral ("২০২৬") with progress bar (e.g. 91%) and a short line ("শেষ হতে চলল") | Number blur-in; bar fills; % counts |
| Contrast | **Before/after bars** | Two cards with vertical bars (e.g. one video edit cost vs whole skill); a green tag ("আরও কম!") | Bars grow; tag pops with slight rotation |
| Statement | **Centred line** | One sentence centred on the clean background, keyword in gradient | Word-by-word blur-in, then blur-out |
| Web page / product | **Device showcase** | Phone and/or laptop frame with a captured page; optional cursor clicking a button | Auto-scroll; cursor move + press; zoom to rebuilt component |
| CTA / end card | **Offer card** | Top icon, headline with gradient keyword, price pill, gradient button with arrow, floating icons | Headline blur-in; pill and button pop in; button gets a soft shine sweep; hold 1–2 s |

## Rules of thumb
- One pattern per sentence or idea; change pattern when the idea changes, not mid-sentence.
- Re-use the same component (e.g. the step chain) across scenes for visual consistency.
- Keep data scenes on the cleaner, whiter background variant so the UI reads clearly.

## Headshot story patterns (built in `templates/headshot-project/src/scenes/`)
| Beat | Pattern | Framing | What happens | File |
|---|---|---|---|---|
| Hook: "recorded on a camera" | **Camera viewfinder** | full | Raw (slightly desaturated) footage; viewfinder corners lock onto the head on the keyword and turn green; REC + timecode; camera specs slide in; camera orb + pill; REC pulses on "record" | `CameraScene.tsx` |
| Hook: "…but edited with AI" | **AI scan reveal + robot** | full → punch cuts | Robot pops in, eyes flash; a scan line sweeps down leaving the finished grade and no HUD; line word by word with a highlighter under the key verb; robot points as "AI" lands in a glowing chip | `AIScene.tsx`, `Robot.tsx` |
| Promise / use cases | **Clip cards** | card | Two glass cards rise under the speaker card, each playing the user's clip; "or" chip; AI badge + progress → check on "AI" | `UseCasesWorld.tsx`, `ClipThumb.tsx` |
| Problem: "free on YouTube…" | **Platform search world** | pip | Generic video-platform window; query types; cursor clicks; results cascade and scroll; gradient hero | `SearchWorld.tsx` |
| Turn: "…but nobody gives the secrets" | **Vault on the speaker** | full → tight → cut to full | Vault card rises under the speaker; on the denial the frame punches in, lock turns red, danger pill | `SecretsScene.tsx` |
| Evidence: what you learn | **Panel push** | card (+ cardTight cut) | Voice generator (waveform turns colourful on "emotion"), JSON editor typing, skill bars + rising line; each panel pushes in from the right | `CourseWorld.tsx` |
| Evidence: hours → minutes | **Timeline collapse** | pip | Busy generic timeline; timer races through hours; AI sweep clears it into one clean clip; timer rewinds to minutes | `AEWorld.tsx` |
| Offer: free → paid | **Ticket + stamp** | full → punch cut | Calendar pill; "free" ticket; PAID stamp lands; module tiles slot in | `PaidScene.tsx` |
| Offer: price | **Offer card** | card | Cover; old price → struck; new price counts down; special-offer pill; order button | `OfferWorld.tsx` |
| CTA | **Full-frame CTA** | full → tight cut | Price reminder; big button clicked on the spoken word; urgency pill + draining timer + ticks | `CTAScene.tsx` |
