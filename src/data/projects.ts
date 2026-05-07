export interface Project {
  slug: string
  title: string
  description: string
  status: 'active' | 'completed' | 'on-hold'
  tags: string[]
  links?: {
    github?: string
    demo?: string
    paper?: string
  }
  startYear: number
  endYear?: number
  image?: string
}

export const projects: Project[] = [
  {
    slug: 'mind-in-motion',
    title: 'Mind in Motion: Neural Correlates of Aging and Mobility',
    description:
      'NIH-funded longitudinal study examining how EEG-derived biomarkers of brain function predict fall risk and cognitive decline in community-dwelling older adults. Combining mobile EEG, motion capture, and clinical assessments across multiple visits.',
    status: 'active',
    tags: ['EEG', 'Aging', 'Fall Risk', 'Longitudinal Study', 'NIH'],
    startYear: 2021,
    image: '/images/hnl_lab.jpg',
  },
  {
    slug: 'eeg-pipeline-hpc',
    title: 'Scalable EEG Preprocessing Pipelines for HPC',
    description:
      'Development of containerized, parallelized EEG preprocessing pipelines that run on SLURM-managed HPC clusters. The system supports automated ICA-based artifact removal, source localization, and spectral analysis for large cohort studies (N > 100 participants).',
    status: 'active',
    tags: ['EEG', 'HPC', 'MATLAB', 'Python', 'Docker', 'Open Source'],
    links: {
      github: 'https://github.com/JacobSal',
    },
    startYear: 2022,
  },
  {
    slug: 'ml-health-monitoring',
    title: 'Machine Learning for Passive Health Monitoring',
    description:
      'Applied ML engineering work at Best Buy Health Technologies — developing and validating models that detect health events (falls, cardiac irregularities) from wearable sensor streams in real-world home environments.',
    status: 'completed',
    tags: ['Machine Learning', 'Wearables', 'Health Tech', 'Industry'],
    startYear: 2020,
    endYear: 2021,
  },
  {
    slug: 'stem-outreach',
    title: 'K-12 STEM Outreach & Curriculum Development',
    description:
      'Designing and delivering neuroscience and engineering curriculum modules for K-12 students in Broward and Lake Counties. Goal: demystify brain science and inspire underrepresented students to pursue STEM careers.',
    status: 'active',
    tags: ['Education', 'Outreach', 'Neuroscience', 'K-12'],
    startYear: 2020,
  },
]
