# Task 22: Hearts System (Frontend Integration)

## Priority: HIGH (core game mechanic)

## Description

Integrate the hearts (lives) system into the frontend. Hearts are consumed on wrong answers, refill over time, and gate stage access.

## Rules

- 5 hearts per session
- -1 heart per wrong answer
- 0 hearts = session ends (retry modal)
- Hearts refill fully after 30 minutes OR at midnight
- Hearts display in Top Status Bar and stage screens

## Frontend Components

- Hearts display (top bar): 5 heart icons, filled/empty states
- Heart break animation on wrong answer (Lottie 500ms)
- Refill countdown timer (MM:SS format)
- 0-hearts modal with retry options
- Hearts indicator on Stage Detail sheet

## Backend (already implemented)

- `GET /progress/hearts` — { remaining, lastLostAt, nextRefillAt }
- Hearts tracked in `hearts.service.ts`

## Zustand Store

- `heartsRemaining: number`
- `nextRefillAt: Date | null`
- `decrementHeart()`
- `refillHearts()`
- Timer logic for countdown

## Acceptance Criteria

- [ ] Hearts display in status bar (5 heart icons)
- [ ] Heart break animation on wrong answer
- [ ] Hearts decrement correctly
- [ ] 0-hearts modal prevents continuing
- [ ] Refill countdown shows remaining time
- [ ] Hearts refill after 30 min or midnight
- [ ] Stage Detail checks hearts before allowing play

## References

- `Prophet_Mohammed_Project_Description_Final.md` §6.1
- `designs/13-final-quiz.md` — hearts depletion modal
- `backend/src/progress/hearts.service.ts`
