<script lang="ts">
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import FeaturesSection from '$lib/components/sections/FeaturesSection.svelte';
  import UsageSection from '$lib/components/sections/UsageSection.svelte';
  import FaqSection from '$lib/components/sections/FaqSection.svelte';
  import { SITE_TITLE, SITE_DESCRIPTION } from '$lib/config/site';
</script>

<svelte:head>
  <title>{SITE_TITLE}</title>
  <meta name="description" content={SITE_DESCRIPTION} />
</svelte:head>

<Navbar />
<main>
  <HeroSection />
  <FeaturesSection />
  <UsageSection />
  <FaqSection />
</main>
<Footer />
