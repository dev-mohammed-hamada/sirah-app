# سيرة النبي ﷺ — Seerah App

A Duolingo-style Islamic education app teaching children (ages 6–14) the biography of Prophet Mohammed ﷺ through gamified daily sessions. Two user types: **Son** (player) and **Father** (monitor/motivator).

---

## Project Structure

Monorepo:
- `mobile/` — React Native (Expo) app for iOS & Android
- `backend/` — NestJS API server
- `shared/` — Shared TypeScript types between mobile and backend

---

## Tech Stack

- **Mobile:** React Native (Expo), TypeScript, Zustand, React Navigation, Axios + TanStack Query, Lottie
- **Backend:** NestJS, TypeScript, Prisma ORM, PostgreSQL
- **Auth:** Passport.js + JWT
- **Push Notifications:** Firebase Cloud Messaging (FCM) via Firebase Admin SDK
- **Real-time:** Socket.io via `@nestjs/websockets` (father dashboard live updates)
- **Storage:** AWS S3 or Cloudflare R2 (illustrations, narrator assets, badges)
- **AI Content Pipeline:** Offline only — AI generates content before release, never called live in-app

---

## Architecture

- RESTful API from NestJS consumed by React Native via Axios + TanStack Query
- WebSocket channel for real-time father dashboard updates
- FCM for all push notifications on both platforms
- Prisma manages all migrations and DB schema

---

## Language & RTL

- V1 is **Arabic only** with full RTL layout
- Use `I18nManager.forceRTL(true)` at app entry
- Never hardcode `left`/`right` in styles — use `start`/`end` logical properties
- Never hardcode Arabic strings outside of a centralized locale/constants file
- Never add English UI strings in V1

---

## Core Data Models

- **User** — id, displayName, age, username (unique), accountType (`SON | FATHER`), xp, streak, lastActiveDate, linkedAccounts (many-to-many self-relation)
- **Stage** — id, groupId (FK → StageGroup), orderIndex, title, arabicTitle, storyPanels[], quizQuestions[], maxScore
- **StageProgress** — id, userId, stageId, bestScore, starsEarned (0–3), completedAt, attempts. Unique on [userId, stageId]
- **Goal** — id, fatherId, sonId, description, stageGroupId, deadline, rewardDescription, status (`ACTIVE | COMPLETED | EXPIRED`)
- **QuizQuestion** — id, stageId, type (`MCQ | TRUE_FALSE | ARRANGE | FILL_BLANK | WHO_SAID_IT`), questionText, options (JSON), correctAnswer, xpValue

---

## Game Mechanics

- **Hearts:** 5 per session. Wrong answer = −1 heart. 0 hearts = session ends, must retry. Refill after 30 min or new day.
- **XP:** Awarded per correct answer. Bonuses: Perfect Run +20, Speed Bonus +5/question, First Try +10. XP never resets.
- **Stars:** 3-star rating per stage. 1–50 → 1★, 51–80 → 2★, 81–100 → 3★. Only highest score kept on replay — stars never decrease.
- **Streak:** Consecutive days with ≥1 completed stage or daily challenge. Resets to 0 on miss. Milestones at 3, 7, 14, 30 days.
- **Daily Challenge:** 1 mini-question/day from already-learned content (spaced repetition). Counts toward streak. ~30 seconds.
- **Stage unlock:** Need 24/30 stars in a group to unlock the next group.

---

## Stage Structure

Every stage follows this fixed sequence:
1. Narrator Welcome Screen
2. Story Panel 1 → Inline Question
3. Story Panel 2 → Inline Question
4. Story Panel 3 (conclusion)
5. Final Quiz (3–5 questions)
6. Results Screen (stars + XP + celebration)
7. Narrator closing + next stage teaser

Rules:
- Each story panel: max 3 sentences, simple Arabic, age-appropriate vocabulary
- No stage repeats the same question type more than twice in a row

---

## Account & Linking

- Son creates account independently — app works fully without a father linked
- Father sends link request via son's username; son must Accept or Decline
- Son can have up to 2 linked fathers; father can link multiple sons
- Either party can unlink at any time in Settings

---

## Narrator Character

- Wise old man — faceless silhouette in white thobe, always from behind or in profile
- Has 4 illustrated states: Neutral, Excited, Encouraging, Celebrating
- Appears at the start of every stage with a welcome line
- Reacts to quiz performance — celebrates correct answers, gently encourages on wrong ones
- Sends streak reminder notifications in his voice

---

## Content & Visual Guidelines

- All Seerah content sourced from Ibn Hisham and Ibn Kathir (Al-Bidaya wa Al-Nihaya)
- All content reviewed by an Islamic reviewer before publishing
- **All human figures are faceless silhouettes — no exceptions**
- Color palette: warm golds, deep blues, sandy oranges, night sky purples
- Settings: Arabian Peninsula — desert, tents, mountains, old Mecca architecture, starry sky, fire

---

## Code Conventions

- TypeScript strict mode in all files
- Functional React components with hooks — never class components
- Zustand for client state (hearts, XP, streak, quiz logic)
- TanStack Query for all server state and caching
- Files: kebab-case (`stage-progress.service.ts`)
- Components: PascalCase (`JourneyMap.tsx`)
- Backend grouped by NestJS modules: `users`, `stages`, `goals`, `notifications`, `auth`
- Controllers are thin — all business logic lives in services
- Validate all DTOs with `class-validator` decorators
- All API endpoints follow RESTful conventions

