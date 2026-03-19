# Task 18: Goals Tab + Create Goal (Father)

## Priority: MEDIUM

## Description

Father manages goals across all sons — view, filter, and create goals with deadlines and rewards.

## Screens

### Goals Tab (design 24)

- Filter tabs: All, Active, Completed, Expired (with count badges)
- Goals grouped by son (avatar + name headers)
- Goal cards with status-colored borders: Active=Gold, Completed=Green, Expired=Red
- Each card: description, progress bar, deadline, reward, status badge
- "Create Goal" sticky button
- Empty state with narrator

### Create Goal Screen (design 25)

- Select Son: avatar chip row (scrollable)
- Goal Description: text area (200-char limit)
- Stage Group: selector card (V1: 1 group only)
- Deadline: date picker (minimum: tomorrow)
- Reward Description: single line (100-char limit)
- Live Preview Card: real-time rendering of how son will see it
- Discard confirmation modal if back with unsaved changes

## API Integration

- `GET /goals/father` — all goals grouped by son
- `POST /goals` — { sonId, description, stageGroupId, deadline, rewardDescription }

## Technical

- Son receives push notification on goal creation
- Live preview updates on every field change
- Form validation with field-level errors

## Acceptance Criteria

- [ ] Goals tab with filter tabs
- [ ] Goals grouped by son
- [ ] Status-colored borders
- [ ] Create Goal form with all fields
- [ ] Live preview card updates
- [ ] Date picker with minimum date
- [ ] Discard confirmation on unsaved changes
- [ ] Push notification sent to son

## References

- `designs/24-goals-father-view.md`
- `designs/25-create-goal.md`
