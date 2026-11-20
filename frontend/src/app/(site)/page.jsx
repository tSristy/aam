import CommunityHomepage from '@/page/Home/CommunityHomepage';
import { createPageMetadata } from '@/lib/site';

export const metadata = createPageMetadata({
  title: 'Healthcare, Education & Community Welfare',
  description: 'Amzad Ali Memorial Foundation supports healthcare, education, disaster relief, family welfare and community development in Mymensingh, Bangladesh.',
  path: '/',
});

export default function HomePage() {
  return <CommunityHomepage />;
}
