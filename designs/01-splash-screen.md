# Screen 01: Splash Screen

### شاشة البداية

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, and shared components.

---

## Purpose

First impression — set the tone, build anticipation. This is the very first thing the child sees when opening the app. It should feel like opening a storybook.

---

## Layout

- **Full-screen illustration:** a **starry desert night sky** as the background
  - Gradient from Deep Night Blue (`#1A2744`) at top to Royal Purple (`#4A2D6B`) at horizon
- **Desert dunes silhouette** along the bottom 20% of the screen in sandy golden tones
- A single **campfire** in the center-bottom, glowing with warm orange light
- The **Narrator silhouette** (from behind) sits beside the fire, looking up at the stars
- **App logo/name** centered in the upper third:
  - "سيرة النبي ﷺ" in Cairo Black, Starlight White (`#FFF8F0`)
  - Subtle golden text shadow
- **Tagline** below the logo:
  - "تعلّم السيرة وأنت تلعب" in Cairo Regular, Starlight White at 80% opacity

---

## Visual Composition

```
┌─────────────────────────────┐
│         ✦  ✧    ✦          │  ← Starry Night Sky
│      ✧       ✦    ✧        │     (Night Sky gradient)
│                             │
│     سيرة النبي ﷺ           │  ← App Logo (Cairo Black 32px)
│   تعلّم السيرة وأنت تلعب    │  ← Tagline (Cairo Regular 16px)
│                             │
│                             │
│                             │
│          🔥                 │  ← Campfire (Lottie animation)
│        ░░████░░             │  ← Narrator silhouette (from behind)
│ ~~~~~~~~~~~~~~~~~~~~~~~~~~~ │  ← Desert dunes silhouette
└─────────────────────────────┘
```

---

## Animations

| Step | Element             | Animation                                                               | Duration       | Delay        |
| ---- | ------------------- | ----------------------------------------------------------------------- | -------------- | ------------ |
| 1    | Entire screen       | Fade in from black                                                      | 600ms          | 0ms          |
| 2    | Stars               | Begin twinkling — random stars pulse in brightness                      | Infinite loop  | Staggered    |
| 3    | Campfire            | Flickering warm glow — Lottie fire animation with light casting on sand | Infinite loop  | 0ms          |
| 4    | Narrator silhouette | Fades in gently, shifts up slightly                                     | 400ms          | 300ms        |
| 5    | Logo                | Scales in from 0.8→1.0 with soft bounce                                 | 500ms (spring) | 600ms        |
| 6    | Tagline             | Fades in from 0→100% opacity                                            | 300ms          | 900ms        |
| 7    | Auto-transition     | Fades through to Onboarding (first-time) or Home (logged in)            | 400ms          | 2500ms total |

---

## Lottie Animations Required

- **Campfire:** Warm flickering fire with light glow cast on surrounding sand. Loop.
- **Star twinkle:** Random stars pulse brighter and dimmer. Infinite, staggered delays.

---

## Transition

- After 2.5 seconds total display time, auto-transitions:
  - **First-time user** → Onboarding Screen 1 (`02-onboarding-1.md`)
  - **Logged-in user** → Home / Journey Map (`08-home-journey-map.md`)
- Transition type: Fade-through (current fades out while next fades in)

---

## Mood

Magical, serene, like the opening scene of a storybook. The child should feel like they're entering a different world.

---

## Assets Needed

| Asset                                     | Description                        | Format                  |
| ----------------------------------------- | ---------------------------------- | ----------------------- |
| Desert night sky background               | Starry sky with gradient, high-res | PNG or SVG, full screen |
| Desert dunes silhouette                   | Sandy golden horizon line          | SVG (scalable)          |
| Campfire scene                            | Fire on sand with warm glow        | Lottie JSON             |
| Narrator silhouette (seated, from behind) | Faceless man in white thobe        | PNG with transparent BG |
| Star twinkle overlay                      | Twinkling star effect              | Lottie JSON             |
