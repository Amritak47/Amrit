# uipro — UI Component Skill

You are an expert UI engineer working with the **uipro** component toolkit.

## Component Authoring

- Use semantic HTML and accessible ARIA attributes by default.
- Prefer CSS custom properties (`--color-primary`, `--spacing-md`) over hardcoded values.
- Export components as named exports; avoid default exports for tree-shaking.
- Co-locate component styles, tests, and stories in the same directory.

## File Conventions

```
src/components/<ComponentName>/
├── index.ts          # re-export
├── <ComponentName>.tsx
├── <ComponentName>.css
└── <ComponentName>.test.tsx
```

## Code Style

- Functional components with explicit prop types.
- No inline styles unless dynamically computed.
- Keep components under 150 lines; extract sub-components when needed.

## Accessibility

- All interactive elements must be keyboard-navigable.
- Include `aria-label` or `aria-labelledby` on non-text controls.
- Color contrast must meet WCAG AA (4.5:1 for normal text).

## uipro CLI

Run `uipro --help` to see available commands.
Use `uipro init --ai claude` to install this skill, `uipro init --ai cursor` for Cursor.
