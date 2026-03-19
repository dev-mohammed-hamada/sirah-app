# Task 05: Stage Detail Bottom Sheet

## Priority: HIGH (entry point to gameplay)

## Description

A bottom sheet that previews a stage before playing — shows info, score history, and the play/replay action. Overlays the Journey Map.

## Screen (design 09)

- Bottom sheet at 70% screen height, Warm Sand bg, draggable handle
- Journey Map dimmed behind (40% black overlay)
- Hero illustration (180px, thematic stage art)
- Stage title + subtitle teaser
- Stats row (if completed): Stars, Best Score, Attempts
- Action button: "Start Stage" or "Retry" (with best score shown)
- Hearts indicator: ready state or refill countdown

## Interactions

- Tap action button → Narrator Welcome (task 06)
- Drag down or tap backdrop → dismiss
- No hearts (0) → button disabled with refill countdown
- First time: hide stats row
- 3 stars: show "Perfect performance!" badge

## Technical

- Spring physics animation (400ms)
- Hero parallax on drag
- Velocity-based dismiss gesture

## Acceptance Criteria

- [ ] Bottom sheet renders over dimmed map
- [ ] Stage info displays correctly
- [ ] Stats show for completed stages
- [ ] Action button navigates to Narrator Welcome
- [ ] Hearts check prevents play when depleted
- [ ] Drag-to-dismiss works
- [ ] First-time vs replay states handled

## References

- `designs/09-stage-detail.md`
