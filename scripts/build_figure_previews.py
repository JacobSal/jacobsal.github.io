#!/usr/bin/env python3
"""
build_figure_previews.py
------------------------
Generate PNG previews for every PDF figure stored under assets/img/papers/.

Usage:
    pip install pymupdf
    python scripts/build_figure_previews.py            # convert any PDF without an up-to-date PNG
    python scripts/build_figure_previews.py --force    # re-convert everything
    python scripts/build_figure_previews.py --dpi 220  # higher-res output (default 180)

For every PDF found at assets/img/papers/<paper-slug>/<name>.pdf
this script writes a sibling PNG at:
    assets/img/papers/<paper-slug>/<name>.png

The PNG is the rendering of the FIRST page of the PDF, since paper figures
in this repo are single-page exports.

PNGs are only regenerated when the source PDF is newer than the existing PNG,
unless --force is passed.
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    import pymupdf  # PyMuPDF >= 1.24 exposes the `pymupdf` package name
except ImportError:                     # older PyMuPDF still uses `fitz`
    try:
        import fitz as pymupdf          # type: ignore
    except ImportError:
        sys.stderr.write(
            "ERROR: PyMuPDF is not installed. Run:  pip install pymupdf\n"
        )
        sys.exit(1)


REPO_ROOT = Path(__file__).resolve().parent.parent
PAPERS_DIR = REPO_ROOT / "assets" / "img" / "papers"


def render_pdf_to_png(pdf_path: Path, png_path: Path, dpi: int) -> None:
    """Render the first page of *pdf_path* into a PNG at *png_path*."""
    with pymupdf.open(pdf_path) as doc:
        if doc.page_count == 0:
            raise RuntimeError(f"{pdf_path}: zero pages")
        page = doc.load_page(0)
        # `dpi` keyword has been supported since PyMuPDF 1.19; fall back if needed.
        try:
            pix = page.get_pixmap(dpi=dpi, alpha=False)
        except TypeError:
            zoom = dpi / 72.0
            mat = pymupdf.Matrix(zoom, zoom)
            pix = page.get_pixmap(matrix=mat, alpha=False)
        png_path.parent.mkdir(parents=True, exist_ok=True)
        pix.save(str(png_path))


def needs_rebuild(pdf_path: Path, png_path: Path, force: bool) -> bool:
    if force:
        return True
    if not png_path.exists():
        return True
    return pdf_path.stat().st_mtime > png_path.stat().st_mtime


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--force", action="store_true",
                        help="Regenerate PNGs even when up to date")
    parser.add_argument("--dpi", type=int, default=180,
                        help="Output rasterisation DPI (default 180)")
    parser.add_argument("--root", type=Path, default=PAPERS_DIR,
                        help="Folder to scan (default: assets/img/papers)")
    args = parser.parse_args()

    if not args.root.exists():
        sys.stderr.write(f"No figures folder at {args.root}\n")
        return 1

    pdfs = sorted(args.root.rglob("*.pdf"))
    if not pdfs:
        print(f"No PDF figures found under {args.root}")
        return 0

    converted = skipped = 0
    for pdf in pdfs:
        png = pdf.with_suffix(".png")
        rel = pdf.relative_to(REPO_ROOT)
        if not needs_rebuild(pdf, png, args.force):
            print(f"  skip   {rel}")
            skipped += 1
            continue
        try:
            render_pdf_to_png(pdf, png, args.dpi)
            print(f"  build  {rel}  ->  {png.name}")
            converted += 1
        except Exception as exc:
            sys.stderr.write(f"  ERROR  {rel}: {exc}\n")

    print(f"\nDone. {converted} converted, {skipped} skipped, {len(pdfs)} total.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
