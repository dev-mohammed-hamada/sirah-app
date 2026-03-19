# Screen 18: Badges Screen (Prototype)

### شاشة الشارات

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components.

---

## Purpose

Dedicated full view for all badges — expanded from Awards Screen. Allows browsing by category. In V1, these are prototype badges with placeholder designs.

---

## Layout

- **Background:** Night Sky gradient
- **Header:** "الشارات" — Cairo Bold 24px, Starlight White + back arrow (RTL: right)

### Category Tabs (horizontal scroll)

Pill-shaped tabs in a horizontal row:

| Tab        | Label     |
| ---------- | --------- |
| All        | "الكل"    |
| Streak     | "السلسلة" |
| Perfection | "الإتقان" |
| Speed      | "السرعة"  |
| Stages     | "المراحل" |
| Goals      | "الأهداف" |

**Tab styles:**
| State | Background | Text | Border |
|-------|-----------|------|--------|
| Active | Desert Gold | Deep Night Blue, Cairo Bold 14px | None |
| Inactive | Transparent | Starlight White at 60%, Cairo Regular 14px | 1px Starlight White at 20% |

Height: 36px, horizontal padding: 16px, border-radius: 18px (full), 8px gap between tabs

### Badge Grid

- **3-column grid** with 16px gap
- Vertically scrollable

**Each badge cell:**

| State       | Circle (88px)            | Border                           | Overlay                                        | Name                               | Description                                                                   |
| ----------- | ------------------------ | -------------------------------- | ---------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| Earned      | Full color badge icon    | 2px Desert Gold                  | "تم ✓" small green badge (top-left, 20px pill) | Cairo Medium 12px, Starlight White | Cairo Regular 10px, Starlight White at 50%                                    |
| Locked      | Gray silhouette of badge | 1px dashed Muted Gray at 40%     | None                                           | Cairo Medium 12px, Muted Gray      | Unlock requirement: "أكمل سلسلة ٧ أيام" Cairo Regular 10px, Muted Gray at 60% |
| In-progress | Partially revealed icon  | Mini progress ring around circle | Progress % text                                | Cairo Medium 12px, Starlight White | "٣ من ٧ أيام"                                                                 |

**Progress ring (for in-progress badges):**

- Thin (3px) ring overlay on the badge circle
- Track: white at 10%
- Fill: Desert Gold
- Shows percentage of completion

### Badge Detail Modal (on tap)

- **Backdrop:** Dark overlay (50% black)
- **Card:** Center of screen, Starlight White bg, 24px radius, Level 3 shadow
- **Max-width:** 300px
- **Content (top to bottom):**
  - Large badge icon: 120px, centered
  - Badge name: Cairo Bold 20px, Deep Night Blue, centered
  - Description: Cairo Regular 14px, Muted Gray, centered
  - How earned / how to unlock: Cairo Regular 13px, Deep Night Blue
    - Earned: "حصلت عليها بإكمال سلسلة ٧ أيام متواصلة"
    - Locked: "أكمل سلسلة ٧ أيام للحصول على هذه الشارة"
  - Date earned (if earned): Cairo Regular 12px, Muted Gray
  - "إغلاق" button: Secondary Button, centered

---

## Visual Composition

```
┌─────────────────────────────┐
│                     الشارات →│  ← Header + back arrow
│                             │
│ [الكل][السلسلة][الإتقان]... │  ← Category tabs (scrollable)
│                             │
│  ┌────┐  ┌────┐  ┌────┐    │
│  │✓🏅│  │ 🏅 │  │ 🏅 │    │  ← Earned (gold border, ✓)
│  │المبتدئ│ │المثابر│ │النجم│  │
│  │أول   │ │٣ أيام│ │أول  │  │
│  │مرحلة │ │سلسلة │ │٣ نجوم│  │
│  └────┘  └────┘  └────┘    │
│                             │
│  ┌────┐  ┌────┐  ┌────┐    │
│  │╭──╮│  │ ?  │  │ ?  │    │  ← In-progress + Locked
│  ││3/7││  │    │  │    │    │
│  │╰──╯│  │    │  │    │    │
│  │الحافظ│ │المتقن│ │البطل│  │
│  │٣ من ٧│ │بلا  │ │أكمل │  │
│  │أيام  │ │أخطاء│ │الكل │  │
│  └────┘  └────┘  └────┘    │
│                             │
│  ┌────┐  ┌────┐  ┌────┐    │
│  │ ?  │  │ ?  │  │ ?  │    │  ← More locked badges
│  └────┘  └────┘  └────┘    │
│                             │
└─────────────────────────────┘
```

---

## Animations

| #   | Element              | Animation                                                  | Duration         | Notes                  |
| --- | -------------------- | ---------------------------------------------------------- | ---------------- | ---------------------- |
| 1   | Tabs                 | Scroll with momentum, active tab indicator slides smoothly | 200ms            | Spring physics         |
| 2   | Tab switch           | Content cross-fades                                        | 200ms            | Between categories     |
| 3   | Grid items           | Stagger in from below                                      | 50ms each        | On category load       |
| 4   | Earned badge shimmer | Light sweep across surface                                 | 600ms, every 4s  | Ongoing                |
| 5   | Locked badge tap     | Brief shake animation                                      | 200ms (3 shakes) | Tap feedback           |
| 6   | Badge Detail modal   | Scales in from tapped badge position                       | 300ms (spring)   | Origin-aware           |
| 7   | Modal dismiss        | Scales back to origin + fade out                           | 200ms            | Tap outside or close   |
| 8   | Progress ring        | Animated fill on first appear                              | 400ms            | For in-progress badges |

---

## Interaction

| Action                       | Result                                               |
| ---------------------------- | ---------------------------------------------------- |
| Tap category tab             | Filter grid to show only that category's badges      |
| Scroll tabs                  | Horizontal scroll with momentum                      |
| Tap earned badge             | Open Badge Detail modal                              |
| Tap locked badge             | Shake animation + modal shows unlock requirements    |
| Tap in-progress badge        | Modal shows current progress + remaining requirement |
| Tap "إغلاق" or outside modal | Dismiss modal                                        |
| Back arrow                   | Return to Awards Screen (`17-awards-screen.md`)      |

---

## Assets Needed

| Asset                 | Description                                         | Format                                    |
| --------------------- | --------------------------------------------------- | ----------------------------------------- |
| 10 badge icons (full) | V1 prototype designs, 88px display, 120px for modal | SVG/PNG                                   |
| 10 badge silhouettes  | Grayed versions for locked state                    | SVG/PNG (can be auto-generated from full) |
| Progress ring overlay | Thin circular progress indicator                    | SVG + CSS animation                       |
