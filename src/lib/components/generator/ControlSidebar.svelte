<script lang="ts">
  import PlatformSelector from '$lib/components/atoms/PlatformSelector.svelte';
  import CardThemeToggle from '$lib/components/atoms/CardThemeToggle.svelte';
  import ExportButtons from '$lib/components/atoms/ExportButtons.svelte';
  import AvatarInput from '$lib/components/atoms/AvatarInput.svelte';
  import Engagement from '$lib/components/atoms/Engagement.svelte';
  import CommentTextarea from '$lib/components/atoms/CommentTextarea.svelte';
  import * as Tabs from '$lib/components/ui/tabs';
  import { commentStore } from '$lib/stores/comment.svelte';

  interface Props {
    getPreviewNode: () => HTMLElement | null;
  }

  let { getPreviewNode }: Props = $props();

  const isVideoComment = $derived(commentStore.subType === 'video-comment');

  let activeTab = $state('avatar');
  $effect(() => {
    void commentStore.subType;
    activeTab = 'avatar';
  });
</script>

<aside class="flex h-full w-full flex-col overflow-hidden border-r border-border bg-background md:w-100 md:shrink-0">
  <!-- Desktop layout (md+): single scrollable column -->
  <div class="hidden md:flex md:flex-1 md:flex-col md:gap-5 md:overflow-y-auto md:p-4">
    <PlatformSelector />

    <div class="flex flex-col gap-3">
      <span class="text-[11px] font-semibold tracking-widest text-muted-foreground">COMMENT CONTROL</span>
      {#if commentStore.platform === 'tiktok'}
        <div class="flex flex-col gap-5">
          <AvatarInput />
          {#if isVideoComment}
            <Engagement />
          {/if}
          <CommentTextarea />
        </div>
      {/if}
    </div>

    <div class="flex flex-col gap-3">
      <span class="text-[11px] font-semibold tracking-widest text-muted-foreground">THEME</span>
      <CardThemeToggle />
    </div>
  </div>

  <!-- Mobile layout (< md): tabbed interface -->
  <div class="flex flex-1 flex-col overflow-hidden md:hidden">
    <!-- PlatformSelector pinned at top -->
    <div class="shrink-0 border-b border-border p-3">
      <PlatformSelector />
    </div>

    <!-- Tabs fill remaining space -->
    <div class="flex-1 flex flex-col min-h-0 border-border p-3">
      <span class="text-[11px] font-semibold tracking-widest text-muted-foreground">COMMENT CONTROL</span>
      <Tabs.Root bind:value={activeTab} class="flex flex-1 flex-col min-h-0 gap-0">
        <Tabs.List variant="line" class="grid w-full grid-cols-3 shrink-0 rounded-none border-b border-border px-3 pt-1">
          <Tabs.Trigger value="avatar">Avatar</Tabs.Trigger>
          <Tabs.Trigger value="comment">Comment</Tabs.Trigger>
          <Tabs.Trigger value="theme">Theme</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="avatar" class="flex flex-col gap-4 overflow-y-auto p-4 min-h-0">
          <AvatarInput />
          {#if isVideoComment}
            <Engagement />
          {/if}
        </Tabs.Content>

        <Tabs.Content value="comment" class="flex flex-col overflow-y-auto p-4 min-h-0">
          <CommentTextarea />
        </Tabs.Content>

        <Tabs.Content value="theme" class="flex flex-col overflow-y-auto p-4 min-h-0">
          <CardThemeToggle />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  </div>

  <!-- Sticky export footer (both layouts) -->
  <div class="shrink-0 border-t border-border bg-background p-4">
    <ExportButtons {getPreviewNode} />
  </div>
</aside>
