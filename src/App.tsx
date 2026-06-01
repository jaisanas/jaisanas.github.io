import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import './App.css'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = localStorage.getItem('portfolio-theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))} />
      <main>
        <Hero />
        <About />
        <Experience />
      </main>
      <footer className="site-footer">
        <p>Software Engineer · Distributed systems · Cloud · AI</p>
      </footer>
    </div>
  )
}

export default App
