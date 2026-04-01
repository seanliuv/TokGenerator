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
} from '@lucide/svelte';

// ── Identity ─────────────────────────────────────────────────────────────────

export const SITE_NAME = 'TokGenerator';
export const SITE_TITLE = `TikTok Comment Generator | ${SITE_NAME}`;
export const SITE_DESCRIPTION =
  'TokGenerator is a free online tool for creating fake TikTok comment screenshots. Create video comment and bubble reply images — complete with avatars, verified badges, likes, and timestamps. No sign-up required.';
export const SITE_TAGLINE = 'We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with TikTok, ByteDance Ltd.';

// ── Social links ──────────────────────────────────────────────────────────────

export const socialLinks = {
  x: 'https://x.com/seanliuv',
  github: 'https://github.com/seanliuv',
  discord: 'https://discord.com',
};

// ── Hero section ──────────────────────────────────────────────────────────────

export const hero = {
  h1: 'TikTok Comment Generator',
  subTitle: 'Create pixel-perfect TikTok comment images — video comments, bubble replies, light & dark themes. Free forever, no watermarks, no login required.',
  stats: [
    { label: '100% Free Forever' },
    { label: 'No Login Required' },
    { label: 'Instant PNG Export' },
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
    icon: Palette,
    title: 'Light & Dark Themes',
    description:
      "Match TikTok's light or dark interface independently from your system theme. Switch with one click.",
  },
  {
    icon: UserRound,
    title: 'Custom Avatars',
    description:
      'Upload your own photo or generate a realistic random avatar instantly. Male and female options available.',
  },
  {
    icon: Download,
    title: '2× Retina PNG Export',
    description:
      'Download crisp, high-resolution PNG images at 2× pixel density. Or copy directly to clipboard.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Badge Support',
    description:
      "Add TikTok's blue verification checkmark to any username. Every detail looks completely authentic.",
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
    description:
      'Download a 2× retina-quality PNG or copy directly to clipboard. No watermarks, no sign-up needed.',
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
      'TokGenerator is a free online tool for generating realistic TikTok comment screenshots. You can create video comment images and bubble reply images that look exactly like they come from the real TikTok app — complete with avatars, verified badges, likes, and timestamps.',
  },
  {
    question: 'Is it completely free to use?',
    answer:
      'Yes, 100% free. No hidden costs, no premium tiers, no watermarks, and no account required. Just open the tool and start creating.',
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
