# سيرة النبي ﷺ — Screen Design Specification

### For UI/UX Designer — V1

---

## Global Design System

### Brand Identity

- **App Name:** سيرة النبي ﷺ
- **Tagline:** تعلّم السيرة وأنت تلعب
- **Personality:** Warm, magical, inviting — like a grandfather telling stories by firelight
- **Direction:** Full RTL (Right-to-Left) — all layouts, navigation, and gestures mirror for Arabic

### Color Palette

| Token               | Hex       | Usage                                          |
| ------------------- | --------- | ---------------------------------------------- |
| **Desert Gold**     | `#D4A843` | Primary accent, stars, XP highlights, buttons  |
| **Deep Night Blue** | `#1A2744` | Primary backgrounds, headers, navigation       |
| **Warm Sand**       | `#F5E6C8` | Card backgrounds, light surfaces               |
| **Sunset Orange**   | `#E8734A` | Hearts, streak flame, urgent CTAs              |
| **Royal Purple**    | `#4A2D6B` | Badge glow, special celebrations, premium feel |
| **Starlight White** | `#FFF8F0` | Text on dark backgrounds, clean surfaces       |
| **Soft Cream**      | `#FAF3E8` | Page backgrounds, neutral surfaces             |
| **Success Green**   | `#4CAF6E` | Correct answers, completion states             |
| **Error Red**       | `#E05555` | Wrong answers, heart loss                      |
| **Muted Gray**      | `#8A8A8A` | Disabled states, locked content                |

### Gradient Presets

| Name               | Definition                                 | Usage                              |
| ------------------ | ------------------------------------------ | ---------------------------------- |
| **Night Sky**      | `#1A2744 → #4A2D6B` (top→bottom)           | Main backgrounds, journey map sky  |
| **Desert Horizon** | `#E8734A → #D4A843 → #F5E6C8` (top→bottom) | Celebration screens, warm panels   |
| **Golden Glow**    | `#D4A843 → #F5E6C8` (center→edge, radial)  | Star burst, achievement highlights |

### Typography

| Style               | Font           | Size | Weight | Usage                                 |
| ------------------- | -------------- | ---- | ------ | ------------------------------------- |
| **H1 — Hero**       | Cairo Bold     | 32px | 700    | Splash tagline, celebration headlines |
| **H2 — Section**    | Cairo Bold     | 24px | 700    | Screen titles, narrator speech        |
| **H3 — Card Title** | Cairo SemiBold | 20px | 600    | Stage names, goal titles              |
| **Body**            | Cairo Regular  | 16px | 400    | Story narration, descriptions         |
| **Body Small**      | Cairo Regular  | 14px | 400    | Secondary info, timestamps            |
| **Caption**         | Cairo Medium   | 12px | 500    | Labels, badges, stat counters         |
| **Button**          | Cairo Bold     | 16px | 700    | All button text                       |
| **XP Counter**      | Cairo Black    | 28px | 900    | XP numbers, streak count, score       |

> **Font Choice:** Cairo — a Google Font designed specifically for Arabic with excellent readability at all sizes and beautiful Arabic letterforms. It has proper Arabic ligatures and diacritics support.

### Iconography

- Style: Outlined with rounded corners, 2px stroke
- Size: 24×24 (standard), 32×32 (navigation), 48×48 (feature)
- Custom icons needed: Heart, Star (filled/empty), Flame, Lock, Shield, Scroll, Sword (decorative), Crescent, Mosque silhouette
- All icons should feel hand-drawn and warm — avoid sharp geometric styles

### Corner Radius

- **Small (buttons, chips):** 12px
- **Medium (cards, panels):** 16px
- **Large (modals, sheets):** 24px
- **Full (avatars, badges):** 50% circle

### Shadows & Elevation

- **Level 1 (cards):** `0 2px 8px rgba(26, 39, 68, 0.08)`
- **Level 2 (floating):** `0 4px 16px rgba(26, 39, 68, 0.12)`
- **Level 3 (modals):** `0 8px 32px rgba(26, 39, 68, 0.20)`
- **Glow (active items):** `0 0 20px rgba(212, 168, 67, 0.4)`

### Spacing System

- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64
- Screen padding: 20px horizontal
- Card padding: 16px
- Between sections: 24px

### Animation Principles

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

---

## Screen-by-Screen Specification

---

### Screen 1: Splash Screen

**Purpose:** First impression — set the tone, build anticipation.

**Layout:**

- Full-screen illustration: a **starry desert night sky** as the background — gradient from Deep Night Blue at top to Royal Purple at horizon
- Desert dunes silhouette along the bottom 20% of the screen in sandy golden tones
- A single **campfire** in the center-bottom, glowing with warm orange light
- The **Narrator silhouette** (from behind) sits beside the fire, looking up at the stars
- **App logo/name** centered in the upper third: "سيرة النبي ﷺ" in Cairo Black, Starlight White, with a subtle golden text shadow
- **Tagline** below the logo: "تعلّم السيرة وأنت تلعب" in Cairo Regular, Starlight White at 80% opacity

**Animations:**

1. Screen fades in from black (600ms)
2. Stars begin to twinkle — random stars pulse in brightness (infinite loop, staggered delays)
3. Campfire flickers with a warm glow — animated Lottie fire with light casting on the sand
4. Narrator silhouette fades in gently (400ms, delayed 300ms)
5. Logo scales in from 0.8→1.0 with a soft bounce (500ms, delayed 600ms)
6. Tagline fades in (300ms, delayed 900ms)
7. After 2.5 seconds total, auto-transitions to Onboarding or Home (if logged in) with a fade-through

**Mood:** Magical, serene, like the opening scene of a storybook.

---

### Screen 2–4: Onboarding (3 Screens)

**Purpose:** Explain the app's value in 3 swipeable panels. First-time users only.

**Shared Layout:**

- Full-screen with Night Sky gradient background
- Central **illustration area** (60% of screen height) — large, detailed, atmospheric
- **Title** below illustration: Cairo Bold 24px, Starlight White
- **Description** below title: Cairo Regular 16px, Starlight White at 80% opacity, max 2 lines
- **Page indicator dots** at bottom-center: 3 dots, active = Desert Gold (8px), inactive = white at 30% (6px)
- **Skip button** top-left (RTL: top-right): "تخطي" in Cairo Medium 14px, white at 60%
- **Next button** bottom-center: Primary button style, "التالي" (screens 1–2), "ابدأ الآن" (screen 3)

**Screen 2 — Onboarding 1: "رحلة عبر الزمن"**

- **Illustration:** A winding golden path stretching across a desert landscape under a starlit sky, with small glowing stage markers along the path. At the end of the path, a distant glowing city (Mecca) silhouette.
- **Title:** رحلة عبر الزمن
- **Description:** انطلق في رحلة مشوقة عبر سيرة النبي ﷺ مرحلة بمرحلة
- **Animation:** Path draws itself from bottom-right to top-left (1200ms, ease-out), stage markers pop in sequentially along the path (100ms delay each)

