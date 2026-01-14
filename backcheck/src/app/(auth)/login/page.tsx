// src/app/(auth)/login/page.tsx - COMPLETE FIXED VERSION
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthProvider';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, signIn, loading: authLoading } = useAuth();

  // Handle redirect parameter - FIXED
  useEffect(() => {
    if (user && !authLoading) {
      const redirectParam = searchParams.get('redirect');
      
      // Fix the redirect path (remove /dashboard/ prefix if present)
      let redirectPath = redirectParam ? redirectParam.replace('/dashboard/', '/') : null;
      
      // Validate redirect path
      if (redirectPath && (redirectPath.startsWith('/talent') || redirectPath.startsWith('/employer'))) {
        router.push(redirectPath);
      } else {
        // Default redirect based on role
        if (user.role === 'talent') {
          router.push('/talent/profile');
        } else {
          router.push('/employer/search');
        }
      }
    }
  }, [user, authLoading, router, searchParams]);

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render if already logged in (useEffect will handle redirect)
  if (user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      // Auth context and useEffect will handle redirection
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-xl">BC</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to your BackCheck account</p>
        </div>

        <div className="bg-[#0A0A0F] border border-[#1E293B] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-[#0A0A0F] border border-[#334155] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 pr-10 bg-[#0A0A0F] border border-[#334155] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#1E293B]">
            <p className="text-center text-gray-400">
              Don&apos;t have an account?
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Link
                href="/register/talent"
                className="py-2.5 px-4 border border-[#334155] rounded-lg text-primary-400 hover:bg-[#1E293B] transition-colors text-center"
              >
                Join as Talent
              </Link>
              <Link
                href="/register/employer"
                className="py-2.5 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-center"
              >
                Join as Employer
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-primary-400 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary-400 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}