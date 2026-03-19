# Screen 14: Celebration / Results

### شاشة الاحتفال والنتائج

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Primary Button, Secondary Button).

---

## Purpose

Reward the child — the climax of each stage. This is THE moment that makes the child want to come back. It must feel spectacular, especially on 3-star completions. This screen should generate dopamine.

---

## Layout

- **Background:** Desert Horizon gradient (`#E8734A → #D4A843 → #F5E6C8`, top to bottom)
- Golden light particles floating upward slowly (continuous, subtle)

### Central Content (vertically centered, stacked)

#### 1. Stars Display (HERO element)

- Three large stars (80px each) in a horizontal row, centered
- 16px gap between stars
- **Earned stars:** Golden, filled, glowing, with sparkle particles orbiting
- **Unearned stars:** Gray outlines, no glow
- **Perfect run banner (3 stars only):** "بدون أخطاء!" golden banner with ornate borders
  - Unfurls from center above the stars
  - Background: Desert Gold gradient, ornate Arabic-style border pattern
  - Text: Cairo Black 20px, Deep Night Blue

#### 2. Score

- Large number: Cairo Black 48px, Deep Night Blue
  - Format: "87/100"
- Below: "نتيجتك" — Cairo Regular 14px, Muted Gray

#### 3. XP Earned

- Golden pill container: Desert Gold bg, 12px radius, 12px vertical padding, 24px horizontal
- Main text: "+45 XP" — Cairo Bold 20px, Deep Night Blue
- Breakdown below pill: Cairo Regular 12px, Muted Gray
  - "+10 أسئلة | +20 بلا أخطاء | +15 مكافأة السرعة"

#### 4. Streak Update

- If streak continues: "🔥 سلسلتك: ٨ أيام!" — Cairo Bold 16px, Sunset Orange
  - Flame animation grows
- If new milestone (3, 7, 14, 30): Extra celebration with milestone badge
  - "ماشاء الله! ٧ أيام متواصلة! 🔥🔥🔥" — Cairo Bold 18px

### Narrator Reaction (bottom)

- Narrator illustration in emotional state based on performance:
  - **3 stars:** Celebrating state (standing, arms open wide)
  - **2 stars:** Excited state (arms raised)
  - **1 star:** Encouraging state (hand on heart, nodding)

- **Speech bubble** with contextual praise:

| Stars | Narrator Speech                         |
| ----- | --------------------------------------- |
| 3     | "ما شاء الله! أداء مذهل يا بطلي!"       |
| 2     | "أحسنت! لقد تعلّمت الكثير اليوم"        |
| 1     | "لا بأس! المهم أنك تعلّمت شيئاً جديداً" |

### Action Buttons (bottom)

- **"المرحلة التالية"** — Primary Button, full-width (only if next stage is unlockable)
- **"أعد المحاولة"** — Secondary Button, full-width
- **"العودة للخريطة"** — text link below buttons, Cairo Regular 14px, Muted Gray

---

## Visual Composition

```
┌─────────────────────────────┐
│    ✨  ✨  ✨ (particles)    │  ← Desert Horizon gradient bg
│                             │     + floating golden particles
│                             │
│      ╔══════════════╗       │  ← Perfect run banner (3★ only)
│      ║ بدون أخطاء!  ║       │
│      ╚══════════════╝       │
│                             │
│        ⭐  ⭐  ⭐           │  ← 3 large stars (hero)
│       ✨  ✨  ✨  ✨         │     with sparkle particles
│                             │
│          87/100             │  ← Score (Cairo Black 48px)
│          نتيجتك             │
│                             │
│       ┌──────────┐          │
│       │ +45 XP   │          │  ← XP pill (golden)
│       └──────────┘          │
│  +10 أسئلة | +20 بلا أخطاء  │  ← XP breakdown
│                             │
│     🔥 سلسلتك: ٨ أيام!     │  ← Streak update
│                             │
│  ┌──────────────────┐       │
│  │ ما شاء الله! أداء │       │  ← Narrator speech bubble
│  │  مذهل يا بطلي!   │       │
│  └────────┬─────────┘       │
│        ░░████████░░         │  ← Narrator celebrating
│                             │
│  ┌───────────────────────┐  │
│  │    المرحلة التالية     │  │  ← Primary Button
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │     أعد المحاولة      │  │  ← Secondary Button
│  └───────────────────────┘  │
│      العودة للخريطة         │  ← Text link
└─────────────────────────────┘
```

---

## Animations (THE BIG MOMENT)

This is the most animation-heavy screen in the app. Every element has a carefully timed entrance.

