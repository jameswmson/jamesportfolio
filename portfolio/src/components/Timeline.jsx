import { useRef } from 'react'

export default function Timeline({ total, active, progress, onSeek }) {
  const p = Number.isFinite(progress) ? progress : 0

  const prevP = useRef(p)
  const isJumping = useRef(false)

  if (Math.abs(p - prevP.current) > 0.5) {
    isJumping.current = true
  } else {
    isJumping.current = false
  }
  prevP.current = p

  const txClass = isJumping.current ? '' : 'transition-transform duration-200 ease-out'

  let startRatio = 0
  let endRatio = 0

  if (p > 1.0) {
    startRatio = (p - 1.0) * (total - 1)
    endRatio = 1.0
  } else {
    startRatio = 0.0
    endRatio = p
  }

  startRatio = Math.max(0, Math.min(1, startRatio))
  endRatio = Math.max(0, Math.min(1, endRatio))
  const widthRatio = Math.max(0, endRatio - startRatio)

  const edgeGutterPct = total > 0 ? 100 / (2 * total) : 0
  const trackSpanPct = Math.max(0, 100 - 2 * edgeGutterPct)

  const markerLeftPct = (i) => ((i + 0.5) / total) * 100

  return (
    <nav
      className="pointer-events-auto fixed bottom-16 left-0 right-0 z-50 px-[clamp(1.25rem,5vw,3.5rem)] sm:bottom-20"
      aria-label="Section timeline"
    >
      <div className="relative w-full py-2">
        <div className="relative h-6 w-full">
          {/* Right Gray Dotted Base */}
          <div
            className="absolute top-1/2 h-0 -translate-y-1/2 border-t-[3px] border-dotted border-neutral-300"
            style={{ right: 0, width: `${edgeGutterPct}%` }}
            aria-hidden
          />

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
            className={`absolute top-1/2 h-[3px] origin-left -translate-y-1/2 rounded-full bg-neutral-900 ${txClass}`}
            style={{
              left: `${edgeGutterPct}%`,
              width: `${trackSpanPct}%`,
              transform: `translateX(${startRatio * 100}%) scaleX(${widthRatio})`,
            }}
            aria-hidden
          />

          {/* Solid stops on the line */}
          {Array.from({ length: total }, (_, i) => {
            const labels = ['Home', 'About me', 'Projects', 'Skills', 'Contact']
            return (
              <button
                key={i}
                type="button"
                onClick={() => onSeek?.(i)}
                className="absolute top-1/2 z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                style={{ left: `${markerLeftPct(i)}%` }}
                aria-label={`Go to ${labels[i]} section`}
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
                <span
                  className={`absolute top-full mt-[10px] text-[10px] sm:text-xs font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 ${
                    i === active ? 'text-neutral-900' : 'text-neutral-400'
                  }`}
                >
                  {labels[i]}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
