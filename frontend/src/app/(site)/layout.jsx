import CommunityHeader from '@/assets/Header/CommunityHeader';
import Footer from '@/assets/Footer/Footer';

export default function SiteLayout({ children }) {
  return (
    <>
      <CommunityHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
