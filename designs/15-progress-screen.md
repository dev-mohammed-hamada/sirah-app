# Screen 15: Progress Screen (Son)
### شاشة التقدم

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Bottom Navigation Bar, Card Component).

---

## Purpose

Overview of all learning progress — stages completed, XP, streak history, weekly activity. The child can see how far they've come and feel proud.

---

## Layout

- **Background:** Soft Cream (`#FAF3E8`)
- **Header:** "تقدمي" — Cairo Bold 24px, Deep Night Blue, centered
- **Bottom Navigation:** Son's nav bar (Progress tab active)

### Summary Cards Row (horizontal scroll)

Three cards in a horizontally scrollable row (card width: ~140px, height: ~100px, 12px gap):

#### Card 1: Total XP
- Background: Desert Gold gradient (`#D4A843 → #E8C36A`)
- Icon: Golden shield (top-right RTL)
- Number: Cairo Black 32px, Starlight White
- Label: "نقاط الخبرة" — Cairo Regular 12px, Starlight White at 80%

#### Card 2: Streak
- Background: Sunset Orange gradient (`#E8734A → #F09060`)
- Icon: Flame (top-right RTL)
- Number: Cairo Black 32px, Starlight White
- Label: "أيام متواصلة" — Cairo Regular 12px, Starlight White at 80%
- **Extra:** Small calendar dots showing last 7 days (bottom of card)
  - Filled dot = active that day (Starlight White)
  - Empty dot = missed (white at 30%)

#### Card 3: Stars
- Background: Royal Purple gradient (`#4A2D6B → #6B4A8B`)
- Icon: Star cluster (top-right RTL)
- Number: "18/30" — Cairo Black 32px, Starlight White
- Label: "النجوم" — Cairo Regular 12px, Starlight White at 80%

### Stage Progress List

**Section header:** "المراحل" — Cairo Bold 20px, Deep Night Blue, 24px top margin

Vertical scrollable list of all 10 stages:

| Element | Position | Style |
|---------|----------|-------|
| Stage number | Right (RTL), 40px golden circle | Cairo Bold 16px, Starlight White inside |
| Stage title | Next to number | Cairo Regular 16px, Deep Night Blue |
| Stars | Far left (RTL) | 3 small stars (filled gold / empty gray) |
| Best score | Below stars | Cairo Regular 12px, Muted Gray, "78/100" |

**Row States:**
| State | Style |
|-------|-------|
| Completed | Full opacity, golden stage number circle |
| Current | Highlighted with subtle Desert Gold bg glow, "الآن" badge |
| Locked | Grayed out (50% opacity), lock icon instead of stars, "🔒" |

Row height: 64px, subtle dividers (1px, light gray at 20%)

### Weekly Activity Chart

**Section header:** "نشاطك هذا الأسبوع" — Cairo Bold 20px, Deep Night Blue, 24px top margin

- Simple **bar chart** showing XP earned per day (last 7 days)
- Chart height: ~120px
- Bars: Desert Gold, 24px width, rounded top (8px radius)
- Day labels below bars: Arabic day abbreviations — سبت، أحد، اثنين، ثلاثاء، أربعاء، خميس، جمعة
  - Cairo Regular 11px, Muted Gray
- **Today's bar:** Highlighted with glow + slightly brighter shade
- Y-axis: implied (no visible axis), tallest bar = max height
- Zero days: tiny 4px stub bar in light gray

---

## Visual Composition

```
┌─────────────────────────────┐
│            تقدمي             │  ← Header
│                             │
│ ┌────────┐┌────────┐┌──────┐│
│ │ ⭐ 18/30││ 🔥  7  ││ 🛡️340││  ← Summary cards (scrollable)
│ │ النجوم  ││متواصلة ││ XP   ││
│ │        ││●●●○●●● ││      ││
│ └────────┘└────────┘└──────┘│
│                             │
│  المراحل                    │  ← Section header
│  ───────────────────────    │
│  ① عام الفيل      ⭐⭐⭐ 95 │  ← Completed
│  ② المولد النبوي   ⭐⭐  78 │  ← Completed
│  ③ الطفولة        ⭐⭐⭐ 88 │  ← Completed
│  ④ الشباب      [الآن]      │  ← Current (highlighted)
│  ⑤ غار حراء        🔒      │  ← Locked
│  ⑥ الوحي الأول     🔒      │
│  ...                        │
│                             │
│  نشاطك هذا الأسبوع          │  ← Section header
│  ───────────────────────    │
│  ┃  █           █  ✨│      │
│  ┃  █     █     █   │      │  ← Bar chart
│  ┃  █  █  █  █  █   │      │
│  ┃──█──█──█──█──█───│      │
│    سب أح اث ثل أر خم جم    │  ← Day labels
│                             │
├─────────────────────────────┤
│ ⚙️ | 🏆 | 🎯 | 📊 | 🏠    │  ← Bottom Nav (Progress active)
└─────────────────────────────┘
```

---

## Animations

| # | Element | Animation | Duration | Notes |
|---|---------|-----------|----------|-------|
| 1 | Summary cards | Slide in from right (RTL) with stagger | 200ms each | 100ms stagger |
| 2 | Card numbers | Count up from 0 to final value | 600ms (ease-out) | After cards settle |
| 3 | Streak calendar dots | Pop in sequentially | 50ms each | Left to right (RTL) |
| 4 | Stage list items | Fade in with stagger | 150ms each, 50ms stagger | Top to bottom |
| 5 | Current stage row | Subtle golden glow pulse | 2s loop | Always active |
| 6 | Bar chart bars | Grow from bottom to full height | 400ms each, 100ms stagger | Left to right |
| 7 | Today's bar | Extra glow after growth | 600ms | After bar reaches height |

---

## Interaction

| Action | Result |
|--------|--------|
| Horizontal scroll on cards | Scroll between summary cards |
| Tap a completed stage row | Navigate to Stage Detail (`09-stage-detail.md`) |
| Tap current stage row | Navigate to Stage Detail |
| Tap locked stage row | No action (or subtle lock shake) |

---

## Assets Needed

| Asset | Description | Format |
|-------|-------------|--------|
| Shield icon | Golden shield for XP | SVG |
| Flame icon | Animated flame for streak | SVG or small Lottie |
| Star cluster icon | Group of small stars | SVG |
| Lock icon (small) | For locked stages in list | SVG |
