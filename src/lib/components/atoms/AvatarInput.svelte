<script lang="ts">
  import { User, Upload, RefreshCw, Users, BadgeCheck } from '@lucide/svelte';
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { Toggle } from '$lib/components/ui/toggle';
  import * as Avatar from '$lib/components/ui/avatar';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { commentStore } from '$lib/stores/comment.svelte';

  let fileInput: HTMLInputElement;
  let isLoading = $state(false);

  /**
   * Fetch avatar data from the server-side unified endpoint.
   * The server calls randomuser.me and returns image data as a
   * base64 data URL — CORS-safe in both the browser and html-to-image PNG export.
   */
  async function fetchAvatarByMode(mode: 'male' | 'female'): Promise<{ username: string; avatarUrl: string }> {
    const response = await fetch(`/api/avatar?mode=${mode}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch avatar: ${response.statusText}`);
    }

    const data = (await response.json()) as { username: string; avatarUrl: string };
    return {
      username: data.username,
      avatarUrl: data.avatarUrl,
    };
  }

  /**
   * Convert a File object to a data URL for local preview
   */
  function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleAvatarSelect(mode: 'male' | 'female') {
    isLoading = true;
    try {
      const result = await fetchAvatarByMode(mode);
      commentStore.setAvatar(result.username, result.avatarUrl);
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
  }
</script>

<div class="flex flex-col gap-2">
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
      </DropdownMenu.Content>
    </DropdownMenu.Root>

    <!-- Verified toggle -->
    <Toggle
      aria-label="Verified Toggle"
      title="Verified"
      pressed={commentStore.isVerified}
      onPressedChange={(v) => commentStore.setIsVerified(v)}
      class="h-8 w-8 data-[state=on]:bg-transparent data-[state=on]:text-blue-500 hover:bg-muted"
    >
      <BadgeCheck size={14} />
    </Toggle>
  </div>
</div>
