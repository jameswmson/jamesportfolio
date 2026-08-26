import { createElement } from 'react'
import { motion } from 'framer-motion'
import { typeEase } from '../motion/easing.js'

export default function MaskHeadline({
  as = 'h2',
  id,
  active = true,
  delay = 0,
  reducedMotion = false,
  className = '',
  children,
}) {
  return createElement(
    as,
    { id, tabIndex: -1, className: `overflow-hidden outline-none ${className}` },
    <motion.span
      key={`${id}-${active ? 'on' : 'off'}`}
      className="block"
      initial={{ y: reducedMotion || !active ? 0 : '100%' }}
      animate={{ y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : delay, ease: typeEase }}
    >
      {children}
    </motion.span>,
  )
}
