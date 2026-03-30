<script lang="ts">
  import ControlSidebar from '$lib/components/generator/ControlSidebar.svelte';
  import PreviewPanel from '$lib/components/generator/PreviewPanel.svelte';
  import * as Card from '$lib/components/ui/card/index.js';

  let mobilePreviewNode: HTMLElement | null = $state(null);
  let desktopPreviewNode: HTMLElement | null = $state(null);

  function getPreviewNode() {
    return window.innerWidth >= 768 ? desktopPreviewNode : mobilePreviewNode;
  }
</script>

<!-- Full viewport minus navbar height (56px = h-14) -->
<section id="generator" class="mx-auto flex w-full max-w-7xl h-[calc(100dvh-56px)] items-center justify-center p-2 md:p-6 lg:p-8">
  <Card.Root class="flex h-full w-full flex-col overflow-hidden border-border bg-card shadow-lg md:flex-row">
    <!-- On mobile: preview on top (dynamic height), controls below -->
    <div class="order-1 flex h-[20dvh] min-h-37.5 shrink-0 items-center justify-center border-b border-border bg-secondary/10 md:hidden">
      <!-- Mini preview panel for mobile -->
      <PreviewPanel bindPreviewNode={(n) => (mobilePreviewNode = n)} />
    </div>

    <!-- Sidebar (left on desktop, below preview on mobile) -->
    <div class="order-2 flex flex-1 flex-col overflow-hidden md:order-1 md:flex-none md:border-r md:border-border">
      <ControlSidebar {getPreviewNode} />
    </div>

    <!-- Main preview (right on desktop, hidden at top on mobile) -->
    <div class="order-3 hidden flex-1 md:order-2 md:flex">
      <PreviewPanel bindPreviewNode={(n) => (desktopPreviewNode = n)} />
    </div>
  </Card.Root>
</section>
