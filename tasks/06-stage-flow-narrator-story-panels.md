# Task 06: Stage Flow — Narrator Welcome + Story Panels

## Priority: HIGH (core learning experience)

## Description

The narrative flow within a stage: the narrator welcomes the child, then 3 story panels deliver the Seerah content with illustrations and narration text.

## Screens

### Narrator Welcome (design 10)

- Night Sky gradient with campfire glow
- Large narrator silhouette seated by campfire (40% of screen)
- Speech bubble with typewriter text effect (unique per stage)
- Stage title in Desert Gold
- "Let's go!" continue button

### Story Panels (design 11) — 3 per stage

- Soft Cream background
- Top bar: progress bar (fills RTL), hearts, stage title
- Story illustration (top 45%, full-bleed, painterly)
- "Narrator" tag pill + narration text (max 3 sentences, Cairo 18px)
- "Next" button

## Stage Flow Sequence

```
Narrator Welcome → Panel 1 → Inline Q1 → Panel 2 → Inline Q2 → Panel 3 → Final Quiz
```

- Forward-only navigation (no back)
- Panel slide transitions (400ms)
- Progress bar updates at each step

## Technical

- State machine for stage flow (tracks current step)
- Preload illustrations for smooth transitions
- Typewriter effect: 40ms per word
- Content loaded from API: `GET /stages/:id`

## Assets Needed (per stage)

- Narrator welcome text (unique)
- 3 story illustrations
- 3 narration texts (max 3 sentences each)
- Optional Lottie overlays

## Acceptance Criteria

- [x] Narrator welcome plays with typewriter effect
- [x] 3 story panels render with illustrations
- [x] Progress bar updates correctly
- [x] Hearts display in top bar
- [x] Forward-only navigation enforced
- [x] Smooth transitions between panels
- [x] RTL progress bar (fills right to left)

## References

- `designs/10-narrator-welcome.md`
- `designs/11-story-panel.md`
- `designs/27-animations-assets.md` — narrator states, campfire
