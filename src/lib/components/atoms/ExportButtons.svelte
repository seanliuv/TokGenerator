<script lang="ts">
  import { Download, Copy, Check } from '@lucide/svelte';
  import { exportAsPng, copyToClipboard } from '$lib/utils/export';
  import { Button } from '$lib/components/ui/button';

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
  <Button
    onclick={handleExport}
    disabled={exportLoading}
    class="flex flex-1 items-center justify-center gap-2 py-5 font-semibold text-white transition-all"
    style="background: var(--gen-accent);"
  >
    <Download size={15} />
    {exportLoading ? 'Exporting...' : 'Export Image'}
  </Button>
  <Button
    variant="secondary"
    onclick={handleCopy}
    disabled={copyLoading}
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
