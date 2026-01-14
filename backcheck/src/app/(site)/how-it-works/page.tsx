// src/app/(site)/how-it-works/page.tsx
import { UserPlus, Upload, ShieldCheck, Share2, Search, FileCheck } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const steps = [
    {
      step: "1",
      icon: UserPlus,
      title: "Create Your Profile",
      description: "Sign up as a professional and provide basic information about your background and expertise.",
      details: ["Choose your profession", "Add contact information", "Get your unique Talent ID"]
    },
    {
      step: "2",
      icon: Upload,
      title: "Upload Documents",
      description: "Submit your credentials, certificates, licenses, and experience letters for verification.",
      details: ["Educational certificates", "Professional licenses", "Employment history", "Reference letters"]
    },
    {
      step: "3",
      icon: ShieldCheck,
      title: "Get Verified",
      description: "Our team verifies your documents against official sources and industry standards.",
      details: ["3-5 business day process", "Multi-point verification", "Industry-standard checks", "Quality assurance"]
    },
    {
      step: "4",
      icon: Share2,
      title: "Share Your ID",
      description: "Once verified, share your 12-character Talent ID with employers or add it to your resume.",
      details: ["Share via link or ID", "Add to email signature", "Include in job applications", "Share on LinkedIn"]
    },
    {
      step: "5",
      icon: Search,
      title: "Employers Search",
      description: "Employers enter your Talent ID to instantly access your verified credentials.",
      details: ["Instant profile access", "No repetitive checks", "Real-time verification", "Secure sharing"]
    },
    {
      step: "6",
      icon: FileCheck,
      title: "Hire with Confidence",
      description: "Employers make faster hiring decisions with complete trust in verified credentials.",
      details: ["Reduced hiring time", "Lower verification costs", "Improved candidate quality", "Compliance assured"]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How BackCheck Works</h1>
          <p className="text-xl text-gray-400">
            A simple, secure process that benefits both professionals and employers
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary-500 to-primary-300 hidden md:block"></div>
            
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12'} mb-8 md:mb-0`}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-500/20 border border-primary-500/30 mb-4">
                    <step.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="inline-block px-4 py-1 rounded-full bg-[#0F172A] border border-[#334155] text-sm font-medium mb-4">
                    Step {step.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="text-gray-300 text-sm">{detail}</li>
                    ))}
                  </ul>
                </div>

                {/* Step number on timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-black border-4 border-primary-500 flex items-center justify-center z-10">
                    <span className="font-bold text-white">{step.step}</span>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card">
              <h3 className="text-xl font-bold mb-4">For Professionals</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <span className="text-green-400 text-sm">✓</span>
                  </div>
                  <span>Stop repeating background checks</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <span className="text-green-400 text-sm">✓</span>
                  </div>
                  <span>Get hired faster with verified credentials</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <span className="text-green-400 text-sm">✓</span>
                  </div>
                  <span>Build trust with potential employers</span>
                </li>
              </ul>
              <Link href="/register/talent" className="btn-primary w-full">
                Join as Talent
              </Link>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4">For Employers</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <span className="text-blue-400 text-sm">✓</span>
                  </div>
                  <span>Reduce hiring time from weeks to seconds</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <span className="text-blue-400 text-sm">✓</span>
                  </div>
                  <span>Lower verification costs by 70%</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <span className="text-blue-400 text-sm">✓</span>
                  </div>
                  <span>Ensure compliance with verified candidates</span>
                </li>
              </ul>
              <Link href="/register/employer" className="btn-secondary w-full">
                Join as Employer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}