import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '3rem 1.5rem' }}>
      <section style={{ maxWidth: 560, textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '4rem', fontWeight: 900, lineHeight: 1 }}>404</p>
        <h1 style={{ margin: '1rem 0 .5rem', fontSize: '2rem' }}>Page not found</h1>
        <p style={{ color: '#667085', lineHeight: 1.7 }}>
          The page you requested does not exist or may have moved.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            padding: '.8rem 1.2rem',
            borderRadius: 8,
            background: '#2e7d32',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 700,
          }}
        >
          Go to homepage
        </Link>
      </section>
    </main>
  );
}
