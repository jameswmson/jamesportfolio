import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useStage } from '../context/StageContext.jsx'

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function PanelChrome() {
  const { section, panelIndex, panelCount, stepPanel, isDesktop } = useStage()

  if (!isDesktop || panelCount < 2) return null

  return (
    <div className="pointer-events-none fixed bottom-8 left-0 right-0 z-40 flex justify-center px-6">
      <div className="pointer-events-auto flex items-center gap-5 text-folio">
        <button
          type="button"
          onClick={() => stepPanel(-1)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-rule text-ink transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          aria-label="Previous panel"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <p className="min-w-[4.5rem] text-center font-serif text-xl tracking-wide text-folio tabular-nums" aria-live="polite">
          {pad(panelIndex + 1)}
          <span className="mx-1 text-rule">/</span>
          {pad(panelCount)}
        </p>
        <button
          type="button"
          onClick={() => stepPanel(1)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-rule text-ink transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          aria-label="Next panel"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
        <span className="sr-only">
          {section.title} panel {panelIndex + 1} of {panelCount}
        </span>
      </div>
    </div>
  )
}
