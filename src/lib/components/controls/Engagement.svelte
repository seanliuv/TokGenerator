<script lang="ts">
	import { Heart, MessageCircle, Clock } from '@lucide/svelte';
	import { commentStore } from '$lib/stores/comment.svelte';
	import type { TimeUnit } from '$lib/stores/comment.svelte';

	const units: TimeUnit[] = ['mins', 'hrs', 'days', 'wks'];
</script>

<div class="flex flex-col gap-2">
	<!-- Time row -->
	<div class="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5">
		<Clock size={14} class="shrink-0 text-muted-foreground" />
		<input
			type="number"
			min="1"
			max="999"
			value={commentStore.time.value}
			oninput={(e) => commentStore.setTimeValue(Number((e.target as HTMLInputElement).value))}
			class="w-12 border-none bg-transparent text-sm text-foreground outline-none [appearance:textfield]" />
		<select
			value={commentStore.time.unit}
			onchange={(e) => commentStore.setTimeUnit((e.target as HTMLSelectElement).value as TimeUnit)}
			class="border-none bg-transparent text-sm text-muted-foreground outline-none">
			{#each units as unit}
				<option value={unit}>{unit}</option>
			{/each}
		</select>
	</div>

	<!-- Likes + Comments row -->
	<div class="flex gap-2">
		<div class="flex flex-1 items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5">
			<Heart size={14} class="shrink-0 text-muted-foreground" />
			<input
				type="number"
				min="0"
				value={commentStore.likes}
				oninput={(e) => commentStore.setLikes(Number((e.target as HTMLInputElement).value))}
				class="w-full border-none bg-transparent text-sm text-foreground outline-none [appearance:textfield]" />
		</div>
		<div class="flex flex-1 items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5">
			<MessageCircle size={14} class="shrink-0 text-muted-foreground" />
			<input
				type="number"
				min="0"
				value={commentStore.replies}
				oninput={(e) => commentStore.setReplies(Number((e.target as HTMLInputElement).value))}
				class="w-full border-none bg-transparent text-sm text-foreground outline-none [appearance:textfield]" />
		</div>
	</div>
</div>
