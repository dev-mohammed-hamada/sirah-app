# Task 11: Goals Screen (Son View)

## Priority: MEDIUM

## Description

View goals set by the son's linked father. Shows active goals with progress, deadlines, rewards, and completed goals. Son does NOT create goals.

## Screen (design 16)

### Active Goals

- Cards with Desert Gold right border (RTL)
- Goal description, progress bar (X of Y stages), deadline with urgency coloring
- Reward with trophy icon, source "From: Dad"
- Deadline urgency: <3 days turns Sunset Orange

### Completed Goals

- Cards with Success Green border
- "Completed" badge pill, 90% opacity

### Empty State

- Narrator with empty scroll illustration
- "No goals currently" text

## API Integration

- `GET /goals/son` — goals with progress, deadline, reward, father info

## Acceptance Criteria

- [ ] Active goals with progress bars
- [ ] Deadline urgency coloring
- [ ] Completed goals section
- [ ] Empty state renders
- [ ] Tap expands accordion with stage list
- [ ] Pull-to-refresh

## References

- `designs/16-goals-son-view.md`
