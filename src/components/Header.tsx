import { useEffect, useState } from 'react'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'highlights', label: 'Highlights' },
]

interface HeaderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('about')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )
    sections.forEach((s) => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
        <span className="logo-mark" aria-hidden="true">◆</span>
        <span>{"Jais' Portfolio"}</span>
      </a>
      <nav aria-label="Main">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={active === item.id ? 'nav-link nav-link--active' : 'nav-link'}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '☾' : '☀'}
      </button>
    </header>
  )
}
