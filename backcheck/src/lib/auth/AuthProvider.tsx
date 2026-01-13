// src/lib/auth/AuthProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signUpTalent: async () => {},
  signUpEmployer: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

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
    
    return {
      uid: userId,
      email,
      role: 'talent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      talentUID,
      fullName: userData.fullName,
      profession: userData.profession,
      phone: userData.phone,
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
  };

  // Create employer user document
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
    return {
      uid: userId,
      email,
      role: 'employer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      companyName: userData.companyName,
      industry: userData.industry,
      employeeCount: userData.employeeCount,
      phone: userData.phone,
      subscription: {
        plan: 'free',
        searchesRemaining: 3,
        searchesUsed: 0
      },
      displayName: userData.companyName,
    };
  };

  // Sign up talent
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
      
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up employer
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
      
      const employerData = await createEmployerUser(
        userCredential.user.uid,
        email,
        userData
      );
      
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, employerData);
      
      setUser(employerData);
      
      console.log('Employer signup successful');
      
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in
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
      } else {
        throw new Error('User profile not found');
      }
      
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw error;
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
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
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
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUpTalent,
      signUpEmployer,
      signIn: signInUser,
      signOut: signOutUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}