import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ArrowLeft, ExternalLink, Tag } from 'lucide-react'
import { getPaperBySlug, getPaperSlugs } from '@/lib/mdx'
import { papers as staticPapers } from '@/data/papers'

export async function generateStaticParams() {
  const mdxSlugs = getPaperSlugs()
  const staticSlugs = staticPapers.map((p) => p.slug)
  const all = Array.from(new Set([...mdxSlugs, ...staticSlugs]))
  return all.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const mdxPaper = getPaperBySlug(slug)
  const staticPaper = staticPapers.find((p) => p.slug === slug)
  const paper = mdxPaper ?? staticPaper
  if (!paper) return {}
  return {
    title: paper.title,
    description: paper.abstract,
  }
}

export default async function PaperDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const mdxPaper = getPaperBySlug(slug)
  const staticPaper = staticPapers.find((p) => p.slug === slug)

  if (!mdxPaper && !staticPaper) notFound()

  const paper = mdxPaper ?? staticPaper!
  const hasContent = mdxPaper && mdxPaper.content.trim().length > 0

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Back link */}
        <Link
          href="/papers"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          All Papers
        </Link>

        {/* Paper header */}
        <header className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {paper.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full border border-blue-100"
              >
                <Tag size={11} />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-4">
            {paper.title}
          </h1>

          <p className="text-slate-600 text-sm mb-2">
            {paper.authors.join(', ')}
          </p>
          <p className="text-blue-600 font-medium text-sm mb-6">
            {paper.journal} · {paper.year}
          </p>

          {paper.doi && (
            <a
              href={`https://doi.org/${paper.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink size={15} />
              View on DOI: {paper.doi}
            </a>
          )}
        </header>

        {/* Abstract */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 mb-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Abstract</h2>
          <p className="text-slate-700 leading-relaxed">{paper.abstract}</p>
        </section>

        {/* PDF embed */}
        {'pdfEmbed' in paper && paper.pdfEmbed && (
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 mb-8">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Full Paper
            </h2>
            <iframe
              src={paper.pdfEmbed}
              className="w-full rounded-lg border border-slate-200"
              style={{ height: '80vh' }}
              title={paper.title}
            />
          </section>
        )}

        {/* Figures */}
        {'figures' in paper && paper.figures && paper.figures.length > 0 && (
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 mb-8">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Figures</h2>
            <div className="space-y-10">
              {paper.figures.map((fig, i) => (
                <figure key={i}>
                  <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image
                      src={fig.src}
                      alt={fig.caption}
                      width={900}
                      height={500}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-slate-500 text-center italic">
                    Figure {i + 1}: {fig.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* MDX content (blurb / discussion) */}
        {hasContent && (
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
              Research Notes
            </h2>
            <div className="prose prose-slate max-w-none">
              <MDXRemote source={mdxPaper!.content} />
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
