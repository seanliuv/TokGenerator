<script lang="ts">
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import GeneratorSection from '$lib/components/sections/GeneratorSection.svelte';
  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import FeaturesSection from '$lib/components/sections/FeaturesSection.svelte';
  import UsageSection from '$lib/components/sections/UsageSection.svelte';
  import FaqSection from '$lib/components/sections/FaqSection.svelte';
  import { SITE_TITLE, SITE_NAME, SITE_METADATA } from '$lib/config/site';
</script>

<svelte:head>
  <title>{SITE_TITLE} | {SITE_NAME}</title>
  <meta name="description" content={SITE_METADATA} />
</svelte:head>

<Navbar />
<main>
  <GeneratorSection />
  <HeroSection />
  <FeaturesSection />
  <UsageSection />
  <FaqSection />
</main>
<Footer />
