# Task 08: Final Quiz (End-of-Stage Assessment)

## Priority: HIGH (core gameplay + scoring)

## Description

3-5 questions at the end of each stage that determine the score and stars. More serious feel than inline questions, with speed bonuses and enhanced feedback.

## Screen (design 13)

- Deep Night Blue gradient background (serious feel)
- Question counter "Question 3 of 5" with progress dots
- Hearts display
- Question card with gradient border (Royal Purple to Deep Night Blue)
- Same 5 question types as inline questions (dark theme adapted)

### Speed Bonus Timer

- Circular depleting ring around question number
- Turns Sunset Orange under 3s
- "Speed Bonus" indicator when answered quickly (+5 XP)

### Enhanced Feedback

- Correct: star burst particles (600ms)
- Wrong: subtle screen shake (2 shakes, 200ms)
- 500ms breathing pause between questions

### Hearts Depletion (0 hearts)

- All-hearts-crack animation
- Dark overlay with modal
- Retry options + refill countdown timer
- Cannot continue stage

## Scoring

- Base XP per correct answer (from question's `xpValue`)
- +5 XP speed bonus (answer within time threshold)
- +20 XP perfect run (all correct)
- +10 XP first try (first attempt at this stage)
- Score = (correct / total) × 100
- Stars: 1-50 → 1★, 51-80 → 2★, 81-100 → 3★

## API Integration

- `POST /progress/submit-answer` — per question
- `POST /progress/complete-stage` — { stageId, answers[], totalTime }
- Response: score, starsEarned, xpEarned, bonuses

## Acceptance Criteria

- [x] 3-5 questions render with dark theme
- [x] Speed bonus timer works
- [x] Progress dots update per question
- [x] Scoring calculates correctly
- [x] Hearts depletion modal shows at 0 hearts
- [x] Auto-transitions to Celebration screen
- [x] All 5 question types work in dark theme

## References

- `designs/13-final-quiz.md`
- `Prophet_Mohammed_Project_Description_Final.md` §6.2, §6.3
