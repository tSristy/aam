import { cache } from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import ContentDetailPage from '@/components/ContentDetailPage';
import { getPublicPost } from '@/lib/api-server';
import { safeDecode } from '@/lib/media';
import { absoluteUrl, jsonLd, siteConfig, truncate } from '@/lib/site';

const loadPost = cache(async (slug) => {
  try {
    const item = await getPublicPost(slug);
    if (!item || item.type !== 'moment' || item.status === 'draft') return null;
    return item;
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
});

export async function generateMetadata({ params }) {
  const { slug: rawSlug } = await params;
  const slug = safeDecode(rawSlug);
  const item = await loadPost(slug);
  if (!item) return { title: 'Moment Not Found', robots: { index: false, follow: false } };

  const description = truncate(item.excerpt || item.content || `A community moment from ${siteConfig.name}.`);
  const canonical = `/moments/${encodeURIComponent(item.slug || slug)}`;
  const images = item.image_url ? [{ url: absoluteUrl(item.image_url), alt: item.title }] : [];

  return {
    title: item.title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: { type: 'article', locale: siteConfig.locale, siteName: siteConfig.name, url: canonical, title: item.title, description, images },
    twitter: { card: 'summary_large_image', title: item.title, description, images: item.image_url ? [absoluteUrl(item.image_url)] : [] },
  };
}

export default async function MomentDetailPage({ params }) {
  const { slug: rawSlug } = await params;
  const slug = safeDecode(rawSlug);
  const item = await loadPost(slug);
  if (!item) notFound();
  if (item.slug && slug !== item.slug) permanentRedirect(`/moments/${encodeURIComponent(item.slug)}`);

  const contentSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: item.title,
    description: truncate(item.excerpt || item.content || ''),
    contentUrl: item.image_url ? absoluteUrl(item.image_url) : undefined,
    datePublished: item.created_at || undefined,
    representativeOfPage: true,
    creditText: siteConfig.name,
    url: absoluteUrl(`/moments/${encodeURIComponent(item.slug || slug)}`),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Moments', item: absoluteUrl('/moments') },
      { '@type': 'ListItem', position: 3, name: item.title, item: absoluteUrl(`/moments/${encodeURIComponent(item.slug || slug)}`) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(contentSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <ContentDetailPage item={item} type="moment" />
    </>
  );
}
