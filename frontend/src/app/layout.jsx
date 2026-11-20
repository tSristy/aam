import '@/index.css';
import ThemeRegistry from '@/providers/ThemeRegistry';
import { jsonLd, siteConfig } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Healthcare, Education & Community Welfare`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'nonprofit',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: '/',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'NGO',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.svg`,
      description: siteConfig.description,
      foundingDate: '2007-04-23',
      foundingLocation: {
        '@type': 'Place',
        name: 'Phulpur, Mymensingh, Bangladesh',
      },
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Village Imadpur, P.O. Payari',
        addressLocality: 'Phulpur',
        addressRegion: 'Mymensingh',
        postalCode: '2250',
        addressCountry: 'BD',
      },
      areaServed: { '@type': 'Country', name: 'Bangladesh' },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'general inquiries',
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        availableLanguage: ['English', 'Bengali'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: { '@id': `${siteConfig.url}/#organization` },
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(siteSchema) }}
        />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
