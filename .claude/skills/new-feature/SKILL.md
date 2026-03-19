---
name: new-feature
description: Create a new feature branch from latest develop with proper naming convention. Use when starting work on a new feature, fix, or chore.
user-invocable: true
disable-model-invocation: false
argument-hint: <feature-name>
---

# Create Feature Branch

Create a new feature branch from the latest `develop` branch following project conventions.

## Arguments

- `$ARGUMENTS` — Branch name suffix (e.g., `auth-refresh`, `splash-screen`, `heart-refill-bug`)

## Steps

1. Verify working tree is clean (`git status`). If dirty, warn the user and stop
2. Fetch latest from remote: `git fetch origin`
3. Checkout `develop` and pull latest: `git checkout develop && git pull origin develop`
4. Determine branch prefix from the name:
   - If name contains `fix` or `bug` → `fix/`
   - If name contains `chore`, `config`, `setup`, `ci` → `chore/`
   - If name contains `refactor` → `refactor/`
   - Otherwise → `feature/`
   - User can override by providing prefix explicitly (e.g., `fix/heart-refill`)
5. Create and checkout new branch: `git checkout -b <prefix><name>`
6. Push branch and set upstream: `git push -u origin <prefix><name>`
7. Show confirmation with branch name and next steps

## Naming Rules

- All lowercase, kebab-case
- Short and descriptive (2-4 words)
- No ticket numbers unless user provides them

## Examples

```
/new-feature auth-refresh      → feature/auth-refresh
/new-feature splash-screen     → feature/splash-screen
/new-feature fix/heart-refill  → fix/heart-refill
/new-feature chore/husky-setup → chore/husky-setup
```
