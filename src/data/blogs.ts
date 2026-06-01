export interface BlogPost {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
}

export const blogPosts: BlogPost[] = []
