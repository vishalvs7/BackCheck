import { Shield, Users, Zap, Lock, Globe, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Verified Credentials',
    description: 'Every profile undergoes thorough verification of education, experience, and documents.',
    color: 'from-[#6A1E55] to-[#3B1C32]'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Professional Network',
    description: 'Connect with verified professionals across industries and regions.',
    color: 'from-[#FF6B9D] to-[#6A1E55]'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Instant Access',
    description: 'Organizations get immediate access to verified profiles with a simple UID.',
    color: 'from-[#3B1C32] to-[#6A1E55]'
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Secure & Private',
    description: 'Military-grade encryption and complete control over data sharing.',
    color: 'from-[#6A1E55] to-[#FF6B9D]'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Global Reach',
    description: 'Verify professionals from anywhere in the world with standardized checks.',
    color: 'from-[#FF6B9D] to-[#3B1C32]'
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Cost Effective',
    description: 'Save up to 80% compared to traditional background verification services.',
    color: 'from-[#3B1C32] to-[#FF6B9D]'
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose BackCheck</h2>
          <p className="text-gray-400 text-lg">The complete solution for professional verification</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 hover:border-[#6A1E55] transition-colors group"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
