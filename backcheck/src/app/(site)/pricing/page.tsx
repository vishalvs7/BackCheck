// src/app/(site)/pricing/page.tsx
import { Check, X } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individual professionals and small teams",
      features: [
        "3 talent verifications/month",
        "Basic talent search",
        "Email support",
        "7-day search history",
        "Single user account"
      ],
      limitations: [
        "No team collaboration",
        "No API access",
        "No custom branding"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "btn-secondary",
      popular: false
    },
    {
      name: "Professional",
      price: "$49",
      period: "per month",
      description: "For growing companies and HR teams",
      features: [
        "50 talent verifications/month",
        "Advanced search filters",
        "Priority email & chat support",
        "30-day search history",
        "Up to 5 team members",
        "Basic reporting",
        "API access"
      ],
      limitations: [
        "No dedicated account manager",
        "Limited custom workflows"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "btn-primary",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "annual",
      description: "For large organizations with complex needs",
      features: [
        "Unlimited verifications",
        "AI-powered talent matching",
        "24/7 phone support",
        "Unlimited search history",
        "Unlimited team members",
        "Advanced analytics",
        "Full API access",
        "Custom workflows",
        "Dedicated account manager",
        "SOC 2 compliance reports",
        "Custom integrations"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonVariant: "btn-secondary",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400">
            Choose the plan that fits your needs. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`card relative ${plan.popular ? 'border-primary-500 ring-2 ring-primary-500/20' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold mb-4">Includes:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limit, idx) => (
                    <li key={idx} className="flex items-start text-gray-500">
                      <X className="w-5 h-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{limit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                href={plan.name === "Enterprise" ? "/contact" : "/register/employer"}
                className={`w-full ${plan.buttonVariant} py-3 block text-center`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="card max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">For Verified Professionals</h3>
            <p className="text-gray-400 mb-6">
              Talent profiles are always free. Create your profile once and share it with any employer.
            </p>
            <Link href="/register/talent" className="btn-primary inline-block px-8 py-3">
              Create Free Talent Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}