# Project Visual Redesign

## Goal

Replace the AI Creator Studio screenshot with an editorial, typography-led
visual that matches the structure and scale of the Fluffy Star Auto Battler
visual. Simplify the selected-work introduction heading.

## Selected Work Introduction

- Keep the existing `02 / SELECTED WORK` label.
- Replace `Products, not just pictures.` with the exact heading `Project`.
- Keep the existing paragraph explaining that the portfolio contains two
  working prototypes.
- Preserve the current three-column editorial layout on desktop and the
  existing responsive stacking behavior.

## AI Creator Studio Visual

- Remove the AI Creator Studio screenshot from the project data and rendered
  markup.
- Delete `public/ai-creator-studio.png` because it will no longer be used.
- Keep the visual panel at the same height and responsive breakpoints as the
  Fluffy Star Auto Battler panel.
- Use a deep blue-black background with restrained cyan glow and fine orbital
  lines.
- Center a large serif wordmark split over two lines:
  `AI CREATOR` / `STUDIO`.
- Place a small abstract AI-node symbol above the wordmark.
- Add the mono subtitle `AI WORKFLOW SAAS` below the wordmark.
- Keep the `01` project-number badge in its current location.

## Fluffy Star Auto Battler

Do not change its visual, copy, metadata, or interaction. It remains the
reference for the AI visual's scale, hierarchy, and responsive behavior.

## Project Information

Keep both projects' existing category, title, description, Role, Focus,
Designed, and Open MVP areas unchanged.

## Accessibility and Motion

- The decorative AI visual is hidden from assistive technology.
- All readable project information remains in the semantic information area.
- Any new decorative motion must stop when `prefers-reduced-motion` is active.
- Text contrast must remain readable against the dark panel.

## Verification

- A source test must prove that the old image path is absent.
- A source test must prove that the new AI wordmark and the `Project` heading
  are present.
- Existing portfolio, accessibility, GitHub Pages, and asset-path tests must
  continue to pass.
- The GitHub Pages static export and output verifier must pass.
- Desktop and mobile layouts must be visually checked before deployment.
