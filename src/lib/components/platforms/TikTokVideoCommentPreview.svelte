<script lang="ts">
  import { Heart, ThumbsDown, ChevronDown } from '@lucide/svelte';

  interface Props {
    username: string;
    avatarUrl: string;
    isCelebrity?: boolean;
    time: { value: number; unit: string };
    likes: number;
    replies: number;
    commentText: string;
    theme: 'light' | 'dark';
  }

  let { username, avatarUrl, isCelebrity = false, time, likes, replies, commentText, theme }: Props = $props();

  const cardBg      = $derived(theme === 'dark' ? '#121212' : '#ffffff');
  const textPrimary = $derived(theme === 'dark' ? '#e8e8e8' : '#161823');
  const textMuted   = $derived(theme === 'dark' ? '#888888' : '#757575');

  function formatTime(value: number, unit: string): string {
    const map: Record<string, string> = { mins: 'm', hrs: 'h', days: 'd', wks: 'w' };
    return `${value}${map[unit] ?? 'd'}`;
  }

  function formatLikes(n: number): string {
    return n.toLocaleString('en-US');
  }
</script>

<div
  class="w-105 select-none px-4 py-3 font-sans"
  style="background: {cardBg};">

  <!-- Avatar + content row -->
  <div class="flex items-start gap-3">

    <!-- Avatar -->
    {#if avatarUrl}
      <img src={avatarUrl} alt={username}
        class="size-10 shrink-0 rounded-full object-cover" />
    {:else}
      <div class="size-10 shrink-0 rounded-full bg-[#888] flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill="#ccc" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#ccc" />
        </svg>
      </div>
    {/if}

    <!-- Content -->
    <div class="min-w-0 flex-1">

      <!-- Username + badge -->
      <div class="mb-0.5 flex items-center gap-1">
        <span class="text-[14px] font-semibold leading-snug" style="color: {textPrimary};">
          {username}
        </span>
        {#if isCelebrity}
          <span class="inline-flex size-3.75 shrink-0 items-center justify-center rounded-full bg-[#20d5ec]">
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2 2 4-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        {/if}
      </div>

      <!-- Comment text -->
      <p class="mb-1.5 wrap-break-word text-[15px] leading-[1.4]" style="color: {textPrimary};">
        {commentText}
      </p>

      <!-- Meta row: time + reply | heart count + thumbsdown -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-[13px]" style="color: {textMuted};">{formatTime(time.value, time.unit)}</span>
          <span class="text-[13px] font-semibold" style="color: {textMuted};">Reply</span>
        </div>
        <div class="flex items-center gap-1.5">
          <Heart size={16} color={textMuted} />
          <span class="text-[13px]" style="color: {textMuted};">{formatLikes(likes)}</span>
          <ThumbsDown size={16} color={textMuted} />
        </div>
      </div>

    </div>
  </div>

  <!-- View replies row -->
  {#if replies > 0}
    <div class="mt-2 ml-13 flex items-center gap-2">
      <div class="h-px w-6" style="background: {textMuted};"></div>
      <span class="text-[13px] font-semibold" style="color: {textMuted};">
        View {replies} {replies === 1 ? 'reply' : 'replies'}
      </span>
      <ChevronDown size={14} color={textMuted} />
    </div>
  {/if}

</div>
