# سيرة النبي ﷺ — Project Description
### Development-Ready Document

---

## 1. Vision & Concept

A **Duolingo-style Islamic education app** that teaches children the Biography of Prophet Mohammed (peace be upon him) through short, addictive, daily learning sessions.

The core philosophy is borrowed directly from Duolingo's proven model: **make learning feel like a game, not a chore.** Every session is short (5–10 minutes), every correct answer is rewarded, every day of learning builds a streak, and a warm narrator character guides the child through each story like a grandfather telling tales by a fire.

The app is structured as a **journey path** — a winding road through the Arabian desert that the child walks stage by stage, unlocking the story of the Prophet's life from before his birth to the opening of Mecca. The path is never overwhelming — the child only ever sees the next step in front of them.

**The addiction loop:**
> Open app → Narrator welcomes you back → Short story panel → Quiz questions → Stars + XP earned → Streak updated → Tomorrow's lesson teased

---

## 2. What Problems Does the Project Solve?

- Seerah books are long, dense, and inaccessible for children.
- Muslim children have very limited access to quality Islamic educational content.
- Children lose interest in religious learning because it feels like studying, not play.
- Parents have no easy way to track their child's religious learning progress.
- There is no existing app that combines Seerah content with modern gamification mechanics.

---

## 3. The Narrator Character

The heart of the experience. Every stage is narrated by **a wise old man** — a warm, faceless silhouette in a white thobe, sitting by a fire or under a desert sky. He speaks directly to the child, telling the story as if whispering a secret from history.

**Character rules:**
- Always faceless — shown as a silhouette or from behind.
- Has a name (to be decided — something classic like "الشيخ" or "جدو").
- Appears at the start of every stage with a welcome line.
- Reacts to the child's quiz performance — celebrates correct answers, gently encourages after wrong ones.
- Sends the daily streak reminder notification in his voice: *"أين أنت يا بطلي؟ القصة تنتظرك."*

**Character states (illustrated):**
- Neutral: sitting, looking forward
- Excited: arms raised, pointing to the sky
- Encouraging: hand on heart, nodding
- Celebrating: standing, arms open wide

---

## 4. Who Are the Users?

### Muslim Sons (Primary User)

The child is the core player. Age range: **6–14 years old.**

**Son's V1 features:**
- Create an independent account
- Play through stages guided by the Narrator
- Earn Hearts (lives), XP, Stars, and Badges
- Build and protect a daily Streak
- Answer quiz questions inside and after each story
- View active Goals set by his father
- Receive motivational notifications from the Narrator

---

### Muslim Fathers (Secondary User)

The father monitors and motivates from the outside. He does not play the game — he observes and sets incentives.

**Father's V1 features:**
- Create an account
- Link to his son's account via username or unique code
- View son's progress: stages completed, stars, XP, streak
- Create Goals with deadlines and attach a Reward
- Receive progress and achievement notifications

#### Goal – Reward System

**Goal (created by the father):**
- Written description
- Deadline set by father
- A predefined group of stages to complete (groups defined by developers)

**Reward (attached to goal):**
- Written description of the real-world reward (e.g., "20 riyals if you finish by Friday")
- Notification sent to son when goal is created: *"أبوك يرسل لك تحدياً جديداً! 🎯"*

---

## 5. Account & Linking System

- The **son creates his own account** independently. The app works fully without any father linked.
- The **father creates his own account** and sends a link request via son's username.
- The son receives a notification and must **Accept or Decline.**
- A son can have **up to 2 fathers** linked (divorced parents, guardians).
- A father can link to **multiple sons.**
- Both the son and father can **unlink** from each other at any time in Settings.

---

## 6. Core Game Mechanics (Duolingo Model)

### 6.1 Hearts (Lives System)

- Every session starts with **5 Hearts.**
- Each **wrong answer** costs 1 Heart.
- At **0 Hearts**, the session ends — the child must retry the stage.
- Hearts **refill fully** after a waiting period (e.g., 30 minutes) or when a new day begins.
- This creates urgency: *"I need to think carefully, I only have 2 hearts left."*

> **Why this works:** It adds stakes to every question without being punishing. The child learns to slow down and think.

