# Task 14: Settings Screen (Son)

## Priority: LOW

## Description

Account management and app preferences for the son — profile editing, linked accounts, notifications, logout.

## Screen (design 20)

### Sections

- **Profile:** Avatar (80px), display name, username, "Edit profile" link
- **Account:** Change Password, Linked Accounts (list of linked fathers with "Unlink" option)
- **Notifications:** Enable toggle, Daily Reminder Time picker (default 6PM)
- **App:** About, Terms, Privacy
- **Logout:** Error Red text button with confirmation modal

### Logout Modal

- Bottom sheet (40% height)
- "Are you sure?" with Logout (Error Red) and Cancel buttons

## Acceptance Criteria

- [x] Profile section displays user data
- [ ] Linked accounts sub-screen shows fathers (placeholder — needs backend)
- [ ] Unlink functionality works (placeholder — needs backend)
- [x] Notification toggle works
- [x] Time picker for daily reminder
- [ ] Logout clears auth and navigates to Landing (placeholder — needs backend)
- [x] Confirmation modal on logout

## References

- `designs/20-settings-son.md`
