# Spero design tokens

The storefront, staff login, and admin share visual values in
`src/styles/tokens.css`. It is imported once by `src/app/globals.css`.
`src/styles/theme.ts` maps those CSS variables into Chakra's theme. Edit the
CSS value once to update both CSS and Chakra consumers. Font families come
from the existing Next font variables on the root HTML element.

## Layers

1. **Foundations:** the existing palette (`--ink`, `--cream`), spacing
   (`--space-*`), fluid type (`--fs-*`), tracking, line heights, and motion.
2. **Semantic roles:** surfaces, text, borders, actions, statuses, and layout.
   Prefer these for new work so changing a role does not change unrelated uses
   of the same color.
3. **Components:** local CSS or Chakra variants consume these roles. Keep
   one-off artwork dimensions local rather than making every value a token.

Existing foundation names remain supported. This migration does not require
rewriting existing pages or changing their editorial type sizes.

## Shared roles

| CSS | Chakra | Use |
| --- | --- | --- |
| `--surface-page` | `surface.page` | Page background |
| `--surface-panel` | `surface.panel` | Panel or input background |
| `--surface-subtle` | `surface.subtle` | Alternate section background |
| `--surface-hover` | `surface.hover` | Hover/selection surface |
| `--text-primary` | `text.primary` | Main text |
| `--text-muted` | `text.muted` | Supporting readable text |
| `--text-inverse` | `text.inverse` | Text on dark surfaces |
| `--border-default` | `border.default` | Dividers and panel borders |
| `--border-interactive` | `border.interactive` | Hovered control borders |
| `--status-success` | `status.success` | Positive results |
| `--status-danger` | `status.danger` | Errors and destructive text |
| `--status-warning` | `status.warning` | Attention needed |
| `--status-info` | `status.info` | Informational text |

Status surface tokens provide matching pale backgrounds. Do not use status
color alone to convey meaning: retain labels and error messages.
`--ink-faint` is a legacy decorative color, not a readable text role.

## Usage

```css
.panel {
  background: var(--surface-panel);
  color: var(--text-primary);
  border: var(--border-width) solid var(--border-default);
  border-radius: var(--panel-radius);
  padding: var(--space-5);
}
```

```tsx
<Container maxW="content" px="gutter">
  <Text color="text.muted">Updated today</Text>
  <Button variant="primary">Save changes</Button>
  <Button variant="secondary">Cancel</Button>
</Container>
```

The shared primary and secondary button variants are opt-in. Existing Chakra
color-scheme buttons retain their intent. Inputs, selects, textareas, headings,
and table typography use shared defaults. Intentional local overrides still win.

## Spacing and layout

CSS uses the established editorial `--space-1` through `--space-11` scale.
**Chakra numeric spacing is unchanged:** `p={5}` is not `--space-5`. Use named
Chakra keys `gutter`, `stack`, and `section` when sharing layout spacing with
CSS. This avoids silently resizing every existing Chakra component.

Named Chakra widths are `reading`, `content`, `wide`, `page`, and `form`,
corresponding to `--layout-*` variables. Radii are `control`, `panel`, and
`pill`; shadows are `panel` and `overlay`.

Breakpoints are mobile below 640px, tablet from 640px, laptop from 1024px,
and desktop from 1440px. Chakra also retains 1920px and 2560px breakpoints.
CSS media queries cannot resolve custom properties: keep literal query
boundaries aligned with `theme.ts`. Responsive semantic gutters and section
spacing are defined in `tokens.css`.

## Accessibility and extension

Focus styling and selection colors are shared globally, and reduced-motion
preferences are honored. Motion tokens separate short interactions from
editorial transitions. Keep foreground/background pairs together when changing
the palette and check contrast after changes.

This is a light theme; dark mode requires explicit semantic overrides and
visual verification. The Chakra theme deliberately disables automatic system
color-mode switching rather than combining light CSS with dark defaults.

Before adding a token, reuse a role if the intent matches. Add a foundation
only for a reusable value and a semantic alias for its purpose. Expose it in
`theme.ts` when Chakra components need it. Image overlays, photographic filters,
bespoke layouts, and unconverted local dimensions remain component-owned.
