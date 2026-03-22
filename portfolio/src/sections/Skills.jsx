import { motion } from 'framer-motion'
import { skills } from '../data/skills.js'
import { usePortfolioMotion } from '../hooks/usePortfolioMotion.js'

const panelClass =
  'min-w-full h-screen w-full shrink-0 overflow-y-auto text-neutral-900'

export default function Skills() {
  const { sectionFade, skillBadge } = usePortfolioMotion()

  return (
    <section className={`${panelClass} flex flex-col items-center justify-center`}>
      <motion.div
        className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 pb-24 text-center"
        {...sectionFade}
      >
        <h2 className="text-5xl font-serif font-bold tracking-normal text-black md:text-6xl text-center">
          Skills
        </h2>
        <p className="mx-auto mt-4 text-neutral-600 text-center">
          Tools and technologies I reach for most often.
        </p>
        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              {...skillBadge(index)}
              className="rounded-2xl border-2 border-neutral-200 bg-white px-5 py-2.5 text-sm font-bold text-black shadow-sm text-center"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
