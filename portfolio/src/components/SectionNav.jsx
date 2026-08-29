import { useEffect, useRef } from 'react'
import { sections } from '../data/sections.js'

export default function SectionNav({ section, onSelect }) {
  const buttonRefs = useRef([])

  useEffect(() => {
    if (!window.matchMedia('(max-width: 820px)').matches) return
    buttonRefs.current[section]?.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'center',
    })
  }, [section])

  return (
    <nav
      aria-label="Sections"
      className="section-nav chrome-invert fixed z-[300]"
      style={{
        left: 'var(--nav-left)',
        right: 'var(--nav-right)',
        top: 'var(--nav-top)',
        bottom: 'var(--nav-bottom)',
        transform: 'translateY(var(--nav-ty))',
      }}
    >
      <ul
        className="section-nav-list m-0 flex list-none flex-wrap p-0"
        style={{
          flexDirection: 'var(--nav-dir)',
          alignItems: 'var(--nav-align)',
          justifyContent: 'var(--nav-just)',
          gap: 'var(--nav-gap)',
        }}
      >
        {sections.map((s, i) => {
          const on = i === section
          return (
            <li key={s.id} className="section-nav-item">
              <button
                ref={(node) => {
                  buttonRefs.current[i] = node
                }}
                type="button"
                onClick={() => onSelect(i)}
                aria-current={on ? 'true' : undefined}
                className="section-nav-button cursor-pointer border-0 bg-transparent p-0 py-0.5 font-sans uppercase transition-[font-size,letter-spacing] duration-200"
                style={{
                  fontSize: on ? '14px' : '12px',
                  fontWeight: on ? 700 : 400,
                  letterSpacing: on ? '0.2em' : '0.16em',
                  color: 'inherit',
                }}
              >
                {s.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
