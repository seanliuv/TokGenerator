import type { Component } from 'svelte';
import {
  Layers,
  Type,
  Crosshair,
  UserRound,
  SunMoon,
  ShieldCheck,
  MousePointer2,
  PenLine,
  SlidersHorizontal,
  ImageDown,
} from '@lucide/svelte';

// ── Identity ─────────────────────────────────────────────────────────────────

export const SITE_NAME = 'TokGenerator';
export const SITE_ROOTURL = 'https://tokgenerator.com/';
export const SITE_LOGOURL = SITE_ROOTURL + 'web-app-manifest-192x192.png';
export const SITE_TITLE = `Free TikTok Comment Generator | TokGenerator`;
export const SITE_KEYWORD = 'TikTok comment generator, fake TikTok comments, comment mockup, TikTok ads';
export const SITE_DESCRIPTION = 'Create realistic fake TikTok comment screenshots for ads and social proof in seconds. Free TikTok Comment Generator, no login required.';
export const SITE_EMAIL = 'support@tokgenerator.com';
export const SITE_TAGLINE = 'We are not affiliated with TikTok, ByteDance Ltd.';

// ── JSON-LD ─────────────────────────────────────────────────────────────────

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  url: SITE_ROOTURL,
  logo: SITE_LOGOURL,
  operatingSystem: 'Web',
  applicationCategory: 'MultimediaApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

// ── Open Graph ────────────────────────────────────────────────────────────────
export const SITE_OG_IMAGE = SITE_ROOTURL + 'og-image.png';
// less than 60 characters to ensure the full title is displayed in search results and social media shares.
export const SITE_OG_TITLE = 'Create Realistic TikTok Comment Mockups in Seconds!';
// around 60 to 100 characters to ensure the full description is displayed in search results and social media shares.
export const SITE_OG_DESCRIPTION =
  'The best free tool to generate fake TikTok comments for ads, prototypes, and fun. No login required.';

// ── Social links ──────────────────────────────────────────────────────────────

export const socialLinks = {
  x: 'https://x.com/seanliuv',
  github: 'https://github.com/seanliuv',
  discord: 'https://discord.com',
};

// ── Hero section ──────────────────────────────────────────────────────────────

export const hero = {
  h1: 'Realistic TikTok Comment Generator',
  subTitle:
    'The most accurate tool to create fake TikTok comments for your marketing ads, UI prototypes, and creative projects. 100% free, private and secure, and no login required.',
  stats: [
    { label: 'Pixel Level Accuracy' },
    { label: 'No Login Required' },
    { label: 'Instant Export' },
  ],
};

// ── Features ──────────────────────────────────────────────────────────────────

interface Feature {
  icon: Component;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Layers,
    title: 'Two Authentic Styles',
    description:
      'Generate a full Video Comment card with engagement row, or a Bubble Reply for conversation threads. Both match TikTok\'s layout exactly.',
  },
  {
    icon: Type,
    title: 'The Real TikTok Font',
    description:
      'The only generator that uses TikTok\'s actual proprietary font. Every weight, size, and letter-spacing matches the real app — not an approximation.',
  },
  {
    icon: Crosshair,
    title: 'Pixel-Perfect Accuracy',
    description:
      'Verified badge, engagement counts, and timestamp formats are cloned pixel-by-pixel from TikTok\'s UI. Zoom in — you won\'t find the difference.',
  },
  {
    icon: UserRound,
    title: 'Real-Looking Avatars',
    description:
      'Upload your own photo or generate a realistic random profile picture in one click — male or female. Every output looks like a real TikTok account.',
  },
  {
    icon: SunMoon,
    title: 'Light & Dark Themes',
    description:
      'Switch the comment card between TikTok\'s light and dark interface with one click, independent of your system theme.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by Design',
    description:
      'Everything runs entirely in your browser. No images are uploaded to any server — your content is private and secure.',
  },
];

// ── Usage steps ───────────────────────────────────────────────────────────────

interface Step {
  number: string;
  icon: Component;
  title: string;
  description: string;
}

export const usageSteps: Step[] = [
  {
    number: '01',
    icon: MousePointer2,
    title: 'Choose Comment Style',
    description:
      'Select between Video Comment (with engagement row) or Bubble Reply style.',
  },
  {
    number: '02',
    icon: PenLine,
    title: 'Customize Your Content',
    description:
      'Enter a username, write your comment text, and upload a photo or use a random avatar with one click.',
  },
  {
    number: '03',
    icon: SlidersHorizontal,
    title: 'Adjust the Details',
    description:
      'Toggle the verified badge, set likes, replies, and timestamp format. Switch between light and dark card themes as you wish.',
  },
  {
    number: '04',
    icon: ImageDown,
    title: 'Export & Share',
    description: 'Download a retina-quality PNG or copy directly to clipboard. No watermarks.',
  },
];

