import { motion, useReducedMotion } from 'framer-motion'
import { useHorizontalScroll } from '../context/HorizontalScrollContext.jsx'
import { usePortfolioMotion } from '../hooks/usePortfolioMotion.js'

const panelClass =
  'min-w-full h-screen w-screen shrink-0 overflow-y-auto bg-white text-neutral-900'

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
    <section className={`${panelClass} flex flex-col justify-center`}>
      <motion.div
        className="mx-auto max-w-3xl px-6 pb-24 text-center"
        {...sectionFade}
      >
        <motion.h1
          className="text-4xl font-semibold tracking-tight text-black sm:text-6xl"
          {...item(0)}
        >
          James
        </motion.h1>
        <motion.h2
          className="mt-4 text-lg text-neutral-600 sm:text-xl"
          {...item(0.15)}
        >
          Frontend developer crafting fast, accessible interfaces.
        </motion.h2>
        <motion.div className="mt-10 flex justify-center" {...item(0.3)}>
          <motion.button
            type="button"
            className="inline-flex cursor-pointer rounded-full border-2 border-black bg-black px-8 py-3 text-sm font-medium text-white"
            {...buttonMotion}
            onClick={() => scrollRef?.current?.seekToIndex(1)}
          >
            View my work
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
