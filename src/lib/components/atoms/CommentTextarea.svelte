<script lang="ts">
  import { commentStore } from '$lib/stores/comment.svelte';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import { tick } from 'svelte';
  import { SmilePlus } from '@lucide/svelte';

  let pickerContainer: HTMLElement | null = $state(null);
  let showPicker = $state(false);
  let pickerLoaded = $state(false);
  let textareaRef: HTMLTextAreaElement | null = $state(null);

  async function togglePicker() {
    showPicker = !showPicker;
    if (showPicker && !pickerLoaded) {
      const EmojiModule = await import('emoji-picker-element');
      // @ts-expect-error - dynamic import is untyped
      const Picker = EmojiModule.default || EmojiModule.Picker || EmojiModule;
      const picker = new Picker({
        locale: 'en',
        skinToneEmoji: '👍',
      });

      picker.addEventListener('emoji-click', (event: Event) => {
        const customEvent = event as CustomEvent;
        const emoji = customEvent.detail?.unicode;
        if (!emoji || !textareaRef) return;

        const start = textareaRef.selectionStart;
        const end = textareaRef.selectionEnd;
        const current = commentStore.commentText;

        const newText = current.substring(0, start) + emoji + current.substring(end);
        commentStore.setCommentText(newText);

        tick().then(() => {
          textareaRef!.selectionStart = textareaRef!.selectionEnd = start + emoji.length;
          textareaRef!.focus();
        });
        showPicker = false;
      });

      if (pickerContainer) {
        // eslint-disable-next-line svelte/no-dom-manipulating
        pickerContainer.appendChild(picker);
      }
      pickerLoaded = true;
    }
  }

  function closePicker(e: MouseEvent) {
    if (showPicker && pickerContainer && !pickerContainer.contains(e.target as Node)) {
      showPicker = false;
    }
  }
</script>

<svelte:window onclick={closePicker} />

<div class="flex flex-col gap-2">
  <div class="relative rounded-lg border border-border bg-secondary/50 focus-within:ring-1 focus-within:ring-ring">
    <Textarea
      bind:ref={textareaRef}
      value={commentStore.commentText}
      oninput={(e) => commentStore.setCommentText((e.target as HTMLTextAreaElement).value)}
      placeholder="Leave a comment..."
      class="min-h-20 w-full resize-none border-none bg-transparent px-3 py-2 pb-8 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground"
    />

    <!-- Controls at bottom of textarea -->
    <div class="absolute bottom-2 left-2 flex items-center gap-2">
      <div class="relative">
        <button
          onclick={(e) => {
            e.stopPropagation();
            togglePicker();
          }}
          class="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="Insert Emoji"
        >
          <SmilePlus size={14} />
        </button>
        <!-- emoji-picker-element injected into this dedicated sibling container to avoid Svelte node tracking confusion -->
        <div
          bind:this={pickerContainer}
          class="absolute top-full mt-2 left-0 z-50 shadow-2xl rounded-xl border border-border overflow-hidden bg-background transition-all {showPicker
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'}"
          class:hidden={!showPicker}
        ></div>
      </div>
    </div>

    <div class="absolute bottom-2 right-2 text-[10px] text-muted-foreground">
      {commentStore.commentText.length}/150
    </div>
  </div>
</div>

<style>
  :global(emoji-picker) {
    --background: var(--color-background);
    --border-color: var(--color-border);
    --category-font-color: var(--color-muted-foreground);
    --indicator-color: var(--gen-accent);
    --button-hover-background: var(--color-secondary);

    /* Responsive sizing */
    width: min(calc(100vw - 2rem), 352px);
    height: min(400px, 50vh);

    /* Reset built-in border and shadow to let container handle them */
    border: none;
  }
</style>
