import { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { CustomCursor } from './components/CustomCursor'
import { InteractiveBackground } from './components/InteractiveBackground'
import { TechStack } from './components/TechStack'
import { Stats } from './components/Stats'
import { ThemeProvider } from './components/ThemeContext'
import { WelcomeOverlay } from './components/WelcomeOverlay'

export default function App() {
  // Smooth scroll for hash links
  useEffect(() => {
    const handler = (e) => {
      const target = e.target.closest('a')
      if (target?.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const id = target.getAttribute('href').slice(1)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <ThemeProvider>
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden', transition: 'background 0.35s ease, color 0.35s ease' }}>
      <WelcomeOverlay />
      <InteractiveBackground />
      <CustomCursor />

      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Stats />
        <About />
        <TechStack />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      </div>
    </ThemeProvider>
  )
}
