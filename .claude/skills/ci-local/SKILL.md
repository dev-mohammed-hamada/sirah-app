---
name: ci-local
description: Run the full CI check suite locally (lint, type-check, tests) before pushing. Use to catch issues before they hit the pipeline.
user-invocable: true
disable-model-invocation: false
argument-hint: [--fix]
---

# Local CI Check

Run all CI checks locally to catch issues before pushing. Mirrors what GitHub Actions will run on PRs.

## Arguments

- `--fix` (optional) — Auto-fix lint and formatting issues instead of just reporting

## Steps

1. Show what will be checked: lint, type-check, tests
2. Run checks sequentially, reporting results for each:

### Step 1: Lint

```bash
# Report only
npm run lint --workspaces --if-present

# If --fix flag provided
npm run lint -- --fix --workspaces --if-present
```

### Step 2: Type Check

```bash
npx tsc --noEmit --project shared/tsconfig.json
npx tsc --noEmit --project backend/tsconfig.json
npx tsc --noEmit --project mobile/tsconfig.json
```

### Step 3: Tests

```bash
npm run test --workspaces --if-present
```

3. Show summary table:
   - Lint: pass/fail
   - Type-check: pass/fail (per workspace)
   - Tests: pass/fail (with count)
4. If any check fails, show the errors clearly and suggest fixes
5. If all pass, confirm ready to push

## Rules

- Always run all checks even if an earlier one fails
- Show clear pass/fail status for each step
- If `--fix` is used, re-run lint after fixing to confirm clean
