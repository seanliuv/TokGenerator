import type { Component } from 'svelte';
import {
  Film,
  MessageCircle,
  UserRound,
  BadgeCheck,
  MousePointer2,
  PenLine,
  SlidersHorizontal,
  ImageDown,
  Sun,
  Heart,
} from '@lucide/svelte';

// ── Identity ─────────────────────────────────────────────────────────────────

export const SITE_NAME = 'TokGenerator';
export const SITE_ROOTURL = 'https://tokgenerator.com/';
export const SITE_LOGOURL = SITE_ROOTURL + 'web-app-manifest-192x192.png';
export const SITE_TITLE = `Free TikTok Comment Mockups Generator | TokGenerator`;
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
    icon: Film,
    title: 'Video Comment Style',
    description:
      'Full TikTok video comment card with engagement row — likes, replies, and timestamps that look completely authentic.',
  },
  {
    icon: MessageCircle,
    title: 'Bubble Reply Style',
    description:
      'Speech bubble comment reply format, perfect for creating realistic conversation screenshots.',
  },
  {
    icon: UserRound,
    title: 'Custom Avatars',
    description:
      'Upload your own photo or generate a realistic random avatar instantly. Male and female options available.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Badge Support',
    description:
      "Add TikTok's blue verification checkmark to any username. Every detail looks completely authentic.",
  },
  {
    icon: Heart,
    title: 'Like & Reply Counts',
    description:
      'Customize the number of likes and replies for each comment to match real TikTok engagement.',
  },
  {
    icon: Sun,
    title: 'Light & Dark Themes',
    description:
      "Match TikTok's light or dark interface independently from your system theme. Switch with one click.",
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
      'Select between Video Comment (with engagement row) or Bubble Reply style. Both match TikTok exactly.',
  },
  {
    number: '02',
    icon: PenLine,
    title: 'Customize Your Content',
    description:
      'Enter a username, write your comment text, and upload a photo or generate a random avatar with one click.',
  },
  {
    number: '03',
    icon: SlidersHorizontal,
    title: 'Adjust the Details',
    description:
      'Toggle the verified badge, set likes, replies, and timestamp. Switch between light and dark card themes.',
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
      'TokGenerator is a free online tool for generating TikTok comment screenshots that look exactly like they come from real TikTok. It\'s an free alternative to tools like TokComment.',
  },
  {
    question: 'Can I use this for TikTok Ads?',
    answer:
      'Yes! Many marketers use TokGenerator to create realistic TikTok comment mockups for their ad creatives. It\'s a great way to showcase social proof and engagement in your TikTok ad designs.',
  },
  {
    question: 'Does this tool post to real TikTok accounts?',
    answer:
      'No. This is a design tool that generates fake TikTok comment images for mockup purposes. It does not interact with the TikTok platform.',
  },
  {
    question: 'What TikTok comment styles are available?',
    answer:
      'TokGenerator currently supports two TikTok styles: Video Comment (a full comment card with likes, replies, and timestamp) and Bubble Reply (a speech bubble format for comment reply conversations). Both support light and dark themes.',
  },
  {
    question: 'Can I use my own avatar photo?',
    answer:
      'Yes. You can upload any image as the avatar directly from your device. Alternatively, click the random avatar button to generate a realistic random profile picture (male or female) in one click.',
  },
  {
    question: 'What quality are the exported images?',
    answer:
      'Exported PNG images are rendered at 2× pixel density (retina quality), so they look sharp on any screen or when shared on social media. There are no watermarks or branding added to the output.',
  },
  {
    question: 'Will more platforms be supported?',
    answer:
      'Instagram, YouTube, and X (Twitter) comment styles are planned and coming soon. Stay tuned for updates.',
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
  tokgenerator: string;
  tokcomment: string;
  postfully: string;
}

export const comparisonRows: ComparisonRow[] = [
  { feature: 'Price', tokgenerator: 'Free', tokcomment: 'Paid', postfully: 'Free' },
  {
    feature: 'Font accuracy',
    tokgenerator: 'TikTok Sans (native)',
    tokcomment: 'Approximate',
    postfully: 'Approximate',
  },
  {
    feature: 'Date & timestamp format',
    tokgenerator: 'Exact match',
    tokcomment: 'Simplified',
    postfully: 'Simplified',
  },
  {
    feature: 'Layout & spacing',
    tokgenerator: 'Pixel-perfect',
    tokcomment: 'Basic',
    postfully: 'Basic',
  },
  { feature: 'Login required', tokgenerator: 'No', tokcomment: 'No', postfully: 'No' },
  {
    feature: 'Data privacy',
    tokgenerator: 'Runs locally',
    tokcomment: 'Cloud-based',
    postfully: 'Cloud-based',
  },
];
