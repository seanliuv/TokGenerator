<script lang="ts">
  import { hero } from '$lib/config/site';
  import { Download, Shield, Zap } from '@lucide/svelte';
  import Generator from '$lib/components/generator/Generator.svelte';
</script>

<section id="hero" class="relative flex min-h-svh flex-col overflow-hidden border-b border-border md:px-6 md:py-16">
  <!-- Subtle TikTok dual-tone radial glow at top -->
  <div
    class="pointer-events-none absolute inset-0"
    style="background: radial-gradient(ellipse 60% 40% at 20% 0%, oklch(0.55 0.22 0 / 0.07), transparent), radial-gradient(ellipse 60% 40% at 80% 0%, oklch(0.75 0.18 195 / 0.07), transparent);"
    aria-hidden="true"
  ></div>

  <div class="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center text-center">
    <!-- H1 -->
    <h1
      class="mb-5 bg-linear-to-r from-[#FF0050] via-[#FF8C00] to-[#00F2EA] bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent md:text-5xl lg:text-6xl"
    >
      {hero.h1}
    </h1>

    <!-- Subtext -->
    <p class="mx-auto mb-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
      {hero.subTitle}
    </p>

    <!-- Stats row -->
    <div class="mb-8 flex shrink-0 flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
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

    <!-- Generator -->
    <div class="flex flex-1 flex-col items-center min-h-0 w-full">
      <Generator />
    </div>
  </div>
</section>
