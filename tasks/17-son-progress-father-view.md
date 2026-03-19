# Task 17: Son Progress Detail (Father View)

## Priority: MEDIUM

## Description

Deep dive into a specific son's learning data — stage-by-stage progress, activity timeline, and goal creation entry point.

## Screen (design 23)

### Hero Section

- Son's avatar (80px centered), display name
- 3 stat circles: XP, Streak, Stars (64px each with gradients)

### Stage Progress

- Overall progress bar with label
- 10-stage vertical list: number, title, stars, score
- Completed = golden, Not attempted = grayed

### Activity Timeline

- Chronological list (most recent first)
- Golden vertical connector line with event dots
- Events: stage completions, daily challenges, streak milestones
- Relative timestamps

### Sticky CTA

- "Create New Goal" Primary Button at bottom

## API Integration

- Father-specific endpoint to get son's full progress
- Reuses existing progress data structures

## Acceptance Criteria

- [ ] Stat circles with count-up animations
- [ ] Stage list shows all 10 stages
- [ ] Activity timeline renders events
- [ ] "Create New Goal" navigates to Create Goal (pre-selected son)
- [ ] Back arrow returns to Father Home

## References

- `designs/23-son-progress-father-view.md`
