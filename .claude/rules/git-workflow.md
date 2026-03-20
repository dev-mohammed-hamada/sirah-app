---
description: Git branching, commit, PR, and merge conventions
---

## Branches

- `main` (production) -> `develop` (integration) -> `feature/<name>` (work)
- Prefixes: `feature/`, `fix/`, `chore/`, `refactor/`, `release/`
- Never push directly to `main` or `develop` — always via PR
- Delete branch after merge

## Commits (Conventional Commits)

Format: `<type>(<scope>): <summary>`

Types: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`, `style`, `perf`, `ci`

Scopes: `mobile`, `backend`, `shared`, `auth`, `stages`, `goals`, `notifications`, `db`

- Imperative mood, lowercase, max 72 chars, no period
- No `Co-Authored-By` or AI attribution
- One logical change per commit

## Pull Requests

- PR title: same format as commits, max 70 chars
- PR body: `## Summary`, `## Changes`, `## Test Plan` sections
- No AI attribution, no emojis in title or body
- Squash merge to `develop`, merge commit to `main`
- Always run `/pr-review` before merging

## Branch Naming

- All lowercase, kebab-case, 2-4 words
- Auto-detect prefix: `fix/` if name contains "fix"/"bug", `chore/` if "chore"/"config"/"setup"/"ci", `refactor/` if "refactor", else `feature/`
