---
name: commit
description: Create a git commit following Sirah project Conventional Commits conventions. Use when the user asks to commit changes.
user-invocable: true
disable-model-invocation: false
argument-hint: [optional message override]
---

# Git Commit — Sirah Conventions

Create a well-formatted git commit following the project's strict conventions.

## Steps

1. Run `git status` and `git diff --staged` to understand what's being committed
2. If nothing is staged, identify relevant changed files and stage them (prefer specific files over `git add .`)
3. Never commit files that contain secrets (`.env`, credentials, keys)
4. Draft a commit message following the rules below
5. Create the commit
6. Show the result

## Commit Message Format

```
<type>(<scope>): <summary>
```

### Types (pick one)
- `feat` — new feature
- `fix` — bug fix
- `chore` — maintenance, deps, configs
- `refactor` — code change that neither fixes nor adds
- `test` — adding or updating tests
- `docs` — documentation only
- `style` — formatting, no logic change
- `perf` — performance improvement
- `ci` — CI/CD changes

### Scopes (pick one)
- `mobile` — Expo/React Native app
- `backend` — NestJS server
- `shared` — shared types package
- `auth` — authentication
- `stages` — stage/quiz content
- `goals` — goals system
- `notifications` — push notifications
- `db` — database/Prisma

### Rules
- Imperative mood, lowercase, max 72 chars
- No period at the end
- No `Co-Authored-By` or AI attribution
- One logical change per commit
- If user provides `$ARGUMENTS`, use it as the summary (still apply type/scope)

### Examples
```
feat(mobile): add splash screen with campfire animation
fix(backend): correct heart refill calculation for edge case
chore(db): add seed data for stages 1-5
refactor(shared): reorganize type exports
test(backend): add unit tests for XP calculation
docs(mobile): add Arabic strings for settings screen
```
