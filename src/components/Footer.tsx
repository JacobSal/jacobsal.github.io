import Link from 'next/link'
import { Linkedin, Github, Mail } from 'lucide-react'
import { personal } from '@/data/resume'

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="text-white font-bold text-lg mb-2">Jacob Salminen</p>
            <p className="text-sm leading-relaxed">
              PhD Candidate · Human Neuromechanics Lab<br />
              University of Florida
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Navigation</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/papers', label: 'Research Papers' },
                { href: '/projects', label: 'Projects' },
                { href: personal.cv, label: 'Download CV', download: true },
              ].map(({ href, label, download }) => (
                <li key={href}>
                  <a
                    href={href}
                    download={download}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Connect</p>
            <div className="space-y-3">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Mail size={16} />
                {personal.email}
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs">
          <p>© {new Date().getFullYear()} Jacob Salminen. Built with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
