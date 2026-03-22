import { motion, useReducedMotion } from 'framer-motion'
import { useHorizontalScroll } from '../context/HorizontalScrollContext.jsx'
import { usePortfolioMotion } from '../hooks/usePortfolioMotion.js'

const panelClass =
  'min-w-full h-screen w-full shrink-0 overflow-y-auto text-neutral-900'

export default function Hero() {
  const reduced = useReducedMotion()
  const scrollRef = useHorizontalScroll()
  const { sectionFade, buttonMotion } = usePortfolioMotion()

  const item = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay },
        }

  return (
    <section className={`${panelClass} flex flex-col items-center justify-center overflow-hidden`}>
      <motion.div
        className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 pb-24 text-center"
        {...sectionFade}
      >
        <motion.h1
          className="mb-2 text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-serif font-bold tracking-normal text-black text-center whitespace-nowrap"
          {...item(0)}
        >
          James Williamson
        </motion.h1>
        <motion.h2
          className="mt-6 text-2xl text-neutral-600 sm:text-3xl lg:text-4xl text-center"
          {...item(0.15)}
        >
          First Year Computer Science Student @ Western University
        </motion.h2>
      </motion.div>
    </section>
  )
}
