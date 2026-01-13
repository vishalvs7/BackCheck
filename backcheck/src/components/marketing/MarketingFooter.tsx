import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function MarketingFooter() {
  return (
    <footer className="bg-black border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6A1E55] to-[#3B1C32] flex items-center justify-center">
                <span className="text-white font-bold">BC</span>
              </div>
              <span className="text-xl font-bold text-white">BackCheck</span>
            </Link>
            <p className="text-gray-400 text-sm">
              One-time verification, lifetime access to professional credentials.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FF6B9D] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B9D] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B9D] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B9D] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/signup/professional" className="text-gray-400 hover:text-white text-sm transition-colors">
                  For Professionals
                </Link>
              </li>
              <li>
                <Link href="/signup/organisation" className="text-gray-400 hover:text-white text-sm transition-colors">
                  For Organizations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-900 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BackCheck. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Professional Verification Platform
          </p>
        </div>
      </div>
    </footer>
  );
}