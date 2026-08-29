# Mobile Card Layout Design

## Goal

Make the portfolio's mobile stage usable without overlap while preserving the desktop composition, receding card deck, section content, and dark frameless visual treatment. Replace the numeric folio with the active section name at every viewport width.

## Scope

- Optimize Projects, Experience, Leadership, and Skills cards at widths up to 820px.
- Prevent overlap among the folio label, live card, panel controls, and section navigation.
- Keep desktop slab geometry and positioning unchanged.
- Render folio copy as `James — Home`, `James — About`, `James — Projects`, `James — Experience`, `James — Leadership`, `James — Skills`, or `James — Contact`.
- Preserve Hero, About, Contact, section order, deck motion, and all content.

## Responsive Layout

At widths up to 820px, the viewport is divided into explicit safe zones:

1. A top zone for the current-section folio.
2. A central zone for the active slab.
3. A controls zone for previous/next deck buttons when the section contains multiple cards.
4. A bottom zone for section navigation.

Mobile slab width remains viewport-relative. Slab height and vertical offset reserve enough room for the controls and navigation instead of centering the card across the entire viewport. Mobile slab padding becomes `24px 20px`. Overflow remains internal to the slab when content exceeds the available height.

The mobile section navigation becomes one horizontally scrollable row with 44px minimum touch targets. When the active section changes, its button scrolls into view. Panel controls occupy a separate row above the navigation and never overlay the live slab.

Short landscape viewports receive a compact height override so the slab remains visible and internally scrollable without colliding with fixed chrome.

## Section Label

`Folio` reads the active label from the existing `sections` data rather than formatting a number. This keeps navigation and folio naming sourced from one list and applies consistently on desktop and mobile.

## Accessibility and Interaction

- Section navigation buttons keep visible text and `aria-current`.
- Mobile navigation targets are at least 44px tall.
- Programmatic scrolling only keeps the active navigation item visible; it does not change the selected section.
- Existing reduced-motion behavior and keyboard-operable buttons remain intact.

## Verification

- Add focused tests for mapping a section index to its label and for active navigation visibility behavior where practical.
- Run lint and production build.
- Check every section and every deck panel at 320×568, 375×812, 820px wide, and mobile landscape.
- Confirm by bounding rectangles that the folio, active slab, panel controls, and navigation do not intersect.
- Confirm no horizontal page overflow; only the navigation row may scroll horizontally.
