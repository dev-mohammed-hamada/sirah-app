---
name: explain
description: Create or read a detailed explanation document in the explains/ folder. Use to explain any part of the codebase, architecture, concept, or workflow.
user-invocable: true
disable-model-invocation: false
argument-hint: <topic or number>
---

# Explain

Create or retrieve a detailed explanation document in the `explains/` folder.

## Arguments

- `$ARGUMENTS` — Topic to explain (e.g., `auth flow`, `hearts system`, `prisma`) or a number to read an existing doc (e.g., `01`)

## Steps

### When creating a new explanation:

1. **Determine the next number:**
   - List files in `explains/` and find the next available number (e.g., if `01-...md` exists, next is `02`)

2. **Research the topic thoroughly:**
   - Read all relevant source files (services, controllers, schemas, components, configs)
   - Read related design docs in `designs/` if applicable
   - Check shared types and constants in `shared/`
   - Trace the full flow from frontend to backend to database and back

3. **Write the explanation file** at `explains/<number>-<kebab-case-topic>.md`:
   - Use clear headings and table of contents
   - Include diagrams (ASCII) where they help understanding
   - Use tables for structured data (columns, endpoints, constants)
   - Show data flow with arrow diagrams
   - Include code snippets only when they clarify a concept
   - Write in English, keep Arabic strings as-is when referencing code
   - End with a date reference line

4. **Present a summary** to the user after writing

### When reading an existing explanation:

1. **Find the file:**
   - If a number is given (e.g., `01`), open `explains/01-*.md`
   - If a topic is given, search `explains/` for a matching filename
   - If no argument, list all available explanations and ask which one

2. **Present the content** to the user

## File Structure

```markdown
# <Number>: <Title>

<One-line summary of what this document covers>

---

## Table of Contents

1. [Section]
2. [Section]
   ...

---

## 1. Section

Content with diagrams, tables, and flow examples.

---

_This document reflects the codebase as of <date>._
```

## Naming Rules

- Filename: `<two-digit-number>-<kebab-case-topic>.md`
- Title: descriptive, matches the topic
- Keep it focused — one major topic per file, split if too broad

## What to Explain

- Architecture and system design
- Database schemas and relationships
- Data flows and request lifecycles
- Business logic and game mechanics
- Module structures and dependencies
- Authentication and authorization
- External integrations (Firebase, S3, WebSocket)
- Frontend patterns (state management, navigation, theming)
- DevOps and CI/CD pipelines
- Any concept the user finds unclear

## Rules

- Always read the actual source code — never explain from memory or assumptions
- Be thorough but organized — use headings, tables, and diagrams over walls of text
- Include file paths so the reader can find the source
- Keep explanations accurate to the current codebase state
- Do not duplicate content across explanation files — reference other docs instead

## Examples

```
/explain database          → creates/reads doc about database schema
/explain auth flow         → creates doc explaining full auth lifecycle
/explain 01                → reads existing doc #01
/explain hearts            → creates doc about hearts system mechanics
/explain                   → lists all available explanations
```
