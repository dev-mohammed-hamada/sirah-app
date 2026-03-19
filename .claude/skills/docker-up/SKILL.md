---
name: docker-up
description: Start or restart the local development environment using docker-compose. Manages PostgreSQL and backend services.
user-invocable: true
disable-model-invocation: false
argument-hint: [up|down|restart|logs]
---

# Docker Dev Environment

Manage the local development environment using docker-compose.

## Arguments

- `up` (default) — Start all services
- `down` — Stop all services
- `restart` — Restart all services
- `logs` — Show recent logs from all services

## Steps

### For `up` (default):

1. Check if `docker-compose.yml` exists in project root. If not, warn user it needs to be created first
2. Check if Docker daemon is running: `docker info`. If not, tell user to start Docker Desktop
3. Start services: `docker-compose up -d`
4. Wait for PostgreSQL to be ready: `docker-compose exec db pg_isready`
5. Run Prisma migrations: `npm run prisma:migrate`
6. Run Prisma generate: `npm run prisma:generate`
7. Show status: `docker-compose ps`
8. Confirm environment is ready with connection details

### For `down`:

1. Stop services: `docker-compose down`
2. Confirm all services stopped

### For `restart`:

1. Run `docker-compose restart`
2. Wait for PostgreSQL ready check
3. Show status

### For `logs`:

1. Show last 50 lines: `docker-compose logs --tail=50`

## Services (expected in docker-compose.yml)

- **db** — PostgreSQL 15, port 5432
- **redis** — Redis 7 (for future session/cache), port 6379

## Rules

- Never run `docker-compose down -v` (destroys volumes/data) unless user explicitly asks
- Always check Docker is running before attempting commands
- Always run migrations after starting fresh
