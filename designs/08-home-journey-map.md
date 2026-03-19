# Screen 08: Home / Journey Map

### الرئيسية — خريطة الرحلة

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Bottom Navigation Bar, Top Status Bar).

---

## Purpose

The heart of the app — the desert path showing all stages. This is where the child spends most of their time. It should feel like a living, breathing world they are journeying through.

---

## Layout

### Background (Full scrollable canvas)

- A **vertically scrollable desert landscape illustration**
  - **Sky:** Night Sky gradient at the top, transitioning to a warm sunset horizon
  - **Terrain:** Sandy dunes, scattered desert plants, rock formations, distant mountain silhouettes
  - **Atmosphere:** Tiny floating particles (dust/sand) drifting slowly, stars twinkling in the sky portion
  - Total canvas height: ~3000px (scrollable)

### Top Status Bar (fixed, floating over the map)

- Semi-transparent Deep Night Blue bar with blur effect (glassmorphism)
- Height: 64px + safe area inset
- **RTL Layout:**
  - Right: circular avatar frame (2px Desert Gold border) + display name (Cairo Medium 14px, white)
  - Left: ❤️ ×5 | 🔥 ×7 | ⭐ 340 XP (each with icon + number)

### The Path

- A **winding golden-sand road** that snakes vertically through the landscape
- Subtle sand/gravel texture on the path surface
- Path curves left and right alternately, creating an S-shape progression
- Small decorative elements along the path: palm trees, rocks, desert flowers, small tents

### Stage Nodes (along the path)

| State                  | Size        | Style                               | Glow               | Extra                                                                         |
| ---------------------- | ----------- | ----------------------------------- | ------------------ | ----------------------------------------------------------------------------- |
| **Completed**          | 64px circle | Golden circle, stage number inside  | Subtle golden glow | Stars displayed below (1–3 small star icons)                                  |
| **Current (unlocked)** | 72px circle | Animated pulsing glow (Desert Gold) | 2s loop, bright    | Bouncing up/down (4px, 3s loop). Small Narrator silhouette next to it, waving |
| **Locked**             | 64px circle | Dark gray circle, lock icon inside  | None               | Dimmed, desaturated                                                           |

Each node has a **small label** below: stage's Arabic title in Cairo Medium 12px.

### Stage Node Thematic Illustrations

Each node has a unique small illustration behind/around it:

| Stage | Theme                | Illustration                    |
| ----- | -------------------- | ------------------------------- |
| 1     | Before the Birth     | Crescent moon and stars cluster |
| 2     | Year of the Elephant | Small elephant silhouette       |
| 3     | The Birth            | Glowing light rays              |
| 4     | Childhood            | Small desert tent               |
| 5     | Youth                | Mountain silhouette             |
| 6     | The Cave of Hira     | Cave entrance with light inside |
| 7     | The First Revelation | Glowing scroll                  |
| 8     | Early Followers      | Small group of silhouettes      |
| 9     | The Migration        | Camel silhouette at night       |
| 10    | Arrival in Medina    | Palm trees and buildings        |

### Daily Challenge Banner (floating, conditional)

- Appears near the top of scroll area (below status bar) if daily challenge is available
- **Card:** Warm Sand bg, golden border (1.5px), 16px radius, Level 2 shadow
- **Content:** "⚡ تحدي اليوم جاهز!" (Cairo Bold 14px) + "ابدأ" button (small Primary Button)
- Dismissible with swipe or X button
- Gentle side-to-side wobble animation (subtle, 4s loop)

### Bottom Navigation Bar (fixed)

- As defined in design system — 5 tabs for Son

---

## Visual Composition