**Screen 3 — Onboarding 2: "تعلّم وأنت تلعب"**

- **Illustration:** A child silhouette sitting cross-legged, with floating quiz cards around them — MCQ options, stars, hearts, and XP badges orbit gently around the child. The Narrator silhouette stands behind them, hand extended as if teaching.
- **Title:** تعلّم وأنت تلعب
- **Description:** أسئلة ممتعة ونجوم ومكافآت في كل مرحلة
- **Animation:** Quiz cards float in from edges (staggered, 600ms each), orbit slowly around the child in a gentle circular motion (infinite, 8s per rotation). Stars occasionally sparkle.

**Screen 4 — Onboarding 3: "أبوك يتابع تقدمك"**

- **Illustration:** Split scene — on the right, the child silhouette playing on a device with stars floating up; on the left, a father silhouette looking at a glowing screen showing progress bars and stars. A golden line connects them.
- **Title:** أبوك يتابع تقدمك
- **Description:** والدك يشاهد إنجازاتك ويضع لك أهدافاً ومكافآت
- **Animation:** Golden connection line draws between father and son (800ms), then pulses gently. Progress elements on the father's screen animate in (bars fill, stars appear).

**Swipe Transition:** Horizontal swipe (RTL: swipe left to advance). Illustrations cross-fade while sliding, 300ms.

---

### Screen 5: Landing Screen (Sign Up / Login)

**Purpose:** Entry point — choose to sign up or log in.

**Layout:**

- **Background:** Night Sky gradient
- **Top 40%:** The Narrator silhouette sitting by a campfire (same as splash but smaller), with the app logo above: "سيرة النبي ﷺ"
- **Bottom 60%:** A rounded white/cream card sliding up from the bottom (radius 24px top corners only), containing:
  - **Welcome text:** "أهلاً بك يا بطلي" in Cairo Bold 24px, Deep Night Blue — centered
  - **Subtitle:** "سجّل حسابك وابدأ الرحلة" in Cairo Regular 16px, Muted Gray
  - **32px spacing**
  - **"إنشاء حساب جديد" button:** Primary button (Desert Gold, full-width)
  - **16px spacing**
  - **"تسجيل الدخول" button:** Secondary button (outlined Desert Gold, full-width)
  - **24px spacing**
  - **Terms text:** "بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية" in Caption style, Muted Gray, with underlined links

**Animations:**

1. Background and Narrator are already visible (coming from splash)
2. Bottom card slides up from below the screen (400ms, ease-out)
3. Welcome text fades in (200ms, delayed 200ms)
4. Buttons fade in sequentially (200ms each, 100ms stagger)
5. Campfire continues flickering (Lottie, looping)

---

### Screen 6: Sign Up Screen

**Purpose:** Account creation with role selection.

**Layout:**

- **Background:** Soft Cream full screen
- **Header:** Back arrow (RTL: right side), screen title "إنشاء حساب" centered
- **Role Selection (top section):**
  - Two large selectable cards side by side:
    - **"ابن" (Son):** Icon — child silhouette with a star above. Card shows a small journey path illustration.
    - **"أب" (Father):** Icon — adult silhouette with a shield. Card shows a small dashboard illustration.
  - **Selected state:** Desert Gold border (3px), subtle golden glow, checkmark in corner
  - **Unselected state:** Light gray border (1px), no glow
  - **Animation on select:** Card scales to 1.03 and back (200ms spring), border color transitions (150ms), checkmark pops in with bounce

- **Form Fields (below role cards):**
  - **Display Name:** Text input with label "الاسم" — right-aligned, Cairo Regular
  - **Age:** Number input with label "العمر" (Son only — hidden for Father)
  - **Username:** Text input with label "اسم المستخدم" — with availability check icon (green checkmark / red X) appearing after 500ms debounce
  - **Password:** Password input with label "كلمة المرور" — with show/hide toggle eye icon
  - **Confirm Password:** Password input with label "تأكيد كلمة المرور"

- **Input Field Style:**
  - Height: 52px
  - Background: White
  - Border: 1.5px `#E0D5C5` (warm gray), radius 12px
  - Focus state: Border becomes Desert Gold, subtle golden shadow
  - Error state: Border becomes Error Red, error message below in 12px Error Red text
  - Label: Floats above field on focus (animated, 150ms)

- **Submit Button:** "إنشاء الحساب" — Primary button, full-width, at bottom with 24px padding from last field
- **Footer link:** "لديك حساب بالفعل؟ سجّل دخولك" — tappable, Desert Gold text

**Animations:**

- Role cards slide in from sides (300ms, staggered 100ms)
- Form fields fade in sequentially (150ms each, 50ms stagger)
- On submit: button shows a loading spinner (Lottie), then transitions to Home on success
- On error: affected fields shake horizontally (3 shakes, 300ms total)

---

### Screen 7: Login Screen

**Purpose:** Returning user authentication.

**Layout:**

- **Background:** Soft Cream
- **Header:** Back arrow, "تسجيل الدخول" centered
- **Top illustration:** Small Narrator silhouette waving, with speech bubble: "أهلاً بعودتك!" — scaled smaller than landing page
- **Form Fields:**
  - **Username:** Same input style as Sign Up
  - **Password:** Same input style with show/hide toggle
- **"تسجيل الدخول" button:** Primary button, full-width
- **"نسيت كلمة المرور؟"** link below button, centered, Muted Gray
- **Footer:** "ليس لديك حساب؟ أنشئ حساباً جديداً" — tappable link

**Animations:**

- Narrator waves (Lottie, subtle arm movement loop)
- Speech bubble typewriter effect on the text
- Same field focus/error animations as Sign Up
- On success: Narrator gets excited (Lottie transition to celebrating state), then screen transitions to Home

---

### Screen 8: Home / Journey Map (Son)

**Purpose:** The heart of the app — the desert path showing all stages.

**Layout:**

- **Background:** A vertically scrollable desert landscape illustration
  - **Sky:** Night Sky gradient at the top, transitioning to a warm sunset horizon
  - **Terrain:** Sandy dunes, scattered desert plants, rock formations, distant mountain silhouettes
  - **Atmosphere:** Tiny floating particles (dust/sand) drifting slowly, stars twinkling in the sky portion

- **Top Status Bar (fixed, floating):**
  - Semi-transparent Deep Night Blue bar with blur effect (glassmorphism)
  - **RTL Layout:** Right: circular avatar frame (gold border) + display name | Left: ❤️ ×5 | 🔥 ×7 | ⭐ 340 XP
  - Height: 64px + safe area inset

- **The Path:**
  - A **winding golden-sand road** that snakes vertically through the landscape
  - The path has subtle texture (sand/gravel pattern)
  - Path curves left and right alternately, creating an S-shape progression
  - Small decorative elements along the path: palm trees, rocks, desert flowers, small tents

