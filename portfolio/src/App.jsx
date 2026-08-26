import { useEffect } from 'react'
import { StageProvider, useStage } from './context/StageContext.jsx'
import { useStageInput } from './hooks/useStageInput.js'
import Stage from './components/Stage.jsx'
import SectionNav from './components/SectionNav.jsx'
import PanelChrome from './components/PanelChrome.jsx'
import Folio from './components/Folio.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Projects from './sections/Projects.jsx'
import Experience from './sections/Experience.jsx'
import Leadership from './sections/Leadership.jsx'
import Skills from './sections/Skills.jsx'
import Contact from './sections/Contact.jsx'

function StageInput() {
  useStageInput()
  return null
}

function MobileSpy() {
  const { isDesktop, quietSection, SECTIONS } = useStage()

  useEffect(() => {
    if (isDesktop) return undefined
    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
    if (!nodes.length) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) quietSection(visible.target.id)
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.15, 0.35, 0.6] },
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [isDesktop, quietSection, SECTIONS])

  return null
}

function Shell() {
  const { isDesktop } = useStage()
  const slides = [
    <Hero key="hero" />,
    <About key="about" />,
    <Projects key="projects" />,
    <Experience key="experience" />,
    <Leadership key="leadership" />,
    <Skills key="skills" />,
    <Contact key="contact" />,
  ]

  return (
    <div className="min-h-dvh bg-paper font-sans text-ink antialiased">
      <a href="#heading-hero" className="skip-link">
        Skip to content
      </a>
      <StageInput />
      <MobileSpy />
      {isDesktop ? <Stage>{slides}</Stage> : <main id="main">{slides}</main>}
      <SectionNav />
      <PanelChrome />
      <Folio />
    </div>
  )
}

export default function App() {
  return (
    <StageProvider>
      <Shell />
    </StageProvider>
  )
}
