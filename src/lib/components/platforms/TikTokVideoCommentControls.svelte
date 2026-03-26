<script lang="ts">
  import AvatarInput from '../atoms/AvatarInput.svelte';
  import Engagement from '../atoms/Engagement.svelte';
  import CommentTextarea from '../atoms/CommentTextarea.svelte';
</script>

<div class="flex flex-col gap-5">
  <span class="text-[11px] font-semibold tracking-widest text-muted-foreground">COMMENT CONTROLS</span>
  <AvatarInput />
  <Engagement />
  <CommentTextarea />
</div>
