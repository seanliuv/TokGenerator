const ALLOWED_IMAGE_HOSTS = ['randomuser.me'];
const FETCH_TIMEOUT_MS = 8000;
const MAX_IMAGE_BYTES = 256 * 1024;

interface RandomUserApiResponse {
	results: Array<{
		name: { first: string; last: string };
		picture: { large: string };
	}>;
}

function assertSafeImageUrl(urlStr: string): void {
	let parsed: URL;
	try {
		parsed = new URL(urlStr);
	} catch {
		throw new Error('Invalid image URL');
	}
	if (parsed.protocol !== 'https:' || !ALLOWED_IMAGE_HOSTS.includes(parsed.hostname)) {
		throw new Error(`Disallowed image host: ${parsed.hostname}`);
	}
}

function blobToDataUrl(blob: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result !== 'string') {
				reject(new Error('Failed to read image'));
				return;
			}
			resolve(reader.result);
		};
		reader.onerror = () => reject(reader.error ?? new Error('Failed to read image'));
		reader.readAsDataURL(blob);
	});
}

export async function fetchRandomAvatar(
	mode: 'male' | 'female'
): Promise<{ username: string; avatarUrl: string }> {
	const res = await fetch(
		`https://randomuser.me/api/?gender=${mode}&results=1&inc=name,picture&noinfo`,
		{ signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) }
	);
	if (!res.ok) {
		throw new Error(`randomuser.me error: ${res.status}`);
	}

	const data = (await res.json()) as RandomUserApiResponse;
	const user = data.results[0];
	if (!user) {
		throw new Error('No user returned');
	}

	assertSafeImageUrl(user.picture.large);

	const imageRes = await fetch(user.picture.large, {
		signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
	});
	if (!imageRes.ok) {
		throw new Error(`Failed to fetch image: ${imageRes.status}`);
	}

	const contentType = imageRes.headers.get('content-type') ?? '';
	if (!contentType.startsWith('image/')) {
		throw new Error('Avatar response was not an image');
	}

	const blob = await imageRes.blob();
	if (blob.size > MAX_IMAGE_BYTES) {
		throw new Error('Image too large');
	}

	return {
		username: `${user.name.first} ${user.name.last}`,
		avatarUrl: await blobToDataUrl(blob)
	};
}
