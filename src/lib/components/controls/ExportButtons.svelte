<script lang="ts">
  import { Download, Copy, Check } from '@lucide/svelte';
  import { exportAsPng, copyToClipboard } from '$lib/utils/export';

  interface Props {
    getPreviewNode: () => HTMLElement | null;
  }

  let { getPreviewNode }: Props = $props();

  let exportLoading = $state(false);
  let copyLoading = $state(false);
  let copySuccess = $state(false);

  async function handleExport() {
    const node = getPreviewNode();
    if (!node) return;
    exportLoading = true;
    try {
      await exportAsPng(node, 'comment.png');
    } catch (e) {
      console.error('Export failed:', e);
    } finally {
      exportLoading = false;
    }
  }

  async function handleCopy() {
    const node = getPreviewNode();
    if (!node) return;
    copyLoading = true;
    try {
      await copyToClipboard(node);
      copySuccess = true;
      setTimeout(() => (copySuccess = false), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    } finally {
      copyLoading = false;
    }
  }
</script>

<div class="flex gap-2">
  <button
    onclick={handleExport}
    disabled={exportLoading}
    class="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-none py-2.5 text-sm font-semibold text-white transition-all disabled:cursor-wait disabled:opacity-60"
    style="background: var(--gen-accent);"
  >
    <Download size={15} />
    {exportLoading ? 'Exporting...' : 'Export Image'}
  </button>
  <button
    onclick={handleCopy}
    disabled={copyLoading}
    class="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-secondary py-2.5 text-sm font-semibold text-foreground transition-all disabled:cursor-wait disabled:opacity-60 hover:bg-accent"
  >
    {#if copySuccess}
      <Check size={15} class="text-green-500" />
      Copied!
    {:else}
      <Copy size={15} />
      {copyLoading ? 'Copying...' : 'Copy'}
    {/if}
  </button>
</div>
