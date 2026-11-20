import { cache } from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import ContentDetailPage from '@/components/ContentDetailPage';
import { getPublicPost } from '@/lib/api-server';
import { safeDecode } from '@/lib/media';
import { absoluteUrl, jsonLd, plainText, siteConfig, truncate } from '@/lib/site';

const loadPost = cache(async (slug) => {
  try {
    const item = await getPublicPost(slug);
    if (!item || item.type !== 'news' || item.status === 'draft') return null;
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
  if (!item) return { title: 'Article Not Found', robots: { index: false, follow: false } };

  const description = truncate(item.excerpt || item.content || `Read ${item.title} from ${siteConfig.name}.`);
  const canonical = `/news-articles/${encodeURIComponent(item.slug || slug)}`;
  const images = item.image_url ? [{ url: absoluteUrl(item.image_url), alt: item.title }] : [];

  return {
    title: item.title,
    description,
    authors: [{ name: item.source || siteConfig.name }],
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'article',
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: canonical,
      title: item.title,
      description,
      publishedTime: item.created_at || undefined,
      modifiedTime: item.updated_at || item.created_at || undefined,
      section: item.category || undefined,
      tags: item.tag ? [item.tag] : undefined,
      images,
    },
    twitter: { card: 'summary_large_image', title: item.title, description, images: item.image_url ? [absoluteUrl(item.image_url)] : [] },
  };
}

export default async function NewsDetailPage({ params }) {
  const { slug: rawSlug } = await params;
  const slug = safeDecode(rawSlug);
  const item = await loadPost(slug);
  if (!item) notFound();
  if (item.slug && slug !== item.slug) permanentRedirect(`/news-articles/${encodeURIComponent(item.slug)}`);

  const canonical = absoluteUrl(`/news-articles/${encodeURIComponent(item.slug || slug)}`);
  const contentSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: truncate(item.excerpt || item.content || ''),
    articleBody: plainText(item.content || item.excerpt || ''),
    datePublished: item.created_at || undefined,
    dateModified: item.updated_at || item.created_at || undefined,
    image: item.image_url ? [absoluteUrl(item.image_url)] : undefined,
    mainEntityOfPage: canonical,
    author: { '@type': 'Organization', name: item.source || siteConfig.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/icon.svg') },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'News & Articles', item: absoluteUrl('/news-articles') },
      { '@type': 'ListItem', position: 3, name: item.title, item: absoluteUrl(`/news-articles/${encodeURIComponent(item.slug || slug)}`) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(contentSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <ContentDetailPage item={item} type="news" shareUrl={canonical} />
    </>
  );
}
