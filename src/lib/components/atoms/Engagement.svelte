<script lang="ts">
	import { Heart, MessageCircle, Clock } from '@lucide/svelte';
	import { commentStore } from '$lib/stores/comment.svelte';
	import type { TimeUnit } from '$lib/stores/comment.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

	const units = [
		{ value: 'mins', label: 'mins' },
		{ value: 'hrs', label: 'hrs' },
		{ value: 'days', label: 'days' },
		{ value: 'wks', label: 'wks' },
	];
</script>

<span class="text-[11px] font-semibold tracking-widest text-muted-foreground">ENGAGEMENT METRICS</span>

<div class="flex flex-col gap-2">
	<!-- Time row -->
	<div class="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2 focus-within:ring-1 focus-within:ring-ring">
		<Clock size={14} class="shrink-0 text-muted-foreground" />
		<Input
			type="number"
			min={1}
			max={999}
			value={commentStore.time.value}
			oninput={(e) => commentStore.setTimeValue(Number((e.target as HTMLInputElement).value))}
			class="h-7 w-12 border-none bg-transparent px-0 font-medium shadow-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
		/>
		<Select.Root
			type="single"
			value={commentStore.time.unit}
			onValueChange={(v) => { if (v) commentStore.setTimeUnit(v as TimeUnit); }}
		>
			<Select.Trigger class="h-7 w-[75px] border-none bg-transparent px-2 text-muted-foreground shadow-none focus:ring-0 hover:bg-muted/50 transition-colors">
				{commentStore.time.unit}
			</Select.Trigger>
			<Select.Content>
				{#each units as unit (unit.value)}
					<Select.Item value={unit.value}>{unit.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<!-- Likes + Comments row -->
	<div class="flex gap-2">
		<div class="flex flex-1 items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-1.5 focus-within:ring-1 focus-within:ring-ring">
			<Heart size={14} class="shrink-0 text-muted-foreground" />
			<Input
				type="number"
				min={0}
				value={commentStore.likes}
				oninput={(e) => commentStore.setLikes(Number((e.target as HTMLInputElement).value))}
				class="h-7 w-full border-none bg-transparent px-0 font-medium shadow-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			/>
		</div>
		<div class="flex flex-1 items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-1.5 focus-within:ring-1 focus-within:ring-ring">
			<MessageCircle size={14} class="shrink-0 text-muted-foreground" />
			<Input
				type="number"
				min={0}
				value={commentStore.replies}
				oninput={(e) => commentStore.setReplies(Number((e.target as HTMLInputElement).value))}
				class="h-7 w-full border-none bg-transparent px-0 font-medium shadow-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			/>
		</div>
	</div>
</div>
