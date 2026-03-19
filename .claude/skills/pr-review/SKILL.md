---
name: pr-review
description: Review a pull request for Sirah project code quality, conventions compliance, and potential issues.
user-invocable: true
disable-model-invocation: false
allowed-tools: Read, Grep, Glob, Bash
context: fork
agent: Explore
argument-hint: [pr-number]
---

# Pull Request Review

Review PR #$ARGUMENTS against Sirah project conventions.

## Get PR Context

Fetch the PR diff and details:

- !`gh pr diff $ARGUMENTS`
- !`gh pr view $ARGUMENTS`

## Checklist

### Code Conventions

- [ ] Files use `kebab-case.ts`, components use `PascalCase.tsx`
- [ ] TypeScript strict mode — no `any` types
- [ ] Functional components + hooks only (no class components)
- [ ] Backend: thin controllers, logic in services
- [ ] DTOs validated with `class-validator`

### RTL Compliance

- [ ] No `left`/`right` in styles — uses `start`/`end`
- [ ] All strings in `i18n/ar.ts`, not hardcoded
- [ ] No `I18nManager` hacks

### Security

- [ ] No plain-text passwords (bcrypt only)
- [ ] No secrets in client code
- [ ] No `any` casts that bypass validation
- [ ] Correct answer never sent to client (server-side validation only)

### Islamic Content

- [ ] All human figures are faceless silhouettes
- [ ] No face depictions in any asset references
- [ ] Content historically accurate per Ibn Hisham/Ibn Kathir

### State Management

- [ ] Zustand for client state only
- [ ] TanStack Query for server state
- [ ] No server data duplicated in Zustand stores

### Game Mechanics

- [ ] Hearts, XP, stars calculations match spec
- [ ] Streak logic handles edge cases (same day, yesterday, older)
- [ ] Star thresholds: 1-50→1★, 51-80→2★, 81-100→3★

### Git

- [ ] Conventional Commits format: `type(scope): summary`
- [ ] One logical change per commit
- [ ] No AI attribution in commits

## Output

Provide a structured review with:

1. **Summary** — what the PR does
2. **Issues** — bugs, convention violations, security concerns
3. **Suggestions** — improvements, not blockers
4. **Verdict** — Approve / Request Changes / Comment
