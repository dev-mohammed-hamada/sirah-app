# Task 16: Father Home / Sons Tab

## Priority: MEDIUM

## Description

Father's primary screen — overview cards of all linked sons with quick stats. Entry point to son progress details and son linking.

## Screen (design 22)

### Son Cards

- Avatar (56px), display name, @username
- Quick stats: streak, stars, XP
- Last active indicator (green "Active today" / gray "Last active: X")
- Mini progress bar "4/10 stages"

### Add Son FAB

- 56px Desert Gold circle with "+" icon (bottom-left, RTL)
- Opens bottom sheet (60%) with username search
- Real-time results after 3 chars
- "Send request" button per result

### Father Bottom Nav

- 2 tabs only: Sons, Goals (centered)

### Empty State

- Narrator with link icon, "Add your son" instructions, "Link Son" CTA

## API Integration

- `GET /users/linked` — linked sons with stats
- `GET /users/search?username=X` — search for sons
- `POST /users/link-request` — { sonUsername }

## Technical

- WebSocket live updates for father dashboard (Socket.io)
- Pull-to-refresh

## Acceptance Criteria

- [ ] Son cards display with live stats
- [ ] FAB opens link-son bottom sheet
- [ ] Username search works with debounce
- [ ] Send request shows success toast
- [ ] Empty state renders
- [ ] Tap son card → Son Progress Detail
- [ ] Real-time updates via WebSocket

## References

- `designs/22-father-home.md`