- **Stage Nodes (along the path):**
  - Each stage is a **circular node** (64px diameter) sitting on the path
  - **Completed stage:** Golden circle with earned stars displayed below (1–3 small star icons). Stage number inside. Subtle golden glow.
  - **Current stage (unlocked, not completed):** Larger (72px), animated pulsing glow (Desert Gold, 2s loop), bouncing slightly up and down (4px, 3s loop). A small Narrator silhouette stands next to it, waving.
  - **Locked stage:** Dark gray circle with a lock icon inside. Dimmed, desaturated. No glow.
  - Each node has a **small label** below: the stage's Arabic title in Cairo Medium 12px

- **Stage Node Illustrations:**
  - Each node has a unique **small thematic illustration** behind or around it:
    - Stage 1 (Before the Birth): Crescent moon and stars cluster
    - Stage 2 (Year of the Elephant): Small elephant silhouette
    - Stage 3 (The Birth): Glowing light rays
    - Stage 4 (Childhood): Small desert tent
    - Stage 5 (Youth): Mountain silhouette
    - _(and so on for remaining stages)_

- **Bottom Navigation Bar:** Fixed at bottom, as described in Shared Components

- **Daily Challenge Banner (floating):**
  - If available, a floating card appears near the top of the scroll area (below status bar)
  - Warm Sand background with golden border, rounded 16px
  - "⚡ تحدي اليوم جاهز!" with a "ابدأ" button
  - Dismissible with swipe or X button
  - Gentle side-to-side wobble animation to attract attention (subtle, 4s loop)

**Animations:**

1. On first load: camera (scroll position) starts at the bottom and smoothly scrolls up to the current stage (800ms, ease-out)
2. Path "draws" itself as the user scrolls down to previously completed sections (parallax trail effect)
3. Completed stage nodes have a subtle shimmer that passes over them occasionally
4. Tapping a stage node: node scales up (1.0→1.2, 200ms spring), then opens Stage Detail
5. Background elements have subtle parallax — stars move slower than terrain when scrolling
6. Floating sand particles drift continuously (Lottie overlay, very subtle)
7. Narrator next to current stage has an idle animation (slight sway, occasional wave)

**Interaction:**

- Tap completed stage → opens Stage Detail (replay option)
- Tap current stage → opens Stage Detail (play option)
- Tap locked stage → brief shake animation + lock icon bounces, tooltip: "أكمل المراحل السابقة أولاً"
- Pull-to-refresh at top → refreshes progress data with a sand-swirl animation

---

### Screen 9: Stage Detail Screen

**Purpose:** Preview a stage before starting — shows info and score history.

**Layout:**

- **Presentation:** Bottom sheet that slides up over the Journey Map (covers 70% of screen)
- **Background:** Warm Sand with rounded top corners (24px)
- **Handle bar:** Small gray pill at top center (36×4px)
- **Stage illustration:** Hero area at the top — the thematic illustration for this stage, wider and more detailed than the node version. Full width, 180px height, with rounded top matching the sheet.
- **Stage title:** Arabic title in Cairo Bold 24px, centered below illustration
- **Stage subtitle:** Brief one-line teaser in Cairo Regular 14px, Muted Gray
- **Divider:** Thin golden line (1px, 60% width, centered)

- **Stats Row (if previously completed):**
  - Three items in a horizontal row, evenly spaced:
    - ⭐ Stars: "2/3" with star icons
    - 🏆 Best Score: "78/100"
    - 🔄 Attempts: "2"
  - Each stat in a small rounded pill (Starlight White bg, golden border)

- **Action Button:**
  - Never played: "ابدأ المرحلة" — Primary button, full-width
  - Previously played: "أعد المحاولة" — Primary button + secondary text below: "أفضل نتيجتك: 78/100"

- **Hearts Indicator:** Below button: "❤️ ×5 جاهز" if full, or "❤️ ×3 متبقي" with a countdown timer if refilling

**Animations:**

- Sheet slides up with spring physics (400ms)
- Illustration has subtle parallax as sheet is dragged
- Stats pills pop in sequentially (100ms stagger, scale from 0.8→1.0)
- Action button pulses once gently after everything loads (attract attention)
- Dragging the sheet down dismisses it with velocity-based physics

---

### Screen 10: Narrator Welcome Screen

**Purpose:** The Narrator introduces the stage — sets emotional context.

**Layout:**

- **Background:** Night Sky gradient with a campfire glow at the bottom center
- **Narrator Illustration (center-bottom):** Large Narrator silhouette (from behind, seated by fire), taking up the bottom 40% of the screen. Campfire in front of him, warm light casting on desert sand.
- **Speech Bubble (center-top):** Large Narrator Speech Bubble containing the welcome text
  - Example: "أهلاً يا بطلي! اليوم سنسافر معاً إلى زمنٍ بعيد... قبل أن يولد النبي ﷺ"
  - Text: Cairo Bold 20px, centered
  - Bubble max-width: 85% of screen width
- **Stage Title:** Below the speech bubble in Cairo Medium 14px, Desert Gold: "المرحلة ١: ما قبل الميلاد"
- **Continue Button:** Bottom of screen, "هيا بنا" Primary button with a forward arrow icon

**Animations:**

1. Screen fades in from the previous screen (300ms)
2. Campfire is a looping Lottie animation — warm, flickering, casting moving light
3. Narrator fades in and shifts up slightly (300ms, delayed 200ms)
4. Speech bubble scales in from 0.8→1.0 (300ms spring, delayed 400ms)
5. Text appears with typewriter effect — word by word (40ms per word)
6. When all text is revealed, the Continue button fades in from below (200ms)
7. Campfire sparks occasionally drift upward (small orange particles, random intervals)
8. Stars twinkle in the sky background (random, infinite)

**Mood:** Intimate, warm, like sitting with a wise grandfather who is about to tell you a secret.

---

### Screen 11: Story Panel Screen

**Purpose:** Display the story content — the core educational experience.

**Layout:**

- **Background:** Soft Cream
- **Top Bar (fixed):**
  - Progress bar spanning full width — fills from right to left (RTL) as the child advances through panels
  - Color: Desert Gold fill on light gray track, 4px height, rounded
  - Below progress bar: Hearts display (5 hearts, small, right-aligned) + Stage title (left-aligned)

- **Story Illustration (top half):**
  - Large atmospheric illustration covering the top 45% of the screen
  - Full-bleed (edge to edge), with a soft gradient fade at the bottom blending into the cream background
  - **Illustration style:** Painterly, atmospheric, warm tones. Faceless silhouettes for all human figures. Rich desert environments.
  - Examples:
    - "The Elephant Army" scene: Elephant silhouettes marching toward a distant Kaaba silhouette under dramatic clouds
    - "The Birth" scene: A glowing light emanating from a small house under a star-filled sky
    - "Childhood in the Desert" scene: A small child silhouette running among sand dunes with a desert sunset

- **Narration Text (bottom half):**
  - Container with 20px horizontal padding
  - Text: Cairo Regular 18px, Deep Night Blue, right-aligned (RTL)
  - Maximum 3 sentences
  - Line height: 1.7 (generous for readability)
  - The Narrator's name tag appears before the text: small pill with "الراوي:" in Cairo Medium 12px, Desert Gold background

