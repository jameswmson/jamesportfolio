import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { usePortfolioMotion } from '../hooks/usePortfolioMotion.js'

const panelClass =
  'min-w-full h-screen w-screen shrink-0 overflow-y-auto bg-white text-neutral-900'

export default function About() {
  const reduced = useReducedMotion()
  const { sectionFade } = usePortfolioMotion()
  const [photoSrc, setPhotoSrc] = useState('/avatar.jpg')

  const slideLeft = reduced
    ? {}
    : {
        initial: { opacity: 0, x: -40 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.45 },
      }

  const slideRight = reduced
    ? {}
    : {
        initial: { opacity: 0, x: 40 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.45 },
      }

  return (
    <section id="about-panel" className={panelClass}>
      <motion.div
        className="mx-auto flex h-full max-w-5xl flex-col items-center gap-10 px-6 py-16 pb-28 md:flex-row md:items-center md:justify-center md:py-12"
        {...sectionFade}
      >
        <motion.div
          className="w-full max-w-xs shrink-0 md:w-2/5"
          {...slideLeft}
        >
          <img
            src={photoSrc}
            alt="Portrait"
            className="aspect-square w-full rounded-2xl object-cover shadow-lg ring-1 ring-neutral-200"
            onError={() => setPhotoSrc('/avatar-placeholder.svg')}
          />
        </motion.div>
        <motion.div className="w-full md:w-3/5 md:pl-4" {...slideRight}>
          <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
            About
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-700 md:text-lg">
            I&apos;m a frontend-focused developer who enjoys turning complex problems
            into clear, performant interfaces. I care about accessibility,
            maintainable code, and collaboration with design and product teams.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-700 md:text-lg">
            Replace this bio with your story, then drop your own{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm text-black ring-1 ring-neutral-200">
              avatar.jpg
            </code>{' '}
            into{' '}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm text-black ring-1 ring-neutral-200">
              public/
            </code>{' '}
            to override the placeholder.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
