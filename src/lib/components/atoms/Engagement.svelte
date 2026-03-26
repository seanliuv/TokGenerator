<script lang="ts">
  import { Heart, MessageCircle, Clock, Wand2 } from '@lucide/svelte';
  import { commentStore } from '$lib/stores/comment.svelte';
  import type { TimeUnit } from '$lib/stores/comment.svelte';
  import { Input } from '$lib/components/ui/input/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import { Button } from '$lib/components/ui/button/index.js';

  const units = [
    { value: 'mins', label: 'mins' },
    { value: 'hrs', label: 'hrs' },
    { value: 'days', label: 'days' },
    { value: 'wks', label: 'wks' },
  ];

  let isSpinning = $state(false);

  function randomizeMetrics() {
    isSpinning = true;
    setTimeout(() => (isSpinning = false), 500);

    commentStore.setTimeValue(Math.floor(Math.random() * 23) + 1);
    commentStore.setTimeUnit(units[Math.floor(Math.random() * units.length)].value as TimeUnit);
    commentStore.setLikes(Math.floor(Math.random() * 5000) + 10);
    commentStore.setReplies(Math.floor(Math.random() * 200) + 1);
  }

  const pillClass =
    'flex h-9 min-w-0 items-center justify-center border border-border bg-secondary/30 px-2 transition-all focus-within:ring-1 focus-within:ring-ring hover:bg-secondary/50';
  const separatorClass = 'mx-1 h-3 w-[1px] bg-border/60 shrink-0';
</script>

<div class="mb-1 flex flex-col gap-1.5">
  <div class="flex w-full items-center gap-2">
    <!-- Time Control (Weight: 3) -->
    <div class="{pillClass} flex-3 rounded-xl">
      <Clock size={13} class="shrink-0 text-muted-foreground/80" />
      <div class={separatorClass}></div>
      <Input
        type="number"
        value={commentStore.time.value}
        oninput={(e) => commentStore.setTimeValue(Number((e.target as HTMLInputElement).value))}
        class="h-6 w-full min-w-0 border-none bg-transparent p-0 text-center text-xs font-semibold shadow-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <div class={separatorClass}></div>
      <Select.Root
        type="single"
        value={commentStore.time.unit}
        onValueChange={(v) => {
          if (v) commentStore.setTimeUnit(v as TimeUnit);
        }}
      >
        <Select.Trigger
          class="h-6 w-full border-none bg-transparent px-0 text-center text-[11px] font-medium text-muted-foreground shadow-none focus:ring-0"
        >
          {commentStore.time.unit}
        </Select.Trigger>
        <Select.Content class="min-w-[80px]">
          {#each units as unit (unit.value)}
            <Select.Item value={unit.value} class="text-xs">{unit.label}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>

    <!-- Likes (Weight: 2) -->
    <div class="{pillClass} flex-2 rounded-xl">
      <Heart size={13} class="shrink-0 text-muted-foreground/80" />
      <div class={separatorClass}></div>
      <Input
        type="number"
        value={commentStore.likes}
        oninput={(e) => commentStore.setLikes(Number((e.target as HTMLInputElement).value))}
        class="h-6 w-full min-w-0 border-none bg-transparent p-0 text-center text-xs font-semibold shadow-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </div>

    <!-- Comments (Weight: 2) -->
    <div class="{pillClass} flex-2 rounded-xl">
      <MessageCircle size={13} class="shrink-0 text-muted-foreground/80" />
      <div class={separatorClass}></div>
      <Input
        type="number"
        value={commentStore.replies}
        oninput={(e) => commentStore.setReplies(Number((e.target as HTMLInputElement).value))}
        class="h-6 w-full min-w-0 border-none bg-transparent p-0 text-center text-xs font-semibold shadow-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </div>

    <!-- Randomize Button (Weight: 1) -->
    <Button
      variant="outline"
      size="icon"
      onclick={randomizeMetrics}
      title="Randomize metrics"
      class="h-9 flex-1 shrink-0 rounded-xl border-border bg-secondary/30 text-muted-foreground/80 transition-all hover:bg-secondary/60 hover:text-foreground active:scale-90"
    >
      <Wand2 size={13} class="transition-transform duration-500 {isSpinning ? 'rotate-360' : ''}" />
    </Button>
  </div>
</div>