---

### 6.2 XP (Experience Points)

- Every correct answer earns **XP.**
- Bonus XP for:
  - Completing a stage without losing a heart (Perfect Run: +20 XP)
  - Answering quickly within a time window (Speed Bonus: +5 XP per question)
  - Completing a stage on the first try (+10 XP)
- XP accumulates in the player's profile and is used to display total learning effort.
- XP is shown to the father in the progress dashboard.

> **Why this works:** XP never resets, so it always goes up. The child always feels like they are growing.

---

### 6.3 Stars (Stage Rating)

- Each stage has a **3-star rating** based on final score (0–100):

| Score | Stars |
|-------|-------|
| 1–50  | ⭐ 1 Star |
| 51–80 | ⭐⭐ 2 Stars |
| 81–100 | ⭐⭐⭐ 3 Stars |

- Stars are used to **unlock the next group** (need 24 of 30 stars).
- If a child scores below threshold, they can **replay the stage** — only the highest score is kept, stars never decrease.
- Stars are visible on the journey map on every completed stage node.

---

### 6.4 Streak System

- A **Streak** counts how many consecutive days the child completes at least one stage or daily challenge.
- The streak counter is shown prominently on the home screen with a 🔥 flame icon.
- **Streak milestones** trigger celebrations: 3 days, 7 days, 14 days, 30 days.
- If the child misses a day, the streak resets to 0.
- A **reminder notification** is sent at a customizable time each day if no session has been completed.
- Father is notified when son hits a streak milestone.

> **Why this works:** Streaks are the single most powerful retention mechanic in Duolingo. Missing a streak feels like a loss, even when there is no real penalty.

---

### 6.5 Daily Challenge

- Every day, a single **mini-question** is available outside of regular stages.
- It takes 30 seconds to complete.
- Completing it counts toward the daily streak and awards bonus XP.
- Questions are drawn from content the child has already learned (spaced repetition).
- Purpose: keep the child engaged on days they don't have time for a full stage.

> **Why this works:** Lowers the barrier to maintaining a streak. "I only need 30 seconds today."

---

### 6.6 The Journey Map (Stage Path)

- Stages are displayed as a **winding path** through an Arabian desert landscape — not a list.
- Completed stages show their star rating.
- The current available stage is highlighted and animated (glowing, pulsing).
- Locked stages are dimmed with a lock icon.
- Each stage node has a small illustration hinting at the story inside (e.g., an elephant silhouette for the Elephant stage).
- The map scrolls vertically as more stages are unlocked.

> **Why this works:** A path makes progress feel like a journey, not a checklist. The child can see how far they've come and how far they can still go.

---

### 6.7 Stage Structure (Inside a Stage)

Each stage follows a fixed rhythm — just like a Duolingo lesson:

```
Stage Start
    │
    ▼
Narrator Welcome Screen
"أهلاً يا بطلي! اليوم سنتعلم عن..."
    │
    ▼
Story Panel 1 (Illustrated scene + 2–3 sentences of narration)
    │
    ▼
Inline Question (1 question mid-story to keep engagement)
    │
    ▼
Story Panel 2
    │
    ▼
Inline Question
    │
    ▼
Story Panel 3 (Story conclusion)
    │
    ▼
Final Quiz (3–5 questions on the full stage content)
    │
    ▼
Results Screen (Stars earned + XP earned + Celebration)
    │
    ▼
Narrator Closing Line + Tease of next stage
```

**This rhythm keeps sessions under 10 minutes and prevents the child from zoning out.**

---

### 6.8 Quiz Question Types

To avoid repetition and keep the child mentally active, questions rotate between these types:

1. **Multiple Choice (MCQ)** — 4 options, 1 correct. Most common type.
2. **True or False** — Simple and fast. Good for factual statements.
3. **Arrange in Order** — Drag 3–4 events into the correct chronological sequence.
4. **Fill in the Blank** — A sentence with a missing word; child selects from 3 options.
5. **Who Said It?** — A quote is shown; child identifies who said it (from characters in the story).

> **Rule:** No stage should repeat the same question type more than twice in a row.

---

### 6.9 Feedback & Micro-Animations

