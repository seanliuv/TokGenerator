import type { RequestHandler } from '@sveltejs/kit';

const ALLOWED_MODES = ['male', 'female'] as const;
type AvatarMode = (typeof ALLOWED_MODES)[number];

const ALLOWED_ORIGINS = ['https://tokgenerator.com', 'http://localhost:5174/'];
const ALLOWED_IMAGE_HOSTS = ['randomuser.me'];
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
const FETCH_TIMEOUT_MS = 8000;
const MAX_IMAGE_BYTES = 256 * 1024; // 256 KB

const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36';

interface RandomUserApiResponse {
	results: Array<{
		name: { first: string; last: string };
		picture: { large: string };
	}>;
}

// SSRF — validate image URL hostname before fetching
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

async function fetchImageAsDataUrl(imageUrl: string): Promise<{ dataUrl: string }> {
	const imageRes = await fetch(imageUrl, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
	if (!imageRes.ok) {
		throw new Error(`Failed to fetch image: ${imageRes.statusText}`);
	}
	// Content-Type injection — allowlist only safe image types
	const raw = imageRes.headers.get('Content-Type') ?? '';
	const contentType = ALLOWED_IMAGE_TYPES.find((t) => raw.startsWith(t)) ?? 'image/jpeg';
	// Response body size limit — check header first, then actual buffer
	const cl = imageRes.headers.get('Content-Length');
	if (cl && parseInt(cl, 10) > MAX_IMAGE_BYTES) {
		throw new Error('Image too large');
	}
	const buf = Buffer.from(await imageRes.arrayBuffer());
	if (buf.byteLength > MAX_IMAGE_BYTES) {
		throw new Error('Image too large');
	}
	const dataUrl = `data:${contentType};base64,${buf.toString('base64')}`;
	return { dataUrl };
}

async function handleRandomUser(gender: 'male' | 'female'): Promise<{ username: string; avatarUrl: string }> {
	const res = await fetch(
		`https://randomuser.me/api/?gender=${gender}&results=1&inc=name,picture&noinfo`,
		{ signal: AbortSignal.timeout(FETCH_TIMEOUT_MS), headers: { 'User-Agent': USER_AGENT } }
	);
	if (!res.ok) {
		throw new Error(`randomuser.me error: ${res.statusText}`);
	}
	const data = (await res.json()) as RandomUserApiResponse;
	const user = data.results[0];
	const username = `${user.name.first} ${user.name.last}`;
	// Validate URL before fetching
	assertSafeImageUrl(user.picture.large);
	const { dataUrl } = await fetchImageAsDataUrl(user.picture.large);
	return { username, avatarUrl: dataUrl };
}

export const GET: RequestHandler = async ({ url, request, platform }) => {
	// 要求 Origin 或 Referer 必须来自白名单，阻止 curl 等直接调用
	const origin = request.headers.get('Origin');
	const referer = request.headers.get('Referer');
	const originOk = origin && ALLOWED_ORIGINS.includes(origin);
	const refererOk = referer && ALLOWED_ORIGINS.some((o) => referer.startsWith(o));
	if (!originOk && !refererOk ) {
		return new Response('Forbidden', { status: 403 });
	}

	// Rate Limiting：仅 Cloudflare Workers 环境有效，Vite dev server 自动跳过
	const rateLimiter = platform?.env?.AVATAR_RATE_LIMITER;
	if (rateLimiter) {
		const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
		const { success } = await rateLimiter.limit({ key: ip });
		if (!success) {
			return new Response('Too Many Requests', { status: 429 });
		}
	}

	const mode = url.searchParams.get('mode') as AvatarMode | null;
	if (!mode || !ALLOWED_MODES.includes(mode)) {
		return new Response('Missing or invalid mode parameter', { status: 400 });
	}

	try {
		const result = await handleRandomUser(mode);
		return new Response(JSON.stringify(result), {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-store'
			}
		});
	} catch {
		return new Response('Avatar service unavailable', { status: 502 });
	}
};
