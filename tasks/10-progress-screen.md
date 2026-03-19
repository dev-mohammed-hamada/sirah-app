# Task 10: Progress Screen (Son)

## Priority: MEDIUM

## Description

Overview of all learning progress — stages completed, XP, streak history, and weekly activity. Makes the child feel proud of their journey.

## Screen (design 15)

### Summary Cards (horizontal scroll)

- Total XP (Desert Gold gradient, shield icon)
- Streak (Sunset Orange gradient, flame icon, 7-day calendar dots)
- Stars (Royal Purple gradient, format "18/30")

### Stage Progress List

- 10 stages: number, title, stars (1-3), best score
- States: Completed (golden), Current (highlighted + "Now" badge), Locked (grayed + lock)

### Weekly Activity Chart

- Bar chart: XP per day for last 7 days
- Desert Gold bars, Arabic day abbreviations
- Today's bar highlighted with glow

## API Integration

- `GET /progress/me` — totalXp, streak, totalStars, stagesCompleted, stageProgress[]
- Stage progress includes: bestScore, starsEarned per stage

## Acceptance Criteria

- [ ] Summary cards with count-up animations
- [ ] Stage list shows all 10 stages with correct states
- [ ] Weekly activity chart renders
- [ ] Tap completed stage → Stage Detail
- [ ] RTL layout

## References

- `designs/15-progress-screen.md`
