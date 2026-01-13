// src/app/(dashboard)/employer/search/page.tsx
'use client';

import { useState } from 'react';
import { Search, User, Briefcase, CheckCircle, Clock } from 'lucide-react';

export default function EmployerSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demo
  const mockResults = [
    {
      id: 1,
      talentUID: 'ABC123DEF456',
      name: 'Dr. Sarah Johnson',
      profession: 'Cardiologist',
      verified: true,
      lastVerified: '2024-01-15',
    },
    {
      id: 2,
      talentUID: 'XYZ789GHI012',
      name: 'John Chen',
      profession: 'Software Engineer',
      verified: true,
      lastVerified: '2024-01-10',
    },
    {
      id: 3,
      talentUID: 'JKL345MNO678',
      name: 'Maria Garcia',
      profession: 'Marketing Director',
      verified: false,
      lastVerified: null,
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would call Firebase
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Search Talent</h1>
        <p className="text-secondary-400">Enter a Talent ID or search by name/profession</p>
      </div>

      {/* Search Form */}
      <div className="card">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-300 mb-2">
              Enter Talent ID, Name, or Profession
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
                placeholder="e.g., ABC123DEF456 or 'Cardiologist'"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-secondary-400">
              Free searches remaining: <span className="text-primary-400 font-semibold">3</span>
            </p>
            <button type="submit" className="btn-primary px-8">
              Search Talent
            </button>
          </div>
        </form>
      </div>

      {/* Demo Results */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Demo Results</h2>
        <p className="text-secondary-400 mb-6">
          These are sample profiles to demonstrate the search functionality.
        </p>

        <div className="space-y-4">
          {mockResults.map((talent) => (
            <div key={talent.id} className="p-4 bg-secondary-800 rounded-lg border border-secondary-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <User className="text-primary-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{talent.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-secondary-400">
                        <Briefcase size={16} className="mr-1" />
                        <span>{talent.profession}</span>
                      </div>
                      <div className="flex items-center">
                        {talent.verified ? (
                          <>
                            <CheckCircle size={16} className="text-green-500 mr-1" />
                            <span className="text-green-500 text-sm">Verified</span>
                          </>
                        ) : (
                          <>
                            <Clock size={16} className="text-yellow-500 mr-1" />
                            <span className="text-yellow-500 text-sm">Pending</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="bg-secondary-900 rounded-lg p-3 text-center">
                    <p className="text-sm text-secondary-400">Talent ID</p>
                    <p className="font-mono font-bold">{talent.talentUID}</p>
                  </div>
                  <button className="btn-primary whitespace-nowrap">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Tips */}
      <div className="p-4 bg-secondary-900/50 rounded-lg border border-secondary-800">
        <h3 className="font-bold mb-2 text-primary-400">💡 Search Tips</h3>
        <ul className="text-sm text-secondary-400 space-y-1">
          <li>• Enter the exact 12-character Talent ID for instant results</li>
          <li>• Search by profession to find verified professionals in a field</li>
          <li>• Use partial names if you&apos;re unsure of spelling</li>
          <li>• Free accounts get 3 searches per month</li>
        </ul>
      </div>
    </div>
  );
}