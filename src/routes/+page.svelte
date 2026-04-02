<script lang="ts">
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import FeaturesSection from '$lib/components/sections/FeaturesSection.svelte';
  import UsageSection from '$lib/components/sections/UsageSection.svelte';
  import FaqSection from '$lib/components/sections/FaqSection.svelte';
  import { SITE_TITLE, SITE_ROOTURL, SITE_OG_TITLE, SITE_OG_DESCRIPTION, SITE_OG_IMAGE, SITE_DESCRIPTION } from '$lib/config/site';
</script>

<svelte:head>
  <title>{SITE_TITLE}</title>
  <meta name="description" content={SITE_DESCRIPTION} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={SITE_ROOTURL} />
  <meta property="og:title" content={SITE_OG_TITLE} />
  <meta property="og:description" content={SITE_OG_DESCRIPTION} />
  <meta property="og:image" content={SITE_OG_IMAGE} />

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={SITE_OG_TITLE} />
  <meta name="twitter:description" content={SITE_OG_DESCRIPTION} />
  <meta name="twitter:image" content={SITE_OG_IMAGE} />

  <!-- Canonical URL -->
  <link rel="canonical" href={SITE_ROOTURL} />
</svelte:head>

<Navbar />
<main>
  <HeroSection />
  <FeaturesSection />
  <UsageSection />
  <FaqSection />
</main>
<Footer />
