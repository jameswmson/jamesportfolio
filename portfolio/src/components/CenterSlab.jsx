import CornerTicks from './CornerTicks.jsx'
import { centerSlabTransform } from '../lib/deck.js'

/** A single centered paper slab (About, Skills) — no deck, just fit-to-viewport. */
export default function CenterSlab({ viewport, className = '', children }) {
  return (
    <div
      className={`slab ${className}`}
      style={{
        position: 'relative',
        width: 'var(--slab-w)',
        maxHeight: 'var(--slab-h)',
        display: 'flex',
        flexDirection: 'column',
        flex: 'none',
        transformStyle: 'preserve-3d',
        transform: centerSlabTransform(viewport.vw, viewport.vh),
        transition: 'transform 240ms ease-out',
      }}
    >
      <CornerTicks />
      <div className="slab-scroll" style={{ padding: 'var(--slab-pad-stack)' }}>
        {children}
      </div>
    </div>
  )
}
