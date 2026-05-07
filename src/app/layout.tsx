import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Jacob Salminen — Research Scientist',
    template: '%s | Jacob Salminen',
  },
  description:
    'Research portfolio of Jacob Salminen, PhD Candidate in Biomedical Engineering at the University of Florida. Expert in EEG, aging, and neural engineering.',
  keywords: ['EEG', 'neuroscience', 'aging', 'biomedical engineering', 'machine learning', 'research'],
  authors: [{ name: 'Jacob Salminen' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jacobsal.github.io',
    siteName: 'Jacob Salminen',
    title: 'Jacob Salminen — Research Scientist',
    description: 'PhD Candidate specializing in EEG biomarkers of aging and neural engineering.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
