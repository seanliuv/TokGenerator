<script lang="ts">
  import { SITE_TITLE, SITE_KEYWORD, SITE_DESCRIPTION } from '$lib/config/site';
  import Navbar from '$lib/components/layout/Navbar.svelte';
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
</svelte:head>

<Navbar />
<main>
  <HeroSection />
  <FeaturesSection />
  <UsageSection />
  <FaqSection />
  <CtaSection />
</main>
<Footer />
