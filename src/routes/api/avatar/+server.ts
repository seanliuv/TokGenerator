import type { RequestHandler } from '@sveltejs/kit';
import { getRandomCelebrity } from '$lib/data/celebrities';

const ALLOWED_MODES = ['male', 'female', 'celebrity'] as const;
type AvatarMode = (typeof ALLOWED_MODES)[number];

const user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36';

interface RandomUserApiResponse {
	results: Array<{
		name: { first: string; last: string };
		picture: { large: string };
	}>;
}

interface WikipediaSummary {
	thumbnail?: { source: string };
}

async function fetchImageAsDataUrl(imageUrl: string): Promise<{ dataUrl: string }> {
	const imageRes = await fetch(imageUrl);
	if (!imageRes.ok) {
		throw new Error(`Failed to fetch image: ${imageRes.statusText}`);
	}
	const contentType = imageRes.headers.get('Content-Type') ?? 'image/jpeg';
	const buf = Buffer.from(await imageRes.arrayBuffer());
	const dataUrl = `data:${contentType};base64,${buf.toString('base64')}`;
	return { dataUrl };
}

async function handleRandomUser(gender: 'male' | 'female'): Promise<{ username: string; avatarUrl: string }> {
	const res = await fetch(
		`https://randomuser.me/api/?gender=${gender}&results=1&inc=name,picture&noinfo`,
		{ headers: { 'User-Agent': user_agent } }
	);
	if (!res.ok) {
		throw new Error(`randomuser.me error: ${res.statusText}`);
	}
	const data = (await res.json()) as RandomUserApiResponse;
	const user = data.results[0];
	const username = `${user.name.first} ${user.name.last}`;
	const { dataUrl } = await fetchImageAsDataUrl(user.picture.large);
	return { username, avatarUrl: dataUrl };
}

async function handleCelebrity(): Promise<{ username: string; avatarUrl: string }> {
	const celebrity = getRandomCelebrity();
	const summaryRes = await fetch(
		`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(celebrity.name)}`,
		{ headers: { 'User-Agent': user_agent } }
	);
	if (!summaryRes.ok) {
		throw new Error(`Wikipedia not found: ${celebrity.name}`);
	}
	const summary = (await summaryRes.json()) as WikipediaSummary;
	const imageUrl = summary.thumbnail?.source;
	if (!imageUrl) {
		throw new Error(`No image available for: ${celebrity.name}`);
	}
	return { username: celebrity.name, avatarUrl: imageUrl };
}

export const GET: RequestHandler = async ({ url }) => {
	const mode = url.searchParams.get('mode') as AvatarMode | null;

	if (!mode || !ALLOWED_MODES.includes(mode)) {
		return new Response('Missing or invalid mode parameter', { status: 400 });
	}

	try {
		const result =
			mode === 'celebrity'
				? await handleCelebrity()
				: await handleRandomUser(mode);

		return new Response(JSON.stringify(result), {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-store'
			}
		});
	} catch (e) {
		const message = e instanceof Error ? e.message : 'Unknown error';
		return new Response(message, { status: 502 });
	}
};
