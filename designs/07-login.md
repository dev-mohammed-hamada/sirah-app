# Screen 07: Login
### تسجيل الدخول

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Input Field, Primary Button).

---

## Purpose

Returning user authentication. Should feel warm and welcoming — like the Narrator recognizing an old friend.

---

## Layout

- **Background:** Soft Cream (`#FAF3E8`) full screen
- **Header:** Back arrow (RTL: right side), "تسجيل الدخول" centered, Cairo Bold 20px

### Top Illustration
- Small **Narrator silhouette** waving (scaled smaller than landing page, ~120px height)
- **Speech bubble** above/beside Narrator: "أهلاً بعودتك!" — Narrator Speech Bubble component
- Positioned in the top-center area, below the header

### Form Fields

| Field | Label | Type | Notes |
|-------|-------|------|-------|
| Username | اسم المستخدم | Text | Standard Input Field |
| Password | كلمة المرور | Password | With show/hide eye toggle |

### Action Section

- **"تسجيل الدخول" button:** Primary Button, full-width
- **16px spacing**
- **"نسيت كلمة المرور؟"** — Cairo Regular 14px, Muted Gray, centered, tappable
- **32px spacing**
- **Footer:** "ليس لديك حساب؟ أنشئ حساباً جديداً" — Cairo Regular 14px, Desert Gold for the link portion, centered

---

## Visual Composition

```
┌─────────────────────────────┐
│               تسجيل الدخول →│  ← Header with back arrow
│                             │
│        ┌──────────────┐     │
│        │ أهلاً بعودتك! │     │  ← Speech bubble
│        └──────┬───────┘     │
│            ░░████░░         │  ← Narrator waving
│                             │
│                             │
│  ┌───────────────────────┐  │
│  │ اسم المستخدم          │  │  ← Username field
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ كلمة المرور       👁️  │  │  ← Password field
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │    تسجيل الدخول       │  │  ← Primary Button
│  └───────────────────────┘  │
│                             │
│     نسيت كلمة المرور؟       │  ← Forgot password link
│                             │
│  ليس لديك حساب؟ أنشئ       │  ← Sign up link
│      حساباً جديداً          │
└─────────────────────────────┘
```

---

## Animations

| Step | Element | Animation | Duration | Delay |
|------|---------|-----------|----------|-------|
| 1 | Narrator | Waving arm movement (Lottie, subtle, looping) | 2s loop | 0ms |
| 2 | Speech bubble | Fades in, scales from 0.9→1.0 | 300ms (spring) | 200ms |
| 3 | Speech text | Typewriter effect, word by word | 40ms per word | After bubble appears |
| 4 | Form fields | Fade in with slight upward motion | 200ms each | 100ms stagger |
| 5 | Button + links | Fade in | 200ms | After fields |
| 6 | Login loading | Button shows golden Lottie spinner | Until response | On tap |
| 7 | Login success | Narrator transitions from waving to celebrating state (arms open), then screen transitions | 600ms Narrator, then 300ms transition | On success |
| 8 | Login error | Fields shake (3 shakes, 300ms), error message appears below | 300ms | On error |

---

## Interaction

- **Tap "تسجيل الدخول":** Validates → loading → on success:
  - Narrator celebrates briefly
  - Navigate to Home/Journey Map (`08-home-journey-map.md`) for Son
  - Navigate to Father Home (`22-father-home.md`) for Father
- **Tap "نسيت كلمة المرور؟"** → Navigate to password reset flow (simple — username + new password)
- **Tap "أنشئ حساباً جديداً"** → Navigate to Sign Up (`06-sign-up.md`)

---

## Error States

| Error | Display |
|-------|---------|
| Empty fields | Red border + "هذا الحقل مطلوب" |
| Wrong username/password | Toast at top: "اسم المستخدم أو كلمة المرور غير صحيحة" + both fields get red border |
| Server error | Toast: "حدث خطأ، حاول مرة أخرى" |
| Too many attempts | Toast: "محاولات كثيرة، حاول بعد ٥ دقائق" + button disabled with countdown |

---

## Assets Needed

| Asset | Description | Format |
|-------|-------------|--------|
| Narrator waving | Faceless silhouette with subtle arm wave | Lottie JSON |
| Narrator celebrating | Transition from waving to arms-open celebration | Lottie JSON (or separate state) |
