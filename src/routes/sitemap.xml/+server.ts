import * as sitemap from 'super-sitemap';
import { SITE_ROOTURL } from '$lib/config/site';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  return await sitemap.response({
    origin: SITE_ROOTURL.replace(/\/$/, ''),
    excludeRoutePatterns: [
      '/api/.*',
    ],
    defaultChangefreq: 'daily',
    defaultPriority: 0.7
  });
};