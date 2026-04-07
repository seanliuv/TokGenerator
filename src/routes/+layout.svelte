<script lang="ts">
  import './layout.css';
  import { ModeWatcher } from 'mode-watcher';
  import { env } from '$env/dynamic/public';
  import GoogleAnalytics from '$lib/components/atoms/GoogleAnalytics.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/favicon.ico" />
</svelte:head>

<ModeWatcher defaultMode="light" />

<GoogleAnalytics id={env.PUBLIC_GOOGLE_ANALYTICS_ID} />

{@render children()}
