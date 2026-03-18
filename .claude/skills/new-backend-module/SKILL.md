---
name: new-backend-module
description: Scaffold a new NestJS backend module with controller, service, DTOs, and tests following project conventions.
user-invocable: true
disable-model-invocation: false
argument-hint: [module-name]
---

# Create New Backend Module

Scaffold a complete NestJS module following Sirah backend conventions.

## Module Name
$ARGUMENTS

## Files to Create

```
backend/src/$ARGUMENTS/
  $ARGUMENTS.module.ts
  $ARGUMENTS.controller.ts
  $ARGUMENTS.service.ts
  dto/
    create-$ARGUMENTS.dto.ts
    update-$ARGUMENTS.dto.ts
  $ARGUMENTS.service.spec.ts
```

## Conventions

1. **Controller**: Thin — only handles HTTP concerns, delegates to service
2. **Service**: Contains all business logic, injects `PrismaService`
3. **DTOs**: Validated with `class-validator` decorators
4. **Guards**: Apply `@UseGuards(JwtAuthGuard)` at controller level
5. **Role-based**: Use `@Roles('FATHER')` + `RolesGuard` for father-only endpoints
6. **Error messages**: In Arabic (e.g., `'المورد غير موجود'`)
7. **RESTful routes**: Resources as nouns, proper HTTP methods

## Steps
1. Create the module directory and files
2. Add module to `app.module.ts` imports
3. Create DTOs with class-validator decorators
4. Implement service methods with Prisma
5. Wire controller endpoints
6. Add unit test file for service
