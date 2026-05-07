import type { Metadata } from 'next'
import PaperCard from '@/components/PaperCard'
import { papers } from '@/data/papers'

export const metadata: Metadata = {
  title: 'Research Papers',
  description: 'Published research by Jacob Salminen in EEG, aging, and neural engineering.',
}

export default function PapersPage() {
  const byYear = papers.reduce<Record<number, typeof papers>>((acc, p) => {
    acc[p.year] = acc[p.year] ?? []
    acc[p.year].push(p)
    return acc
  }, {})
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-3">Publications</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Research Papers</h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Peer-reviewed publications spanning EEG biomarkers, aging neuroscience, and
            open-source scientific software.
          </p>
        </div>
      </div>

      {/* Papers list */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {papers.length === 0 ? (
          <p className="text-slate-500 text-center py-12">Papers coming soon.</p>
        ) : (
          <div className="space-y-16">
            {years.map((year) => (
              <section key={year}>
                <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-8">
                  {year}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {byYear[year].map((paper) => (
                    <PaperCard key={paper.slug} paper={paper} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
