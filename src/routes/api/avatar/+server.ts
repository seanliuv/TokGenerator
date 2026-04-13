import type { RequestHandler } from '@sveltejs/kit';

const ALLOWED_MODES = ['male', 'female'] as const;
type AvatarMode = (typeof ALLOWED_MODES)[number];

const ALLOWED_ORIGINS = ['https://tokgenerator.com'];
const FETCH_TIMEOUT_MS = 8000;

const user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36';

interface RandomUserApiResponse {
	results: Array<{
		name: { first: string; last: string };
		picture: { large: string };
	}>;
}

async function fetchImageAsDataUrl(imageUrl: string): Promise<{ dataUrl: string }> {
	const imageRes = await fetch(imageUrl, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
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
		{ signal: AbortSignal.timeout(FETCH_TIMEOUT_MS), headers: { 'User-Agent': user_agent } }
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

export const GET: RequestHandler = async ({ url, request, platform }) => {
	// Origin 校验：仅在 Origin 头存在且不在白名单时拒绝
	// 同源浏览器 GET 请求不发 Origin，curl 等直接调用也不发，不影响正常用途
	const origin = request.headers.get('Origin');
	if (origin && !ALLOWED_ORIGINS.includes(origin)) {
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
