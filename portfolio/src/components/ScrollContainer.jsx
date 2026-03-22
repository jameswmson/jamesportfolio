import {
  Children,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useMemo,
  cloneElement
} from 'react'
import { HorizontalScrollContext } from '../context/HorizontalScrollContext.jsx'

const WHEEL_STEP_PX = 52

function getStride(el) {
  if (!el?.children?.length) return el?.clientWidth ?? 0
  if (el.children.length < 2) return el.clientWidth
  return el.children[1].offsetLeft - el.children[0].offsetLeft
}

function getActiveIndex(el, count) {
  if (!el?.children?.length || count < 1) return 0
  const n = Math.min(count, el.children.length)
  const screenCenter = el.scrollLeft + el.clientWidth / 2
  let best = 0
  let minDiff = Infinity
  for (let i = 0; i < n; i++) {
    const childCenter = el.children[i].offsetLeft + el.children[i].offsetWidth / 2
    const diff = Math.abs(childCenter - screenCenter)
    if (diff < minDiff) {
      minDiff = diff
      best = i
    }
  }
  return best
}

function panelScrollLeft(el, index) {
  const max = Math.max(0, el.scrollWidth - el.clientWidth)
  const child = el.children[index]
  const pl = el.children[0]?.offsetLeft || 0
  if (child) return Math.min(max, Math.max(0, child.offsetLeft - pl))
  const stride = getStride(el) || el.clientWidth
  return Math.min(max, Math.max(0, index * stride))
}

