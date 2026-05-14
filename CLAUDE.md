# CLAUDE.md

Notes for future Claude sessions in this repo. **Read this before touching code.**

## Project type

Pitch-deck-style **presentation prototype** for VUE (EnergyPlus Building Intelligence Platform). Zero-build vanilla HTML/CSS/JS, hosted on GitHub Pages.

This is **not a Vue.js project** — the folder name "vue-start-screen" refers to the *product* called VUE.

## Working style — hard rules

- **No subagents.** User wants direct work in the main chat to see progress in real time. (See also `~/.claude/projects/-Users-oleg-Dev-bl-vue-start-screen/memory/feedback_no_subagents.md`.)
- **Speak Russian in chat**, but keep code identifiers/comments/UI strings in English (client-facing English pitch).
- **Don't add features that weren't asked.** User iterates tightly; they will tell you exactly what to change.
- **Verify in preview before claiming a change works.** A `python3 -m http.server` runs on port 4173; use the Claude_Preview MCP (`.claude/launch.json` is set up) to screenshot + inspect after each visible change.

## Stage geometry — load this into your head before editing v1

- **Design canvas:** 1280 × 1280 px (square). All absolute positions in `concepts/v1/index.html` are in this coordinate space.
- **Viewport scaling:** JS sets `transform: scale(min(innerWidth/1280, innerHeight/1280))` on `.stage`. `transform-origin: 50% 0%`. Wrap uses **flexbox** (`align-items: flex-start; justify-content: center`) — *do not* use `display: grid; place-items: …` here, parser quirks shift the stage horizontally in some browsers.
- **Panorama image** (`assets/Panorama.webp`): 2085 × 885 px. Positioned at stage (`-796`, `320`).
- **Lenses (mask area):** 1126.897 × 399 px at stage (`76.05`, `563`). The `assets/{Glasses.webp, Mask.png, Reflections.png}` trio share this exact bbox 1:1 — user exported them with a joined bounding box, intentional.
- **Pin sample (Figma node 3378:9308):** 74 × 142 px. Circle 72×72 + line + 12×12 dot.

## Non-obvious decisions / "do not redo" list

1. **Panorama uses mirror-flip for seamless loop.** Track = `[Original][Mirror][Original][Mirror]` = 8340 px wide. Every second copy is `transform: scaleX(-1)`. Adjacent edges are mirror reflections of the same column — no visible seam, the source image's left/right edges never need to match. Cycle: `translate3d(-4170px)` over 150 s.

2. **Pins are in LOCKSTEP with the panorama.** Pins-track is also 8340 wide and scrolls `-4170 in 150 s`. This means every pin sits over a constant panorama-X over time, so the per-pin blur-bg position is static. **Do not** change one duration without the other.

3. **`backdrop-filter` doesn't render visibly inside masked parents** (`.pins-layer` has `mask-image: url(Mask.png)`, which isolates the compositing buffer). The pin "glass" effect uses a CSS-`filter: blur(16px)` on a `<div class="pin__blur-bg">` containing a copy of `Panorama.webp` positioned per-pin via `background-position: (56 - panImageX, 56 - panY)`. The `56` comes from circle center 36 + `inset:-20` blur-bg offset. **Don't drop the `+20` accounting** — earlier bug was off by 40 px.

4. **Pin float ↔ line stretch are WAAPI-synced.** Each pin spawns two animations with identical `timing` (`duration`, `delay`, `easing: cubic-bezier(0.4, 0, 0.6, 1)`). Circle animates `transform: translate3d(0, dy, 0)`; line animates `top` + `height` so its bottom stays anchored at pin Y `(72 + lineH)` (= the dot's position) and its top tracks the circle's bottom. Dot doesn't move.

5. **Don't render text V/U/E spans next to the VUE-Logo.png.** The PNG already contains the full V U E wordmark (V and E are thin white lines, U is the neon green glow). Layering text on top causes visible doubling. Also: `display: grid` without `grid-template-columns` makes each `<span>` an auto-flow row → V/U/E stack VERTICALLY. That was "the vertical VUE inscription" the user told you to remove.

6. **Equalizer uses CSS mask, not overlay plate.** `.city-silhouette` has `mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.3) 75%, transparent 100%)`. Earlier the same effect was done with an `.equalizer-fade` overlay plate, but it created a visible horizontal seam where the plate ended. **Do not bring the plate back.**

7. **Brand strip icons are inline SVG with `vector-effect: non-scaling-stroke` + `stroke-width="1"`.** Gives exactly 1 CSS-px stroke regardless of viewBox scaling. Stroke color is the design-system green `#6FFBB5`; labels stay yellow `#FFEC8B`. Earlier they were rendered via CSS `mask-image` from `assets/lucide/*.svg` — that approach can't override stroke width (it's baked into the SVG), hence the switch to inline.

8. **Panorama fades are Figma-spec values, top + bottom only.** `linear-gradient(180deg, rgb(2,22,23) 0%, rgba(2,22,23,0) 25.797%)` + bottom `0deg / 22.491%`. **No side fades** — user explicitly removed them. Footer rectangle has `background: none` — earlier it had its own gradient that double-faded the water.

9. **Root `/index.html` is a redirect to `/concepts/v1/`.** Originally it was a launcher dashboard with 3 cards; user removed it. The chip nav at bottom of v1/v2/v3 lets users hop between concepts. **No "Home" link** in the chip — user dropped it.

10. **Stage `transform-origin: 50% 0%`** (not `center center`). With center origin, the scaled stage drifts back toward the vertical center, cutting off the bottom on shorter viewports. Top-pivot keeps the visual stuck to the top edge.

## Figma access

- **File key:** `z8woPB2ToBiVZ3S7ZnOpy5`
- **Main frame "Animation":** node `3376-8600`, 1280×1280
- Use `mcp__figma-remote-mcp__get_design_context` / `get_screenshot` for any pixel-perfect work. The user wants Figma-derived font sizes, letter-spacing, colors — don't eyeball.
