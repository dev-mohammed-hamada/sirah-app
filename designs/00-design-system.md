# سيرة النبي ﷺ — Global Design System
### Foundation for All Screens

---

## Brand Identity

- **App Name:** سيرة النبي ﷺ
- **Tagline:** تعلّم السيرة وأنت تلعب
- **Personality:** Warm, magical, inviting — like a grandfather telling stories by firelight
- **Direction:** Full RTL (Right-to-Left) — all layouts, navigation, and gestures mirror for Arabic

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| **Desert Gold** | `#D4A843` | Primary accent, stars, XP highlights, buttons |
| **Deep Night Blue** | `#1A2744` | Primary backgrounds, headers, navigation |
| **Warm Sand** | `#F5E6C8` | Card backgrounds, light surfaces |
| **Sunset Orange** | `#E8734A` | Hearts, streak flame, urgent CTAs |
| **Royal Purple** | `#4A2D6B` | Badge glow, special celebrations, premium feel |
| **Starlight White** | `#FFF8F0` | Text on dark backgrounds, clean surfaces |
| **Soft Cream** | `#FAF3E8` | Page backgrounds, neutral surfaces |
| **Success Green** | `#4CAF6E` | Correct answers, completion states |
| **Error Red** | `#E05555` | Wrong answers, heart loss |
| **Muted Gray** | `#8A8A8A` | Disabled states, locked content |

---

## Gradient Presets

| Name | Definition | Usage |
|---|---|---|
| **Night Sky** | `#1A2744 → #4A2D6B` (top→bottom) | Main backgrounds, journey map sky |
| **Desert Horizon** | `#E8734A → #D4A843 → #F5E6C8` (top→bottom) | Celebration screens, warm panels |
| **Golden Glow** | `#D4A843 → #F5E6C8` (center→edge, radial) | Star burst, achievement highlights |

---

## Typography

| Style | Font | Size | Weight | Usage |
|---|---|---|---|---|
| **H1 — Hero** | Cairo Bold | 32px | 700 | Splash tagline, celebration headlines |
| **H2 — Section** | Cairo Bold | 24px | 700 | Screen titles, narrator speech |
| **H3 — Card Title** | Cairo SemiBold | 20px | 600 | Stage names, goal titles |
| **Body** | Cairo Regular | 16px | 400 | Story narration, descriptions |
| **Body Small** | Cairo Regular | 14px | 400 | Secondary info, timestamps |
| **Caption** | Cairo Medium | 12px | 500 | Labels, badges, stat counters |
| **Button** | Cairo Bold | 16px | 700 | All button text |
| **XP Counter** | Cairo Black | 28px | 900 | XP numbers, streak count, score |

> **Font Choice:** Cairo — a Google Font designed specifically for Arabic with excellent readability at all sizes and beautiful Arabic letterforms. It has proper Arabic ligatures and diacritics support.

---

## Iconography

- Style: Outlined with rounded corners, 2px stroke
- Size: 24×24 (standard), 32×32 (navigation), 48×48 (feature)
- Custom icons needed: Heart, Star (filled/empty), Flame, Lock, Shield, Scroll, Sword (decorative), Crescent, Mosque silhouette
- All icons should feel hand-drawn and warm — avoid sharp geometric styles

---

## Corner Radius

- **Small (buttons, chips):** 12px
- **Medium (cards, panels):** 16px
- **Large (modals, sheets):** 24px
- **Full (avatars, badges):** 50% circle

---

## Shadows & Elevation

- **Level 1 (cards):** `0 2px 8px rgba(26, 39, 68, 0.08)`
- **Level 2 (floating):** `0 4px 16px rgba(26, 39, 68, 0.12)`
- **Level 3 (modals):** `0 8px 32px rgba(26, 39, 68, 0.20)`
- **Glow (active items):** `0 0 20px rgba(212, 168, 67, 0.4)`

---

## Spacing System

- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64
- Screen padding: 20px horizontal
- Card padding: 16px
- Between sections: 24px

---

## Animation Principles

- **Duration:** Quick feedback = 200ms, Transitions = 300ms, Celebrations = 800–1200ms
- **Easing:** `ease-out` for entrances, `ease-in-out` for transitions, `spring` for bouncy celebrations
- **Philosophy:** Every tap should feel alive. Nothing should feel static or dead.

---

## Shared Components

### Bottom Navigation Bar (Son)

- **Background:** Deep Night Blue (`#1A2744`) with subtle top border in Desert Gold
- **Items (RTL order from right):** الرئيسية (Home) | التقدم (Progress) | الأهداف (Goals) | الجوائز (Awards) | الإعدادات (Settings)
- **Active state:** Desert Gold icon + label, subtle glow beneath
- **Inactive state:** `#8A8A8A` icon, no label
- **Animation:** Active icon scales up with a gentle bounce (1.0 → 1.15 → 1.0, 300ms spring)

### Top Status Bar (Son — Home Screen)

- **Layout (RTL):** Right side: profile avatar circle + display name | Left side: streak flame + count, heart icon + count, XP badge
- **Hearts:** Row of 5 small heart icons — filled red for remaining, outlined gray for lost
- **Streak:** 🔥 flame icon with counter, subtle pulse animation when streak is active
- **XP:** Golden shield icon with total XP number

### Primary Button

- **Default:** Desert Gold background, Deep Night Blue text, 48px height, full-width, 12px radius
- **Pressed:** Darkens 10%, scales to 0.97
- **Disabled:** 40% opacity, no interaction
- **Animation:** Gentle press-down on touch (scale 0.97, 100ms), release bounce (scale 1.0, 200ms spring)

### Secondary Button

- **Default:** Transparent background, Desert Gold border (2px), Desert Gold text
- **Pressed:** Desert Gold background at 10% opacity

### Card Component

- **Background:** Warm Sand (`#F5E6C8`)
- **Border:** None (shadow provides depth)
- **Shadow:** Level 1
- **Radius:** 16px
- **Content padding:** 16px

### Narrator Speech Bubble

- **Background:** Starlight White with a subtle golden border (1px `#D4A843`)
- **Radius:** 16px with a speech-bubble tail pointing toward the Narrator illustration
- **Text:** Cairo Bold 20px, Deep Night Blue color
- **Animation:** Text appears word-by-word with a typewriter effect (40ms per word), bubble fades in and scales from 0.9→1.0 (300ms)

### Input Field

- Height: 52px
- Background: White
- Border: 1.5px `#E0D5C5` (warm gray), radius 12px
- Focus state: Border becomes Desert Gold, subtle golden shadow
- Error state: Border becomes Error Red, error message below in 12px Error Red text
- Label: Floats above field on focus (animated, 150ms)

### Toggle Switch

- Track: 48×28px, rounded
- On: Desert Gold track, white thumb
- Off: light gray track, white thumb
- Animation: thumb slides + track color transitions (200ms)

### Setting Row

- Height: 56px
- Right (RTL): Setting icon (24px, Muted Gray) + Label (Cairo Regular 16px)
- Left (RTL): Chevron arrow or toggle switch
- Divider between rows: 1px, light gray at 30% opacity
