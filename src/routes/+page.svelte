<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import GeneratorSection from '$lib/components/sections/GeneratorSection.svelte';
	import FeaturesSection from '$lib/components/sections/FeaturesSection.svelte';
	import UsageSection from '$lib/components/sections/UsageSection.svelte';
	import FaqSection from '$lib/components/sections/FaqSection.svelte';
</script>

<svelte:head>
	<title>CommentGen — TikTok Comment Image Generator</title>
	<meta name="description" content="Generate realistic TikTok comment screenshots for free. No login required. Supports comment reply and video comment styles." />
</svelte:head>

<Navbar />
<main>
	<GeneratorSection />
	<FeaturesSection />
	<UsageSection />
	<FaqSection />
</main>
