# Mobile Card Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent mobile chrome and frameless cards from overlapping while replacing numeric folios with active section names.

**Architecture:** Keep the fixed stage and receding deck intact. Add mobile-only safe-zone tokens and navigation behavior, then source the folio text from the existing section data.

**Tech Stack:** React 19, Tailwind CSS 4, Vite 8, browser-based responsive verification.

## Global Constraints

- Desktop slab geometry and deck motion remain unchanged.
- Mobile applies at widths up to 820px.
- Preserve Hero, About, Contact, content, section order, and reduced-motion behavior.
- Validate at 320×568, 375×812, 820px, and mobile landscape.

---

### Task 1: Section-name folio

**Files:**
- Modify: `portfolio/src/components/Folio.jsx`
- Modify: `portfolio/src/App.jsx`

**Interfaces:**
- Consumes: `sections[section].label`
- Produces: `<Folio label={string} />`

- [ ] Capture the current numeric folio as the failing browser assertion.
- [ ] Change `Folio` to render the supplied section label.
- [ ] Pass the current label from `App`.
- [ ] Verify every section renders `James — <Section>`.

### Task 2: Mobile safe zones and controls

**Files:**
- Modify: `portfolio/src/index.css`
- Modify: `portfolio/src/components/DeckSlab.jsx`
- Modify: `portfolio/src/components/CenterSlab.jsx`
- Modify: `portfolio/src/components/PanelChrome.jsx`

**Interfaces:**
- Consumes: CSS custom properties for slab height, vertical offset, controls, and navigation.
- Produces: non-overlapping mobile header, card, controls, and navigation regions.

- [ ] Capture existing mobile rectangle intersections as the failing layout assertion.
- [ ] Add mobile-only safe-zone tokens, `24px 20px` slab padding, and short-landscape overrides.
- [ ] Apply a shared slab vertical offset to deck and centered slabs.
- [ ] Give panel controls a mobile-safe class and position.
- [ ] Verify the live card and fixed chrome rectangles do not intersect.

### Task 3: Mobile section navigation

**Files:**
- Modify: `portfolio/src/components/SectionNav.jsx`
- Modify: `portfolio/src/index.css`

**Interfaces:**
- Consumes: active `section` index.
- Produces: one horizontally scrollable mobile navigation row with a minimum 44px target height and active-item visibility.

- [ ] Capture wrapped/overlapping navigation as the failing mobile assertion.
- [ ] Add refs and an effect that calls `scrollIntoView({ inline: 'center', block: 'nearest' })` for the active item.
- [ ] Add mobile-only nowrap, horizontal scrolling, edge padding, and touch-target styles.
- [ ] Verify section changes keep the active item visible without changing selection.

### Task 4: Final verification

**Files:**
- Verify all modified portfolio files.

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Check every section and deck panel at all target viewports.
- [ ] Confirm there is no page-level horizontal overflow and no rectangle overlap.
