# TikTok Comment Generator — Project Specification

A no-login social media comment screenshot generator. Users configure a comment card, preview it live, and export as a high-resolution PNG.

**Tech Stack:** SvelteKit 5 + Svelte 5 Runes + Tailwind CSS v4 + shadcn-svelte + html-to-image + mode-watcher

---

## Visual Reference

### TikTok Video Comment (Standard List Item)

### TikTok Comment Reply (Video Reply Sticker / Chat Bubble)

---

## Architecture

### State — `src/lib/stores/comment.svelte.ts`

Single Svelte 5 `$state` rune object, global singleton:

```ts
export const commentState = $state({
  platform: 'tiktok' as Platform,
  subType: 'video-comment' as SubType,

  // Avatar & identity
  username: 'Ella Green',
  avatarUrl: '',           // empty → gray placeholder circle
  isCelebrity: false,      // shows blue ✓ verified badge
  avatarMode: 'female' as 'male' | 'female' | 'celebrity' | 'custom',

  // Comment content
  commentText: 'Write any comment and see what happens 😊',

  // Engagement (only used by video-comment subType)
  time: { value: 1, unit: 'days' as TimeUnit },
  likes: 1393,
  replies: 2,

  // Theming
  cardTheme: 'light' as 'light' | 'dark',
})
```

Types:
```ts
type Platform = 'tiktok' | 'instagram' | 'youtube' | 'twitter'
type SubType  = 'comment-reply' | 'video-comment'
type TimeUnit = 'mins' | 'hrs' | 'days' | 'wks'
```

### Data — `src/lib/data/celebrities.ts`

~20 hardcoded entries, no external API needed:
```ts
export type Celebrity = { name: string; avatarUrl: string }
export const CELEBRITIES: Celebrity[] = [
  { name: 'Nicki Minaj',   avatarUrl: 'https://upload.wikimedia.org/…' },
  { name: 'Billie Eilish', avatarUrl: '…' },
  // …
]
```

### Utils

| File | Exports |
|---|---|
| `src/lib/utils/avatar.ts` | `fetchRandomUser(gender)` → `{name, avatarUrl}` via randomuser.me; `getRandomCelebrity()` → picks from CELEBRITIES; `fileToDataUrl(file)` |
| `src/lib/utils/export.ts` | `exportAsPng(node, filename)` — calls `toPng` twice (font cache warm-up), `pixelRatio: 2`; `copyToClipboard(node)` |

---

## Component Tree

```
src/lib/components/
├── layout/
│   └── Navbar.svelte                        # Sticky header
├── sections/
│   ├── GeneratorSection.svelte              # Full-height tool section
│   ├── FeaturesSection.svelte               # Landing page: feature grid
│   ├── UsageSection.svelte                  # Landing page: how-to steps
│   └── FaqSection.svelte                    # Landing page: accordion Q&A
├── generator/
│   ├── ControlSidebar.svelte                # Left panel dispatcher
│   └── PreviewPanel.svelte                  # Right panel dispatcher
├── atoms/                                   # Reusable, platform-agnostic
│   ├── PlatformSelector.svelte
│   ├── AvatarInput.svelte
│   ├── Engagement.svelte
│   ├── CommentTextarea.svelte
│   ├── CardThemeToggle.svelte
│   └── ExportButtons.svelte
└── platforms/                               # One pair per (platform × subType)
    ├── TikTokCommentReplyControls.svelte
    ├── TikTokCommentReplyPreview.svelte
    ├── TikTokVideoCommentControls.svelte
    └── TikTokVideoCommentPreview.svelte
```

### Navbar

- `position: sticky; top: 0; z-index: 50` with `backdrop-blur`
- Desktop: Logo | Home · Features · Usage · FAQ (anchor links) | Theme toggle
- Mobile: Logo only | Theme toggle (nav links hidden)

### ControlSidebar

Stacked layout with three zones:

1. **Top (fixed):** `<PlatformSelector>` → `<CardThemeToggle>`
2. **Middle (scrollable):** dynamically renders the active platform's Controls component
3. **Bottom (sticky):** `<ExportButtons>`
xin xi
### PreviewPanel

Renders the active platform's Preview component centered in the panel. Passes derived props from `commentState`.

### Atom: PlatformSelector

- Row 1: 4 icon buttons — TikTok, Instagram, YouTube, X (Twitter)
  - TikTok: active/enabled. Others: `disabled`, `opacity-50`, `cursor-not-allowed`, tooltip "Coming soon"
  - Uses `@icons-pack/svelte-simple-icons` for brand SVG icons
- Row 2 (TikTok only): `Comment Reply` | `Video Comment` toggle pills

### Atom: AvatarInput

```
[avatar circle]  [username input field]  [upload icon] [shuffle icon] [user-type dropdown ▾]
```

- Avatar circle: shows image if `avatarUrl` set, otherwise gray SVG placeholder
- Upload icon: hidden `<input type="file" accept="image/*">`, triggers `fileToDataUrl`
- Shuffle icon (↻): re-fetches a new random user/celebrity in the current `avatarMode`; icon spins while loading
- User-type dropdown: Male / Female / Celebrity — sets `avatarMode`, triggers fetch

### Atom: Engagement

Controls for video-comment only:

