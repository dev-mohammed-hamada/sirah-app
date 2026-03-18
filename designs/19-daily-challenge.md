# Screen 19: Daily Challenge
### تحدي اليوم

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components.
> **Reference:** [12-inline-question.md](12-inline-question.md) for question type layouts and feedback states.

---

## Purpose

Quick 30-second engagement — maintain streak on busy days. One question per day drawn from previously learned content (spaced repetition). Should feel fast, dramatic, and rewarding.

---

## Layout

- **Background:** Dramatic — Royal Purple (`#4A2D6B`) to Deep Night Blue (`#1A2744`) gradient with scattered stars
- **Header:** "⚡ تحدي اليوم" — Cairo Bold 24px, Desert Gold, centered

### Timer Display
- **Large circular countdown ring:** 80px diameter, centered above question
- **Ring:** 4px width, Desert Gold fill, depletes clockwise over 30 seconds
  - Full (30s): Desert Gold (`#D4A843`)
  - Low (<10s): transitions to Sunset Orange (`#E8734A`)
  - Critical (<3s): pulses rapidly
- **Seconds number** in center: Cairo Black 40px, Starlight White
- Ring track: Starlight White at 15%

### Question Card
- Same style as Final Quiz questions but with special border:
  - Golden border (2px, `#D4A843`) with subtle glow
  - "⚡" lightning bolt icon in top-right corner of card
- Narrator mini-avatar at top
- Question text: Cairo Bold 18px, centered
- Content: drawn from previously completed stages

### Answer Options
- Same patterns as quiz screens (see `12-inline-question.md`)
- Adapted for dark background (same as Final Quiz)

---

## Visual Composition

```
┌─────────────────────────────┐
│      ✦  ✧    ✦   ✧         │  ← Starry dramatic bg
│                             │
│       ⚡ تحدي اليوم          │  ← Header (gold)
│                             │
│          ╭────╮             │
│          │ 24 │             │  ← Timer ring (depleting)
│          ╰────╯             │
│                             │
│         (👤)                │  ← Narrator mini
│  ┌─────────────────────┐ ⚡ │
│  │                     │    │  ← Question card
│  │ ما اسم أم النبي ﷺ؟ │    │     (golden border + glow)
│  │                     │    │
│  └─────────────────────┘    │
│                             │
│  ┌───────────────────────┐  │
│  │ أ. آمنة بنت وهب       │  │  ← Options (dark bg style)
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ ب. خديجة بنت خويلد    │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ ج. فاطمة بنت أسد      │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ د. حليمة السعدية       │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

---

## States

### Active Challenge (not yet completed today)
- Full interactive screen as described above
- Timer starts counting down when screen opens

### Results (after answering)

**Correct:**
- "+15 XP تحدي يومي" — large golden text with star burst
- "🔥 سلسلتك مستمرة!" — Streak confirmation
- Screen explodes with gold particles (Lottie, 1.5s)
- "عودة" button to return to Home

**Wrong:**
- Correct answer revealed (same feedback as inline questions)
- "حاول غداً!" — Narrator encouraging state
- Streak STILL maintained (daily challenge counts as activity even if wrong)
- "عودة" button

### Already Completed Today
- **Grayed/calm version of the screen**
- Central card: "✓ أكملت تحدي اليوم" — Cairo Bold 18px, Success Green
- Below: "عد غداً لتحدٍ جديد" — Cairo Regular 14px, Starlight White at 60%
- Countdown to next: "التحدي القادم بعد ٧ ساعات" — Cairo Regular 14px, Desert Gold
- Circular countdown ring shows hours remaining (slow depletion)
- "عودة" button

### Timer Expired (didn't answer in 30s)
- Timer hits 0: ring flashes red, "⏰!" appears
- Question auto-submits as wrong (or no answer)
- Same as wrong answer flow but with: "انتهى الوقت!" message

---

## Animations

| # | Element | Animation | Duration | Notes |
|---|---------|-----------|----------|-------|
| 1 | Screen entrance | Dramatic zoom-in through stars (scale 1.1→1.0 + fade in) | 400ms | Entering the challenge |
| 2 | Timer ring | Smooth depletion clockwise | 30s total | Continuous |
| 3 | Timer low (<10s) | Color transition to Sunset Orange | 300ms | Smooth transition |
| 4 | Timer critical (<3s) | Rapid pulse + background subtle flash | 500ms loop | Urgency |
| 5 | Lightning bolt icon | Occasional crackle/glow | 3s loop | Lottie |
| 6 | Correct result | Gold particle explosion | 1.5s (Lottie) | Full screen |
| 7 | Stars (bg) | Slow twinkle | Infinite | Ambient |
| 8 | Completed state | Calm fade in, countdown ring slow | — | Peaceful |

---

## Interaction

| Action | Result |
|--------|--------|
| Tap option | Lock selection, stop timer, show feedback |
| Timer expires | Auto-submit, show "انتهى الوقت!" |
| Tap "عودة" (after result) | Return to Home/Journey Map (`08-home-journey-map.md`) |
| Open when already completed | Show completed state |

---

## Assets Needed

| Asset | Description | Format |
|-------|-------------|--------|
| Lightning bolt icon | ⚡ with crackle/glow animation | Lottie JSON |
| Gold particle explosion | Full-screen burst for correct answer | Lottie JSON |
| Timer ring | Circular depleting ring with color transition | SVG + CSS animation |
