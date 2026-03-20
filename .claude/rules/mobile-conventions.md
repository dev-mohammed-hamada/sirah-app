---
description: React Native / Expo mobile conventions and RTL rules
paths:
  - 'mobile/**'
---

## Code Style

- TypeScript strict mode
- Functional components + hooks only
- Files: `kebab-case.ts` | Components: `PascalCase`
- Zustand = client state, TanStack Query = server state
- Import Arabic strings from `../../i18n/ar`
- Import theme values from `../../theme` — never hardcode colors

## Screen Structure

- Screens live in `mobile/src/screens/{auth|son|father}/`
- Wrap screens in SafeAreaView
- Navigation types from `../../app/navigation/types`

## RTL (Right-to-Left)

All layout must be RTL-aware. Use these mappings:

| Forbidden           | Use Instead                          |
| ------------------- | ------------------------------------ |
| `paddingLeft`       | `paddingStart`                       |
| `paddingRight`      | `paddingEnd`                         |
| `marginLeft`        | `marginStart`                        |
| `marginRight`       | `marginEnd`                          |
| `borderLeftWidth`   | `borderStartWidth`                   |
| `borderRightWidth`  | `borderEndWidth`                     |
| `left:`             | `start:`                             |
| `right:`            | `end:`                               |
| `textAlign: 'left'` | `textAlign: 'right'` (Arabic is RTL) |

- Back arrow should point right in RTL, not left
- Do not use `transform: [{ scaleX: -1 }]` as RTL hack
- Do not use `I18nManager.isRTL` for layout hacks — the framework handles it

## Narrator

- Faceless silhouette, white thobe, always from behind/profile
- 4 states: Neutral, Excited, Encouraging, Celebrating
