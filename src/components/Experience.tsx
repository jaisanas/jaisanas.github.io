import { useMemo, useState } from 'react'
import {
  type Achievement,
  type AchievementCategory,
  categoryLabels,
  workExperiences,
} from '../data/portfolio'
import { useInView } from '../hooks/useInView'

const categories: (AchievementCategory | 'all')[] = [
  'all',
  'ai',
  'cloud',
  'devops',
  'leadership',
]

function filterAchievements(
  achievements: Achievement[],
  filter: AchievementCategory | 'all',
) {
  if (filter === 'all') return achievements
  return achievements.filter((a) => a.category === filter)
}

export function Experience() {
  const { ref, inView } = useInView()
  const [filter, setFilter] = useState<AchievementCategory | 'all'>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const allAchievements = useMemo(
    () => workExperiences.flatMap((job) => job.achievements),
    [],
  )

  const hasAnyFiltered = useMemo(
    () =>
      workExperiences.some(
        (job) => filterAchievements(job.achievements, filter).length > 0,
      ),
    [filter],
  )

  return (
    <>
      <section id="experience" className="section experience" ref={ref as React.RefObject<HTMLElement>}>
        <div className={`section-inner ${inView ? 'is-visible' : ''}`}>
          <h2 className="section-title">
            <span className="section-number">02</span>
            Work Experience
          </h2>

          <div className="filter-bar filter-bar--section" role="tablist" aria-label="Filter achievements by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={filter === cat}
                className={`filter-chip ${filter === cat ? 'filter-chip--active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'all' ? 'All' : categoryLabels[cat]}
              </button>
            ))}
          </div>

          <div className="jobs-stack">
            {workExperiences.map((job) => {
              const filtered = filterAchievements(job.achievements, filter)
              if (filtered.length === 0) return null

              return (
                <article key={`${job.company}-${job.role}`} className="job-card">
                  <header className="job-header">
                    <div>
                      <h3 className="job-role">{job.role}</h3>
                      <p className="job-company">{job.company}</p>
                      {job.period && <p className="job-period">{job.period}</p>}
                    </div>
                    {job.isCurrent ? (
                      <span className="job-badge">Current role</span>
                    ) : (
                      <span className="job-badge job-badge--past">Previous role</span>
                    )}
                  </header>
                  <ul className="achievement-list">
                    {filtered.map((item, index) => {
                      const isOpen = expandedId === item.id
                      return (
                        <li key={item.id} className="achievement-item">
                          <button
                            type="button"
                            className={`achievement-trigger ${isOpen ? 'achievement-trigger--open' : ''}`}
                            onClick={() => setExpandedId(isOpen ? null : item.id)}
                            aria-expanded={isOpen}
                          >
                            <span className="achievement-index">{String(index + 1).padStart(2, '0')}</span>
                            <span className="achievement-summary">
                              {item.highlight && (
                                <span className={`achievement-badge achievement-badge--${item.category}`}>
                                  {categoryLabels[item.category]}
                                </span>
                              )}
                              <span className="achievement-text-preview">
                                {item.highlight ?? `${item.text.slice(0, 100)}…`}
                              </span>
                            </span>
                            {item.metric && (
                              <span className="achievement-metric">{item.metric}</span>
                            )}
                            <span className="achievement-chevron" aria-hidden="true">
                              {isOpen ? '−' : '+'}
                            </span>
                          </button>
                          {isOpen && (
                            <div className="achievement-detail">
                              <p>{item.text}</p>
                              {item.highlight && (
                                <p className="achievement-highlight">
                                  <strong>Key result:</strong> {item.highlight}
                                </p>
                              )}
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </article>
              )
            })}
          </div>

          {!hasAnyFiltered && (
            <p className="empty-filter">No achievements in this category.</p>
          )}
        </div>
      </section>

      <section id="highlights" className="section highlights">
        <div className="section-inner is-visible">
          <h2 className="section-title">
            <span className="section-number">03</span>
            Impact at a glance
          </h2>
          <div className="highlight-cards">
            {allAchievements.map((item) => (
              <article
                key={item.id}
                className={`highlight-card highlight-card--${item.category}`}
              >
                <span className="highlight-metric">{item.metric ?? '—'}</span>
                <p className="highlight-text">{item.highlight ?? item.text.slice(0, 60)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
