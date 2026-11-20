import Contact from '@/page/Contact/Contact';
import { createPageMetadata, jsonLd, siteConfig } from '@/lib/site';

export const metadata = createPageMetadata({
  title: 'Contact Us — Mymensingh, Bangladesh',
  description: 'Contact Amzad Ali Memorial Foundation in Phulpur, Mymensingh, Bangladesh for community programs, healthcare, education and humanitarian support.',
  path: '/contact',
});

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${siteConfig.name}`,
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      '@type': 'NGO',
      name: siteConfig.name,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(contactSchema) }} />
      <Contact />
    </>
  );
}
