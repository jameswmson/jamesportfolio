import { u } from '../lib/deck.js'

export default function Folio({ label }) {
  return (
    <p
      className="chrome-invert pointer-events-none fixed z-[300] m-0 font-serif tracking-[0.22em] whitespace-nowrap uppercase"
      style={{ top: 'var(--folio-top)', left: 'var(--folio-left)', fontSize: u(13) }}
    >
      James{' '}
      <span className="opacity-50" style={{ margin: `0 ${u(8)}` }}>
        -
      </span>{' '}
      {label}
    </p>
  )
}
