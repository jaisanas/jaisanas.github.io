import { focusAreas, stats } from '../data/portfolio'
import { useInView } from '../hooks/useInView'

export function Hero() {
  const { ref, inView } = useInView()

  return (
    <section className="hero" ref={ref as React.RefObject<HTMLElement>}>
      <div className={`hero-content ${inView ? 'is-visible' : ''}`}>
        <p className="hero-eyebrow">Software Engineer · Southeast Asia</p>
        <h1>
          Building scalable systems,
          <span className="hero-gradient"> cloud platforms,</span>
          <br />
          and AI-powered engineering.
        </h1>
        <p className="hero-lead">
          Distributed systems · AWS · Machine learning · Logistics technology
        </p>
        <div className="hero-actions">
          <button type="button" className="btn btn-primary" onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>
            View experience
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            Read introduction
          </button>
        </div>
        <ul className="tag-cloud" aria-label="Focus areas">
          {focusAreas.map((tag) => (
            <li key={tag} className="tag">{tag}</li>
          ))}
        </ul>
      </div>
      <div className={`stats-grid ${inView ? 'is-visible' : ''}`}>
        {stats.map((stat, i) => (
          <article key={stat.label} className="stat-card" style={{ animationDelay: `${i * 80}ms` }}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
            <span className="stat-detail">{stat.detail}</span>
          </article>
        ))}
      </div>
      <div className="hero-glow" aria-hidden="true" />
    </section>
  )
}
