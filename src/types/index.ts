export interface Skill {
  name: string
  level: number
  category: SkillCategory
}

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'cloud' | 'devops'

export interface Project {
  id: number
  title: string
  slug: string
  description: string
  longDescription?: string
  technologies: string[]
  link?: string
  github?: string
  featured?: boolean
  image?: string
  videoUrl?: string
  highlights?: string[]
  challenges?: Array<{
    title: string
    description: string
    solution: string
  }>
}

export interface Experience {
  id: number
  company: string
  position: string
  period: string
  description: string
  current?: boolean
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}
