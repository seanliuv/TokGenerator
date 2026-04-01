<script lang="ts">
  import { SITE_NAME } from '$lib/config/site';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';

  let { children } = $props();
</script>

<Navbar />

<main class="min-h-[calc(100dvh-56px)]">
  <!-- Back link -->
  <div class="mx-auto max-w-3xl px-6 pt-10">
    <a href="/" class="inline-flex items-center gap-1.5 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M19 12H5M12 5l-7 7 7 7" />
      </svg>
      Back to {SITE_NAME}
    </a>
  </div>

  <!-- Prose content -->
  <article
    class="mx-auto px-6 py-10 pb-20 prose prose-neutral dark:prose-invert
    prose-headings:font-bold prose-headings:tracking-tight
    prose-h1:text-3xl prose-h1:mb-2
    prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3
    prose-p:text-muted-foreground prose-p:leading-relaxed
    prose-li:text-muted-foreground
    prose-a:text-foreground prose-a:font-medium prose-a:no-underline hover:prose-a:underline
    prose-strong:text-foreground
    max-w-7xl"
  >
    {@render children()}
  </article>
</main>

<Footer />
