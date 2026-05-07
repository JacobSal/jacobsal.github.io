import type { TimelineEntry } from '@/data/resume'
import { GraduationCap, Briefcase, Heart } from 'lucide-react'

interface TimelineProps {
  entries: TimelineEntry[]
  title: string
  subtitle: string
}

const iconMap = {
  education: GraduationCap,
  work: Briefcase,
  volunteer: Heart,
}

const colorMap = {
  education: 'bg-blue-500',
  work: 'bg-slate-700',
  volunteer: 'bg-emerald-500',
}

export default function Timeline({ entries, title, subtitle }: TimelineProps) {
  return (
    <div>
      <p className="text-blue-600 font-mono text-sm uppercase tracking-widest mb-2">{subtitle}</p>
      <h3 className="text-2xl font-bold text-slate-900 mb-10">{title}</h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200" />

        <div className="space-y-8">
          {entries.map((entry, i) => {
            const Icon = iconMap[entry.type]
            const color = colorMap[entry.type]
            return (
              <div key={i} className="relative flex gap-6 pl-0">
                {/* Dot */}
                <div
                  className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full ${color} flex items-center justify-center shadow-md`}
                >
                  <Icon size={18} className="text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl p-5 border border-slate-100 shadow-sm mt-0.5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-slate-900">{entry.title}</h4>
                    <span className="text-xs text-slate-400 font-mono whitespace-nowrap bg-slate-50 px-2 py-1 rounded">
                      {entry.period}
                    </span>
                  </div>
                  <p className="text-blue-600 text-sm font-medium mb-2">{entry.institution}</p>
                  {entry.description && (
                    <p className="text-slate-500 text-sm leading-relaxed">{entry.description}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
