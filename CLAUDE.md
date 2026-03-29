# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Configuration

- **Language**: TypeScript
- **Package Manager**: pnpm
- **Framework**: SvelteKit 2 + Svelte 5 (Runes)
- **Styling**: Tailwind CSS v4 + shadcn-svelte (via bits-ui)
- **Deploy Target**: Cloudflare Workers (`@sveltejs/adapter-cloudflare`)
- **Add-ons**: eslint, vitest, tailwindcss, sveltekit-adapter, mdsvex, mcp

---

## Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm preview          # Build + run with Wrangler locally
pnpm check            # svelte-check (TypeScript + Svelte diagnostics)
pnpm lint             # ESLint
pnpm test             # Run unit tests (vitest, single run)
pnpm test:unit        # Run vitest in watch mode
pnpm deploy           # Build + deploy to Cloudflare Workers
```

---

## Architecture

### State — `src/lib/stores/comment.svelte.ts`

Single Svelte 5 `$state` rune object wrapped in a factory function. Exported as `commentStore` — the **global singleton** for all UI state:

- `platform`: `'tiktok' | 'instagram' | 'youtube' | 'twitter'` (only TikTok is active)
- `subType`: `'comment-reply' | 'video-comment'` (+ future Instagram/YouTube/Shorts variants)
- `avatarMode`: drives which fetch strategy AvatarInput uses (`male | female | custom`)
- `isVerified`: shows a badge generically

The store exposes typed setters instead of direct mutation. **Never mutate store properties directly from components.**

### Preview Node Reference — `GeneratorSection.svelte`

`previewNode` is owned by `GeneratorSection`. It is threaded down via:
- A callback prop `bindPreviewNode` into `PreviewPanel`
- A getter function `getPreviewNode` passed to `ControlSidebar` → `ExportButtons`

This avoids Svelte context and keeps the DOM ref scoped to the section.

### Component Layers

```
src/lib/components/
├── layout/          # Navbar
├── sections/        # Full-page sections (Generator, Features, Usage, FAQ)
├── generator/       # ControlSidebar + PreviewPanel (dispatchers)
├── atoms/           # Platform-agnostic controls (AvatarInput, Engagement, etc.)
├── platforms/       # One Controls + one Preview per (platform × subType)
├── magic/           # Decorative animation components (ShineBorder)
└── ui/              # shadcn-svelte primitives (button, select, tabs, etc.)
```

**ControlSidebar** dynamically renders the active platform's `*Controls` component based on `commentStore.platform` + `commentStore.subType`.

**PreviewPanel** renders the active platform's `*Preview` component, passing store values as props. Preview components **do not read the store directly** — they receive all data as props.

### Styling

- CSS variables defined in `src/routes/layout.css` using OKLCH color tokens (`--background`, `--foreground`, `--muted-foreground`, `--gen-accent`)
- Comment cards use `data-theme="light"` / `data-theme="dark"` attribute scoping, **independent of global app theme** — this avoids conflicts with `mode-watcher`
- Add `export-exclude` CSS class to any DOM node that should be excluded from PNG export

### Export (`src/lib/utils/export.ts`)

`html-to-image` is called **twice** — first pass warms up SVG foreignObject font/image cache, second pass captures. Output is 2× pixel ratio (Retina). Both `exportAsPng` and `copyToClipboard` follow this double-render pattern.

### Avatar Modes (`src/lib/components/atoms/AvatarInput.svelte`)

| Mode | Name source | Avatar source |
|---|---|---|
| male / female | randomuser.me API | randomuser.me photo URL |
| custom | user types | local File → data URL |

---

## Svelte 5 Patterns Used

- `$state` for reactive state (store + local component state)
- `$derived` for computed values
- `$effect` for side effects
- Runes-mode only — no legacy `writable`/`readable` stores

---

## MCP Tools (Svelte)

You have access to a Svelte MCP server with these tools:

1. **`list-sections`** — call first to discover available docs sections
2. **`get-documentation`** — fetch full content for relevant sections (call after `list-sections`)
3. **`svelte-autofixer`** — **must call before sending any Svelte code to user**; iterate until no issues remain
4. **`playground-link`** — generate playground link only after explicit user confirmation, never when code was written to project files
