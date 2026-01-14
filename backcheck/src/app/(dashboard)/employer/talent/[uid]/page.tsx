// src/app/(dashboard)/employer/talent/[uid]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  User, Briefcase, Mail, Phone, Calendar, MapPin, 
  GraduationCap, Award, FileText, Shield, CheckCircle, XCircle
} from 'lucide-react';
import { SearchService } from '@/lib/services/search.service';
import { TalentUser } from '@/types';

export default function TalentProfilePage() {
  const params = useParams();
  const talentUID = params.uid as string;
  
  const [talent, setTalent] = useState<TalentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTalentProfile();
  }, [talentUID]);

  const loadTalentProfile = async () => {
    try {
      setLoading(true);
      const result = await SearchService.searchByUID(talentUID);
      if (result) {
        setTalent(result);
      } else {
        setError('Talent profile not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading talent profile...</p>
        </div>
      </div>
    );
  }

  if (error || !talent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The talent profile you are looking for does not exist.'}</p>
          <button 
            onClick={() => window.history.back()}
            className="btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <User className="text-primary-400" size={36} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{talent.fullName}</h1>
                <div className="flex items-center mt-2">
                  <Briefcase className="text-gray-400 mr-2" size={18} />
                  <span className="text-gray-300">{talent.profession}</span>
                  {talent.verified && (
                    <span className="ml-4 inline-flex items-center px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-sm">
                      <CheckCircle size={14} className="mr-1" />
                      Verified Professional
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <span className="text-sm text-gray-500">Talent ID:</span>
                  <span className="ml-2 font-mono text-xl text-primary-400">{talent.talentUID}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="btn-secondary px-6">
                <Mail className="mr-2" size={18} />
                Contact
              </button>
              <button className="btn-primary px-6">
                <FileText className="mr-2" size={18} />
                Download Report
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Verification Status */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Shield className="mr-2" />
                Verification Status
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(talent.verificationStatus).map(([key, value]) => (
                  <div key={key} className="bg-[#0F172A] rounded-lg p-4 border border-[#334155]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      {value ? (
                        <CheckCircle className="text-green-500" size={18} />
                      ) : (
                        <XCircle className="text-red-500" size={18} />
                      )}
                    </div>
                    <div className="text-lg font-semibold">
                      {value ? 'Verified' : 'Pending'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience (if available) */}
            {talent.experience && talent.experience.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Award className="mr-2" />
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {talent.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-primary-500 pl-4 py-2">
                      <h3 className="font-bold">{exp.title}</h3>
                      <p className="text-gray-300">{exp.company}</p>
                      <p className="text-gray-400 text-sm">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </p>
                      {exp.description && (
                        <p className="text-gray-400 mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education (if available) */}
            {talent.education && talent.education.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <GraduationCap className="mr-2" />
                  Education
                </h2>
                <div className="space-y-4">
                  {talent.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-primary-500 pl-4 py-2">
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-gray-300">{edu.institution}</p>
                      <p className="text-gray-400 text-sm">Graduated: {edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Contact & Details */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="text-gray-400 mr-3" size={18} />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="text-gray-300">{talent.email}</div>
                  </div>
                </div>
                {talent.phone && (
                  <div className="flex items-center">
                    <Phone className="text-gray-400 mr-3" size={18} />
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="text-gray-300">{talent.phone}</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="text-gray-400 mr-3" size={18} />
                  <div>
                    <div className="text-sm text-gray-500">Member Since</div>
                    <div className="text-gray-300">
                      {new Date(talent.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills (if available) */}
            {talent.skills && talent.skills.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-bold mb-4">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {talent.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#0F172A] border border-[#334155] rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bio (if available) */}
            {talent.bio && (
              <div className="card">
                <h2 className="text-xl font-bold mb-4">Professional Bio</h2>
                <p className="text-gray-300 leading-relaxed">{talent.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}