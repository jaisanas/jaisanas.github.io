import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

type NavItem =
  | { kind: 'route'; to: string; label: string; end?: boolean }
  | { kind: 'section'; id: string; label: string }

const navItems: NavItem[] = [
  { kind: 'route', to: '/', label: 'Home', end: true },
  { kind: 'section', id: 'about', label: 'About' },
  { kind: 'section', id: 'experience', label: 'Experiences' },
  { kind: 'section', id: 'highlights', label: 'Highlights' },
  { kind: 'route', to: '/projects', label: 'Projects' },
  { kind: 'route', to: '/blogs', label: 'Blogs' },
]

const sectionIds = navItems
  .filter((item): item is Extract<NavItem, { kind: 'section' }> => item.kind === 'section')
  .map((item) => item.id)

interface HeaderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  isHome: boolean
}

export function Header({ theme, onToggleTheme, isHome }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return

    const sections = sectionIds.map((id) => document.getElementById(id))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )
    sections.forEach((s) => s && observer.observe(s))
    return () => observer.disconnect()
  }, [isHome, location.pathname])

  const scrollTo = (id: string) => {
    if (!isHome) {
      navigate('/')
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <NavLink to="/" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="logo-mark" aria-hidden="true">◆</span>
        <span>{"Jais' Portfolio"}</span>
      </NavLink>
      <nav aria-label="Main">
        <ul className="nav-list">
          {navItems.map((item) =>
            item.kind === 'route' ? (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link--active' : 'nav-link'
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ) : (
              <li key={item.id}>
                <button
                  type="button"
                  className={
                    isHome && activeSection === item.id
                      ? 'nav-link nav-link--active'
                      : 'nav-link'
                  }
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ),
          )}
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
