<script lang="ts">
	import ControlSidebar from '$lib/components/generator/ControlSidebar.svelte';
	import PreviewPanel from '$lib/components/generator/PreviewPanel.svelte';

	let previewNode: HTMLElement | null = $state(null);
</script>

<div class="flex h-full min-h-0 w-full flex-col overflow-hidden">
	<div
		class="flex h-[240px] shrink-0 items-center justify-center overflow-auto border-b border-border bg-secondary/10"
	>
		<PreviewPanel bind:previewNode />
	</div>

	<div class="flex min-h-0 flex-1 flex-col overflow-hidden">
		<ControlSidebar {previewNode} />
	</div>
</div>
