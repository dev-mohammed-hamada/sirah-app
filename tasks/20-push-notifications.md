# Task 20: Push Notifications (FCM)

## Priority: MEDIUM

## Description

Set up Firebase Cloud Messaging for push notifications. Both son and father receive contextual notifications triggered by backend events.

## Son Notifications

| Trigger                            | Message                                 |
| ---------------------------------- | --------------------------------------- |
| Father sends link request          | "والدك يريد متابعة تقدمك — اقبل الطلب؟" |
| Father creates goal                | "أبوك يرسل لك تحدياً جديداً! 🎯"        |
| Goal deadline in 3 days            | "تبقّى 3 أيام لإنهاء هدفك — هيّا!"      |
| Streak reminder (no session today) | "أين أنت يا بطلي؟ سلسلتك 🔥 تنتظرك!"    |
| Streak milestone                   | "ماشاء الله! 7 أيام متواصلة 🔥🔥🔥"     |
| Daily challenge available          | "تحدي اليوم جاهز — 30 ثانية فقط! ⚡"    |

## Father Notifications

| Trigger                   | Message                                 |
| ------------------------- | --------------------------------------- |
| Son accepts link          | "[name] قبل طلب الربط ✓"                |
| Son completes stage       | "[name] أكمل المرحلة [X] 🎉"            |
| Son completes goal        | "[name] أنهى هدفه! حان وقت المكافأة 🏆" |
| Son hits streak milestone | "[name] على سلسلة [X] أيام 🔥"          |

## Technical

- Firebase Admin SDK on backend (already installed)
- FCM token stored per user
- `expo-notifications` for mobile handling
- Scheduled notifications via `@nestjs/schedule` (streak reminders, deadline warnings)
- Backend service: `notifications.service.ts` (scaffolded, needs Firebase init)

## Acceptance Criteria

- [ ] Firebase Admin initialized in backend
- [ ] FCM token registration on login
- [ ] All son notification triggers implemented
- [ ] All father notification triggers implemented
- [ ] Scheduled streak reminders
- [ ] Goal deadline warnings (3 days before)
- [ ] Notifications open correct screens in app

## References

- `Prophet_Mohammed_Project_Description_Final.md` §8
- `backend/src/notifications/notifications.service.ts`
