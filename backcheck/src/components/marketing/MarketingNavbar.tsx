'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' }, // This is now correct (points to root)
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function MarketingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6A1E55] to-[#3B1C32] flex items-center justify-center">
                <span className="text-white font-bold text-xl">BC</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#6A1E55] to-[#FF6B9D] bg-clip-text text-transparent">
                BackCheck
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#FF6B9D]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/signin"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup/professional"
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-900">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                    pathname === link.href
                      ? 'bg-[#3B1C32] text-[#FF6B9D]'
                      : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-900 space-y-3">
                <Link
                  href="/signin"
                  className="block px-4 py-2 text-center text-base font-medium text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup/professional"
                  className="block px-4 py-2 text-center text-base font-medium bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white rounded-lg hover:opacity-90 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}