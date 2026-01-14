// src/app/(site)/features/page.tsx
import { Check, Shield, Zap, Search, Lock, Users, FileText, Clock } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: Shield,
      title: "One-Time Verification",
      description: "Professionals verify credentials once. Employers access verified profiles instantly.",
      benefits: ["Eliminate repetitive checks", "Save weeks of verification time", "Reduce hiring costs by 70%"]
    },
    {
      icon: Zap,
      title: "Instant Talent ID",
      description: "12-character unique identifier for each verified professional.",
      benefits: ["Share ID instead of documents", "Real-time verification", "Portable across organizations"]
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Employers find verified professionals by ID, name, or profession.",
      benefits: ["Filter by verification status", "Save search history", "Export verification reports"]
    },
    {
      icon: Lock,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with SOC 2 compliance.",
      benefits: ["End-to-end encryption", "GDPR compliant", "Regular security audits"]
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Different dashboards for talent, employers, and admins.",
      benefits: ["Customized workflows", "Team collaboration", "Audit trails"]
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Secure storage for certificates, licenses, and experience letters.",
      benefits: ["Auto-expiry alerts", "Version control", "Digital signatures"]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features for Modern Hiring</h1>
          <p className="text-xl text-gray-400">
            Everything you need to streamline verification and build trust
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card hover-lift">
              <div className="w-14 h-14 bg-primary-500/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-[#0F172A] border border-[#334155] mb-8">
            <Clock className="w-5 h-5 text-primary-400 mr-2" />
            <span className="text-gray-300">Average verification time reduced from 3 weeks to 47 seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}