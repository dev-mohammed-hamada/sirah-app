---
name: merge-pr
description: Review and merge a pull request with quality checks. Runs pr-review first, checks CI status, then squash-merges to target branch and cleans up.
user-invocable: true
disable-model-invocation: false
argument-hint: <pr-number>
---

# Merge Pull Request

Review, validate, and merge a PR following project conventions.

## Arguments

- `$ARGUMENTS` — PR number (e.g., `2`) or omit to auto-detect from current branch

## Steps

1. **Identify the PR:**
   - If a number is given, use it directly
   - If omitted, detect from current branch: `gh pr view --json number`
   - If no PR found, warn and stop

2. **Run `/pr-review`** on the PR:
   - MUST invoke `pr-review` via the Skill tool — do NOT review manually or inline
   - Pass the PR number as the argument: `/pr-review <number>`
   - If the review finds blocking issues, list them and ask the user whether to proceed or fix first
   - Non-blocking suggestions can be noted but should not block the merge

3. **Check CI status:**
   - Run `gh pr checks <number>` to verify all checks passed
   - If checks are failing or pending, warn the user and ask whether to wait or proceed

4. **Confirm with user:**
   - Show PR title, target branch, and number of commits
   - Ask for final confirmation before merging

5. **Merge the PR:**
   - To `develop`: squash merge (`gh pr merge <number> --squash --delete-branch`)
   - To `main`: merge commit (`gh pr merge <number> --merge --delete-branch`)
   - Delete the remote branch after merge (handled by `--delete-branch`)

6. **Post-merge cleanup:**
   - Switch to the target branch locally: `git checkout <target>`
   - Pull latest: `git pull origin <target>`
   - Delete the local feature branch if it exists
   - Show confirmation with merged PR URL

## Rules

- ALWAYS run pr-review before merging — never skip the review step
- ALWAYS confirm with the user before merging
- Squash merge to `develop`, merge commit to `main`
- Delete the branch after merge (both remote and local)
- If the PR has merge conflicts, warn the user and stop — do not force merge
- Never merge to `main` directly from a feature branch — it should go through `develop` first

## Examples

```
/merge-pr 2        → reviews and merges PR #2
/merge-pr          → detects PR from current branch, reviews, and merges
```
