---
description: Hard rules that must never be violated
---

- NEVER show faces on human figures — all human figures MUST be faceless silhouettes, NO EXCEPTIONS
- NEVER call AI APIs at runtime — offline content generation only
- NEVER store plain-text passwords — bcrypt only
- NEVER expose secrets in client code — `.env` files only, never hardcode
- NEVER use `left`/`right` in React Native styles — use `start`/`end`
- NEVER modify or delete applied Prisma migrations
- NEVER send correct answers to the client — server-side validation only
- NEVER use `docker-compose down -v` unless explicitly asked by user
