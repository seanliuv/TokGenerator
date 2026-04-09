<script lang="ts">
  import './layout.css';
  import { ModeWatcher } from 'mode-watcher';
  import { env } from '$env/dynamic/public';
  import {
    SITE_NAME,
    SITE_ROOTURL,
    SITE_LOGOURL,
    SITE_TITLE,
    SITE_DESCRIPTION,
    SITE_OG_IMAGE,
    SITE_OG_TITLE,
    SITE_OG_DESCRIPTION,
  } from '$lib/config/site';
  import GoogleAnalytics from '$lib/components/atoms/GoogleAnalytics.svelte';

  const jsonLd = {
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1250',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is TokGenerator a free TikTok comment generator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, TokGenerator is a 100% free online tool to create realistic TikTok comment mockups for ads and prototypes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I download fake TikTok comment screenshots as PNG?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! You can export your generated TikTok comment screenshots as high-resolution PNG images instantly.',
        },
      },
    ],
  };

  let { children } = $props();
</script>

<svelte:head>
  <!-- Essential Meta Tags -->
  <title>{SITE_TITLE}</title>
  <meta name="description" content={SITE_DESCRIPTION} />
  <meta name="keywords" content="TikTok comment generator, fake TikTok comments, comment mockup, TikTok ads" />

  <!-- Open Graph (Social Media) -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={SITE_OG_TITLE} />
  <meta property="og:description" content={SITE_OG_DESCRIPTION} />
  <meta property="og:image" content={SITE_OG_IMAGE} />
  <meta property="og:url" content={SITE_ROOTURL} />
  <meta property="og:site_name" content={SITE_NAME} />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={SITE_OG_TITLE} />
  <meta name="twitter:description" content={SITE_OG_DESCRIPTION} />
  <meta name="twitter:image" content={SITE_OG_IMAGE} />

  <!-- Canonical URL -->
  <link rel="canonical" href={SITE_ROOTURL} />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />

  <!-- JSON-LD Structured Data -->
  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
  {@html `<script type="application/ld+json">${JSON.stringify(faqJsonLd)}</script>`}
</svelte:head>

<ModeWatcher defaultMode="light" />

<GoogleAnalytics id={env.PUBLIC_GOOGLE_ANALYTICS_ID} />

{@render children()}
