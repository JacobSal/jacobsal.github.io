import Image from 'next/image'
import { personal, stats } from '@/data/resume'

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-mono text-sm uppercase tracking-widest mb-2">Get to know me</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">About Me</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Lab photo */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video lg:aspect-square">
            <Image
              src={personal.labPhoto}
              alt="Human Neuromechanics Lab"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-white text-sm font-medium">Human Neuromechanics Lab, University of Florida</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {personal.summary}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-slate-50 rounded-xl p-5 border border-slate-100"
                >
                  <p className="text-3xl font-bold text-blue-600 mb-1">{value}</p>
                  <p className="text-slate-500 text-sm">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={personal.cv}
                download
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Download CV
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 border border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {personal.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
