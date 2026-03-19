# Task 21: WebSocket Live Updates (Father Dashboard)

## Priority: LOW

## Description

Real-time updates on the father's dashboard when a son completes stages, earns XP, or maintains streaks. Uses Socket.io via NestJS WebSocket gateway.

## Events

| Event                 | Payload                          | Trigger                       |
| --------------------- | -------------------------------- | ----------------------------- |
| `son:stage-complete`  | { sonId, stageId, stars, score } | Son finishes a stage          |
| `son:xp-update`       | { sonId, totalXp }               | Son earns XP                  |
| `son:streak-update`   | { sonId, streak }                | Son's streak changes          |
| `son:daily-challenge` | { sonId, completed }             | Son completes daily challenge |

## Technical

- Gateway: `backend/src/gateway/events.gateway.ts` (scaffolded)
- Father joins a room per linked son on connect
- Backend emits events after relevant API calls
- Mobile: `socket.io-client` in father's screens
- Reconnection handling

## Acceptance Criteria

- [ ] Father receives live updates without polling
- [ ] Son cards update stats in real-time
- [ ] Son Progress Detail updates live
- [ ] Connection handles reconnection gracefully

## References

- `backend/src/gateway/events.gateway.ts`
