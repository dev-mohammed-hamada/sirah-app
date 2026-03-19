# Animations, Assets & Haptics Library

### مكتبة الحركات والأصول

> This document catalogs all Lottie animations, haptic feedback mappings, and illustration assets needed across the entire app.

---

## Lottie Animations

| #   | Animation                | Screen(s)                                 | Duration  | Type      | Description                                                                                         |
| --- | ------------------------ | ----------------------------------------- | --------- | --------- | --------------------------------------------------------------------------------------------------- |
| 1   | **Campfire**             | Splash, Narrator Welcome                  | Loop      | Ambient   | Warm flickering fire with light glow casting on surrounding sand. Sparks occasionally drift upward. |
| 2   | **Star Burst**           | Results, Quiz Correct                     | 800ms     | One-shot  | Gold star with sparkle particles exploding outward from center.                                     |
| 3   | **Heart Break**          | Quiz Wrong                                | 500ms     | One-shot  | Heart cracks down the middle, pieces fall downward and fade.                                        |
| 4   | **Confetti Explosion**   | Results (3 stars)                         | 2000ms    | One-shot  | Full-screen multi-colored confetti — gold, white, blue particles burst from center and float down.  |
| 5   | **Streak Flame**         | Home, Results                             | Loop      | Dynamic   | Animated fire flame. Size/intensity should scale with streak count (small at 1, large at 30).       |
| 6   | **Loading Spinner**      | Various (buttons, screens)                | Loop      | Utility   | Golden desert-themed spiral/sand spinner. Clean and minimal.                                        |
| 7   | **Checkmark Success**    | Goal Created, Correct Answer, Link Accept | 600ms     | One-shot  | Green circle draws itself, then white checkmark pops inside with bounce.                            |
| 8   | **XP Float**             | Quiz Correct                              | 600ms     | One-shot  | "+10 XP" golden text floats upward and fades out. Slight scale up then down.                        |
| 9   | **Narrator Idle**        | Home (Journey Map)                        | Loop (4s) | Character | Narrator standing/seated with subtle sway and occasional wave. Minimal movement.                    |
| 10  | **Narrator Celebrating** | Results (3 stars)                         | 1200ms    | One-shot  | Arms spread wide, slight jump, settles into standing pose.                                          |
| 11  | **Narrator Encouraging** | Wrong Answer, 1-star Result               | 800ms     | One-shot  | Hand on heart, gentle nod, warm body language.                                                      |
| 12  | **Narrator Excited**     | Results (2 stars), Stage Teasers          | 1000ms    | One-shot  | Arms raised, pointing upward, energetic.                                                            |
| 13  | **Narrator Waving**      | Login, Journey Map                        | Loop (2s) | Character | Subtle arm wave, friendly and inviting.                                                             |
| 14  | **Sand Particles**       | Journey Map                               | Loop      | Ambient   | Very subtle floating dust/sand particles drifting across screen. Low opacity.                       |
| 15  | **Page Turn**            | Story Panel transition                    | 400ms     | One-shot  | Paper edge curl effect at screen edge during panel transition.                                      |
| 16  | **Lightning Crackle**    | Daily Challenge                           | Loop (3s) | Ambient   | ⚡ lightning bolt icon flickers and crackles with subtle glow.                                      |
| 17  | **Lock Shake**           | Locked Stage tap                          | 300ms     | One-shot  | Padlock shakes rapidly side to side (3 shakes).                                                     |
| 18  | **Badge Reveal**         | Badge Earned                              | 1000ms    | One-shot  | Badge spins in from distance, glows golden, settles with shimmer effect.                            |
| 19  | **Connection Burst**     | Link Accept                               | 600ms     | One-shot  | Golden particles burst along the connection line between Father and Son silhouettes.                |
| 20  | **Banner Unfurl**        | Perfect Run                               | 400ms     | One-shot  | Scroll/banner unrolls from center horizontally, revealing "بدون أخطاء!" text.                       |
| 21  | **Gold Particle Float**  | Celebration/Results                       | Loop      | Ambient   | Slow-moving golden light particles floating upward. Ethereal feel.                                  |
| 22  | **Star Twinkle**         | Splash, Night Sky screens                 | Loop      | Ambient   | Random stars pulse brighter and dimmer at staggered intervals.                                      |
| 23  | **Mini Confetti**        | Inline Question Correct                   | 800ms     | One-shot  | Smaller, briefer version of full confetti. Localized burst, not full-screen.                        |
| 24  | **Hearts Depletion**     | Final Quiz (0 hearts)                     | 800ms     | One-shot  | All remaining hearts crack simultaneously, dramatic.                                                |

