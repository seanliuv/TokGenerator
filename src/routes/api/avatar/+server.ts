import type { RequestHandler } from '@sveltejs/kit';

interface WikipediaSummary {
	thumbnail?: { source: string };
}

export const GET: RequestHandler = async ({ url }) => {
	const name = url.searchParams.get('name');
	if (!name) {
		return new Response('Missing name parameter', { status: 400 });
	}

	const summaryRes = await fetch(
		`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`,
		{ headers: { 'User-Agent': 'TikTokCommentGenerator/1.0 (open-source educational tool)' } }
	);

	if (!summaryRes.ok) {
		return new Response('Celebrity not found', { status: 404 });
	}

	const summary = (await summaryRes.json()) as WikipediaSummary;
	const rawUrl = summary.thumbnail?.source;

	if (!rawUrl) {
		return new Response('No image available', { status: 404 });
	}

	const imageUrl = rawUrl;
	const imageRes = await fetch(imageUrl);

	if (!imageRes.ok) {
		return new Response('Failed to fetch image', { status: 502 });
	}

	const contentType = imageRes.headers.get('Content-Type') ?? 'image/jpeg';
	return new Response(imageRes.body, {
		headers: {
			'Content-Type': contentType,
			'Cache-Control': 'public, max-age=86400'
		}
	});
};
