import { useEffect, useRef } from 'react'
import { useStage } from '../context/StageContext.jsx'

const IDLE_MS = 120
const IDLE_DELTA = 2
const AXIS_RATIO = 1.25
const WHEEL_THRESHOLD = 48
const SWIPE_THRESHOLD = 48
const KEY_COOLDOWN_MS = 180

function isEditable(target) {
  if (!(target instanceof Element)) return false
  const el = target.closest('input, textarea, select, [contenteditable="true"]')
  return Boolean(el)
}

function getScrollableY(start, root) {
  let node = start instanceof Element ? start : null
  while (node && node !== root) {
    if (node instanceof HTMLElement) {
      const style = window.getComputedStyle(node)
      const oy = style.overflowY
      if ((oy === 'auto' || oy === 'scroll') && node.scrollHeight > node.clientHeight + 1) {
        return node
      }
    }
    node = node.parentElement
  }
  return null
}

function innerScrollConsumes(e, root) {
  const scroller = getScrollableY(e.target, root)
  if (!scroller) return false
  const dy = e.deltaY
  if (dy === 0) return false
  const atTop = scroller.scrollTop <= 0
  const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1
  if (dy < 0 && !atTop) return true
  if (dy > 0 && !atBottom) return true
  return false
}

function wheelDeltas(e) {
  let dx = e.deltaX
  let dy = e.deltaY
  if (e.deltaMode === 1) {
    dx *= 16
    dy *= 16
  } else if (e.deltaMode === 2) {
    dx *= window.innerWidth
    dy *= window.innerHeight
  }
  if (e.shiftKey && Math.abs(dy) > Math.abs(dx)) {
    return { dx: dy, dy: 0 }
  }
  return { dx, dy }
}

export function useStageInput() {
  const {
    isDesktop,
    markInteracted,
    stepSection,
    stepPanel,
    goSection,
    SECTIONS,
    viewportNodeRef,
  } = useStage()

  const axisRef = useRef(null)
  const committedRef = useRef(false)
  const accRef = useRef({ x: 0, y: 0 })
  const idleTimerRef = useRef(0)
  const lastKeyAtRef = useRef(0)
  const touchRef = useRef(null)

  useEffect(() => {
    if (!isDesktop) return undefined

    const releaseGesture = () => {
      axisRef.current = null
      committedRef.current = false
      accRef.current = { x: 0, y: 0 }
    }

    const bumpIdle = () => {
      window.clearTimeout(idleTimerRef.current)
      idleTimerRef.current = window.setTimeout(releaseGesture, IDLE_MS)
    }

    const onWheel = (e) => {
      if (isEditable(e.target)) return
      const root = viewportNodeRef.current
      if (innerScrollConsumes(e, root)) return

      e.preventDefault()
      markInteracted()

      const { dx, dy } = wheelDeltas(e)
      const absX = Math.abs(dx)
      const absY = Math.abs(dy)

      if (absX < IDLE_DELTA && absY < IDLE_DELTA) {
        bumpIdle()
        return
      }

      bumpIdle()

      if (!axisRef.current) {
        if (absX > absY * AXIS_RATIO) axisRef.current = 'x'
        else if (absY > absX * AXIS_RATIO) axisRef.current = 'y'
        else return
      }

      if (committedRef.current) return

      if (axisRef.current === 'y') {
        accRef.current.y += dy
        if (Math.abs(accRef.current.y) >= WHEEL_THRESHOLD) {
          committedRef.current = true
          stepSection(Math.sign(accRef.current.y))
        }
      } else {
        accRef.current.x += dx
        if (Math.abs(accRef.current.x) >= WHEEL_THRESHOLD) {
          committedRef.current = true
          stepPanel(Math.sign(accRef.current.x))
        }
      }
    }

    const onKeyDown = (e) => {
      if (isEditable(e.target)) return
      const now = performance.now()
      if (now - lastKeyAtRef.current < KEY_COOLDOWN_MS) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
          e.preventDefault()
        }
        return
      }

      let handled = false
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          handled = true
          stepSection(1)
          break
        case 'ArrowUp':
        case 'PageUp':
          handled = true
          stepSection(-1)
          break
        case 'ArrowRight':
          handled = true
          stepPanel(1)
          break
        case 'ArrowLeft':
          handled = true
          stepPanel(-1)
          break
        case 'Home':
          handled = true
          goSection(0)
          break
        case 'End':
          handled = true
          goSection(SECTIONS.length - 1)
          break
        default:
          break
      }

      if (handled) {
        e.preventDefault()
        lastKeyAtRef.current = now
        markInteracted()
      }
    }

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return
      const t = e.touches[0]
      touchRef.current = { x: t.clientX, y: t.clientY, axis: null }
    }

    const onTouchMove = (e) => {
      const start = touchRef.current
      if (!start || e.touches.length !== 1) return
      const root = viewportNodeRef.current
      if (innerScrollConsumes({ target: e.target, deltaY: e.touches[0].clientY - start.y }, root)) {
        touchRef.current = null
        return
      }
      const t = e.touches[0]
      const dx = t.clientX - start.x
      const dy = t.clientY - start.y
      if (!start.axis) {
        if (Math.abs(dx) > Math.abs(dy) * AXIS_RATIO) start.axis = 'x'
        else if (Math.abs(dy) > Math.abs(dx) * AXIS_RATIO) start.axis = 'y'
      }
      if (start.axis) e.preventDefault()
    }

    const onTouchEnd = (e) => {
      const start = touchRef.current
      touchRef.current = null
      if (!start) return
      const t = e.changedTouches[0]
      if (!t) return
      const dx = t.clientX - start.x
      const dy = t.clientY - start.y
      const axis =
        start.axis ||
        (Math.abs(dx) > Math.abs(dy) * AXIS_RATIO ? 'x' : Math.abs(dy) > Math.abs(dx) * AXIS_RATIO ? 'y' : null)
      if (!axis) return
      markInteracted()
      if (axis === 'y' && Math.abs(dy) >= SWIPE_THRESHOLD) stepSection(Math.sign(-dy))
      if (axis === 'x' && Math.abs(dx) >= SWIPE_THRESHOLD) stepPanel(Math.sign(-dx))
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      window.clearTimeout(idleTimerRef.current)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [isDesktop, markInteracted, stepSection, stepPanel, goSection, SECTIONS, viewportNodeRef])
}

