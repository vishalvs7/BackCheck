'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function OrganisationSignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    industry: '',
    employeeCount: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await signIn(formData.email, formData.password);
      localStorage.setItem('user_role', 'organisation');
      localStorage.setItem('organisation_data', JSON.stringify({
        companyName: formData.companyName,
        industry: formData.industry,
        employeeCount: formData.employeeCount,
        phone: formData.phone
      }));
      
      router.push('/organisation/search');
      
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Organisation Account</h1>
        <p className="text-gray-400">Verify professionals instantly with BackCheck</p>
      </div>

      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
                Company Name *
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A1E55] focus:border-transparent transition-all"
                placeholder="Acme Inc."
                required
              />
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
                Industry *
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A1E55] focus:border-transparent transition-all"
                required
              >
                <option value="">Select Industry</option>
                <option value="healthcare">Healthcare</option>
                <option value="technology">Technology</option>
                <option value="education">Education</option>
                <option value="finance">Finance</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Work Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A1E55] focus:border-transparent transition-all"
              placeholder="admin@company.com"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A1E55] focus:border-transparent transition-all"
                placeholder="Create a strong password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A1E55] focus:border-transparent transition-all"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-300 mb-2">
                Company Size
              </label>
              <select
                id="employeeCount"
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A1E55] focus:border-transparent transition-all"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Contact Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A1E55] focus:border-transparent transition-all"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 w-4 h-4 bg-gray-800 border-gray-700 rounded focus:ring-[#6A1E55]"
            />
            <label htmlFor="terms" className="text-sm text-gray-400">
              I agree to the{' '}
              <Link href="/terms" className="text-[#FF6B9D] hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-[#FF6B9D] hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Organisation Account'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/signin" className="text-[#FF6B9D] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 rounded-full bg-[#3B1C32] flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs">💼</span>
          </div>
          <div>
            <p className="text-sm text-gray-400">
              <span className="text-[#FF6B9D] font-semibold">Free plan includes:</span>{' '}
              3 free verifications per month. Upgrade anytime for unlimited access.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Start verifying professionals instantly after registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}