| #   | Element                | Animation                                                               | Duration               | Delay          | Notes                          |
| --- | ---------------------- | ----------------------------------------------------------------------- | ---------------------- | -------------- | ------------------------------ |
| 1   | Screen transition      | Golden flash overlay                                                    | 200ms                  | 0ms            | Dramatic entrance              |
| 2   | Star 1                 | Flies in from above, arrives gray, then fills with gold + sparkle burst | 300ms fly + 200ms fill | 200ms          | Right star (RTL)               |
| 3   | Star 2                 | Same as star 1                                                          | 300ms + 200ms          | 700ms          | Center star                    |
| 4   | Star 3 (if earned)     | Same but bigger sparkle burst                                           | 300ms + 300ms          | 1200ms         | Left star, extra dramatic      |
| 5   | Star 3 (if not earned) | Arrives and stays gray with subtle bounce                               | 300ms                  | 1200ms         | Softer landing                 |
| 6   | Perfect banner         | Unfurls from center (scroll effect)                                     | 400ms                  | 1600ms         | Only on 3 stars                |
| 7   | Confetti               | Full-screen explosion — gold, white, blue particles                     | 2000ms (Lottie)        | 1600ms         | Only on 3 stars                |
| 8   | Score counter          | Ticks up rapidly from 0 to final number                                 | 800ms (ease-out)       | 1800ms         | Satisfying tick sound cue      |
| 9   | XP pill                | Slides up from below with bounce                                        | 200ms (spring)         | 2200ms         |                                |
| 10  | XP breakdown           | Fades in                                                                | 200ms                  | 2400ms         |                                |
| 11  | Streak                 | Flame grows, number animates                                            | 400ms                  | 2600ms         | If milestone: extra fire burst |
| 12  | Narrator               | Slides in from bottom, enters emotional state animation                 | 600ms                  | 2800ms         | Lottie state animation         |
| 13  | Speech bubble          | Typewriter effect on text                                               | 40ms/word              | After Narrator |                                |
| 14  | Buttons                | Fade in from below                                                      | 200ms each             | 3400ms         | Staggered 100ms                |
| 15  | Background particles   | Golden light floats upward                                              | Infinite, slow         | 0ms            | Continuous ambient             |

**Total entrance sequence: ~3.5 seconds** — feels long but every moment is earned and rewarding.

### Haptic Feedback Sequence

- Star reveal: Impact (light) — each star
- Score tick-up: Rapid light taps
- 3-star confetti: Success (heavy)
- Streak milestone: Notification (success)

---

## Interaction

| Action                | Result                                                                 |
| --------------------- | ---------------------------------------------------------------------- |
| Tap "المرحلة التالية" | Navigate to Narrator Welcome for next stage (`10-narrator-welcome.md`) |
| Tap "أعد المحاولة"    | Restart same stage from Narrator Welcome                               |
| Tap "العودة للخريطة"  | Navigate back to Journey Map (`08-home-journey-map.md`)                |

---

## "So Close" Effect

If the child scored 1–2 stars but was close to the next tier:

- After the main animation, a subtle prompt appears:
- "تقريباً! كنت قريباً من ٣ نجوم — حاول مرة أخرى؟" — Cairo Regular 14px, Desert Gold
- This appears near the "أعد المحاولة" button to encourage replay

---

## Narrator Closing + Next Stage Teaser

After the results, the Narrator gives a closing line and teases the next stage:

- Appears as a secondary speech bubble after the main celebration:
- "في المرحلة القادمة ستكتشف لماذا اهتزّ عرش الرحمن..."
- Cairo Regular 14px, Deep Night Blue, with a subtle "mystery" feel
- This creates curiosity — one of the most powerful hooks

---

## Sound Cues (visual notes for designer)

| Moment          | Sound Description                     |
| --------------- | ------------------------------------- |
| Star reveal     | Bright ascending chime (one per star) |
| Score tick-up   | Rapid mechanical ticking              |
| 3-star confetti | Celebratory fanfare                   |
| Narrator appear | Warm whoosh                           |
| Perfect banner  | Triumphant short brass                |

---

## Assets Needed

| Asset                   | Description                                         | Format                                |
| ----------------------- | --------------------------------------------------- | ------------------------------------- |
| Large star (earned)     | 80px golden star with sparkle particles             | Lottie JSON (includes fill animation) |
| Large star (unearned)   | 80px gray outlined star                             | SVG                                   |
| Confetti explosion      | Full-screen, multi-color (gold, white, blue)        | Lottie JSON, 2s                       |
| Perfect banner          | "بدون أخطاء!" with ornate borders, unfurl animation | Lottie JSON                           |
| Narrator celebrating    | Standing, arms open wide                            | Lottie JSON or PNG                    |
| Narrator excited        | Arms raised                                         | Lottie JSON or PNG                    |
| Narrator encouraging    | Hand on heart, nodding                              | Lottie JSON or PNG                    |
| Golden particles        | Floating upward light particles                     | Lottie JSON, loop                     |
| Streak flame (animated) | Fire that grows with streak number                  | Lottie JSON                           |
