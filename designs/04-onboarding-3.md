# Screen 04: Onboarding — Page 3

### أبوك يتابع تقدمك

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, and shared components.

---

## Purpose

Third and final onboarding panel. Introduces the father-son linking concept — the father monitors progress and sets goals. This is the final motivator before account creation.

---

## Layout

- **Background:** Night Sky gradient (full screen)
- **Illustration area** (top 60%):
  - **Split scene** — divided into two halves by a golden connection line:
    - **Right side (RTL primary):** Child silhouette playing on a device, with stars and XP floating upward from the screen
    - **Left side (RTL secondary):** Father silhouette looking at a glowing screen showing progress bars, stars, and stage completion indicators
  - A **golden line** connects the two figures, symbolizing the linked accounts
  - Background: subtle desert horizon below both figures

- **Text area** (below illustration):
  - **Title:** "أبوك يتابع تقدمك" — Cairo Bold 24px, Starlight White, centered
  - **Description:** "والدك يشاهد إنجازاتك ويضع لك أهدافاً ومكافآت" — Cairo Regular 16px, Starlight White at 80%, centered

- **Navigation elements:**
  - **Page indicator dots:** 3 dots, third active (Desert Gold)
  - **Skip button:** Hidden on last page
  - **Action button:** "ابدأ الآن" — Primary Button (different text from "التالي" to signal this is the last step)

---

## Visual Composition

```
┌─────────────────────────────┐
│                             │
│                             │
│   👤 Father      👦 Son     │  ← Two silhouettes
│   📱 Dashboard   📱 Playing  │
│    ┃ ██░░ 70%    ┃ ⭐+10XP  │  ← Father sees progress,
│    ┃ ⭐⭐⭐       ┃  ❤️❤️❤️  │     Son earns rewards
│    ┗━━━━━━━━━━━━━┛          │  ← Golden connection line
│         ~~~~~~~~~~~~        │  ← Desert horizon
│                             │
│                             │
│    أبوك يتابع تقدمك         │  ← Title
│  والدك يشاهد إنجازاتك ويضع  │  ← Description
│     لك أهدافاً ومكافآت      │
│                             │
│        ○ ○ ●                │  ← Page dots (3 active)
│      [ ابدأ الآن ]           │  ← Start button
└─────────────────────────────┘
```

---

## Animations

| Step | Element                  | Animation                        | Duration             | Delay                |
| ---- | ------------------------ | -------------------------------- | -------------------- | -------------------- |
| 1    | Son silhouette           | Fades in from right (RTL)        | 400ms                | 0ms                  |
| 2    | Father silhouette        | Fades in from left (RTL)         | 400ms                | 200ms                |
| 3    | Golden connection line   | Draws between father and son     | 800ms (ease-out)     | 400ms                |
| 4    | Connection line          | Gentle pulse glow after drawing  | Infinite, 2s loop    | After draw           |
| 5    | Father's screen elements | Progress bars fill, stars appear | 600ms                | 600ms                |
| 6    | Son's screen elements    | Stars and XP float upward        | Infinite, slow drift | 600ms                |
| 7    | "ابدأ الآن" button       | Subtle glow pulse to attract tap | 2s loop              | After all animations |

---

## Interaction

- **Swipe right (RTL):** Goes back to Onboarding Page 2 (`03-onboarding-2.md`)
- **Tap "ابدأ الآن":** Navigates to Landing Screen (`05-landing-screen.md`)
- No forward swipe (this is the last page)

---

## Assets Needed

| Asset                         | Description                                   | Format                           |
| ----------------------------- | --------------------------------------------- | -------------------------------- |
| Father silhouette with device | Adult looking at a screen showing dashboard   | PNG, transparent BG              |
| Son silhouette with device    | Child playing on device with floating rewards | PNG, transparent BG              |
| Golden connection line        | Animated line connecting two figures          | Lottie or SVG with CSS animation |
| Dashboard elements            | Mini progress bars, stars for father's screen | SVG                              |
