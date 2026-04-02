import type { Component } from 'svelte';
import {
  Film,
  MessageCircle,
  Palette,
  UserRound,
  Download,
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
export const SITE_TITLE = `TikTok Comment Generator | TokGenerator`;
export const SITE_DESCRIPTION =
  'Create TikTok comment mockups with our free TikTok Comment Generator. Get realistic fake TikTok comments for ads and social proof in seconds. No signup required.';
export const SITE_TAGLINE = 'We are not affiliated with TikTok, ByteDance Ltd.';

export const SITE_EMAIL = 'support@tokgenerator.com';

// ── Social links ──────────────────────────────────────────────────────────────

export const socialLinks = {
  x: 'https://x.com/seanliuv',
  github: 'https://github.com/seanliuv',
  discord: 'https://discord.com',
};

// ── Hero section ──────────────────────────────────────────────────────────────

export const hero = {
  h1: 'Realistic TikTok Comment Generator',
  subTitle: 'The most accurate tool to create fake TikTok comments for your marketing ads, UI prototypes, and creative projects. 100% free, private and secure, and no login required.',
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
  }
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
    description:
      'Download a retina-quality PNG or copy directly to clipboard. No watermarks.',
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
      'TokGenerator is a online tool for generating realistic TikTok comment screenshots. You can create images that look exactly like they come from the real TikTok app — complete with avatars, verified badges, likes, and timestamps.',
  },
  {
    question: 'Can I use this for TikTok Ads?',
    answer:
      'Yes! Many marketers use TokGenerator to create realistic TikTok comment mockups for their ad creatives. It’s a great way to showcase social proof and engagement in your TikTok ad designs.',
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
