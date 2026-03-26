<script lang="ts">
	import { commentStore } from '$lib/stores/comment.svelte';
	import { Smile } from '@lucide/svelte';
	import { onMount } from 'svelte';

	const MAX_CHARS = 500;
	const charCount = $derived(commentStore.commentText.length);

	let isPickerOpen = $state(false);
	let pickerContainer: HTMLElement;
	let textareaRef: HTMLTextAreaElement;

	onMount(() => {
		// Dynamically import web component to avoid SSR issues
		import('emoji-picker-element');

		// Handle click outside to close picker
		const handleClickOutside = (e: MouseEvent) => {
			if (isPickerOpen && pickerContainer && !pickerContainer.contains(e.target as Node)) {
				isPickerOpen = false;
			}
		};
		window.addEventListener('click', handleClickOutside);
		return () => window.removeEventListener('click', handleClickOutside);
	});

	function handleEmojiClick(e: Event) {
		const detail = (e as CustomEvent).detail;
		if (!detail || !detail.unicode) return;

		const emoji = detail.unicode;
		const currentText = commentStore.commentText;
		const start = textareaRef.selectionStart;
		const end = textareaRef.selectionEnd;

		// Insert at cursor
		const newText = currentText.substring(0, start) + emoji + currentText.substring(end);

		if (newText.length <= MAX_CHARS) {
			commentStore.setCommentText(newText);
			// Restore focus and cursor position after Svelte updates DOM
			setTimeout(() => {
				textareaRef.focus();
				textareaRef.setSelectionRange(start + emoji.length, start + emoji.length);
			}, 0);
		}
	}
</script>

<div class="relative flex flex-col gap-1" bind:this={pickerContainer}>
	<div class="relative rounded-lg border border-border bg-secondary/50 transition-all focus-within:ring-1 focus-within:ring-ring">
		<textarea
			bind:this={textareaRef}
			value={commentStore.commentText}
			oninput={(e) => commentStore.setCommentText((e.target as HTMLTextAreaElement).value)}
			placeholder="Write any comment and see what happens 😊"
			maxlength={MAX_CHARS}
			rows={4}
			class="w-full resize-none border-none bg-transparent px-3 pt-3 pb-8 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-0 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0"
		></textarea>

		<!-- Emoji trigger button -->
		<button
			type="button"
			class="absolute left-2.5 bottom-2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
			onclick={() => (isPickerOpen = !isPickerOpen)}
			title="Add Emoji"
		>
			<Smile size={18} />
		</button>

		<!-- Character count -->
		<span class="absolute right-3 bottom-2.5 text-[11px] text-muted-foreground">
			{charCount} / {MAX_CHARS}
		</span>
	</div>

	<!-- Emoji Picker Dropdown -->
	{#if isPickerOpen}
		<div class="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-border shadow-xl">
			<!-- @ts-ignore: Custom web component -->
			<emoji-picker onemoji-click={handleEmojiClick} class="light"></emoji-picker>
		</div>
	{/if}
</div>

<style>
	/* Use standard shadcn CSS vars to adapt picker to current theme automatically */
	emoji-picker {
		width: 100%;
		height: 320px;
		--num-columns: 7; /* Adjusted columns so they fit within the sidebar's narrower width without scrolling */
		--background: hsl(var(--background));
		--border-color: hsl(var(--border));
		--text: hsl(var(--foreground));
		--indicator-color: hsl(var(--primary));
		--input-border-color: hsl(var(--border));
		--input-font-color: hsl(var(--foreground));
		--search-icon-color: hsl(var(--muted-foreground));
		--category-emoji-padding: 0.5rem;
		--button-hover-background: hsl(var(--secondary));
		--button-active-background: hsl(var(--secondary));
	}
</style>
