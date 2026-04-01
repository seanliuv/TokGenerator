<script lang="ts">
  import { ChevronDown } from '@lucide/svelte';
  import { slide } from 'svelte/transition';
  import { faqs } from '$lib/config/site';

  let openIndex: number | null = $state(null);

  function toggle(i: number) {
    openIndex = openIndex === i ? null : i;
  }
</script>

<section id="faq" class="px-6 py-20 md:py-28">
  <div class="mx-auto max-w-5xl">
    <!-- Section header -->
    <div class="mb-12 text-center">
      <div
        class="mb-4 inline-flex items-center rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold text-muted-foreground"
      >
        FAQ
      </div>
      <h2 class="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Frequently asked questions</h2>
    </div>

    <!-- Accordion -->
    <div class="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
      {#each faqs as faq, i}
        <div>
          <button
            class="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-foreground transition-colors hover:bg-secondary/50"
            onclick={() => toggle(i)}
            aria-expanded={openIndex === i}
          >
            <span>{faq.question}</span>
            <span class="shrink-0 transition-transform duration-200" class:rotate-180={openIndex === i}>
              <ChevronDown size={16} class="text-muted-foreground" />
            </span>
          </button>

          {#if openIndex === i}
            <div transition:slide={{ duration: 180 }}>
              <p class="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
