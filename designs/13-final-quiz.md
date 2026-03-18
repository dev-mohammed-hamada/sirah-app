# Screen 13: Final Quiz
### الاختبار النهائي

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Primary Button).
> **Reference:** [12-inline-question.md](12-inline-question.md) for question type layouts and feedback states (reused here).

---

## Purpose

End-of-stage assessment — 3–5 questions covering all the stage content. More serious and focused than inline questions. This is where the score is determined.

---

## Layout

- **Background:** Deep Night Blue gradient (more serious/focused feel than inline questions)

### Top Bar

**Question counter:**
- "السؤال ٣ من ٥" — Cairo Medium 14px, Starlight White, centered

**Progress dots:**
- 5 small circles in a horizontal row (centered below counter)
- Completed: Desert Gold filled (8px)
- Current: Desert Gold outlined, pulsing glow (10px)
- Upcoming: Starlight White outlined at 40% (8px)

**Hearts:**
- Same heart display as story panels, but slightly larger and more prominent
- Positioned at top-right (RTL)

### Question Card (centered)
- Card with special border: Royal Purple to Deep Night Blue gradient border (2px)
- Interior: Starlight White background, 20px padding, 16px radius
- **Narrator mini-avatar** at top of card (40px circle)
- **Question text:** Cairo Bold 18px, Deep Night Blue, centered
- **Question type icon** in corner: small, muted icon indicating MCQ/True-False/etc. (12px, Muted Gray)

### Answer Options
- Same interaction patterns and layouts as Inline Questions (see `12-inline-question.md`)
- **Adapted for dark background:**
  - Option buttons: Deep Night Blue bg with Starlight White text and golden border (1.5px)
  - Selected state: Desert Gold bg with Deep Night Blue text
  - Hover/press: Desert Gold at 20% opacity bg

### Speed Bonus Timer (optional)
- **Circular timer ring** around the question number in the progress dots
  - Starts full (Desert Gold), depletes clockwise over the time window
  - When running low (<3s): ring turns Sunset Orange and pulses
- **Speed bonus indicator:** "⚡ مكافأة السرعة" — appears briefly when answered quickly
  - Cairo Bold 12px, Desert Gold, floats above the XP counter

---

## Visual Composition

```
┌─────────────────────────────┐
│           ❤️❤️❤️❤️❤️        │  ← Hearts (top right RTL)
│                             │
│       السؤال ٣ من ٥         │  ← Question counter
│       ● ● ◉ ○ ○            │  ← Progress dots
│           ⏱️ (timer ring)    │     (3rd is current, pulsing)
│                             │
│         (👤)                │  ← Narrator mini-avatar
│  ┌─────────────────────┐    │
│  │                 [MCQ]│    │  ← Question type icon
│  │                     │    │
│  │ من الذي قاد جيش    │    │  ← Question Card
│  │ الفيلة لهدم الكعبة؟ │    │     (gradient border)
│  │                     │    │
│  └─────────────────────┘    │
│                             │
│  ┌───────────────────────┐  │
│  │ أ. أبرهة الحبشي       │  │  ← Option A (dark bg, gold border)
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ ب. النجاشي            │  │  ← Option B
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ ج. كسرى               │  │  ← Option C
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ د. قيصر               │  │  ← Option D
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘
```

---

## Feedback States

Same as Inline Questions (`12-inline-question.md`) but with enhanced animations:

### Correct Answer (enhanced)
- All inline question correct feedback applies, PLUS:
- **Stars burst** out from behind the card (small star particles radiate outward, 600ms)
- **Speed bonus:** If answered within time window, "⚡ +5 XP" appears alongside regular "+10 XP"

### Wrong Answer (enhanced)
- All inline question wrong feedback applies, PLUS:
- **Screen shake:** Entire screen shakes subtly (2 shakes, 200ms) — feels more impactful than inline

---

## Question Transitions

| Element | Animation | Duration |
|---------|-----------|----------|
| Current question card | Slides out to left (RTL: right) | 300ms (ease-in) |
| Next question card | Slides in from right (RTL: left) | 300ms (ease-out) |
| Breathing pause | Empty state between questions | 500ms |
| Progress dots | Completed dot fills with gold + satisfying pop | 200ms (spring) |

---

## Animations

| # | Element | Animation | Duration | Notes |
|---|---------|-----------|----------|-------|
| 1 | Screen entrance | Fade in with slight scale (0.95→1.0) | 300ms | From story panel |
| 2 | Question card | Slides in from right (RTL) | 300ms (spring) | Each new question |
| 3 | Options | Stagger in from below | 100ms each, 50ms stagger | After card settles |
| 4 | Timer ring | Smooth depletion clockwise | Matches time window | Continuous |
| 5 | Timer warning | Ring color transition + pulse | <3s remaining | Sunset Orange, 1s pulse loop |
| 6 | Correct stars | Particle burst from behind card | 600ms | On correct answer |
| 7 | Wrong shake | Screen shakes horizontally | 200ms (2 shakes) | On wrong answer |
| 8 | Between questions | Card slide + pause + new card slide | ~1100ms total | Smooth rhythm |
| 9 | Progress dot completion | Gold fill + scale pop (1.0→1.3→1.0) | 200ms (spring) | Satisfying |
| 10 | Final question complete | All dots glow, transition to Results | 600ms | Special moment |

---

## Interaction

| Action | Result |
|--------|--------|
| Tap option | Locks selection, shows feedback, auto-advances after delay |
| All questions answered | Auto-transition to Celebration/Results (`14-celebration-results.md`) |
| 0 hearts reached | Session ends — "انتهت القلوب!" overlay → option to retry stage |

---

## Hearts Depletion (0 Hearts)

When the last heart breaks:
- All remaining hearts crack simultaneously (dramatic Lottie)
- Dark overlay slides in
- **Modal card:**
  - "💔 انتهت القلوب!" — Cairo Bold 24px, Error Red
  - "لا تقلق! يمكنك المحاولة مرة أخرى" — Cairo Regular 14px, Muted Gray
  - Hearts refill timer: "القلوب ستمتلئ بعد: ٢٩:٤٥" — Cairo Bold 16px, Sunset Orange, with countdown
  - "أعد المحاولة لاحقاً" button — Primary Button
  - "العودة للخريطة" — text link

---

## Scoring

| Element | Points |
|---------|--------|
| Each correct answer | Base XP (defined per question) |
| Speed bonus (answered within window) | +5 XP per question |
| Perfect run (no wrong answers) | +20 XP bonus |
| First try completion | +10 XP bonus |
| Final score | Calculated as percentage: (correct / total) × 100 |

---

## Assets Needed

| Asset | Description | Format |
|-------|-------------|--------|
| Star burst particles | Small gold stars radiating outward | Lottie JSON |
| Timer ring | Circular depleting ring | SVG with animation |
| Speed bonus badge | "⚡" lightning bolt with glow | SVG + CSS animation |
| Hearts depletion (dramatic) | All hearts crack at once | Lottie JSON |
