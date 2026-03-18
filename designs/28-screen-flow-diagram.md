# Screen Flow Diagram & Guidelines
### مخطط التنقل والإرشادات

---

## Screen Flow Diagram

```
                    ┌──────────┐
                    │  Splash  │
                    │   (01)   │
                    └────┬─────┘
                         │
              ┌──── Logged in? ────┐
              │                    │
              No                  Yes
              │                    │
    ┌─────────▼──────────┐   ┌────▼──────────┐
    │   Onboarding       │   │  Home /        │
    │  (02, 03, 04)      │   │  Journey Map   │
    │   3 swipeable      │   │    (08)        │
    └─────────┬──────────┘   └────┬───────────┘
              │                    │
    ┌─────────▼──────────┐        │
    │  Landing Screen    │        │
    │  Sign Up / Login   │        │
    │      (05)          │        │
    └────┬─────┬─────────┘        │
         │     │                  │
    ┌────▼─┐ ┌─▼────┐            │
    │SignUp│ │Login │            │
    │ (06) │ │ (07) │            │
    └──┬───┘ └──┬───┘            │
       └────┬───┘                │
            │                    │
            ▼                    │
    ┌───────────────┐            │
    │  Home /       │◄───────────┘
    │  Journey Map  │
    │     (08)      │
    └───┬───────────┘
        │
        │  SON'S LEARNING FLOW
        │  ════════════════════
        │
        ├──► Stage Detail (09)
        │         │
        │         ▼
        │    Narrator Welcome (10)
        │         │
        │         ▼
        │    Story Panel 1 (11)
        │         │
        │         ▼
        │    Inline Question 1 (12)
        │         │
        │         ▼
        │    Story Panel 2 (11)
        │         │
        │         ▼
        │    Inline Question 2 (12)
        │         │
        │         ▼
        │    Story Panel 3 (11)
        │         │
        │         ▼
        │    Final Quiz (13) — 3–5 questions
        │         │
        │         ▼
        │    Celebration / Results (14)
        │         │
        │         ├──► Next Stage → Narrator Welcome (10)
        │         ├──► Retry → Narrator Welcome (10)
        │         └──► Back to Map → Home (08)
        │
        │  SON'S TABS (Bottom Navigation)
        │  ═══════════════════════════════
        │
        ├──► Progress Screen (15)
        ├──► Goals Screen — Son View (16)
        ├──► Awards Screen (17) ──► Badges Screen (18)
        ├──► Settings — Son (20)
        │         ├──► Linked Accounts sub-screen
        │         └──► Password Change
        │
        │  TRIGGERED SCREENS
        │  ═════════════════
        │
        ├──► Daily Challenge (19) — from banner or notification
        └──► Link Request (21) — modal, from notification


    ═══════════════════════════════════════════════
    FATHER FLOW
    ═══════════════════════════════════════════════

    Splash (01) → Login/SignUp (06/07)
                         │
                         ▼
              Father Home / Sons Tab (22)
                    │         │
                    │         ├──► Son Progress Detail (23)
                    │         │         │
                    │         │         └──► Create Goal (25)
                    │         │
                    │         └──► Link Son (search modal)
                    │
                    ├──► Goals Tab (24)
                    │         │
                    │         └──► Create Goal (25)
                    │
                    └──► Settings — Father (26)
                              ├──► Linked Sons sub-screen
                              └──► Password Change
```

---

## Navigation Architecture

### Son's Navigation

**Bottom Tab Navigator (5 tabs):**
| Tab | Screen | Icon |
|-----|--------|------|
| الرئيسية | Home / Journey Map (08) | Home icon |
| التقدم | Progress Screen (15) | Chart icon |
| الأهداف | Goals — Son View (16) | Target icon |
| الجوائز | Awards Screen (17) | Trophy icon |
| الإعدادات | Settings — Son (20) | Gear icon |

**Stack navigators within tabs:**
- Home → Stage Detail → Narrator Welcome → Story Panels → Quiz → Results
- Awards → Badges Screen (pushed)
- Settings → sub-screens (pushed)

### Father's Navigation

**Bottom Tab Navigator (2 tabs):**
| Tab | Screen | Icon |
|-----|--------|------|
| أبنائي | Father Home (22) | People icon |
| الأهداف | Goals Tab (24) | Target icon |

**Stack navigators:**
- Sons Tab → Son Progress Detail → Create Goal
- Goals Tab → Create Goal
- Settings accessible via profile icon in header

### Modal Screens (overlay, not in navigation stack)
- Link Request (21) — full screen modal
- Link Son Search — bottom sheet
- Logout Confirmation — bottom sheet
- Badge Detail — centered card modal
- Discard Changes — bottom sheet

---

## Responsive Considerations

