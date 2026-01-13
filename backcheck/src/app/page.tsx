// src/app/(site)/page.tsx
import Link from 'next/link';
import { CheckCircle, Search, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-black to-black" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              One-Time Verification,{' '}
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Lifetime Trust
              </span>
            </h1>
            <p className="text-xl text-secondary-300 mb-10 max-w-2xl mx-auto">
              BackCheck is the digital identity platform for professionals. Get verified once, 
              share your credentials instantly with any employer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register/talent" className="btn-primary px-8 py-3 text-lg">
                Get Your Talent ID
              </Link>
              <Link href="/register/employer" className="btn-secondary px-8 py-3 text-lg">
                Verify Talent Instantly
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary-900/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How BackCheck Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Get Verified</h3>
              <p className="text-secondary-300">
                Professionals upload credentials once. We verify them thoroughly.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Get Your ID</h3>
              <p className="text-secondary-300">
                Receive a unique 12-character Talent ID that represents your verified profile.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Share & Verify</h3>
              <p className="text-secondary-300">
                Employers enter your Talent ID to instantly view verified credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Hiring?</h2>
            <p className="text-xl text-secondary-300 mb-10">
              Join thousands of professionals and employers who trust BackCheck.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register/talent" className="btn-primary px-8 py-3 text-lg">
                Start as Talent
              </Link>
              <Link href="/register/employer" className="btn-secondary px-8 py-3 text-lg">
                Start as Employer
              </Link>
            </div>
            
            <p className="mt-8 text-secondary-400">
              <CheckCircle className="inline-block mr-2" size={18} />
              No credit card required to start
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}