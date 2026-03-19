# Task 19: Settings Screen (Father)

## Priority: LOW

## Description

Father's account management — profile, linked sons, granular notification preferences.

## Screen (design 26)

### Sections

- **Profile:** Avatar, name, username, edit link
- **Account:** Change Password, Linked Sons (list with "Unlink" per son + "Link new son")
- **Notifications (granular):**
  - Master toggle (Enable Notifications)
  - Stage completion notification toggle
  - Goal achievement notification toggle
  - Streak notification toggle
  - Master off → all sub-toggles disabled (40% opacity)
- **App:** About, Terms, Privacy
- **Logout:** Error Red with confirmation modal

## Technical

- Master notification toggle controls sub-toggles
- Same patterns as Son settings

## Acceptance Criteria

- [ ] Profile section with edit
- [ ] Linked sons management
- [ ] Granular notification toggles
- [ ] Master toggle disables sub-toggles
- [ ] Logout with confirmation

## References

- `designs/26-settings-father.md`
