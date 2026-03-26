<script lang="ts">
  import { User, Upload, RefreshCw, Users, BadgeCheck } from '@lucide/svelte';
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { Toggle } from '$lib/components/ui/toggle';
  import * as Avatar from '$lib/components/ui/avatar';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { commentStore } from '$lib/stores/comment.svelte';
  import { fetchRandomUser, getRandomCelebrityAvatar, fileToDataUrl } from '$lib/utils/avatar';

  let fileInput: HTMLInputElement;
  let isLoading = $state(false);

  async function handleAvatarSelect(mode: 'male' | 'female' | 'celebrity') {
    isLoading = true;
    try {
      if (mode === 'celebrity') {
        const result = getRandomCelebrityAvatar();
        commentStore.setAvatar(result.username, result.avatarUrl, true);
      } else {
        const result = await fetchRandomUser(mode);
        commentStore.setAvatar(result.username, result.avatarUrl, false);
      }
    } catch (e) {
      console.error('Failed to load avatar:', e);
    } finally {
      isLoading = false;
    }
  }

  async function handleFileUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    commentStore.setAvatarUrl(dataUrl);
    commentStore.setIsCelebrity(false);
  }
</script>

<div class="flex flex-col gap-2">
  <span class="text-[11px] font-semibold tracking-widest text-muted-foreground">AVATAR CONTROLS</span>

  <!-- Avatar + Username row -->
  <div class="flex items-center gap-1 rounded-lg border border-border bg-secondary/40 p-1 focus-within:ring-1 focus-within:ring-ring">
    <!-- Avatar preview -->
    <div class="relative shrink-0">
      <Avatar.Root class="h-9 w-9 ring-1 ring-border">
        {#if commentStore.avatarUrl}
          <Avatar.Image src={commentStore.avatarUrl} alt="avatar" class="object-cover" />
        {/if}
        <Avatar.Fallback class="bg-muted text-muted-foreground">
          <User size={16} />
        </Avatar.Fallback>
      </Avatar.Root>

      {#if isLoading}
        <div class="absolute inset-0 z-10 flex items-center justify-center rounded-full bg-background/60 backdrop-blur-[1px]">
          <RefreshCw size={12} class="animate-spin text-muted-foreground" />
        </div>
      {/if}
    </div>

    <!-- Username -->
    <Input
      type="text"
      value={commentStore.username}
      oninput={(e) => commentStore.setUsername((e.target as HTMLInputElement).value)}
      placeholder="username"
      class="h-8 min-w-0 flex-1 border-none bg-transparent px-2 text-sm text-foreground shadow-none focus-visible:ring-0"
    />

    <!-- Hidden file input -->
    <input bind:this={fileInput} type="file" accept="image/*" class="hidden" onchange={handleFileUpload} />

    <!-- Upload avatar button -->
    <Button
      variant="ghost"
      size="icon"
      onclick={() => fileInput.click()}
      title="Upload custom avatar"
      class="h-8 w-8 text-muted-foreground"
    >
      <Upload size={14} />
    </Button>

    <!-- Random avatar type dropdown -->
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button variant="ghost" size="icon" {...props} title="Select avatar type" class="h-8 w-8 text-muted-foreground">
            <Users size={14} />
          </Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="w-36">
        <DropdownMenu.Item onclick={() => handleAvatarSelect('male')}>
          <User size={14} class="mr-2" />
          Male
        </DropdownMenu.Item>
        <DropdownMenu.Item onclick={() => handleAvatarSelect('female')}>
          <User size={14} class="mr-2" />
          Female
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onclick={() => handleAvatarSelect('celebrity')} class="font-medium" style="color: var(--gen-accent);">
          <Users size={14} class="mr-2" />
          Celebrity
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>

    <!-- Verified toggle -->
    <Toggle
      aria-label="Verified Toggle"
      title="Verified"
      pressed={commentStore.isVerified}
      onchange={() => commentStore.setIsVerified(!commentStore.isVerified)}
      class="h-8 w-8 data-[state=on]:bg-transparent data-[state=on]:text-blue-500 hover:bg-muted"
    >
      <BadgeCheck size={14} />
    </Toggle>
  </div>
</div>
