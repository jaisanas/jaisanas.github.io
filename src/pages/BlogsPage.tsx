import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogs'
import { useInView } from '../hooks/useInView'

export function BlogsPage() {
  const { ref, inView } = useInView()

  return (
    <section className="section page-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className={`section-inner ${inView ? 'is-visible' : ''}`}>
        <h1 className="page-title">Blog</h1>
        <p className="page-lead">
          Notes on distributed systems, cloud infrastructure, machine learning, and engineering leadership.
        </p>

        {blogPosts.length === 0 ? (
          <div className="empty-state">
            <p>New posts are on the way. Check back soon.</p>
            <Link to="/" className="btn btn-ghost">
              Back to home
            </Link>
          </div>
        ) : (
          <ul className="content-list">
            {blogPosts.map((post) => (
              <li key={post.slug}>
                <article className="content-card">
                  <time className="content-date" dateTime={post.date}>
                    {post.date}
                  </time>
                  <h2 className="content-card-title">{post.title}</h2>
                  <p className="content-card-body">{post.summary}</p>
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
        )}
      </div>
    </section>
  )
}
