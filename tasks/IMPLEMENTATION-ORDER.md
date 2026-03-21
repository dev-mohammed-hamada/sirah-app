# V1 Implementation Order

Ordered by dependency chain — each task builds on what came before.

| #   | Task                           | Priority | Status  | Depends On |
| --- | ------------------------------ | -------- | ------- | ---------- |
| 23  | Design System Components       | HIGH     | done    | —          |
| 00  | Seed Stage Content             | HIGH     | done    | —          |
| 01  | Auth Screens                   | HIGH     | done    | 23         |
| 02  | Onboarding Screens             | HIGH     | done    | 23, 01     |
| 03  | Splash Screen                  | MEDIUM   | done    | 23, 01     |
| 04  | Home / Journey Map             | HIGH     | done    | 23, 01, 00 |
| 05  | Stage Detail Sheet             | HIGH     | done    | 04         |
| 06  | Stage Flow — Narrator + Panels | HIGH     | done    | 05, 00     |
| 07  | Inline Questions               | HIGH     | done    | 06         |
| 08  | Final Quiz                     | HIGH     | done    | 07         |
| 09  | Celebration / Results          | HIGH     | pending | 08         |
| 22  | Hearts System                  | HIGH     | pending | 07, 08     |
| 12  | Daily Challenge                | MEDIUM   | pending | 08, 00     |
| 10  | Progress Screen                | MEDIUM   | pending | 04         |
| 11  | Goals Screen (Son)             | MEDIUM   | pending | 04         |
| 13  | Awards / Badges Screens        | LOW      | pending | 10         |
| 14  | Settings (Son)                 | MEDIUM   | pending | 23         |
| 15  | Link Request Screen            | MEDIUM   | pending | 01         |
| 16  | Father Home / Sons Tab         | MEDIUM   | pending | 01, 15     |
| 17  | Son Progress (Father View)     | MEDIUM   | pending | 16         |
| 18  | Goals (Father View)            | MEDIUM   | pending | 16         |
| 19  | Settings (Father)              | LOW      | pending | 23         |
| 20  | Push Notifications             | LOW      | pending | 01         |
| 21  | WebSocket Live Updates         | LOW      | pending | 16         |
| 24  | Lottie Animations / Assets     | LOW      | pending | 06, 09     |
| 25  | Unit / Integration Tests       | LOW      | pending | all        |

## Rationale

1. **Design system first** (23) — all UI depends on shared components
2. **Seed content** (00) — all gameplay needs real data to test
3. **Auth flow** (01-03) — entry point for all users
4. **Core gameplay loop** (04-09, 22) — the main value proposition
5. **Supporting son screens** (10-14) — progress, goals, awards, settings
6. **Father features** (15-19) — secondary role
7. **Infrastructure** (20-21, 24-25) — polish and reliability
