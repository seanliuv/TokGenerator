<script lang="ts">
  import './layout.css';
  import { ModeWatcher } from 'mode-watcher';
  import { page } from '$app/state';
  import { SITE_ROOTURL, websiteJsonLd } from '$lib/config/site';

  let { children } = $props();

  let canonicalUrl = $derived(SITE_ROOTURL.replace(/\/$/, '') + page.url.pathname);
</script>

<svelte:head>
  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalUrl} />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />

  <!-- JSON-LD Structured Data -->
  {@html `<script type="application/ld+json">${JSON.stringify(websiteJsonLd)}</script>`}
</svelte:head>

<ModeWatcher defaultMode="light" />

{@render children()}
