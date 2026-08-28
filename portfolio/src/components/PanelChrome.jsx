import { pad } from '../lib/deck.js'

/** Prev / counter / next for sections that hold more than one card. */
export default function PanelChrome({ panel, count, onStep }) {
  const many = count > 1
  return (
    <div
      className="chrome-invert fixed right-0 left-0 z-[300] mx-auto flex w-fit items-center justify-center gap-[18px] transition-opacity duration-[360ms]"
      style={{
        bottom: 'var(--counter-bottom)',
        opacity: many ? 1 : 0,
        pointerEvents: many ? 'auto' : 'none',
      }}
    >
      <button
        type="button"
        onClick={() => onStep(-1)}
        aria-label="Previous item"
        disabled={!many || panel === 0}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-current bg-transparent text-inherit opacity-65 transition-opacity duration-200 hover:opacity-100 disabled:opacity-25"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <span className="min-w-[78px] text-center font-serif text-[19px] tabular-nums">
        {pad(panel + 1)} / {pad(count)}
      </span>
      <button
        type="button"
        onClick={() => onStep(1)}
        aria-label="Next item"
        disabled={!many || panel === count - 1}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-current bg-transparent text-inherit opacity-65 transition-opacity duration-200 hover:opacity-100 disabled:opacity-25"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}
