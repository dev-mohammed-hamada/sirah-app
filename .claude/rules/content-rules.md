---
description: Stage content, Arabic writing, and quiz question rules
paths:
  - 'backend/prisma/**'
  - 'tasks/**'
---

## Story Panels

- Max 3 sentences per panel
- Simple Arabic suitable for children (6-14)
- All human figures MUST be faceless silhouettes — NO EXCEPTIONS

## Quiz Questions

Types: `MCQ`, `TRUE_FALSE`, `ARRANGE`, `FILL_BLANK`, `WHO_SAID_IT`

- MCQ: 4 options (a, b, c, d)
- TRUE_FALSE: 2 options (true, false)
- ARRANGE: ordered option IDs, correctAnswer is comma-separated
- FILL_BLANK: 4 options
- WHO_SAID_IT: 4 options

Rules:

- No question type repeated >2x consecutively in a stage
- `xpValue: 10` default per question
- `correctAnswer` is the option ID
- Final quiz: 3-5 questions per stage
