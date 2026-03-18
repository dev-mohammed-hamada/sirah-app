---
name: seed-stage
description: Add a new stage to the seed data with story panels and quiz questions. Ensures content follows Islamic content guidelines.
user-invocable: true
disable-model-invocation: false
argument-hint: [stage-number] [arabic-title]
---

# Seed New Stage

Add a new stage to `backend/prisma/seed.ts` with story panels and quiz questions.

## Arguments
- `$0` — Stage order number (1-10)
- `$1` — Arabic title (e.g., "عام الفيل")

## Content Rules

### Story Panels (3 per stage)
- Max 3 sentences per panel
- Simple Arabic suitable for children (6-14 years)
- Content sourced from Ibn Hisham & Ibn Kathir's Seerah
- All human figures described as faceless silhouettes — NO EXCEPTIONS

### Quiz Questions (2 inline + 3-5 final)
- Mix of question types: MCQ, TRUE_FALSE, ARRANGE, FILL_BLANK, WHO_SAID_IT
- No question type repeated more than 2x consecutively
- `isInline: true` for mid-story questions, `false` for final quiz
- Each question has `xpValue: 10` (default)
- `options` is a JSON array of `{id, text}` objects
- `correctAnswer` stores the correct option `id`

### Question Type Formats
- **MCQ**: 4 options, 1 correct
- **TRUE_FALSE**: 2 options ("صح"/"خطأ"), correctAnswer is "true" or "false"
- **ARRANGE**: Options are items to order, correctAnswer is comma-separated IDs in correct order
- **FILL_BLANK**: questionText has `___` blank, options are word choices
- **WHO_SAID_IT**: Quote with speaker options

## Steps
1. Read the existing seed.ts file
2. Add the new stage data following the pattern
3. Ensure question type variety (no type >2x in a row)
4. Verify Arabic text is grammatically correct
