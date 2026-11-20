'use client';
import AdminLayout from '@/admin/AdminLayout';
import ProtectedRoute from '@/admin/ProtectedRoute';
export default function ProtectedAdminLayout({ children }) {
  return <ProtectedRoute><AdminLayout>{children}</AdminLayout></ProtectedRoute>;
}
