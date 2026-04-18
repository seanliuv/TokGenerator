<script lang="ts">
  import { SiX, SiGithub, SiDiscord } from '@icons-pack/svelte-simple-icons';
  import { SITE_NAME, SITE_TAGLINE, socialLinks } from '$lib/config/site';
</script>

<footer class="border-t border-border bg-secondary/20 px-6 py-12">
  <div class="mx-auto max-w-6xl">
    <!-- Top row: branding + social links -->
    <div class="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
      <!-- Logo + tagline -->
      <div class="flex flex-col gap-1.5">
        <a href="/#hero" class="flex items-center gap-2 no-underline">
          <img src="/favicon-96x96.png" alt={`${SITE_NAME} logo`} class="h-7 w-7 select-none" loading="lazy" draggable="false" />
          <span class="text-sm font-bold tracking-tight text-foreground">{SITE_NAME}</span>
        </a>
        <p class="text-xs text-muted-foreground">{SITE_TAGLINE}</p>
      </div>

      <!-- Social links -->
      <div class="flex items-center gap-3">
        <a
          href={socialLinks.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow on X"
          class="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground"
        >
          <SiX size={14} />
        </a>
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on GitHub"
          class="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground"
        >
          <SiGithub size={14} />
        </a>
        <a
          href={socialLinks.discord}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Join Discord"
          class="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-foreground"
        >
          <SiDiscord size={14} />
        </a>
      </div>
    </div>

    <!-- Bottom row: legal links + copyright -->
    <div class="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      <p class="text-xs text-muted-foreground">
        © {new Date().getFullYear()}
        {SITE_NAME}. All rights reserved.
      </p>
      <div class="flex items-center gap-4 text-xs text-muted-foreground">
        <a href="/privacy" class="no-underline transition-colors hover:text-foreground"> Privacy Policy </a>
        <span class="text-border">·</span>
        <a href="/terms" class="no-underline transition-colors hover:text-foreground"> Terms of Service </a>
      </div>
    </div>
  </div>
</footer>
