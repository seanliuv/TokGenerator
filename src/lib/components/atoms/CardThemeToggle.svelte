<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';
	import { commentStore } from '$lib/stores/comment.svelte';
	import type { CardTheme } from '$lib/stores/comment.svelte';
</script>

<div class="flex flex-col gap-2">
	<span class="text-[11px] font-semibold tracking-widest text-muted-foreground">CARD THEME</span>
	<div class="flex gap-0.5 rounded-lg bg-secondary p-1">
		<button
			onclick={() => commentStore.setCardTheme('light' as CardTheme)}
			aria-pressed={commentStore.cardTheme === 'light'}
			class="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border-none px-3 py-1.5 text-xs font-medium transition-all"
			class:bg-background={commentStore.cardTheme === 'light'}
			class:shadow-sm={commentStore.cardTheme === 'light'}
			class:text-foreground={commentStore.cardTheme === 'light'}
			class:bg-transparent={commentStore.cardTheme !== 'light'}
			class:text-muted-foreground={commentStore.cardTheme !== 'light'}>
			<Sun size={13} />
			Light
		</button>
		<button
			onclick={() => commentStore.setCardTheme('dark' as CardTheme)}
			aria-pressed={commentStore.cardTheme === 'dark'}
			class="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border-none px-3 py-1.5 text-xs font-medium transition-all"
			class:bg-background={commentStore.cardTheme === 'dark'}
			class:shadow-sm={commentStore.cardTheme === 'dark'}
			class:text-foreground={commentStore.cardTheme === 'dark'}
			class:bg-transparent={commentStore.cardTheme !== 'dark'}
			class:text-muted-foreground={commentStore.cardTheme !== 'dark'}>
			<Moon size={13} />
			Dark
		</button>
	</div>
</div>
