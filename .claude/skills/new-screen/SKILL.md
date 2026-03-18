---
name: new-screen
description: Scaffold a new React Native screen component following project conventions. Creates the screen file with proper RTL setup, theme imports, and navigation types.
user-invocable: true
disable-model-invocation: false
argument-hint: [ScreenName] [son|father|auth]
---

# Create New Screen

Create a new screen component following the Sirah project conventions.

## Arguments
- `$0` — Screen name in PascalCase (e.g., `BadgesScreen`)
- `$1` — Flow: `son`, `father`, or `auth`

## File Location
- `auth` → `mobile/src/screens/auth/$0.tsx`
- `son` → `mobile/src/screens/son/$0.tsx`
- `father` → `mobile/src/screens/father/$0.tsx`

## Template

The screen must follow these conventions:
1. **Functional component** with hooks only
2. **RTL-aware styles**: use `paddingStart`/`paddingEnd`, never `left`/`right`
3. **Theme imports**: colors, typography, spacing from `../../theme`
4. **Arabic strings**: all text from `../../i18n/ar`
5. **SafeAreaView** wrapper
6. **Navigation typed**: import correct param list from `../../app/navigation/types`
7. **File name**: PascalCase matching component name

## Steps
1. Create the screen file with the template
2. Add the screen to the appropriate navigator
3. Add navigation types if new params needed
4. Add any new Arabic strings to `i18n/ar.ts`
