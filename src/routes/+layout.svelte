<script lang="ts">
  import './layout.css';
  import { ModeWatcher } from 'mode-watcher';
  import { env } from '$env/dynamic/public';
  import {
    SITE_NAME,
    SITE_ROOTURL,
    SITE_TITLE,
    SITE_DESCRIPTION,
    SITE_OG_IMAGE,
    SITE_OG_TITLE,
    SITE_OG_DESCRIPTION,
    websiteJsonLd,
    faqJsonLd,
  } from '$lib/config/site';
  import GoogleAnalytics from '$lib/components/atoms/GoogleAnalytics.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <!-- Essential Meta Tags -->
  <title>{SITE_TITLE}</title>
  <meta name="description" content={SITE_DESCRIPTION} />
  <meta name="keywords" content="TikTok comment generator, fake TikTok comments, comment mockup, TikTok ads" />

  <!-- Open Graph (Social Media) -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={SITE_OG_TITLE} />
  <meta property="og:description" content={SITE_OG_DESCRIPTION} />
  <meta property="og:image" content={SITE_OG_IMAGE} />
  <meta property="og:url" content={SITE_ROOTURL} />
  <meta property="og:site_name" content={SITE_NAME} />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={SITE_OG_TITLE} />
  <meta name="twitter:description" content={SITE_OG_DESCRIPTION} />
  <meta name="twitter:image" content={SITE_OG_IMAGE} />

  <!-- Canonical URL -->
  <link rel="canonical" href={SITE_ROOTURL} />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />

  <!-- JSON-LD Structured Data -->
  {@html `<script type="application/ld+json">${JSON.stringify(websiteJsonLd)}</script>`}
  {@html `<script type="application/ld+json">${JSON.stringify(faqJsonLd)}</script>`}
</svelte:head>

<ModeWatcher defaultMode="light" />

<GoogleAnalytics id={env.PUBLIC_GOOGLE_ANALYTICS_ID} />

{@render children()}
