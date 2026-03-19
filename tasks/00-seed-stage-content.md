# Task 00: Seed Stage Content (10 Stages)

## Priority: HIGH (blocks all gameplay)

## Description

Populate the database with 10 stages of Seerah content — story panels, inline questions, and final quiz questions. This is the foundation for all gameplay and must be completed before any stage flow screens can be tested with real data.

## Requirements

- 10 stages in 1 stage group, ordered chronologically
- Each stage has:
  - Title (Arabic + English)
  - 3 story panels (max 3 sentences each, simple Arabic for ages 6-14)
  - 2 inline questions (after panels 1 and 2)
  - 3-5 final quiz questions
  - `maxScore` calculated from total question XP values
- No question type repeated more than 2x in a row per stage
- Question types: MCQ, TRUE_FALSE, ARRANGE, FILL_BLANK, WHO_SAID_IT
- Content sourced from Ibn Hisham / Ibn Kathir

## Stage Topics (V1)

1. Before the Prophet's birth (Year of the Elephant)
2. Birth and early childhood
3. Youth and character
4. Marriage to Khadijah
5. The first revelation (Cave of Hira)
6. Early secret dawah
7. Public dawah and persecution
8. Migration to Abyssinia
9. The Night Journey (Isra and Mi'raj)
10. The Hijra to Madinah

## Technical

- Use Prisma seed script (`backend/prisma/seed.ts`)
- Use `/seed-stage` skill for each stage
- Verify with `npx prisma studio`

## Acceptance Criteria

- [ ] 10 stages with correct ordering
- [ ] 30 story panels total (3 per stage)
- [ ] 20 inline questions (2 per stage)
- [ ] 30-50 final quiz questions (3-5 per stage)
- [ ] All question types represented across stages
- [ ] All content reviewed for Islamic accuracy
- [ ] `npm run prisma:seed` runs without errors

## References

- `designs/11-story-panel.md` — content format
- `designs/12-inline-question.md` — question types
- `Prophet_Mohammed_Project_Description_Final.md` §6.7, §6.8, §9
