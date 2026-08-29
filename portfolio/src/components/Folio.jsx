export default function Folio({ label }) {
  return (
    <p
      className="chrome-invert pointer-events-none fixed z-[300] m-0 font-serif text-[13px] tracking-[0.22em] whitespace-nowrap uppercase"
      style={{ top: 'var(--folio-top)', left: 'var(--folio-left)' }}
    >
      James{' '}
      <span className="mx-2 opacity-50">-</span>{' '}
      {label}
    </p>
  )
}
