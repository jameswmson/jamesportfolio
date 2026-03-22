import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { usePortfolioMotion } from '../hooks/usePortfolioMotion.js'

const panelClass =
  'min-w-full h-screen w-full shrink-0 overflow-y-auto text-neutral-900'

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
    <section id="about-panel" className={`${panelClass} flex flex-col items-center justify-center`}>
      <motion.div
        className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-8 px-6 pb-24 text-center"
        {...sectionFade}
      >
        <motion.div
          className="w-40 shrink-0 sm:w-56"
          {...slideLeft}
        >
          <img
            src={photoSrc}
            alt="Portrait"
            className="mx-auto aspect-square w-full rounded-full object-cover shadow-lg ring-1 ring-neutral-200"
            onError={() => setPhotoSrc('/avatar-placeholder.svg')}
          />
        </motion.div>
        <motion.div className="w-full flex flex-col items-center" {...slideRight}>
          <h2 className="text-5xl font-serif font-bold tracking-normal text-black md:text-6xl text-center">
            About
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg text-center">
            Hey! I&apos;m James, a developer who&apos;s passionate about turning ideas into solutions. I am in my First Year at Western University studying computer science, I enjoy building projects, solving problems, exploring the world, and playing games.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg text-center">
            I&apos;m also a big believer in community engagement and love meeting new people, so feel free to reach out!
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
