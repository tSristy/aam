import CommunityMomentsPage from '@/page/Moments/CommunityMomentsPage';
import { getPublicContent } from '@/lib/api-server';
import { createPageMetadata, jsonLd, siteConfig } from '@/lib/site';

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata({
  title: 'Moments of Compassion — Community Impact Gallery',
  description: 'Explore photographs and stories from AAMF healthcare, education, relief, welfare and community programs in Bangladesh.',
  path: '/moments',
});

export default async function MomentsPage() {
  let items = [];
  let error = '';

  try {
    items = await getPublicContent('moment');
  } catch (err) {
    console.error('Unable to load public moments:', err);
    error = 'Moments are temporarily unavailable. Please try again shortly.';
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AAMF Moments',
    url: `${siteConfig.url}/moments`,
    isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteConfig.url}/moments/${encodeURIComponent(item.slug || item.id)}`,
        name: item.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(collectionSchema) }} />
      <CommunityMomentsPage initialItems={items} initialError={error} />
    </>
  );
}
