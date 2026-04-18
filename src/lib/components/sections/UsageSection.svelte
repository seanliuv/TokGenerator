<script lang="ts">
  import { usageSteps } from '$lib/config/site';
</script>

<section id="usage" class="px-2 py-5 md:px-10 md:py-20">
  <div class="mx-auto max-w-6xl">
    <!-- Section header -->
    <div class="mb-12 text-center">
      <div
        class="mb-4 inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-muted-foreground ring-1 ring-border"
      >
        How It Works
      </div>
      <h2 class="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Create a TikTok comment screenshot<br class="hidden md:block" />
        in four simple steps
      </h2>
    </div>

    <!-- Steps: vertical on mobile, 2×2 grid on desktop -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {#each usageSteps as step}
        <div class="flex gap-5 rounded-xl border border-border bg-card p-6">
          <!-- Step number -->
          <div class="shrink-0">
            <span class="block text-2xl font-bold leading-none tabular-nums" style="color: oklch(0.55 0.18 250 / 0.35);">
              {step.number}
            </span>
          </div>
          <!-- Content -->
          <div class="min-w-0">
            <div class="mb-2 flex items-center gap-2">
              <svelte:component this={step.icon} size={16} color="var(--gen-accent)" />
              <h3 class="text-sm font-semibold text-foreground">{step.title}</h3>
            </div>
            <p class="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
          </div>
        </div>
      {/each}
    </div>

    <!-- CTA nudge -->
    <div class="mt-10 text-center">
      <a
        href="/#hero"
        class="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
        style="background: var(--gen-accent);"
      >
        Try It Now — It's Free
      </a>
    </div>
  </div>
</section>
