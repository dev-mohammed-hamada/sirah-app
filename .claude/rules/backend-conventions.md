---
description: NestJS backend conventions, module structure, and Prisma rules
paths:
  - 'backend/**'
---

## Architecture

- REST API (NestJS) with Axios + TanStack Query on client
- WebSocket (Socket.io) for father dashboard live updates
- Prisma manages all migrations and schema

## Module Structure

Each module follows: `module.ts`, `controller.ts`, `service.ts`, `dto/`, tests

- **Controllers:** thin, HTTP concerns only
- **Services:** contain all business logic, inject `PrismaService`
- **DTOs:** validated with `class-validator` decorators
- **Guards:** `@UseGuards(JwtAuthGuard)` at controller level
- **Roles:** use `@Roles('FATHER')` + `RolesGuard` for role-based access
- Error messages must be in Arabic

## Prisma / Database

- Migration naming: snake*case with action prefix (`add*`, `create*`, `update*`, `remove*`, `alter*`)
- Always regenerate Prisma client after migration
- Always warn on destructive schema changes before applying

## Models

- **User** — accountType `SON|FATHER`, xp, streak, linkedAccounts (m2m self)
- **Stage** — groupId->StageGroup, storyPanels[], quizQuestions[], maxScore
- **StageProgress** — bestScore, starsEarned (0-3), unique [userId, stageId]
- **Goal** — fatherId, sonId, status `ACTIVE|COMPLETED|EXPIRED`
- **QuizQuestion** — types: `MCQ|TRUE_FALSE|ARRANGE|FILL_BLANK|WHO_SAID_IT`

## Account & Linking

- Son works without father. Father links via username (son accepts/declines)
- Son: max 2 fathers. Father: unlimited sons. Either can unlink anytime
