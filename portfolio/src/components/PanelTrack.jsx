import { Children, useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useStage } from '../context/StageContext.jsx'
import { getPanelCount } from '../data/sections.js'
import { trackSpring } from '../motion/easing.js'

const PEEK = 28

function peekFor(panelIndex, count, reducedMotion, isDesktop) {
  if (!isDesktop || reducedMotion || count < 2) return 0
  if (panelIndex >= count - 1) return -PEEK
  return PEEK
}

export default function PanelTrack({ sectionId, children }) {
  const {
    section,
    panelIndexBySection,
    rubberX,
    nudgeX,
    reducedMotion,
    isDesktop,
    viewport,
  } = useStage()
  const items = Children.toArray(children)
  const count = items.length || getPanelCount(section)
  const panelIndex = panelIndexBySection[sectionId] ?? 0
  const w = Math.max(1, viewport.w)
  const isCurrent = section.id === sectionId
  const peek = peekFor(panelIndex, count, reducedMotion, isDesktop)
  const x =
    -panelIndex * w +
    peek +
    (isCurrent && sectionId === 'projects' ? nudgeX : 0) +
    (isCurrent ? rubberX : 0)

  const xSpring = useSpring(0, trackSpring)

  useEffect(() => {
    xSpring.set(x)
  }, [x, xSpring])

  return (
    <div className="h-full min-h-0 w-full overflow-hidden">
      <motion.div
        className="flex h-full"
        style={{ width: count * w, x: reducedMotion ? x : xSpring }}
        data-panel-x={x}
        data-panel-index={panelIndex}
      >
        {items.map((child, i) => (
          <div
            key={child.key ?? i}
            className="h-full min-h-0 shrink-0 overflow-y-auto overscroll-contain"
            style={{ width: w }}
            data-panel-index={i}
          >
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
