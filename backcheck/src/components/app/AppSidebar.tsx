'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  User, 
  Search, 
  Settings, 
  LogOut,
  Home,
  Building,
  Shield
} from 'lucide-react';

export default function AppSidebar() {
  const { signOut, userData } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const userRole = userData?.role || 'professional';

  // Menu items based on user role
  const professionalMenu = [
    {
      title: 'Dashboard',
      href: '/professional/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: 'My Profile',
      href: '/professional/profile',
      icon: <User size={20} />,
    },
    {
      title: 'Verification Status',
      href: '/professional/verification',
      icon: <Shield size={20} />,
    },
    {
      title: 'Settings',
      href: '/professional/settings',
      icon: <Settings size={20} />,
    },
  ];

  const organisationMenu = [
    {
      title: 'Dashboard',
      href: '/organisation/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: 'Search Professionals',
      href: '/organisation/search',
      icon: <Search size={20} />,
    },
    {
      title: 'My Organisation',
      href: '/organisation/profile',
      icon: <Building size={20} />,
    },
    {
      title: 'Settings',
      href: '/organisation/settings',
      icon: <Settings size={20} />,
    },
  ];

  const menuItems = userRole === 'professional' ? professionalMenu : organisationMenu;

  const handleSignOut = async () => {
    await signOut();
    router.push('/signin');
  };

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-6 flex flex-col">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6A1E55] to-[#3B1C32] flex items-center justify-center">
          <span className="text-white font-bold">BC</span>
        </div>
        <span className="text-xl font-bold text-white">BackCheck</span>
      </Link>

      {/* User Info */}
      <div className="mb-8 p-4 bg-gray-800/50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#3B1C32] flex items-center justify-center">
            <span className="text-[#FF6B9D] font-semibold">
              {userData ? (userData.role === 'professional' ? 'P' : 'O') : 'U'}
            </span>
          </div>
          <div>
            <p className="font-medium">
              {userData?.role === 'professional' 
                ? (userData as any)?.fullName || 'Professional'
                : (userData as any)?.companyName || 'Organisation'
              }
            </p>
            <p className="text-sm text-gray-400 capitalize">
              {userData?.role || 'User'} Account
            </p>
            {userData?.role === 'professional' && (userData as any)?.professionalUID && (
              <p className="text-xs text-[#FF6B9D] mt-1 font-mono">
                ID: {(userData as any).professionalUID}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === item.href
                ? 'bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="pt-6 border-t border-gray-800 space-y-2">
        <Link 
          href="/" 
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <Home size={20} />
          <span>Back to Home</span>
        </Link>
        
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors w-full"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}