Every interaction should have an immediate, satisfying response:

- **Correct answer:** Green flash, checkmark animation, +XP floats up, encouraging Arabic phrase from Narrator ("ممتاز! 🌟").
- **Wrong answer:** Red flash, heart breaks animation, Narrator says the correct answer warmly ("الجواب الصحيح هو...").
- **Stage complete:** Celebration screen with stars bursting in, confetti, XP counter ticking up.
- **Streak maintained:** Flame grows bigger, streak number animates.
- **New badge earned:** Badge flies in with a shimmer effect and a fanfare sound.
- **Perfect run:** Special "بدون أخطاء!" banner with gold border.

---

### 6.10 Badges

- Badges are earned by achieving specific milestones.
- In V1: displayed as prototypes (Badge 1, Badge 2, etc.) — designs and triggers finalized before V2.
- Planned badge categories for future versions:
  - Streak badges (3, 7, 14, 30 days)
  - Perfection badges (complete a stage with no wrong answers)
  - Speed badges (complete a stage with speed bonuses on every question)
  - Group completion badges
  - Father-assigned goal completion badges

---

## 7. Engagement & Retention Ideas

These are additional ideas to make the app genuinely addictive and loved:

### 7.1 "Today's Story" Home Screen Widget
A small widget on the home screen (iOS/Android) showing the current stage name and the Narrator's face, with a "Continue" button. Seeing it while scrolling through your phone creates a passive reminder without a notification.

### 7.2 Celebration Moments That Feel Special
Not every stage completion should feel the same. After every 5th stage or group completion, trigger a **bigger celebration** — a longer animation, a special Narrator line, and a unique one-time badge. These "big moments" become memories the child looks forward to.

### 7.3 Tease the Next Stage
At the end of every stage, the Narrator gives a short teaser for the next one: *"في المرحلة القادمة ستكتشف لماذا اهتزّ عرش الرحمن..."* — curiosity is one of the most powerful hooks.

### 7.4 The "So Close" Effect
If a child ends a session 1–2 stars short of their best score, show a screen that says: *"تقريباً! كنت قريباً من 3 نجوم — حاول مرة أخرى؟"* This near-miss psychology massively increases replay rate.

### 7.5 Father Reaction Feature
When a son completes a goal, the father can send a quick **reaction** — a short preset phrase like "أحسنت يا بطلي! 🏆" that appears as a special notification to the son. The son seeing a reaction from his father is a uniquely powerful motivator in this cultural context.

### 7.6 Weekly Summary for Fathers
Every Sunday, the father receives a weekly summary notification: *"محمد أكمل 3 مراحل هذا الأسبوع وحصل على 18 نجمة 🌟"* — keeps the father engaged without requiring him to open the app daily.

### 7.7 Streak Protection (Freeze)
Once a child earns a **7-day streak**, they unlock one **Streak Freeze** — a one-time shield that protects the streak if they miss a single day. This is directly from Duolingo and is extremely effective at reducing churn around "accidental misses" (travel, illness, etc.).

### 7.8 Short Session Mode
If a child opens the app and the current stage seems long, offer a **"5 دقائق فقط"** mode — just the daily challenge + one story panel. This captures the child even on busy days and keeps the streak alive.

---

## 8. Notification System

### Son's Notifications

| Trigger | Message |
|---|---|
| Father sends link request | "والدك يريد متابعة تقدمك — اقبل الطلب؟" |
| Father creates a new goal | "أبوك يرسل لك تحدياً جديداً! 🎯 المكافأة: [reward]" |
| Goal deadline in 3 days | "تبقّى 3 أيام لإنهاء هدفك — هيّا!" |
| Streak reminder (no session today) | "أين أنت يا بطلي؟ سلسلتك 🔥 تنتظرك!" |
| Streak milestone reached | "ماشاء الله! 7 أيام متواصلة 🔥🔥🔥" |
| New badge earned | "حصلت على شارة جديدة! 🏅 افتح التطبيق لتراها" |
| Father sends a reaction | "والدك قال: أحسنت يا بطلي! 🏆" |
| Daily challenge available | "تحدي اليوم جاهز — 30 ثانية فقط! ⚡" |

