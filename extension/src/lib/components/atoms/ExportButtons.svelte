<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Download, Copy, Check } from '@lucide/svelte';
	import { exportAsPng, copyToClipboard } from '$lib/utils/export';
	import { Button } from '$lib/components/ui/button';
	import { commentStore } from '$lib/stores/comment.svelte';

	interface Props {
		previewNode: HTMLElement | null;
	}

	let { previewNode }: Props = $props();

	function buildFilename(): string {
		const date = new Date().toISOString().slice(0, 10);
		const username = commentStore.username.replace(/[^\w.-]+/g, '_').slice(0, 32) || 'user';
		return `${commentStore.platform}-${commentStore.subType}-${username}-${date}.png`;
	}

	let exportLoading = $state(false);
	let copyLoading = $state(false);
	let copySuccess = $state(false);
	let errorMessage = $state('');
	let copyResetTimer: ReturnType<typeof setTimeout> | undefined;
	onDestroy(() => clearTimeout(copyResetTimer));

	async function handleExport() {
		if (!previewNode) return;
		exportLoading = true;
		errorMessage = '';
		try {
			await exportAsPng(previewNode, buildFilename());
		} catch (e) {
			console.error('Export failed:', e);
			errorMessage = 'Export failed';
		} finally {
			exportLoading = false;
		}
	}

	async function handleCopy() {
		if (!previewNode) return;
		copyLoading = true;
		errorMessage = '';
		try {
			await copyToClipboard(previewNode);
			copySuccess = true;
			clearTimeout(copyResetTimer);
			copyResetTimer = setTimeout(() => (copySuccess = false), 2000);
		} catch (e) {
			console.error('Copy failed:', e);
			errorMessage = 'Copy failed';
		} finally {
			copyLoading = false;
		}
	}
</script>

<div class="flex flex-col gap-2">
	<div class="flex gap-2">
		<Button
			onclick={handleExport}
			disabled={exportLoading || !previewNode}
			class="flex flex-1 items-center justify-center gap-2 py-5 font-semibold text-white transition-all"
			style="background: var(--gen-accent);"
		>
			<Download size={15} />
			{exportLoading ? 'Exporting...' : 'Export Image'}
		</Button>
		<Button
			variant="secondary"
			onclick={handleCopy}
			disabled={copyLoading || !previewNode}
			class="flex flex-1 items-center justify-center gap-2 border border-border bg-secondary/80 py-5 font-semibold transition-all hover:bg-accent"
		>
			{#if copySuccess}
				<Check size={15} class="text-green-500" />
				Copied!
			{:else}
				<Copy size={15} />
				{copyLoading ? 'Copying...' : 'Copy'}
			{/if}
		</Button>
	</div>
	{#if errorMessage}
		<p class="text-[11px] text-destructive">{errorMessage}</p>
	{/if}
</div>
