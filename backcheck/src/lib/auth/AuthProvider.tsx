// src/lib/auth/AuthProvider.tsx - FIXED VERSION
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, generateUID } from '@/lib/firebase/config';
import { AppUser, TalentUser, EmployerUser, UserRole } from '@/types';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signUpTalent: (email: string, password: string, userData: any) => Promise<void>;
  signUpEmployer: (email: string, password: string, userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Create talent user document
  const createTalentUser = async (
    userId: string,
    email: string,
    userData: {
      fullName: string;
      profession: string;
      phone?: string;
    }
  ): Promise<TalentUser> => {
    const talentUID = generateUID();
    
    const talentData: TalentUser = {
      uid: userId,
      email,
      role: 'talent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      talentUID,
      fullName: userData.fullName,
      profession: userData.profession,
      phone: userData.phone || null, // Use null instead of undefined
      verified: false,
      verificationStatus: {
        personalInfo: false,
        education: false,
        experience: false,
        documents: false,
        overall: false
      },
      displayName: userData.fullName,
    };
    
    return talentData;
  };

  // Create employer user document - FIXED
  const createEmployerUser = async (
    userId: string,
    email: string,
    userData: {
      companyName: string;
      industry: string;
      employeeCount?: string;
      phone?: string;
    }
  ): Promise<EmployerUser> => {
    const employerData: EmployerUser = {
      uid: userId,
      email,
      role: 'employer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      companyName: userData.companyName,
      industry: userData.industry,
      employeeCount: userData.employeeCount || null, // FIX: Use null instead of undefined
      phone: userData.phone || null, // FIX: Use null instead of undefined
      subscription: {
        plan: 'free',
        searchesRemaining: 3,
        searchesUsed: 0
      },
      displayName: userData.companyName,
    };
    
    return employerData;
  };

  // Sign up talent - FIXED REDIRECT
  const signUpTalent = async (
    email: string,
    password: string,
    userData: {
      fullName: string;
      profession: string;
      phone?: string;
    }
  ) => {
    setLoading(true);
    try {
      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create talent data
      const talentData = await createTalentUser(
        userCredential.user.uid,
        email,
        userData
      );
      
      // Save to Firestore
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, talentData);
      
      // Update state
      setUser(talentData);
      
      console.log('Talent signup successful');
      
      // FIXED REDIRECT: Use correct path without /dashboard/
      router.push('/talent/profile');
      
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // User-friendly error messages
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email already registered. Please sign in instead.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password must be at least 6 characters.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      } else {
        throw new Error(error.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Sign up employer - FIXED
  const signUpEmployer = async (
    email: string,
    password: string,
    userData: {
      companyName: string;
      industry: string;
      employeeCount?: string;
      phone?: string;
    }
  ) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // FIX: Pass all userData including optional fields
      const employerData = await createEmployerUser(
        userCredential.user.uid,
        email,
        {
          companyName: userData.companyName,
          industry: userData.industry,
          employeeCount: userData.employeeCount || undefined, // Pass undefined if empty
          phone: userData.phone || undefined // Pass undefined if empty
        }
      );
      
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, employerData);
      
      setUser(employerData);
      
      console.log('Employer signup successful');
      
      // FIXED REDIRECT: Use correct path without /dashboard/
      router.push('/employer/search');
      
    } catch (error: any) {
      console.error('Signup error:', error);
      
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email already registered. Please sign in instead.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password must be at least 6 characters.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      } else {
        throw new Error(error.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Sign in - FIXED REDIRECTS
  const signInUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Get user data from Firestore
      const userRef = doc(db, 'users', userCredential.user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userData = userSnap.data() as AppUser;
        setUser(userData);
        
        // FIXED REDIRECTS: Use correct paths without /dashboard/
        if (userData.role === 'talent') {
          router.push('/talent/profile');
        } else {
          router.push('/employer/search');
        }
      } else {
        throw new Error('User profile not found in database.');
      }
      
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Try again later.');
      } else if (error.code === 'auth/user-disabled') {
        throw new Error('Account disabled. Contact support.');
      } else {
        throw new Error(error.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOutUser = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      router.push('/');
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error('Failed to sign out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            const userData = userSnap.data() as AppUser;
            setUser(userData);
          } else {
            console.warn('Firebase user exists but no Firestore document');
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user from Firestore:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signUpTalent,
    signUpEmployer,
    signIn: signInUser,
    signOut: signOutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}