# Screen 03: Onboarding — Page 2

### تعلّم وأنت تلعب

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, and shared components.

---

## Purpose

Second onboarding panel. Shows the gamified learning experience — quizzes, stars, hearts, XP. Makes the child excited to play.

---

## Layout

- **Background:** Night Sky gradient (full screen)
- **Illustration area** (top 60%):
  - A **child silhouette** sitting cross-legged in the center
  - Floating **quiz cards** around them — MCQ option cards with Arabic text snippets
  - **Stars, hearts, and XP badges** orbiting gently around the child
  - The **Narrator silhouette** stands behind the child, hand extended as if teaching
  - Warm ambient glow surrounding the child (Golden Glow radial gradient)

- **Text area** (below illustration):
  - **Title:** "تعلّم وأنت تلعب" — Cairo Bold 24px, Starlight White, centered
  - **Description:** "أسئلة ممتعة ونجوم ومكافآت في كل مرحلة" — Cairo Regular 16px, Starlight White at 80%, centered

- **Navigation elements:**
  - **Page indicator dots:** 3 dots, second active (Desert Gold)
  - **Skip button:** "تخطي" top-right (RTL)
  - **Next button:** "التالي" Primary Button

---

## Visual Composition

```
┌─────────────────────────────┐
│  تخطي                       │
│                             │
│       ⭐    [أ. عبدالمطلب]  │  ← Floating quiz card
│    ❤️          ✨            │  ← Hearts, sparkles orbiting
│        🧒 (child)           │  ← Child silhouette (seated)
│     [ب. أبو طالب]    ⭐     │  ← Another quiz card
│       👤 (Narrator)         │  ← Narrator behind child
│    +10XP        ❤️          │  ← XP badge floating
│                             │
│                             │
│    تعلّم وأنت تلعب          │  ← Title
│  أسئلة ممتعة ونجوم ومكافآت  │  ← Description
│       في كل مرحلة           │
│                             │
│        ○ ● ○                │  ← Page dots (2 active)
│      [ التالي ]              │
└─────────────────────────────┘
```

---

## Animations

| Step | Element           | Animation                                                 | Duration                  | Delay            |
| ---- | ----------------- | --------------------------------------------------------- | ------------------------- | ---------------- |
| 1    | Quiz cards        | Float in from edges (staggered)                           | 600ms each                | Staggered 200ms  |
| 2    | Stars, hearts, XP | Orbit slowly around the child in a gentle circular motion | Infinite, 8s per rotation | 0ms              |
| 3    | Stars             | Occasional individual sparkle effect                      | 300ms per sparkle         | Random intervals |
| 4    | Child silhouette  | Gentle idle animation (subtle breathing/sway)             | 3s loop                   | 0ms              |
| 5    | Narrator          | Slight hand gesture animation                             | 4s loop                   | 0ms              |
| 6    | Ambient glow      | Soft pulse around the child                               | 3s loop, opacity 0.6→0.9  | 0ms              |

---

## Interaction

- **Swipe left (RTL):** Advances to Onboarding Page 3 (`04-onboarding-3.md`)
- **Swipe right (RTL):** Goes back to Onboarding Page 1 (`02-onboarding-1.md`)
- **Tap "التالي":** Advances to next page
- **Tap "تخطي":** Skips to Landing Screen (`05-landing-screen.md`)

---

## Assets Needed

| Asset                                     | Description                         | Format              |
| ----------------------------------------- | ----------------------------------- | ------------------- |
| Child silhouette (seated)                 | Faceless child sitting cross-legged | PNG, transparent BG |
| Narrator silhouette (teaching pose)       | Standing, hand extended             | PNG, transparent BG |
| Quiz card mockups (2–3)                   | Rounded cards with Arabic text      | SVG                 |
| Floating elements (star, heart, XP badge) | Individual game mechanic icons      | SVG/Lottie          |
