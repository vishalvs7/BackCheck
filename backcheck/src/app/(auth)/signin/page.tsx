'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, signIn, loading: authLoading } = useAuth();

  // Redirect if already logged in
  if (user && !authLoading) {
    // In real app, check role from user data
    const role = localStorage.getItem('user_role') || 'professional';
    if (role === 'professional') {
      router.push('/professional/profile');
    } else {
      router.push('/organisation/search');
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      
      // Simulate role check - in real app, get from Firestore
      const role = email.includes('@company.') ? 'organisation' : 'professional';
      localStorage.setItem('user_role', role);
      
      if (role === 'professional') {
        router.push('/professional/profile');
      } else {
        router.push('/organisation/search');
      }
      
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-400">Sign in to your BackCheck account</p>
      </div>

      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A1E55] focus:border-transparent transition-all"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A1E55] focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            Don&apos;t have an account?
          </p>
          <div className="flex gap-4 mt-4">
            <Link 
              href="/signup/professional" 
              className="flex-1 py-2 px-4 border border-[#3B1C32] rounded-lg text-[#FF6B9D] hover:bg-[#3B1C32]/20 transition-colors text-center"
            >
              Join as Professional
            </Link>
            <Link 
              href="/signup/organisation" 
              className="flex-1 py-2 px-4 border border-[#3B1C32] rounded-lg text-[#FF6B9D] hover:bg-[#3B1C32]/20 transition-colors text-center"
            >
              Join as Organisation
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-[#6A1E55] hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-[#6A1E55] hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}