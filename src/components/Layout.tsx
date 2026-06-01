import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'

interface LayoutProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Layout({ theme, onToggleTheme }: LayoutProps) {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={onToggleTheme} isHome={isHome} />
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Software Engineer · Distributed systems · Cloud · AI</p>
      </footer>
    </div>
  )
}
