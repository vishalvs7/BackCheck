import MarketingNavbar from '@/components/marketing/MarketingNavbar';
import MarketingFooter from '@/components/marketing/MarketingFooter';
import HeroSection from '@/components/marketing/HeroSection';
import FeaturesSection from '@/components/marketing/FeaturesSection';
import HowItWorks from '@/components/marketing/HowItWorks';
import CTASection from '@/components/marketing/CTASection';

export default function HomePage() {
  return (
    <>
      <MarketingNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <CTASection />
      </main>
      <MarketingFooter />
    </>
  );
}