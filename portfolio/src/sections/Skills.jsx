import { motion } from 'framer-motion'
import { skills } from '../data/skills.js'
import { usePortfolioMotion } from '../hooks/usePortfolioMotion.js'

const panelClass =
  'min-w-full h-screen w-screen shrink-0 overflow-y-auto bg-white text-neutral-900'

export default function Skills() {
  const { sectionFade, skillBadge } = usePortfolioMotion()

  return (
    <section className={panelClass}>
      <motion.div
        className="mx-auto max-w-4xl px-6 py-14 pb-28 md:py-16"
        {...sectionFade}
      >
        <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
          Skills
        </h2>
        <p className="mt-2 text-neutral-600">
          Tools and technologies I reach for most often.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3 md:justify-start">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              {...skillBadge(index)}
              className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
