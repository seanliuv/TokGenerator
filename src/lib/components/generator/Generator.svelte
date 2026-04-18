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

<Card.Root class="flex flex-1 w-full flex-col overflow-hidden border-border bg-card shadow-lg md:flex-row">
  <!-- On mobile: preview on top (dynamic height), controls below -->
  <div class="flex h-[25dvh] min-h-37.5 shrink-0 items-center justify-center border-b border-border bg-secondary/10 md:hidden">
    <!-- Mini preview panel for mobile -->
    <PreviewPanel bindPreviewNode={(n) => (mobilePreviewNode = n)} />
  </div>

  <!-- Sidebar (left on desktop, below preview on mobile) -->
  <div class="flex h-[60dvh] flex-col overflow-hidden md:h-auto md:flex-none md:border-r md:border-border">
    <ControlSidebar {getPreviewNode} />
  </div>

  <!-- Main preview (right on desktop, hidden at top on mobile) -->
  <div class="hidden flex-1 md:flex">
    <PreviewPanel bindPreviewNode={(n) => (desktopPreviewNode = n)} />
  </div>
</Card.Root>
