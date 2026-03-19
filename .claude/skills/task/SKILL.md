---
name: task
description: Start working on a V1 task by reading its definition from tasks/ folder. Ensures continuity across conversations by loading the full task spec before implementation.
user-invocable: true
disable-model-invocation: false
argument-hint: <task-number-or-name>
---

# Work on Task

Load a task definition from the `tasks/` folder and begin implementation with full context.

## Arguments

- `$ARGUMENTS` — Task number (e.g., `04`) or partial name (e.g., `journey-map`, `auth`)

## Steps

1. **Show implementation order:**
   - Read `tasks/IMPLEMENTATION-ORDER.md` and display the current progress (which tasks are done, which is next)
   - Highlight the task being loaded and its position in the order

2. **Find the task file:**
   - If a number is given (e.g., `04`), open `tasks/04-*.md`
   - If a name is given (e.g., `journey-map`), search `tasks/` for a matching filename
   - If no argument, list all tasks and ask which one to work on

3. **Read the full task file** from `tasks/` and understand:
   - Priority level
   - Description and scope
   - Screen specs and design references
   - API integration points
   - Technical requirements
   - Acceptance criteria

4. **Read referenced design docs** listed in the task's References section (from `designs/` folder) to get full visual and interaction specs

5. **Check current progress:**
   - Look at existing code related to this task (screens, services, components)
   - Check git log for related commits
   - Identify what's already done vs what remains

6. **Present implementation plan** to the user before coding:
   - What will be built (files to create/modify)
   - Order of implementation
   - Any dependencies on other tasks
   - Any blockers or open questions

7. **Implement** only after user confirms the plan:
   - Follow all project conventions (RTL, kebab-case files, PascalCase components, etc.)
   - Use the acceptance criteria as a checklist
   - Run `/ci-local` after significant changes

8. **Update the task file** — check off completed acceptance criteria as you go:
   - `- [ ]` → `- [x]` for completed items
   - Add notes if scope changed

9. **Update the implementation order** — when a task is completed, update `tasks/IMPLEMENTATION-ORDER.md`:
   - Change the task's status from `pending` to `done`

## Rules

- Always read `tasks/IMPLEMENTATION-ORDER.md` first to show progress and context
- Always read the task file — never work from memory alone
- Always read the referenced design docs before implementing UI
- Never skip the plan step — confirm with the user before writing code
- Follow task dependencies (e.g., task 23 design system should come before UI tasks)
- One task per `/task` invocation — don't mix tasks
- Use `/new-feature` to create a branch if not already on a feature branch
- Use `/commit` for commits and `/create-pr` for PRs when done

## Examples

```
/task 04                → loads task 04 (Home / Journey Map)
/task auth              → loads task 01 (Auth Screens)
/task daily-challenge   → loads task 12 (Daily Challenge)
/task                   → lists all tasks and asks which one
```