```
[🕐]  [value input]  [unit select ▾]       ← time row
[♡]   [likes input]  [💬] [replies input]   ← interaction row
[🔀 Randomize]                              ← randomize button
```

- Unit options: mins / hrs / days / wks
- Randomize sets plausible random values for all fields

### Atom: CommentTextarea

- `<textarea>` with auto-growing height
- Character count display (bottom-right), max 150
- Emoji picker (emoji-picker-element, lazy-loaded) opens on emoji button click; inserts at cursor position
- Removes default browser `:focus` outline (custom ring styling applied)

### Atom: CardThemeToggle

Two-tab pill: `Light` | `Dark`. Affects only `commentState.cardTheme`, not global app theme.

### Atom: ExportButtons

- **Export Image**: calls `exportAsPng(previewRef, 'tiktok-comment.png')`
- **Copy**: calls `copyToClipboard(previewRef)`, shows success checkmark briefly
- `previewRef` passed via Svelte context from GeneratorSection

---

## Preview Components (Pixel-Perfect Cards)

Both cards accept props (derived from store), do **not** read the store directly. Both support `theme: 'light' | 'dark'` via `data-theme` attribute + CSS variables (avoids conflict with global theme class).

### TikTokVideoCommentPreview

Props: `{ username, avatarUrl, isCelebrity, time, likes, replies, commentText, theme }`

Pixel-accurate recreation of a TikTok comment list row:

| Element | Detail |
|---|---|
| Avatar | 40px circle, `object-cover`, gray placeholder if no URL |
| Username | semibold, ~14px; blue ✓ (filled circle, white check) if `isCelebrity` |
| Like count | right-aligned, heart icon (outline) + formatted number (1393 → "1,393"), thumbs-down icon |
| Time | muted color, formatted from `{value, unit}` (e.g. "1d", "2w", "3mo") |
| Reply label | semibold, same row as time |
| Divider row | short `—` line + "View N replies ∨" in muted text |
| Background | white (`#fff`) light / near-black (`#121212`) dark |

### TikTokCommentReplyPreview

Props: `{ username, avatarUrl, isCelebrity, commentText, theme }`

Pixel-accurate recreation of TikTok's video reply sticker:

| Element | Detail |
|---|---|
| Bubble shape | rounded rect (16px radius) + triangular pointer at bottom-left |
| Header | "Reply to [username]'s [✓] comment" — muted gray, ~13px |
| Comment text | bold, ~24px, white in dark mode / black in light mode |
| Avatar | ~64px circle at bottom-left, overlapping bubble edge |
| Background | white / `#1c1c1c` dark |

---

## Responsive Layout

### Desktop (≥768px)

```
┌──────────────────────────────────────────────────────┐
│  Navbar — sticky                                      │
├───────────────┬──────────────────────────────────────┤
│               │                                      │
│  ControlPanel │  PreviewPanel                        │
│  w-[320px]    │  (card centered, flex-1)             │
│               │                                      │
│  [ExportBtns] │                                      │  ← sticky bottom
└───────────────┴──────────────────────────────────────┘
```

### Mobile (<768px)

```
┌────────────────────────┐
│  Navbar (Logo + 🌙)     │  ← sticky
├────────────────────────┤
│  PreviewPanel (20dvh)  │  ← preview card centered
├────────────────────────┤
│  Tabs: Comment/Engine  │
│  Control form area     │
│  (scrollable)          │
├────────────────────────┤
│  [↓ Export] [□ Copy]   │  ← sticky bottom bar
└────────────────────────┘
```

Mobile nav links hidden; export bar is `position: sticky; bottom: 0`.

---

## Page Structure

`src/routes/+page.svelte`:
```svelte
<GeneratorSection id="generator" />
<FeaturesSection  id="features"  />
<UsageSection     id="usage"     />
<FaqSection       id="faq"       />
```

Placeholder sections share a common structure: large heading + `text-muted-foreground` subtitle + `min-h-[400px]`.

---

## Styling System

`src/routes/layout.css` defines OKLCH CSS variables:

| Token | Value | Usage |
|---|---|---|
| `--background` | `oklch(1 0 0)` / `oklch(0.145 0 0)` | Page background |
| `--foreground` | `oklch(0.145 0 0)` / `oklch(0.985 0 0)` | Primary text |
| `--muted-foreground` | `oklch(0.556 0 0)` | Timestamps, secondary text |
| `--gen-accent` | `oklch(0.55 0.18 250)` | Blue accent (verified badges, active states) |

Comment cards use `data-theme="light"` / `data-theme="dark"` attribute scoping so card theming is independent from global app theme.

---

## Export Behavior

```ts
// html-to-image, called twice for font cache warmup
async function exportAsPng(node: HTMLElement, filename: string) {
  await toPng(node, { pixelRatio: 2 })          // warmup
  const dataUrl = await toPng(node, { pixelRatio: 2 })
  // trigger download
}
```

Output: PNG at 2× pixel ratio for Retina/HiDPI sharpness.

---

## Avatar Modes

| Mode | Username source | Avatar source |
|---|---|---|
| Male / Female | randomuser.me API (free, no auth) | randomuser.me photo URL |
| Celebrity | hardcoded name from CELEBRITIES | Wikipedia Commons public-domain URL |
| Custom | user types manually | local File → data URL (no upload) |

---