### Father's Notifications

| Trigger | Message |
|---|---|
| Son accepts link request | "[Son's name] قبل طلب الربط ✓" |
| Son completes a stage | "[Son's name] أكمل المرحلة [X] 🎉" |
| Son completes a goal | "[Son's name] أنهى هدفه! حان وقت المكافأة 🏆" |
| Son earns a badge | "[Son's name] حصل على شارة جديدة 🏅" |
| Son hits streak milestone | "[Son's name] على سلسلة [X] أيام متواصلة 🔥" |
| Goal deadline approaching (son hasn't finished) | "تبقّى 3 أيام على هدف [Son's name] ولم ينتهِ بعد" |
| Weekly summary (every Sunday) | "[Son's name] أكمل [X] مراحل هذا الأسبوع — [X] نجمة 🌟" |

> **Technical:** Firebase Cloud Messaging (FCM) for both Android and iOS, triggered from the NestJS backend via the Firebase Admin SDK.

---

## 9. Content Guidelines

### Story Content
- Sourced from trusted Seerah books: Ibn Hisham, Ibn Kathir's Al-Bidaya wa Al-Nihaya.
- AI is used **only** for: shortening into child-friendly format, generating quiz questions.
- All content is reviewed by a knowledgeable Islamic reviewer before publishing.
- Each story panel: maximum 3 sentences. Simple Arabic. Age-appropriate vocabulary.
- Each stage: 3 story panels + 2 inline questions + 3–5 final quiz questions.

### Visual Content
- All human figures are **faceless silhouettes.** No exceptions.
- Settings: Arabian Peninsula — desert, tents, mountains, old Mecca architecture, starry sky, fire.
- The Narrator character: white thobe silhouette, always from behind or in profile.
- Color palette for illustrations: warm golds, deep blues, sandy oranges, night sky purples.
- AI-generated images following the above guidelines, reviewed before use.

---

## 10. Game Structure Summary

| Element | V1 Value |
|---|---|
| Total Stages | 10 |
| Total Groups | 1 |
| Stars per Stage | 3 |
| Total Stars per Group | 30 |
| Stars needed to advance | 24 / 30 |
| Hearts per session | 5 |
| Heart refill time | 30 minutes |
| Daily Challenge | 1 per day |
| Stage session length | 5–10 minutes |
| Quiz questions per stage | 3–5 (final) + 2 (inline) |

---

## 11. Screen List (V1)

### Son Experience
1. Splash Screen
2. Onboarding (3 screens)
3. Landing (Sign Up / Login)
4. Sign Up
5. Login
6. Home / Journey Map (Stage Path)
7. Stage Detail Screen
8. Narrator Welcome Screen
9. Story Panel Screen
10. Inline Question Screen
11. Final Quiz Screen
12. Celebration / Results Screen
13. Stars Earned Screen
14. Progress Screen
15. Goals Screen (Son View)
16. Awards Screen
17. Badges Screen (Prototype)
18. Daily Challenge Screen
19. Settings Screen (Son)
20. Link Request Screen (Accept / Decline)

### Father Experience
21. Father Home / Sons Tab
22. Son Progress Detail Screen
23. Goals Tab (Father View)
24. Create Goal Screen
25. Settings Screen (Father)

---

## 12. Language

- **V1: Arabic only. Full RTL layout.**
- English and other languages: post-V1.

---

## 13. Technical Stack

