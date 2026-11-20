import NewsArticlesPage from '@/page/News_articles/NewsArticlesPage';
import { getPublicContent } from '@/lib/api-server';
import { createPageMetadata, jsonLd, siteConfig } from '@/lib/site';

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata({
  title: 'News & Articles',
  description: 'Read the latest news, stories, notices and community updates from Amzad Ali Memorial Foundation.',
  path: '/news-articles',
});

export default async function NewsPage() {
  let items = [];
  let error = '';

  try {
    items = await getPublicContent('news');
  } catch (err) {
    console.error('Unable to load public news:', err);
    error = 'News is temporarily unavailable. Please try again shortly.';
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'News & Articles',
    url: `${siteConfig.url}/news-articles`,
    isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteConfig.url}/news-articles/${encodeURIComponent(item.slug || item.id)}`,
        name: item.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(collectionSchema) }} />
      <NewsArticlesPage initialItems={items} initialError={error} />
    </>
  );
}
