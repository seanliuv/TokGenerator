<script lang="ts">
	import { commentStore } from '$lib/stores/comment.svelte';
	import TikTokCommentReplyPreview from '$lib/components/platforms/TikTokCommentReplyPreview.svelte';
	import TikTokVideoCommentPreview from '$lib/components/platforms/TikTokVideoCommentPreview.svelte';

	interface Props {
		previewNode?: HTMLElement | null;
	}

	let { previewNode = $bindable(null) }: Props = $props();
</script>

<div class="flex h-full w-full items-center justify-center overflow-auto bg-secondary p-2">
	<!-- Display-only scale so the 440px card fits a ~400px side panel. Export uses previewNode. -->
	<div class="[zoom:0.72]">
		<div bind:this={previewNode} class="inline-block">
			{#if commentStore.platform === 'tiktok'}
				{#if commentStore.subType === 'bubble-reply-comment'}
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
