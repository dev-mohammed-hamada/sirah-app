---
name: rtl-check
description: Verify RTL compliance in React Native code. Use when reviewing UI code, creating new screens, or auditing existing components for RTL correctness.
user-invocable: true
allowed-tools: Read, Grep, Glob
context: fork
agent: Explore
argument-hint: [file-or-directory]
---

# RTL Compliance Check

Audit the specified file(s) or directory for RTL compliance violations. If no argument given, check `mobile/src/`.

## Target
$ARGUMENTS

## Rules to Check

### 1. No `left`/`right` in styles
Search for these violations:
- `paddingLeft`, `paddingRight` → should be `paddingStart`, `paddingEnd`
- `marginLeft`, `marginRight` → should be `marginStart`, `marginEnd`
- `borderLeftWidth`, `borderRightWidth` → should be `borderStartWidth`, `borderEndWidth`
- `left:`, `right:` in positioning → should be `start:`, `end:`
- `textAlign: 'left'` or `textAlign: 'right'` → should be `'right'` for RTL default or use logical values

### 2. No hardcoded Arabic text in components
All user-facing strings must come from `i18n/ar.ts`, never inline in JSX.

### 3. Directional icons
- Back arrow should point right (→) not left (←) in RTL
- Check that `transform: [{ scaleX: -1 }]` is not used as RTL hack

### 4. Layout direction
- `flexDirection: 'row'` is fine (React Native respects RTL automatically)
- Check `I18nManager.isRTL` is not used for layout hacks

## Output Format

For each violation found:
```
[VIOLATION] file:line — description
  Found: `paddingLeft: 16`
  Fix: `paddingStart: 16`
```

End with a summary: `X violations found in Y files`