### Target Devices
| Platform | Width Range | Primary Target |
|----------|------------|---------------|
| iPhone SE | 375px | Minimum supported |
| iPhone 14/15 | 390px | Primary design target |
| iPhone 14/15 Pro Max | 430px | Maximum iOS width |
| Mid-range Android | 360–412px | Primary Android range |

### Scaling Rules
- **Design at:** 375px width (iPhone SE baseline)
- **Verify at:** 430px width (Pro Max — ensure no awkward spacing)
- **Safe areas:** Respect notch/Dynamic Island and home indicator insets
- **Text scaling:** Support Dynamic Type up to 130% — test all screens at max
- **Landscape:** Not supported in V1 — lock to portrait orientation
- **Minimum tap target:** 44×44px for all interactive elements (Apple HIG)
- **RTL mirroring:** All layouts mirror — verify chevrons, progress bars, swipe directions

### Key RTL Checks
- [ ] Progress bars fill from right to left
- [ ] Navigation back arrows point right (→)
- [ ] Swipe to advance = swipe left
- [ ] Text is right-aligned
- [ ] Number formatting is correct (Arabic-Indic numerals: ١٢٣ vs Western: 123 — decide on one)
- [ ] Icons that have directionality are mirrored (arrows, etc.)
- [ ] `start`/`end` used instead of `left`/`right` in all spacing

---

## Accessibility Notes

### Visual Accessibility
- All illustrations must have **descriptive alt text** for screen readers
- Color is **never the only indicator** — always pair with icons or text
  - Example: correct/wrong answers use green/red AND checkmark/X icon
- Contrast ratios (WCAG AA):
  - Body text on backgrounds: minimum **4.5:1**
  - Large text (≥18px bold or ≥24px): minimum **3:1**
  - Interactive elements: minimum **3:1** against adjacent colors

### Motion Accessibility
- All animations must respect **"Reduce Motion"** system setting
- When Reduce Motion is on:
  - Replace animations with simple fades (200ms)
  - Disable parallax effects
  - Stop looping ambient animations (particles, fire)
  - Keep only essential state-change transitions
- Confetti, star bursts, and celebration animations → simple opacity fade

### Interactive Accessibility
- Interactive elements must have **visible focus states** (for external keyboard/switch control)
- Touch targets: minimum 44×44px
- Buttons must have accessible labels if icon-only

---

## Designer Deliverables Checklist

### Design System
- [ ] Complete Figma design system file:
  - [ ] Color tokens with semantic names
  - [ ] Typography styles (all 8 levels)
  - [ ] Icon library (all ~30 icons)
  - [ ] Spacing tokens
  - [ ] Shadow/elevation tokens
  - [ ] Corner radius tokens

### Components
- [ ] All shared components with states:
  - [ ] Primary Button (default, pressed, disabled, loading)
  - [ ] Secondary Button (default, pressed, disabled)
  - [ ] Input Field (default, focused, error, disabled, with label float)
  - [ ] Toggle Switch (on, off, disabled)
  - [ ] Setting Row (with chevron, with toggle, with value)
  - [ ] Card Component (default)
  - [ ] Narrator Speech Bubble (with typewriter spec)
  - [ ] Bottom Navigation Bar (Son: 5 tabs, Father: 2 tabs, all states)
  - [ ] Top Status Bar (with all stat variants)
  - [ ] Stage Node (completed, current, locked)
  - [ ] Goal Card (active, completed, expired)
  - [ ] Badge Cell (earned, locked, in-progress)

### Screens
- [ ] All 26 screens designed at **375px** width (iPhone SE baseline)
- [ ] Responsive variants at **430px** width (iPhone Pro Max)
- [ ] All screen states: default, loading, empty, error
- [ ] Keyboard-visible states for form screens

### Illustrations & Assets
- [ ] Narrator character: 4 emotional states + waving + mini-avatar
- [ ] 10 stage node thematic illustrations (120×120px)
- [ ] 10 stage detail illustrations (full-width, 180px tall)
- [ ] ~30 story panel illustrations (full-width, 45% screen)
- [ ] 3 onboarding illustrations
- [ ] 3 empty state illustrations
- [ ] Journey map full landscape (scrollable, with parallax layers)
- [ ] 10 badge icons (earned + locked versions)

### Animations
- [ ] Lottie animation storyboards/specs for all 24 animations
- [ ] Timing sheets for complex sequences (Celebration screen)
- [ ] Reduce Motion fallback specs

### Prototype
- [ ] Interactive Figma prototype covering:
  - [ ] Complete stage flow (Map → Detail → Welcome → Story → Quiz → Results)
  - [ ] Quiz answering (correct + wrong feedback)
  - [ ] Celebration sequence
  - [ ] Daily Challenge flow
  - [ ] Father: view progress → create goal

### Verification
- [ ] RTL layout verification on all screens
- [ ] Contrast ratio check on all text/bg combinations
- [ ] Touch target size audit (≥44px)
- [ ] Dynamic Type test at 130% scaling
