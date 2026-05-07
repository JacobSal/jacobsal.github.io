import Link from 'next/link'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Timeline from '@/components/Timeline'
import PaperCard from '@/components/PaperCard'
import ProjectCard from '@/components/ProjectCard'
import { education, workExperience } from '@/data/resume'
import { papers } from '@/data/papers'
import { projects } from '@/data/projects'

export default function HomePage() {
  const featuredPapers = papers.filter((p) => p.featured).slice(0, 3)
  const activeProjects = projects.filter((p) => p.status === 'active').slice(0, 3)

  return (
    <>
      <Hero />
      <About />
      <Skills />

      {/* Education & Experience */}
      <section id="experience" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-mono text-sm uppercase tracking-widest mb-2">Background</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Education & Experience</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <Timeline entries={education} title="Education" subtitle="Academic journey" />
            <Timeline entries={workExperience} title="Work & Service" subtitle="Professional record" />
          </div>
        </div>
      </section>

      {/* Featured Papers */}
      {featuredPapers.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-blue-600 font-mono text-sm uppercase tracking-widest mb-2">Publications</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Featured Research</h2>
              </div>
              <Link
                href="/papers"
                className="text-blue-600 hover:text-blue-500 text-sm font-medium transition-colors"
              >
                View all papers →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPapers.map((paper) => (
                <PaperCard key={paper.slug} paper={paper} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Active Projects */}
      {activeProjects.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-blue-600 font-mono text-sm uppercase tracking-widest mb-2">Current work</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Active Projects</h2>
              </div>
              <Link
                href="/projects"
                className="text-blue-600 hover:text-blue-500 text-sm font-medium transition-colors"
              >
                View all projects →
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
