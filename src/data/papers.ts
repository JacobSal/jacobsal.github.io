export interface Paper {
  slug: string
  title: string
  authors: string[]
  journal: string
  year: number
  abstract: string
  doi?: string
  link?: string
  tags: string[]
  featured?: boolean
}

export const papers: Paper[] = [
  {
    slug: 'eeg-aging-gait-2023',
    title:
      'EEG Biomarkers of Cognitive-Motor Integration During Gait in Healthy Aging Adults',
    authors: ['Jacob Salminen', 'Collaborator A', 'Collaborator B', 'PI Name'],
    journal: 'Journal of Neural Engineering',
    year: 2023,
    abstract:
      'This study investigates electroencephalographic (EEG) signatures associated with cognitive-motor integration during overground walking in healthy older adults. Using mobile brain-body imaging, we identified age-related changes in spectral power and connectivity that distinguish older from younger adults during dual-task gait conditions.',
    doi: '10.1088/placeholder',
    tags: ['EEG', 'Aging', 'Gait', 'Cognitive-Motor Integration', 'Mobile Brain-Body Imaging'],
    featured: true,
  },
  {
    slug: 'neural-engineering-toolbox-2024',
    title:
      'An Open-Source MATLAB Toolbox for Mobile Brain-Body Imaging Data Analysis',
    authors: ['Jacob Salminen', 'Collaborator C', 'PI Name'],
    journal: 'Journal of Open Source Software',
    year: 2024,
    abstract:
      'We present MoBILAB-JS, an open-source MATLAB/Python toolbox designed to streamline preprocessing, analysis, and visualization of simultaneous EEG and biomechanical data collected during ecological movement tasks. The toolbox is optimized for high-performance computing clusters and reproducible research workflows.',
    doi: '10.21105/placeholder',
    tags: ['EEG', 'Open Source', 'MATLAB', 'Toolbox', 'Reproducible Research', 'HPC'],
    featured: true,
  },
]
