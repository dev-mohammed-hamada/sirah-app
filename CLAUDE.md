# سيرة النبي ﷺ — Seerah App

Duolingo-style Islamic education app for children (6–14). Gamified daily sessions teaching the Seerah. Two roles: **Son** (player), **Father** (monitor).

## Structure & Stack

Monorepo: `mobile/` (Expo + React Native), `backend/` (NestJS), `shared/` (TS types)

- **Mobile:** Expo, TypeScript, Zustand, React Navigation, TanStack Query, Lottie
- **Backend:** NestJS, Prisma ORM, PostgreSQL, Passport.js + JWT
- **Push:** FCM via Firebase Admin SDK | **Real-time:** Socket.io | **Storage:** S3/R2
- **AI:** Offline content generation only — never called at runtime

## Architecture

- REST API (NestJS) → React Native (Axios + TanStack Query)
- WebSocket for father dashboard live updates
- Prisma manages all migrations and schema

## Models

- **User** — accountType `SON|FATHER`, xp, streak, linkedAccounts (m2m self)
- **Stage** — groupId→StageGroup, storyPanels[], quizQuestions[], maxScore
- **StageProgress** — bestScore, starsEarned (0–3), unique [userId, stageId]
- **Goal** — fatherId, sonId, status `ACTIVE|COMPLETED|EXPIRED`
- **QuizQuestion** — types: `MCQ|TRUE_FALSE|ARRANGE|FILL_BLANK|WHO_SAID_IT`

## Game Mechanics

- **Hearts:** 5/session, −1 per wrong, 0 = retry, refill 30min/new day
- **XP:** Per correct answer. Bonuses: Perfect +20, Speed +5, First Try +10. Never resets
- **Stars:** 1–50→1★, 51–80→2★, 81–100→3★. Only highest kept
- **Streak:** ≥1 stage or daily challenge/day. Resets on miss. Milestones: 3,7,14,30
- **Daily Challenge:** 1 question/day from learned content, counts toward streak
- **Unlock:** 24/30 stars in group → next group

## Stage Flow

1. Narrator welcome → 2. Panel+question → 3. Panel+question → 4. Panel (conclusion) → 5. Final quiz (3–5 Qs) → 6. Results → 7. Narrator closing + teaser

- Max 3 sentences/panel, simple Arabic
- No question type repeated >2x in a row

## Account & Linking

- Son works without father. Father links via username (son accepts/declines)
- Son: max 2 fathers. Father: unlimited sons. Either can unlink anytime

## Narrator

- Faceless silhouette, white thobe, always from behind/profile
- 4 states: Neutral, Excited, Encouraging, Celebrating
- Reacts to quiz performance, sends streak reminders

## Git Workflow

- **Branches:** `main` (production) → `develop` (integration) → `feature/<name>` (work)
- **Prefixes:** `feature/`, `fix/`, `chore/`, `refactor/`, `release/`
- **Never push directly to `main` or `develop`** — always via PR
- **PR merges:** squash-merge to `develop`, merge commit to `main`
- **Delete branch after merge**
- **Conventional Commits** enforced — see `/commit` skill

## Environments

- **Local dev:** docker-compose (PostgreSQL, Redis, backend)
- **Secrets:** `.env` files only, never hardcode — use `.env.example` as templates
- **Environments:** development → staging → production

## Code Quality

- TypeScript strict mode everywhere
- Functional components + hooks only
- Zustand = client state, TanStack Query = server state
- Files: `kebab-case.ts` | Components: `PascalCase.tsx`
- Backend: thin controllers, logic in services, DTOs with `class-validator`
- Pre-commit hooks: Husky + lint-staged (auto-lint & format)
- Minimum 70% test coverage for new code

## Prohibitions

- NEVER show faces on human figures
- NEVER call AI APIs at runtime
- NEVER store plain-text passwords — bcrypt only
- NEVER expose secrets in client code
- NEVER use `left`/`right` — use `start`/`end`
- NEVER modify applied migrations

## V1 Scope

10 stages, 1 group, 25 screens (20 son + 5 father), 5 hearts, 30-min refill, 1 daily challenge

**Out of scope:** English, audio narration, social features, leaderboards, IAP, streak freeze, short session mode, father reactions, weekly summary, widgets, badge logic

## Commands

```bash
npm run start               # Expo dev server
npm run start:backend       # NestJS dev server
npm run build               # Production build
npm run prisma:migrate      # Run migrations
npm run prisma:generate     # Regen Prisma client
npm run lint                # ESLint (all workspaces)
npm run test                # Tests (all workspaces)
```

## Skills

Project-specific Claude Code skills in `.claude/skills/`:

- `/commit` — Git commit with Conventional Commits conventions
- `/new-feature` — Create feature branch from develop
- `/release` — Create release branch, bump version, PR to main
- `/ci-local` — Run lint, type-check, tests locally before pushing
- `/docker-up` — Manage local dev environment (docker-compose)
- `/db-migrate` — Create and apply Prisma migration with validation
- `/rtl-check` — Audit code for RTL compliance violations
- `/new-screen` — Scaffold a new React Native screen
- `/new-backend-module` — Scaffold a new NestJS module
- `/seed-stage` — Add stage content to seed data
- `/pr-review` — Review PR against project conventions