```
┌─────────────────────────────┐
│ [XP⭐340] [🔥7] [❤️5]  محمد│  ← Fixed Status Bar (glassmorphism)
│                             │
│  ⚡ تحدي اليوم جاهز! [ابدأ] │  ← Daily Challenge Banner
│                             │
│      ✦  ✧    ✦   ✧         │  ← Starry sky (top of scroll)
│           ⛰️ mountains      │
│                             │
│        🔒 Stage 10          │  ← Locked (gray, dimmed)
│       ╱    (المدينة)        │
│     ╱                       │
│   🔒 Stage 9               │  ← Locked
│     ╲    (الهجرة)           │
│       ╲                     │
│     🔒 Stage 8              │  ← Locked
│       ╱  (الأتباع)          │
│     ╱                       │
│   ✨ Stage 5 ← current     │  ← Current (pulsing, Narrator beside)
│     ╲   👤 (الشباب)        │     Narrator waving
│       ╲                     │
│     ⭐⭐⭐ Stage 4           │  ← Completed (3 stars)
│       ╱   (الطفولة)         │
│     ╱                       │
│   ⭐⭐ Stage 3              │  ← Completed (2 stars)
│     ╲    (المولد)           │
│       ╲                     │
│     ⭐⭐⭐ Stage 2           │  ← Completed (3 stars)
│       ╱  (عام الفيل)        │
│     ╱                       │
│   ⭐⭐ Stage 1              │  ← Completed (2 stars)
│        (ما قبل الميلاد)     │
│  ~~~ desert ground ~~~      │
│                             │
├─────────────────────────────┤
│ ⚙️ | 🏆 | 🎯 | 📊 | 🏠    │  ← Bottom Navigation (fixed)
└─────────────────────────────┘
```

---

## Animations

| #   | Element               | Animation                                                              | Duration             | Notes                             |
| --- | --------------------- | ---------------------------------------------------------------------- | -------------------- | --------------------------------- |
| 1   | Initial load          | Camera (scroll) starts at bottom, smoothly scrolls up to current stage | 800ms (ease-out)     | First load only                   |
| 2   | Path trail            | Path "draws" as user scrolls down to completed sections                | Parallax-linked      | Subtle trail effect               |
| 3   | Completed nodes       | Subtle shimmer passes over them occasionally                           | 2s, random intervals | Very subtle                       |
| 4   | Current node          | Pulsing glow (opacity 0.5→1.0→0.5)                                     | 2s loop              | Always active                     |
| 5   | Current node          | Gentle bounce up/down                                                  | 3s loop, 4px travel  | Always active                     |
| 6   | Narrator (at current) | Idle sway + occasional wave                                            | 4s loop              | Lottie                            |
| 7   | Sand particles        | Tiny particles drifting across screen                                  | Infinite, very slow  | Lottie overlay                    |
| 8   | Stars (sky area)      | Random twinkle                                                         | Infinite, staggered  | Only visible when scrolled to top |
| 9   | Parallax              | Stars move slower than terrain when scrolling                          | Scroll-linked        | Depth effect                      |
| 10  | Node tap (completed)  | Node scales 1.0→1.2 (200ms spring), opens detail                       | 200ms                | On tap                            |
| 11  | Node tap (locked)     | Brief shake + lock icon bounces, tooltip appears                       | 300ms                | On tap                            |
| 12  | Pull-to-refresh       | Sand-swirl animation at top                                            | Until data loads     | Custom refresh indicator          |
| 13  | Daily banner          | Side-to-side wobble                                                    | 4s loop, subtle      | Attract attention                 |

---

## Interaction

| Action                     | Result                                                                    |
| -------------------------- | ------------------------------------------------------------------------- |
| Tap completed stage        | Opens Stage Detail bottom sheet (`09-stage-detail.md`) with replay option |
| Tap current stage          | Opens Stage Detail with play option                                       |
| Tap locked stage           | Shake animation + tooltip: "أكمل المراحل السابقة أولاً"                   |
| Tap daily challenge banner | Navigate to Daily Challenge (`19-daily-challenge.md`)                     |
| Dismiss banner (swipe/X)   | Banner slides away, reappears next app open if still available            |
| Pull-to-refresh            | Refreshes progress data                                                   |
| Scroll                     | Free vertical scroll through the entire map                               |

---

## Assets Needed

| Asset                                 | Description                                             | Format                  |
| ------------------------------------- | ------------------------------------------------------- | ----------------------- |
| Journey map landscape                 | Continuous vertical desert scene (~3000px tall)         | PNG layers for parallax |
| Stage node circles (3 states)         | Completed (gold), Current (glowing gold), Locked (gray) | SVG                     |
| 10 stage thematic illustrations       | See table above, 120×120px each                         | PNG, transparent BG     |
| Narrator idle animation               | Small Narrator beside current node                      | Lottie JSON             |
| Sand particles overlay                | Drifting dust effect                                    | Lottie JSON             |
| Star twinkle overlay                  | For sky section                                         | Lottie JSON             |
| Palm trees, rocks, tents (decorative) | Small desert props along the path                       | SVG/PNG                 |
