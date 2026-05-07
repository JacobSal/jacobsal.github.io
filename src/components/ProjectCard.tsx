import Image from 'next/image'
import { Github, ExternalLink, BookOpen } from 'lucide-react'
import type { Project } from '@/data/projects'

const statusColors = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  completed: 'bg-slate-50 text-slate-600 border-slate-200',
  'on-hold': 'bg-amber-50 text-amber-700 border-amber-200',
}

const statusLabels = {
  active: 'Active',
  completed: 'Completed',
  'on-hold': 'On Hold',
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {project.image && (
        <div className="relative h-44 w-full">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/30" />
        </div>
      )}

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-slate-900 leading-snug">{project.title}</h3>
          <span
            className={`flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border ${statusColors[project.status]}`}
          >
            {statusLabels[project.status]}
          </span>
        </div>

        <p className="text-xs text-slate-400 font-mono">
          {project.startYear}
          {project.endYear ? ` – ${project.endYear}` : project.status === 'active' ? ' – Present' : ''}
        </p>

        <p className="text-slate-600 text-sm leading-relaxed flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-slate-50 text-slate-600 text-xs px-2.5 py-1 rounded-full border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.links && (
          <div className="flex gap-4 pt-2 border-t border-slate-100">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-sm transition-colors"
              >
                <Github size={15} />
                GitHub
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-500 text-sm transition-colors"
              >
                <ExternalLink size={15} />
                Demo
              </a>
            )}
            {project.links.paper && (
              <a
                href={project.links.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-500 text-sm transition-colors"
              >
                <BookOpen size={15} />
                Paper
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
