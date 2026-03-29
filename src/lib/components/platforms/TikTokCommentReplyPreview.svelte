<script lang="ts">
  interface Props {
    username: string;
    avatarUrl: string;
    isVerified: boolean;
    commentText: string;
    theme: 'light' | 'dark';
  }

  let { username, avatarUrl, isVerified, commentText, theme }: Props = $props();

  const cardBg = $derived(theme === 'dark' ? '#1c1c1c' : '#ffffff');
  const textPrimary = $derived(theme === 'dark' ? '#ffffff' : '#161823');
  const headerColor = $derived(theme === 'dark' ? '#8a8a8a' : '#5a5a5a');
</script>

{#snippet badge()}
  <span class="inline-flex size-4.25 shrink-0 items-center justify-center rounded-full bg-[#20d5ec]">
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 5l2 2 4-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </span>
{/snippet}

<!--
	Outer wrapper: pb-[2.5em] reserves space below bubble so the tail is visible.
	--bubble-bg drives the tail color via CSS variable.
-->
<div class="w-85 select-none font-sans pb-[2.5em]" style="--bubble-bg: {cardBg};">
  <!--
		Bubble: rounded-bl-none keeps the bottom-left corner sharp so the tail
		merges seamlessly. No overflow:hidden so the tail can peek out below.
	-->
  <div class="bubble relative rounded-[10px] rounded-bl-none px-4.5 pt-4.5 pb-5.5" style="background: {cardBg};">
    <div class="flex gap-3.5">
      <!-- Avatar: inside the bubble, left column, mt-5 offsets it down slightly -->
      {#if avatarUrl}
        <img src={avatarUrl} alt={username} class="size-11.25 mt-5 shrink-0 rounded-full object-cover" />
      {:else}
        <div class="size-11.25 mt-5 shrink-0 rounded-full bg-[#888] flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" fill="#ccc" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#ccc" />
          </svg>
        </div>
      {/if}

      <!-- Content: header + large comment text -->
      <div class="flex flex-col min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-1 text-[13px] font-semibold leading-snug" style="color: {headerColor};">
          <span>Reply to {username}'s</span>
          {#if isVerified}{@render badge()}{/if}
          <span>comment</span>
        </div>
        <p class="mt-1.5 wrap-break-word text-[28px] font-extrabold leading-tight" style="color: {textPrimary};">
          {commentText}
        </p>
      </div>
    </div>

    <!-- Smooth curved tail — 3 rotated shapes form the speech-bubble point -->
    <div class="tail"></div>
  </div>
</div>

<style>
  /*
	 * Speech-bubble tail using the CSS background-color rotation trick.
	 * Three overlapping rotated squares with a partial border-radius create
	 * a smooth curved tail at the bubble's bottom-left corner.
	 * z-index: -1 hides the portion inside the bubble; only the part that
	 * extends below the bubble's edge is visible.
	 */
  .tail {
    width: 50px;
    height: 50px;
    border-radius: 0% 33% 0 0;
    position: absolute;
    left: 8px;
    bottom: 13px;
    background-color: var(--bubble-bg, #ffffff);
    z-index: -1;
    transform: rotate(-89deg) skewX(4deg) scale(1, 0.866);
  }

  .tail::before,
  .tail::after {
    content: '';
    width: 50px;
    height: 50px;
    border-radius: 0% 33% 0 0;
    position: absolute;
    left: 8px;
    bottom: 13px;
    background-color: var(--bubble-bg, #ffffff);
    z-index: -1;
  }

  .tail::before {
    transform: rotate(-136deg) skewX(-45deg) scale(1.414, 0.707) translate(0, -50%);
  }

  .tail::after {
    transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);
  }
</style>
