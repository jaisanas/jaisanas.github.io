export interface BlogPost {
  slug: string
  title: string
  date: string
  summary: string
  content: string[]
  tags: string[]
}

export const POSTS_PER_PAGE = 5

const LOREM_PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
  'Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis.',
  'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean ultricies mi vitae est.',
]

const TITLE_PREFIXES = [
  'Designing resilient',
  'Lessons from scaling',
  'Observability patterns for',
  'Cost-aware architecture in',
  'Shipping faster with',
  'Data pipelines and',
  'Practical guide to',
  'Reflections on',
]

const TITLE_SUFFIXES = [
  'distributed systems',
  'cloud-native platforms',
  'engineering teams',
  'machine learning workflows',
  'container orchestration',
  'event-driven backends',
  'high-availability services',
  'CI/CD automation',
]

const TAG_POOL = [
  'Distributed Systems',
  'AWS',
  'Docker',
  'Node.js',
  'Machine Learning',
  'DevOps',
  'NATS',
  'Platform Engineering',
]

function pick<T>(items: T[], index: number): T {
  return items[index % items.length]
}

function formatDisplayDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function generateBlogPosts(count: number): BlogPost[] {
  const posts: BlogPost[] = []
  const start = new Date('2024-01-10T10:00:00Z')

  for (let i = 0; i < count; i++) {
    const postedAt = new Date(start)
    postedAt.setDate(postedAt.getDate() + i * 12)
    const isoDate = postedAt.toISOString().slice(0, 10)
    const paragraphCount = 2 + (i % 3)

    posts.push({
      slug: `post-${count - i}`,
      title: `${pick(TITLE_PREFIXES, i)} ${pick(TITLE_SUFFIXES, i + 3)}`,
      date: isoDate,
      summary: LOREM_PARAGRAPHS[i % LOREM_PARAGRAPHS.length],
      content: Array.from({ length: paragraphCount }, (_, p) =>
        LOREM_PARAGRAPHS[(i + p) % LOREM_PARAGRAPHS.length],
      ),
      tags: [
        pick(TAG_POOL, i),
        pick(TAG_POOL, i + 2),
        pick(TAG_POOL, i + 4),
      ],
    })
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export const blogPosts: BlogPost[] = generateBlogPosts(24)

export function getTotalBlogPages(): number {
  return Math.max(1, Math.ceil(blogPosts.length / POSTS_PER_PAGE))
}

export function getBlogPostsForPage(page: number): BlogPost[] {
  const totalPages = getTotalBlogPages()
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * POSTS_PER_PAGE
  return blogPosts.slice(start, start + POSTS_PER_PAGE)
}

export function formatBlogDate(isoDate: string): string {
  return formatDisplayDate(isoDate)
}

export function getBlogPagePath(page: number): string {
  return page <= 1 ? '/blogs' : `/blogs/page/${page}`
}
