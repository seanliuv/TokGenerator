<script lang="ts">
  import { commentStore } from '$lib/stores/comment.svelte';
  import TikTokCommentReplyPreview from '$lib/components/platforms/TikTokCommentReplyPreview.svelte';
  import TikTokVideoCommentPreview from '$lib/components/platforms/TikTokVideoCommentPreview.svelte';

  interface Props {
    bindPreviewNode: (node: HTMLElement | null) => void;
  }

  let { bindPreviewNode }: Props = $props();

  let previewRef: HTMLElement | null = $state(null);

  $effect(() => {
    bindPreviewNode(previewRef);
  });
</script>

<div class="flex flex-1 items-center justify-center overflow-hidden bg-secondary/30 p-1 md:p-8">
  <!-- Mobile zoom wrapper – excluded from PNG export -->
  <div class="[zoom:0.8] md:[zoom:1]">
    <!-- The ref wrapper is what gets exported to PNG -->
    <div bind:this={previewRef} class="inline-block">
      {#if commentStore.platform === 'tiktok'}
        {#if commentStore.subType === 'bubble-comment-reply'}
          <TikTokCommentReplyPreview
            username={commentStore.username}
            avatarUrl={commentStore.avatarUrl}
            isVerified={commentStore.isVerified}
            commentText={commentStore.commentText}
            theme={commentStore.cardTheme}
          />
        {:else if commentStore.subType === 'video-comment'}
          <TikTokVideoCommentPreview
            username={commentStore.username}
            avatarUrl={commentStore.avatarUrl}
            isVerified={commentStore.isVerified}
            time={commentStore.time}
            likes={commentStore.likes}
            replies={commentStore.replies}
            commentText={commentStore.commentText}
            theme={commentStore.cardTheme}
          />
        {/if}
      {/if}
    </div>
  </div>
</div>
