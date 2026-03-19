# Task 07: Inline Questions (Mid-Story)

## Priority: HIGH (core gameplay)

## Description

2 inline questions per stage, appearing after story panels 1 and 2. Quick engagement checks to keep the child focused during the story.

## Screen (design 12)

### Question Card

- Warm Sand bg, Level 2 shadow
- Narrator mini-avatar (40px) at top
- Question text centered

### 5 Question Type UIs

1. **MCQ** — 4 vertical option buttons with Arabic letter prefixes (أ، ب، ج، د)
2. **True/False** — 2 large side-by-side buttons (green-tinted / red-tinted)
3. **Arrange in Order** — Draggable reorderable cards with grip handles, numbered drop zones
4. **Fill in the Blank** — Sentence with highlighted blank, 3 option buttons below
5. **Who Said It** — Decorative quote bubble, character name buttons with silhouette icons

### Feedback States

**Correct:**

- Green flash, checkmark animation
- "+10 XP" floats up
- Narrator praise text
- Mini confetti burst
- "Next" appears after 1.5s

**Wrong:**

- Red flash, X icon
- Correct option highlights green with pulse
- Heart breaks in top bar (Lottie 500ms)
- Narrator shows correct answer + explanation
- "Next" appears after 2s

## API Integration

- `POST /progress/submit-answer` — { questionId, selectedAnswer, timeSpent }
- Response includes: correct (bool), correctAnswer, xpEarned

## Technical

- No question type repeated >2x in a row (enforced in seed data)
- Drag-and-drop for Arrange type (react-native-gesture-handler)
- Answer is final — no changing after selection
- Hearts decrement on wrong (update hearts store)

## Acceptance Criteria

- [ ] All 5 question types render correctly
- [ ] Correct/wrong feedback with animations
- [ ] XP floats on correct, heart breaks on wrong
- [ ] Narrator reaction text displays
- [ ] Drag-and-drop works for Arrange type
- [ ] "Next" advances to next story panel
- [ ] Hearts update in top bar
- [ ] RTL layout for all question types

## References

- `designs/12-inline-question.md`
- `designs/27-animations-assets.md` — heart break, checkmark, confetti
