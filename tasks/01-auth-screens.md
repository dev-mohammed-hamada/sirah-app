# Task 01: Auth Screens (Sign Up, Login, Landing)

## Priority: HIGH (blocks all user flows)

## Description

Build the authentication UI screens and connect them to the backend API. Includes the landing screen, sign up with role selection (Son/Father), and login. First-time users see onboarding first.

## Screens

### Landing Screen (design 05)

- Night sky top section with narrator campfire scene + logo
- Bottom cream card sliding up with "Create Account" and "Sign In" buttons
- Terms/privacy links

### Sign Up Screen (design 06)

- Role selection cards: Son (child silhouette) vs Father (adult silhouette)
- Form fields: Display Name, Age (Son only, 6-14), Username (real-time availability check with 500ms debounce), Password, Confirm Password
- Role-specific validation
- On success: Son → Home, Father → Father Home

### Login Screen (design 07)

- Narrator waving with "Welcome back!" speech bubble
- Username + Password fields
- Error states: wrong credentials, too many attempts (5-min lockout)
- On success: route by accountType

## API Integration

- `POST /auth/register` — { displayName, username, password, accountType, age? }
- `POST /auth/login` — { username, password } → { accessToken, user }
- `POST /auth/check-username` — real-time availability
- Store token + user in auth-store (uses `utils/storage.ts` for web compatibility)

## Technical

- All screens RTL with `start`/`end` positioning
- Cairo font family throughout
- Form validation with inline error messages
- Keyboard-aware scroll views
- Loading states on API calls

## Acceptance Criteria

- [x] Landing screen renders with animations
- [x] Role selection works with visual feedback
- [x] Username availability check with debounce
- [x] Validation errors display correctly
- [x] Successful registration creates account and navigates
- [x] Successful login stores token and navigates by role
- [x] Error states handled (network, validation, lockout)
- [x] RTL layout verified

## References

- `designs/05-landing-screen.md`
- `designs/06-sign-up.md`
- `designs/07-login.md`
- `designs/00-design-system.md` — Input Field, Primary/Secondary Button specs
