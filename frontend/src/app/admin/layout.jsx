import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: { default: 'AAMF CMS', template: '%s | AAMF CMS' },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
