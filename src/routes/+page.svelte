<script lang="ts">
  import {
    SITE_TITLE,
    SITE_KEYWORD,
    SITE_DESCRIPTION,
    SITE_NAME,
    SITE_ROOTURL,
    SITE_OG_IMAGE,
    SITE_OG_TITLE,
    SITE_OG_DESCRIPTION,
    faqJsonLd,
  } from '$lib/config/site';
  import { env } from '$env/dynamic/public';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import GoogleAnalytics from '$lib/components/atoms/GoogleAnalytics.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import FeaturesSection from '$lib/components/sections/FeaturesSection.svelte';
  import UsageSection from '$lib/components/sections/UsageSection.svelte';
  import FaqSection from '$lib/components/sections/FaqSection.svelte';
  import CtaSection from '$lib/components/sections/CtaSection.svelte';
</script>

<svelte:head>
  <!-- Essential Meta Tags -->
  <title>{SITE_TITLE}</title>
  <meta name="description" content={SITE_DESCRIPTION} />
  <meta name="keywords" content={SITE_KEYWORD} />

  <!-- Preconnect to Google Analytics -->
  <link rel="preconnect" href="https://www.googletagmanager.com" />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

  <!-- Font Preloads (TikTok Sans — used in preview card only) -->
  <link rel="preload" href="/fonts/TikTokSans12pt-Regular.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/fonts/TikTokSans12pt-SemiBold.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href="/fonts/TikTokSans36pt-Bold.woff2" as="font" type="font/woff2" crossorigin="anonymous" />

  <!-- Open Graph -->
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

  <!-- FAQ Structured Data -->
  {@html `<script type="application/ld+json">${JSON.stringify(faqJsonLd)}</script>`}
</svelte:head>

<GoogleAnalytics id={env.PUBLIC_GOOGLE_ANALYTICS_ID} />
<Navbar />
<main>
  <HeroSection />
  <FeaturesSection />
  <UsageSection />
  <FaqSection />
  <CtaSection />
</main>
<Footer />
