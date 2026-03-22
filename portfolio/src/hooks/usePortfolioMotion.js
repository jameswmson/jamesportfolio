import { useReducedMotion } from 'framer-motion'

export function usePortfolioMotion() {
  const shouldReduceMotion = useReducedMotion()

  const sectionFade = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4 },
      }

  const projectCard = (index) =>
    shouldReduceMotion
      ? { viewport: { once: true } }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: index * 0.08 },
          whileHover: { y: -4 },
          whileTap: { scale: 0.97 },
        }

  const skillBadge = (index) =>
    shouldReduceMotion
      ? { viewport: { once: true } }
      : {
          initial: { opacity: 0, scale: 0.8 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { duration: 0.35, delay: index * 0.05 },
        }

  const buttonMotion = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.04 },
        whileTap: { scale: 0.96 },
      }

  return {
    shouldReduceMotion,
    sectionFade,
    projectCard,
    skillBadge,
    buttonMotion,
  }
}
