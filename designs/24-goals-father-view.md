# Screen 24: Goals Tab (Father View)

### الأهداف — عرض الأب

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Primary Button, Card Component).

---

## Purpose

Manage all goals across all sons. The father creates, monitors, and tracks goals from this centralized view.

---

## Layout

- **Background:** Soft Cream (`#FAF3E8`)
- **Header:** "الأهداف" — Cairo Bold 24px, Deep Night Blue, centered
- **Bottom Navigation:** Father's nav bar (Goals tab active)

### Filter Tabs (horizontal scroll)

Pill-shaped filter tabs:

| Tab       | Label    | Badge           |
| --------- | -------- | --------------- |
| All       | "الكل"   | Total count     |
| Active    | "نشطة"   | Active count    |
| Completed | "مكتملة" | Completed count |
| Expired   | "منتهية" | Expired count   |

**Tab styles:** Same as Badges screen tabs (see `18-badges-screen.md`)

- Active: Desert Gold bg, Deep Night Blue text
- Inactive: Transparent bg, Muted Gray text, subtle border
- Count badge: small circle (18px) at top-right of tab, number inside

### Goals List (grouped by son)

**Son group header:**

- Son's avatar (32px) + display name — Cairo Bold 16px, Deep Night Blue
- Subtle divider line below

**Goal cards (within each group):**

- **Card:** Warm Sand bg, 16px radius, Level 1 shadow, 16px padding
- **Status-colored left border (RTL: right border):** 3px
  - Active: Desert Gold (`#D4A843`)
  - Completed: Success Green (`#4CAF6E`)
  - Expired: Error Red (`#E05555`)

**Card content:**

| Element                     | Style                                                          |
| --------------------------- | -------------------------------------------------------------- |
| Son's name + avatar (small) | 32px avatar + Cairo Bold 14px (top of card)                    |
| Goal description            | Cairo Bold 16px, Deep Night Blue                               |
| Progress bar                | Full-width, 8px, rounded. Track: light gray. Fill: Desert Gold |
| Progress label              | "٤ من ٦ مراحل" — Cairo Regular 12px, Muted Gray                |
| Deadline                    | "⏰ ١٥ مارس ٢٠٢٦" + "باقي ٣ أيام" — Cairo Regular 13px         |
| Reward                      | "🏆 ٢٠ ريال" — Cairo Regular 13px, Desert Gold                 |
| Status badge                | Small pill in top-left (RTL) corner                            |

**Status badges:**
| Status | Background | Text |
|--------|-----------|------|
| نشط | Desert Gold at 15% | Desert Gold, Cairo Medium 11px |
| مكتمل | Success Green at 15% | Success Green |
| منتهي | Error Red at 15% | Error Red |

### "إنشاء هدف جديد" Button

- Primary Button, full-width, sticky at bottom
- OR: FAB if list is long

### Empty State

- **Illustration:** Target/trophy with Narrator
- **Title:** "لم تنشئ أي أهداف بعد" — Cairo Bold 18px, Deep Night Blue
- **Subtitle:** "ابدأ بتحفيز ابنك بهدف ومكافأة" — Cairo Regular 14px, Muted Gray
- **CTA:** "إنشاء أول هدف" — Primary Button

---

## Visual Composition

```
┌─────────────────────────────┐
│           الأهداف            │  ← Header
│                             │
│ [الكل③][نشطة②][مكتملة①]... │  ← Filter tabs (scrollable)
│                             │
│  (🧒) محمد أحمد             │  ← Son group header
│  ─────────────────────────  │
│                             │
│  ┌───────────────────────┐  │
│  ┃[نشط]                  │  │  ← Goal card (gold border)
│  ┃ أكمل مراحل قصة الفيل  │  │
│  ┃ [████████░░░] ٤/٦     │  │  ← Progress bar
│  ┃ ⏰ باقي ٣ أيام         │  │
│  ┃ 🏆 ٢٠ ريال            │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  ┃[مكتمل ✓]              │  │  ← Completed (green border)
│  ┃ أكمل المرحلة الأولى    │  │
│  ┃ [██████████] ١/١      │  │
│  ┃ 🏆 آيس كريم           │  │
│  └───────────────────────┘  │
│                             │
│  (🧒) عبدالله أحمد         │  ← Another son's group
│  ─────────────────────────  │
│                             │
│  ┌───────────────────────┐  │
│  ┃[منتهي]                │  │  ← Expired (red border)
│  ┃ أكمل ٣ مراحل          │  │
│  ┃ [████░░░░░░] ٢/٣      │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │   إنشاء هدف جديد      │  │  ← CTA button
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│       أبنائي | الأهداف      │  ← Father Nav (Goals active)
└─────────────────────────────┘
```

---

## Animations

| #   | Element                  | Animation                                    | Duration         | Notes                   |
| --- | ------------------------ | -------------------------------------------- | ---------------- | ----------------------- |
| 1   | Tab switch               | Content cross-fades                          | 200ms            | Between filter states   |
| 2   | Tab indicator            | Active background slides smoothly to new tab | 200ms (spring)   |                         |
| 3   | Goal cards               | Stagger in from below                        | 100ms each       | On load / filter change |
| 4   | Active goal status badge | Subtle pulse                                 | 3s loop          | Only active goals       |
| 5   | Completed cards          | Brief sparkle on first scroll into view      | 400ms            | Once only               |
| 6   | Progress bars            | Fill on first appear                         | 400ms (ease-out) |                         |
| 7   | Empty state              | Narrator fades in + trophy gentle bounce     | 300ms + 2s loop  | Only when empty         |

---

## Interaction

| Action               | Result                                                     |
| -------------------- | ---------------------------------------------------------- |
| Tap filter tab       | Filter list to show matching goals only                    |
| Tap goal card        | Expand to show more details (stages within goal, timeline) |
| Tap "إنشاء هدف جديد" | Navigate to Create Goal (`25-create-goal.md`)              |
| Pull-to-refresh      | Refresh goals data                                         |

---

## Assets Needed

| Asset                    | Description                 | Format           |
| ------------------------ | --------------------------- | ---------------- |
| Empty state illustration | Narrator with target/trophy | PNG, ~200px wide |
