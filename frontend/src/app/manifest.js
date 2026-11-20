export default function manifest() {
  return {
    name: 'Amzad Ali Memorial Foundation',
    short_name: 'AAMF',
    description: 'Healthcare, education, welfare and community development in Bangladesh.',
    start_url: '/',
    scope: '/',
    lang: 'en',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#76BA1B',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
