# Task 02: Onboarding Screens (3 Pages)

## Priority: MEDIUM (first-time user experience)

## Description

Build 3 onboarding pages shown to first-time users before the landing screen. Introduces the journey concept, gamified learning, and father-son linking.

## Screens

### Onboarding 1 (design 02)

- Winding golden path across desert with glowing stage markers
- Title: "A Journey Through Time"
- Page dots (1 of 3), Skip + Next buttons

### Onboarding 2 (design 03)

- Child silhouette with orbiting quiz cards, stars, hearts, XP
- Title: "Learn While You Play"
- Page dots (2 of 3), Skip + Next

### Onboarding 3 (design 04)

- Split scene: son playing + father viewing dashboard, golden connection line
- Title: "Your Father Follows Your Progress"
- Page dots (3 of 3), "Start Now" button (no Skip)

## Technical

- Swipe navigation between pages (horizontal pager)
- Skip goes to Landing (05)
- "Start Now" goes to Landing (05)
- Track onboarding completion in AsyncStorage/localStorage
- Night Sky gradient backgrounds
- Lottie/animated illustrations

## Acceptance Criteria

- [ ] 3 pages with swipe navigation
- [ ] Page indicator dots update correctly
- [ ] Skip button works on pages 1-2, hidden on page 3
- [ ] "Start Now" on page 3 navigates to Landing
- [ ] Onboarding only shows on first launch
- [ ] RTL swipe direction (swipe left to advance)
- [ ] Animations play smoothly

## References

- `designs/02-onboarding-1.md`
- `designs/03-onboarding-2.md`
- `designs/04-onboarding-3.md`
