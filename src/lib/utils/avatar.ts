export interface AvatarResult {
	username: string;
	avatarUrl: string;
	isCelebrity: boolean;
}

/**
 * Fetch avatar data from the server-side unified endpoint.
 * The server calls randomuser.me or Wikipedia and returns image data as a
 * base64 data URL — CORS-safe in both the browser and html-to-image PNG export.
 */
export async function fetchAvatarByMode(mode: 'male' | 'female' | 'celebrity'): Promise<AvatarResult> {
	const response = await fetch(`/api/avatar?mode=${mode}`);

	if (!response.ok) {
		throw new Error(`Failed to fetch avatar: ${response.statusText}`);
	}

	const data = (await response.json()) as { username: string; avatarUrl: string };
	return {
		username: data.username,
		avatarUrl: data.avatarUrl,
		isCelebrity: mode === 'celebrity'
	};
}

/**
 * Convert a File object to a data URL for local preview
 */
export function fileToDataUrl(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => resolve(e.target?.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}
