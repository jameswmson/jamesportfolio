import { useCallback, useState } from 'react'
import ScrollContainer from './components/ScrollContainer.jsx'
import NavDots from './components/NavDots.jsx'

const PANEL_CLASSES = [
  'bg-rose-600',
  'bg-amber-500',
  'bg-emerald-600',
  'bg-sky-600',
  'bg-violet-700',
]

export default function App() {
  const [active, setActive] = useState(0)
  const onActiveChange = useCallback((index) => {
    setActive(index)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ScrollContainer onActiveChange={onActiveChange}>
        {PANEL_CLASSES.map((bg, i) => (
          <div
            key={i}
            className={`min-w-full h-screen w-screen flex-shrink-0 snap-start ${bg}`}
          />
        ))}
      </ScrollContainer>
      <NavDots total={PANEL_CLASSES.length} active={active} />
    </div>
  )
}
