# Task 12: Daily Challenge Screen

## Priority: MEDIUM (streak maintenance)

## Description

Quick 30-second single question from learned content. Counts toward daily streak even if answered wrong. Lowers barrier to maintaining streaks.

## Screen (design 19)

### Active State

- Royal Purple to Deep Night Blue gradient with stars
- 80px circular countdown timer (30s, depletes clockwise)
- Timer color: Desert Gold → Sunset Orange (<10s) → pulses (<3s)
- Question card (same as Final Quiz dark style)
- Lightning bolt icon

### Result States

- **Correct:** "+15 XP" star burst, gold particles, streak confirmed
- **Wrong:** Correct answer revealed, "Try tomorrow!", streak STILL maintained
- **Already Completed:** Grayed version, countdown to next challenge
- **Timer Expired:** Ring flashes red, auto-submits as wrong

## API Integration

- `GET /daily-challenge` — today's question (or already-completed status)
- `POST /daily-challenge/submit` — { questionId, selectedAnswer }

## Technical

- Timer runs client-side (30s countdown)
- Question drawn from completed stages (spaced repetition)
- Streak maintained regardless of correct/wrong

## Acceptance Criteria

- [x] 30s timer works with color transitions
- [x] Question renders (any of 5 types)
- [x] Correct/wrong feedback with appropriate animations
- [x] Streak maintained even on wrong answer
- [x] Already-completed state with next-challenge countdown
- [x] Timer expiry auto-submits

## References

- `designs/19-daily-challenge.md`
- `Prophet_Mohammed_Project_Description_Final.md` §6.5
