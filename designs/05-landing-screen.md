# Screen 05: Landing Screen
### شاشة الترحيب — Sign Up / Login

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, and shared components.

---

## Purpose

Entry point after onboarding — the user chooses to create a new account or log into an existing one. Should feel warm and inviting.

---

## Layout

### Top Section (40% of screen)
- **Background:** Night Sky gradient
- The **Narrator silhouette** sitting by a campfire (same as splash but smaller scale)
- **App logo** above the Narrator: "سيرة النبي ﷺ" in Cairo Bold 24px, Starlight White
- Campfire continues flickering (Lottie, looping from splash)

### Bottom Section (60% of screen)
- A **rounded white/cream card** sliding up from the bottom
  - Background: Soft Cream (`#FAF3E8`)
  - Radius: 24px (top corners only)
  - Shadow: Level 2

- **Card content (top to bottom):**
  - **Welcome text:** "أهلاً بك يا بطلي" — Cairo Bold 24px, Deep Night Blue, centered
  - **Subtitle:** "سجّل حسابك وابدأ الرحلة" — Cairo Regular 16px, Muted Gray, centered
  - **32px spacing**
  - **"إنشاء حساب جديد" button:** Primary Button (Desert Gold, full-width)
  - **16px spacing**
  - **"تسجيل الدخول" button:** Secondary Button (outlined Desert Gold, full-width)
  - **24px spacing**
  - **Terms text:** "بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية" — Caption style (Cairo Medium 12px), Muted Gray, centered, with underlined tappable links

---

## Visual Composition

```
┌─────────────────────────────┐
│      ✦    ✧   ✦             │  ← Night Sky gradient
│                             │
│      سيرة النبي ﷺ           │  ← App logo
│                             │
│          🔥                 │  ← Campfire (Lottie)
│        ░░████░░             │  ← Narrator silhouette
│                             │
├─────────────────────────────┤  ← Rounded card (24px radius top)
│                             │
│     أهلاً بك يا بطلي        │  ← Welcome text
│   سجّل حسابك وابدأ الرحلة   │  ← Subtitle
│                             │
│  ┌───────────────────────┐  │
│  │   إنشاء حساب جديد     │  │  ← Primary Button
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │    تسجيل الدخول       │  │  ← Secondary Button
│  └───────────────────────┘  │
│                             │
│  بالمتابعة، أنت توافق على   │  ← Terms text
│  شروط الاستخدام وسياسة     │
│       الخصوصية              │
└─────────────────────────────┘
```

---

## Animations

| Step | Element | Animation | Duration | Delay |
|------|---------|-----------|----------|-------|
| 1 | Top section | Already visible (coming from splash/onboarding) | — | — |
| 2 | Campfire | Continues flickering (Lottie loop) | Infinite | 0ms |
| 3 | Bottom card | Slides up from below screen | 400ms (ease-out) | 0ms |
| 4 | Welcome text | Fades in | 200ms | 200ms |
| 5 | Subtitle | Fades in | 200ms | 300ms |
| 6 | Primary button | Fades in from below | 200ms | 400ms |
| 7 | Secondary button | Fades in from below | 200ms | 500ms |
| 8 | Terms text | Fades in | 200ms | 600ms |

---

## Interaction

- **Tap "إنشاء حساب جديد"** → Navigate to Sign Up Screen (`06-sign-up.md`)
- **Tap "تسجيل الدخول"** → Navigate to Login Screen (`07-login.md`)
- **Tap "شروط الاستخدام"** → Open terms page (in-app browser or modal)
- **Tap "سياسة الخصوصية"** → Open privacy page

---

## Assets Needed

| Asset | Description | Format |
|-------|-------------|--------|
| Narrator campfire scene (small) | Reuse from splash, scaled down | Same Lottie + PNG assets |
