import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#3B1C32]/20 to-[#6A1E55]/20" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Transform Background Verification?
        </h2>
        <p className="text-xl text-gray-400 mb-10">
          Join thousands of professionals and organizations who trust BackCheck.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup/professional"
            className="px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors text-lg"
          >
            Start Free as Professional
          </Link>
          <Link
            href="/signup/organisation"
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-lg"
          >
            Start Free Trial as Organisation
          </Link>
        </div>
        <p className="mt-8 text-gray-500 text-sm">
          No credit card required. Free forever for professionals.
        </p>
      </div>
    </section>
  );
}