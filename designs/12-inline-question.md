# Screen 12: Inline Question
### سؤال أثناء القصة

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Primary Button, Card Component).

---

## Purpose

Mid-story engagement check — keeps the child actively thinking while the story is fresh. Appears after story panels 1 and 2 (2 inline questions per stage).

---

## Layout

- **Background:** Soft Cream (`#FAF3E8`) — matching story panel for visual continuity
- **Top Bar:** Same progress bar + hearts as Story Panel screen

### Question Card (centered)
- **Card style:** Warm Sand bg, 16px radius, Level 2 shadow
- **Narrator mini-avatar:** Small circular Narrator silhouette (40px) at the top of the card with a speech-bubble tail pointing down
- **Question text:** Cairo Bold 18px, Deep Night Blue, centered inside card, 16px padding
- Example: "ماذا كان اسم جد النبي ﷺ؟"

### Answer Options (below card)

Layout varies by question type:

#### Type 1: Multiple Choice (MCQ)
- 4 option buttons stacked vertically, 12px gap between each
- Each option:
  - Full-width, 52px height
  - Starlight White (`#FFF8F0`) background
  - 12px radius, 1.5px warm gray border (`#E0D5C5`)
  - Text: Cairo Regular 16px, right-aligned (RTL)
  - Option letter prefix: أ، ب، ج، د — Cairo Bold 16px, Desert Gold

#### Type 2: True / False
- 2 large buttons side by side (50% width each, 12px gap)
- "صحيح ✓" — Success Green tinted background (10% opacity), green border
- "خطأ ✗" — Error Red tinted background (10% opacity), red border
- Text: Cairo Bold 16px, centered

#### Type 3: Arrange in Order
- Draggable cards that can be reordered vertically
- Each card: full-width, 48px height, Starlight White bg, 12px radius
- Right side (RTL): grip handle icon (⋮⋮) for drag affordance
- Drop zones: dashed golden borders (2px, `#D4A843`) appear between cards during drag
- Number indicators (١، ٢، ٣، ٤) appear on the left (RTL) of each slot

#### Type 4: Fill in the Blank
- A sentence displayed with a highlighted blank space (underlined, Desert Gold)
- Below: 3 option buttons (same style as MCQ but only 3)

#### Type 5: Who Said It?
- A quote displayed in a decorative speech bubble (golden border, italic style)
- Below: Character name buttons with small silhouette icons beside each name
- Same button style as MCQ

---

## Visual Composition

```
┌─────────────────────────────┐
│ [██████████░░░░░░░░]        │  ← Progress bar
│ ❤️❤️❤️❤️❤️    عام الفيل    │  ← Hearts + Stage title
│                             │
│                             │
│         (👤)                │  ← Narrator mini-avatar
│  ┌─────────────────────┐    │
│  │                     │    │
│  │ ماذا كان اسم جد    │    │  ← Question Card
│  │    النبي ﷺ؟        │    │
│  │                     │    │
│  └─────────────────────┘    │
│                             │
│  ┌───────────────────────┐  │
│  │ أ. عبدالمطلب          │  │  ← Option A
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ ب. أبو طالب           │  │  ← Option B
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ ج. أبو لهب            │  │  ← Option C
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ د. أبو سفيان          │  │  ← Option D
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

---

## Feedback States

### Correct Answer

| Element | Behavior |
|---------|----------|
| Selected option | Turns Success Green (`#4CAF6E`) bg with white checkmark icon |
| Screen flash | Green overlay on entire screen (200ms, 20% opacity) |
| XP float | "+10 XP" text floats up from the button and fades out (600ms) |
| Narrator reaction | Brief text at top: "ممتاز!" or "أحسنت!" — Cairo Bold 16px, Success Green, fades in/out |
| Confetti | Small brief burst (Lottie, 800ms) — not as big as celebration screen |
| Other options | Fade to 50% opacity |
| Continue button | "التالي" appears after 1.5s delay |

### Wrong Answer

| Element | Behavior |
|---------|----------|
| Selected option | Turns Error Red (`#E05555`) bg with X icon |
| Correct option | Highlights in Success Green with gentle pulse (2s) |
| Screen flash | Red overlay (200ms, 15% opacity) |
| Heart break | One heart in top bar cracks and fades (Lottie, 500ms) |
| Narrator reaction | "الجواب الصحيح هو..." + correct answer — Cairo Regular 14px, Deep Night Blue |
| Explanation | Brief 1-sentence explanation appears below (Cairo Regular 14px, Muted Gray) |
| Other options | Fade to 50% opacity |
| Continue button | "التالي" appears after 2s delay (longer to let child read the correct answer) |

---

## Animations

| # | Element | Animation | Duration | Notes |
|---|---------|-----------|----------|-------|
| 1 | Question card | Slides up from below | 300ms (spring) | Screen entrance |
| 2 | Options | Fade in with stagger | 100ms each, 50ms stagger | After card settles |
| 3 | Option tap | Scales down 0.97, brief highlight | 100ms | Immediate on tap |
| 4 | Correct feedback | Green flash + checkmark + XP float + mini confetti | See table above | Simultaneous |
| 5 | Wrong feedback | Red flash + X + heart break + correct highlight | See table above | Simultaneous |
| 6 | Arrange drag | Cards slide smoothly to new positions | 200ms (spring) | During reorder |
| 7 | Continue button | Fades in from below | 200ms | After feedback delay |

---

## Interaction

| Action | Result |
|--------|--------|
| Tap an option (MCQ/True-False/Fill/WhoSaid) | Locks selection, shows feedback |
| Drag and drop (Arrange) | Reorder items, then tap "تأكيد" to submit |
| Tap "التالي" (after feedback) | Advance to next story panel (`11-story-panel.md`) |

---

## Rule

> No stage should repeat the same question type more than twice in a row.

---

## Assets Needed

| Asset | Description | Format |
|-------|-------------|--------|
| Narrator mini-avatar | Small circular Narrator silhouette, 40px | PNG, transparent BG |
| Checkmark animation | Green circle draws, checkmark pops inside | Lottie JSON |
| Heart break animation | Heart cracks and pieces fall | Lottie JSON |
| Mini confetti | Small burst, brief | Lottie JSON |
| XP float text | "+10 XP" that floats and fades | CSS animation or Lottie |
| Drag handle icon | ⋮⋮ grip pattern | SVG |