- **Navigation:**
  - "التالي" button at bottom — Primary button, full-width
  - Subtle swipe-left (RTL) gesture also advances

**Animations:**

1. Panel transitions: current illustration slides out to the left while new one slides in from the right (RTL-aware), 400ms ease-in-out
2. Narration text fades in with a slight upward motion (200ms, delayed 200ms after illustration settles)
3. Progress bar fills smoothly to the next increment (300ms, ease-out)
4. On each new panel, a subtle page-turn sound effect cue (visual: tiny paper particle effect at the edge)
5. Illustration has subtle internal animation where possible — clouds drifting, fire flickering, light pulsing (Lottie overlays on static illustrations)

---

### Screen 12: Inline Question Screen

**Purpose:** Mid-story engagement check — keeps the child actively thinking.

**Layout:**

- **Background:** Soft Cream (matching story panel for continuity)
- **Top Bar:** Same progress bar + hearts as Story Panel
- **Question Area:**
  - A card (Warm Sand background, 16px radius, Level 2 shadow) centered on screen
  - **Narrator mini-avatar** at the top of the card: small circular Narrator silhouette (40px) with a speech tail
  - **Question text:** Cairo Bold 18px, Deep Night Blue, centered inside card
  - Example: "ماذا كان اسم جد النبي ﷺ؟"

- **Answer Options (below card):**
  - Layout depends on question type (see below)
  - **MCQ / Fill in the Blank:** 4 option buttons stacked vertically
    - Each option: full-width, 52px height, Starlight White bg, 12px radius, 1.5px warm gray border
    - Text: Cairo Regular 16px, right-aligned with option letter (أ، ب، ج، د)
  - **True/False:** 2 large buttons side by side
    - "صحيح ✓" (green-tinted) and "خطأ ✗" (red-tinted), both 50% width
  - **Arrange in Order:** Draggable cards that can be reordered vertically
    - Each card has a grip handle icon on the right (RTL)
    - Drop zones highlighted with dashed golden borders
  - **Who Said It?:** Character name buttons with small silhouette icons

- **Feedback Overlay (after answering):**
  - **Correct:**
    - Selected option turns Success Green with white checkmark
    - Green flash overlay on entire screen (200ms, 20% opacity)
    - "+10 XP" floats up from the button and fades out (600ms)
    - Narrator speech: "ممتاز!" or "أحسنت!" appears briefly at top
    - Confetti burst (small, brief — Lottie, 800ms)
  - **Wrong:**
    - Selected option turns Error Red with X mark
    - Correct option highlights in Success Green with a gentle pulse
    - Red flash overlay (200ms, 15% opacity)
    - Heart breaks: one heart in the top bar cracks and fades (Lottie, 500ms)
    - Narrator speech: "الجواب الصحيح هو..." with the correct answer shown
    - Brief explanation text (1 sentence) appears below in Cairo Regular 14px

- **Continue Button:** Appears after feedback, "التالي" — delayed 1.5s to let the child absorb the feedback

**Animations:**

- Question card slides up from below (300ms spring)
- Options fade in with stagger (100ms each)
- Selecting an option: option scales down (0.97) then back, brief highlight
- Correct/Wrong feedback animations as described above
- Drag-and-drop (Arrange): smooth reorder with cards sliding into new positions (200ms spring)

---

### Screen 13: Final Quiz Screen

**Purpose:** End-of-stage assessment — 3–5 questions covering all the stage content.

**Layout:**

- **Background:** Deep Night Blue gradient (more serious/focused feel than inline questions)
- **Top Bar:**
  - Question counter: "السؤال ٣ من ٥" in Cairo Medium 14px, Starlight White
  - Progress dots: 5 small circles — completed (gold filled), current (gold outlined, pulsing), upcoming (white outlined)
  - Hearts: same display, but more prominent here (slightly larger)

- **Question Card:**
  - Centered card with Royal Purple to Deep Night Blue gradient border (2px)
  - Interior: Starlight White background, 20px padding
  - Narrator mini-avatar at top
  - Question text: Cairo Bold 18px, centered
  - Question type icon in the corner (small, muted): indicates MCQ, True/False, etc.

- **Answer Options:**
  - Same styles as Inline Questions but adapted for dark background
  - Option buttons: Deep Night Blue bg with Starlight White text and golden border
  - Selected state: Desert Gold bg with Deep Night Blue text

- **Timer (optional, for speed bonus):**
  - Circular timer ring around the question number — starts full (Desert Gold), depletes clockwise
  - When timer is running low (<3s): ring turns Sunset Orange and pulses
  - Speed bonus indicator: "⚡ مكافأة السرعة" appears if answered quickly

- **Feedback:** Same correct/wrong patterns as inline but with enhanced animations:
  - Correct: stars burst out from behind the card
  - Wrong: screen subtly shakes (2 shakes, 200ms)

**Transitions between questions:**

- Current question card slides out left (RTL: right), next slides in from right (RTL: left)
- 500ms pause between questions for the child to breathe
- Progress dots update with a satisfying pop animation

---

### Screen 14: Celebration / Results Screen

**Purpose:** Reward the child — the climax of each stage.

**Layout:**

- **Background:** Desert Horizon gradient (warm, celebratory)
- **Central Content (vertically centered, stacked):**
  1. **Stars Display (hero element):**
     - Three large stars (80px each) in a horizontal row
     - Earned stars: Golden, filled, glowing, with sparkle particles
     - Unearned stars: Gray outlines
     - If 3 stars: "بدون أخطاء!" golden banner with ornate borders appears above

  2. **Score:**
     - Large number: "87/100" in Cairo Black 48px, Deep Night Blue
     - Below: "نتيجتك" in Cairo Regular 14px, Muted Gray

  3. **XP Earned:**
     - Golden pill: "+45 XP" in Cairo Bold 20px
     - Breakdown below in smaller text: "+10 أسئلة | +20 بلا أخطاء | +15 مكافأة السرعة"

  4. **Streak Update:**
     - If streak continues: "🔥 سلسلتك: ٨ أيام!" with flame animation growing
     - If new milestone: extra celebration with milestone badge

- **Narrator Reaction (bottom):**
  - Narrator in **Celebrating state** (standing, arms open)
  - Speech bubble: contextual praise
    - 3 stars: "ما شاء الله! أداء مذهل يا بطلي!"
    - 2 stars: "أحسنت! لقد تعلّمت الكثير اليوم"
    - 1 star: "لا بأس! المهم أنك تعلّمت شيئاً جديداً"

- **Action Buttons (bottom):**
  - "المرحلة التالية" — Primary button (if earned enough stars)
  - "أعد المحاولة" — Secondary button (always available)
  - "العودة للخريطة" — Text link below buttons

**Animations (this is the BIG celebration moment):**

