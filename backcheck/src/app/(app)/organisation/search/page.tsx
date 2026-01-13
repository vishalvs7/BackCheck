'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Hash, Users, Shield } from 'lucide-react';

export default function OrganisationSearchPage() {
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!uid.trim()) {
      setError('Please enter a Professional ID');
      return;
    }
    
    if (uid.length !== 12) {
      setError('Professional ID must be 12 characters');
      return;
    }
    
    setLoading(true);
    
    // Navigate to the professional profile page
    setTimeout(() => {
      setLoading(false);
      router.push(`/organisation/search/${uid.toUpperCase()}`);
    }, 1000);
  };

  const exampleUIDs = ['BC1234567890', 'BC0987654321', 'BC1122334455'];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Verify Professional Credentials</h1>
        <p className="text-gray-400">
          Enter a 12-character Professional ID to access verified profile information
        </p>
      </div>

      {/* Search Card */}
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 mb-10">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6A1E55] to-[#3B1C32] flex items-center justify-center mr-4">
            <Search size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Professional ID Search</h2>
            <p className="text-gray-400">Instant access to verified profiles</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          <div>
            <label htmlFor="uid" className="block text-sm font-medium text-gray-300 mb-3">
              Enter Professional ID
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Hash size={20} />
              </div>
              <input
                id="uid"
                type="text"
                value={uid}
                onChange={(e) => setUid(e.target.value.toUpperCase())}
                placeholder="BC1234567890"
                className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A1E55] text-lg font-mono"
                maxLength={12}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                {uid.length}/12
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Professional IDs are 12 characters, starting with "BC" followed by 10 alphanumeric characters
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-900/30 border border-red-800 rounded-xl text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Searching...
              </>
            ) : (
              <>
                <Search size={20} className="mr-3" />
                Verify Professional
              </>
            )}
          </button>
        </form>

        {/* Example IDs */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 mb-4">Try these example Professional IDs:</p>
          <div className="flex flex-wrap gap-3">
            {exampleUIDs.map((example) => (
              <button
                key={example}
                onClick={() => {
                  setUid(example);
                  handleSearch(new Event('submit') as any);
                }}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors font-mono"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="w-12 h-12 rounded-lg bg-[#3B1C32] flex items-center justify-center mb-4">
            <Hash size={24} className="text-[#FF6B9D]" />
          </div>
          <h3 className="text-lg font-bold mb-2">Get Professional ID</h3>
          <p className="text-gray-400 text-sm">
            Professionals share their unique 12-character ID with your organization
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="w-12 h-12 rounded-lg bg-[#3B1C32] flex items-center justify-center mb-4">
            <Search size={24} className="text-[#FF6B9D]" />
          </div>
          <h3 className="text-lg font-bold mb-2">Enter ID & Search</h3>
          <p className="text-gray-400 text-sm">
            Enter the Professional ID in the search box above
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="w-12 h-12 rounded-lg bg-[#3B1C32] flex items-center justify-center mb-4">
            <Shield size={24} className="text-[#FF6B9D]" />
          </div>
          <h3 className="text-lg font-bold mb-2">Access Verified Profile</h3>
          <p className="text-gray-400 text-sm">
            Instantly view verified credentials, work history, and documents
          </p>
        </div>
      </div>
    </div>
  );
}