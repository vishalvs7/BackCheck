'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  User, Mail, Phone, Briefcase, MapPin, GraduationCap, 
  Building, Calendar, Shield, FileText, Download, CheckCircle, XCircle
} from 'lucide-react';

interface ProfessionalProfile {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  location: string;
  bio: string;
  verified: boolean;
  verificationStatus: {
    personalInfo: boolean;
    education: boolean;
    experience: boolean;
    documents: boolean;
  };
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    verified: boolean;
  }>;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    verified: boolean;
  }>;
  skills: string[];
  documents: Array<{
    name: string;
    type: string;
    verified: boolean;
  }>;
}

export default function UIDSearchResultPage() {
  const params = useParams();
  const uid = params.uid as string;
  const [profile, setProfile] = useState<ProfessionalProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate fetching professional data by UID
    // In real app, this would be a Firestore query
    const fetchProfile = async () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        if (uid && uid.length === 10) {
          // Mock data - in real app, fetch from Firestore
          setProfile({
            uid,
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 (555) 123-4567',
            profession: 'Senior Software Engineer',
            location: 'San Francisco, CA',
            bio: 'Experienced software engineer with 8+ years in full-stack development. Specialized in React, Node.js, and cloud architecture. Passionate about building scalable applications and mentoring junior developers.',
            verified: true,
            verificationStatus: {
              personalInfo: true,
              education: true,
              experience: true,
              documents: true
            },
            education: [
              { institution: 'Stanford University', degree: 'M.S. Computer Science', year: '2016', verified: true },
              { institution: 'MIT', degree: 'B.S. Computer Engineering', year: '2014', verified: true }
            ],
            experience: [
              { company: 'TechCorp Inc.', position: 'Senior Software Engineer', duration: '2020 - Present', verified: true },
              { company: 'StartupXYZ', position: 'Full Stack Developer', duration: '2017 - 2020', verified: true },
              { company: 'Digital Solutions', position: 'Software Developer', duration: '2015 - 2017', verified: true }
            ],
            skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'PostgreSQL', 'MongoDB'],
            documents: [
              { name: 'Resume.pdf', type: 'Resume', verified: true },
              { name: 'Degree_Certificate.pdf', type: 'Education', verified: true },
              { name: 'Employment_Letter.pdf', type: 'Experience', verified: true },
              { name: 'ID_Proof.pdf', type: 'Identity', verified: true }
            ]
          });
        } else {
          setError('Invalid Professional ID. Please check and try again.');
        }
        setLoading(false);
      }, 1500);
    };

    fetchProfile();
  }, [uid]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center py-16">
          <div className="w-16 h-16 border-4 border-[#6A1E55] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold mb-2">Searching Professional Profile</h2>
          <p className="text-gray-400">Fetching verified information for ID: {uid}</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="bg-red-900/20 border border-red-800 rounded-xl p-8 text-center">
          <XCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'The professional profile could not be found.'}</p>
          <a 
            href="/organisation/search" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Search
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with Professional ID */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{profile.fullName}</h1>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white rounded-full text-sm font-medium">
                Professional ID: {profile.uid}
              </span>
              {profile.verified && (
                <span className="flex items-center text-green-500">
                  <CheckCircle size={16} className="mr-1" />
                  Verified Profile
                </span>
              )}
            </div>
          </div>
          <button className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors flex items-center">
            <Download size={18} className="mr-2" />
            Export Profile
          </button>
        </div>
        <p className="text-gray-400">{profile.profession} • {profile.location}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Basic Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Verification Status */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Shield className="mr-2 text-[#FF6B9D]" />
              Verification Status
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(profile.verificationStatus).map(([key, verified]) => (
                <div key={key} className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    verified ? 'bg-green-900/30' : 'bg-gray-800'
                  }`}>
                    {verified ? (
                      <CheckCircle size={24} className="text-green-500" />
                    ) : (
                      <XCircle size={24} className="text-gray-500" />
                    )}
                  </div>
                  <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-sm text-gray-400">
                    {verified ? 'Verified' : 'Pending'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-[#3B1C32] flex items-center justify-center mr-4">
                  <User size={20} className="text-[#FF6B9D]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Full Name</p>
                  <p className="font-medium">{profile.fullName}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-[#3B1C32] flex items-center justify-center mr-4">
                  <Mail size={20} className="text-[#FF6B9D]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-[#3B1C32] flex items-center justify-center mr-4">
                  <Phone size={20} className="text-[#FF6B9D]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="font-medium">{profile.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-[#3B1C32] flex items-center justify-center mr-4">
                  <Briefcase size={20} className="text-[#FF6B9D]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Profession</p>
                  <p className="font-medium">{profile.profession}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-[#3B1C32] flex items-center justify-center mr-4">
                  <MapPin size={20} className="text-[#FF6B9D]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="font-medium">{profile.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-6">Professional Bio</h2>
            <p className="text-gray-300">{profile.bio}</p>
          </div>

          {/* Education */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <GraduationCap className="mr-2 text-[#FF6B9D]" />
              Education
            </h2>
            
            <div className="space-y-4">
              {profile.education.map((edu, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{edu.institution}</h3>
                      <p className="text-gray-300">{edu.degree}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-3">{edu.year}</span>
                      {edu.verified ? (
                        <span className="flex items-center text-green-500 text-sm">
                          <CheckCircle size={14} className="mr-1" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-yellow-500 text-sm">Pending</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Building className="mr-2 text-[#FF6B9D]" />
              Work Experience
            </h2>
            
            <div className="space-y-4">
              {profile.experience.map((exp, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{exp.company}</h3>
                      <p className="text-gray-300">{exp.position}</p>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-500 mr-2" />
                      <span className="text-gray-400 mr-3">{exp.duration}</span>
                      {exp.verified ? (
                        <span className="flex items-center text-green-500 text-sm">
                          <CheckCircle size={14} className="mr-1" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-yellow-500 text-sm">Pending</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Skills & Documents */}
        <div className="space-y-8">
          {/* Skills */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-6">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#3B1C32] text-[#FF6B9D] rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <FileText className="mr-2 text-[#FF6B9D]" />
              Verified Documents
            </h2>
            
            <div className="space-y-3">
              {profile.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center">
                    <FileText size={18} className="text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-400">{doc.type}</p>
                    </div>
                  </div>
                  {doc.verified ? (
                    <span className="flex items-center text-green-500 text-sm">
                      <CheckCircle size={14} className="mr-1" />
                      Verified
                    </span>
                  ) : (
                    <span className="text-yellow-500 text-sm">Pending</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Search Info */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-6">Search Information</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Searched Using</p>
                <p className="font-mono font-bold text-lg">{profile.uid}</p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm">Profile Status</p>
                <p className={`font-medium ${profile.verified ? 'text-green-500' : 'text-yellow-500'}`}>
                  {profile.verified ? 'Fully Verified' : 'Partially Verified'}
                </p>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm">Last Updated</p>
                <p className="font-medium">January 12, 2024</p>
              </div>
              
              <button className="w-full py-3 bg-gradient-to-r from-[#6A1E55] to-[#3B1C32] text-white rounded-lg hover:opacity-90 transition-opacity mt-4">
                Request Additional Verification
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}