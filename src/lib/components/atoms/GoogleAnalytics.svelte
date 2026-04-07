<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    id: string;
  }

  let { id }: Props = $props();

  onMount(() => {
    const load = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(): void {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', id);

      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      script.async = true;
      document.head.appendChild(script);
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(load);
    } else {
      setTimeout(load, 0);
    }
  });
</script>
