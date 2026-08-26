import { experience } from './experience.js'
import { leadership } from './leadership.js'
import { projects } from './projects.js'

export const SECTIONS = [
  { id: 'hero', label: 'Home', title: 'James Williamson' },
  { id: 'about', label: 'About', title: 'About' },
  { id: 'projects', label: 'Projects', title: 'Projects', items: projects },
  { id: 'experience', label: 'Experience', title: 'Experience', items: experience },
  { id: 'leadership', label: 'Leadership', title: 'Leadership', items: leadership },
  { id: 'skills', label: 'Skills', title: 'Skills' },
  { id: 'contact', label: 'Contact', title: 'Contact' },
]

export function getPanelCount(section) {
  return section.items?.length ?? 1
}

export function getPanelSlug(section, index) {
  return section.items?.[index]?.slug ?? null
}

export function findSectionIndex(id) {
  const i = SECTIONS.findIndex((s) => s.id === id)
  return i < 0 ? 0 : i
}

export function findPanelIndex(section, slug) {
  if (!slug || !section.items) return 0
  const i = section.items.findIndex((item) => item.slug === slug)
  return i < 0 ? 0 : i
}

export function headingIdFor(section, panelIndex = 0) {
  if (section.items) return `heading-${section.id}-${panelIndex}`
  return `heading-${section.id}`
}
