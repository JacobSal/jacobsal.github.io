# jacobsal.github.io

Personal research portfolio for Jacob Salminen, Ph.D. — neural engineering and biomechanics.

Plain static HTML, CSS, and a tiny vanilla-JS file. Deployed to GitHub Pages by `.github/workflows/deploy.yml`.

## Repo layout

```
.
├── index.html                     # landing / resume page
├── papers/
│   ├── salminen-2026-interstride.html
│   ├── liu-2025-uneven-terrain.html
│   ├── salminen-2024-gait-speed.html
│   └── liu-2024-walking-terrain.html
├── assets/
│   ├── css/site.css               # all styles (Scandinavian / Japandi)
│   ├── js/site.js                 # nav toggle + reveal-on-scroll
│   ├── img/                       # site images (headshot, lab, etc.)
│   ├── img/papers/<slug>/         # per-paper figures (create as needed)
│   └── pdf/                       # CV and paper PDFs
├── .github/workflows/deploy.yml   # static deploy to GitHub Pages
└── _archive/                      # old template + Next.js scaffold (kept for reference)
```

## Adding a new paper

1. Copy one of the files in `papers/` (`salminen-2024-gait-speed.html` is a good template) to a new file named with a slug like `lastname-YEAR-shortname.html`.
2. Update the `<title>`, hero section, authors, venue, DOI, and citation block.
3. Add a card for it on the home page in the `#papers` section of `index.html`. Match the existing markup of `.paper-card` so the styling stays consistent.
4. Drop figure images into `assets/img/papers/<your-slug>/fig1.png`, `fig2.png`, etc., and replace the `figure__placeholder` divs in the paper page with `<img src="...">`.
5. (Optional) Drop the manuscript PDF at `assets/pdf/papers/<your-slug>.pdf` and uncomment the `pdf-embed` block at the bottom of the page to embed it inline.

## Editing content

Everything is plain HTML — open `index.html` in any text editor and edit the visible copy. There is no build step.

## Local preview

Either open `index.html` directly in a browser (paths are all relative), or serve the directory:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## Style

The aesthetic is Scandinavian / Japandi — warm cream paper, a single clay accent, a sage secondary, soft serifs (Fraunces) for display, Inter for body, JetBrains Mono for the small caps and tags. Colour tokens live at the top of `assets/css/site.css` if you ever want to retune.
