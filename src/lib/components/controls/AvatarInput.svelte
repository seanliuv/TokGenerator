<script lang="ts">
	import { User, Upload, RefreshCw, Users } from '@lucide/svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { commentStore } from '$lib/stores/comment.svelte';
	import { fetchRandomUser, getRandomCelebrityAvatar, fileToDataUrl } from '$lib/utils/avatar';

	let fileInput: HTMLInputElement;
	let isLoading = $state(false);
	let lastAvatarMode = $state<'male' | 'female' | 'celebrity'>('male');

	async function handleAvatarSelect(mode: 'male' | 'female' | 'celebrity') {
		lastAvatarMode = mode;
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

	async function handleRandomize() {
		await handleAvatarSelect(lastAvatarMode);
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
	<span class="text-[11px] font-semibold tracking-widest text-muted-foreground">COMMENT CONTROLS</span>

	<!-- Avatar + Username row -->
	<div class="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2">
		<!-- Avatar preview -->
		<div class="relative shrink-0">
			{#if commentStore.avatarUrl}
				<img
					src={commentStore.avatarUrl}
					alt="avatar"
					class="h-8 w-8 rounded-full object-cover ring-1 ring-border" />
			{:else}
				<div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
					<User size={16} />
				</div>
			{/if}
			{#if isLoading}
				<div class="absolute inset-0 flex items-center justify-center rounded-full bg-background/60">
					<RefreshCw size={12} class="animate-spin text-muted-foreground" />
				</div>
			{/if}
		</div>

		<!-- Username input -->
		<input
			type="text"
			value={commentStore.username}
			oninput={(e) => commentStore.setUsername((e.target as HTMLInputElement).value)}
			placeholder="username"
			class="min-w-0 flex-1 border-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />

		<!-- Hidden file input -->
		<input
			bind:this={fileInput}
			type="file"
			accept="image/*"
			class="hidden"
			onchange={handleFileUpload} />

		<!-- Upload icon -->
		<button
			onclick={() => fileInput.click()}
			title="上传自定义头像"
			class="flex h-7 w-7 cursor-pointer items-center justify-center rounded border-none bg-transparent text-muted-foreground transition-colors hover:text-foreground">
			<Upload size={14} />
		</button>

		<!-- Randomize icon -->
		<button
			onclick={handleRandomize}
			title="随机生成"
			class="flex h-7 w-7 cursor-pointer items-center justify-center rounded border-none bg-transparent text-muted-foreground transition-colors hover:text-foreground">
			<RefreshCw size={14} />
		</button>

		<!-- Avatar type dropdown -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props }: { props: Record<string, unknown> })}
					<button
						{...props}
						title="选择头像类型"
						class="flex h-7 w-7 cursor-pointer items-center justify-center rounded border-none bg-transparent text-muted-foreground transition-colors hover:text-foreground">
						<Users size={14} />
					</button>
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
				<DropdownMenu.Item onclick={() => handleAvatarSelect('celebrity')}
					class="font-medium" style="color: var(--gen-accent);">
					<Users size={14} class="mr-2" />
					Celebrity
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
