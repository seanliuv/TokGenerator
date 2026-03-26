<script lang="ts">
  import { commentStore } from '$lib/stores/comment.svelte';
  import type { Platform, SubType } from '$lib/stores/comment.svelte';
  import { SiTiktok, SiInstagram, SiYoutube, SiX } from '@icons-pack/svelte-simple-icons';
  import * as Tabs from '$lib/components/ui/tabs';

  const platforms = [
    {
      id: 'tiktok',
      label: 'TikTok',
      icon: SiTiktok,
      enabled: true,
      subTypes: [
        { id: 'comment-reply', label: 'Comment Reply' },
        { id: 'video-comment', label: 'Video Comment' },
      ],
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: SiInstagram,
      enabled: false,
      subTypes: [
        { id: 'post-comment', label: 'Post Comment' },
        { id: 'reels-comment', label: 'Reels Comment' },
      ],
    },
    {
      id: 'youtube',
      label: 'YouTube',
      icon: SiYoutube,
      enabled: false,
      subTypes: [
        { id: 'video-comment', label: 'Video Comment' },
        { id: 'shorts-comment', label: 'Shorts Comment' },
      ],
    },
    {
      id: 'twitter',
      label: 'X',
      icon: SiX,
      enabled: false,
      subTypes: [{ id: 'post-comment', label: 'Post Comment' }],
    },
  ];

  let activePlatform = $derived(platforms.find((p) => p.id === commentStore.platform));
</script>

<div class="flex flex-col gap-3">
  <span class="text-[11px] font-semibold tracking-widest text-muted-foreground">PLATFORM</span>
  <Tabs.Root
    value={commentStore.platform}
    onValueChange={(v) => {
      if (v) {
        commentStore.setPlatform(v as Platform);
        const newPlatform = platforms.find((p) => p.id === v);
        if (newPlatform && newPlatform.subTypes.length > 0) {
          commentStore.setSubType(newPlatform.subTypes[0].id as SubType);
        }
      }
    }}
    class="w-full"
  >
    <Tabs.List class="flex w-full h-auto gap-1 rounded-xl border border-border bg-secondary/50">
      {#each platforms as platform (platform.id)}
        {@const Icon = platform.icon}
        <Tabs.Trigger
          value={platform.id}
          disabled={!platform.enabled}
          title={platform.enabled ? platform.label : `${platform.label} (Coming soon)`}
          class="flex h-auto flex-1 flex-col items-center justify-center gap-1 rounded-lg px-0 py-2 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground {!platform.enabled
            ? 'opacity-40 disabled:opacity-40 hover:bg-transparent data-[state=inactive]:bg-transparent'
            : 'data-[state=inactive]:text-muted-foreground'}"
        >
          <Icon size={20} />
        </Tabs.Trigger>
      {/each}
    </Tabs.List>
  </Tabs.Root>

  <!-- Sub-type row (using Tabs for standard pill style) -->
  {#if activePlatform && activePlatform.subTypes.length > 0}
    <Tabs.Root
      value={commentStore.subType}
      class="w-full"
      onValueChange={(v) => {
        if (v) commentStore.setSubType(v as SubType);
      }}
    >
      <Tabs.List class="flex w-full h-8 p-1 bg-secondary/60">
        {#each activePlatform.subTypes as sub (sub.id)}
          <Tabs.Trigger value={sub.id} class="flex-1 text-xs transition-colors data-[state=active]:text-(--gen-accent)">
            {sub.label}
          </Tabs.Trigger>
        {/each}
      </Tabs.List>
    </Tabs.Root>
  {/if}
</div>
