# Screen 02: Onboarding — Page 1
### رحلة عبر الزمن

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, and shared components.

---

## Purpose

First of 3 onboarding panels. Introduces the concept of a journey through the Seerah. First-time users only — shown once after splash.

---

## Layout

- **Background:** Night Sky gradient (full screen)
- **Illustration area** (top 60% of screen height):
  - A winding golden path stretching across a desert landscape under a starlit sky
  - Small glowing stage markers along the path (like lanterns or golden dots)
  - At the end of the path, a distant glowing city silhouette (Mecca)
  - Desert terrain with subtle sand dunes and scattered desert plants

- **Text area** (below illustration):
  - **Title:** "رحلة عبر الزمن" — Cairo Bold 24px, Starlight White, centered
  - **Description:** "انطلق في رحلة مشوقة عبر سيرة النبي ﷺ مرحلة بمرحلة" — Cairo Regular 16px, Starlight White at 80% opacity, centered, max 2 lines

- **Navigation elements:**
  - **Page indicator dots** at bottom-center: 3 dots
    - Active (page 1): Desert Gold, 8px diameter
    - Inactive: White at 30% opacity, 6px diameter
  - **Skip button** top-left (RTL: top-right): "تخطي" in Cairo Medium 14px, white at 60%
  - **Next button** bottom-center: Primary Button style — "التالي"

---

## Visual Composition

```
┌─────────────────────────────┐
│  تخطي                       │  ← Skip button (top-right RTL)
│                             │
│      ✦   ✧    ✦   ✧        │  ← Starry sky
│                             │
│         🏙️ (distant)        │  ← Mecca silhouette (glowing)
│        ╱                    │
│    ●──╱                     │  ← Golden path with
│      ╱──●                   │     stage markers (●)
│    ╱      ╲                 │
│  ●──────────●               │  ← Path winds through desert
│  ~~~ dunes ~~~              │
│                             │
│     رحلة عبر الزمن           │  ← Title
│  انطلق في رحلة مشوقة عبر    │  ← Description
│  سيرة النبي ﷺ مرحلة بمرحلة  │
│                             │
│        ● ○ ○                │  ← Page dots (1 active)
│      [ التالي ]              │  ← Next button
└─────────────────────────────┘
```

---

## Animations

| Step | Element | Animation | Duration | Delay |
|------|---------|-----------|----------|-------|
| 1 | Golden path | Draws itself from bottom-right to top-left | 1200ms (ease-out) | 0ms |
| 2 | Stage markers | Pop in sequentially along the path | 100ms each | Staggered after path draws |
| 3 | Mecca silhouette | Gentle glow pulse once path reaches it | 600ms | After path completes |
| 4 | Title | Fades in with slight upward motion | 300ms | 200ms after path |
| 5 | Description | Fades in | 300ms | 100ms after title |
| 6 | Next button | Fades in from below | 200ms | After description |

---

## Interaction

- **Swipe left (RTL):** Advances to Onboarding Page 2 (`03-onboarding-2.md`)
- **Tap "التالي":** Same as swipe — advances to next page
- **Tap "تخطي":** Skips all onboarding → Landing Screen (`05-landing-screen.md`)

---

## Swipe Transition

- Illustrations cross-fade while sliding horizontally
- Duration: 300ms
- Direction: Current slides out left (RTL), next slides in from right (RTL)

---

## Assets Needed

| Asset | Description | Format |
|-------|-------------|--------|
| Desert path illustration | Winding golden path through desert with stage markers | PNG/SVG, ~80% screen width, ~50% screen height |
| Mecca silhouette | Distant glowing city | Part of the path illustration or separate layer |
| Stage marker glow | Small golden glowing dot | SVG or Lottie for glow animation |
