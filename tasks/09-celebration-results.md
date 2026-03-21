# Task 09: Celebration / Results Screen

## Priority: HIGH (the reward moment)

## Description

THE dopamine moment — spectacular celebration after completing a stage. Must feel amazing, especially for 3-star completions. Drives replay and retention.

## Screen (design 14)

### Visual Elements

- Desert Horizon gradient with floating golden particles
- 3 large stars (80px): earned = golden+glowing, unearned = gray outline
- Score display: "87/100" (Cairo Black 48px, ticks up from 0)
- XP earned pill: "+45 XP" with breakdown
- Streak update: flame animation with day count
- Narrator reaction (3 states based on performance)

### Narrator Reactions

- **3 stars (81-100):** Celebrating — "Excellent, my hero!" + confetti explosion
- **2 stars (51-80):** Excited — "Great job! Can you get 3 stars?"
- **1 star (1-50):** Encouraging — "Good start! Try again for more stars"

### Special Effects

- "No mistakes!" perfect run banner
- "So Close" effect: near-threshold prompt to retry
- Narrator closing + next stage teaser (curiosity hook)

### Action Buttons

- "Next Stage" (Primary)
- "Retry" (Secondary)
- "Back to Map" (text link)

## Animation Sequence (~3.5s)

1. Golden flash
2. Stars fly in and fill sequentially
3. Perfect banner unfurls (if applicable)
4. Confetti explosion (3 stars only)
5. Score ticks up from 0
6. XP pill bounces in
7. Streak flame grows
8. Narrator slides in with emotion
9. Speech typewriter
10. Buttons fade in

## Haptic + Sound

- Star reveal: light impact
- Score tick-up: rapid taps
- 3-star confetti: heavy success
- Ascending chimes per star, fanfare for 3 stars

## Acceptance Criteria

- [x] Stars display based on score thresholds
- [x] Score ticks up animation
- [x] XP breakdown shows bonuses
- [x] Narrator reacts based on performance
- [x] Confetti for 3 stars
- [x] "So Close" effect near thresholds
- [x] Next stage teaser displays
- [x] All 3 action buttons work
- [x] Streak updates correctly

## References

- `designs/14-celebration-results.md`
- `designs/27-animations-assets.md` — confetti, star burst, narrator states
