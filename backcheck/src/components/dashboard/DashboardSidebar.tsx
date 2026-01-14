// src/components/dashboard/DashboardSidebar.tsx - COMPLETE VERSION
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Search, 
  History, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Briefcase,
  Bell,
  Shield
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { AppUser } from '@/types';

interface DashboardSidebarProps {
  user: AppUser;
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  const isTalent = user.role === 'talent';
  const talentUID = isTalent ? (user as any).talentUID : '';

  // Talent navigation items
  const talentNavItems = [
    { href: '/talent/profile', label: 'Profile', icon: User },
    { href: '/talent/documents', label: 'Documents', icon: FileText },
    { href: '/talent/verification', label: 'Verification', icon: Shield },
    { href: '/talent/settings', label: 'Settings', icon: Settings },
  ];

  // Employer navigation items
  const employerNavItems = [
    { href: '/employer/search', label: 'Search Talent', icon: Search },
    { href: '/employer/history', label: 'History', icon: History },
    { href: '/employer/settings', label: 'Settings', icon: Settings },
  ];

  const navItems = isTalent ? talentNavItems : employerNavItems;

  // Role-based redirect protection
  const checkRoleAccess = (href: string) => {
    if (isTalent && !href.startsWith('/talent')) {
      router.push('/talent/profile');
      return false;
    }
    if (!isTalent && !href.startsWith('/employer')) {
      router.push('/employer/search');
      return false;
    }
    return true;
  };

  const handleNavigation = (href: string) => {
    if (!checkRoleAccess(href)) {
      return;
    }
    router.push(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity ${
          collapsed ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setCollapsed(false)}
      />

      {/* Sidebar */}
      <aside className={`
        fixed md:relative top-0 left-0 h-screen bg-[#0A0A0F] border-r border-[#1E293B] 
        z-50 transition-all duration-300
        ${collapsed ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-64'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-[#1E293B]">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">BC</span>
              </div>
              <span className="text-xl font-bold text-white">BackCheck</span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-[#1E293B]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-sm">
                  {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.displayName || user.email}</p>
                <p className="text-xs text-gray-400 capitalize">
                  {isTalent ? 'Verified Talent' : 'Employer'}
                </p>
                {isTalent && talentUID && (
                  <p className="text-xs text-primary-400 font-mono truncate" title={talentUID}>
                    ID: {talentUID}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                        ${isActive 
                          ? 'bg-primary-500/10 text-primary-400 border-l-2 border-primary-500' 
                          : 'text-gray-400 hover:text-white hover:bg-[#1E293B]'
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span className="text-left">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Quick Stats for Employers */}
            {!isTalent && (
              <div className="mt-8 p-4 bg-[#0F172A] rounded-lg border border-[#334155]">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Search Credits</h4>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Remaining</span>
                  <span className="text-primary-400 font-bold">3</span>
                </div>
                <div className="w-full bg-[#1E293B] rounded-full h-1.5">
                  <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Renews in 15 days</p>
              </div>
            )}

            {/* Verification Status for Talent */}
            {isTalent && (
              <div className="mt-8 p-4 bg-[#0F172A] rounded-lg border border-[#334155]">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Verification Status</h4>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Progress</span>
                  <span className="text-primary-400 font-bold">40%</span>
                </div>
                <div className="w-full bg-[#1E293B] rounded-full h-1.5">
                  <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Complete profile to get verified</p>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#1E293B] space-y-2">
            <button
              onClick={() => router.push(isTalent ? '/talent/settings' : '/employer/settings')}
              className="flex items-center space-x-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors"
            >
              <Settings size={20} />
              <span>Account Settings</span>
            </button>
            
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-[#1E293B] rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Toggle button (mobile) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="md:hidden absolute -right-3 top-6 bg-[#1E293B] border border-[#334155] rounded-full p-1.5 z-50"
        >
          {collapsed ? (
            <ChevronLeft size={16} className="text-gray-300" />
          ) : (
            <ChevronRight size={16} className="text-gray-300" />
          )}
        </button>
      </aside>
    </>
  );
}