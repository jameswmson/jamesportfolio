import { motion } from 'framer-motion'
import { imageRevealTransition, trackSpring } from '../motion/easing.js'

export default function RevealImage({
  src,
  alt,
  active = true,
  reducedMotion = false,
  sectionDir = 1,
  viewportH = 800,
  className = '',
  onError,
}) {
  const lag = reducedMotion ? 0 : Math.round(viewportH * 0.12) * sectionDir

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reducedMotion ? false : { clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: active || reducedMotion ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0 0 0)' }}
      transition={reducedMotion ? { duration: 0 } : imageRevealTransition}
    >
      <motion.div
        className="h-full w-full"
        initial={reducedMotion ? false : { scale: 1.06, y: lag }}
        animate={{ scale: 1, y: 0 }}
        transition={reducedMotion ? { duration: 0 } : trackSpring}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" onError={onError} />
      </motion.div>
    </motion.div>
  )
}
