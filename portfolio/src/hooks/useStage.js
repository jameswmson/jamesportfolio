import { useCallback, useEffect, useRef, useState } from 'react'
import { MOBILE_MAX } from '../lib/deck.js'

const WHEEL_LOCK_MS = 700
const SWIPE_MIN_PX = 40

const readViewport = () => ({
  vw: typeof window === 'undefined' ? 1440 : window.innerWidth,
  vh: typeof window === 'undefined' ? 900 : window.innerHeight,
})

/**
 * Owns the whole stage: which section is showing, which card is on top of each
 * section's deck, viewport size, and every input path (wheel, keys, swipe, tilt).
 * counts = number of cards per section, e.g. [1, 1, 3, 2, 2, 1, 1]
 */
export function useStage(counts) {
  const [section, setSection] = useState(0)
  const [panels, setPanels] = useState(() => counts.map(() => 0))
  const [viewport, setViewport] = useState(readViewport)

  const sectionRef = useRef(0)
  const countsRef = useRef(counts)
  const lockRef = useRef(0)
  const touchRef = useRef(null)

  useEffect(() => {
    sectionRef.current = section
  }, [section])

  useEffect(() => {
    countsRef.current = counts
  }, [counts])

  const stepSection = useCallback((d) => {
    setSection((s) => Math.min(countsRef.current.length - 1, Math.max(0, s + d)))
  }, [])

  const stepPanel = useCallback((d) => {
    setPanels((prev) => {
      const i = sectionRef.current
      const max = countsRef.current[i] - 1
      const next = prev.slice()
      next[i] = Math.min(max, Math.max(0, next[i] + d))
      return next
    })
  }, [])

  useEffect(() => {
    const onWheel = (e) => {
      const now = Date.now()
      if (now < lockRef.current) return
      const horiz = Math.abs(e.deltaX) > Math.abs(e.deltaY)
      const d = horiz ? e.deltaX : e.deltaY
      if (Math.abs(d) < 4) return
      lockRef.current = now + WHEEL_LOCK_MS
      if (horiz) stepPanel(d > 0 ? 1 : -1)
      else stepSection(d > 0 ? 1 : -1)
    }

    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); stepSection(1) }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); stepSection(-1) }
      else if (e.key === 'ArrowRight') { e.preventDefault(); stepPanel(1) }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); stepPanel(-1) }
    }

    const onTouchStart = (e) => {
      const t = e.touches[0]
      touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now() }
    }

    const onTouchEnd = (e) => {
      const start = touchRef.current
      touchRef.current = null
      if (!start) return
      const t = e.changedTouches[0]
      const dx = t.clientX - start.x
      const dy = t.clientY - start.y
      if (Date.now() - start.t > 900) return
      if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_MIN_PX) return
      if (Math.abs(dx) > Math.abs(dy)) stepPanel(dx < 0 ? 1 : -1)
      else stepSection(dy < 0 ? 1 : -1)
    }

    const onMove = (e) => {
      if (window.innerWidth <= MOBILE_MAX) return
      const px = e.clientX / (window.innerWidth || 1) - 0.5
      const py = e.clientY / (window.innerHeight || 1) - 0.5
      const root = document.documentElement
      root.style.setProperty('--rx', (px * 5).toFixed(2) + 'deg')
      root.style.setProperty('--ry', (-py * 3.5).toFixed(2) + 'deg')
    }

    const onResize = () => setViewport(readViewport())

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('mousemove', onMove)
    }
  }, [stepPanel, stepSection])

  return {
    section,
    setSection,
    panels,
    panel: panels[section],
    panelCount: counts[section],
    stepSection,
    stepPanel,
    viewport,
  }
}
