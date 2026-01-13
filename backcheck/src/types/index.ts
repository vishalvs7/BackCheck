// src/types/index.ts
export type UserRole = 'talent' | 'employer' | 'admin';

export interface BaseUser {
  uid: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  displayName?: string;
  photoURL?: string;
}

export interface TalentUser extends BaseUser {
  role: 'talent';
  talentUID: string;
  fullName: string;
  profession: string;
  phone?: string;
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

export interface EmployerUser extends BaseUser {
  role: 'employer';
  companyName: string;
  industry: string;
  employeeCount?: string;
  phone?: string;
  subscription: {
    plan: 'free' | 'pro' | 'enterprise';
    searchesRemaining: number;
    searchesUsed: number;
    validUntil?: string;
  };
}

export type AppUser = TalentUser | EmployerUser;