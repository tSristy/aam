import CommunityAboutPage from '@/page/About/CommunityAboutPage';
import { createPageMetadata } from '@/lib/site';

export const metadata = createPageMetadata({
  title: 'About Us — Mission, Legacy & Community Service',
  description: 'Learn about the history, humanitarian values, mission and community work of Amzad Ali Memorial Foundation in Mymensingh, Bangladesh.',
  path: '/about',
});

export default function AboutPage() {
  return <CommunityAboutPage />;
}
