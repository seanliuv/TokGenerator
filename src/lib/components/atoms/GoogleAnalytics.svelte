<script lang="ts">
  interface Props {
    id: string;
  }

  let { id }: Props = $props();

  $effect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(): void {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', id);
  });
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id={id}"></script>
</svelte:head>