function snapScrollLeftToNearest(el, count, maxScroll) {
  if (!el?.children?.length || count < 1) return el.scrollLeft
  const max = Math.max(0, maxScroll)
  const n = Math.min(count, el.children.length)
  const pl = el.children[0]?.offsetLeft || 0
  let nearest = el.scrollLeft
  let bestDist = Infinity
  for (let i = 0; i < n; i++) {
    const candidate = Math.min(max, Math.max(0, el.children[i].offsetLeft - pl))
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
  
  const childrenArray = Children.toArray(children)
  const panelCount = childrenArray.length

  const extendedChildren = useMemo(() => {
    if (panelCount < 2) return childrenArray
    const firstClone = cloneElement(childrenArray[0], { key: 'clone-first', 'aria-hidden': true })
    return [...childrenArray, firstClone]
  }, [childrenArray, panelCount])

  const extendedCount = extendedChildren.length

  const onActiveChangeRef = useRef(onActiveChange)
  const onScrollProgressRef = useRef(onScrollProgress)

  useLayoutEffect(() => {
    onActiveChangeRef.current = onActiveChange
    onScrollProgressRef.current = onScrollProgress
  })

  const lastProgressEmitted = useRef(null)
  const lastIndexEmitted = useRef(-1)
  const wheelAccRef = useRef(0)
  const lastWheelAtRef = useRef(0)

  useImperativeHandle(
    ref,
    () => ({
      seekToIndex(index) {
        const el = rootRef.current
        if (!el || extendedCount <= 0) return
        const i = Math.min(Math.max(0, index), panelCount - 1)
        wheelAccRef.current = 0
        el.scrollTo({
          left: panelScrollLeft(el, i),
          behavior: 'smooth',
        })
      },
    }),
    [panelCount, extendedCount],
  )

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const maxScroll = () => Math.max(0, el.scrollWidth - el.clientWidth)

    const emitScroll = () => {
      const pl = el.children[0]?.offsetLeft || 0
      const idx = getActiveIndex(el, extendedCount)

      // Only evaluate jump when wrapping at the right end (forward)
      if (idx === extendedCount - 1) {
        const target = el.children[extendedCount - 1].offsetLeft - pl
        if (Math.abs(el.scrollLeft - target) < 2) {
          el.scrollTo({ left: el.children[0].offsetLeft - pl, behavior: 'instant' })
          return
        }
      }

      // 0 is now the original left node
      const real0 = el.children[0]?.offsetLeft - pl || 0
      const stride = getStride(el) || el.clientWidth
      const realMaxDistance = (panelCount - 1) * stride
      const progress = realMaxDistance <= 0 ? 0 : (el.scrollLeft - real0) / realMaxDistance

      if (
        lastProgressEmitted.current === null ||
        Math.abs(progress - lastProgressEmitted.current) > 0.003
      ) {
        lastProgressEmitted.current = progress
        onScrollProgressRef.current?.(progress)
      }

      const onA = onActiveChangeRef.current
      if (onA && panelCount > 0) {
        let realIdx = idx
        // If at Clone 1, map active dot to 0
        if (realIdx >= panelCount) realIdx = 0

        if (realIdx !== lastIndexEmitted.current) {
          lastIndexEmitted.current = realIdx
          onA(realIdx)
        }
      }
    }

    let snapTimer = null
    let stressAcc = 0
    let stressTimer = null

    const resetStress = () => {
      const children = el.children
      for (let i = 0; i < children.length; i++) {
        children[i].style.transition = 'transform 400ms cubic-bezier(0.34, 1.3, 0.64, 1)'
        children[i].style.transform = `translateX(0px)`
      }
      setTimeout(() => {
        if (!el || !el.children) return
        const children = el.children
        for (let i = 0; i < children.length; i++) {
          children[i].style.transition = ''
        }
      }, 400)
      stressAcc = 0
      onScrollProgressRef.current?.(0)
    }

    const scheduleSnapAfterFreeScroll = () => {
      clearTimeout(snapTimer)
      snapTimer = setTimeout(() => {
        if (performance.now() - lastWheelAtRef.current < 480) return
        const max = maxScroll()
        const snapped = snapScrollLeftToNearest(el, extendedCount, max)
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
      const next = Math.min(Math.max(0, i), extendedCount - 1)
      el.scrollTo({
        left: panelScrollLeft(el, next),
        behavior: 'smooth',
      })
    }

    const onWheel = (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)

      let dy = e.deltaY; if (e.deltaMode === 1) dy *= 16; else if (e.deltaMode === 2) dy *= el.clientHeight
      let dx = e.deltaX; if (e.deltaMode === 1) dx *= 16; else if (e.deltaMode === 2) dx *= el.clientWidth

      const isPushingLeft = (isHorizontal && dx < 0) || (!isHorizontal && dy < 0)

      if (el.scrollLeft <= 0 && isPushingLeft) {
        e.preventDefault()

        clearTimeout(stressTimer)
        stressAcc += (isHorizontal ? dx : dy) * 0.15

        const pull = Math.min(40, Math.pow(Math.abs(stressAcc), 0.7))

        const children = el.children
        for (let i = 0; i < children.length; i++) {
          children[i].style.transition = 'transform 100ms cubic-bezier(0.2, 0.8, 0.4, 1)'
          children[i].style.transform = `translateX(${pull}px)`
        }

        const realMaxDistance = (panelCount - 1) * (getStride(el) || el.clientWidth)
        if (realMaxDistance > 0) {
          onScrollProgressRef.current?.(-pull / realMaxDistance)
        }

        stressTimer = setTimeout(resetStress, 100)
        return
      }

      if (isHorizontal) return
      if (e.deltaY === 0) return
      e.preventDefault()

      lastWheelAtRef.current = performance.now()
      wheelAccRef.current += wheelDelta(e)

      while (wheelAccRef.current >= WHEEL_STEP_PX) {
        wheelAccRef.current -= WHEEL_STEP_PX
        const from = getActiveIndex(el, extendedCount)
        goToIndex(from + 1)
      }
      while (wheelAccRef.current <= -WHEEL_STEP_PX) {
        wheelAccRef.current += WHEEL_STEP_PX
        const from = getActiveIndex(el, extendedCount)
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

    return () => {
      clearTimeout(snapTimer)
      clearTimeout(stressTimer)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [panelCount, extendedCount])

  return (
    <HorizontalScrollContext.Provider value={ref}>
      <div
        ref={rootRef}
        data-scroll-root
        className="hide-scrollbar flex h-screen w-full flex-row overflow-x-auto overflow-y-hidden pl-[clamp(1.25rem,5vw,3.5rem)] pr-[clamp(1.25rem,5vw,3.5rem)] [scrollbar-gutter:stable]"
        style={{
          touchAction: 'pan-x',
          gap: 'clamp(3.5rem, 12vw, 10rem)',
        }}
      >
        {extendedChildren}
      </div>
    </HorizontalScrollContext.Provider>
  )
})

ScrollContainer.displayName = 'ScrollContainer'

export default ScrollContainer
