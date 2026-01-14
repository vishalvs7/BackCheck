// src/app/(site)/about/page.tsx
import { Target, Users, Globe, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To eliminate repetitive background checks and create a universal trust system for professionals worldwide."
    },
    {
      icon: Users,
      title: "Our Team",
      description: "Founded by HR professionals and technologists who experienced the pain of traditional verification processes."
    },
    {
      icon: Globe,
      title: "Global Vision",
      description: "Building a borderless verification system that works across industries and countries."
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "Trust, transparency, and efficiency guide everything we do at BackCheck."
    }
  ];

  const stats = [
    { value: "10,000+", label: "Verified Professionals" },
    { value: "500+", label: "Trusted Companies" },
    { value: "47s", label: "Average Verification Time" },
    { value: "98%", label: "Customer Satisfaction" }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About BackCheck</h1>
            <p className="text-xl text-gray-400">
              We're on a mission to transform how professionals and employers establish trust
            </p>
          </div>

          <div className="card mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                BackCheck was founded in 2023 by a team of HR professionals, recruiters, and technologists 
                who were frustrated with the inefficiency of traditional background verification processes.
              </p>
              <p>
                We watched talented professionals spend weeks repeating the same verification steps for 
                different employers, while companies wasted resources on redundant checks. There had to be 
                a better way.
              </p>
              <p>
                That's when we conceived BackCheck: a digital identity platform where professionals 
                verify once and employers trust instantly. Our vision is to create a universal trust 
                system that eliminates repetitive verification and accelerates hiring.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="card">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card text-center">
            <h2 className="text-2xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Whether you're a professional looking to streamline your career or an employer 
              seeking efficient verification, we're building BackCheck for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register/talent" className="btn-primary px-8">
                Join as Talent
              </Link>
              <Link href="/register/employer" className="btn-secondary px-8">
                Join as Employer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}