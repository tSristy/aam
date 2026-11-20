export const siteConfig = {
  name: 'Amzad Ali Memorial Foundation',
  shortName: 'AAMF',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aamfoundation.com').replace(/\/$/, ''),
  description:
    'Amzad Ali Memorial Foundation serves communities in Mymensingh, Bangladesh through healthcare, education, social welfare and community development.',
  locale: 'en_BD',
  contact: {
    phone: '+8802-55168031-37',
    email: 'mhoque10@gmail.com',
    address: 'Village Imadpur, P.O. Payari, Phulpur, Mymensingh 2250, Bangladesh',
  },
};

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function plainText(value = '') {
  return String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function truncate(value = '', max = 160) {
  const text = plainText(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function createPageMetadata({ title, description, path = '/' }) {
  const socialTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: path,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
    },
  };
}
