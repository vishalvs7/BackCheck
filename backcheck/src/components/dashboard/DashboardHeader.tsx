// src/components/dashboard/DashboardHeader.tsx
'use client';

import { Bell, Search, Menu } from 'lucide-react';
import { useState } from 'react';
import { AppUser } from '@/types';

interface DashboardHeaderProps {
  user: AppUser;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="sticky top-0 z-40 bg-secondary-950/80 backdrop-blur-md border-b border-secondary-800">
      <div className="px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div>
            <h1 className="text-2xl font-bold">
              {getGreeting()}, {user.displayName?.split(' ')[0] || 'there'}!
            </h1>
            <p className="text-secondary-400 text-sm">
              {user.role === 'talent' 
                ? 'Manage your verified profile' 
                : 'Search and verify talent instantly'}
            </p>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search (for employers only) */}
            {user.role === 'employer' && (
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search talent by ID, name, or profession..."
                  className="pl-10 pr-4 py-2 bg-secondary-900 border border-secondary-700 rounded-lg text-white placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
                />
              </div>
            )}

            {/* Notifications */}
            <button className="relative p-2 text-secondary-400 hover:text-white">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User menu */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="font-medium">{user.displayName || user.email}</p>
                <p className="text-xs text-secondary-400 capitalize">{user.role}</p>
              </div>
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">
                  {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}