import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { BlogPagination } from '../components/BlogPagination'
import {
  formatBlogDate,
  getBlogPostsForPage,
  getTotalBlogPages,
} from '../data/blogs'
import { useInView } from '../hooks/useInView'

export function BlogsPage() {
  const { ref, inView } = useInView()
  const { page: pageParam } = useParams()
  const currentPage = pageParam ? Number.parseInt(pageParam, 10) : 1
  const totalPages = getTotalBlogPages()

  const posts = useMemo(
    () => getBlogPostsForPage(currentPage),
    [currentPage],
  )

  if (pageParam && (Number.isNaN(currentPage) || currentPage < 1)) {
    return <Navigate to="/blogs" replace />
  }

  if (currentPage > totalPages) {
    return <Navigate to={totalPages === 1 ? '/blogs' : `/blogs/page/${totalPages}`} replace />
  }

  return (
    <section className="section page-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className={`section-inner ${inView ? 'is-visible' : ''}`}>
        <h1 className="page-title">Blog</h1>
        <p className="page-lead">
          Notes on distributed systems, cloud infrastructure, machine learning, and engineering
          leadership — sorted by date posted.
        </p>

        <ul className="content-list blog-post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="content-card blog-post-card">
                <time className="content-date" dateTime={post.date}>
                  {formatBlogDate(post.date)}
                </time>
                <h2 className="content-card-title">{post.title}</h2>
                <p className="content-card-body blog-post-summary">{post.summary}</p>
                <div className="blog-post-content">
                  {post.content.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
                <ul className="tag-cloud" aria-label="Tags">
                  {post.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>

        <BlogPagination currentPage={currentPage} />
      </div>
    </section>
  )
}
