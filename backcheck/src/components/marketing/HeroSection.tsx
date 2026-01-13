import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40">
      <div className="absolute inset-0 bg-gradient-to-b from-[#3B1C32]/20 to-black" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 rounded-full bg-[#3B1C32]/30 border border-[#6A1E55] text-[#FF6B9D] text-sm font-medium mb-8">
            Stop Duplicate Background Checks
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            One Verification.
            <br />
            <span className="bg-gradient-to-r from-[#6A1E55] via-[#FF6B9D] to-[#6A1E55] bg-clip-text text-transparent">
              Lifetime Access.
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            BackCheck creates verified professional profiles that organizations can access instantly.
            Save 80% on background verification costs with our trusted platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup/professional"
              className="px-8 py-4 bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-lg"
            >
              Create Free Profile
            </Link>
            <Link
              href="/signup/organisation"
              className="px-8 py-4 border-2 border-[#6A1E55] text-white font-semibold rounded-xl hover:bg-[#6A1E55]/10 transition-colors text-lg"
            >
              Get Verified Access
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Free forever for professionals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}