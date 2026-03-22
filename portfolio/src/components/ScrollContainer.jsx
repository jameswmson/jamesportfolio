import {
  Children,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react'
import { HorizontalScrollContext } from '../context/HorizontalScrollContext.jsx'

/** Accumulated wheel delta needed to advance one section. */
const WHEEL_STEP_PX = 52

function getStride(el) {
  if (!el?.children?.length) return el?.clientWidth ?? 0
  if (el.children.length < 2) return el.clientWidth
  return el.children[1].offsetLeft - el.children[0].offsetLeft
}

function getActiveIndex(el, panelCount) {
  if (!el?.children?.length || panelCount < 1) return 0
  const n = Math.min(panelCount, el.children.length)
  const focus = el.scrollLeft + el.clientWidth * 0.35
  let best = 0
  for (let i = 0; i < n; i++) {
    const left = el.children[i].offsetLeft
    const right = left + el.children[i].offsetWidth
    if (focus >= left && focus < right) return i
    if (left <= focus) best = i
  }
  return best
}

function panelScrollLeft(el, index) {
  const max = Math.max(0, el.scrollWidth - el.clientWidth)
  const child = el.children[index]
  if (child) return Math.min(max, Math.max(0, child.offsetLeft))
  const stride = getStride(el) || el.clientWidth
  return Math.min(max, Math.max(0, index * stride))
}

function snapScrollLeftToNearest(el, panelCount, maxScroll) {
  if (!el?.children?.length || panelCount < 1) return el.scrollLeft
  const max = Math.max(0, maxScroll)
  const n = Math.min(panelCount, el.children.length)
  let nearest = el.scrollLeft
  let bestDist = Infinity
  for (let i = 0; i < n; i++) {
    const L = el.children[i].offsetLeft
    const candidate = Math.min(L, max)
    const d = Math.abs(el.scrollLeft - candidate)
    if (d < bestDist) {
      bestDist = d
      nearest = candidate
    }
  }
  return Math.min(max, Math.max(0, nearest))
}

const ScrollContainer = forwardRef(function ScrollContainer(
  { children, onActiveChange, onScrollProgress },
  ref,
) {
  const rootRef = useRef(null)
  const panelCount = Children.count(children)

  const onActiveChangeRef = useRef(onActiveChange)
  const onScrollProgressRef = useRef(onScrollProgress)

  useLayoutEffect(() => {
    onActiveChangeRef.current = onActiveChange
    onScrollProgressRef.current = onScrollProgress
  })

  const lastProgressEmitted = useRef(null)
  const lastIndexEmitted = useRef(-1)
  const wheelAccRef = useRef(0)
  /** Skip post-scroll snap right after wheel (avoids fighting smooth scroll). */
  const lastWheelAtRef = useRef(0)

  useImperativeHandle(
    ref,
    () => ({
      seekToIndex(index) {
        const el = rootRef.current
        if (!el || panelCount <= 0) return
        const i = Math.min(Math.max(0, index), panelCount - 1)
        wheelAccRef.current = 0
        el.scrollTo({
          left: panelScrollLeft(el, i),
          behavior: 'smooth',
        })
      },
    }),
    [panelCount],
  )

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const maxScroll = () => Math.max(0, el.scrollWidth - el.clientWidth)

    const emitScroll = () => {
      const max = maxScroll()
      const progress = max <= 0 ? 0 : el.scrollLeft / max

      if (
        lastProgressEmitted.current === null ||
        Math.abs(progress - lastProgressEmitted.current) > 0.003
      ) {
        lastProgressEmitted.current = progress
        onScrollProgressRef.current?.(progress)
      }

      const onA = onActiveChangeRef.current
      if (onA && panelCount > 0) {
        const idx = getActiveIndex(el, panelCount)
        if (idx !== lastIndexEmitted.current) {
          lastIndexEmitted.current = idx
          onA(idx)
        }
      }
    }

    let snapTimer = null
    const scheduleSnapAfterFreeScroll = () => {
      clearTimeout(snapTimer)
      snapTimer = setTimeout(() => {
        if (performance.now() - lastWheelAtRef.current < 480) return
        const max = maxScroll()
        const snapped = snapScrollLeftToNearest(el, panelCount, max)
        if (Math.abs(el.scrollLeft - snapped) > 2) {
          el.scrollTo({ left: snapped, behavior: 'smooth' })
        }
        emitScroll()
      }, 160)
    }

    const wheelDelta = (e) => {
      let dy = e.deltaY
      if (e.deltaMode === 1) dy *= 16
      else if (e.deltaMode === 2) dy *= el.clientHeight
      return dy
    }

    const goToIndex = (i) => {
      const next = Math.min(Math.max(0, i), panelCount - 1)
      el.scrollTo({
        left: panelScrollLeft(el, next),
        behavior: 'smooth',
      })
    }

    const onWheel = (e) => {
      if (e.deltaY === 0) return
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      e.preventDefault()

      lastWheelAtRef.current = performance.now()
      wheelAccRef.current += wheelDelta(e)

      while (wheelAccRef.current >= WHEEL_STEP_PX) {
        wheelAccRef.current -= WHEEL_STEP_PX
        const from = getActiveIndex(el, panelCount)
        goToIndex(from + 1)
      }
      while (wheelAccRef.current <= -WHEEL_STEP_PX) {
        wheelAccRef.current += WHEEL_STEP_PX
        const from = getActiveIndex(el, panelCount)
        goToIndex(from - 1)
      }
    }

    const onScroll = () => {
      emitScroll()
      scheduleSnapAfterFreeScroll()
    }

    const onResize = () => {
      lastIndexEmitted.current = -1
      lastProgressEmitted.current = null
      emitScroll()
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    const ro = new ResizeObserver(onResize)
    ro.observe(el)

    emitScroll()

    return () => {
      clearTimeout(snapTimer)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [panelCount])

  return (
    <HorizontalScrollContext.Provider value={ref}>
      <div
        ref={rootRef}
        data-scroll-root
        className="hide-scrollbar flex h-screen w-full flex-row overflow-x-auto overflow-y-hidden bg-white pl-[clamp(1.25rem,5vw,3.5rem)] pr-[clamp(1.25rem,5vw,3.5rem)] [scrollbar-gutter:stable]"
        style={{
          touchAction: 'pan-x',
          gap: 'clamp(3.5rem, 12vw, 10rem)',
        }}
      >
        {children}
      </div>
    </HorizontalScrollContext.Provider>
  )
})

ScrollContainer.displayName = 'ScrollContainer'

export default ScrollContainer