// ── FAQs ──────────────────────────────────────────────────────────────────────
interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: 'What is TokGenerator?',
    answer:
      'TokGenerator is a free, browser-based tool for creating realistic TikTok comment screenshots — no account or software installation required. It supports two authentic comment styles (Video Comment and Bubble Reply), uses TikTok\'s actual proprietary font, and renders every detail at pixel-perfect accuracy. It\'s a privacy-first alternative to tools like TokComment and Postfully: everything runs locally in your browser, so your content never touches a server.',
  },
  {
    question: 'Is TokGenerator completely free?',
    answer:
      'Yes, TokGenerator is 100% free with no account or credit card required. You can generate and export as many TikTok comment screenshots as you want — no watermarks, no usage limits, and no hidden fees.',
  },
  {
    question: 'Is it legal to create fake TikTok comment screenshots?',
    answer:
      'Creating TikTok comment mockups for ad creatives, UI prototypes, presentations, and educational content is widely accepted practice. TokGenerator is designed for legitimate creative and marketing purposes — not for impersonation, fraud, or deception. When using generated images in commercial contexts such as TikTok Ads, ensure your content complies with TikTok\'s advertising policies and disclose that images are mockups where required.',
  },
  {
    question: 'Does this tool interact with my TikTok account?',
    answer:
      'No. TokGenerator is a standalone design tool with no connection to TikTok\'s platform or API. It never asks for your TikTok login credentials, never accesses your account, and never posts anything on your behalf. It simply renders a realistic comment image inside your browser.',
  },
  {
    question: 'What TikTok comment styles are available?',
    answer:
      'TokGenerator supports two TikTok comment styles. Video Comment is a full comment card — the style shown beneath TikTok videos — with avatar, username, verified badge, comment text, like count, reply count, and timestamp. Bubble Reply mimics the speech-bubble format used inside TikTok reply threads. Both styles support light and dark themes independently of your device\'s system theme.',
  },
  {
    question: 'Can I customize the like count, replies, and timestamp?',
    answer:
      'Yes. In Video Comment style, you can set a custom like count, reply count, and choose from multiple timestamp formats (for example, "2h", "3d", or "Jan 15") to match how real TikTok comments appear. You can also toggle the verified badge on or off and switch between light and dark card themes at any time. The Bubble Reply style shares the same avatar and theme controls.',
  },
  {
    question: 'Can I use my own avatar photo?',
    answer:
      'Yes. You can upload any image from your device as the profile avatar — JPG, PNG, and most common formats are supported. Alternatively, click the random avatar button to instantly generate a realistic profile photo (male or female) sourced from a real-face dataset, so the output looks like a genuine TikTok account.',
  },
  {
    question: 'How do I make a fake TikTok comment look realistic?',
    answer:
      'Use a real-sounding TikTok-style handle (a mix of letters, numbers, or underscores), pick a realistic profile photo or use the one-click random avatar generator, choose a natural timestamp, and write a comment in the casual tone typical of TikTok. For engagement counts, avoid suspiciously round numbers — something like 1.2K looks more authentic than exactly 1,000. TokGenerator automatically applies TikTok\'s exact proprietary font, color palette, and pixel-level spacing, so the visual result is indistinguishable from a real screenshot.',
  },
  {
    question: 'Can I use TokGenerator for TikTok Ads?',
    answer:
      'Yes. Marketers and content creators widely use TokGenerator to produce TikTok comment mockups for UGC-style ad creatives, pitch decks, and social proof visuals. Displaying comment mockups in ad concepts can help communicate engagement and build credibility in your designs. Ensure your final ad creative complies with TikTok\'s advertising policies and accurately represents your content.',
  },
  {
    question: 'What quality are the exported images?',
    answer:
      'All exported PNG images are rendered at 2× pixel density (Retina quality), so they look sharp and crisp on high-resolution displays, in presentations, and when shared on social media. The output contains no watermarks or TokGenerator branding. Both PNG download and copy-to-clipboard export are supported.',
  },
  {
    question: 'Does TokGenerator work on mobile?',
    answer:
      'Yes. TokGenerator runs entirely in your browser, so it works on any device — desktop, tablet, iPhone, or Android — with no app to install. The layout is responsive and adapts to smaller screens. For the most comfortable editing experience a desktop or tablet is recommended, but you can generate and export comment images directly from your phone.',
  },
  {
    question: 'What happens to photos I upload? Is my data private?',
    answer:
      'Your uploaded photos never leave your device. TokGenerator processes everything locally inside your browser — no images, usernames, or comment text are sent to any server. There is no account system, no tracking of your generated content, and nothing is stored after you close the tab.',
  },
  {
    question: 'Will more platforms be supported?',
    answer:
      'Yes. Instagram, YouTube, and X (Twitter) comment styles are in development and planned for a future release. If there is a specific platform or comment format you would like to see, feel free to reach out — community feedback shapes the roadmap.',
  },
];

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};

// ── Comparison table ──────────────────────────────────────────────────────────

export interface ComparisonRow {
  feature: string;
  TokGenerator: string;
  TokComment: string;
  Postfully: string;
}

export const comparisons: ComparisonRow[] = [
  { feature: 'Price', TokGenerator: 'Free', TokComment: 'Paid, limited daily free trial', Postfully: 'Free' },
  {
    feature: 'Font accuracy',
    TokGenerator: 'TikTok Sans (native)',
    TokComment: 'Approximate',
    Postfully: 'Approximate',
  },
  {
    feature: 'Date & timestamp format',
    TokGenerator: 'Exact match with real time formats.',
    TokComment: 'Simplified',
    Postfully: 'Simplified',
  },
  {
    feature: 'Layout & spacing',
    TokGenerator: 'Pixel-perfect',
    TokComment: 'Pixel-perfect',
    Postfully: 'Basic',
  },
  { feature: 'Login required', TokGenerator: 'No', TokComment: 'Yes', Postfully: 'No' },
  {
    feature: 'Data privacy',
    TokGenerator: 'Runs locally',
    TokComment: 'Cloud-based',
    Postfully: 'Cloud-based',
  },
  { feature: 'Export quality', TokGenerator: 'Retina-quality PNG', TokComment: 'Standard PNG', Postfully: 'Standard PNG' },
];
