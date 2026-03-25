<script lang="ts">
	import { Heart } from '@lucide/svelte';

	interface Props {
		username: string;
		avatarUrl: string;
		isCelebrity?: boolean;
		time: { value: number; unit: string };
		likes: number;
		replies: number;
		commentText: string;
		theme: 'light' | 'dark';
	}

	let {
		username,
		avatarUrl,
		isCelebrity = false,
		time,
		likes,
		replies,
		commentText,
		theme
	}: Props = $props();

	function formatNumber(n: number): string {
		if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
		return String(n);
	}

	const cardText = $derived(theme === 'dark' ? '#e7e7e7' : '#161823');
	const cardSub = $derived(theme === 'dark' ? '#888' : '#7c7c7c');
	const cardBg = $derived(theme === 'dark' ? '#1a1a1a' : '#ffffff');
</script>

<div
	class="w-[340px] select-none overflow-hidden rounded-xl font-sans"
	style="background: {cardBg}; color: {cardText}; font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;">

	<div class="flex items-start px-4 pt-4 pb-3">
		<!-- Avatar -->
		<div class="shrink-0 mr-3">
			{#if avatarUrl}
				<img src={avatarUrl} alt={username} class="h-9 w-9 mt-0.5 rounded-full object-cover" />
			{:else}
				<div class="flex h-9 w-9 mt-0.5 items-center justify-center rounded-full text-white text-base"
					style="background: #888;">?</div>
			{/if}
		</div>

		<!-- Content Middle Column -->
		<div class="flex flex-1 flex-col gap-0.5 min-w-0 pr-2">
			<div class="flex items-center gap-1 min-w-0">
				<span class="truncate text-[13px] font-medium" style="color: {cardSub};">{username}</span>
				{#if isCelebrity}
					<svg class="shrink-0 ml-0.5" width="13" height="13" viewBox="0 0 14 14" fill="none">
						<circle cx="7" cy="7" r="7" fill="#20D5EC"/>
						<path d="M4 7l2 2 4-4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				{/if}
			</div>

			<p class="text-[15px] leading-snug" style="color: {cardText}; margin: 0; padding-top: 1px;">
				{commentText}
			</p>

			<div class="flex items-center gap-4 pt-1 pb-1">
				<span class="text-xs" style="color: {cardSub};">
					<!-- TikTok shortens 'days' to 'd', 'hrs' to 'h', 'wks' to 'w' -->
					{time.value}{time.unit[0]}
				</span>
				<span class="text-[13px] font-semibold" style="color: {cardSub};">Reply</span>
			</div>

			<!-- View replies -->
			{#if replies > 0}
				<div class="flex items-center gap-3 pt-3 pb-1" style="color: {cardSub};">
					<div class="h-px w-6 shrink-0 bg-current opacity-30"></div>
					<span class="text-[13px] font-semibold">View {replies} more replies</span>
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="opacity-80">
						<path d="M3 4l3 3 3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
			{/if}
		</div>

		<!-- Right Column (Likes) -->
		<div class="flex flex-col items-center shrink-0 w-8 pt-6" style="color: {cardSub};">
			<Heart size={20} class="mb-1" />
			{#if likes > 0}
				<span class="text-xs font-medium">{formatNumber(likes)}</span>
			{/if}
		</div>
	</div>
</div>
