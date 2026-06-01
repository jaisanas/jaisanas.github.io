export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  href?: string
}

export const projects: Project[] = []
