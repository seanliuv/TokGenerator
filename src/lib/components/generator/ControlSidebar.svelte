<script lang="ts">
  import PlatformSelector from '$lib/components/atoms/PlatformSelector.svelte';
  import CardThemeToggle from '$lib/components/atoms/CardThemeToggle.svelte';
  import ExportButtons from '$lib/components/atoms/ExportButtons.svelte';
  import TikTokCommentReplyControls from '$lib/components/platforms/TikTokCommentReplyControls.svelte';
  import TikTokVideoCommentControls from '$lib/components/platforms/TikTokVideoCommentControls.svelte';
  import { commentStore } from '$lib/stores/comment.svelte';

  interface Props {
    getPreviewNode: () => HTMLElement | null;
  }

  let { getPreviewNode }: Props = $props();
</script>

<aside class="flex h-full w-full flex-col overflow-hidden border-r border-border bg-background md:w-100 md:shrink-0">
  <!-- Scrollable controls area -->
  <div class="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
    <PlatformSelector />
    <CardThemeToggle />

    {#if commentStore.platform === 'tiktok'}
      {#if commentStore.subType === 'comment-reply'}
        <TikTokCommentReplyControls />
      {:else if commentStore.subType === 'video-comment'}
        <TikTokVideoCommentControls />
      {/if}
    {/if}
  </div>

  <!-- Sticky export buttons at bottom -->
  <div class="border-t border-border bg-background p-4">
    <ExportButtons {getPreviewNode} />
  </div>
</aside>
