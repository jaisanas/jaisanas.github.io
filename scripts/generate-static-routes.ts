import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  formatBlogDate,
  getBlogPostsForPage,
  getBlogPagePath,
  getTotalBlogPages,
  POSTS_PER_PAGE,
  blogPosts,
} from '../src/data/blogs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '../dist')
const indexHtml = readFileSync(resolve(distDir, 'index.html'), 'utf8')

function ensureDir(filePath: string) {
  mkdirSync(dirname(filePath), { recursive: true })
}

function copySpaShell(relativeDir: string) {
  const target = resolve(distDir, relativeDir, 'index.html')
  ensureDir(target)
  copyFileSync(resolve(distDir, 'index.html'), target)
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function extractStyles(html: string) {
  return [...html.matchAll(/<link rel="stylesheet"[^>]+>/g)].map((m) => m[0]).join('\n    ')
}

function renderStaticBlogPage(page: number): string {
  const posts = getBlogPostsForPage(page)
  const totalPages = getTotalBlogPages()
  const styles = extractStyles(indexHtml)

  const postMarkup = posts
    .map(
      (post) => `
      <article class="content-card blog-post-card">
        <time class="content-date" datetime="${post.date}">${escapeHtml(formatBlogDate(post.date))}</time>
        <h2 class="content-card-title">${escapeHtml(post.title)}</h2>
        <p class="content-card-body blog-post-summary">${escapeHtml(post.summary)}</p>
        <div class="blog-post-content">
          ${post.content.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n          ')}
        </div>
        <ul class="tag-cloud" aria-label="Tags">
          ${post.tags.map((tag) => `<li class="tag">${escapeHtml(tag)}</li>`).join('\n          ')}
        </ul>
      </article>`,
    )
    .join('\n')

  const pageLinks = Array.from({ length: totalPages }, (_, i) => i + 1)
    .map((pageNumber) => {
      const href = getBlogPagePath(pageNumber)
      const active = pageNumber === page ? ' pagination-link--active' : ''
      return `<a class="pagination-link${active}" href="${href}">${pageNumber}</a>`
    })
    .join('\n        ')

  const prevHref = page > 1 ? getBlogPagePath(page - 1) : null
  const nextHref = page < totalPages ? getBlogPagePath(page + 1) : null

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Blog — page ${page} of ${totalPages}" />
    <title>Blog · Page ${page} · Jais' Portfolio</title>
    ${styles}
  </head>
  <body>
    <div class="app static-blog-app">
      <header class="site-header site-header--scrolled">
        <a href="/" class="logo">
          <span class="logo-mark" aria-hidden="true">◆</span>
          <span>Jais' Portfolio</span>
        </a>
        <nav aria-label="Main">
          <ul class="nav-list">
            <li><a class="nav-link" href="/">Home</a></li>
            <li><a class="nav-link nav-link--active" href="/blogs">Blog</a></li>
            <li><a class="nav-link" href="/projects">Projects</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section class="section page-section">
          <div class="section-inner is-visible">
            <h1 class="page-title">Blog</h1>
            <p class="page-lead">
              ${POSTS_PER_PAGE} posts per page · ${blogPosts.length} total · sorted by date posted (newest first)
            </p>
            <div class="content-list blog-post-list">
              ${postMarkup}
            </div>
            <nav class="blog-pagination static-pagination" aria-label="Blog pagination">
              ${
                prevHref
                  ? `<a class="btn btn-ghost pagination-btn" href="${prevHref}">← Newer posts</a>`
                  : '<span class="btn btn-ghost pagination-btn pagination-btn--disabled">← Newer posts</span>'
              }
              <span class="pagination-status">Page ${page} of ${totalPages}</span>
              ${
                nextHref
                  ? `<a class="btn btn-ghost pagination-btn" href="${nextHref}">Older posts →</a>`
                  : '<span class="btn btn-ghost pagination-btn pagination-btn--disabled">Older posts →</span>'
              }
            </nav>
            <div class="pagination-pages" aria-label="Pages">
              ${pageLinks}
            </div>
          </div>
        </section>
      </main>
      <footer class="site-footer">
        <p>Software Engineer · Distributed systems · Cloud · AI</p>
      </footer>
    </div>
  </body>
</html>`
}

// SPA shells for client-side navigation between app routes
copySpaShell('projects')

const totalPages = getTotalBlogPages()
for (let page = 1; page <= totalPages; page += 1) {
  const relativeDir = page === 1 ? 'blogs' : `blogs/page/${page}`
  const target = resolve(distDir, relativeDir, 'index.html')
  ensureDir(target)
  writeFileSync(target, renderStaticBlogPage(page), 'utf8')
}

console.log(`Generated ${totalPages} static blog page(s) under dist/blogs/`)
