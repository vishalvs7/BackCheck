import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import AuthNavbar from '@/components/auth/AuthNavbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BackCheck - Authentication',
  description: 'Sign in or create your BackCheck account',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <div className="min-h-screen flex flex-col">
          <AuthNavbar />
          <main className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              {children}
            </div>
          </main>
          <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-900">
            <p>© {new Date().getFullYear()} BackCheck. All rights reserved.</p>
            <p className="mt-1">Professional Verification Platform</p>
          </footer>
        </div>
      </body>
    </html>
  );
}