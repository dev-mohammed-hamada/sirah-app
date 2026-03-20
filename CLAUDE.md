# سيرة النبي ﷺ — Seerah App

Duolingo-style Islamic education app for children (6–14). Gamified daily sessions teaching the Seerah. Two roles: **Son** (player), **Father** (monitor).

## Structure

Monorepo: `mobile/` (Expo + React Native), `backend/` (NestJS), `shared/` (TS types)

- **Mobile:** Expo, TypeScript, Zustand, React Navigation, TanStack Query, Lottie
- **Backend:** NestJS, Prisma ORM, PostgreSQL, Passport.js + JWT
- **Push:** FCM via Firebase Admin SDK | **Real-time:** Socket.io | **Storage:** S3/R2

## Environments

- **Local dev:** docker-compose (PostgreSQL, Redis, backend)
- **Secrets:** `.env` files only — use `.env.example` as templates
- **Environments:** development → staging → production

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
- `/create-pr` — Create a PR on GitHub with proper conventions
- `/pr-review` — Review PR against project conventions
- `/merge-pr` — Review and merge a PR with quality checks
- `/task` — Load and start working on a V1 task from `tasks/` folder
- `/explain` — Create or read detailed explanation docs in `explains/` folder
