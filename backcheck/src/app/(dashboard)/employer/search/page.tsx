// src/app/(dashboard)/employer/search/page.tsx - UPDATED
'use client';

import { useState, useEffect } from 'react';
import { Search, User, Briefcase, CheckCircle, Clock, AlertCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { SearchService } from '@/lib/services/search.service';
import { TalentUser } from '@/types';

export default function EmployerSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'uid' | 'profession' | 'name'>('uid');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TalentUser[]>([]);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'employer') {
      loadSearchHistory();
    }
  }, [user]);

  const loadSearchHistory = async () => {
    try {
      const history = await SearchService.getSearchHistory(user!.uid);
      setSearchHistory(history);
    } catch (err) {
      console.error('Failed to load search history:', err);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setResults([]);

    try {
      let searchResults: TalentUser[] = [];

      switch (searchType) {
        case 'uid':
          const talent = await SearchService.searchByUID(searchQuery.toUpperCase());
          if (talent) {
            searchResults = [talent];
            // Record the search
            await SearchService.createVerificationRecord(
              user!.uid,
              talent.uid,
              talent.talentUID
            );
            await loadSearchHistory(); // Refresh history
          } else {
            setError('No talent found with this ID');
          }
          break;

        case 'profession':
          searchResults = await SearchService.searchByProfession(searchQuery);
          break;

        case 'name':
          searchResults = await SearchService.searchByName(searchQuery);
          break;
      }

      setResults(searchResults);
    } catch (err: any) {
      setError(err.message || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSearch = async (talentUID: string) => {
    setSearchQuery(talentUID);
    setSearchType('uid');
    // Trigger search after a delay
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSearch(fakeEvent);
    }, 100);
  };

  // Mock data for demo (remove in production)
  const demoUIDs = ['ABC123DEF456', 'XYZ789GHI012', 'JKL345MNO678'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Search Talent</h1>
        <p className="text-gray-400">
          Enter a Talent ID or search by profession/name
          {user?.role === 'employer' && (
            <span className="ml-2 text-primary-400">
              • {3 - searchHistory.length} searches remaining
            </span>
          )}
        </p>
      </div>

      {/* Search Form */}
      <div className="card">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Query
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10"
                  placeholder={
                    searchType === 'uid' 
                      ? 'Enter 12-character Talent ID (e.g., ABC123DEF456)'
                      : searchType === 'profession'
                      ? 'Enter profession (e.g., Doctor, Engineer)'
                      : 'Enter talent name'
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Type
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as any)}
                className="input-field"
              >
                <option value="uid">Talent ID</option>
                <option value="profession">Profession</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-sm flex items-center">
              <AlertCircle className="mr-2" size={16} />
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              {searchType === 'uid' && 'Enter exact 12-character Talent ID'}
              {searchType === 'profession' && 'Search all verified professionals in this field'}
              {searchType === 'name' && 'Search by full or partial name'}
            </div>
            <button 
              type="submit" 
              disabled={loading || !searchQuery.trim()}
              className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Searching...
                </span>
              ) : (
                'Search Talent'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Quick Search Demo IDs */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Search className="mr-2" size={20} />
          Try Demo Talent IDs
        </h3>
        <p className="text-gray-400 mb-4 text-sm">
          These are sample IDs for testing the search functionality.
        </p>
        <div className="flex flex-wrap gap-2">
          {demoUIDs.map((uid) => (
            <button
              key={uid}
              onClick={() => handleQuickSearch(uid)}
              className="px-4 py-2 bg-[#0F172A] border border-[#334155] rounded-lg hover:bg-[#1E293B] transition-colors text-sm font-mono"
            >
              {uid}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Search Results</h2>
            <span className="text-sm text-gray-400">{results.length} found</span>
          </div>

          <div className="space-y-4">
            {results.map((talent) => (
              <div key={talent.uid} className="p-4 bg-[#0F172A] rounded-lg border border-[#334155]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <User className="text-primary-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{talent.fullName}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-gray-400">
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
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">Talent ID:</span>
                        <span className="ml-2 font-mono text-primary-400">{talent.talentUID}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button 
                      className="btn-secondary px-4 py-2 text-sm"
                      onClick={() => {
                        // Navigate to talent profile view
                        window.open(`/talent/view/${talent.talentUID}`, '_blank');
                      }}
                    >
                      <ExternalLink size={16} className="mr-1 inline" />
                      View Profile
                    </button>
                    <button className="btn-primary px-4 py-2 text-sm">
                      Request Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Recent Searches</h2>
          <div className="space-y-3">
            {searchHistory.slice(0, 5).map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 bg-[#0F172A] rounded-lg">
                <div>
                  <div className="font-medium">Talent ID: {record.talentUID}</div>
                  <div className="text-sm text-gray-400">
                    Searched {new Date(record.searchedAt).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={() => handleQuickSearch(record.talentUID)}
                  className="text-primary-400 hover:text-primary-300 text-sm"
                >
                  Search Again
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}