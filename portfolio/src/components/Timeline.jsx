export default function Timeline({ total, active, progress, onSeek }) {
  const p = Number.isFinite(progress) ? progress : 0
  const fillRatio = Math.min(1, Math.max(0, p))
  const edgeGutterPct = total > 0 ? 100 / (2 * total) : 0
  const trackSpanPct = Math.max(0, 100 - 2 * edgeGutterPct)
  const fillWidthPct = trackSpanPct * fillRatio

  /** Center of dot i along full nav width (matches flex columns). */
  const markerLeftPct = (i) => ((i + 0.5) / total) * 100

  return (
    <nav
      className="pointer-events-auto fixed bottom-16 left-0 right-0 z-50 px-[clamp(1.25rem,5vw,3.5rem)] sm:bottom-20"
      aria-label="Section timeline"
    >
      <div className="relative w-full py-2">
        <div className="relative h-6 w-full">
          {/* Baseline between first and last marker */}
          <div
            className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-neutral-300"
            style={{
              left: `${edgeGutterPct}%`,
              right: `${edgeGutterPct}%`,
            }}
            aria-hidden
          />
          {/* Filled portion of timeline */}
          <div
            className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-neutral-900 transition-[width] duration-200 ease-out"
            style={{
              left: `${edgeGutterPct}%`,
              width: `${fillWidthPct}%`,
            }}
            aria-hidden
          />

          {/* Solid stops on the line — no rings / hollow circles */}
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSeek?.(i)}
              className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              style={{ left: `${markerLeftPct(i)}%` }}
              aria-label={`Go to section ${i + 1} of ${total}`}
              aria-current={i === active ? 'step' : undefined}
            >
              <span
                className={
                  i === active
                    ? 'block h-3 w-3 rounded-full bg-neutral-900 shadow-sm'
                    : i < active
                      ? 'block h-2.5 w-2.5 rounded-full bg-neutral-900'
                      : 'block h-2.5 w-2.5 rounded-full bg-neutral-400'
                }
              />
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