| Layer | Technology | Reason |
|---|---|---|
| Mobile Framework | **React Native (Expo)** | Single codebase for iOS + Android, large JS ecosystem, excellent community support |
| Backend Framework | **NestJS** | Enterprise-grade Node.js framework with TypeScript, modular architecture, built-in support for REST & WebSockets |
| Database | **PostgreSQL** | Robust relational database ideal for structured data (users, stages, progress, goals), strong querying for dashboards and analytics |
| ORM | **Prisma** | Type-safe database access, auto-generated migrations, excellent DX with NestJS and TypeScript |
| Authentication | **Passport.js + JWT** | Industry-standard auth strategy, integrates natively with NestJS guards and middleware |
| Push Notifications | **Firebase Cloud Messaging (FCM)** | Free, reliable push delivery on both iOS and Android — used as a notification service only, not as a backend |
| Real-time Updates | **Socket.io (via @nestjs/websockets)** | Real-time progress updates on the father's dashboard without polling |
| File/Image Storage | **AWS S3 or Cloudflare R2** | Cost-effective object storage for story panel illustrations, Narrator assets, and badge images |
| Image/Animation | **Lottie (lottie-react-native)** | Lightweight JSON-based animations for celebration screens and Narrator reactions |
| State Management | **Zustand** | Minimal, fast, and unopinionated state management — ideal for quiz logic, hearts, XP, and streak state |
| Navigation | **React Navigation** | The standard navigation library for React Native, supports stack, tab, and drawer navigators with RTL support |
| API Communication | **Axios + React Query (TanStack Query)** | Axios for HTTP requests, React Query for caching, background refetching, and server state synchronization |
| Language & Tooling | **TypeScript** | Shared type safety across backend (NestJS) and mobile (React Native) — reduces bugs and enables code sharing |
| AI Content Pipeline | **Offline tool** | AI is used to generate content before release — not a live API call in the app |

---

## 14. Core Data Models (PostgreSQL / Prisma)

### User
```
id            String    @id @default(uuid())
displayName   String
age           Int
username      String    @unique
accountType   Enum      (SON, FATHER)
xp            Int       @default(0)
streak        Int       @default(0)
lastActiveDate DateTime?
linkedAccounts User[]   (many-to-many self-relation)
createdAt     DateTime  @default(now())
```

### Stage
```
id            String    @id @default(uuid())
groupId       String    (FK → StageGroup)
orderIndex    Int
title         String
arabicTitle   String
storyPanels   StoryPanel[]  (one-to-many)
quizQuestions QuizQuestion[] (one-to-many)
maxScore      Int
```

### StageProgress (per user per stage)
```
id            String    @id @default(uuid())
userId        String    (FK → User)
stageId       String    (FK → Stage)
bestScore     Int
starsEarned   Int       (0–3)
completedAt   DateTime?
attempts      Int       @default(0)
@@unique([userId, stageId])
```

### Goal
```
id              String    @id @default(uuid())
fatherId        String    (FK → User)
sonId           String    (FK → User)
description     String
stageGroupId    String    (FK → StageGroup)
deadline        DateTime
rewardDescription String
status          Enum      (ACTIVE, COMPLETED, EXPIRED)
createdAt       DateTime  @default(now())
```

### QuizQuestion
```
id            String    @id @default(uuid())
stageId       String    (FK → Stage)
type          Enum      (MCQ, TRUE_FALSE, ARRANGE, FILL_BLANK, WHO_SAID_IT)
questionText  String
options       Json      (array of option objects)
correctAnswer String
xpValue       Int
```

---

## 15. Out of Scope for V1

- English or any non-Arabic language
- Social features (sharing, leaderboards, friend comparison)
- Final badge designs and trigger logic
- In-app purchases or subscriptions
- Audio narration (text only in V1)
- Streak Freeze feature (planned for V2)
- Short Session Mode (planned for V2)
- Home screen widget
- Father Reaction feature (planned for V2)
- Weekly summary notifications (planned for V2)

---

## 16. Website

Primary mission: drive app downloads. Target audience: Muslim fathers.

### Pages
- **Home** — Hero targeting fathers: *"علّم ابنك السيرة النبوية وهو يلعب."* App Store + Google Play buttons above the fold.
- **About Us** — Mission and story behind the project.
- **Who Is This For?** — Fathers and children, ages 6–14.
- **What Do We Offer?** — Features, Goal-Reward system, Duolingo-style learning, Seerah credibility.
- **Download** — Final CTA.
- **Contact** — Communication form.

### Conversion Flow
1. Father lands → compelling headline + download buttons immediately visible
2. Scrolls → Problem section (Seerah is hard for kids)
3. Scrolls → Solution section (app screenshots, journey map, Narrator character)
4. Scrolls → Trust section (Seerah sources, review process)
5. Scrolls → For Parents section (Goal-Reward system, weekly summary, progress dashboard)
6. Reaches bottom → Download buttons again