---

## Haptic Feedback Map

| Event              | Haptic Type  | Intensity     | Screen(s)             |
| ------------------ | ------------ | ------------- | --------------------- |
| Correct answer     | Success      | Light         | Quiz, Daily Challenge |
| Wrong answer       | Error        | Medium        | Quiz, Daily Challenge |
| Star earned (each) | Impact       | Light         | Results               |
| Stage complete     | Success      | Heavy         | Results               |
| Streak milestone   | Notification | Success       | Results, Home         |
| Button tap         | Impact       | Light         | All screens           |
| Heart lost         | Impact       | Medium        | Quiz                  |
| Badge earned       | Notification | Success       | Awards                |
| Score tick-up      | Impact       | Light (rapid) | Results               |
| 3-star confetti    | Success      | Heavy         | Results               |
| Perfect banner     | Impact       | Medium        | Results               |

---

## Illustration Asset List

### Character Assets

| Asset                                     | Variants                                             | Size Guidance      | Format                    | Used In                             |
| ----------------------------------------- | ---------------------------------------------------- | ------------------ | ------------------------- | ----------------------------------- |
| Narrator silhouette (seated, from behind) | 1                                                    | ~300px height      | PNG transparent           | Splash, Narrator Welcome, Landing   |
| Narrator silhouette (standing)            | 4 states: Neutral, Excited, Encouraging, Celebrating | ~300px height each | PNG transparent or Lottie | Results, Quiz feedback, Journey Map |
| Narrator silhouette (waving)              | 1                                                    | ~120px height      | Lottie                    | Login, Journey Map                  |
| Narrator mini-avatar                      | 1 (circular, bust)                                   | 40px               | PNG transparent           | Quiz questions                      |
| Child silhouette (seated)                 | 1                                                    | ~150px             | PNG transparent           | Onboarding 2                        |
| Child silhouette (standing)               | 1                                                    | ~100px             | PNG transparent           | Link Request                        |
| Father silhouette (standing)              | 1                                                    | ~120px             | PNG transparent           | Onboarding 3, Link Request          |
| Father silhouette (with device)           | 1                                                    | ~150px             | PNG transparent           | Onboarding 3                        |

> **Critical rule:** All human figures are **faceless silhouettes** — no exceptions.

### Environment & Background Assets

| Asset                      | Description                                                                 | Size Guidance             | Format                    | Used In                           |
| -------------------------- | --------------------------------------------------------------------------- | ------------------------- | ------------------------- | --------------------------------- |
| Desert night sky           | Starry gradient sky background                                              | Full screen, tileable     | PNG/SVG                   | Splash, Onboarding, Night screens |
| Desert dunes silhouette    | Sandy golden horizon line                                                   | Full width                | SVG                       | Splash, various                   |
| Journey map landscape      | Continuous vertical desert scene with path, dunes, plants, rocks, mountains | Full width, ~3000px tall  | PNG layers (for parallax) | Home / Journey Map                |
| Campfire scene (large)     | Fire on sand with warm glow and surrounding environment                     | Center-bottom, ~60% width | Lottie + PNG layers       | Splash, Narrator Welcome          |
| Desert decorative elements | Palm trees, rocks, desert flowers, small tents                              | Various small sizes       | SVG/PNG                   | Journey Map path decorations      |

### Stage-Specific Assets

#### Stage Node Illustrations (10 total)

Small thematic icons displayed on the Journey Map path:

| Stage | Theme                | Visual                         | Size      |
| ----- | -------------------- | ------------------------------ | --------- |
| 1     | Before the Birth     | Crescent moon + stars cluster  | 120×120px |
| 2     | Year of the Elephant | Elephant silhouette            | 120×120px |
| 3     | The Birth            | Glowing light rays             | 120×120px |
| 4     | Childhood            | Small desert tent              | 120×120px |
| 5     | Youth                | Mountain silhouette            | 120×120px |
| 6     | Cave of Hira         | Cave entrance with inner light | 120×120px |
| 7     | First Revelation     | Glowing scroll                 | 120×120px |
| 8     | Early Followers      | Small group of silhouettes     | 120×120px |
| 9     | The Migration        | Camel silhouette at night      | 120×120px |
| 10    | Arrival in Medina    | Palm trees + buildings         | 120×120px |

