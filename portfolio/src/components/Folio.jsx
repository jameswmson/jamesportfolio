import { motion } from 'framer-motion'
import { useStage } from '../context/StageContext.jsx'
import { typeEase } from '../motion/easing.js'
import { SECTIONS } from '../data/sections.js'

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Folio() {
  const { sectionIndex, isDesktop, reducedMotion } = useStage()
  const line = 18

  if (!isDesktop) return null

  return (
    <p className="pointer-events-none fixed top-6 left-6 z-40 hidden font-serif text-sm tracking-[0.22em] text-folio uppercase md:block lg:top-8 lg:left-8">
      James
      <span className="mx-2 text-rule">—</span>
      <span className="relative inline-flex h-[1.15em] w-[1.6em] overflow-hidden align-baseline tabular-nums">
        {reducedMotion ? (
          <span>{pad(sectionIndex + 1)}</span>
        ) : (
          <motion.span
            className="flex flex-col"
            animate={{ y: -sectionIndex * line }}
            transition={{ duration: 0.4, ease: typeEase }}
          >
            {SECTIONS.map((_, i) => (
              <span key={i} className="block h-[18px] leading-[18px]">
                {pad(i + 1)}
              </span>
            ))}
          </motion.span>
        )}
      </span>
    </p>
  )
}
