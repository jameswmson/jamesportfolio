import CornerTicks from './CornerTicks.jsx'
import { deckStyle } from '../lib/deck.js'

/** One paper card in a section deck. Layout comes from the variant prop. */
export default function DeckSlab({ index, active, viewport, variant = 'grid', children }) {
  const live = index === active
  return (
    <div
      className="slab deck-card"
      style={deckStyle(index, active, viewport)}
      aria-hidden={live ? undefined : true}
      inert={live ? undefined : ''}
    >
      <CornerTicks />
      <div className={`slab-scroll ${variant === 'grid' ? 'deck-grid' : 'deck-stack'}`}>
        {children}
      </div>
    </div>
  )
}
