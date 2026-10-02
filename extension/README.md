# TokGenerator Extension

WXT + Svelte 5 side panel that hosts the comment generator. Independent from the SvelteKit website.

## Develop

From the repo root:

```bash
pnpm install
pnpm run ext:dev
```

Or from this directory:

```bash
pnpm dev
```

WXT starts Chrome with the unpacked extension. Click the toolbar icon to open the side panel.

## Build

```bash
pnpm run ext:build   # extension/.output/chrome-mv3
pnpm run ext:zip     # zip for Chrome Web Store
```

Load unpacked: `chrome://extensions` → Developer mode → Load unpacked → select `.output/chrome-mv3`.

## Notes

- Random avatars fetch `randomuser.me` directly (no website `/api/avatar`).
- Emoji picker data is loaded from jsdelivr (see `host_permissions`).
- Firefox (`pnpm --dir extension dev:firefox`) uses `sidebar_action`; Chrome `sidePanel` APIs are skipped there.