#### Stage Detail Illustrations (10 total)

Wider, more detailed versions for the Stage Detail bottom sheet:

- Same themes as above but expanded to full-width (600px wide, 180px tall)
- More environmental detail, richer colors

#### Story Panel Illustrations (~30 total)

3 per stage × 10 stages. Large, atmospheric, painterly:

| Size                                  | Style                              | Rules                                                                                                     |
| ------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Full screen width, ~45% screen height | Painterly, atmospheric, warm tones | Faceless silhouettes ONLY. Desert environments. Consistent color palette (golds, blues, oranges, purples) |

> These are the most significant illustration investment. Each must feel unique and evoke the emotion of the story moment.

### Onboarding Illustrations (3 total)

| Screen       | Description                                                               | Size                    |
| ------------ | ------------------------------------------------------------------------- | ----------------------- |
| Onboarding 1 | Winding golden path through desert with stage markers, distant Mecca glow | ~80% width, ~50% height |
| Onboarding 2 | Child + Narrator surrounded by floating quiz elements                     | ~80% width, ~50% height |
| Onboarding 3 | Split scene: father and son connected by golden line                      | ~80% width, ~50% height |

### Empty State Illustrations (3 total)

| Screen                | Description                   | Size        |
| --------------------- | ----------------------------- | ----------- |
| Goals (Son, empty)    | Narrator with empty scroll    | ~200px wide |
| Father Home (no sons) | Narrator with link/chain icon | ~200px wide |
| Goals (Father, empty) | Narrator with target/trophy   | ~200px wide |

### UI Icons

| Category       | Icons Needed                                                             | Size    | Style                         |
| -------------- | ------------------------------------------------------------------------ | ------- | ----------------------------- |
| Navigation     | Home, Progress, Goals, Awards, Settings                                  | 32×32px | Outlined, rounded, 2px stroke |
| Game mechanics | Heart (filled/empty), Star (filled/empty), Flame, Lock, Shield, XP badge | 24×24px | Same style                    |
| Decorative     | Scroll, Sword, Crescent, Mosque silhouette                               | 48×48px | Same style                    |
| Actions        | Pencil/edit, Calendar, Trophy, Link, Bell, Clock, Info, Document         | 24×24px | Same style                    |
| Question types | MCQ, True/False, Arrange, Fill-blank, Quote                              | 12×12px | Minimal, muted                |

### Badge Assets (V1 Prototype — 10 total)

| Badge | Name    | Icon Concept   | Trigger                            |
| ----- | ------- | -------------- | ---------------------------------- |
| 1     | المبتدئ | Rising star    | First stage completed              |
| 2     | المثابر | Small flame    | 3-day streak                       |
| 3     | النجم   | Triple star    | First 3-star stage                 |
| 4     | الحافظ  | Large flame    | 7-day streak                       |
| 5     | المتقن  | Diamond        | First perfect run                  |
| 6     | المحارب | Sword + shield | 14-day streak                      |
| 7     | السريع  | Lightning bolt | First speed bonus on all questions |
| 8     | الباحث  | Scroll         | 5 stages completed                 |
| 9     | الهداف  | Target         | First goal completed               |
| 10    | البطل   | Crown          | All 10 stages completed            |

Each badge: 88px display, 120px for detail modal. Both earned (full color) and locked (gray silhouette) versions needed.

---

## Total Asset Count Summary

| Category                   | Count                    |
| -------------------------- | ------------------------ |
| Lottie animations          | 24                       |
| Character illustrations    | 8 unique (with variants) |
| Environment/background     | 5 major assets           |
| Stage node illustrations   | 10                       |
| Stage detail illustrations | 10                       |
| Story panel illustrations  | ~30                      |
| Onboarding illustrations   | 3                        |
| Empty state illustrations  | 3                        |
| UI icons                   | ~30                      |
| Badge icons                | 10 (×2 states = 20)      |
| **Total**                  | **~125 assets**          |
