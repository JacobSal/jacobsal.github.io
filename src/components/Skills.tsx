import { skillCategories } from '@/data/resume'

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-mono text-sm uppercase tracking-widest mb-2">What I bring</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Skills & Expertise</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-1">{cat.title}</h3>
              <p className="text-slate-500 text-sm mb-5">{cat.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
