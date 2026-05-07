import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, Github, FileText, ArrowDown } from 'lucide-react'
import { personal } from '@/data/resume'

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-16">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-blue-400 font-mono text-sm mb-4 tracking-widest uppercase">
            PhD Candidate · Human Neuromechanics Lab · UF
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {personal.name}
          </h1>
          <p className="text-xl text-slate-300 mb-4 font-medium">
            {personal.subtitle}
          </p>
          <p className="text-slate-400 leading-relaxed max-w-xl mb-10 mx-auto lg:mx-0">
            {personal.summary}
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href={personal.cv}
              download
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <FileText size={18} />
              Download CV
            </a>
            <Link
              href="/papers"
              className="inline-flex items-center gap-2 border border-slate-600 hover:border-blue-400 text-slate-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Research
            </Link>
          </div>

          <div className="flex items-center gap-5 mt-8 justify-center lg:justify-start">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
          </div>
        </div>

        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-2xl">
            <Image
              src={personal.photo}
              alt={personal.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-slate-300 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  )
}
