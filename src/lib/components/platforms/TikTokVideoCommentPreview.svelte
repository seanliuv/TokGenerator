<script lang="ts">
  import { Heart, ThumbsDown, ChevronDown } from '@lucide/svelte';

  interface Props {
    username: string;
    avatarUrl: string;
    isVerified: boolean;
    time: { value: number; unit: string; mode?: string; customDate?: string };
    likes: number;
    replies: number;
    commentText: string;
    theme: 'light' | 'dark';
  }

  let { username, avatarUrl, isVerified, time, likes, replies, commentText, theme }: Props = $props();

  const cardBg = $derived(theme === 'dark' ? '#121212' : '#ffffff');
  const textPrimary = $derived(theme === 'dark' ? '#e8e8e8' : '#161823');
  // textMuted1: username, Reply, View replies (略深)
  const textMuted1 = $derived(theme === 'dark' ? '#8a8b91' : '#73747b');
  // textMuted2: 时间戳, 点赞计数 (略浅)
  const textMuted2 = $derived(theme === 'dark' ? '#73747b' : '#8a8b91');
  const dividerColor = $derived(theme === 'dark' ? '#e8e8e8' : '#161823');

  function formatTime(t: typeof time): string {
    if (t.mode === 'custom' && t.customDate) return t.customDate;
    const map: Record<string, string> = { mins: 'm', hrs: 'h', days: 'd', wks: 'w' };
    return `${t.value}${map[t.unit] ?? 'd'}`;
  }

  function formatLikes(n: number): string {
    return n.toLocaleString('en-US');
  }
</script>

<div class="w-105 select-none px-4 py-3" style="background: {cardBg}; font-family: 'TikTok Sans', sans-serif;">
  <!-- Avatar + content row -->
  <div class="flex items-start gap-3">
    <!-- Avatar -->
    <div class="shrink-0 pt-0.5">
      {#if avatarUrl}
        <img src={avatarUrl} alt={username} class="size-8 rounded-full object-cover" />
      {:else}
        <div class="size-8 rounded-full bg-[#888] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" fill="#ccc" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#ccc" />
          </svg>
        </div>
      {/if}
    </div>

    <!-- Content -->
    <div class="min-w-0 flex-1">
      <!-- Username + badge -->
      <div class="mb-1 flex items-center gap-1">
        <span class="text-[14px] font-semibold leading-snug" style="color: {textMuted1};">
          {username}
        </span>
        {#if isVerified}
          <span class="inline-flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[#20d5ec]">
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2 2 4-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        {/if}
      </div>

      <!-- Comment text -->
      <p class="mb-1.5 wrap-break-word text-[15px] font-semibold leading-[1.4]" style="color: {textPrimary};">
        {commentText}
      </p>

      <!-- Meta row: time + reply | heart count + thumbsdown -->
      <div class="mt-0.5 flex items-center justify-between">
        <div class="flex items-center gap-x-3.5">
          <span class="text-[13px]" style="color: {textMuted2};">{formatTime(time)}</span>
          <span class="text-[13px] font-semibold" style="color: {textMuted1};">Reply</span>
        </div>
        <div class="flex items-center gap-1.5">
          <Heart size={18} color={textMuted2} />
          <span class="text-[13px]" style="color: {textMuted2};">{formatLikes(likes)}</span>
          <ThumbsDown size={16} color={textMuted1} />
        </div>
      </div>

      <!-- View replies row -->
      {#if replies > 0}
        <div class="mt-3 flex items-center gap-x-2">
          <div class="h-px w-6 opacity-20" style="background: {dividerColor};"></div>
          <span class="text-[13px] font-semibold" style="color: {textMuted1};">
            View {replies}
            {replies === 1 ? 'reply' : 'replies'}
          </span>
          <ChevronDown size={14} color={textMuted1} />
        </div>
      {/if}
    </div>
  </div>
</div>
