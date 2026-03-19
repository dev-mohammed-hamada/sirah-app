# Screen 25: Create Goal

### إنشاء هدف جديد

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Input Field, Primary Button, Card Component).

---

## Purpose

Father creates a new goal with deadline and reward for his son. The form includes a live preview so the father can see exactly what the son will see.

---

## Layout

- **Background:** Soft Cream (`#FAF3E8`)
- **Header:**
  - Back arrow (RTL: right)
  - "هدف جديد" — Cairo Bold 20px, Deep Night Blue, centered
  - "إنشاء" text button (RTL: left) — Cairo Bold 16px
    - Disabled: Muted Gray at 40% (until form is valid)
    - Enabled: Desert Gold
- **Presentation:** Full screen (pushed navigation)

### Form Fields

#### 1. Select Son

**If multiple sons:**

- **Label:** "اختر ابنك" — Cairo Bold 14px, Muted Gray
- Horizontal scrollable row of avatar chips:
  - Each chip: 48px avatar circle + name below (Cairo Regular 12px)
  - 12px gap between chips
  - **Selected:** Desert Gold border (3px) + small checkmark overlay (top-right of avatar)
  - **Unselected:** Light gray border (1px)
  - **Selection animation:** Border color transitions (150ms) + checkmark pops in (spring, 200ms)

**If one son:**

- Pre-selected, shown as info header: avatar + name (non-interactive)

#### 2. Goal Description

- **Label:** "وصف الهدف" — Cairo Bold 14px, Muted Gray
- **Input:** Text area, 100px height
- **Placeholder:** "مثال: أكمل مراحل قصة الفيل" — Cairo Regular 14px, Muted Gray at 40%
- **Character counter:** "0/200" at bottom-right of field — Cairo Regular 11px, Muted Gray
  - Turns Sunset Orange when >180 chars
- Standard Input Field style (see design system)

#### 3. Stage Group

- **Label:** "المراحل المطلوبة" — Cairo Bold 14px, Muted Gray
- **Selector card:** Tappable card showing:
  - Group name: Cairo Bold 16px
  - Number of stages: "١٠ مراحل" — Cairo Regular 13px, Muted Gray
  - Stage list preview: first 3 stage titles, then "... و٧ أخرى"
- V1: Only 1 group available (pre-selected), but UI shows the concept for future expansion
- Card style: Starlight White bg, 12px radius, golden border when selected

#### 4. Deadline

- **Label:** "الموعد النهائي" — Cairo Bold 14px, Muted Gray
- **Input:** Date picker (tappable field that opens native date picker)
- **Display:** Shows selected date in Arabic format: "١٥ مارس ٢٠٢٦"
- **Calculated text** below: "بعد ٧ أيام" — Cairo Regular 12px, Desert Gold
- **Minimum:** Tomorrow (cannot select today or past dates)
- Standard Input Field style with calendar icon on left (RTL)

#### 5. Reward Description

- **Label:** "المكافأة" — Cairo Bold 14px, Muted Gray
- **Input:** Text input, single line
- **Placeholder:** "مثال: ٢٠ ريال عند الإنهاء" — Cairo Regular 14px, Muted Gray at 40%
- **Icon:** 🏆 trophy icon prefix inside the field (right side, RTL)
- **Character counter:** "0/100" — Cairo Regular 11px
- Standard Input Field style

### Live Preview Card

- **Label above:** "كذا سيظهر الهدف لابنك:" — Cairo Regular 13px, Muted Gray, 24px top margin
- **Card:** Exact same style as Son's goal card (`16-goals-son-view.md`)
  - Warm Sand bg, Desert Gold right border (RTL), 16px radius
  - Goal description (or placeholder if empty)
  - Progress bar at 0/total
  - Deadline
  - Reward with 🏆
  - "من: أبي"
- **Updates in real-time** as the father types — every field change reflects immediately

### Submit Button

- "إنشاء الهدف" — Primary Button, full-width
- 24px below the preview card
- **Disabled** until all required fields are filled (description + deadline + reward)

---

## Visual Composition

