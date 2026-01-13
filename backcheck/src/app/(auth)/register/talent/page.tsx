// src/app/(auth)/register/talent/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthProvider';
import { ArrowLeft, Check, Eye, EyeOff, User, Briefcase, Phone, Mail, Lock } from 'lucide-react';

export default function TalentRegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    profession: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedUID, setGeneratedUID] = useState('');
  const router = useRouter();
  const { user, signUpTalent, loading: authLoading } = useAuth();

  // Redirect if already logged in
  if (user && !authLoading) {
    router.push('/dashboard/talent/profile');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
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
      await signUpTalent(formData.email, formData.password, {
        fullName: formData.fullName,
        profession: formData.profession,
        phone: formData.phone || undefined
      });
      
      // Generate UID for display (actual UID is generated in signUpTalent)
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let uid = '';
      for (let i = 0; i < 12; i++) {
        uid += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setGeneratedUID(uid);
      setStep(3);
      
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
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
          
          {/* Progress Steps */}
          <div className="flex justify-center space-x-4 mb-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= num 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-secondary-800 text-secondary-400'
                }`}>
                  {step > num ? <Check size={16} /> : num}
                </div>
                {num < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    step > num ? 'bg-primary-500' : 'bg-secondary-800'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <h1 className="text-3xl font-bold">Join as Talent</h1>
          <p className="text-secondary-400 mt-2">Build your verified professional profile</p>
        </div>

        <div className="card">
          {step === 3 ? (
            // Success Step
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                <Check className="text-green-500" size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Welcome to BackCheck!</h2>
              <p className="text-secondary-400 mb-6">
                Your talent profile has been created successfully.
              </p>
              
              <div className="bg-secondary-800 rounded-lg p-6 mb-6">
                <p className="text-secondary-300 mb-2">Your Unique Talent ID:</p>
                <div className="text-2xl font-bold font-mono bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  {generatedUID}
                </div>
                <p className="text-sm text-secondary-400 mt-2">
                  Share this 12-character ID with employers to access your verified profile
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/dashboard/talent/profile')}
                  className="w-full btn-primary py-3"
                >
                  Complete Your Profile
                </button>
                <Link
                  href="/"
                  className="block w-full py-3 border border-secondary-700 text-secondary-300 rounded-lg hover:bg-secondary-800 transition-colors"
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
                    <label className="block text-sm font-medium text-secondary-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" size={20} />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field pl-10"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" size={20} />
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className="input-field pl-10 pr-10"
                        placeholder="Create a strong password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-500 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" size={20} />
                      <input
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="input-field pl-10"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full btn-primary py-3"
                  >
                    Continue
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center text-secondary-400 hover:text-white mb-4"
                  >
                    <ArrowLeft size={20} className="mr-2" />
                    Back
                  </button>

                  <div>
                    <label className="block text-sm font-medium text-secondary-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" size={20} />
                      <input
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="input-field pl-10"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-300 mb-2">
                      Profession
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" size={20} />
                      <select
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        className="input-field pl-10 appearance-none"
                        required
                      >
                        <option value="">Select your profession</option>
                        <option value="doctor">Doctor</option>
                        <option value="engineer">Engineer</option>
                        <option value="teacher">Teacher</option>
                        <option value="designer">Designer</option>
                        <option value="developer">Developer</option>
                        <option value="consultant">Consultant</option>
                        <option value="trainer">Fitness Trainer</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-300 mb-2">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" size={20} />
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field pl-10"
                        placeholder="+1 (555) 123-4567"
                      />
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
                    className="w-full btn-primary py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating Account...' : 'Create Talent Account'}
                  </button>
                </>
              )}
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-secondary-800">
            <p className="text-center text-secondary-400 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-400 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-secondary-900/50 rounded-lg border border-secondary-800">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="text-primary-500" size={14} />
            </div>
            <p className="text-sm text-secondary-400">
              Your profile will be assigned a <span className="text-primary-400 font-semibold">unique 12-character Talent ID</span> that employers can use to instantly verify your credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}