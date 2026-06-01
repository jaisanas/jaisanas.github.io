import { useState } from 'react'
import { introParagraphs } from '../data/portfolio'
import { useInView } from '../hooks/useInView'

export function About() {
  const { ref, inView } = useInView()
  const [expanded, setExpanded] = useState(false)
  const visibleCount = expanded ? introParagraphs.length : 2

  return (
    <section id="about" className="section about" ref={ref as React.RefObject<HTMLElement>}>
      <div className={`section-inner ${inView ? 'is-visible' : ''}`}>
        <h2 className="section-title">
          <span className="section-number">01</span>
          Introduction
        </h2>
        <div className="about-grid">
          {introParagraphs.slice(0, visibleCount).map((p, i) => (
            <p key={i} className="about-paragraph">{p}</p>
          ))}
        </div>
        {introParagraphs.length > 2 && (
          <button
            type="button"
            className="btn btn-ghost expand-btn"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : `Read ${introParagraphs.length - 2} more paragraphs`}
          </button>
        )}
      </div>
    </section>
  )
}
