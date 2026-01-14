// src/types/index.ts - Update these interfaces
export interface EmployerUser extends BaseUser {
  role: 'employer';
  companyName: string;
  industry: string;
  employeeCount?: string | null; // Allow null
  phone?: string | null; // Allow null
  subscription: {
    plan: 'free' | 'pro' | 'enterprise';
    searchesRemaining: number;
    searchesUsed: number;
    validUntil?: string;
  };
}

export interface TalentUser extends BaseUser {
  role: 'talent';
  talentUID: string;
  fullName: string;
  profession: string;
  phone?: string | null; // Allow null
  verified: boolean;
  verificationStatus: {
    personalInfo: boolean;
    education: boolean;
    experience: boolean;
    documents: boolean;
    overall: boolean;
  };
  bio?: string;
  skills?: string[];
  experience?: {
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }[];
  education?: {
    degree: string;
    institution: string;
    year: number;
  }[];
}