import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BlogsPage } from './pages/BlogsPage'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
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
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              theme={theme}
              onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
