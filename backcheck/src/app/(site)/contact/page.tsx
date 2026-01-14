// src/app/(site)/contact/page.tsx
'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, User, Building } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', company: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["support@backcheck.com", "sales@backcheck.com"],
      description: "We respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Mon-Fri, 9am-6pm EST"
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Tech Street", "San Francisco, CA 94107"],
      description: "Visit us by appointment"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-400">
              Have questions? We're here to help you with verification, onboarding, or anything else.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="card text-center">
                <div className="w-14 h-14 bg-primary-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <info.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">{info.title}</h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-300">{detail}</p>
                  ))}
                </div>
                <p className="text-sm text-gray-500">{info.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User className="inline w-4 h-4 mr-1" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="input-field"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="input-field"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Building className="inline w-4 h-4 mr-1" />
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="input-field"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MessageSquare className="inline w-4 h-4 mr-1" />
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="input-field"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="feedback">Product Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="input-field min-h-[150px] resize-y"
                    placeholder="Tell us how we can help..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 flex items-center justify-center"
                  disabled={submitted}
                >
                  <Send className="w-5 h-5 mr-2" />
                  {submitted ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>

            <div>
              <div className="card">
                <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {[
                    {
                      q: "How long does verification take?",
                      a: "Standard verification takes 3-5 business days. Express verification (24 hours) is available for enterprise customers."
                    },
                    {
                      q: "Is my data secure?",
                      a: "Yes. We use enterprise-grade encryption, SOC 2 compliance, and never share your data without permission."
                    },
                    {
                      q: "Can I update my documents?",
                      a: "Yes, you can upload new documents anytime. Your verification status will update accordingly."
                    },
                    {
                      q: "Do you offer team accounts?",
                      a: "Yes. Professional and Enterprise plans include multiple user seats with role-based permissions."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                      <h4 className="font-semibold mb-2 text-gray-200">{faq.q}</h4>
                      <p className="text-gray-400 text-sm">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card mt-6">
                <h3 className="text-xl font-bold mb-4">Need immediate help?</h3>
                <p className="text-gray-400 mb-4">
                  Check our documentation or join our community for faster responses.
                </p>
                <div className="space-y-3">
                  <a href="#" className="block text-primary-400 hover:text-primary-300 transition-colors">
                    ↗ Documentation & Guides
                  </a>
                  <a href="#" className="block text-primary-400 hover:text-primary-300 transition-colors">
                    ↗ Community Forum
                  </a>
                  <a href="#" className="block text-primary-400 hover:text-primary-300 transition-colors">
                    ↗ Status Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}