// src/components/dashboard/DashboardSidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Search, 
  History, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { AppUser } from '@/types';

interface DashboardSidebarProps {
  user: AppUser;
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { signOut } = useAuth();

  const isTalent = user.role === 'talent';
  const talentUID = isTalent ? (user as any).talentUID : '';

  // Talent navigation items
  const talentNavItems = [
    { href: '/dashboard/talent/profile', label: 'Profile', icon: User },
    { href: '/dashboard/talent/documents', label: 'Documents', icon: FileText },
    { href: '/dashboard/talent/verification', label: 'Verification', icon: LayoutDashboard },
    { href: '/dashboard/talent/settings', label: 'Settings', icon: Settings },
  ];

  // Employer navigation items
  const employerNavItems = [
    { href: '/dashboard/employer/search', label: 'Search Talent', icon: Search },
    { href: '/dashboard/employer/history', label: 'History', icon: History },
    { href: '/dashboard/employer/settings', label: 'Settings', icon: Settings },
  ];

  const navItems = isTalent ? talentNavItems : employerNavItems;

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
        fixed md:relative top-0 left-0 h-screen bg-secondary-950 border-r border-secondary-800 
        z-50 transition-all duration-300
        ${collapsed ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-64'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-secondary-800">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">BC</span>
              </div>
              <span className="text-xl font-bold text-white">BackCheck</span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-secondary-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-sm">
                  {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.displayName || user.email}</p>
                <p className="text-xs text-secondary-400 capitalize">{user.role}</p>
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
                    <Link
                      href={item.href}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                        ${isActive 
                          ? 'bg-primary-500/10 text-primary-400 border-l-2 border-primary-500' 
                          : 'text-secondary-400 hover:text-white hover:bg-secondary-800'
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-secondary-800">
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-3 w-full px-4 py-3 text-secondary-400 hover:text-white hover:bg-secondary-800 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Toggle button (mobile) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="md:hidden absolute -right-3 top-6 bg-secondary-800 border border-secondary-700 rounded-full p-1.5"
        >
          {collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </aside>
    </>
  );
}