import { centerSlabTransform } from '../lib/deck.js'

/** A single centered paper slab (About, Skills) — no deck, just fit-to-viewport. */
export default function CenterSlab({ viewport, className = '', children }) {
  return (
    <div
      className={`slab ${className}`}
      style={{
        width: 'var(--slab-w)',
        flex: 'none',
        padding: 'var(--slab-pad-stack)',
        transformStyle: 'preserve-3d',
        transform: centerSlabTransform(viewport.vw, viewport.vh),
        transition: 'transform 240ms ease-out',
      }}
    >
      {children}
    </div>
  )
}
