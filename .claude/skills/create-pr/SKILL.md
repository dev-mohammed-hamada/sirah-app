---
name: create-pr
description: Create a pull request on GitHub following Sirah project conventions. Use when the user asks to create or open a PR.
user-invocable: true
disable-model-invocation: false
argument-hint: [optional target branch, defaults to develop]
---

# Create Pull Request — Sirah Conventions

Create a well-formatted GitHub pull request following project conventions.

## Steps

1. Determine the target branch:
   - If `$ARGUMENTS` is provided, use it as the target branch
   - Default: `develop`
   - If current branch is a `release/` branch, target `main`
2. Run `git status` to check for uncommitted changes — warn the user if any exist
3. Check if the current branch has been pushed to remote; if not, push with `-u`
4. Run `git log --oneline <target>..HEAD` and `git diff <target>...HEAD --stat` to understand all changes
5. Draft the PR title and body following the rules below
6. Create the PR using `gh pr create`
7. Return the PR URL

## PR Title Format

```
<type>(<scope>): <summary>
```

- Same types and scopes as the `/commit` skill
- If the branch has a single commit, match its message
- If multiple commits, summarize the overall change
- Max 70 characters
- Imperative mood, lowercase, no period

## PR Body Format

Use this exact template:

```markdown
## Summary

<1-3 concise bullet points describing what changed and why>

## Changes

<bulleted list of specific changes, grouped by area if needed>

## Test Plan

<bulleted checklist of how to verify the changes work>
```

## Rules

- **No AI attribution** — no `Co-Authored-By`, no "Generated with Claude Code", no watermarks of any kind
- **No emojis** in title or body
- **Squash merge** to `develop`, merge commit to `main` — mention this if relevant
- One logical change per PR when possible
- Reference related issues if mentioned by the user (e.g., `Closes #123`)
- Keep the body concise — no filler text, no unnecessary context
- Use `--body` with a HEREDOC for correct formatting

## Examples

### Title examples

```
feat(mobile): add splash screen with campfire animation
fix(backend): correct heart refill calculation
chore(shared): add husky and lint-staged setup
```

### Body example

```markdown
## Summary

- Add pre-commit hooks to enforce code quality on every commit
- Configure ESLint, Prettier, and commitlint for the monorepo

## Changes

- Add Husky with pre-commit and commit-msg hooks
- Add ESLint flat config for backend and shared workspaces
- Add commitlint with Conventional Commits enforcement
- Add lint-staged config to run linters on staged files only
- Fix existing lint warnings and auto-format codebase

## Test Plan

- [ ] Pre-commit hook runs lint-staged on staged files
- [ ] Commit-msg hook rejects non-conventional messages
- [ ] `npm run lint:fix` works
- [ ] `npm run format:check` passes
```
