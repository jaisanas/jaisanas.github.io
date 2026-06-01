import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { useInView } from '../hooks/useInView'

export function ProjectsPage() {
  const { ref, inView } = useInView()

  return (
    <section className="section page-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className={`section-inner ${inView ? 'is-visible' : ''}`}>
        <h1 className="page-title">Projects</h1>
        <p className="page-lead">
          Selected work across backend systems, cloud platforms, data pipelines, and AI-assisted tooling.
        </p>

        {projects.length === 0 ? (
          <div className="empty-state">
            <p>Project write-ups coming soon.</p>
            <Link to="/" className="btn btn-ghost">
              Back to home
            </Link>
          </div>
        ) : (
          <ul className="content-list">
            {projects.map((project) => (
              <li key={project.slug}>
                <article className="content-card">
                  <h2 className="content-card-title">
                    {project.href ? (
                      <a href={project.href} target="_blank" rel="noreferrer">
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h2>
                  <p className="content-card-body">{project.description}</p>
                  <ul className="tag-cloud" aria-label="Technologies">
                    {project.tags.map((tag) => (
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
