<script lang="ts">
  import { commentStore } from '$lib/stores/comment.svelte';
  import type { Platform, SubType } from '$lib/stores/comment.svelte';
  import { SiTiktok, SiInstagram, SiYoutube, SiX } from '@icons-pack/svelte-simple-icons';

  const platforms: Array<{ id: Platform; label: string; icon: any }> = [
    { id: 'tiktok', label: 'TikTok', icon: SiTiktok },
    { id: 'instagram', label: 'Instagram', icon: SiInstagram },
    { id: 'youtube', label: 'YouTube', icon: SiYoutube },
    { id: 'twitter', label: 'X', icon: SiX },
  ];

  const tiktokSubTypes: Array<{ id: SubType; label: string }> = [
    { id: 'comment-reply', label: 'Comment Reply' },
    { id: 'video-comment', label: 'Video Comment' },
  ];
</script>

<div class="flex flex-col gap-3">
  <span class="text-[11px] font-semibold tracking-widest text-muted-foreground">PLATFORM</span>

  <!-- Platform icons row -->
  <div class="flex gap-1 rounded-xl border border-border bg-secondary p-1.5">
    {#each platforms as platform (platform.id)}
      {@const isActive = commentStore.platform === platform.id}
      {@const isTikTok = platform.id === 'tiktok'}
      <button
        onclick={() => isTikTok && commentStore.setPlatform(platform.id)}
        disabled={!isTikTok}
        title={isTikTok ? platform.label : `${platform.label} (即将推出)`}
        aria-pressed={isActive}
        class="flex flex-1 flex-col items-center gap-1 rounded-lg border-none py-2 text-lg transition-all"
        class:bg-background={isActive}
        class:shadow-sm={isActive}
        class:cursor-pointer={isTikTok}
        class:cursor-not-allowed={!isTikTok}
        class:opacity-40={!isTikTok}
        class:bg-transparent={!isActive}
      >
        <svelte:component this={platform.icon} size={20} class={isActive ? 'text-foreground' : 'text-muted-foreground'} />
      </button>
    {/each}
  </div>

  <!-- TikTok sub-type row -->
  {#if commentStore.platform === 'tiktok'}
    <div class="flex gap-1 rounded-lg bg-secondary p-1">
      {#each tiktokSubTypes as sub (sub.id)}
        {@const isActive = commentStore.subType === sub.id}
        <button
          onclick={() => commentStore.setSubType(sub.id)}
          aria-pressed={isActive}
          class="flex flex-1 cursor-pointer items-center justify-center rounded-md border-none px-2 py-1.5 text-xs font-medium transition-all"
          class:bg-background={isActive}
          class:shadow-sm={isActive}
          class:bg-transparent={!isActive}
          class:text-muted-foreground={!isActive}
          style={isActive ? `color: var(--gen-accent);` : ''}
        >
          {sub.label}
        </button>
      {/each}
    </div>
  {/if}
</div>
