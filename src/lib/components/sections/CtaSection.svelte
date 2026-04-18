<script lang="ts">
  import { Check, X, ArrowRight } from '@lucide/svelte';
  import { comparisons } from '$lib/config/site';
  import { ShineBorder } from '$lib/components/magic/shine-border';

  const NEGATIVE_VALUES = new Set([
    'Paid, limited daily free trial',
    'Approximate',
    'Simplified',
    'Basic',
    'Yes',
    'Cloud-based',
    'Standard PNG',
  ]);

  function isNegative(value: string): boolean {
    return NEGATIVE_VALUES.has(value);
  }
</script>

<section id="compare" class="border-b border-border px-2 py-5 md:px-10 md:py-20">
  <div class="mx-auto max-w-6xl">
    <!-- Section header -->
    <div class="mb-12 text-center">
      <div
        class="mb-4 inline-flex items-center rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold text-muted-foreground"
      >
        Compare
      </div>
      <h2 class="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Why choose TokGenerator?</h2>
      <p class="mt-3 text-sm leading-relaxed text-muted-foreground">See how we stack up against the alternatives — feature by feature.</p>
    </div>

    <!-- Comparison table -->
    <div class="overflow-x-auto rounded-xl border border-border">
      <table class="w-full table-auto text-sm">
        <colgroup>
          <col style="width: 30%;" />
          <col style="width: 28%;" />
          <col style="width: 21%;" />
          <col style="width: 21%;" />
        </colgroup>
        <thead>
          <tr class="border-b border-border">
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"> Feature </th>
            <th
              class="px-5 py-3.5 text-center text-xs font-semibold"
              style="background: oklch(0.55 0.18 250 / 0.1); color: var(--gen-accent);"
            >
              <div class="flex flex-col items-center gap-1">
                <span class="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style="background: var(--gen-accent);">
                  Best Choice
                </span>
                <span>TokGenerator</span>
              </div>
            </th>
            <th class="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground"> TokComment </th>
            <th class="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground"> Postfully </th>
          </tr>
        </thead>
        <tbody>
          {#each comparisons as row, i}
            <tr class="border-b border-border last:border-0 {i % 2 !== 0 ? 'bg-secondary/30' : ''}">
              <td class="px-5 py-4 text-sm font-medium text-foreground">
                {row.feature}
              </td>
              <td class="px-5 py-4 text-center" style="background: oklch(0.55 0.18 250 / 0.04);">
                <div class="flex items-center justify-center gap-1.5">
                  <Check size={14} color="var(--gen-accent)" />
                  <span class="text-sm font-semibold" style="color: var(--gen-accent);">{row.TokGenerator}</span>
                </div>
              </td>
              <td class="px-5 py-4 text-center">
                <div class="flex items-center justify-center gap-1.5">
                  {#if isNegative(row.TokComment)}
                    <X size={14} class="shrink-0 text-muted-foreground" />
                  {/if}
                  <span class="text-sm text-muted-foreground">{row.TokComment}</span>
                </div>
              </td>
              <td class="px-5 py-4 text-center">
                <div class="flex items-center justify-center gap-1.5">
                  {#if isNegative(row.Postfully)}
                    <X size={14} class="shrink-0 text-muted-foreground" />
                  {/if}
                  <span class="text-sm text-muted-foreground">{row.Postfully}</span>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- CTA card -->
    <div class="relative mt-14 overflow-hidden rounded-2xl border border-border bg-card p-10 text-center">
      <!-- TikTok dual-tone radial glow -->
      <div
        class="pointer-events-none absolute inset-0"
        style="background: radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.55 0.22 0 / 0.08), transparent), radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.75 0.18 195 / 0.08), transparent);"
        aria-hidden="true"
      ></div>

      <!-- Animated TikTok-colored border -->
      <ShineBorder shineColor={['#FF0050', '#00F2EA']} borderWidth={1.5} duration={10} />

      <!-- Heading -->
      <h2 class="relative mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        Create your first TikTok comment in seconds
      </h2>

      <!-- Subtext -->
      <p class="relative mx-auto mb-8 max-w-md text-sm leading-relaxed text-muted-foreground">
        Generate, customize, and export a retina-quality PNG instantly — right in your browser.
      </p>

      <!-- CTA button -->
      <a
        href="/#hero"
        class="relative inline-flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
        style="background: var(--gen-accent);"
      >
        Try It Now
        <ArrowRight size={15} color="white" />
      </a>
    </div>
  </div>
</section>
