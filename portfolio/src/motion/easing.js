/** Shared motion tokens. Tracks retarget mid-flight; type reveals do not fade Bodoni. */

export const trackSpring = {
  type: 'spring',
  stiffness: 260,
  damping: 34,
  mass: 0.9,
}

/** Snappy settle for end-of-track rubber-band (~250ms). */
export const rubberSpring = {
  type: 'spring',
  stiffness: 520,
  damping: 32,
  mass: 0.7,
}

export const typeEase = [0.22, 1, 0.36, 1]

export const typeTransition = {
  duration: 0.45,
  ease: typeEase,
}

export const hairlineTransition = {
  duration: 0.5,
  ease: typeEase,
}

export const imageRevealTransition = {
  duration: 0.9,
  ease: typeEase,
}

export const trackEaseFallback = [0.16, 1, 0.3, 1]
