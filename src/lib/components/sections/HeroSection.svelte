<script lang="ts">
  import { Sparkles, Download, Shield, Zap, ArrowDown } from '@lucide/svelte';
  import { hero } from '$lib/config/site';
</script>

<section id="hero" class="relative overflow-hidden border-b border-border px-6 py-20 md:py-28">
  <!-- Subtle blue radial glow at top -->
  <div
    class="pointer-events-none absolute inset-0"
    style="background: radial-gradient(ellipse 70% 45% at 50% -5%, oklch(0.55 0.18 250 / 0.08), transparent);"
    aria-hidden="true"
  ></div>

  <div class="relative mx-auto max-w-4xl text-center">
    <!-- Badge -->
    <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
      <span class="inline-block size-1.5 rounded-full" style="background: var(--gen-accent);"></span>
      {hero.badge}
    </div>

    <!-- H1 -->
    <h1 class="mb-5 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
      {hero.h1}<br />
      <span style="color: var(--gen-accent);">{hero.h1Accent}</span><br />
      {hero.h1End}
    </h1>

    <!-- Subtext -->
    <p class="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
      {hero.subtext}
    </p>

    <!-- CTAs -->
    <div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <a
        href={hero.ctas[0].href}
        class="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
        style="background: var(--gen-accent);"
      >
        <Sparkles size={15} />
        {hero.ctas[0].label}
      </a>
      <a
        href={hero.ctas[1].href}
        class="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground no-underline transition-colors hover:bg-secondary"
      >
        {hero.ctas[1].label}
        <ArrowDown size={14} />
      </a>
    </div>

    <!-- Stats row -->
    <div class="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
      <div class="flex items-center gap-1.5">
        <Shield size={14} color="var(--gen-accent)" />
        <span>{hero.stats[0].label}</span>
      </div>
      <span class="hidden h-3.5 w-px bg-border sm:block"></span>
      <div class="flex items-center gap-1.5">
        <Zap size={14} color="var(--gen-accent)" />
        <span>{hero.stats[1].label}</span>
      </div>
      <span class="hidden h-3.5 w-px bg-border sm:block"></span>
      <div class="flex items-center gap-1.5">
        <Download size={14} color="var(--gen-accent)" />
        <span>{hero.stats[2].label}</span>
      </div>
    </div>
  </div>
</section>