1. Screen transitions in with a golden flash (200ms)
2. Stars fly in from above one by one (300ms each, 200ms stagger)
   - Each earned star: arrives gray, then fills with gold in a burst of sparkles
   - Unearned stars: arrive and stay gray with a subtle bounce
3. Score counter ticks up rapidly from 0 to final number (800ms, ease-out)
4. XP pill slides up and bounces (200ms spring)
5. If 3 stars: confetti explosion (Lottie, 2s, full-screen, multiple colors — gold, white, blue)
6. If 3 stars: "بدون أخطاء!" banner unfurls from center (400ms)
7. Narrator slides in from bottom with celebrating animation
8. Streak flame grows with each day count (if milestone: extra fire burst)
9. Background has slow-moving golden light particles floating upward
10. Subtle haptic feedback on star reveals (if device supports)

**Sound cues (visual representation for designer):**

- Star reveal: bright chime
- Score tick-up: rapid ticking
- Confetti: celebratory fanfare
- Narrator appear: warm whoosh

---

### Screen 15: Progress Screen (Son)

**Purpose:** Overview of all learning progress — stages, XP, streak history.

**Layout:**

- **Background:** Soft Cream
- **Header:** "تقدمي" in Cairo Bold 24px, centered

- **Summary Cards Row (horizontal scroll):**
  Three cards in a horizontally scrollable row:
  1. **Total XP Card:**
     - Desert Gold gradient background
     - Large XP number in Cairo Black 32px, white
     - "نقاط الخبرة" label below
     - Golden shield icon
  2. **Streak Card:**
     - Sunset Orange gradient background
     - Flame icon + streak number in Cairo Black 32px, white
     - "أيام متواصلة" label below
     - Small calendar dots showing last 7 days (filled = active, empty = missed)
  3. **Stars Card:**
     - Royal Purple gradient background
     - Total stars earned / total possible in Cairo Black 32px, white
     - "النجوم" label below
     - Small star cluster icon

- **Stage Progress List:**
  - Section header: "المراحل" in Cairo Bold 20px
  - List of all stages (vertical, scrollable):
    - Each row: Stage number circle (left/RTL:right) → Stage Arabic title → Stars display (3 stars, filled/empty) → Best score
    - Completed: Full opacity, golden stage number circle
    - Current: Highlighted row with subtle golden background glow
    - Locked: Grayed out, lock icon instead of stars
  - Each row height: 64px, with subtle dividers

- **Weekly Activity Chart:**
  - Section header: "نشاطك هذا الأسبوع"
  - Simple bar chart showing XP earned per day (last 7 days)
  - Bars: Desert Gold, rounded top
  - Day labels: Arabic day abbreviations (سبت، أحد، اثنين...)
  - Today's bar: highlighted with glow

**Animations:**

- Summary cards slide in from right (RTL) with stagger (200ms each)
- Numbers in summary cards count up from 0 (600ms)
- Stage list items fade in with stagger (50ms each)
- Bar chart bars grow from bottom to full height (staggered, 100ms each, 400ms total)

---

### Screen 16: Goals Screen (Son View)

**Purpose:** See goals set by father — provides motivation and targets.

**Layout:**

- **Background:** Soft Cream
- **Header:** "أهدافي" in Cairo Bold 24px

- **Active Goals Section:**
  - Section label: "أهداف نشطة" with a 🎯 icon
  - Goal cards (vertical stack):
    - **Card layout:**
      - Top: Goal description in Cairo Bold 16px
      - Middle: Progress bar — golden fill showing stages completed out of required
        - Label: "٤ من ٦ مراحل" in Cairo Regular 12px
      - Bottom row:
        - Deadline: "⏰ باقي ٣ أيام" in Cairo Regular 14px, Sunset Orange if <3 days
        - Reward: "🏆 [reward description]" in Cairo Regular 14px, Desert Gold
      - From: "من: أبي" in Cairo Regular 12px, Muted Gray
    - Card style: Warm Sand bg, golden left border (RTL: right border) 3px, 16px radius

- **Completed Goals Section:**
  - Section label: "أهداف مكتملة ✓" with green checkmark
  - Same card style but with Success Green border and "مكتمل" badge in top-right corner
  - Slightly reduced opacity (90%)

- **Empty State (no goals):**
  - Centered illustration: Narrator in neutral state with an empty scroll
  - Text: "لا توجد أهداف حالياً" in Cairo Regular 16px, Muted Gray
  - Subtitle: "عندما يضع والدك هدفاً ستراه هنا"

**Animations:**

- Cards slide in from bottom with stagger (150ms each)
- Progress bars fill from 0 to current value (500ms, ease-out) on appear
- Deadline text pulses subtly if <3 days remaining (2s loop, opacity 0.7→1.0)
- Completed cards have a brief sparkle effect when first scrolled into view

---

### Screen 17: Awards Screen

**Purpose:** Showcase all earned rewards — XP milestones, achievements.

**Layout:**

- **Background:** Night Sky gradient (gives awards a premium, museum-like feel)
- **Header:** "إنجازاتي" in Cairo Bold 24px, Starlight White

- **XP Level Display (hero section):**
  - Large circular progress ring (120px diameter)
  - Current level number in center: Cairo Black 40px, Desert Gold
  - Ring fill: Desert Gold, showing progress to next level
  - "المستوى ٥" label below ring
  - XP to next level: "١٢٠ نقطة للمستوى التالي" in Cairo Regular 14px, Starlight White at 70%

- **Stats Grid:**
  - 2×2 grid of stat cards:
    - Total Stars earned | Total Stages completed | Longest Streak | Perfect Runs
  - Each card: small icon + number + label
  - Deep Night Blue cards with golden icon accents

- **Badges Section:**
  - Section header: "الشارات" in Cairo Bold 20px, Starlight White
  - Grid layout: 3 columns of badge circles
  - **Earned badge:** Full color, golden border, subtle shimmer
  - **Locked badge:** Silhouette/outline only, "?" in center, muted
  - **Badge format:** Circle (72px), icon inside, name below in Cairo Medium 11px
  - V1 prototype badges: "Badge 1", "Badge 2", etc. with placeholder icons

**Animations:**

- XP ring draws itself on screen load (800ms, ease-out)
- Level number counts up from 0 (400ms)
- Stat cards flip in (3D card flip, staggered 150ms)
- Badge grid: earned badges pop in with sparkle, locked badges fade in at low opacity
- Tapping an earned badge: badge scales up to center of screen with a golden glow backdrop, showing badge name + how it was earned + date
- Background has very slow-moving stars (parallax with scroll)

---

### Screen 18: Badges Screen (Prototype)

**Purpose:** Dedicated view for all badges — expanded from Awards Screen.

**Layout:**

- **Background:** Night Sky gradient
- **Header:** "الشارات" with back arrow

- **Category Tabs (horizontal scroll):**
  - Pill-shaped tabs: "الكل" | "السلسلة" | "الإتقان" | "السرعة" | "المراحل" | "الأهداف"
  - Active tab: Desert Gold bg, Deep Night Blue text
  - Inactive tab: transparent bg, Starlight White text at 60%

