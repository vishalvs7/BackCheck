// src/app/(site)/layout.tsx
import '../globals.css';
import SiteNavbar from '@/components/site/SiteNavbar';
import SiteFooter from '@/components/site/SiteFooter';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <SiteNavbar />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}