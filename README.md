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
4. Drop figures into `assets/img/papers/<your-slug>/`. Both formats work:
   - **PDF figures** (preferred for vector originals): drop `figure_1.pdf`, `figure_2_design.pdf`, etc. The CI workflow will rasterise each PDF to a sibling PNG on every push, and the page should reference the PNG with the PDF as the click-through target. See "PDF figure workflow" below.
   - **PNG / JPG figures**: drop them directly and reference them as `<img src="...">`.
5. (Optional) Drop the manuscript PDF at `assets/pdf/papers/<your-slug>.pdf` and uncomment the `pdf-embed` block at the bottom of the page to embed it inline.

## PDF figure workflow

PDFs are the preferred figure format because they are vector and scale beautifully on retina displays. The repo includes a converter at `scripts/build_figure_previews.py` that walks `assets/img/papers/` and renders the first page of every PDF to a sibling PNG.

The converter runs automatically in GitHub Actions on every push (see `.github/workflows/deploy.yml`), so day-to-day you only need to commit the PDFs.

To regenerate previews locally — for example to preview a paper page in your browser before committing:

```bash
pip install pymupdf
python scripts/build_figure_previews.py             # only re-renders changed PDFs
python scripts/build_figure_previews.py --force     # re-render everything
python scripts/build_figure_previews.py --dpi 220   # higher-resolution PNGs
```

In the paper-page HTML, each figure block looks like this — the link wraps the PNG preview and points at the source PDF, and a small "PDF" badge in the corner is added by the CSS:

```html
<figure class="figure figure--pdf">
  <a class="figure__link" href="../assets/img/papers/<slug>/figure_1.pdf" target="_blank" rel="noopener">
    <img src="../assets/img/papers/<slug>/figure_1.png" alt="Figure 1 — short description">
    <span class="figure__badge">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      PDF
    </span>
  </a>
  <figcaption class="figure__caption"><strong>Figure 1.</strong> Caption text.</figcaption>
</figure>
```

For figures that should sit two-up on wider screens, wrap a pair (or any number) in `<div class="figure-grid"> ... </div>`.

## Editing content

Everything is plain HTML — open `index.html` in any text editor and edit the visible copy. There is no build step.

### Adding bullet points to an experience entry

Inside any `<div class="tl-item__body">` (under Experience or Education on the home page) you can use a `<ul>` for bullets or `<ol>` for a numbered list. The styles in `site.css` give you small clay-coloured dots for `<ul>` and clay numerals for `<ol>`.

```html
<li class="tl-item">
  <div class="tl-item__date">Year – Year</div>
  <h4 class="tl-item__title">Role title</h4>
  <div class="tl-item__org">Organisation</div>
  <div class="tl-item__body">
    <p>Optional one-line context paragraph.</p>
    <ul>
      <li>First thing I did in this role.</li>
      <li>Second thing I did, with a measurable result.</li>
      <li>Third thing.</li>
    </ul>
  </div>
</li>
```

Bullets and paragraphs can be mixed freely inside the same body — a paragraph for context followed by a bulleted list of accomplishments works well.

## Local preview

Either open `index.html` directly in a browser (paths are all relative), or serve the directory:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## Style

The aesthetic is Scandinavian / Japandi — warm cream paper, a single clay accent, a sage secondary, soft serifs (Fraunces) for display, Inter for body, JetBrains Mono for the small caps and tags. Colour tokens live at the top of `assets/css/site.css` if you ever want to retune.
