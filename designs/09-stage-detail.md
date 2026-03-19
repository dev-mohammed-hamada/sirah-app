# Screen 09: Stage Detail

### تفاصيل المرحلة

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Primary Button, Card Component).

---

## Purpose

Preview a stage before starting — shows info, score history, and the action to play or replay. Presented as a bottom sheet over the Journey Map.

---

## Layout

### Presentation

- **Bottom sheet** that slides up over the Journey Map
- Covers **70%** of screen height
- Background: Warm Sand (`#F5E6C8`)
- Rounded top corners: 24px
- Rest of screen (top 30%): Journey Map is visible but dimmed (40% black overlay)

### Handle Bar

- Small gray pill at top center: 36×4px, rounded, Muted Gray at 40%
- Draggable to dismiss

### Hero Illustration

- Full-width, 180px height
- The thematic illustration for this stage (wider, more detailed version of the node illustration)
- Rounded top matching the sheet radius
- Subtle gradient overlay at bottom (Warm Sand at 0%→100% opacity) to blend into content

### Stage Info

- **Stage title:** Arabic title — Cairo Bold 24px, Deep Night Blue, centered
- **Stage subtitle:** Brief one-line teaser — Cairo Regular 14px, Muted Gray, centered
  - Example: "اكتشف قصة عام الفيل وما حدث قبل ميلاد النبي ﷺ"
- **Divider:** Thin golden line (1px, 60% width, centered)

### Stats Row (only if previously completed)

Three items in a horizontal row, evenly spaced:

| Stat       | Icon | Format                | Container                                       |
| ---------- | ---- | --------------------- | ----------------------------------------------- |
| Stars      | ⭐   | "2/3" with star icons | Rounded pill, Starlight White bg, golden border |
| Best Score | 🏆   | "78/100"              | Same pill style                                 |
| Attempts   | 🔄   | "2"                   | Same pill style                                 |

### Action Button

| State             | Button Text    | Style                      | Extra                                                                         |
| ----------------- | -------------- | -------------------------- | ----------------------------------------------------------------------------- |
| Never played      | "ابدأ المرحلة" | Primary Button, full-width | —                                                                             |
| Previously played | "أعد المحاولة" | Primary Button, full-width | Secondary text below: "أفضل نتيجتك: 78/100" in Cairo Regular 12px, Muted Gray |

### Hearts Indicator

Below the action button:

- Full hearts: "❤️ ×5 جاهز" — Cairo Regular 14px, Success Green
- Refilling: "❤️ ×3 متبقي — ⏰ ١٢:٣٤" with countdown timer — Cairo Regular 14px, Sunset Orange

---

## Visual Composition

```
┌─────────────────────────────┐
│      (Journey Map dimmed)   │  ← 30% visible, 40% dark overlay
│                             │
├──────────━━━━━──────────────┤  ← Handle bar (pill)
│                             │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │   Stage Illustration  │  │  ← Hero image (180px)
│  │     (e.g. Elephant    │  │
│  │      Army scene)      │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│       عام الفيل             │  ← Stage title
│  اكتشف قصة عام الفيل وما   │  ← Subtitle
│   حدث قبل ميلاد النبي ﷺ    │
│                             │
│  ──────── ✦ ────────        │  ← Golden divider
│                             │
│  ┌──────┐ ┌──────┐ ┌──────┐│
│  │⭐ 2/3│ │🏆 78 │ │🔄 2  ││  ← Stats pills
│  └──────┘ └──────┘ └──────┘│
│                             │
│  ┌───────────────────────┐  │
│  │     أعد المحاولة      │  │  ← Action Button
│  └───────────────────────┘  │
│     أفضل نتيجتك: 78/100    │  ← Best score note
│                             │
│       ❤️ ×5 جاهز           │  ← Hearts indicator
│                             │
└─────────────────────────────┘
```

---

## Animations

| #   | Element           | Animation                                                            | Duration         | Notes                           |
| --- | ----------------- | -------------------------------------------------------------------- | ---------------- | ------------------------------- |
| 1   | Bottom sheet      | Slides up with spring physics                                        | 400ms (spring)   | From below screen               |
| 2   | Hero illustration | Subtle parallax as sheet is dragged up/down                          | Drag-linked      | Moves slower than sheet         |
| 3   | Stats pills       | Pop in sequentially, scale from 0.8→1.0                              | 200ms each       | 100ms stagger                   |
| 4   | Action button     | Single gentle pulse after everything loads                           | 600ms            | Attract attention               |
| 5   | Dismiss           | Drag down with velocity-based physics — sheet accelerates off screen | Physics-based    | Flick to dismiss                |
| 6   | Overlay           | Dims in/out with sheet position                                      | Matched to sheet | 0→40% on open, reverse on close |

---

## Interaction

| Action                | Result                                                  |
| --------------------- | ------------------------------------------------------- |
| Tap action button     | Navigate to Narrator Welcome (`10-narrator-welcome.md`) |
| Drag sheet down       | Dismisses sheet, returns to Journey Map                 |
| Tap dimmed background | Dismisses sheet                                         |
| Tap stats pills       | No action (informational only)                          |

---

## Edge Cases

- **No hearts available (0 hearts):** Action button disabled (40% opacity), text changes to "القلوب فارغة", hearts indicator shows refill countdown
- **First time (no stats):** Stats row is hidden entirely — only shows title, subtitle, and "ابدأ المرحلة" button
- **3 stars already:** Small "⭐⭐⭐ أداء مثالي!" badge appears above stats with golden glow

---

## Assets Needed

| Asset                         | Description                                               | Format                       |
| ----------------------------- | --------------------------------------------------------- | ---------------------------- |
| 10 stage detail illustrations | Wider/detailed versions of node illustrations, full-width | PNG, ~600px wide, 180px tall |
