# Screen 11: Story Panel

### لوحة القصة

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components.

---

## Purpose

Display the story content — the core educational experience. Each stage has 3 story panels. This is where the child reads the Seerah in short, illustrated, digestible pieces.

---

## Layout

- **Background:** Soft Cream (`#FAF3E8`)

### Top Bar (fixed)

- **Progress bar:** Full width, 4px height, rounded
  - Track: light gray (`#E0D5C5`)
  - Fill: Desert Gold, fills from right to left (RTL)
  - Shows overall stage progress (panels + questions completed / total)
- **Below progress bar (row):**
  - Right (RTL): Hearts display — 5 small heart icons (filled red / outlined gray)
  - Left (RTL): Stage title — Cairo Medium 12px, Muted Gray

### Story Illustration (top 45% of screen)

- **Full-bleed** (edge to edge, no padding)
- Large atmospheric illustration for this story panel
- Soft gradient fade at bottom: illustration blends into Soft Cream background
  - Gradient: transparent → Soft Cream over bottom 40px

**Illustration style guidelines:**

- Painterly, atmospheric, warm tones
- **Faceless silhouettes** for all human figures — no exceptions
- Rich desert environments
- Consistent color palette: warm golds, deep blues, sandy oranges, night purples

**Example illustrations by stage/panel:**
| Stage | Panel | Scene Description |
|-------|-------|-------------------|
| 2 (Elephant) | 1 | Elephant silhouettes marching toward a distant Kaaba silhouette under dramatic clouds |
| 2 (Elephant) | 2 | Birds in the sky dropping stones, army in chaos below |
| 2 (Elephant) | 3 | Peaceful Kaaba with clear sky, dawn breaking |
| 3 (Birth) | 1 | A glowing light emanating from a small house under a star-filled sky |
| 4 (Childhood) | 1 | A small child silhouette running among sand dunes with a desert sunset |

### Narration Text (bottom section)

- Container with 20px horizontal padding
- **Narrator tag:** Small pill before the text
  - "الراوي:" — Cairo Medium 12px, Deep Night Blue text on Desert Gold background, rounded 8px
- **Narration text:** Cairo Regular 18px, Deep Night Blue, right-aligned (RTL)
  - Maximum 3 sentences
  - Line height: 1.7 (generous for readability in Arabic)
  - 12px margin-top from narrator tag

### Navigation

- **"التالي" button:** Primary Button, full-width, at bottom with 20px padding
- **Swipe gesture:** Swipe left (RTL) also advances to next panel/question

---

## Visual Composition

```
┌─────────────────────────────┐
│ [████████░░░░░░░░░░]        │  ← Progress bar (RTL fill)
│ ❤️❤️❤️❤️❤️    عام الفيل    │  ← Hearts + Stage title
│                             │
│┌───────────────────────────┐│
││                           ││
││                           ││
││   STORY ILLUSTRATION      ││  ← Full-bleed, 45% height
││   (Elephant army          ││
││    marching toward        ││
││    the Kaaba)             ││
││                           ││
││         ░░░░░░░░░░        ││  ← Gradient fade to cream
│└───────────────────────────┘│
│                             │
│  [الراوي:]                  │  ← Narrator tag (gold pill)
│                             │
│  في ذلك العام، جاء أبرهة   │  ← Narration text
│  بجيش عظيم من الفيلة يريد  │     (max 3 sentences,
│  هدم الكعبة المشرفة. كان   │      Cairo Regular 18px)
│  الناس خائفين ولا يعرفون   │
│  ماذا يفعلون.              │
│                             │
│  ┌───────────────────────┐  │
│  │       التالي           │  │  ← Next Button
│  └───────────────────────┘  │
└─────────────────────────────┘
```

---

## Animations

| #   | Element               | Animation                                                                  | Duration            | Notes                                    |
| --- | --------------------- | -------------------------------------------------------------------------- | ------------------- | ---------------------------------------- |
| 1   | Panel transition      | Current illustration slides out left (RTL), new slides in from right (RTL) | 400ms (ease-in-out) | Between panels                           |
| 2   | Narration text        | Fades in with slight upward motion                                         | 200ms               | Delayed 200ms after illustration settles |
| 3   | Progress bar          | Fills smoothly to next increment                                           | 300ms (ease-out)    | On each new panel                        |
| 4   | Narrator tag          | Subtle slide-in from right (RTL)                                           | 200ms               | First appearance on panel                |
| 5   | Page turn effect      | Tiny paper particle effect at the edge during transition                   | 400ms               | Visual cue for panel change              |
| 6   | Illustration internal | Where possible: clouds drifting, fire flickering, light pulsing            | Loop/subtle         | Lottie overlays on static illustrations  |

---

## Interaction

| Action                 | Result                                                      |
| ---------------------- | ----------------------------------------------------------- |
| Tap "التالي"           | Advance to next story panel or inline question              |
| Swipe left (RTL)       | Same as tapping next                                        |
| No backward navigation | Child cannot go back to previous panels (forward-only flow) |

---

## Stage Flow Context

Each stage has this rhythm:

1. Story Panel 1 → **Inline Question 1** → Story Panel 2 → **Inline Question 2** → Story Panel 3 → **Final Quiz**

This screen handles panels 1, 2, and 3. After panels 1 and 2, it transitions to the Inline Question screen (`12-inline-question.md`). After panel 3, it goes to the Final Quiz (`13-final-quiz.md`).

---

## Content Rules

- Maximum 3 sentences per panel
- Simple Arabic vocabulary appropriate for ages 6–14
- Each sentence should advance the story or reveal something new
- The text should feel like the Narrator is speaking directly to the child

---

## Assets Needed

| Asset                            | Description                                                | Format                              |
| -------------------------------- | ---------------------------------------------------------- | ----------------------------------- |
| ~30 story illustrations          | 3 per stage × 10 stages, atmospheric, faceless silhouettes | PNG, full-width, ~45% screen height |
| Illustration overlays (optional) | Subtle animated elements: clouds, fire, light              | Lottie JSON layers                  |
