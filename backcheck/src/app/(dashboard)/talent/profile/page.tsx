// src/app/(dashboard)/talent/profile/page.tsx
'use client';

import { User, Briefcase, Phone, Mail, CheckCircle, Clock, FileText } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';

export default function TalentProfilePage() {
  const { user } = useAuth();

  if (!user || user.role !== 'talent') {
    return null;
  }

  const talentUser = user as any;
  const verificationProgress = Object.values(talentUser.verificationStatus || {}).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-secondary-400">Manage your professional identity</p>
        </div>
        <div className="bg-secondary-900 rounded-lg p-4">
          <p className="text-sm text-secondary-400">Your Talent ID</p>
          <p className="text-xl font-mono font-bold text-primary-400">{talentUser.talentUID}</p>
        </div>
      </div>

      {/* Verification Status */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Verification Status</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-secondary-300">Overall Progress</span>
              <span className="text-primary-400 font-semibold">{verificationProgress}/5 complete</span>
            </div>
            <div className="w-full bg-secondary-800 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all"
                style={{ width: `${(verificationProgress / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(talentUser.verificationStatus || {}).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-3">
                {value ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <Clock className="text-yellow-500" size={20} />
                )}
                <div>
                  <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-sm text-secondary-400">
                    {value ? 'Verified' : 'Pending verification'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <User className="mr-2" size={20} />
            Personal Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-secondary-400">Full Name</p>
              <p className="font-medium">{talentUser.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-secondary-400">Email</p>
              <p className="font-medium">{talentUser.email}</p>
            </div>
            {talentUser.phone && (
              <div>
                <p className="text-sm text-secondary-400">Phone</p>
                <p className="font-medium">{talentUser.phone}</p>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Briefcase className="mr-2" size={20} />
            Professional Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-secondary-400">Profession</p>
              <p className="font-medium">{talentUser.profession}</p>
            </div>
            <div>
              <p className="text-sm text-secondary-400">Verification Level</p>
              <div className="flex items-center">
                {talentUser.verified ? (
                  <>
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span className="text-green-500 font-semibold">Verified Professional</span>
                  </>
                ) : (
                  <>
                    <Clock className="text-yellow-500 mr-2" size={16} />
                    <span className="text-yellow-500 font-semibold">Verification in Progress</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="p-4 bg-secondary-800 rounded-lg hover:bg-secondary-700 transition-colors text-left">
            <FileText className="mb-2 text-primary-400" size={24} />
            <p className="font-medium">Upload Documents</p>
            <p className="text-sm text-secondary-400">Add certificates, licenses</p>
          </button>
          <button className="p-4 bg-secondary-800 rounded-lg hover:bg-secondary-700 transition-colors text-left">
            <Briefcase className="mb-2 text-primary-400" size={24} />
            <p className="font-medium">Add Experience</p>
            <p className="text-sm text-secondary-400">Update your work history</p>
          </button>
          <button className="p-4 bg-secondary-800 rounded-lg hover:bg-secondary-700 transition-colors text-left">
            <User className="mb-2 text-primary-400" size={24} />
            <p className="font-medium">Edit Profile</p>
            <p className="text-sm text-secondary-400">Update personal information</p>
          </button>
        </div>
      </div>
    </div>
  );
}