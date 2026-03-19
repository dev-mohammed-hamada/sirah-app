# Task 15: Link Request Screen (Son)

## Priority: MEDIUM

## Description

Full-screen modal for the son to accept or decline a father's link request. Triggered by push notification or pending request check.

## Screen (design 21)

- Full-screen modal with 50% dark backdrop
- Centered card (320px max): father+son silhouettes with dashed connection line
- Title: "Account Link Request"
- "[Father's name] wants to follow your progress"
- Info note about what linking allows
- Accept (Primary) and Decline (Secondary) buttons

### Animations

- **On Accept:** Dashed line becomes solid golden, particles burst, success state with checkmark, auto-dismiss after 2s
- **On Decline:** Card slides down and fades

## API Integration

- `GET /users/link-requests` — pending requests
- `PATCH /users/link-request/:id` — { accept: true/false }

## Technical

- Cannot dismiss by tapping backdrop (must choose)
- Check for pending requests on Home screen load

## Acceptance Criteria

- [ ] Modal renders with father info
- [ ] Accept links accounts with animation
- [ ] Decline dismisses with animation
- [ ] Cannot dismiss without choosing
- [ ] Pending requests checked on app load

## References

- `designs/21-link-request.md`
