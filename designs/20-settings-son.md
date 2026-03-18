# Screen 20: Settings Screen (Son)
### إعدادات الابن

> **Reference:** [00-design-system.md](00-design-system.md) for colors, typography, shared components (Toggle Switch, Setting Row, Primary Button).

---

## Purpose

Account management and app preferences for the son. Simple, clean, functional.

---

## Layout

- **Background:** Soft Cream (`#FAF3E8`)
- **Header:** "الإعدادات" — Cairo Bold 24px, Deep Night Blue, centered
- **Bottom Navigation:** Son's nav bar (Settings tab active)

### Profile Section (top card)

- **Card:** Warm Sand bg, 16px radius, Level 1 shadow, 16px padding
- **Avatar circle:** 80px, golden border (2px `#D4A843`)
  - Edit icon overlay: small pencil circle (24px) at bottom-right of avatar, Desert Gold bg, white pencil icon
- **Display name:** Cairo Bold 18px, Deep Night Blue (next to avatar)
- **Username:** "@username" — Cairo Regular 14px, Muted Gray (below display name)
- **Edit link:** "تعديل الملف الشخصي" — Cairo Regular 14px, Desert Gold, tappable

### Settings Groups

Each group has a section header and rows below:

#### الحساب (Account)
| Row | Icon | Label | Action |
|-----|------|-------|--------|
| 1 | 🔒 | تغيير كلمة المرور | Navigate → password change screen |
| 2 | 🔗 | الحسابات المرتبطة | Navigate → linked accounts list |

#### الإشعارات (Notifications)
| Row | Icon | Label | Action |
|-----|------|-------|--------|
| 1 | 🔔 | تفعيل الإشعارات | Toggle switch (on/off) |
| 2 | ⏰ | وقت التذكير اليومي | Time picker (default: 6:00 PM) |

#### التطبيق (App)
| Row | Icon | Label | Action |
|-----|------|-------|--------|
| 1 | ℹ️ | عن التطبيق | Navigate → About screen |
| 2 | 📄 | شروط الاستخدام | Navigate → Terms |
| 3 | 🛡️ | سياسة الخصوصية | Navigate → Privacy |

#### تسجيل الخروج
- Red text button at bottom: "تسجيل الخروج" — Cairo Bold 16px, Error Red, centered
- No icon, standalone button with 48px height, full-width, transparent bg, 12px radius
- Pressed: Error Red at 10% bg

**Section header style:** Cairo Bold 14px, Muted Gray, uppercase feel, 8px bottom margin, 24px top margin

---

## Visual Composition

```
┌─────────────────────────────┐
│          الإعدادات           │  ← Header
│                             │
│  ┌───────────────────────┐  │
│  │  (📷)  محمد أحمد      │  │  ← Profile card
│  │  [✏️]  @mohammed_123   │  │     Avatar + name + username
│  │        تعديل الملف     │  │     + edit link
│  └───────────────────────┘  │
│                             │
│  الحساب                     │  ← Section header
│  ┌───────────────────────┐  │
│  │ 🔒 تغيير كلمة المرور  ←│  │  ← Row with chevron
│  │─────────────────────── │  │
│  │ 🔗 الحسابات المرتبطة  ←│  │
│  └───────────────────────┘  │
│                             │
│  الإشعارات                  │  ← Section header
│  ┌───────────────────────┐  │
│  │ 🔔 تفعيل الإشعارات [●]│  │  ← Row with toggle
│  │─────────────────────── │  │
│  │ ⏰ وقت التذكير   ٦:٠٠م│  │  ← Row with time value
│  └───────────────────────┘  │
│                             │
│  التطبيق                    │  ← Section header
│  ┌───────────────────────┐  │
│  │ ℹ️ عن التطبيق        ←│  │
│  │─────────────────────── │  │
│  │ 📄 شروط الاستخدام    ←│  │
│  │─────────────────────── │  │
│  │ 🛡️ سياسة الخصوصية    ←│  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │     تسجيل الخروج      │  │  ← Logout (red text)
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│ ⚙️ | 🏆 | 🎯 | 📊 | 🏠    │  ← Bottom Nav (Settings active)
└─────────────────────────────┘
```

---

## Linked Accounts Sub-screen

When tapping "الحسابات المرتبطة":

- **Header:** "الحسابات المرتبطة" + back arrow
- **List of linked fathers:**
  - Each row: Father's avatar (40px) + display name + username
  - "إلغاء الربط" button on left (RTL): small, Error Red text, 12px
- **Empty state:** "لا توجد حسابات مرتبطة" + explanation text

---

## Animations

| # | Element | Animation | Duration | Notes |
|---|---------|-----------|----------|-------|
| 1 | Sections | Slide in with subtle stagger | 100ms each | Top to bottom |
| 2 | Toggle switch | Thumb slides + track color transitions | 200ms | Smooth |
| 3 | Logout tap | Confirmation modal slides up from bottom | 300ms (spring) | Before actual logout |
| 4 | Row tap | Row bg briefly highlights (Desert Gold at 5%) | 150ms | Tap feedback |

---

## Logout Confirmation Modal

- **Presentation:** Bottom sheet, 40% screen height
- **Background:** Starlight White, 24px top radius
- **Content:**
  - "تسجيل الخروج" — Cairo Bold 20px, Deep Night Blue
  - "هل أنت متأكد من تسجيل الخروج؟" — Cairo Regular 14px, Muted Gray
  - "تسجيل الخروج" — full-width button, Error Red bg, white text
  - "إلغاء" — full-width button, Secondary style
- **Animation:** Slides up (300ms spring), dark backdrop fades in (200ms)

---

## Interaction

| Action | Result |
|--------|--------|
| Tap profile edit | Navigate to profile edit (change name, avatar) |
| Tap setting row with chevron | Navigate to sub-screen |
| Toggle notification | Enable/disable notifications |
| Tap time picker | Native time picker opens |
| Tap logout | Show confirmation modal |
| Confirm logout | Clear session → navigate to Landing (`05-landing-screen.md`) |

---

## Assets Needed

| Asset | Description | Format |
|-------|-------------|--------|
| Default avatar | Placeholder avatar for users without custom photo | SVG/PNG, 80px |
| Pencil edit icon | Small circular edit button | SVG, 24px |
| Setting icons (8) | Lock, link, bell, clock, info, document, shield | SVG, 24px each |
