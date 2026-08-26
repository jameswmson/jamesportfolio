import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  SECTIONS,
  findPanelIndex,
  findSectionIndex,
  getPanelCount,
  getPanelSlug,
  headingIdFor,
} from '../data/sections.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'

/* Context modules export a hook alongside the provider. */
/* eslint-disable react-refresh/only-export-components */

const DESKTOP_QUERY = '(min-width: 768px)'
const REDUCE_QUERY = '(prefers-reduced-motion: reduce)'
const NUDGE_KEY = 'portfolio:projects-nudge'
const RUBBER_RATIO = 0.025
const INTERACTED_KEY = 'portfolio:has-interacted'

const StageContext = createContext(null)

function parseHash(hash) {
  const raw = String(hash || '').replace(/^#/, '').trim()
  if (!raw) return { sectionId: 'hero', panelSlug: null }
  const [sectionId, panelSlug] = raw.split('/')
  return { sectionId: sectionId || 'hero', panelSlug: panelSlug || null }
}

function buildHash(sectionId, panelSlug) {
  if ((!sectionId || sectionId === 'hero') && !panelSlug) return ''
  if (panelSlug) return `#${sectionId}/${panelSlug}`
  return `#${sectionId}`
}

function emptyPanels() {
  const map = {}
  for (const section of SECTIONS) {
    map[section.id] = 0
  }
  return map
}

function applyHashToIndices(hash) {
  const { sectionId, panelSlug } = parseHash(hash)
  const sectionIndex = findSectionIndex(sectionId)
  const section = SECTIONS[sectionIndex]
  const panels = emptyPanels()
  panels[section.id] = findPanelIndex(section, panelSlug)
  return { sectionIndex, panels }
}

export function StageProvider({ children }) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const reducedMotion = useMediaQuery(REDUCE_QUERY)

  const initial = applyHashToIndices(
    typeof window === 'undefined' ? '' : window.location.hash,
  )

  const [sectionIndex, setSectionIndex] = useState(initial.sectionIndex)
  const [panelIndexBySection, setPanelIndexBySection] = useState(initial.panels)
  const [sectionDir, setSectionDir] = useState(1)
  const [panelDir, setPanelDir] = useState(1)
  const [rubberX, setRubberX] = useState(0)
  const [rubberY, setRubberY] = useState(0)
  const [nudgeX, setNudgeX] = useState(0)
  const [lastTravel, setLastTravel] = useState('section')
  const [hasInteracted, setHasInteracted] = useState(() => {
    try {
      return sessionStorage.getItem(INTERACTED_KEY) === '1'
    } catch {
      return false
    }
  })
  const [viewport, setViewport] = useState(() => ({
    w: typeof window === 'undefined' ? 1280 : window.innerWidth,
    h: typeof window === 'undefined' ? 800 : window.innerHeight,
  }))

  const viewportNodeRef = useRef(null)
  const sectionIndexRef = useRef(sectionIndex)
  const panelMapRef = useRef(panelIndexBySection)
  const applyingHistoryRef = useRef(false)
  const skipFocusRef = useRef(true)
  const isDesktopRef = useRef(isDesktop)
  const reducedRef = useRef(reducedMotion)

  useEffect(() => {
    sectionIndexRef.current = sectionIndex
  }, [sectionIndex])
  useEffect(() => {
    panelMapRef.current = panelIndexBySection
  }, [panelIndexBySection])
  useEffect(() => {
    isDesktopRef.current = isDesktop
  }, [isDesktop])
  useEffect(() => {
    reducedRef.current = reducedMotion
  }, [reducedMotion])

  const setViewportNode = useCallback((node) => {
    viewportNodeRef.current = node
  }, [])

  const writeHistory = useCallback((sectionId, panelSlug, mode) => {
    if (applyingHistoryRef.current) return
    const url = `${window.location.pathname}${window.location.search}${buildHash(sectionId, panelSlug)}`
    if (mode === 'push') {
      window.history.pushState({ sectionId, panelSlug }, '', url)
    } else {
      window.history.replaceState({ sectionId, panelSlug }, '', url)
    }
  }, [])

  const currentHashParts = useCallback((nextSectionIndex, nextPanels) => {
    const section = SECTIONS[nextSectionIndex]
    const panelIndex = nextPanels[section.id] ?? 0
    return {
      sectionId: section.id,
      panelSlug: getPanelSlug(section, panelIndex),
    }
  }, [])

  const triggerRubber = useCallback((axis, sign) => {
    if (reducedRef.current || !isDesktopRef.current) return
    const size = axis === 'x' ? viewportNodeRef.current?.clientWidth : viewportNodeRef.current?.clientHeight
    const amount = Math.max(12, (size || 800) * RUBBER_RATIO) * Math.sign(sign || 1)
    if (axis === 'x') setRubberX(amount)
    else setRubberY(amount)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (axis === 'x') setRubberX(0)
        else setRubberY(0)
      })
    })
  }, [])

  const goSection = useCallback(
    (nextIndex, { fromHistory = false } = {}) => {
      const from = sectionIndexRef.current
      const max = SECTIONS.length - 1
      if (nextIndex < 0 || nextIndex > max) {
        triggerRubber('y', nextIndex < 0 ? -1 : 1)
        return false
      }
      if (nextIndex === from) return false
      setSectionDir(nextIndex > from ? 1 : -1)
      setLastTravel('section')
      setSectionIndex(nextIndex)
      if (!fromHistory) {
        const { sectionId, panelSlug } = currentHashParts(nextIndex, panelMapRef.current)
        writeHistory(sectionId, panelSlug, 'push')
      }
      return true
    },
    [currentHashParts, triggerRubber, writeHistory],
  )

  const goPanel = useCallback(
    (nextIndex, { fromHistory = false } = {}) => {
      const section = SECTIONS[sectionIndexRef.current]
      const count = getPanelCount(section)
      const from = panelMapRef.current[section.id] ?? 0
      if (count <= 1) {
        triggerRubber('x', nextIndex < from ? -1 : 1)
        return false
      }
      if (nextIndex < 0 || nextIndex >= count) {
        triggerRubber('x', nextIndex < 0 ? -1 : 1)
        return false
      }
      if (nextIndex === from) return false
      setPanelDir(nextIndex > from ? 1 : -1)
      setLastTravel('panel')
      setPanelIndexBySection((prev) => ({ ...prev, [section.id]: nextIndex }))
      if (!fromHistory) {
        writeHistory(section.id, getPanelSlug(section, nextIndex), 'replace')
      }
      return true
    },
    [triggerRubber, writeHistory],
  )

  const stepSection = useCallback(
    (dir) => goSection(sectionIndexRef.current + Math.sign(dir || 1)),
    [goSection],
  )

  const stepPanel = useCallback(
    (dir) => {
      const section = SECTIONS[sectionIndexRef.current]
      const from = panelMapRef.current[section.id] ?? 0
      return goPanel(from + Math.sign(dir || 1))
    },
    [goPanel],
  )

  const seekSectionId = useCallback(
    (id) => goSection(findSectionIndex(id)),
    [goSection],
  )

  const quietSection = useCallback((id) => {
    const nextIndex = findSectionIndex(id)
    if (nextIndex === sectionIndexRef.current) return
    setSectionDir(nextIndex > sectionIndexRef.current ? 1 : -1)
    setLastTravel('section')
    setSectionIndex(nextIndex)
    const { sectionId, panelSlug } = currentHashParts(nextIndex, panelMapRef.current)
    writeHistory(sectionId, panelSlug, 'replace')
  }, [currentHashParts, writeHistory])

  const markInteracted = useCallback(() => {
    setHasInteracted((prev) => {
      if (prev) return prev
      try {
        sessionStorage.setItem(INTERACTED_KEY, '1')
      } catch {
        /* ignore */
      }
      return true
    })
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (isDesktop) root.classList.add('stage-lock')
    else root.classList.remove('stage-lock')
    return () => root.classList.remove('stage-lock')
  }, [isDesktop])

  useEffect(() => {
    const onPop = () => {
      applyingHistoryRef.current = true
      const next = applyHashToIndices(window.location.hash)
      setSectionDir(next.sectionIndex >= sectionIndexRef.current ? 1 : -1)
      setSectionIndex(next.sectionIndex)
      setPanelIndexBySection((prev) => ({ ...prev, ...next.panels }))
      applyingHistoryRef.current = false
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    if (!isDesktop || reducedMotion) {
      const reset = window.setTimeout(() => setNudgeX(0), 0)
      return () => window.clearTimeout(reset)
    }
    if (SECTIONS[sectionIndex].id !== 'projects') return undefined
    try {
      if (sessionStorage.getItem(NUDGE_KEY)) return undefined
    } catch {
      /* ignore quota */
    }
    const start = window.setTimeout(() => setNudgeX(12), 0)
    const settle = window.setTimeout(() => {
      setNudgeX(0)
      try {
        sessionStorage.setItem(NUDGE_KEY, '1')
      } catch {
        /* ignore */
      }
    }, 80)
    return () => {
      window.clearTimeout(start)
      window.clearTimeout(settle)
    }
  }, [sectionIndex, isDesktop, reducedMotion])

  useEffect(() => {
    if (!isDesktop) return
    if (skipFocusRef.current) {
      skipFocusRef.current = false
      return
    }
    const section = SECTIONS[sectionIndex]
    const panelIndex = panelIndexBySection[section.id] ?? 0
    const id = headingIdFor(section, panelIndex)
    const el = document.getElementById(id)
    el?.focus({ preventScroll: true })
  }, [sectionIndex, panelIndexBySection, isDesktop])

  const value = useMemo(() => {
    const section = SECTIONS[sectionIndex]
    const panelIndex = panelIndexBySection[section.id] ?? 0
    return {
      SECTIONS,
      sectionIndex,
      section,
      panelIndex,
      panelIndexBySection,
      panelCount: getPanelCount(section),
      sectionDir,
      panelDir,
      lastTravel,
      rubberX,
      rubberY,
      nudgeX,
      hasInteracted,
      isDesktop,
      reducedMotion,
      viewport,
      setViewport,
      setViewportNode,
      viewportNodeRef,
      goSection,
      goPanel,
      stepSection,
      stepPanel,
      seekSectionId,
      quietSection,
      markInteracted,
      triggerRubber,
    }
  }, [
    sectionIndex,
    panelIndexBySection,
    sectionDir,
    panelDir,
    lastTravel,
    rubberX,
    rubberY,
    nudgeX,
    hasInteracted,
    isDesktop,
    reducedMotion,
    viewport,
    setViewportNode,
    goSection,
    goPanel,
    stepSection,
    stepPanel,
    seekSectionId,
    quietSection,
    markInteracted,
    triggerRubber,
  ])

  return <StageContext.Provider value={value}>{children}</StageContext.Provider>
}

export function useStage() {
  const ctx = useContext(StageContext)
  if (!ctx) throw new Error('useStage must be used within StageProvider')
  return ctx
}
