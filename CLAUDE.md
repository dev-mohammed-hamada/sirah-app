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

## Language & RTL

- V1 is **Arabic only**, full RTL
- `I18nManager.forceRTL(true)` at entry
- Use `start`/`end` — never `left`/`right`
- All strings in centralized locale files

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

## Visual Guidelines

- Content from Ibn Hisham & Ibn Kathir — reviewed by Islamic reviewer
- **All human figures: faceless silhouettes — no exceptions**
- Palette: warm golds, deep blues, sandy oranges, night purples
- Settings: desert, tents, mountains, old Mecca, starry sky

## Code Conventions

- TypeScript strict mode everywhere
- Functional components + hooks only
- Zustand = client state, TanStack Query = server state
- Files: `kebab-case.ts` | Components: `PascalCase.tsx`
- Backend modules: `users`, `stages`, `goals`, `notifications`, `auth`
- Thin controllers — logic in services
- DTOs validated with `class-validator`
- RESTful endpoints

## Commands

```bash
npm run start               # Expo dev server
npm run build               # Production build
npx prisma migrate dev      # Run migrations
npx prisma generate         # Regen Prisma client
npm run lint                # ESLint
npm run test                # Tests
```

## Testing

- Unit tests for services, integration tests for endpoints
- Test RTL on both platforms
- Test hearts, streaks, stars edge cases

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

## Git Conventions

**Commits:** Conventional Commits — `<type>(<scope>): <summary>`
- Types: `feat|fix|chore|refactor|test|docs|style|perf|ci`
- Scopes: `mobile|backend|shared|auth|stages|goals|notifications|db`
- Imperative mood, lowercase, max 72 chars, no period
- No `Co-Authored-By` or AI attribution
- One logical change per commit

**Branches:** `main` (protected, always deployable) → `<type>/<kebab-description>`
- PR for every change, squash-merge, delete branch after merge
- All CI must pass before merge

## CI/CD (GitHub Actions)

- **ci.yml** (every PR): lint → type-check → test → build-check
- **deploy-backend.yml** (merge to main): migrations → deploy
- **deploy-mobile.yml** (release tag): EAS build iOS + Android
- **security.yml** (weekly): npm audit + secret scan

## Environment & Secrets

- All secrets in `.env` files — never in code, never committed
- `.env.example` in each package (keys only, no values) — committed
- GitHub Actions secrets via `${{ secrets.NAME }}`
- Never log env values
- Backend: `DATABASE_URL`, `JWT_SECRET`, `FIREBASE_ADMIN_KEY`, `S3_*`
- Mobile: `API_BASE_URL`
