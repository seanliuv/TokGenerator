<script lang="ts">
	import { onDestroy } from 'svelte';
	import { commentStore } from '$lib/stores/comment.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { tick } from 'svelte';
	import { SmilePlus } from '@lucide/svelte';

	const MAX_LENGTH = 150;
	const PICKER_WIDTH = 352;
	const PICKER_HEIGHT = 280;
	const GAP = 8;

	let pickerContainer: HTMLElement | null = $state(null);
	let emojiButton: HTMLButtonElement | null = $state(null);
	let showPicker = $state(false);
	let pickerLoaded = $state(false);
	let pickerLoading = $state(false);
	let textareaRef: HTMLTextAreaElement | null = $state(null);
	let pickerStyle = $state('');

	function placePicker() {
		if (!emojiButton) return;

		const rect = emojiButton.getBoundingClientRect();
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const width = Math.min(PICKER_WIDTH, vw - GAP * 2);
		const height = Math.min(PICKER_HEIGHT, vh * 0.45);

		let left = rect.left;
		if (left + width > vw - GAP) left = Math.max(GAP, vw - GAP - width);

		const spaceBelow = vh - rect.bottom - GAP * 2;
		const spaceAbove = rect.top - GAP * 2;
		const openBelow = spaceBelow >= height || spaceBelow >= spaceAbove;

		if (openBelow) {
			pickerStyle = `left:${left}px; top:${rect.bottom + GAP}px; width:${width}px;`;
		} else {
			pickerStyle = `left:${left}px; bottom:${vh - rect.top + GAP}px; width:${width}px;`;
		}
	}

	function onReposition() {
		placePicker();
	}

	function attachRepositionListeners() {
		window.addEventListener('resize', onReposition);
		window.addEventListener('scroll', onReposition, true);
	}

	function detachRepositionListeners() {
		window.removeEventListener('resize', onReposition);
		window.removeEventListener('scroll', onReposition, true);
	}

	onDestroy(detachRepositionListeners);

	async function togglePicker() {
		showPicker = !showPicker;
		if (!showPicker) {
			detachRepositionListeners();
			return;
		}

		await tick();
		placePicker();
		attachRepositionListeners();

		if (pickerLoaded || pickerLoading) return;

		pickerLoading = true;
		try {
			const EmojiModule = await import('emoji-picker-element');
			// @ts-expect-error - package exports a custom element constructor
			const Picker = EmojiModule.default || EmojiModule.Picker || EmojiModule;
			const picker = new Picker({
				locale: 'en',
				skinToneEmoji: '👍'
			});

			picker.addEventListener('emoji-click', (event: Event) => {
				const customEvent = event as CustomEvent<{ unicode?: string }>;
				const emoji = customEvent.detail?.unicode;
				if (!emoji || !textareaRef) return;

				const start = textareaRef.selectionStart;
				const end = textareaRef.selectionEnd;
				const current = commentStore.commentText;
				const next = current.slice(0, start) + emoji + current.slice(end);
				commentStore.setCommentText(next);

				const caret = Math.min(start + emoji.length, MAX_LENGTH);
				tick().then(() => {
					if (!textareaRef) return;
					textareaRef.selectionStart = textareaRef.selectionEnd = caret;
					textareaRef.focus();
				});
				hidePicker();
			});

			pickerContainer?.appendChild(picker);
			pickerLoaded = true;
			await tick();
			placePicker();
		} finally {
			pickerLoading = false;
		}
	}

	function hidePicker() {
		showPicker = false;
		detachRepositionListeners();
	}

	function closePicker(e: MouseEvent) {
		if (!showPicker) return;
		const path = e.composedPath();
		if (pickerContainer && path.includes(pickerContainer)) return;
		if (emojiButton && path.includes(emojiButton)) return;
		hidePicker();
	}
</script>

<svelte:window onclick={closePicker} />

<div class="flex flex-col gap-2">
	<div class="relative rounded-lg border border-border bg-secondary/50 focus-within:ring-1 focus-within:ring-ring">
		<Textarea
			bind:ref={textareaRef}
			value={commentStore.commentText}
			maxlength={MAX_LENGTH}
			oninput={(e) => commentStore.setCommentText((e.target as HTMLTextAreaElement).value)}
			placeholder="Leave a comment..."
			class="min-h-20 w-full resize-none border-none bg-transparent px-3 py-2 pb-8 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground"
		/>

		<div class="absolute bottom-2 left-2 flex items-center gap-2">
			<button
				bind:this={emojiButton}
				type="button"
				onclick={(e) => {
					e.stopPropagation();
					togglePicker();
				}}
				class="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
				title="Insert Emoji"
			>
				<SmilePlus size={14} />
			</button>
		</div>

		<div class="absolute right-2 bottom-2 text-[10px] text-muted-foreground">
			{commentStore.commentText.length}/{MAX_LENGTH}
		</div>
	</div>
</div>

<div
	bind:this={pickerContainer}
	style={pickerStyle}
	class="fixed z-50 overflow-hidden rounded-xl border border-border bg-background shadow-2xl {showPicker
		? 'opacity-100'
		: 'pointer-events-none hidden opacity-0'}"
></div>

<style>
	:global(emoji-picker) {
		--background: var(--color-background);
		--border-color: var(--color-border);
		--category-font-color: var(--color-muted-foreground);
		--indicator-color: var(--gen-accent);
		--button-hover-background: var(--color-secondary);

		width: 100%;
		height: min(280px, 45vh);
		border: none;
	}
</style>
