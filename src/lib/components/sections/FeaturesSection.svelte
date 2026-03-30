<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import { features } from '$lib/config/site';
</script>

<section id="features" class="border-b border-border px-6 py-20 md:py-28">
  <div class="mx-auto max-w-5xl">
    <!-- Section header -->
    <div class="mb-12 text-center">
      <div class="mb-4 inline-flex items-center rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold text-muted-foreground">
        Features
      </div>
      <h2 class="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Everything you need to create<br class="hidden md:block" />
        perfect TikTok comment images
      </h2>
    </div>

    <!-- Feature grid: 1-col → 2-col → 3-col -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each features as feature}
        <Card.Root class="border-border bg-card p-6 transition-shadow hover:shadow-md">
          <div
            class="mb-4 flex size-9 items-center justify-center rounded-md"
            style="background: oklch(0.55 0.18 250 / 0.1);"
          >
            <svelte:component this={feature.icon} size={18} color="var(--gen-accent)" />
          </div>
          <h3 class="mb-2 text-sm font-semibold text-foreground">{feature.title}</h3>
          <p class="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
        </Card.Root>
      {/each}
    </div>
  </div>
</section>
