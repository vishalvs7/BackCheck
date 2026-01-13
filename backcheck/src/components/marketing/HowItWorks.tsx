import { UserPlus, Hash, Search, ShieldCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <UserPlus className="w-8 h-8" />,
    title: 'Create Profile',
    description: 'Professionals create detailed profiles with education, experience, and documents.',
    color: 'from-[#6A1E55] to-[#3B1C32]'
  },
  {
    number: '02',
    icon: <Hash className="w-8 h-8" />,
    title: 'Get Unique ID',
    description: 'Each profile receives a 10-character UID for easy sharing and access.',
    color: 'from-[#FF6B9D] to-[#6A1E55]'
  },
  {
    number: '03',
    icon: <ShieldCheck className="w-8 h-8" />,
    title: 'Complete Verification',
    description: 'Our team verifies all credentials and documents for authenticity.',
    color: 'from-[#3B1C32] to-[#6A1E55]'
  },
  {
    number: '04',
    icon: <Search className="w-8 h-8" />,
    title: 'Instant Access',
    description: 'Organizations search by UID and get immediate access to verified profiles.',
    color: 'from-[#6A1E55] to-[#FF6B9D]'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How BackCheck Works</h2>
          <p className="text-gray-400 text-lg">Simple, secure, and efficient verification process</p>
        </div>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6A1E55] to-[#FF6B9D] -translate-y-1/2"></div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-[#6A1E55] transition-colors h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white`}>
                      {step.icon}
                    </div>
                    <span className="text-3xl font-bold text-gray-700">{step.number}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}