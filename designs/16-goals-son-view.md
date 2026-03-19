# Screen 16: Goals Screen (Son View)

### شاشة الأهداف — عرض الابن

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Bottom Navigation Bar, Card Component).

---

## Purpose

See goals set by the father — provides motivation and real-world reward targets. The son does NOT create goals, only views and works toward them.

---

## Layout

- **Background:** Soft Cream (`#FAF3E8`)
- **Header:** "أهدافي" — Cairo Bold 24px, Deep Night Blue, centered
- **Bottom Navigation:** Son's nav bar (Goals tab active)

### Active Goals Section

**Section label:** "أهداف نشطة" with 🎯 icon — Cairo Bold 18px, Deep Night Blue

**Goal Cards (vertical stack, 12px gap):**

Each card:

- **Background:** Warm Sand (`#F5E6C8`)
- **Border:** 3px right border (RTL) in Desert Gold for active goals
- **Radius:** 16px
- **Shadow:** Level 1
- **Padding:** 16px

**Card content (top to bottom):**

| Element             | Style                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Goal description    | Cairo Bold 16px, Deep Night Blue                                                                                                            |
| Progress bar        | Full-width, 8px height, rounded. Track: light gray. Fill: Desert Gold. Label: "٤ من ٦ مراحل" (Cairo Regular 12px, Muted Gray, right of bar) |
| Bottom row (spread) | Deadline + Reward                                                                                                                           |
| Deadline            | "⏰ باقي ٣ أيام" — Cairo Regular 14px. Normal: Muted Gray. Urgent (<3 days): Sunset Orange                                                  |
| Reward              | "🏆 ٢٠ ريال" — Cairo Regular 14px, Desert Gold                                                                                              |
| Source              | "من: أبي" — Cairo Regular 12px, Muted Gray                                                                                                  |

### Completed Goals Section

**Section label:** "أهداف مكتملة ✓" with green checkmark — Cairo Bold 18px, Deep Night Blue

Same card style but:

- Border: 3px right (RTL) in Success Green
- "مكتمل ✓" badge in top-left (RTL) corner — small pill, Success Green bg, white text, Cairo Medium 11px
- Slightly reduced opacity (90%)

### Empty State (no goals)

Shown when no goals exist:

- **Centered illustration:** Narrator in neutral state with an empty scroll
- **Text:** "لا توجد أهداف حالياً" — Cairo Regular 16px, Muted Gray, centered
- **Subtitle:** "عندما يضع والدك هدفاً ستراه هنا" — Cairo Regular 14px, Muted Gray at 60%, centered

---

## Visual Composition

```
┌─────────────────────────────┐
│           أهدافي             │  ← Header
│                             │
│  أهداف نشطة 🎯              │  ← Section label
│                             │
│  ┌───────────────────────┐  │
│  ┃ أكمل مراحل قصة الفيل  │  │  ← Goal card (gold border)
│  ┃                       │  │
│  ┃ [████████░░░] ٤/٦     │  │  ← Progress bar
│  ┃                       │  │
│  ┃ ⏰ باقي ٣ أيام  🏆 ٢٠ ريال│ ← Deadline + Reward
│  ┃ من: أبي               │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  ┃ أكمل ٥ مراحل   [نشط] │  │  ← Another active goal
│  ┃ [██████░░░░░] ٣/٥     │  │
│  ┃ ⏰ باقي ٧ أيام 🏆 لعبة  │  │
│  └───────────────────────┘  │
│                             │
│  أهداف مكتملة ✓             │  ← Section label
│                             │
│  ┌───────────────────────┐  │
│  ┃ أكمل المرحلة الأولى   │  │  ← Completed (green border)
│  ┃ [██████████] ١/١ مكتمل│  │     + "مكتمل" badge
│  ┃ 🏆 آيس كريم           │  │
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│ ⚙️ | 🏆 | 🎯 | 📊 | 🏠    │  ← Bottom Nav (Goals active)
└─────────────────────────────┘
```

---

## Animations

| #   | Element         | Animation                                          | Duration                 | Notes           |
| --- | --------------- | -------------------------------------------------- | ------------------------ | --------------- |
| 1   | Goal cards      | Slide in from bottom with stagger                  | 150ms each               | 100ms stagger   |
| 2   | Progress bars   | Fill from 0 to current value                       | 500ms (ease-out)         | On appear       |
| 3   | Urgent deadline | Subtle pulse on text                               | 2s loop, opacity 0.7→1.0 | Only if <3 days |
| 4   | Completed cards | Brief sparkle effect when first scrolled into view | 400ms                    | Once only       |
| 5   | Empty state     | Narrator fades in, scroll illustration gentle sway | 300ms + 3s loop          | Only when empty |

---

## Interaction

| Action                  | Result                                                     |
| ----------------------- | ---------------------------------------------------------- |
| Tap active goal card    | Expand card to show stage list within the goal (accordion) |
| Tap completed goal card | Show completion details (date, final stats)                |
| Pull-to-refresh         | Refresh goals data                                         |

---

## Assets Needed

| Asset                    | Description                | Format           |
| ------------------------ | -------------------------- | ---------------- |
| Empty state illustration | Narrator with empty scroll | PNG, ~200px wide |
