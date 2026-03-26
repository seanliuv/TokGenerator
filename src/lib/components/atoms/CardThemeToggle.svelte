<script lang="ts">
  import { Sun, Moon } from '@lucide/svelte';
  import * as Tabs from '$lib/components/ui/tabs';
  import { commentStore } from '$lib/stores/comment.svelte';
  import type { CardTheme } from '$lib/stores/comment.svelte';
</script>

<div class="flex flex-col gap-2">
  <span class="text-[11px] font-semibold tracking-widest text-muted-foreground">CARD THEME</span>
  <Tabs.Root value={commentStore.cardTheme} onValueChange={(v) => commentStore.setCardTheme(v as CardTheme)} class="w-full">
    <Tabs.List class="grid w-full grid-cols-2 bg-secondary/80">
      <Tabs.Trigger value="light" class="flex gap-1.5 text-xs">
        <Sun size={13} />
        Light
      </Tabs.Trigger>
      <Tabs.Trigger value="dark" class="flex gap-1.5 text-xs">
        <Moon size={13} />
        Dark
      </Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>
</div>
