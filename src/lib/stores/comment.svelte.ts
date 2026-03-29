// Central reactive state using Svelte 5 $state rune
// Single source of truth for the entire comment generator
import { SiTiktok, SiInstagram, SiYoutube, SiX } from '@icons-pack/svelte-simple-icons';

export type Platform = 'tiktok' | 'instagram' | 'youtube' | 'twitter';
export type SubType = 'bubble-comment-reply' | 'video-comment' | 'post-comment' | 'reels-comment' | 'shorts-comment';
export type TimeUnit = 'mins' | 'hrs' | 'days' | 'wks';
export type CardTheme = 'light' | 'dark';

export const platforms = [
{
	id: 'tiktok',
	label: 'TikTok',
	icon: SiTiktok,
	enabled: true,
	subTypes: [
	{ id: 'bubble-comment-reply', label: 'Bubble Comment Reply' },
	{ id: 'video-comment', label: 'Video Comment' },
	],
},
{
	id: 'instagram',
	label: 'Instagram',
	icon: SiInstagram,
	enabled: false,
	subTypes: [
	{ id: 'post-comment', label: 'Post Comment' },
	{ id: 'reels-comment', label: 'Reels Comment' },
	],
},
{
	id: 'youtube',
	label: 'YouTube',
	icon: SiYoutube,
	enabled: false,
	subTypes: [
	{ id: 'video-comment', label: 'Video Comment' },
	{ id: 'shorts-comment', label: 'Shorts Comment' },
	],
},
{
	id: 'twitter',
	label: 'X',
	icon: SiX,
	enabled: false,
	subTypes: [{ id: 'post-comment', label: 'Post Comment' }],
},
];

export interface CommentState {
	platform: Platform;
	subType: SubType;
	username: string;
	avatarUrl: string;
	isVerified: boolean;
	commentText: string;
	time: { value: number; unit: TimeUnit };
	likes: number;
	replies: number;
	cardTheme: CardTheme;
}

function createCommentStore() {
	const state = $state<CommentState>({
		platform: 'tiktok',
		subType: 'bubble-comment-reply',
		username: 'username',
		avatarUrl: '',
		isVerified: false,
		commentText: 'Write your custom comment here 😊',
		time: { value: 10, unit: 'hrs' },
		likes: 72,
		replies: 2,
		cardTheme: 'light'
	});

	return {
		get platform() { return state.platform; },
		get subType() { return state.subType; },
		get username() { return state.username; },
		get avatarUrl() { return state.avatarUrl; },
		get isVerified() { return state.isVerified; },
		get commentText() { return state.commentText; },
		get time() { return state.time; },
		get likes() { return state.likes; },
		get replies() { return state.replies; },
		get cardTheme() { return state.cardTheme; },

		setPlatform(p: Platform) { state.platform = p; },
		setSubType(s: SubType) { state.subType = s; },
		setUsername(u: string) { state.username = u; },
		setAvatarUrl(url: string) { state.avatarUrl = url; },
		setIsVerified(v: boolean) { state.isVerified = v; },
		setCommentText(t: string) { state.commentText = t; },
		setTimeValue(v: number) { state.time.value = v; },
		setTimeUnit(u: TimeUnit) { state.time.unit = u; },
		setLikes(n: number) { state.likes = n; },
		setReplies(n: number) { state.replies = n; },
		setCardTheme(t: CardTheme) { state.cardTheme = t; },

		setAvatar(username: string, avatarUrl: string) {
			state.username = username;
			state.avatarUrl = avatarUrl;
		}
	};
}

export const commentStore = createCommentStore();
