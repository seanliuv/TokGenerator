<script lang="ts">
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import FeaturesSection from '$lib/components/sections/FeaturesSection.svelte';
  import UsageSection from '$lib/components/sections/UsageSection.svelte';
  import FaqSection from '$lib/components/sections/FaqSection.svelte';
  import CtaSection from '$lib/components/sections/CtaSection.svelte';
</script>

<Navbar />
<main>
  <HeroSection />
  <FeaturesSection />
  <UsageSection />
  <FaqSection />
  <CtaSection />
</main>
<Footer />
