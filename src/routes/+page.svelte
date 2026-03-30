<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import GeneratorSection from '$lib/components/sections/GeneratorSection.svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import FeaturesSection from '$lib/components/sections/FeaturesSection.svelte';
	import UsageSection from '$lib/components/sections/UsageSection.svelte';
	import FaqSection from '$lib/components/sections/FaqSection.svelte';
</script>

<svelte:head>
	<title>TikTok Comment Generator — Free Comment Screenshot Tool | CommentGen</title>
	<meta name="description" content="Free TikTok comment generator. Create realistic TikTok comment screenshots instantly — video comments, bubble replies, light & dark themes. No login, no watermarks." />
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
