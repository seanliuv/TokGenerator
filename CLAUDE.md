# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Configuration

- **Language**: TypeScript
- **Package Manager**: pnpm
- **Framework**: SvelteKit 2 + Svelte 5 (Runes) + html-to-image + mode-watcher
- **Styling**: Tailwind CSS v4 + shadcn-svelte (via bits-ui)
- **Deploy Target**: Cloudflare Workers (`@sveltejs/adapter-cloudflare`)
- **Add-ons**: eslint, vitest, tailwindcss, sveltekit-adapter, mdsvex, mcp

---

## Commands

```bash
pnpm run dev              # Start dev server
pnpm run build            # Production build
pnpm run preview          # Build + run with Wrangler locally
pnpm run check            # svelte-check (TypeScript + Svelte diagnostics)
pnpm run lint             # ESLint
pnpm run test             # Run unit tests (vitest, single run)
pnpm run test:unit        # Run vitest in watch mode
pnpm run deploy           # Build + deploy to Cloudflare Workers

# Browser extension (WXT + Svelte, lives in /extension — do not run wxt from repo root)
pnpm run ext:dev          # WXT dev (loads unpacked Chrome extension)
pnpm run ext:build        # Production MV3 build → extension/.output/chrome-mv3
pnpm run ext:zip          # Zip for Chrome Web Store
pnpm run ext:check        # svelte-check for the extension package
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

### Preview Node Reference — `Generator.svelte`

`previewNode` is owned by `Generator`. It is threaded down via:
- A callback prop `bindPreviewNode` into `PreviewPanel`
- A getter function `getPreviewNode` passed to `ControlSidebar` → `ExportButtons`

This avoids Svelte context and keeps the DOM ref scoped to the section.

### Component Layers

```
src/lib/components/
├── layout/          # Navbar — sticky header with nav links + theme toggle and Footer
├── sections/        # Full-page sections (GeneratorSection, FeaturesSection, UsageSection, FaqSection)
├── generator/       # Generator(combine ControlSidebar and PreviewPanel) — layout orchestration for the generator UI
├── atoms/           # Store-connected interactive controls (AvatarInput, Engagement, CommentTextarea,
│                    #   CardThemeToggle, PlatformSelector, ExportButtons)
├── platforms/       # Platform-specific pure preview renderers (props-only, no store reads)
│                    #   TikTokVideoCommentPreview, TikTokCommentReplyPreview
├── magic/           # Decorative animation components (ShineBorder)
└── ui/              # shadcn-svelte primitives built on bits-ui
    ├── avatar/      # Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup
    ├── button/      # Button (variants: default, outline, secondary, ghost, destructive, link)
    ├── card/        # Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
    ├── dropdown-menu/ # Full dropdown menu family (items, checkboxes, radios, sub-menus, portal)
    ├── input/       # Input (text / number; excludes file type)
    ├── select/      # Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, portal
    ├── separator/   # Separator
    ├── tabs/        # Tabs, TabsList (line variant supported), TabsTrigger, TabsContent
    ├── textarea/    # Textarea
    ├── toggle/      # Toggle (variants: default, outline, ghost)
    └── toggle-group/ # ToggleGroup + ToggleGroupItem
```

#### Component Hierarchy

```
Generator                             ← orchestrator; owns previewNode refs (mobile + desktop)
├── ControlSidebar                    ← layout: desktop = single column, mobile = tabbed (Avatar/Comment/Theme)
│   ├── PlatformSelector              ← sets commentStore.platform + .subType
│   ├── AvatarInput                   ← avatar fetch (randomuser.me) or file upload; sets username + isVerified
│   ├── Engagement                    ← time/likes/replies controls; shown only for video-comment subType
│   ├── CommentTextarea               ← 150-char textarea + emoji picker (emoji-picker-element, lazy)
│   ├── CardThemeToggle               ← light/dark toggle for preview card
│   └── ExportButtons                 ← PNG export + copy-to-clipboard; receives getPreviewNode callback
└── PreviewPanel (×2: mobile/desktop) ← reads store; scales 0.8× on mobile, 1× on desktop
    ├── TikTokCommentReplyPreview     ← speech-bubble layout; pure props (username, avatarUrl, theme, …)
    └── TikTokVideoCommentPreview     ← full comment card with engagement row; pure props
```

**ControlSidebar** composes atoms directly — there is no separate per-platform `*Controls` component at present; TikTok is the only active platform.

**PreviewPanel** selects which platform preview to render based on `commentStore.platform` + `commentStore.subType`. Preview components **do not read the store** — they receive all data as props from PreviewPanel.

**Engagement** is rendered conditionally: only when `commentStore.subType === 'video-comment'`.

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
