import { motion } from 'framer-motion'
import { hairlineTransition } from '../motion/easing.js'

export default function Hairline({ active = true, delay = 0.1, reducedMotion = false, className = '' }) {
  return (
    <motion.div
      className={`h-px w-full origin-left bg-rule ${className}`}
      initial={{ scaleX: reducedMotion ? 1 : 0 }}
      animate={{ scaleX: active || reducedMotion ? 1 : 0 }}
      transition={{
        ...hairlineTransition,
        delay: reducedMotion ? 0 : delay,
        duration: reducedMotion ? 0 : hairlineTransition.duration,
      }}
      aria-hidden
    />
  )
}
