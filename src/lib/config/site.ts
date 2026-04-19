import type { Component } from 'svelte';
import {
  Layers,
  Type,
  PenTool,
  UserRound,
  SunMoon,
  ShieldCheck,
  MousePointer2,
  PenLine,
  SlidersHorizontal,
  ImageDown,
  KeyRound,
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

interface Stat {
  icon: Component;
  label: string;
}

export const hero = {
  h1: 'Realistic TikTok Comment Generator',
  subTitle:
    'The most accurate tool to create fake TikTok comments for your marketing ads, UI prototypes, and creative projects.',
  stats: [
    { icon: PenTool, label: 'Pixel-Perfect Accuracy' },
    { icon: KeyRound, label: 'Free · No Account Needed' },
    { icon: ShieldCheck, label: '100% Private · Zero Upload' },
    { icon: ImageDown, label: 'Instant Retina Quality Export' },
  ] satisfies Stat[],
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
    icon: PenTool,
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
      'TokGenerator is a free browser-based tool for generating realistic fake TikTok comment screenshots — no account or installation required. It uses TikTok\'s actual font and pixel-perfect layout, so the output is indistinguishable from a real screenshot.',
  },
  {
    question: 'Is TokGenerator completely free?',
    answer:
      'Yes, 100% free with no account required — no watermarks, no usage limits, no hidden fees.',
  },
  {
    question: 'Is it legal to create fake TikTok comment screenshots?',
    answer:
      'Creating TikTok comment mockups for ad creatives, prototypes, and educational content is widely accepted. When used in paid ads, ensure your content complies with TikTok\'s advertising policies.',
  },
  {
    question: 'Do I need a TikTok account to use this?',
    answer:
      'No. TokGenerator is a standalone design tool — no TikTok account, login, or credentials of any kind required.',
  },
  {
    question: 'What TikTok comment styles are available?',
    answer:
      'Two styles: Video Comment (full card with likes, replies, and timestamp, as seen below TikTok videos) and Bubble Reply (speech-bubble format for reply threads). Both support light and dark themes.',
  },
  {
    question: 'Can I customize the like count, replies, and timestamp?',
    answer:
      'Yes. In Video Comment style you can set like count, reply count, timestamp format (relative like "2h" or a custom date like "2025-3-21" and other formats), and toggle the verified badge on or off.',
  },
  {
    question: 'Is there a character limit on comment text?',
    answer: 'Yes, 150 characters — matching TikTok\'s own comment length limit.',
  },
  {
    question: 'Can I use my own avatar photo?',
    answer:
      'Yes. Upload any photo from your device, or click the random avatar button to instantly generate a realistic-looking profile photo (male or female) in one click.',
  },
  {
    question: 'Can I use TokGenerator for TikTok Ads?',
    answer:
      'Yes. Marketers use it to create TikTok comment mockups for UGC-style ad creatives and social proof visuals. Ensure your ad content complies with TikTok\'s advertising policies.',
  },
  {
    question: 'Is it safe to use fake TikTok comments in my ads?',
    answer:
      'Yes. Using a mockup image as an ad asset does not violate TikTok\'s platform rules. Ad account risk depends on your ad content and targeting — not the tool used to create the visual.',
  },
  {
    question: 'What quality are the exported images?',
    answer:
      'Exported as PNG at approximately 1760 × 816 px — sharp and ready for ads, presentations, and social media. No watermarks. Both download and copy-to-clipboard are supported.',
  },
  {
    question: 'Does TokGenerator work on mobile?',
    answer:
      'Yes. It runs in any browser — desktop, tablet, iPhone, or Android — with no app to install.',
  },
  {
    question: 'What happens to photos I upload? Is my data private?',
    answer:
      'Your uploaded photos never leave your device. Everything runs locally in your browser — nothing is sent to any server.',
  },
  {
    question: 'Will more platforms be supported?',
    answer: 'Yes. Instagram, YouTube, and X (Twitter) comment styles are planned for a future release.',
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
