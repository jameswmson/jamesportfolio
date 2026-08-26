import { useState } from 'react'
import { motion } from 'framer-motion'
import Hairline from '../components/Hairline.jsx'
import MaskHeadline from '../components/MaskHeadline.jsx'
import RevealImage from '../components/RevealImage.jsx'
import { useStage } from '../context/StageContext.jsx'
import { typeEase } from '../motion/easing.js'

export default function About() {
  const { reducedMotion, isDesktop, section, sectionDir, lastTravel, viewport } = useStage()
  const [photoSrc, setPhotoSrc] = useState('/avatar.jpg')
  const active = !isDesktop || section.id === 'about'
  const offsetY = lastTravel === 'section' && isDesktop ? sectionDir * 24 : 0

  return (
    <section
      id="about"
      className={`min-h-full ${isDesktop ? 'h-full overflow-y-auto' : 'min-h-dvh'} px-[clamp(1.5rem,6vw,5rem)] py-20`}
    >
      <motion.div
        className="mx-auto grid min-h-full max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16"
        initial={reducedMotion ? false : { y: offsetY }}
        animate={{ y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: typeEase }}
      >
        <RevealImage
          src={photoSrc}
          alt="Portrait of James Williamson"
          active={active}
          reducedMotion={reducedMotion}
          sectionDir={sectionDir}
          viewportH={viewport.h}
          className="aspect-[4/5] w-full max-w-md md:max-w-none"
          onError={() => setPhotoSrc('/avatar-placeholder.svg')}
        />
        <div>
          <p className="mb-6 font-sans text-[11px] font-medium tracking-[0.22em] text-folio uppercase">
            About
          </p>
          <MaskHeadline
            id="heading-about"
            active={active}
            reducedMotion={reducedMotion}
            className="font-serif text-5xl leading-[1.05] font-bold tracking-tight text-ink md:text-6xl lg:text-7xl"
          >
            About
          </MaskHeadline>
          <Hairline active={active} reducedMotion={reducedMotion} className="mt-8 max-w-xs" />
          <motion.div
            className="mt-8 max-w-xl space-y-4 text-base leading-relaxed text-muted md:text-lg"
            initial={reducedMotion ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.1, ease: typeEase }}
          >
            <p>
              Hey! I&apos;m James, a developer who&apos;s passionate about turning ideas into solutions. I am in my First Year at Western University studying computer science, I enjoy building projects, solving problems, exploring the world, and playing games.
            </p>
            <p>
              I&apos;m also a big believer in community engagement and love meeting new people, so feel free to reach out!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