- **Badge Grid:**
  - 3-column grid with 16px gap
  - Each badge: large circle (88px), icon, name below, description below name
  - Earned: full color with "تم ✓" small green badge overlay
  - Locked: grayed, with unlock requirement text: "أكمل سلسلة ٧ أيام"
  - Progress badges (partially complete): show a mini progress ring around the circle

- **Badge Detail Modal (on tap):**
  - Center of screen, card modal (Level 3 shadow)
  - Large badge icon (120px)
  - Badge name: Cairo Bold 20px
  - Description: Cairo Regular 14px
  - How earned / how to unlock
  - Date earned (if earned)
  - "إغلاق" button

**Animations:**

- Tabs scroll with momentum, active tab indicator slides smoothly
- Grid items stagger in (50ms each)
- Locked badges have a subtle "locked" shake when tapped
- Badge Detail modal scales in from the tapped badge's position (origin-aware, 300ms spring)

---

### Screen 19: Daily Challenge Screen

**Purpose:** Quick 30-second engagement — maintain streak on busy days.

**Layout:**

- **Background:** Dramatic — Royal Purple to Deep Night Blue gradient with scattered stars
- **Header:** "⚡ تحدي اليوم" in Cairo Bold 24px, Desert Gold

- **Timer Display:**
  - Large circular countdown: 30 seconds, animated ring depleting
  - Ring color: Desert Gold → Sunset Orange as time decreases
  - Seconds number in center: Cairo Black 40px

- **Question Card:**
  - Same style as Final Quiz questions but with a special golden-bordered "daily challenge" card style
  - Special "⚡" icon in corner
  - Question sourced from previously completed stages (spaced repetition)

- **Answer Options:** Same interaction patterns as quiz screens

- **Results (after answering):**
  - Correct: "+15 XP تحدي يومي" with star burst
  - Wrong: "حاول غداً!" with encouraging Narrator
  - Streak maintained confirmation: "🔥 سلسلتك مستمرة!"

- **Already Completed State:**
  - If the child has already done today's challenge:
  - Grayed card with "✓ أكملت تحدي اليوم"
  - "عد غداً لتحدٍ جديد" in Cairo Regular 14px
  - Countdown to next challenge: "التحدي القادم بعد ٧ ساعات"

**Animations:**

- Screen enters with a dramatic zoom-in through stars (400ms)
- Timer ring depletes smoothly
- When time is low (<5s): ring pulses, background subtly flashes
- Correct answer: screen explodes with gold particles
- Lightning bolt icon crackles occasionally (Lottie, 3s loop)

---

### Screen 20: Settings Screen (Son)

**Purpose:** Account management and app preferences.

**Layout:**

- **Background:** Soft Cream
- **Header:** "الإعدادات" in Cairo Bold 24px

- **Profile Section (top card):**
  - Avatar circle (80px) with golden border + edit icon overlay
  - Display name (editable)
  - Username (non-editable, shown as @username)
  - "تعديل الملف الشخصي" link

- **Settings Groups:**

  **الحساب (Account):**
  - تغيير كلمة المرور → navigates to password change
  - الحسابات المرتبطة → shows linked father(s) with unlink option

  **الإشعارات (Notifications):**
  - تفعيل الإشعارات → toggle switch
  - وقت التذكير اليومي → time picker (default: 6:00 PM)

  **التطبيق (App):**
  - عن التطبيق → About screen
  - شروط الاستخدام → Terms
  - سياسة الخصوصية → Privacy

  **تسجيل الخروج (Logout):**
  - Red text button at bottom: "تسجيل الخروج"

- **Setting Row Style:**
  - Height: 56px
  - Right (RTL): Setting icon (24px, Muted Gray) + Label (Cairo Regular 16px)
  - Left (RTL): Chevron arrow or toggle switch
  - Divider between rows: 1px, light gray at 30% opacity

- **Toggle Switch Style:**
  - Track: 48×28px, rounded
  - On: Desert Gold track, white thumb
  - Off: light gray track, white thumb
  - Animation: thumb slides + track color transitions (200ms)

**Animations:**

- Sections slide in with subtle stagger (100ms)
- Toggle switches animate smoothly
- Tapping "تسجيل الخروج": confirmation modal slides up from bottom

---

### Screen 21: Link Request Screen (Son — Accept / Decline)

**Purpose:** Son receives and responds to father's linking request.

**Layout:**

- **Presentation:** Full-screen modal overlay (semi-transparent dark background)
- **Card:** Centered card, Starlight White, 24px radius, Level 3 shadow, max-width 320px

- **Card Content:**
  - Top: Illustration — Father and Son silhouettes with a golden connection line between them (not yet connected — dashed line)
  - Title: "طلب ربط حساب" in Cairo Bold 20px
  - Description: "[Father's display name] يريد متابعة تقدمك" in Cairo Regular 16px
  - Info note: "سيتمكن من رؤية تقدمك وإرسال أهداف لك" in Cairo Regular 12px, Muted Gray
  - **24px spacing**
  - "قبول" button: Primary button, full-width
  - "رفض" button: Secondary button (outlined), full-width
  - **16px spacing**

**Animations:**

- Background dims (300ms, 0→50% black opacity)
- Card slides up and scales from 0.9→1.0 (300ms spring)
- Father-Son illustration: dashed line animates (dash-offset animation, 2s loop)
- On "Accept": dashed line becomes solid golden, connection burst effect, card transitions to success state with checkmark
- On "Decline": card gently slides down and fades out

---

### Screen 22: Father Home / Sons Tab

**Purpose:** Father's primary screen — overview of all linked sons.

**Layout:**

- **Background:** Soft Cream
- **Header:**
  - "أبنائي" in Cairo Bold 24px
  - Right (RTL): Father's profile avatar

- **Sons List:**
  - If no sons linked: Empty state illustration (Narrator with "link" icon) + "أضف ابنك" button + instructions: "ابحث عن اسم المستخدم الخاص بابنك لربط حسابه"

  - For each linked son — **Son Card:**
    - **Card style:** Warm Sand bg, 16px radius, Level 1 shadow, full-width
    - **Layout:**
      - Right (RTL): Son's avatar circle (56px) + display name in Cairo Bold 16px + "@username" in Cairo Regular 12px, Muted Gray
      - Below name: Quick stats row:
        - 🔥 Streak: "٧ أيام"
        - ⭐ Total stars: "١٨"
        - 📊 XP: "٣٤٠"
      - Left (RTL): Last active indicator:
        - Green dot + "نشط اليوم" if active today
        - Gray dot + "آخر نشاط: أمس" if not
      - Bottom: Mini progress bar showing overall stage completion (e.g., 4/10 stages)
    - **Tap action:** Navigate to Son Progress Detail

- **"ربط ابن جديد" Button:**
  - Floating action button (FAB) or bottom button
  - Desert Gold, circular (56px) with "+" icon, Level 2 shadow
  - Tapping opens a search modal to find son by username

