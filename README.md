# VUE — Concept Presentation Prototype

Zero-build vanilla HTML/CSS/JS site presenting three concept variants for VUE, the Building Intelligence Platform from EnergyPlus.

## Structure

- `index.html` — dashboard launcher with 3 cards
- `concepts/v1/` — animated concept (panorama scroll, floating pins clipped by glasses-lens mask)
- `concepts/v2/`, `concepts/v3/` — static composition placeholders
- `shared/service-menu.{css,js}` — floating chip navigator shown on concept pages
- `assets/` — local images (Glasses / Mask / Reflections / VUE wordmark / static comps)
- `assets/figma/` — exports pulled from the Figma source file (panorama, EP logo)

## Develop

No build, no dependencies. Open `index.html` in a browser or serve the directory:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Hosted on GitHub Pages from `main` branch root.
