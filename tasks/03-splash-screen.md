# Task 03: Splash Screen

## Priority: MEDIUM

## Description

Build the animated splash screen — a magical desert night with a campfire and the narrator silhouette. Sets the emotional tone for the entire app.

## Screen (design 01)

- Full-screen starry desert night sky (Night Sky gradient)
- Desert dunes silhouette at bottom
- Campfire at center-bottom (Lottie animation)
- Narrator silhouette seated by fire
- App logo centered upper third
- Tagline below logo at 80% opacity

## Animation Sequence (2.5s total)

1. Screen fade in (600ms)
2. Star twinkle loop
3. Campfire flicker (Lottie)
4. Narrator fade in (400ms)
5. Logo scale bounce (500ms spring)
6. Tagline fade (300ms)
7. Auto-transition at 2.5s

## Navigation

- First-time user → Onboarding 1
- Logged-in user → Home (Son) or Father Home (Father)
- Fade-through transition

## Assets Needed

- Desert night sky background (PNG/SVG)
- Dunes silhouette (SVG)
- Campfire Lottie animation
- Narrator seated silhouette (PNG)
- Star twinkle overlay (Lottie)
- App logo

## Acceptance Criteria

- [x] Full animation sequence plays
- [x] Correct routing based on auth state
- [x] Smooth transition to next screen
- [x] Assets load without flash

## References

- `designs/01-splash-screen.md`
- `designs/27-animations-assets.md` — Lottie specs
