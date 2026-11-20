import CommunityPage from '@/page/Community/CommunityPage';
import { createPageMetadata } from '@/lib/site';

export const metadata = createPageMetadata({
  title: 'Community Programs & Social Welfare',
  description: 'Explore AAMF community programs in healthcare, education, relief, welfare and development serving families in Mymensingh and surrounding communities.',
  path: '/community',
});

export default function CommunityProgramsPage() {
  return <CommunityPage />;
}
