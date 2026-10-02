<script lang="ts">
	import { User, Upload, RefreshCw, Users, BadgeCheck } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Toggle } from '$lib/components/ui/toggle';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { commentStore } from '$lib/stores/comment.svelte';
	import { fetchRandomAvatar } from '$lib/utils/avatar';

	const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;

	let fileInput: HTMLInputElement;
	let isLoading = $state(false);
	let errorMessage = $state('');
	let avatarRequestId = 0;

	function fileToDataUrl(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				if (typeof reader.result !== 'string') {
					reject(new Error('Failed to read file'));
					return;
				}
				resolve(reader.result);
			};
			reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'));
			reader.readAsDataURL(file);
		});
	}

	async function handleAvatarSelect(mode: 'male' | 'female') {
		const requestId = ++avatarRequestId;
		isLoading = true;
		errorMessage = '';
		try {
			const result = await fetchRandomAvatar(mode);
			if (requestId !== avatarRequestId) return;
			commentStore.setAvatar(result.username, result.avatarUrl);
		} catch (e) {
			if (requestId !== avatarRequestId) return;
			console.error('Failed to load avatar:', e);
			errorMessage = e instanceof Error ? e.message : 'Failed to load avatar';
		} finally {
			if (requestId === avatarRequestId) isLoading = false;
		}
	}

	async function handleFileUpload(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		input.value = '';
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			errorMessage = 'Please choose an image file';
			return;
		}
		if (file.size > MAX_UPLOAD_BYTES) {
			errorMessage = 'Image must be 2MB or smaller';
			return;
		}

		errorMessage = '';
		try {
			const dataUrl = await fileToDataUrl(file);
			commentStore.setAvatarUrl(dataUrl);
		} catch (err) {
			console.error('Failed to read avatar file:', err);
			errorMessage = 'Failed to read image';
		}
	}
</script>

<div class="flex flex-col gap-2">
	<div
		class="flex items-center gap-1 rounded-lg border border-border bg-secondary/40 p-1 focus-within:ring-1 focus-within:ring-ring"
	>
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
				<div
					class="absolute inset-0 z-10 flex items-center justify-center rounded-full bg-background/60 backdrop-blur-[1px]"
				>
					<RefreshCw size={12} class="animate-spin text-muted-foreground" />
				</div>
			{/if}
		</div>

		<Input
			type="text"
			value={commentStore.username}
			oninput={(e) => commentStore.setUsername((e.target as HTMLInputElement).value)}
			placeholder="username"
			class="h-8 min-w-0 flex-1 border-none bg-transparent px-2 text-sm text-foreground shadow-none focus-visible:ring-0"
		/>

		<input bind:this={fileInput} type="file" accept="image/*" class="hidden" onchange={handleFileUpload} />

		<Button
			variant="ghost"
			size="icon"
			onclick={() => fileInput.click()}
			title="Upload custom avatar"
			class="h-8 w-8 text-muted-foreground"
		>
			<Upload size={14} />
		</Button>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button
						variant="ghost"
						size="icon"
						{...props}
						title="Select avatar type"
						class="h-8 w-8 text-muted-foreground"
					>
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

	{#if errorMessage}
		<p class="px-1 text-[11px] text-destructive">{errorMessage}</p>
	{/if}
</div>
