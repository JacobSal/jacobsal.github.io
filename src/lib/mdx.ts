import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PAPERS_DIR = path.join(process.cwd(), 'content', 'papers')

export interface PaperMeta {
  slug: string
  title: string
  authors: string[]
  journal: string
  year: number
  abstract: string
  doi?: string
  tags: string[]
  figures?: { src: string; caption: string }[]
  pdfEmbed?: string
}

export interface PaperWithContent extends PaperMeta {
  content: string
}

export function getPaperSlugs(): string[] {
  if (!fs.existsSync(PAPERS_DIR)) return []
  return fs
    .readdirSync(PAPERS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getPaperBySlug(slug: string): PaperWithContent | null {
  const filePath = path.join(PAPERS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? '',
    authors: data.authors ?? [],
    journal: data.journal ?? '',
    year: data.year ?? new Date().getFullYear(),
    abstract: data.abstract ?? '',
    doi: data.doi,
    tags: data.tags ?? [],
    figures: data.figures ?? [],
    pdfEmbed: data.pdfEmbed,
    content,
  }
}

export function getAllPapers(): PaperMeta[] {
  return getPaperSlugs()
    .map((slug) => {
      const paper = getPaperBySlug(slug)
      if (!paper) return null
      const { content: _content, ...meta } = paper
      return meta
    })
    .filter(Boolean) as PaperMeta[]
}