- **Father's Bottom Navigation:**
  - Two tabs only: "أبنائي" (Sons) | "الأهداف" (Goals)
  - Same style as Son's bottom nav but simpler

**Animations:**

- Son cards slide in from right (RTL) with stagger (200ms each)
- Stats numbers count up briefly (300ms)
- Active indicator green dot pulses subtly (2s loop)
- FAB has a subtle bounce on first appear to draw attention
- Pull-to-refresh with sand-swirl animation

---

### Screen 23: Son Progress Detail Screen (Father View)

**Purpose:** Deep dive into a specific son's learning data.

**Layout:**

- **Background:** Soft Cream
- **Header:** Son's display name + back arrow

- **Hero Section:**
  - Son's avatar (large, 80px) centered
  - Display name below
  - Three stat circles in a row:
    - XP (golden) | Streak (orange) | Stars (purple)
  - Each circle: 64px, gradient bg matching stat color, number in white Cairo Bold 20px, label below

- **Stage Progress Section:**
  - Section header: "تقدم المراحل"
  - Vertical list of all 10 stages:
    - Each row: Stage number + title + stars (0–3) + score
    - Visual: mini star rating, score text
    - Completed stages: full color
    - Not attempted: grayed out with "لم يبدأ" label
  - Overall progress bar at top of section: X/10 stages completed

- **Activity Timeline:**
  - Section header: "النشاط الأخير"
  - Chronological list of recent activities:
    - "أكمل المرحلة ٣ — ⭐⭐⭐" + timestamp
    - "أكمل تحدي اليوم — +15 XP" + timestamp
    - "حقق سلسلة ٧ أيام 🔥" + timestamp
  - Each item: small icon + description + relative time ("منذ ساعتين")
  - Timeline connector: thin vertical golden line on the right (RTL) connecting events

- **Quick Actions:**
  - "إنشاء هدف جديد" button — Primary, full-width at bottom

**Animations:**

- Stat circles pop in with stagger (150ms each), numbers count up (400ms)
- Stage list items fade in with stagger (50ms each)
- Timeline items slide in from right (RTL) with stagger
- Progress bar fills smoothly (600ms)

---

### Screen 24: Goals Tab (Father View)

**Purpose:** Manage all goals across all sons.

**Layout:**

- **Background:** Soft Cream
- **Header:** "الأهداف" in Cairo Bold 24px

- **Filter Tabs (horizontal):**
  - "الكل" | "نشطة" | "مكتملة" | "منتهية"
  - Same pill tab style as Badges screen
  - Count badge on each tab: small circle with number

- **Goals List:**
  - Grouped by son name (section headers)
  - Each goal card:
    - Son's name + avatar (small, 32px) at top
    - Goal description in Cairo Bold 16px
    - Progress bar: stages completed / required
    - Deadline: date + remaining days
    - Reward description
    - Status badge: "نشط" (gold) | "مكتمل" (green) | "منتهي" (red)
  - Card style: Warm Sand bg, status-colored left border (RTL: right)

- **"إنشاء هدف جديد" Button:**
  - Primary button at bottom, full-width
  - Or FAB if scrollable list is long

- **Empty State:**
  - Illustration: target/trophy with Narrator
  - "لم تنشئ أي أهداف بعد"
  - "ابدأ بتحفيز ابنك بهدف ومكافأة"
  - CTA button: "إنشاء أول هدف"

**Animations:**

- Tab switching: content cross-fades (200ms)
- Goal cards stagger in (100ms each)
- Status badges have color-coded subtle pulse (active goals only)
- Completed goals: brief sparkle on first view

---

### Screen 25: Create Goal Screen (Father)

**Purpose:** Father creates a new goal with deadline and reward for his son.

**Layout:**

- **Background:** Soft Cream
- **Header:** "هدف جديد" + back arrow + "إنشاء" text button (disabled until form is valid, then Desert Gold)
- **Presentation:** Full screen (pushed navigation)

- **Form Fields:**
  1. **Select Son:**
     - If multiple sons: horizontal scrollable avatar chips
     - Each chip: avatar (40px) + name, selectable
     - Selected: Desert Gold border + checkmark overlay
     - If one son: pre-selected, shown as header info

  2. **Goal Description:**
     - Text area input
     - Label: "وصف الهدف"
     - Placeholder: "مثال: أكمل مراحل قصة الفيل"
     - Max: 200 characters with counter
     - Style: same as Sign Up inputs but taller (100px)

  3. **Stage Group:**
     - Label: "المراحل المطلوبة"
     - Pre-defined group selector (V1: only 1 group, but UI shows the concept)
     - Displayed as a card showing: group name + number of stages + stage list preview

  4. **Deadline:**
     - Label: "الموعد النهائي"
     - Date picker (native, styled)
     - Minimum: tomorrow
     - Shows "بعد X أيام" calculated text below

  5. **Reward Description:**
     - Text input
     - Label: "المكافأة"
     - Placeholder: "مثال: ٢٠ ريال عند الإنهاء"
     - 🏆 icon prefix inside the field
     - Max: 100 characters

- **Preview Card (below form):**
  - Shows a live preview of how the goal will appear to the son
  - Updates in real-time as the father types
  - Styled exactly like the Son's goal card view
  - Label above: "كذا سيظهر الهدف لابنك:"

- **Submit Button:**
  - "إنشاء الهدف" — Primary button, full-width
  - Disabled state until all required fields are filled

**Animations:**

- Son chips slide in from right (RTL) with stagger
- Preview card updates with subtle cross-fade on each field change
- On submit: loading spinner → success animation (checkmark burst) → navigate back to Goals tab
- Form validation: same shake animation on error as Sign Up

---

### Screen 26: Settings Screen (Father)

**Purpose:** Father's account management.

**Layout:**

- **Background:** Soft Cream
- **Header:** "الإعدادات"

- **Profile Section:**
  - Avatar (80px) + display name + username
  - "تعديل" link

- **Settings Groups:**

  **الحساب (Account):**
  - تغيير كلمة المرور
  - الأبناء المرتبطين → list of linked sons with unlink option per son

  **الإشعارات (Notifications):**
  - تفعيل الإشعارات → toggle
  - إشعار إكمال المرحلة → toggle (default: on)
  - إشعار إنجاز الهدف → toggle (default: on)
  - إشعار السلسلة → toggle (default: on)

  **التطبيق (App):**
  - عن التطبيق
  - شروط الاستخدام
  - سياسة الخصوصية

  **تسجيل الخروج:**
  - Red "تسجيل الخروج" button

- **Style:** Same row and toggle styles as Son's Settings screen

---

## Micro-Interaction & Animation Library

### Lottie Animations Needed

