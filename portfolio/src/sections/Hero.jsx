import { motion } from 'framer-motion'
import MaskHeadline from '../components/MaskHeadline.jsx'
import { useStage } from '../context/StageContext.jsx'
import { typeEase } from '../motion/easing.js'

export default function Hero() {
  const { reducedMotion, hasInteracted, isDesktop } = useStage()

  return (
    <section
      id="hero"
      className={`relative flex min-h-full flex-col justify-end px-[clamp(1.5rem,6vw,5rem)] ${
        isDesktop ? 'h-full pb-24' : 'min-h-dvh pb-28 pt-24'
      }`}
    >
      <p className="mb-6 font-sans text-[11px] font-medium tracking-[0.22em] text-folio uppercase">
        Portfolio
      </p>
      <MaskHeadline
        as="h1"
        id="heading-hero"
        active
        reducedMotion={reducedMotion}
        className="max-w-[14ch] font-serif text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.9] font-bold tracking-[-0.03em] text-ink"
      >
        James Williamson
      </MaskHeadline>
      <motion.p
        className="mt-8 max-w-xl font-sans text-lg text-muted md:text-xl"
        initial={reducedMotion ? false : { y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.08, ease: typeEase }}
      >
        Computer Science Student @ Western University
      </motion.p>
      <motion.p
        className={`mt-16 font-sans text-[11px] tracking-[0.28em] text-folio uppercase ${
          hasInteracted ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-500`}
        aria-hidden={hasInteracted}
      >
        Scroll
      </motion.p>
    </section>
  )
}
