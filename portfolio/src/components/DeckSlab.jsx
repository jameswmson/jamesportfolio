import { deckStyle, scrimOpacity } from '../lib/deck.js'

/** One paper card in a section deck. Layout comes from the variant prop. */
export default function DeckSlab({ index, active, viewport, variant = 'grid', children }) {
  const live = index === active
  return (
    <div
      className={`slab deck-card ${variant === 'grid' ? 'deck-grid' : 'deck-stack'}`}
      style={deckStyle(index, active, viewport)}
      aria-hidden={live ? undefined : true}
      inert={live ? undefined : ''}
    >
      <div className="deck-scrim" style={{ opacity: scrimOpacity(index, active) }} />
      {children}
    </div>
  )
}