```
┌─────────────────────────────┐
│  [إنشاء]      هدف جديد    →│  ← Header
│                             │
│  اختر ابنك                  │
│  ┌────┐ ┌────┐              │
│  │(🧒)│ │(🧒)│              │  ← Son chips (scrollable)
│  │محمد✓│ │عبدالله│           │     (first selected)
│  └────┘ └────┘              │
│                             │
│  وصف الهدف                  │
│  ┌───────────────────────┐  │
│  │ أكمل مراحل قصة الفيل  │  │  ← Text area
│  │                  24/200│  │
│  └───────────────────────┘  │
│                             │
│  المراحل المطلوبة           │
│  ┌───────────────────────┐  │
│  │ المجموعة الأولى       │  │  ← Stage group card
│  │ ١٠ مراحل              │  │
│  │ عام الفيل، المولد...   │  │
│  └───────────────────────┘  │
│                             │
│  الموعد النهائي             │
│  ┌───────────────────────┐  │
│  │ 📅  ١٥ مارس ٢٠٢٦     │  │  ← Date picker
│  └───────────────────────┘  │
│  بعد ٧ أيام                 │  ← Calculated days
│                             │
│  المكافأة                   │
│  ┌───────────────────────┐  │
│  │ 🏆  ٢٠ ريال عند الإنهاء│  │  ← Reward input
│  └───────────────────────┘  │
│                             │
│  كذا سيظهر الهدف لابنك:     │  ← Preview label
│  ┌───────────────────────┐  │
│  ┃ أكمل مراحل قصة الفيل  │  │  ← LIVE PREVIEW
│  ┃ [░░░░░░░░░░░] ٠/١٠    │  │     (same as son's card)
│  ┃ ⏰ ١٥ مارس  🏆 ٢٠ ريال│  │
│  ┃ من: أبي               │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │     إنشاء الهدف       │  │  ← Submit button
│  └───────────────────────┘  │
└─────────────────────────────┘
```

---

## Animations

| #   | Element               | Animation                                          | Duration         | Notes                    |
| --- | --------------------- | -------------------------------------------------- | ---------------- | ------------------------ |
| 1   | Son chips             | Slide in from right (RTL) with stagger             | 150ms each       |                          |
| 2   | Chip selection        | Border transition + checkmark pop                  | 200ms (spring)   | On tap                   |
| 3   | Preview card          | Subtle cross-fade on each field change             | 150ms            | Real-time updates        |
| 4   | Submit loading        | Button shows golden Lottie spinner                 | Until response   | On tap                   |
| 5   | Submit success        | Checkmark burst animation                          | 600ms (Lottie)   | On success               |
| 6   | After success         | Navigate back to Goals tab                         | 300ms transition | Auto after 800ms         |
| 7   | Field focus           | Same as design system (label float, golden border) | 150ms            | Standard                 |
| 8   | Validation error      | Affected fields shake                              | 300ms (3 shakes) | On submit attempt        |
| 9   | "إنشاء" header button | Opacity transitions (disabled↔enabled)             | 200ms            | As form validity changes |

---

## Interaction

| Action                              | Result                                                        |
| ----------------------------------- | ------------------------------------------------------------- |
| Tap son chip                        | Select that son (deselects others if multi-select not needed) |
| Type in any field                   | Preview card updates in real-time                             |
| Tap date field                      | Native date picker opens                                      |
| Tap "إنشاء الهدف" or header "إنشاء" | Validate → loading → success → navigate to Goals Tab          |
| Back arrow                          | Confirmation if form has data: "تجاهل التغييرات؟" modal       |

---

## Discard Confirmation Modal

If the father taps back with unsaved changes:

- **Bottom sheet:** small, Starlight White bg
- "تجاهل التغييرات؟" — Cairo Bold 18px
- "ستفقد البيانات التي أدخلتها" — Cairo Regular 14px, Muted Gray
- "تجاهل" — Error Red text button
- "متابعة التعديل" — Primary Button

---

## Notification Triggered

On successful goal creation, the son receives:

- Push notification: "أبوك يرسل لك تحدياً جديداً! 🎯 المكافأة: [reward]"

---

## Assets Needed

| Asset             | Description                   | Format      |
| ----------------- | ----------------------------- | ----------- |
| Loading spinner   | Golden desert-themed          | Lottie JSON |
| Checkmark success | Circle draws + checkmark pops | Lottie JSON |
| Calendar icon     | For date picker field         | SVG, 24px   |
| Trophy icon       | For reward field prefix       | SVG, 24px   |
