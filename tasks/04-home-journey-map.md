# Task 04: Home / Journey Map Screen

## Priority: HIGH (core son experience)

## Description

The heart of the app — a vertically scrollable desert landscape with a winding stage path. The child sees their progress as a journey through the Arabian desert.

## Screen (design 08)

### Background

- ~3000px tall scrollable desert landscape
- Night Sky at top transitioning to sunset horizon
- Parallax scrolling layers (sky, mountains, dunes)

### Top Status Bar (fixed)

- Glassmorphism effect
- Profile avatar + name (right, RTL)
- Hearts, streak (flame icon), XP (left, RTL)

### The Path

- Winding golden-sand road (S-shape)
- Decorative elements: palm trees, rocks, tents

### Stage Nodes (10)

- **Completed:** 64px golden circle, stage number, 1-3 stars below
- **Current:** 72px with pulsing glow, bounce animation, mini narrator beside it
- **Locked:** 64px dark gray with lock icon, dimmed
- Each has Arabic title label and thematic illustration

### Daily Challenge Banner

- Floating card near top (conditional — only if not completed today)
- Golden border, wobble animation, dismissible

### Bottom Navigation Bar (fixed)

- 5 tabs: Home, Progress, Goals, Awards, Settings

## API Integration

- `GET /users/me` — profile data (avatar, name, hearts, streak, XP)
- `GET /stages` — all stages with progress data
- `GET /progress/hearts` — current hearts + refill time
- `GET /daily-challenge` — availability check

## Technical

- Auto-scroll to current stage on load (800ms)
- Pull-to-refresh with sand-swirl animation
- Stage node tap → Stage Detail bottom sheet (task 05)
- Locked stage tap → shake + tooltip
- Daily banner tap → Daily Challenge screen (task 12)
- Parallax effect on scroll

## Acceptance Criteria

- [x] Scrollable desert landscape renders
- [x] 10 stage nodes with correct states
- [x] Status bar shows live user data
- [x] Bottom navigation works
- [x] Auto-scroll to current stage
- [x] Tap interactions work correctly
- [x] Daily challenge banner shows conditionally
- [x] Pull-to-refresh updates data
- [x] RTL layout verified

## References

- `designs/08-home-journey-map.md`
- `designs/00-design-system.md` — Top Status Bar, Bottom Nav specs
- `designs/27-animations-assets.md` — journey map assets
