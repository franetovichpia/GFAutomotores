import AdminShell from '@/components/admin/AdminShell';

export const metadata = { title: 'Panel administrativo', robots: { index: false } };

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
