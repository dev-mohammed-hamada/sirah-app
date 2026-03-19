# Screen 17: Awards Screen

### شاشة الإنجازات

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Bottom Navigation Bar).

---

## Purpose

Showcase all earned rewards — XP level, achievement stats, and badges. Should feel like a trophy room or museum — premium and aspirational.

---

## Layout

- **Background:** Night Sky gradient (gives awards a premium, museum-like feel)
- **Header:** "إنجازاتي" — Cairo Bold 24px, Starlight White, centered
- **Bottom Navigation:** Son's nav bar (Awards tab active)

### XP Level Display (hero section)

- **Large circular progress ring:** 120px diameter, centered
  - Ring track: Starlight White at 15%
  - Ring fill: Desert Gold, shows progress to next level
  - Ring width: 6px
- **Level number** in center: Cairo Black 40px, Desert Gold
- **Label:** "المستوى ٥" — Cairo Bold 14px, Starlight White, below ring
- **XP to next level:** "١٢٠ نقطة للمستوى التالي" — Cairo Regular 12px, Starlight White at 70%, below label

### Stats Grid

2×2 grid of stat cards (12px gap):

| Stat             | Icon | Number | Label        |
| ---------------- | ---- | ------ | ------------ |
| Total Stars      | ⭐   | 18     | "النجوم"     |
| Stages Completed | ✅   | 4      | "المراحل"    |
| Longest Streak   | 🔥   | 12     | "أطول سلسلة" |
| Perfect Runs     | 💎   | 2      | "أداء مثالي" |

**Each card:**

- Background: Deep Night Blue at 80% + subtle border (Starlight White at 10%)
- Radius: 16px
- Icon: 24px, Desert Gold tint
- Number: Cairo Bold 24px, Starlight White
- Label: Cairo Regular 11px, Starlight White at 60%
- Padding: 16px
- Size: ~48% width each

### Badges Section

**Section header:** "الشارات" — Cairo Bold 20px, Starlight White

**Grid layout:** 3 columns, 16px gap

**Earned badge:**

- Circle: 72px, filled with badge color
- Golden border (2px, `#D4A843`)
- Subtle shimmer animation (occasional, 3s interval)
- Name below: Cairo Medium 11px, Starlight White

**Locked badge:**

- Circle: 72px, dark gray fill
- Dashed border (1px, Muted Gray at 40%)
- "?" in center: Cairo Bold 24px, Muted Gray
- Name below: Cairo Medium 11px, Muted Gray

**V1 prototype badges (placeholder names):**

- Badge 1: "المبتدئ" (first stage completed)
- Badge 2: "المثابر" (3-day streak)
- Badge 3: "النجم" (first 3-star stage)
- Badge 4: "الحافظ" (7-day streak)
- Badge 5: "المتقن" (first perfect run)
- Badge 6: "البطل" (complete all stages)
- _(4 more locked/placeholder)_

---

## Visual Composition

```
┌─────────────────────────────┐
│          إنجازاتي            │  ← Header (white on dark)
│                             │
│         ╭────────╮          │
│         │        │          │  ← XP Level Ring (120px)
│         │   5    │          │     Desert Gold fill
│         │        │          │
│         ╰────────╯          │
│         المستوى ٥            │
│    ١٢٠ نقطة للمستوى التالي   │
│                             │
│  ┌──────────┐┌──────────┐   │
│  │ ⭐  18   ││ ✅   4   │   │  ← Stats grid (2×2)
│  │ النجوم   ││ المراحل  │   │
│  └──────────┘└──────────┘   │
│  ┌──────────┐┌──────────┐   │
│  │ 🔥  12   ││ 💎   2   │   │
│  │أطول سلسلة││أداء مثالي│   │
│  └──────────┘└──────────┘   │
│                             │
│  الشارات                    │  ← Section header
│                             │
│  ┌────┐ ┌────┐ ┌────┐      │
│  │ 🏅 │ │ 🏅 │ │ 🏅 │      │  ← Earned badges (gold border)
│  │المبتدئ│ │المثابر│ │النجم│ │
│  └────┘ └────┘ └────┘      │
│  ┌────┐ ┌────┐ ┌────┐      │
│  │ ?  │ │ ?  │ │ ?  │      │  ← Locked badges (gray)
│  │الحافظ│ │المتقن│ │البطل│  │
│  └────┘ └────┘ └────┘      │
│                             │
├─────────────────────────────┤
│ ⚙️ | 🏆 | 🎯 | 📊 | 🏠    │  ← Bottom Nav (Awards active)
└─────────────────────────────┘
```

---

## Animations

| #   | Element              | Animation                                | Duration            | Notes               |
| --- | -------------------- | ---------------------------------------- | ------------------- | ------------------- |
| 1   | XP ring              | Draws itself from 0 to current fill      | 800ms (ease-out)    | On screen load      |
| 2   | Level number         | Counts up from 0                         | 400ms               | After ring draws    |
| 3   | Stats cards          | 3D flip-in effect (rotate Y from 90°→0°) | 300ms each          | Staggered 150ms     |
| 4   | Stat numbers         | Count up from 0                          | 300ms               | After flip          |
| 5   | Earned badges        | Pop in with sparkle (scale 0→1.1→1.0)    | 200ms each (spring) | Staggered 100ms     |
| 6   | Locked badges        | Fade in at 50% opacity                   | 200ms each          | After earned badges |
| 7   | Earned badge shimmer | Subtle light sweep across badge surface  | 600ms, every 3s     | Ongoing, staggered  |
| 8   | Background stars     | Very slow parallax movement on scroll    | Scroll-linked       | Subtle depth        |

---

## Interaction

| Action                             | Result                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------ |
| Tap earned badge                   | Badge scales up to center with golden glow backdrop — shows name + how earned + date |
| Tap locked badge                   | Brief shake + tooltip: unlock requirement text                                       |
| Tap "الشارات" header or "عرض الكل" | Navigate to full Badges Screen (`18-badges-screen.md`)                               |

### Badge Detail Overlay (on earned badge tap)

- **Backdrop:** Dark overlay (50% black)
- **Card:** Starlight White, 24px radius, Level 3 shadow, centered, max-width 280px
- **Content:**
  - Large badge icon (120px, centered)
  - Badge name: Cairo Bold 20px
  - Description: Cairo Regular 14px, Muted Gray
  - "حصلت عليها في: ١٢ مارس ٢٠٢٦" — Cairo Regular 12px
  - "إغلاق" button: Secondary Button
- **Animation:** Scales in from the tapped badge's position (origin-aware, 300ms spring)
- **Dismiss:** Tap outside or tap "إغلاق"

---

## Assets Needed

| Asset                | Description                      | Format                        |
| -------------------- | -------------------------------- | ----------------------------- |
| XP level ring        | Animated progress ring           | SVG + CSS animation or Lottie |
| Badge icons (10)     | V1 prototype badge illustrations | SVG/PNG, 72px                 |
| Badge shimmer effect | Light sweep across surface       | CSS animation or Lottie       |
| Stat icons (4)       | Star, checkmark, flame, diamond  | SVG, 24px                     |
