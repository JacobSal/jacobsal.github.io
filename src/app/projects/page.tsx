import type { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Current and past research and engineering projects by Jacob Salminen.',
}

export default function ProjectsPage() {
  const active = projects.filter((p) => p.status === 'active')
  const completed = projects.filter((p) => p.status === 'completed')
  const onHold = projects.filter((p) => p.status === 'on-hold')

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-3">Work</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Projects</h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Research initiatives, open-source tools, and engineering work — past and present.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {active.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-8">
              Active Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {active.map((p) => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </section>
        )}

        {completed.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-8">
              Completed
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completed.map((p) => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </section>
        )}

        {onHold.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-8">
              On Hold
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onHold.map((p) => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
