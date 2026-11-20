import { getPublicContent } from '@/lib/api-server';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const now = new Date();
  const staticRoutes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/community', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/moments', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/news-articles', priority: 0.9, changeFrequency: 'daily' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  ].map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  try {
    const [news, moments] = await Promise.all([getPublicContent('news'), getPublicContent('moment')]);
    const dynamicRoutes = [
      ...news.map((item) => ({
        url: absoluteUrl(`/news-articles/${encodeURIComponent(item.slug || item.id)}`),
        lastModified: new Date(item.updated_at || item.created_at || now),
        images: item.image_url ? [absoluteUrl(item.image_url)] : undefined,
        changeFrequency: 'monthly',
        priority: 0.7,
      })),
      ...moments.map((item) => ({
        url: absoluteUrl(`/moments/${encodeURIComponent(item.slug || item.id)}`),
        lastModified: new Date(item.updated_at || item.created_at || now),
        images: item.image_url ? [absoluteUrl(item.image_url)] : undefined,
        changeFrequency: 'monthly',
        priority: 0.6,
      })),
    ];
    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error('Unable to include dynamic content in sitemap:', error);
    return staticRoutes;
  }
}
