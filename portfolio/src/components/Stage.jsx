import { Children, useLayoutEffect, useEffect, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useStage } from '../context/StageContext.jsx'
import { headingIdFor } from '../data/sections.js'
import { trackSpring } from '../motion/easing.js'

export default function Stage({ children }) {
  const {
    sectionIndex,
    rubberY,
    rubberX,
    panelCount,
    reducedMotion,
    setViewportNode,
    setViewport,
    viewport,
    SECTIONS,
    panelIndexBySection,
  } = useStage()
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    setViewportNode(el)
    const sync = () => {
      setViewport({ w: el.clientWidth, h: el.clientHeight })
    }
    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => ro.disconnect()
  }, [setViewportNode, setViewport])

  const childArray = Children.toArray(children)
  const h = viewport.h || 800
  const y = -sectionIndex * h + rubberY
  const x = panelCount < 2 ? rubberX : 0
  const ySpring = useSpring(0, trackSpring)
  const xSpring = useSpring(0, trackSpring)

  useEffect(() => {
    ySpring.set(y)
    xSpring.set(x)
  }, [y, x, ySpring, xSpring])

  return (
    <div ref={ref} className="relative h-dvh w-full overflow-hidden bg-paper">
      <motion.div
        className="flex w-full flex-col"
        style={{ height: childArray.length * h, y: reducedMotion ? y : ySpring, x: reducedMotion ? x : xSpring }}
        data-stage-y={y}
        data-stage-index={sectionIndex}
      >
        {childArray.map((child, i) => {
          const section = SECTIONS[i]
          const active = i === sectionIndex
          return (
            <div
              key={section?.id ?? i}
              className="w-full shrink-0"
              style={{ height: h }}
              inert={active ? undefined : true}
              aria-hidden={!active}
              data-section={section?.id}
              data-heading={section ? headingIdFor(section, panelIndexBySection[section.id] ?? 0) : undefined}
            >
              {child}
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
