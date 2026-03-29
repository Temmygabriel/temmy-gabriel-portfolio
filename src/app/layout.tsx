import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Temmy Gabriel — Data Analyst',
  description: 'Data analyst who thinks in business terms. I turn complex, messy data into clear decisions — across finance, operations, and beyond.',
  keywords: ['data analyst', 'financial analysis', 'SQL', 'Power BI', 'Python', 'Excel', 'Nigeria', 'remote'],
  openGraph: {
    title: 'Temmy Gabriel — Data Analyst',
    description: 'Financial data analyst who thinks in business terms.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
