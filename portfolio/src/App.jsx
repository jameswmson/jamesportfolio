import BackdropLines from './components/BackdropLines.jsx'
import Folio from './components/Folio.jsx'
import PanelChrome from './components/PanelChrome.jsx'
import SectionNav from './components/SectionNav.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import Experience from './sections/Experience.jsx'
import Hero from './sections/Hero.jsx'
import Leadership from './sections/Leadership.jsx'
import Projects from './sections/Projects.jsx'
import Skills from './sections/Skills.jsx'
import { experience } from './data/experience.js'
import { leadership } from './data/leadership.js'
import { projects } from './data/projects.js'
import { sections } from './data/sections.js'
import { useStage } from './hooks/useStage.js'

// cards per section, in section order
const COUNTS = [1, 1, projects.length, experience.length, leadership.length, 1, 1]

export default function App() {
  const { section, setSection, panels, panel, panelCount, stepPanel, viewport } = useStage(COUNTS)

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-ink">
      <a className="skip-link" href="#contact">
        Skip to contact
      </a>
      <BackdropLines />

      <div
        className="stage-track flex w-full flex-col"
        style={{
          height: `${sections.length * 100}%`,
          transform: `translateY(${(-section * 100) / sections.length}%)`,
          transition: 'transform 680ms var(--ease-stage)',
        }}
      >
        <Hero />
        <About viewport={viewport} />
        <Projects panel={panels[2]} viewport={viewport} />
        <Experience panel={panels[3]} viewport={viewport} />
        <Leadership panel={panels[4]} viewport={viewport} />
        <Skills viewport={viewport} />
        <Contact />
      </div>

      <Folio section={section} />
      <SectionNav section={section} onSelect={setSection} />
      <PanelChrome panel={panel} count={panelCount} onStep={stepPanel} />
    </div>
  )
}
