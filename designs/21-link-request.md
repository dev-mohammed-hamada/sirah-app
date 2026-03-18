# Screen 21: Link Request Screen
### شاشة طلب ربط الحساب

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Primary Button, Secondary Button).

---

## Purpose

Son receives and responds to a father's linking request. This is triggered by a notification and presented as a full-screen modal. The decision is important — it determines who can see the child's progress.

---

## Layout

### Presentation
- **Full-screen modal overlay**
- **Backdrop:** Semi-transparent dark background (50% black opacity)
- Modal card is centered vertically and horizontally

### Modal Card
- **Background:** Starlight White (`#FFF8F0`)
- **Radius:** 24px
- **Shadow:** Level 3
- **Max-width:** 320px
- **Padding:** 24px

### Card Content (top to bottom)

**1. Illustration (top)**
- Father and Son silhouettes with a golden connection line between them
- The line is **dashed** (not yet connected — pending acceptance)
- Father on the left (RTL), Son on the right (RTL)
- Illustration height: ~120px

**2. Title**
- "طلب ربط حساب" — Cairo Bold 20px, Deep Night Blue, centered

**3. Description**
- "[Father's display name] يريد متابعة تقدمك" — Cairo Regular 16px, Deep Night Blue, centered
- Father's name is in Cairo Bold (highlighted within the sentence)

**4. Info Note**
- "سيتمكن من رؤية تقدمك وإرسال أهداف لك" — Cairo Regular 12px, Muted Gray, centered
- 8px top margin

**5. Buttons (24px top spacing)**
- "قبول" — Primary Button, full-width
- 12px spacing
- "رفض" — Secondary Button (outlined), full-width

---

## Visual Composition

```
┌─────────────────────────────┐
│                             │
│     (dark backdrop 50%)     │
│                             │
│   ┌─────────────────────┐   │
│   │                     │   │
│   │   👤 ─ ─ ─ ─ 👦    │   │  ← Father-Son illustration
│   │   أب    (dashed)  ابن│   │     (dashed connection line)
│   │                     │   │
│   │   طلب ربط حساب      │   │  ← Title
│   │                     │   │
│   │  أحمد محمد يريد     │   │  ← Description
│   │   متابعة تقدمك      │   │     (father's name bold)
│   │                     │   │
│   │  سيتمكن من رؤية     │   │  ← Info note (small, gray)
│   │  تقدمك وإرسال       │   │
│   │  أهداف لك           │   │
│   │                     │   │
│   │ ┌─────────────────┐ │   │
│   │ │      قبول       │ │   │  ← Accept (Primary)
│   │ └─────────────────┘ │   │
│   │ ┌─────────────────┐ │   │
│   │ │      رفض        │ │   │  ← Decline (Secondary)
│   │ └─────────────────┘ │   │
│   │                     │   │
│   └─────────────────────┘   │
│                             │
│     (dark backdrop)         │
│                             │
└─────────────────────────────┘
```

---

## Animations

| # | Element | Animation | Duration | Notes |
|---|---------|-----------|----------|-------|
| 1 | Backdrop | Dims from 0→50% black opacity | 300ms | Screen entrance |
| 2 | Modal card | Slides up from below + scales from 0.9→1.0 | 300ms (spring) | Centered landing |
| 3 | Dashed line | Dash-offset animation (marching ants effect) | 2s loop | Pending state feel |
| 4 | Illustration | Father and Son silhouettes fade in | 200ms | 100ms after card |

### On Accept
| # | Element | Animation | Duration | Notes |
|---|---------|-----------|----------|-------|
| 1 | Dashed line | Becomes solid golden line | 300ms | Connection established |
| 2 | Connection burst | Golden particles burst along the line | 600ms (Lottie) | Celebration |
| 3 | Card content | Transitions to success state | 300ms | Cross-fade |
| 4 | Success state | Large checkmark + "تم الربط بنجاح! ✓" | 400ms | Green checkmark animation |
| 5 | Auto-dismiss | Card slides down and fades out | 400ms | After 2s display |

### On Decline
| # | Element | Animation | Duration | Notes |
|---|---------|-----------|----------|-------|
| 1 | Card | Gently slides down and fades out | 300ms (ease-in) | Soft dismissal |
| 2 | Backdrop | Fades to transparent | 200ms | After card exits |

---

## Success State (after accepting)

The card content transitions to:
- **Illustration:** Same Father-Son but with solid golden line (connected)
- **Checkmark:** Large animated green checkmark (Lottie, 400ms)
- **Text:** "تم الربط بنجاح!" — Cairo Bold 20px, Success Green, centered
- **Subtitle:** "يمكن لوالدك الآن متابعة تقدمك" — Cairo Regular 14px, Muted Gray
- Auto-dismisses after 2 seconds

---

## Interaction

| Action | Result |
|--------|--------|
| Tap "قبول" | Accept animation → success state → auto-dismiss → return to previous screen |
| Tap "رفض" | Decline animation → dismiss → return to previous screen |
| Tap backdrop | No action (must choose accept or decline) |
| Swipe down on card | No action (intentionally blocking — must make a choice) |

---

## Trigger

This screen appears when:
- Son receives a push notification: "والدك يريد متابعة تقدمك — اقبل الطلب؟"
- Son taps the notification → app opens → this modal appears
- OR: Son opens app and has a pending link request → modal appears on Home screen

---

## Assets Needed

| Asset | Description | Format |
|-------|-------------|--------|
| Father silhouette | Adult figure, standing | PNG, transparent BG, ~80px tall |
| Son silhouette | Child figure, standing | PNG, transparent BG, ~60px tall |
| Dashed connection line | Animated dashed golden line | SVG + CSS animation |
| Solid connection line | Connected state golden line | SVG |
| Connection burst | Golden particles along line | Lottie JSON, 600ms |
| Checkmark success | Green circle + checkmark pop-in | Lottie JSON, 400ms |
