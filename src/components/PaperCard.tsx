import Link from 'next/link'
import { ExternalLink, BookOpen } from 'lucide-react'
import type { Paper } from '@/data/papers'

interface PaperCardProps {
  paper: Paper
  compact?: boolean
}

export default function PaperCard({ paper, compact = false }: PaperCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs text-slate-400 font-mono mb-2">
            {paper.journal} · {paper.year}
          </p>
          <h3 className="font-semibold text-slate-900 leading-snug text-lg">
            {paper.title}
          </h3>
        </div>
        <span className="flex-shrink-0 bg-blue-50 text-blue-700 text-xs font-mono px-2 py-1 rounded">
          {paper.year}
        </span>
      </div>

      <p className="text-slate-500 text-sm leading-relaxed">
        {paper.authors.slice(0, 3).join(', ')}
        {paper.authors.length > 3 ? ' et al.' : ''}
      </p>

      {!compact && (
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
          {paper.abstract}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-auto">
        {paper.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="bg-slate-50 text-slate-600 text-xs px-2.5 py-1 rounded-full border border-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-2 border-t border-slate-100">
        <Link
          href={`/papers/${paper.slug}`}
          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-500 text-sm font-medium transition-colors"
        >
          <BookOpen size={15} />
          Read More
        </Link>
        {paper.doi && (
          <a
            href={`https://doi.org/${paper.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm transition-colors"
          >
            <ExternalLink size={15} />
            DOI
          </a>
        )}
      </div>
    </article>
  )
}
