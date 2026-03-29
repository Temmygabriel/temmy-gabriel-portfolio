import type { Metadata } from 'next';
import '../../styles/globals.css';

export const metadata: Metadata = {
  title: 'Admin — Temmy Gabriel Portfolio',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
