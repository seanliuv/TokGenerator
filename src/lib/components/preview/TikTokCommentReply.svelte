<script lang="ts">
	interface Props {
		username: string;
		avatarUrl: string;
		commentText: string;
		theme: 'light' | 'dark';
	}

	let {
		username,
		avatarUrl,
		commentText,
		theme
	}: Props = $props();

	// Chat bubble sticker theme logic
	// Stickers stay light-colored in traditional UI, but let's follow standard theme for consistency
	const cardBg = $derived(theme === 'dark' ? '#252525' : '#ffffff');
	const cardText = $derived(theme === 'dark' ? '#ffffff' : '#161823');
	const cardSub = $derived(theme === 'dark' ? '#888' : '#888');
</script>

<div
	class="w-[340px] select-none font-sans"
	style="font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;">

	<div class="flex items-start gap-2 px-2 py-4">
		<!-- Avatar -->
		<div class="relative shrink-0 pt-3">
			<div class="shadow-sm rounded-full bg-white p-[2px]">
                {#if avatarUrl}
                    <img src={avatarUrl} alt={username} class="h-10 w-10 rounded-full object-cover" />
                {:else}
                    <div class="flex h-10 w-10 items-center justify-center rounded-full text-white text-base"
                        style="background: #888;">?</div>
                {/if}
            </div>
		</div>

		<!-- Chat Bubble -->
		<div class="relative flex-1 rounded-[20px] rounded-tl-sm px-4 py-3 pb-3.5 shadow-md"
			style="background: {cardBg};">
			
			<div class="text-[13px] font-medium" style="color: {cardSub};">
				Reply to {username}'s comment
			</div>
			
			<div class="mt-1 text-[17px] font-bold leading-tight" style="color: {cardText};">
				{commentText}
			</div>
		</div>
	</div>
</div>
