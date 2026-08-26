import { motion } from 'framer-motion'
import Hairline from '../components/Hairline.jsx'
import MaskHeadline from '../components/MaskHeadline.jsx'
import { skillGroups } from '../data/skills.js'
import { useStage } from '../context/StageContext.jsx'
import { typeEase } from '../motion/easing.js'

export default function Skills() {
  const { reducedMotion, isDesktop, section, sectionDir, lastTravel } = useStage()
  const active = !isDesktop || section.id === 'skills'
  const offsetY = lastTravel === 'section' && isDesktop ? sectionDir * 24 : 0

  return (
    <section
      id="skills"
      className={`flex min-h-full flex-col justify-center px-[clamp(1.5rem,6vw,5rem)] py-20 ${
        isDesktop ? 'h-full overflow-y-auto' : 'min-h-dvh'
      }`}
    >
      <motion.div
        className="mx-auto w-full max-w-6xl"
        initial={reducedMotion ? false : { y: offsetY }}
        animate={{ y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: typeEase }}
      >
        <p className="mb-6 font-sans text-[11px] font-medium tracking-[0.22em] text-folio uppercase">
          Skills
        </p>
        <MaskHeadline
          id="heading-skills"
          active={active}
          reducedMotion={reducedMotion}
          className="font-serif text-5xl leading-[1.05] font-bold tracking-tight text-ink md:text-6xl lg:text-7xl"
        >
          Skills
        </MaskHeadline>
        <Hairline active={active} reducedMotion={reducedMotion} className="mt-8 max-w-xs" />
        <p className="mt-6 max-w-lg text-muted">Languages and tools I use most often.</p>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={reducedMotion ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: reducedMotion ? 0 : 0.45,
                delay: reducedMotion || !active ? 0 : 0.08 * gi,
                ease: typeEase,
              }}
            >
              <h3 className="font-sans text-[11px] font-medium tracking-[0.2em] text-folio uppercase">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((skill) => (
                  <li key={skill} className="text-base text-ink md:text-lg">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
