export const personal = {
  name: 'Jacob Salminen',
  title: 'PhD Candidate · Human Neuromechanics Lab',
  subtitle: 'Biomedical Engineer & Research Scientist',
  summary:
    'I am a research scientist and engineer with expertise in EEG-based neural biomarkers, machine learning, and clinical neuroscience. My work bridges the gap between cutting-edge brain imaging technology and real-world clinical applications — developing distributable, open-source tools that empower researchers to study aging, cognition, and mobility.',
  email: 'jacob.salminen@ufl.edu',
  linkedin: 'https://www.linkedin.com/in/jacob-salminen-124a50129/',
  github: 'https://github.com/JacobSal',
  cv: '/pdfs/CV_JacobSalminen_09082023.pdf',
  photo: '/images/headshot_smile.jpg',
  labPhoto: '/images/hnl_lab.jpg',
}

export const stats = [
  { label: 'Published Papers', value: '2+' },
  { label: 'Years of Research', value: '5+' },
  { label: 'Lab Affiliations', value: '2' },
  { label: 'Open-Source Tools', value: '3+' },
]

export interface SkillCategory {
  title: string
  subtitle: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming & Engineering',
    subtitle: 'Languages and software environments',
    skills: ['MATLAB', 'Python', 'R', 'C/C++', 'C#', 'Bash/Shell', 'TypeScript', 'Git'],
  },
  {
    title: 'Research & Neuroscience',
    subtitle: 'Methods and scientific domains',
    skills: [
      'EEG / Mobile Brain-Body Imaging',
      'Clinical Statistics',
      'Machine Learning & AI',
      'Causal Modeling',
      'Biomechanics',
      'Cognitive Neuroscience',
      'Aging & Neurodegeneration',
    ],
  },
  {
    title: 'Computing & Infrastructure',
    subtitle: 'Systems and platforms',
    skills: [
      'High-Performance / Supercomputing',
      'Docker',
      'Linux / macOS / Windows',
      'Data Pipeline Design',
      'Open-Source Software Development',
    ],
  },
  {
    title: 'Communication & Leadership',
    subtitle: 'Professional and academic skills',
    skills: [
      'Scientific Writing',
      'Grant & Report Writing',
      'Mentorship',
      'Curriculum Development',
      'Public Speaking',
      'Community Outreach',
    ],
  },
]

export interface TimelineEntry {
  title: string
  institution: string
  period: string
  description?: string
  type: 'education' | 'work' | 'volunteer'
}

export const education: TimelineEntry[] = [
  {
    title: 'B.S. Chemical Engineering',
    institution: 'University of Florida',
    period: '2015 – 2019',
    description: 'Undergraduate training in chemical engineering with growing interest in biomedical applications.',
    type: 'education',
  },
  {
    title: 'Ph.D. Biomedical Engineering',
    institution: 'University of Florida — Human Neuromechanics Lab',
    period: '2020 – 2024',
    description:
      'Dissertation focused on EEG-based neural biomarkers of aging and mobility. Developed open-source MATLAB/Python toolsets for mobile brain-body imaging pipelines.',
    type: 'education',
  },
]

export const workExperience: TimelineEntry[] = [
  {
    title: 'Life Guard',
    institution: 'University of Florida & City of Gainesville',
    period: '2016 – 2019',
    description: 'Certified lifeguard during undergraduate years.',
    type: 'work',
  },
  {
    title: 'Applied Machine Learning Engineer',
    institution: 'Best Buy Health Technologies',
    period: '2020 – 2021',
    description:
      'Developed and evaluated machine learning models for health-monitoring devices. Contributed to real-world deployment of ML pipelines in consumer health technology.',
    type: 'work',
  },
  {
    title: 'Graduate Research Assistant',
    institution: 'University of Florida — Human Neuromechanics Lab',
    period: '2020 – Present',
    description:
      'Led multiple NIH-funded studies examining neural correlates of aging and gait. Designed EEG experimental protocols, managed large datasets on HPC clusters, and mentored junior lab members.',
    type: 'work',
  },
  {
    title: 'Volunteer Educator',
    institution: 'Broward County Schools',
    period: '2020 – 2022',
    description: 'STEM outreach and classroom support.',
    type: 'volunteer',
  },
  {
    title: 'Volunteer Educator',
    institution: 'Lake County Schools',
    period: '2023 – Present',
    description: 'Ongoing STEM education outreach in local K-12 schools.',
    type: 'volunteer',
  },
]
