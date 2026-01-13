'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function ProfessionalSignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    profession: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedUID, setGeneratedUID] = useState<string>('');
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
      // Sign in (simulate signup)
      await signIn(formData.email, formData.password);
      localStorage.setItem('user_role', 'professional');
      
      // Generate 12-character UID
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let uid = '';
      for (let i = 0; i < 12; i++) {
        uid += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setGeneratedUID(uid);
      
      // Save UID to localStorage (in real app, save to Firestore)
      localStorage.setItem('professional_uid', uid);
      localStorage.setItem('professional_data', JSON.stringify({
        fullName: formData.fullName,
        profession: formData.profession,
        phone: formData.phone,
        email: formData.email
      }));
      
      setStep(3); // Show success step
      
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= num
                  ? 'bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {num}
            </div>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-2">Create Professional Account</h1>
        <p className="text-gray-400">Build your verified professional profile</p>
      </div>

      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        {step === 3 ? (
          // Success Step
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-green-500">✓</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Account Created Successfully!</h2>
            <p className="text-gray-400 mb-6">
              Your professional profile has been created.
            </p>
            
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <p className="text-gray-400 mb-2">Your Unique Professional ID:</p>
              <div className="text-3xl font-bold font-mono bg-gradient-to-r from-[#FF6B9D] to-[#6A1E55] bg-clip-text text-transparent">
                {generatedUID}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Share this 12-character ID with organizations to access your verified profile
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => router.push('/professional/profile')}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Complete Your Profile
              </button>
              <Link
                href="/"
                className="block w-full py-3 px-4 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          // Form Steps
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A1E55] focus:border-transparent transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>

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
                    placeholder="Create a strong password (min. 6 characters)"
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

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Continue
                </button>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A1E55] focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="profession" className="block text-sm font-medium text-gray-300 mb-2">
                    Profession *
                  </label>
                  <select
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A1E55] focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select your profession</option>
                    <option value="doctor">Doctor</option>
                    <option value="trainer">Fitness Trainer</option>
                    <option value="teacher">Teacher</option>
                    <option value="engineer">Engineer</option>
                    <option value="designer">Designer</option>
                    <option value="developer">Developer</option>
                    <option value="consultant">Consultant</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number (Optional)
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

                {error && (
                  <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 px-4 border border-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </>
            )}
          </form>
        )}

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
            <span className="text-xs">✓</span>
          </div>
          <p className="text-sm text-gray-400">
            Your profile will be assigned a <span className="text-[#FF6B9D] font-semibold">unique 12-character UID</span> that organizations can use to instantly verify your credentials.
          </p>
        </div>
      </div>
    </div>
  );
}