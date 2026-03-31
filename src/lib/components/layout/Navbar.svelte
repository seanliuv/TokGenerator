<script lang="ts">
  import { Sun, Moon, Menu, X } from '@lucide/svelte';
  import { toggleMode, mode } from 'mode-watcher';
  import { SITE_NAME } from '$lib/config/site';

  export const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'Usage', href: '#usage' },
    { label: 'FAQ', href: '#faq' },
  ];

  let mobileMenuOpen = $state(false);
</script>

<header
  class="sticky top-0 z-50 border-b border-border"
  style="background: color-mix(in oklch, var(--background) 88%, transparent); backdrop-filter: blur(12px);"
>
  <div class="mx-auto flex h-14 w-full max-w-7xl items-center gap-6 px-4 md:px-6">
    <!-- Logo -->
    <a href="/" class="flex shrink-0 items-center gap-2 no-underline" onclick={() => (mobileMenuOpen = false)}>
      <span class="flex h-7 w-7 items-center justify-center rounded-md text-sm text-white" style="background: var(--gen-accent);">✦</span>
      <span class="text-sm font-bold tracking-tight text-foreground">{SITE_NAME}</span>
    </a>

    <!-- Desktop nav links -->
    <nav class="hidden flex-1 items-center justify-center gap-3 md:flex" aria-label="Main navigation">
      {#each navLinks as link (link.label)}
        <a
          href={link.href}
          class="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground"
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <!-- Right actions -->
    <div class="ml-auto flex items-center gap-2">
      <button
        onclick={toggleMode}
        aria-label="Toggle theme"
        class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        {#if mode.current === 'dark'}
          <Sun size={18} />
        {:else}
          <Moon size={18} />
        {/if}
      </button>

      <!-- Mobile hamburger -->
      <button
        onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
        class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
      >
        {#if mobileMenuOpen}
          <X size={20} />
        {:else}
          <Menu size={20} />
        {/if}
      </button>
    </div>
  </div>
</header>

<!-- Mobile dropdown -->
{#if mobileMenuOpen}
  <nav class="sticky top-14 z-40 flex flex-col border-b border-border bg-background p-2 shadow-md md:hidden" aria-label="Mobile navigation">
    {#each navLinks as link (link.label)}
      <a
        href={link.href}
        onclick={() => (mobileMenuOpen = false)}
        class="rounded-md px-4 py-3 text-sm font-medium text-foreground no-underline transition-colors hover:bg-accent"
      >
        {link.label}
      </a>
    {/each}
  </nav>
{/if}
