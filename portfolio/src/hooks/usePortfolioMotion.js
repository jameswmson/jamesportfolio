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
          transition: {
            default: { duration: 0.4, delay: index * 0.08 },
            scale: { duration: 0 },
          },
          whileHover: { scale: 1.02, transition: { duration: 0.15 } },
          whileTap: { scale: 0.97 },
        }

  const skillBadge = (index) =>
    shouldReduceMotion
      ? { viewport: { once: true } }
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: {
            default: { duration: 0.3, delay: 0.04 * index },
            scale: { duration: 0 },
          },
          whileHover: { scale: 1.05, transition: { duration: 0.15 } },
          whileTap: { scale: 0.95 },
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