---

## Commands

```bash
# Mobile
npm run start          # Start Expo dev server
npm run build          # Build production bundle

# Backend / Database
npx prisma migrate dev # Run database migrations
npx prisma generate    # Regenerate Prisma client
npx prisma studio      # Open Prisma database GUI

# Quality
npm run lint           # Run ESLint
npm run test           # Run test suite
```

---

## Testing

- Unit tests for all service methods
- Integration tests for all API endpoints
- Test RTL layout rendering on both iOS and Android
- Test heart refill timing, streak reset logic, and star calculation edge cases

---

## Prohibitions

- NEVER show faces on any human figure illustration
- NEVER call AI APIs at runtime — content is pre-generated offline only
- NEVER store plain-text passwords — always hash with bcrypt
- NEVER expose JWT secrets or Firebase keys in client code
- NEVER use `left`/`right` in styles — use logical `start`/`end` properties
- NEVER modify migration files after they have been applied

---

## V1 Scope

- 10 stages, 1 group, 30 total stars, 24 needed to advance
- 5 hearts/session, 30-min refill, 1 daily challenge/day
- 5–10 min session length, 3–5 final + 2 inline quiz questions per stage
- 25 screens total (20 son + 5 father)

## Out of Scope for V1

Do not implement or suggest the following — they are planned for V2 or later:
- English or non-Arabic languages
- Audio narration (text only in V1)
- Social features, leaderboards, friend comparison
- In-app purchases or subscriptions
- Streak Freeze, Short Session Mode, Father Reaction feature
- Weekly Summary notifications, home screen widget
- Final badge designs and trigger logic

---

## Website (separate deliverable)

Marketing site targeting Muslim fathers. Primary CTA: drive app downloads.
Pages: Home, About Us, Who Is This For, What Do We Offer, Download, Contact.
Stack not yet defined — keep separate from the mobile/backend codebase.

---

## Git & GitHub Conventions

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
<type>(<scope>): <short summary>

[optional body — explain WHY, not WHAT]
```

Types: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`, `style`, `perf`, `ci`

Scopes: `mobile`, `backend`, `shared`, `auth`, `stages`, `goals`, `notifications`, `db`

Examples:
```
feat(stages): add inline question after story panel
fix(auth): correct JWT expiry handling on token refresh
chore(db): add StageGroup migration
test(goals): add unit tests for goal expiry logic
```

Rules:
- Summary in imperative mood, lowercase, no period
- Max 72 chars in subject line
- Body explains motivation, not implementation
- Never use `Co-Authored-By` or AI attribution lines in commits
- One logical change per commit — do not batch unrelated changes
- Always run lint and tests before committing

### Branching Strategy (GitHub Flow)
```
main          ← always deployable, protected
  └─ feat/stage-unlock-logic
  └─ fix/heart-refill-timer
  └─ chore/prisma-migrate-goals
  └─ ci/add-lint-workflow
```

- `main` is protected — never push directly
- Branch names: `<type>/<short-kebab-description>`
- Open a PR for every change — no direct merges to `main`
- PR title follows the same Conventional Commits format
- Squash-merge PRs to keep `main` history linear
- Delete branches after merge

### Pull Requests
- Keep PRs small and focused — one feature or fix per PR
- PR description must include: what changed, why, and how to test
- At least 1 review required before merge (when team grows)
- Link related issues in the PR body with `Closes #<issue>`
- All CI checks must pass before merge

---

## CI/CD — GitHub Actions

### Recommended Pipelines

#### 1. `ci.yml` — Runs on every PR and push to `main`
```yaml
Jobs:
  - lint          # ESLint for mobile/ and backend/
  - type-check    # tsc --noEmit for all packages
  - test          # Unit + integration tests
  - build-check   # Verify the app builds without errors
```

#### 2. `deploy-backend.yml` — Runs on merge to `main`
```yaml
Jobs:
  - run-migrations   # prisma migrate deploy
  - deploy           # Push NestJS to hosting (Railway / Render / Fly.io)
```

#### 3. `deploy-mobile.yml` — Triggered manually or on release tag
```yaml
Jobs:
  - eas-build-ios      # expo build via EAS for iOS
  - eas-build-android  # expo build via EAS for Android
```

#### 4. `security.yml` — Runs weekly
```yaml
Jobs:
  - dependency-audit   # npm audit for all packages
  - secret-scan        # gitleaks or trufflehog to detect leaked secrets
```

### Environment Variables & Secrets

All secrets and config are stored in `.env` files — never hardcoded in source code.

#### `.env` file structure per package:
```
# backend/.env
DATABASE_URL=
JWT_SECRET=
FIREBASE_ADMIN_KEY=
S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_BUCKET=
S3_REGION=

# mobile/.env
API_BASE_URL=
```

Rules:
- `.env` files are **always** in `.gitignore` — never committed
- Provide a `.env.example` file in each package with all keys listed but no values
- Local dev uses `.env`, staging/prod uses real values injected via hosting platform
- In GitHub Actions, secrets are stored in GitHub → Settings → Secrets and referenced via `${{ secrets.NAME }}`
- Never log or print env values, even in dev

### Rules
- All secrets injected via GitHub Actions secrets — never in code
- Prisma migrations run in CI before deploy, never manually on prod
- EAS builds triggered only from tagged releases (`v1.0.0`, `v1.1.0`, …)
- Failed CI blocks the PR merge — fix before merging, never skip
