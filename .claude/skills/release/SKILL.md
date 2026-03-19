---
name: release
description: Create a release branch from develop, bump version, and prepare PR to main. Use when ready to ship a new version.
user-invocable: true
disable-model-invocation: false
argument-hint: <version>
---

# Create Release

Create a release branch from `develop`, bump version numbers, and prepare a PR to `main`.

## Arguments

- `$ARGUMENTS` — Semantic version (e.g., `1.0.0`, `1.1.0`, `0.2.0`)

## Steps

1. Verify working tree is clean. If dirty, warn and stop
2. Validate version format (must be semver: X.Y.Z)
3. Fetch latest and checkout `develop`: `git fetch origin && git checkout develop && git pull origin develop`
4. Create release branch: `git checkout -b release/$ARGUMENTS`
5. Bump version in:
   - `package.json` (root)
   - `mobile/app.json` (expo.version)
   - `backend/package.json`
6. Commit version bump: `chore: bump version to $ARGUMENTS`
7. Push branch: `git push -u origin release/$ARGUMENTS`
8. Create PR to `main` with:
   - Title: `release: v$ARGUMENTS`
   - Body: changelog summary from commits since last release tag
9. Show PR link and remind user to:
   - Review the PR
   - Merge to `main` after approval
   - Tag the release: `git tag v$ARGUMENTS`
   - Merge `main` back to `develop`

## Rules

- Never skip version bump
- Never create release from a dirty working tree
- Always base release on latest `develop`
