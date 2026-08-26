import { LayoutGroup, motion } from 'framer-motion'
import { useStage } from '../context/StageContext.jsx'

export default function SectionNav() {
  const { SECTIONS, sectionIndex, goSection, isDesktop, reducedMotion } = useStage()

  const onClick = (i, id) => {
    if (isDesktop) {
      goSection(i)
      return
    }
    document.getElementById(id)?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <nav
      className={
        isDesktop
          ? 'pointer-events-auto fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 md:block lg:right-8'
          : 'pointer-events-auto fixed bottom-0 left-0 right-0 z-40 border-t border-rule bg-paper/95 px-3 py-2 backdrop-blur-sm md:hidden'
      }
      aria-label="Sections"
    >
      <LayoutGroup>
      <ul
        className={
          isDesktop ? 'flex flex-col items-end gap-3' : 'flex items-center justify-between gap-1 overflow-x-auto'
        }
      >
        {SECTIONS.map((section, i) => {
          const active = i === sectionIndex
          return (
            <li key={section.id} className="relative shrink-0">
              <button
                type="button"
                onClick={() => onClick(i, section.id)}
                className={`relative cursor-pointer px-1 py-1 text-[10px] font-medium tracking-[0.18em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-[11px] ${
                  active ? 'text-ink' : 'text-folio'
                }`}
                aria-current={active ? 'true' : undefined}
                aria-label={section.label}
              >
                {isDesktop && active && (
                  <motion.span
                    layoutId="section-marker"
                    className="absolute top-1/2 -left-3 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ink"
                    transition={
                      reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 34 }
                    }
                  />
                )}
                {section.label}
              </button>
            </li>
          )
        })}
      </ul>
      </LayoutGroup>
    </nav>
  )
}
