import Link from 'next/link';

export default function AuthNavbar() {
  return (
    <nav className="w-full py-4 px-6 border-b border-gray-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6A1E55] to-[#3B1C32] flex items-center justify-center">
            <span className="text-white font-bold text-xl">BC</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-[#6A1E55] to-[#FF6B9D] bg-clip-text text-transparent">
            BackCheck
          </span>
        </Link>
        
        {/* Auth Links */}
        <div className="flex items-center space-x-4">
          <Link 
            href="/signin" 
            className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/signup/professional" 
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}