---
name: db-migrate
description: Create and apply a Prisma database migration with validation. Use when schema.prisma has been modified.
user-invocable: true
disable-model-invocation: false
argument-hint: <migration-name>
---

# Database Migration

Create and apply a Prisma migration after schema changes, with validation checks.

## Arguments

- `$ARGUMENTS` — Migration name in snake_case (e.g., `add_user_avatar`, `create_badges_table`)

## Steps

1. Verify `backend/prisma/schema.prisma` has uncommitted changes:
   - Run `git diff backend/prisma/schema.prisma`
   - If no changes, warn user and stop
2. Validate the schema: `npx prisma validate --schema=backend/prisma/schema.prisma`
   - If invalid, show errors and stop
3. Check for potential destructive changes by running:
   `npx prisma migrate diff --from-migrations-directory backend/prisma/migrations --to-schema-datamodel backend/prisma/schema.prisma`
   - If dropping tables/columns, warn user and ask for confirmation
4. Create the migration:
   `npx prisma migrate dev --name $ARGUMENTS --schema=backend/prisma/schema.prisma`
5. Regenerate Prisma client: `npx prisma generate --schema=backend/prisma/schema.prisma`
6. Show the generated SQL file for review
7. Remind user to:
   - Review the generated SQL
   - Test the migration locally
   - Never modify applied migrations

## Naming Rules

- snake_case, descriptive
- Prefix with action: `add_`, `create_`, `update_`, `remove_`, `alter_`
- Examples: `add_user_avatar`, `create_badges_table`, `add_streak_milestone_field`

## Rules

- NEVER modify or delete existing applied migrations
- NEVER skip validation step
- Always warn on destructive changes (DROP TABLE, DROP COLUMN)
- Always regenerate Prisma client after migration
