# Screen 23: Son Progress Detail (Father View)

### تفاصيل تقدم الابن

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Primary Button, Card Component).

---

## Purpose

Deep dive into a specific son's learning data. The father can see stage-by-stage progress, recent activity, and create new goals from here.

---

## Layout

- **Background:** Soft Cream (`#FAF3E8`)
- **Header:** Son's display name — Cairo Bold 20px, Deep Night Blue + back arrow (RTL: right)

### Hero Section (top, centered)

- **Son's avatar:** 80px circle, centered, golden border (2px)
- **Display name:** Cairo Bold 18px, Deep Night Blue, centered, below avatar
- **Three stat circles** in a horizontal row (16px gap, centered):

| Stat   | Background             | Number Style                     | Label                             |
| ------ | ---------------------- | -------------------------------- | --------------------------------- |
| XP     | Desert Gold gradient   | Cairo Bold 20px, Starlight White | "نقاط الخبرة" Cairo Regular 10px  |
| Streak | Sunset Orange gradient | Cairo Bold 20px, Starlight White | "أيام متواصلة" Cairo Regular 10px |
| Stars  | Royal Purple gradient  | Cairo Bold 20px, Starlight White | "النجوم" Cairo Regular 10px       |

Each circle: 64px diameter, gradient background, number centered inside, label below

### Stage Progress Section

**Section header:** "تقدم المراحل" — Cairo Bold 18px, Deep Night Blue

**Overall progress bar (top of section):**

- Full-width, 8px height, rounded
- Fill: Desert Gold
- Label: "٤ من ١٠ مراحل" — Cairo Regular 12px, Muted Gray

**Vertical list of all 10 stages:**

| Element      | Style                                                 |
| ------------ | ----------------------------------------------------- |
| Stage number | 36px circle, right (RTL)                              |
| Stage title  | Cairo Regular 15px, Deep Night Blue                   |
| Stars        | 3 small stars (filled gold / empty gray), left (RTL)  |
| Score        | Cairo Regular 12px, Muted Gray, below stars: "78/100" |

**Row states:**
| State | Number Circle | Text | Stars |
|-------|--------------|------|-------|
| Completed | Golden bg, white number | Full opacity | Filled (1–3) |
| Not attempted | Light gray bg, gray number | 50% opacity | "لم يبدأ" label |

Row height: 56px, subtle dividers

### Activity Timeline

**Section header:** "النشاط الأخير" — Cairo Bold 18px, Deep Night Blue

**Chronological list (most recent first):**

Each item:

- **Timeline connector:** Thin vertical golden line (2px) on the right (RTL) connecting events
- **Event dot:** 10px circle on the line — Desert Gold for completed, other colors for milestones
- **Event text:** Cairo Regular 14px, Deep Night Blue
- **Timestamp:** Cairo Regular 12px, Muted Gray — relative time ("منذ ساعتين")

**Example events:**
| Icon | Text | Time |
|------|------|------|
| ⭐ | "أكمل المرحلة ٣ — ⭐⭐⭐" | منذ ساعتين |
| ⚡ | "أكمل تحدي اليوم — +15 XP" | منذ ٥ ساعات |
| 🔥 | "حقق سلسلة ٧ أيام" | أمس |
| ⭐ | "أكمل المرحلة ٢ — ⭐⭐" | منذ يومين |

### Quick Action Button (sticky bottom)

- "إنشاء هدف جديد" — Primary Button, full-width
- Sticky at bottom of screen with 16px padding, Soft Cream bg with top shadow

---

## Visual Composition

```
┌─────────────────────────────┐
│                     محمد أحمد →│ ← Header + back
│                             │
│           (🧒)              │  ← Avatar (80px)
│         محمد أحمد            │  ← Name
│                             │
│  ┌──────┐ ┌──────┐ ┌──────┐│
│  │ 🛡️340│ │ 🔥 7 │ │ ⭐18 ││  ← Stat circles
│  │  XP  │ │سلسلة │ │نجوم  ││
│  └──────┘ └──────┘ └──────┘│
│                             │
│  تقدم المراحل               │  ← Section header
│  [████████░░░░░░░] ٤/١٠     │  ← Overall progress
│                             │
│  ① عام الفيل      ⭐⭐⭐ 95 │  ← Stage list
│  ② المولد النبوي   ⭐⭐  78 │
│  ③ الطفولة        ⭐⭐⭐ 88 │
│  ④ الشباب         ⭐    52 │
│  ⑤ غار حراء        لم يبدأ  │
│  ...                        │
│                             │
│  النشاط الأخير              │  ← Section header
│                             │
│  ●─ ⭐ أكمل المرحلة ٣ ⭐⭐⭐ │  ← Timeline
│  │     منذ ساعتين           │
│  ●─ ⚡ أكمل تحدي اليوم     │
│  │     منذ ٥ ساعات          │
│  ●─ 🔥 حقق سلسلة ٧ أيام   │
│  │     أمس                  │
│  ●─ ⭐ أكمل المرحلة ٢ ⭐⭐  │
│       منذ يومين              │
│                             │
│  ┌───────────────────────┐  │
│  │   إنشاء هدف جديد      │  │  ← Sticky CTA button
│  └───────────────────────┘  │
└─────────────────────────────┘
```

---

## Animations

| #   | Element              | Animation                              | Duration                 | Notes                         |
| --- | -------------------- | -------------------------------------- | ------------------------ | ----------------------------- |
| 1   | Stat circles         | Pop in with stagger, scale 0.8→1.0     | 200ms each               | 150ms stagger                 |
| 2   | Stat numbers         | Count up from 0                        | 400ms                    | After pop                     |
| 3   | Overall progress bar | Fill from 0 to current                 | 600ms (ease-out)         | On section appear             |
| 4   | Stage list items     | Fade in with stagger                   | 100ms each, 50ms stagger | Top to bottom                 |
| 5   | Timeline items       | Slide in from right (RTL) with stagger | 150ms each               | With golden line drawing down |
| 6   | Timeline line        | Draws downward as items appear         | Linked to items          | Sequential                    |

---

## Interaction

| Action               | Result                                                                   |
| -------------------- | ------------------------------------------------------------------------ |
| Tap "إنشاء هدف جديد" | Navigate to Create Goal (`25-create-goal.md`) with this son pre-selected |
| Back arrow           | Return to Father Home (`22-father-home.md`)                              |
| Scroll               | All sections scrollable as one page                                      |
| Tap a stage row      | No action (informational — father can't play)                            |

---

## Assets Needed

| Asset                   | Description                               | Format  |
| ----------------------- | ----------------------------------------- | ------- |
| Stat circle backgrounds | 3 gradient circles (gold, orange, purple) | SVG     |
| Timeline connector      | Thin golden vertical line with dots       | SVG/CSS |
