# Screen 10: Narrator Welcome
### شاشة ترحيب الراوي

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Narrator Speech Bubble, Primary Button).

---

## Purpose

The Narrator introduces the stage — sets emotional context. This is the moment where the child feels like they're sitting beside a wise grandfather who is about to tell them a secret from history.

---

## Layout

- **Background:** Night Sky gradient with a campfire glow at the bottom center
- **Stars:** Twinkling in the sky background (same as splash screen)

### Narrator Illustration (center-bottom, 40% of screen)
- Large Narrator silhouette (from behind, seated by campfire)
- Campfire in front of him, warm light casting on desert sand
- Warm orange glow radiates from the fire, illuminating the Narrator and surrounding sand

### Speech Bubble (center-top)
- Large Narrator Speech Bubble (see design system)
- Max-width: 85% of screen width
- Contains the welcome text, e.g.:
  - "أهلاً يا بطلي! اليوم سنسافر معاً إلى زمنٍ بعيد... قبل أن يولد النبي ﷺ"
- Text: Cairo Bold 20px, Deep Night Blue, centered within bubble

### Stage Title
- Below the speech bubble
- "المرحلة ١: ما قبل الميلاد" — Cairo Medium 14px, Desert Gold

### Continue Button
- Bottom of screen (above safe area)
- "هيا بنا" — Primary Button with a forward arrow icon (←  RTL arrow)
- Full-width with 20px horizontal padding

---

## Visual Composition

```
┌─────────────────────────────┐
│      ✦  ✧    ✦   ✧         │  ← Starry night sky
│                             │
│    المرحلة ١: ما قبل الميلاد │  ← Stage title (gold)
│                             │
│  ┌─────────────────────┐    │
│  │ أهلاً يا بطلي! اليوم │    │  ← Narrator Speech Bubble
│  │ سنسافر معاً إلى زمنٍ │    │
│  │ بعيد... قبل أن يولد  │    │
│  │    النبي ﷺ           │    │
│  └─────────┬───────────┘    │
│            ▼ (tail)         │
│                             │
│          🔥🔥🔥             │  ← Campfire (Lottie, large)
│        ░░████████░░         │  ← Narrator silhouette (seated)
│  ~~~ warm sand glow ~~~     │  ← Desert sand with firelight
│                             │
│  ┌───────────────────────┐  │
│  │      هيا بنا ←        │  │  ← Continue Button
│  └───────────────────────┘  │
└─────────────────────────────┘
```

---

## Animations

| # | Element | Animation | Duration | Delay |
|---|---------|-----------|----------|-------|
| 1 | Screen | Fade in from previous screen | 300ms | 0ms |
| 2 | Campfire | Looping Lottie — warm flickering with light glow casting | Infinite loop | 0ms |
| 3 | Campfire sparks | Small orange particles drift upward randomly | Random intervals | Continuous |
| 4 | Narrator | Fades in and shifts up slightly (from resting position) | 300ms | 200ms |
| 5 | Speech bubble | Scales in from 0.8→1.0 with spring | 300ms (spring) | 400ms |
| 6 | Speech text | Typewriter effect — word by word | 40ms per word | After bubble appears |
| 7 | Stage title | Fades in | 200ms | 200ms |
| 8 | Continue button | Fades in from below | 200ms | After all text is revealed |
| 9 | Stars | Twinkling (same as splash) | Infinite, staggered | 0ms |

---

## Interaction

| Action | Result |
|--------|--------|
| Tap "هيا بنا" | Navigate to first Story Panel (`11-story-panel.md`) |
| Wait | Typewriter effect completes, button appears — no auto-advance |

---

## Content Variation

The Narrator's welcome text changes per stage. Examples:

| Stage | Welcome Text |
|-------|-------------|
| 1 | "أهلاً يا بطلي! اليوم سنسافر معاً إلى زمنٍ بعيد... قبل أن يولد النبي ﷺ" |
| 2 | "هل تعلم أن جيشاً كاملاً بالفيلة أراد هدم الكعبة؟ تعال أحكي لك ماذا حدث!" |
| 3 | "اليوم يوم مميز يا بطلي... سنشهد معاً ميلاد خير البشر ﷺ" |
| 4 | "هل تساءلت كيف كانت طفولة النبي ﷺ؟ تعال نكتشف معاً..." |
| 5 | "كبر محمد ﷺ وأصبح شاباً... لكن ما الذي ميّزه عن أقرانه؟" |

---

## Mood

Intimate, warm, like sitting with a wise grandfather who is about to tell you a secret from history. The campfire creates a circle of warmth in the vast desert night.

---

## Assets Needed

| Asset | Description | Format |
|-------|-------------|--------|
| Campfire (large) | Warm flickering fire with light glow, campfire sparks | Lottie JSON |
| Narrator silhouette (seated, from behind, large) | ~300px height, faceless, white thobe | PNG, transparent BG |
| Desert sand with firelight | Ground texture with warm orange glow | PNG layer |
| Night sky with stars | Reuse from splash screen | Same assets |
