import { getRandomCelebrity } from '$lib/data/celebrities';

export interface AvatarResult {
	username: string;
	avatarUrl: string;
	isCelebrity: boolean;
}

/**
 * Fetch a random user from randomuser.me API by gender
 */
interface RandomUserApiResponse {
	results: Array<{
		name: { first: string; last: string };
		picture: { large: string };
	}>;
}

export async function fetchRandomUser(gender: 'male' | 'female'): Promise<AvatarResult> {
	const response = await fetch(
		`https://randomuser.me/api/?gender=${gender}&results=1&inc=name,picture&noinfo`
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch random user: ${response.statusText}`);
	}

	const data = (await response.json()) as RandomUserApiResponse;
	const user = data.results[0];
	const firstName = user.name.first;
	const lastName = user.name.last;
	// Format: firstname_lastname style (TikTok-ish username)
	const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;

	return {
		username,
		avatarUrl: user.picture.large,
		isCelebrity: false
	};
}

/**
 * Get a random celebrity from the local dataset
 */
export function getRandomCelebrityAvatar(): AvatarResult {
	const celebrity = getRandomCelebrity();
	return {
		username: celebrity.name,
		avatarUrl: celebrity.avatarUrl,
		isCelebrity: true
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
