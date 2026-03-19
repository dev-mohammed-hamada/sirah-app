# Task 23: Design System — Shared Components

## Priority: HIGH (blocks all screen development)

## Description

Build the reusable UI component library based on the design system spec. These components are used across all screens.

## Components to Build

### Navigation

- **Bottom Nav Bar (Son):** 5 tabs, Deep Night Blue, Desert Gold active with bounce
- **Bottom Nav Bar (Father):** 2 tabs (Sons, Goals), centered
- **Top Status Bar:** Glassmorphism, avatar+name, hearts/streak/XP

### Buttons

- **Primary Button:** Desert Gold, 48px height, full-width, press scale 0.97
- **Secondary Button:** Transparent with Desert Gold border
- **Text Button:** Desert Gold text, no background

### Inputs

- **Input Field:** 52px height, floating label, Desert Gold focus, Error Red error
- **Toggle Switch:** 48x28px, Desert Gold on-state
- **Date Picker:** Native picker wrapper

### Cards

- **Card:** Warm Sand bg, Level 1 shadow, 16px radius
- **Setting Row:** 56px height, icon+label, chevron/toggle

### Feedback

- **Narrator Speech Bubble:** Starlight White, golden border, typewriter effect
- **Toast:** Success/error notifications
- **Loading Spinner:** Desert Gold Lottie

### Typography

- Cairo font integration (all 8 style levels)

### Theme

- Color tokens, gradients, spacing, shadows, corner radius

## Technical

- All components RTL-ready (`start`/`end`)
- Dark and light variants where needed
- Storybook or test screen for component showcase
- Consistent with `mobile/src/theme/` existing setup

## Acceptance Criteria

- [x] All components match design system spec
- [x] RTL layout works correctly
- [x] Cairo font renders at all weights
- [x] Color tokens match spec
- [x] Components accept appropriate props
- [x] Press/focus/error states work

## References

- `designs/00-design-system.md` — complete spec
