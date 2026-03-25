<script lang="ts">
  import ControlSidebar from '$lib/components/ControlSidebar.svelte';
  import PreviewPanel from '$lib/components/PreviewPanel.svelte';
  import * as Card from '$lib/components/ui/card/index.js';

  let previewNode: HTMLElement | null = $state(null);

  function getPreviewNode() {
    return previewNode;
  }
</script>

<!-- Full viewport minus navbar height (56px = h-14) -->
<section id="generator" class="mx-auto flex w-full max-w-7xl h-[calc(100dvh-56px)] items-center justify-center p-4 md:p-6 lg:p-8">
  <Card.Root class="flex h-full w-full flex-col overflow-hidden border-border bg-card shadow-lg md:flex-row">
    <!-- On mobile: preview on top (fixed height), controls below -->
    <div class="order-1 flex h-[280px] shrink-0 items-center justify-center border-b border-border bg-secondary/30 md:hidden">
      <div>
        <!-- Mini preview panel for mobile -->
        <PreviewPanel bindPreviewNode={(n) => (previewNode = n)} />
      </div>
    </div>

    <!-- Sidebar (left on desktop, below preview on mobile) -->
    <div class="order-2 flex flex-1 flex-col overflow-hidden md:order-1 md:flex-none md:border-r md:border-border">
      <ControlSidebar {getPreviewNode} />
    </div>

    <!-- Main preview (right on desktop, hidden at top on mobile) -->
    <div class="order-3 hidden flex-1 md:order-2 md:flex">
      <PreviewPanel bindPreviewNode={(n) => (previewNode = n)} />
    </div>
  </Card.Root>
</section>
