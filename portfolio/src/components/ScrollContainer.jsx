import { Children, useCallback, useEffect, useRef } from 'react'

export default function ScrollContainer({ children, onActiveChange }) {
  const ref = useRef(null)
  const panelCount = Children.count(children)

  const emitActive = useCallback(() => {
    const el = ref.current
    if (!el || !onActiveChange || panelCount === 0) return
    const w = el.clientWidth
    const idx = Math.min(
      Math.max(0, Math.round(el.scrollLeft / w)),
      panelCount - 1,
    )
    onActiveChange(idx)
  }, [onActiveChange, panelCount])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onWheel = (e) => {
      if (e.deltaY === 0) return
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.addEventListener('scroll', emitActive, { passive: true })
    emitActive()
    return () => el.removeEventListener('scroll', emitActive)
  }, [emitActive])

  return (
    <div
      ref={ref}
      className="hide-scrollbar flex h-screen w-full snap-x snap-mandatory overflow-x-scroll"
    >
      {children}
    </div>
  )
}
