// src/components/site/SiteNavbar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthProvider';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function SiteNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="border-b border-secondary-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">BC</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              BackCheck
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-secondary-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-secondary-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/how-it-works" className="text-secondary-300 hover:text-white transition-colors">
              How It Works
            </Link>
            
            {user ? (
              <Link 
                href={user.role === 'talent' ? '/dashboard/talent/profile' : '/dashboard/employer/search'}
                className="btn-primary"
              >
                Go to Dashboard
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-secondary-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <div className="flex space-x-2">
                  <Link href="/register/talent" className="btn-secondary">
                    Join as Talent
                  </Link>
                  <Link href="/register/employer" className="btn-primary">
                    Join as Employer
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-secondary-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-secondary-800 pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/features" className="text-secondary-300 hover:text-white">
                Features
              </Link>
              <Link href="/pricing" className="text-secondary-300 hover:text-white">
                Pricing
              </Link>
              <Link href="/how-it-works" className="text-secondary-300 hover:text-white">
                How It Works
              </Link>
              
              {user ? (
                <Link 
                  href={user.role === 'talent' ? '/dashboard/talent/profile' : '/dashboard/employer/search'}
                  className="btn-primary text-center"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="btn-secondary text-center">
                    Sign In
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/register/talent" className="btn-secondary text-center">
                      Talent
                    </Link>
                    <Link href="/register/employer" className="btn-primary text-center">
                      Employer
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}