# Screen 26: Settings Screen (Father)

### إعدادات الأب

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Toggle Switch, Setting Row).
> **Reference:** [20-settings-son.md](20-settings-son.md) for shared layout patterns (same structure, different options).

---

## Purpose

Father's account management — profile, linked sons, notification preferences.

---

## Layout

- **Background:** Soft Cream (`#FAF3E8`)
- **Header:** "الإعدادات" — Cairo Bold 24px, Deep Night Blue, centered

### Profile Section (top card)

- **Card:** Warm Sand bg, 16px radius, Level 1 shadow, 16px padding
- **Avatar:** 80px circle, golden border (2px), edit pencil overlay (24px)
- **Display name:** Cairo Bold 18px, Deep Night Blue
- **Username:** "@father_username" — Cairo Regular 14px, Muted Gray
- **Edit link:** "تعديل" — Cairo Regular 14px, Desert Gold, tappable

### Settings Groups

#### الحساب (Account)

| Row | Icon | Label             | Action                      |
| --- | ---- | ----------------- | --------------------------- |
| 1   | 🔒   | تغيير كلمة المرور | Navigate → password change  |
| 2   | 👥   | الأبناء المرتبطين | Navigate → linked sons list |

**Linked Sons Sub-screen:**

- List of linked sons:
  - Each row: Son's avatar (40px) + display name + username
  - "إلغاء الربط" button: small, Error Red text
- Can add new son from here too: "ربط ابن جديد" link at bottom

#### الإشعارات (Notifications)

| Row | Icon | Label               | Default | Action                         |
| --- | ---- | ------------------- | ------- | ------------------------------ |
| 1   | 🔔   | تفعيل الإشعارات     | On      | Master toggle                  |
| 2   | ⭐   | إشعار إكمال المرحلة | On      | Toggle (son completes stage)   |
| 3   | 🎯   | إشعار إنجاز الهدف   | On      | Toggle (son completes goal)    |
| 4   | 🔥   | إشعار السلسلة       | On      | Toggle (son streak milestones) |

> **Note:** When master toggle is off, all sub-toggles are disabled (grayed out)

#### التطبيق (App)

| Row | Icon | Label          | Action             |
| --- | ---- | -------------- | ------------------ |
| 1   | ℹ️   | عن التطبيق     | Navigate → About   |
| 2   | 📄   | شروط الاستخدام | Navigate → Terms   |
| 3   | 🛡️   | سياسة الخصوصية | Navigate → Privacy |

#### تسجيل الخروج

- "تسجيل الخروج" — Error Red text button, full-width, 48px height

---

## Visual Composition

```
┌─────────────────────────────┐
│          الإعدادات           │  ← Header
│                             │
│  ┌───────────────────────┐  │
│  │  (📷)  أحمد محمد      │  │  ← Profile card
│  │  [✏️]  @ahmed_father   │  │
│  │        تعديل           │  │
│  └───────────────────────┘  │
│                             │
│  الحساب                     │
│  ┌───────────────────────┐  │
│  │ 🔒 تغيير كلمة المرور  ←│  │
│  │─────────────────────── │  │
│  │ 👥 الأبناء المرتبطين  ←│  │
│  └───────────────────────┘  │
│                             │
│  الإشعارات                  │
│  ┌───────────────────────┐  │
│  │ 🔔 تفعيل الإشعارات [●]│  │  ← Master toggle
│  │─────────────────────── │  │
│  │ ⭐ إشعار إكمال مرحلة[●]│  │  ← Sub-toggle
│  │─────────────────────── │  │
│  │ 🎯 إشعار إنجاز هدف [●]│  │
│  │─────────────────────── │  │
│  │ 🔥 إشعار السلسلة   [●]│  │
│  └───────────────────────┘  │
│                             │
│  التطبيق                    │
│  ┌───────────────────────┐  │
│  │ ℹ️ عن التطبيق        ←│  │
│  │─────────────────────── │  │
│  │ 📄 شروط الاستخدام    ←│  │
│  │─────────────────────── │  │
│  │ 🛡️ سياسة الخصوصية    ←│  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │     تسجيل الخروج      │  │  ← Logout (red)
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│       أبنائي | الأهداف      │  ← Father Nav
└─────────────────────────────┘
```

---

## Animations

Same as Son's settings (`20-settings-son.md`):

- Sections stagger in (100ms each)
- Toggle switches animate smoothly (200ms)
- Logout shows confirmation modal (slides up, 300ms)
- Master toggle off → sub-toggles animate to disabled (opacity to 40%, 200ms)

---

## Interaction

| Action                     | Result                                                  |
| -------------------------- | ------------------------------------------------------- |
| Tap profile edit           | Navigate to edit profile                                |
| Tap chevron row            | Navigate to sub-screen                                  |
| Toggle master notification | Enable/disable all notifications + controls sub-toggles |
| Toggle sub-notification    | Enable/disable specific notification type               |
| Tap logout                 | Show confirmation modal (same as Son's)                 |
| Confirm logout             | Clear session → Landing screen (`05-landing-screen.md`) |

---

## Assets Needed

Same as Son's settings — shared assets.
