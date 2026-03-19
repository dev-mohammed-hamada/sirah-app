# Task 25: Unit & Integration Tests

## Priority: MEDIUM (quality gate)

## Description

Add tests across the codebase targeting 70% minimum coverage for new code. Backend services are the highest priority.

## Backend Tests (Jest)

### Services (unit tests)

- `auth.service.spec.ts` — register, login, JWT generation, password hashing
- `users.service.spec.ts` — profile, linking, unlinking, search
- `progress.service.spec.ts` — submit answer, complete stage, scoring, XP calculation
- `hearts.service.spec.ts` — decrement, refill logic, time-based refill
- `xp.service.spec.ts` — XP calculation, bonuses (perfect, speed, first try)
- `stages.service.spec.ts` — list stages, get stage detail, questions
- `goals.service.spec.ts` — create goal, update status, expiration
- `daily-challenge.service.spec.ts` — question selection, submission, streak credit

### Controllers (integration tests)

- Auth flow (register → login → access protected route)
- Stage completion flow (start → answer questions → complete)
- Father-son linking flow

### Game Mechanics

- Star thresholds: 1-50→1★, 51-80→2★, 81-100→3★
- Hearts: 5 max, decrement, refill after 30min
- Streak: increment on completion, reset on miss
- XP bonuses: perfect +20, speed +5, first try +10

## Mobile Tests

- Zustand stores: auth-store, quiz-store
- Utility functions: storage.ts, rtl.ts

## Technical

- Backend: Jest with ts-jest (already configured)
- Use `@nestjs/testing` for module testing
- Prisma mock or test database
- CI runs tests with `--passWithNoTests` (already configured)

## Acceptance Criteria

- [ ] Backend services have unit tests
- [ ] Game mechanic edge cases covered
- [ ] Auth flow integration test
- [ ] 70% coverage on new code
- [ ] Tests pass in CI

## References

- `CLAUDE.md` — "Minimum 70% test coverage for new code"
