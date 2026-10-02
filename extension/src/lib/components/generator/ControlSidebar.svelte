<script lang="ts">
	import PlatformSelector from '$lib/components/atoms/PlatformSelector.svelte';
	import CardThemeToggle from '$lib/components/atoms/CardThemeToggle.svelte';
	import ExportButtons from '$lib/components/atoms/ExportButtons.svelte';
	import AvatarInput from '$lib/components/atoms/AvatarInput.svelte';
	import Engagement from '$lib/components/atoms/Engagement.svelte';
	import CommentTextarea from '$lib/components/atoms/CommentTextarea.svelte';
	import { commentStore } from '$lib/stores/comment.svelte';

	interface Props {
		previewNode: HTMLElement | null;
	}

	let { previewNode }: Props = $props();

	const isVideoComment = $derived(commentStore.subType === 'video-comment');
</script>

<aside class="flex h-full min-h-0 w-full flex-col overflow-hidden bg-background">
	<div class="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-3">
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

	<div class="shrink-0 border-t border-border bg-background p-3">
		<ExportButtons {previewNode} />
	</div>
</aside>
