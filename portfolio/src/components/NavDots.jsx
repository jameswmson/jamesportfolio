export default function NavDots({ total, active }) {
  return (
    <nav
      className="pointer-events-none fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 gap-2"
      aria-label="Slide navigation"
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={
            i === active
              ? 'h-2.5 w-2.5 rounded-full bg-white shadow-sm ring-2 ring-white/40'
              : 'h-2 w-2 rounded-full bg-white/35'
          }
          aria-current={i === active ? 'true' : undefined}
          aria-label={i === active ? `Panel ${i + 1}, current` : `Panel ${i + 1}`}
        />
      ))}
    </nav>
  )
}
