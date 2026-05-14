# VUE — Concept Presentation Prototype

Zero-build vanilla HTML/CSS/JS pitch site for **VUE**, the Building Intelligence Platform from EnergyPlus. Three concept boards, v1 fully animated.

**Live:** https://chife-mod.github.io/vue-start-screen/
**Figma source:** [EnergyPlus / Animation frame 3376-8600](https://www.figma.com/design/z8woPB2ToBiVZ3S7ZnOpy5/EnergyPlus?node-id=3376-8600)

## Structure

```
/
├── index.html               # redirects → /concepts/v1/
├── concepts/
│   ├── v1/index.html         # animated concept (panorama, pins, equalizer)
│   ├── v2/index.html         # static composition (V02.png)
│   └── v3/index.html         # static composition (V03.png)
├── shared/
│   └── service-menu.{css,js} # bottom-right chip nav (v1 / v2 / v3)
└── assets/
    ├── Glasses.webp          # glasses frame (front-facing, transparent)
    ├── Mask.png              # alpha mask of the two lenses
    ├── Reflections.png       # reflection overlay (same bbox as Glasses/Mask)
    ├── Panorama.webp         # NYC night skyline
    ├── VUE-Logo.png          # neon "V U E" wordmark
    ├── EP_Logo.svg           # EnergyPlus top logo
    ├── V02.png / V03.png     # static concept boards
    └── lucide/               # 10 icon SVGs used in pins + brand strip
```

## Develop

```sh
python3 -m http.server 4173
# open http://localhost:4173
```

Stage is designed at 1280×1280 and proportionally scaled to fit any viewport.

## Deploy

GitHub Pages from `main` branch root. Push to deploy.

## v1 animation notes

- **Seamless panorama**: 4 copies on the track, every second one is `transform: scaleX(-1)`. Adjacent edges become mirror reflections of the same column — no visible seam regardless of source image edges. Cycle: 4170 px per 150 s.
- **Pins**: travel locked to the panorama (same px/s, same cycle). Top circle has a real CSS `filter: blur(16px)` on a copy of the panorama (positioned per-pin) — fallback for browsers where `backdrop-filter` doesn't render through the masked parent. Line stretches in sync with circle float; bottom dot is anchored.
- **Equalizer**: 76 segmented LED bars at the bottom, each with its own WAAPI height keyframes (5.4–12.6 s per cycle, random phase). CSS mask on the container fades the bars to invisible at the edges so they fade into the bg without a visible plate.
- **Glasses lenses clip the pins** via `mask-image: url(Mask.png)` on the pins container. Glasses + Reflections layer on top with `mix-blend-mode: screen` on the reflections.
- **Brand strip icons**: inline lucide SVGs with `vector-effect: non-scaling-stroke` and `stroke-width="1"` — exactly 1 CSS-px stroke at any scale.
</content>
</invoke>