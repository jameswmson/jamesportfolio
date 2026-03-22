import { useCallback, useRef, useState } from 'react'
import ScrollContainer from './components/ScrollContainer.jsx'
import Timeline from './components/Timeline.jsx'
import CornerDoodles from './components/CornerDoodles.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Projects from './sections/Projects.jsx'
import Skills from './sections/Skills.jsx'
import Contact from './sections/Contact.jsx'

export default function App() {
  const scrollRef = useRef(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  const onActiveChange = useCallback((index) => {
    setActive(index)
  }, [])

  const onScrollProgress = useCallback((p) => {
    setProgress(p)
  }, [])

  const handleSeek = useCallback((index) => {
    scrollRef.current?.seekToIndex(index)
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-paper font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <CornerDoodles />
      <ScrollContainer
        ref={scrollRef}
        onActiveChange={onActiveChange}
        onScrollProgress={onScrollProgress}
      >
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </ScrollContainer>
      <Timeline total={5} active={active} progress={progress} onSeek={handleSeek} />
    </div>
  )
}
