# Screen 06: Sign Up
### إنشاء حساب

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Input Field, Primary Button).

---

## Purpose

Account creation with role selection (Son or Father). This determines the entire app experience going forward.

---

## Layout

- **Background:** Soft Cream (`#FAF3E8`) full screen
- **Header:** Back arrow (RTL: right side pointing right), screen title "إنشاء حساب" centered, Cairo Bold 20px

### Role Selection (top section)

Two large selectable cards side by side (50% width each minus gap):

**"ابن" (Son) Card:**
- Icon: Child silhouette with a star above
- Small illustration: a mini journey path
- Label: "ابن" — Cairo Bold 16px

**"أب" (Father) Card:**
- Icon: Adult silhouette with a shield
- Small illustration: a mini dashboard
- Label: "أب" — Cairo Bold 16px

**Card States:**
| State | Style |
|-------|-------|
| **Unselected** | Light gray border (1px), no glow, white bg |
| **Selected** | Desert Gold border (3px), subtle golden glow (`0 0 12px rgba(212,168,67,0.3)`), Desert Gold checkmark in top-left corner |

### Form Fields (below role cards)

All fields use the **Input Field** component from the design system.

| Field | Label | Type | Visibility | Validation |
|-------|-------|------|------------|------------|
| Display Name | الاسم | Text | Always | Required, min 2 chars |
| Age | العمر | Number | Son only (hidden for Father) | Required for Son, 6–14 range |
| Username | اسم المستخدم | Text | Always | Required, unique, alphanumeric + underscore, min 3 chars |
| Password | كلمة المرور | Password (with show/hide toggle) | Always | Required, min 8 chars |
| Confirm Password | تأكيد كلمة المرور | Password (with show/hide toggle) | Always | Must match password |

**Username availability check:**
- After 500ms debounce of typing, check availability
- Available: green checkmark icon appears to the left (RTL) of the field
- Taken: red X icon + error text "اسم المستخدم مستخدم بالفعل"

### Submit Section (bottom)

- **"إنشاء الحساب" button:** Primary Button, full-width, 24px below last field
- **Footer link:** "لديك حساب بالفعل؟ سجّل دخولك" — Cairo Regular 14px, Desert Gold text, centered, tappable

---

## Visual Composition

```
┌─────────────────────────────┐
│                 إنشاء حساب →│  ← Header with back arrow
│                             │
│  ┌──────────┐ ┌──────────┐  │
│  │    👤    │ │    👦    │  │  ← Role cards
│  │   أب    │ │   ابن  ✓ │  │     (Son selected)
│  │  🛡️ Dashboard│ │ ⭐ Journey│  │
│  └──────────┘ └──────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ الاسم                 │  │  ← Display Name
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ العمر                 │  │  ← Age (Son only)
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ اسم المستخدم      ✓  │  │  ← Username + availability
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ كلمة المرور       👁️  │  │  ← Password + toggle
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │ تأكيد كلمة المرور 👁️  │  │  ← Confirm Password
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │     إنشاء الحساب      │  │  ← Primary Button
│  └───────────────────────┘  │
│                             │
│  لديك حساب بالفعل؟ سجّل    │  ← Login link
│        دخولك               │
└─────────────────────────────┘
```

---

## Animations

| Step | Element | Animation | Duration | Delay |
|------|---------|-----------|----------|-------|
| 1 | Role cards | Slide in from sides (Son from right RTL, Father from left RTL) | 300ms (ease-out) | Staggered 100ms |
| 2 | Form fields | Fade in sequentially | 150ms each | 50ms stagger |
| 3 | Role card selection | Card scales to 1.03 then back, border color transitions, checkmark pops in with bounce | 200ms (spring) | On tap |
| 4 | Username check | Checkmark/X icon fades in | 200ms | After 500ms debounce |
| 5 | Submit loading | Button shows golden Lottie spinner, then transitions to Home on success | Until response | On tap |
| 6 | Validation error | Affected fields shake horizontally | 300ms (3 shakes) | Immediate |
| 7 | Field focus | Label floats above, border transitions to Desert Gold | 150ms | On focus |

---

## Interaction

- **Select role card:** Tapping one deselects the other. Role determines visible fields (Age hidden for Father).
- **Username field:** Real-time availability check with visual feedback
- **Password toggle:** Eye icon shows/hides password text
- **Tap "إنشاء الحساب":** Validates all fields → shows loading → on success navigates to Home/Journey Map (`08-home-journey-map.md` for Son, `22-father-home.md` for Father)
- **Tap footer link:** Navigate to Login (`07-login.md`)

---

## Error States

| Error | Display |
|-------|---------|
| Empty required field | Red border + "هذا الحقل مطلوب" below |
| Username taken | Red border + "اسم المستخدم مستخدم بالفعل" |
| Password too short | Red border + "كلمة المرور يجب أن تكون ٨ أحرف على الأقل" |
| Passwords don't match | Red border on confirm field + "كلمتا المرور غير متطابقتين" |
| Age out of range | Red border + "العمر يجب أن يكون بين ٦ و ١٤" |
| Server error | Toast notification at top: "حدث خطأ، حاول مرة أخرى" |

---

## Assets Needed

| Asset | Description | Format |
|-------|-------------|--------|
| Son role illustration | Child silhouette with star + mini journey path | SVG |
| Father role illustration | Adult silhouette with shield + mini dashboard | SVG |
| Loading spinner | Golden desert-themed spinner | Lottie JSON |