| Animation                | Screen(s)                    | Duration  | Description                                        |
| ------------------------ | ---------------------------- | --------- | -------------------------------------------------- |
| **Campfire**             | Splash, Narrator Welcome     | Loop      | Warm flickering fire with light glow cast          |
| **Star Burst**           | Results, Quiz Correct        | 800ms     | Gold star with sparkle particles exploding outward |
| **Heart Break**          | Quiz Wrong                   | 500ms     | Heart cracks down the middle and pieces fall       |
| **Confetti**             | Results (3 stars)            | 2000ms    | Multi-colored confetti explosion from center       |
| **Streak Flame**         | Home, Results                | Loop      | Animated fire flame that grows with streak count   |
| **Loading Spinner**      | Various                      | Loop      | Golden desert-themed spiral/sand spinner           |
| **Checkmark Success**    | Goal Created, Correct Answer | 600ms     | Circle draws, then checkmark pops inside           |
| **XP Float**             | Quiz Correct                 | 600ms     | "+10 XP" text floats upward and fades              |
| **Narrator Idle**        | Home (Journey Map)           | Loop (4s) | Subtle sway and occasional wave                    |
| **Narrator Celebrating** | Results                      | 1200ms    | Arms spread wide, slight jump                      |
| **Narrator Encouraging** | Wrong Answer                 | 800ms     | Hand on heart, gentle nod                          |
| **Narrator Excited**     | 3-Star Result                | 1000ms    | Arms raised, pointing up                           |
| **Sand Particles**       | Journey Map                  | Loop      | Very subtle floating dust particles                |
| **Page Turn**            | Story Panel transition       | 400ms     | Paper edge curl effect                             |
| **Lightning Crackle**    | Daily Challenge              | Loop (3s) | ⚡ bolt flickers and crackles                      |
| **Lock Shake**           | Locked Stage tap             | 300ms     | Padlock shakes side to side                        |
| **Badge Reveal**         | Badge Earned                 | 1000ms    | Badge spins in, glows, settles with shimmer        |
| **Connection Burst**     | Link Accept                  | 600ms     | Golden particles burst along the connection line   |
| **Banner Unfurl**        | Perfect Run                  | 400ms     | Scroll/banner unrolls from center                  |

### Haptic Feedback Map (for developer reference)

| Event            | Haptic Type            |
| ---------------- | ---------------------- |
| Correct answer   | Success (light)        |
| Wrong answer     | Error (medium)         |
| Star earned      | Impact (light)         |
| Stage complete   | Success (heavy)        |
| Streak milestone | Notification (success) |
| Button tap       | Impact (light)         |
| Heart lost       | Impact (medium)        |

---

## Screen Flow Diagram

```
                    ┌──────────┐
                    │  Splash  │
                    └────┬─────┘
                         │
              ┌──── Logged in? ────┐
              │                    │
              No                  Yes
              │                    │
    ┌─────────▼──────────┐   ┌────▼──────┐
    │    Onboarding      │   │   Home /   │
    │   (3 screens)      │   │ Journey Map│
    └─────────┬──────────┘   └────┬───────┘
              │                    │
    ┌─────────▼──────────┐        │
    │  Landing (SignUp/  │        │
    │     Login)         │        │
    └────┬─────┬─────────┘        │
         │     │                  │
    ┌────▼─┐ ┌─▼────┐            │
    │SignUp│ │Login │            │
    └──┬───┘ └──┬───┘            │
       └────┬───┘                │
            │                    │
            ▼                    │
    ┌───────────────┐            │
    │  Home /       │◄───────────┘
    │  Journey Map  │
    └───┬───────────┘
        │
        ├──► Stage Detail ──► Narrator Welcome ──► Story Panels ──► Inline Questions
        │                                                              │
        │    ┌──────────────────────────────────────────────────────────┘
        │    │
        │    ▼
        │    Final Quiz ──► Results / Celebration
        │                         │
        │                         ▼
        │                   (Back to Journey Map)
        │
        ├──► Daily Challenge
        ├──► Progress Screen
        ├──► Goals Screen (Son)
        ├──► Awards Screen ──► Badges Screen
        ├──► Settings (Son)
        └──► Link Request (modal, triggered by notification)


    ═══════════════════════════════════════════
    FATHER FLOW:

    Login/SignUp ──► Father Home (Sons Tab)
                          │
                          ├──► Son Progress Detail
                          ├──► Goals Tab ──► Create Goal
                          └──► Settings (Father)
```

---

## Illustration Asset List

| Asset                           | Screen                   | Description                             | Size Guidance                          |
| ------------------------------- | ------------------------ | --------------------------------------- | -------------------------------------- |
| Desert night sky BG             | Splash, Onboarding       | Starry sky with gradient, high-res      | Full screen, tileable vertically       |
| Campfire scene                  | Splash, Narrator Welcome | Fire on sand with warm glow             | Center-bottom, ~60% width              |
| Narrator silhouette (4 states)  | Multiple                 | Faceless man in white thobe from behind | ~300px height, transparent BG          |
| Journey map landscape           | Home                     | Continuous vertical desert scene        | Full width, ~3000px tall for scrolling |
| Stage node illustrations (10)   | Home, Stage Detail       | Unique per stage — see list in Screen 8 | 120×120px (nodes), 600px wide (detail) |
| Story panel illustrations (~30) | Story Panels             | 3 per stage × 10 stages, atmospheric    | Full width, ~45% screen height         |
| Onboarding illustrations (3)    | Onboarding               | Described per screen above              | 80% width, ~50% screen height          |
| Father-Son connection           | Link Request             | Two silhouettes with golden line        | ~280px wide                            |
| Empty state illustrations (3)   | Goals, Sons, Badges      | Narrator with contextual prop           | ~200px wide                            |

---

## Responsive Considerations

- **Target devices:** iPhone SE (375px) to iPhone 15 Pro Max (430px), mid-range Android (360–412px)
- **Safe areas:** Respect notch and home indicator insets on all screens
- **Text scaling:** Support Dynamic Type up to 130% — test all screens at max size
- **Landscape:** Not supported in V1 — lock to portrait
- **Minimum tap target:** 44×44px for all interactive elements

---

## Accessibility Notes

- All illustrations must have descriptive alt text for screen readers
- Color is never the only indicator — always pair with icons or text
- Contrast ratios: minimum 4.5:1 for body text, 3:1 for large text
- Interactive elements must have visible focus states
- Animations must respect "Reduce Motion" system setting — provide static fallbacks

---

## Designer Deliverables Checklist

- [ ] Complete Figma design system (colors, typography, components, icons)
- [ ] All 26 screens designed at 375px width (iPhone SE baseline)
- [ ] Responsive variants at 430px width (iPhone Pro Max)
- [ ] All component states: default, hover/pressed, disabled, error, loading, empty
- [ ] Narrator character in 4 emotional states (illustration assets)
- [ ] 10 stage node thematic illustrations
- [ ] 3 onboarding full-page illustrations
- [ ] Journey map full landscape illustration (scrollable)
- [ ] Lottie animation specifications / storyboards for developer handoff
- [ ] Prototype with key interactions: stage flow, quiz answering, celebration sequence
- [ ] RTL layout verification on all screens
- [ ] Dark mode: NOT required for V1
