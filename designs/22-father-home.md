# Screen 22: Father Home / Sons Tab
### الرئيسية — أبنائي

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Primary Button, Card Component).

---

## Purpose

Father's primary screen — overview of all linked sons and their progress at a glance. Simple, clean, and informative. The father doesn't play — he observes and motivates.

---

## Layout

- **Background:** Soft Cream (`#FAF3E8`)
- **Header:**
  - "أبنائي" — Cairo Bold 24px, Deep Night Blue
  - Right (RTL): Father's profile avatar (40px circle, golden border)

### Father's Bottom Navigation
- **2 tabs only** (simpler than Son's):
  - "أبنائي" (Sons) — people icon
  - "الأهداف" (Goals) — target icon
- Same style as Son's nav bar but with 2 items centered

### Sons List

**For each linked son — Son Card:**

- **Card:** Warm Sand bg, 16px radius, Level 1 shadow, 16px padding, full-width
- **12px gap** between cards

**Card layout:**

| Element | Position | Style |
|---------|----------|-------|
| Son's avatar | Right (RTL), 56px circle, golden border | Default avatar if none set |
| Display name | Next to avatar, top | Cairo Bold 16px, Deep Night Blue |
| Username | Below name | "@username" — Cairo Regular 12px, Muted Gray |
| Quick stats row | Below username, 8px top margin | Horizontal, 16px gap between items |
| Last active | Far left (RTL), vertically centered | Green/gray dot + text |
| Progress bar | Bottom of card, full-width | Mini bar showing stage completion |

**Quick stats:**
| Stat | Format |
|------|--------|
| Streak | 🔥 "٧ أيام" — Cairo Regular 13px |
| Stars | ⭐ "١٨" — Cairo Regular 13px |
| XP | 📊 "٣٤٠" — Cairo Regular 13px |

**Last active indicator:**
| State | Style |
|-------|-------|
| Active today | Green dot (8px, `#4CAF6E`) + "نشط اليوم" — Cairo Regular 11px, Success Green |
| Not today | Gray dot (8px, `#8A8A8A`) + "آخر نشاط: أمس" — Cairo Regular 11px, Muted Gray |

**Mini progress bar (bottom of card):**
- Track: light gray, 4px height, rounded
- Fill: Desert Gold
- Label at right (RTL): "٤/١٠ مراحل" — Cairo Regular 11px, Muted Gray

### "ربط ابن جديد" Button

- **Floating Action Button (FAB):** bottom-right (RTL: bottom-left), above nav bar
- Desert Gold bg, 56px circle, "+" icon (white, 24px), Level 2 shadow
- OR: full-width Primary Button at bottom of list if list is short

### Empty State (no sons linked)

- **Centered illustration:** Narrator with a "link" icon chain
- **Title:** "أضف ابنك" — Cairo Bold 20px, Deep Night Blue
- **Instructions:** "ابحث عن اسم المستخدم الخاص بابنك لربط حسابه" — Cairo Regular 14px, Muted Gray, centered
- **CTA button:** "ربط ابن" — Primary Button

---

## Visual Composition

```
┌─────────────────────────────┐
│  (👤)                أبنائي │  ← Header + father avatar
│                             │
│  ┌───────────────────────┐  │
│  │ (🧒) محمد أحمد        │  │  ← Son Card 1
│  │      @mohammed_123    │  │
│  │                       │  │
│  │ 🔥 ٧ أيام  ⭐ ١٨  📊 ٣٤٠│ ← Quick stats
│  │                       │  │
│  │         ● نشط اليوم   │  │  ← Active today (green)
│  │ [████████░░] ٤/١٠     │  │  ← Progress bar
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ (🧒) عبدالله أحمد     │  │  ← Son Card 2
│  │      @abdullah_456    │  │
│  │                       │  │
│  │ 🔥 ٣ أيام  ⭐ ٨  📊 ١٢٠│  │
│  │                       │  │
│  │     ○ آخر نشاط: أمس   │  │  ← Not active today (gray)
│  │ [████░░░░░░] ٢/١٠     │  │
│  └───────────────────────┘  │
│                             │
│                        (+)  │  ← FAB (add son)
│                             │
├─────────────────────────────┤
│       أبنائي | الأهداف      │  ← Father Bottom Nav (2 tabs)
└─────────────────────────────┘
```

---

## Link Son Flow (on FAB tap)

**Search Modal:**
- Bottom sheet (60% height), Starlight White bg, 24px top radius
- **Search field:** "اسم المستخدم" — standard Input Field
- **Real-time search results** as father types (after 3 chars)
- **Result row:** Avatar + display name + username + "إرسال طلب" button
- **On "إرسال طلب":** Loading → success toast: "تم إرسال طلب الربط" → dismiss sheet
- **No results:** "لم يتم العثور على مستخدم بهذا الاسم"

---

## Animations

| # | Element | Animation | Duration | Notes |
|---|---------|-----------|----------|-------|
| 1 | Son cards | Slide in from right (RTL) with stagger | 200ms each | 100ms stagger |
| 2 | Stats numbers | Brief count up | 300ms | On card appear |
| 3 | Active dot (green) | Subtle pulse | 2s loop | Always active |
| 4 | FAB | Subtle bounce on first appear | 300ms (spring) | Attract attention |
| 5 | Pull-to-refresh | Sand-swirl animation | Until data loads | Custom |
| 6 | Search modal | Slides up (spring) | 400ms | On FAB tap |
| 7 | Empty state | Narrator fades in + illustration gentle sway | 300ms + 3s loop | Only when empty |

---

## Interaction

| Action | Result |
|--------|--------|
| Tap son card | Navigate to Son Progress Detail (`23-son-progress-father-view.md`) |
| Tap FAB (+) | Open link son search modal |
| Pull-to-refresh | Refresh sons data |
| Tap "الأهداف" tab | Switch to Goals Tab (`24-goals-father-view.md`) |

---

## Assets Needed

| Asset | Description | Format |
|-------|-------------|--------|
| Empty state illustration | Narrator with link/chain icon | PNG, ~200px wide |
| Default son avatar | Placeholder for sons without photo | SVG/PNG, 56px |
| Default father avatar | Placeholder for father without photo | SVG/PNG, 40px |
