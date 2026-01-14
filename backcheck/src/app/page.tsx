// src/app/(site)/page.tsx
import Link from 'next/link';
import SiteNavbar from '@/components/site/SiteNavbar';
import SiteFooter from '@/components/site/SiteFooter';
import { CheckCircle, Search, Shield, Zap, ArrowRight, Users, Building2, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteNavbar />
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-black via-[#0A0A0F] to-[#0F172A]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column */}
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#0F172A] border border-[#334155] mb-6">
                  <Star className="w-4 h-4 text-[#60A5FA] mr-2" />
                  <span className="text-sm text-gray-300">Trusted by 500+ professionals</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  One-Time Verification,
                  <span className="block text-gradient mt-2">Lifetime Trust</span>
                </h1>
                
                <p className="text-xl text-gray-400 mb-10 max-w-xl">
                  BackCheck is the digital identity platform for professionals. 
                  Get verified once, share your credentials instantly with any employer.
                  No more repetitive background checks.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/register/talent" 
                    className="btn-primary px-8 py-4 text-lg inline-flex items-center justify-center group"
                  >
                    Get Your Talent ID
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href="/register/employer" 
                    className="btn-secondary px-8 py-4 text-lg"
                  >
                    Verify Talent Instantly
                  </Link>
                </div>
                
                <div className="mt-8 flex items-center space-x-4">
                  <Link 
                    href="/login" 
                    className="text-[#60A5FA] hover:text-[#3B82F6] transition-colors flex items-center"
                  >
                    Already have an account? 
                    <span className="ml-2 font-medium">Sign In →</span>
                  </Link>
                  <span className="text-gray-600">|</span>
                  <Link 
                    href="/how-it-works" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    See how it works
                  </Link>
                </div>
              </div>

              {/* Right Column - Graphic/Stats */}
              <div className="bg-[#0A0A0F]/50 backdrop-blur-sm border border-[#1E293B] rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-[#0F172A] rounded-xl p-6 border border-[#334155]">
                    <div className="w-12 h-12 bg-[#1E293B] rounded-lg flex items-center justify-center mb-4">
                      <Users className="text-[#60A5FA]" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold">10,000+</h3>
                    <p className="text-gray-400">Verified Professionals</p>
                  </div>
                  
                  <div className="bg-[#0F172A] rounded-xl p-6 border border-[#334155]">
                    <div className="w-12 h-12 bg-[#1E293B] rounded-lg flex items-center justify-center mb-4">
                      <Building2 className="text-[#60A5FA]" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold">500+</h3>
                    <p className="text-gray-400">Trusted Employers</p>
                  </div>
                  
                  <div className="bg-[#0F172A] rounded-xl p-6 border border-[#334155] col-span-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">Average Verification Time</h3>
                        <p className="text-gray-400">From weeks to seconds</p>
                      </div>
                      <div className="text-3xl font-bold text-[#60A5FA]">47s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#0A0A0F]">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How BackCheck Works</h2>
            <p className="text-xl text-gray-400">
              Simple three-step process for professionals and employers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "1. Get Verified",
                description: "Professionals upload credentials once. We verify them thoroughly with industry standards.",
                color: "text-blue-400",
                bg: "bg-blue-400/10"
              },
              {
                icon: Zap,
                title: "2. Get Your ID",
                description: "Receive a unique 12-character Talent ID that represents your verified profile.",
                color: "text-purple-400",
                bg: "bg-purple-400/10"
              },
              {
                icon: Search,
                title: "3. Share & Verify",
                description: "Employers enter your Talent ID to instantly view verified credentials.",
                color: "text-green-400",
                bg: "bg-green-400/10"
              }
            ].map((step, index) => (
              <div key={index} className="card hover-lift group">
                <div className={`w-16 h-16 ${step.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-black to-[#0F172A]" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-[#0F172A] border border-[#334155] mb-8">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-gray-300">No credit card required to start</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Professional Life?
            </h2>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join thousands of professionals and employers who have eliminated 
              repetitive background checks with BackCheck.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register/talent" 
                className="btn-primary px-8 py-4 text-lg"
              >
                Start as Talent
              </Link>
              <Link 
                href="/register/employer" 
                className="btn-secondary px-8 py-4 text-lg"
              >
                Start as Employer
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Healthcare', 'Technology', 'Education', 'Finance'].map((industry) => (
                <div key={industry} className="text-center">
                  <div className="text-2xl font-bold text-[#60A5FA]">100+</div>
                  <div className="text-gray-400 text-sm">{industry} Companies</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="border-t border-[#1E293B] py-8">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/features" className="nav-link">
              Features
            </Link>
            <Link href="/pricing" className="nav-link">
              Pricing
            </Link>
            <Link href="/how-it-works" className="nav-link">
              How It Works
            </Link>
            <Link href="/about" className="nav-link">
              About Us
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
            <Link href="/login" className="text-[#60A5FA] hover:text-[#3B82F6] font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}