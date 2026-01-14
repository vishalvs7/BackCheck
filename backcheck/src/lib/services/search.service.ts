// src/lib/services/search.service.ts
import { db } from '@/lib/firebase/config';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { TalentUser } from '@/types';

export class SearchService {
  
  // Search by exact Talent UID
  static async searchByUID(talentUID: string): Promise<TalentUser | null> {
    try {
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('role', '==', 'talent'),
        where('talentUID', '==', talentUID),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0];
      return { uid: doc.id, ...doc.data() } as TalentUser;
      
    } catch (error) {
      console.error('Error searching by UID:', error);
      throw new Error('Search failed. Please try again.');
    }
  }
  
  // Search by profession (fuzzy search)
  static async searchByProfession(profession: string, limitCount: number = 10): Promise<TalentUser[]> {
    try {
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('role', '==', 'talent'),
        where('profession', '==', profession),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as TalentUser[];
      
    } catch (error) {
      console.error('Error searching by profession:', error);
      throw new Error('Search failed. Please try again.');
    }
  }
  
  // Search by name (partial match)
  static async searchByName(name: string): Promise<TalentUser[]> {
    try {
      // Note: Firestore doesn't support partial string matching natively
      // For production, use Algolia or similar search service
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('role', '==', 'talent'),
        orderBy('displayName'),
        limit(20)
      );
      
      const querySnapshot = await getDocs(q);
      
      // Client-side filtering (basic implementation)
      const results = querySnapshot.docs
        .map(doc => ({ uid: doc.id, ...doc.data() } as TalentUser))
        .filter(user => 
          user.fullName?.toLowerCase().includes(name.toLowerCase()) ||
          user.displayName?.toLowerCase().includes(name.toLowerCase())
        );
      
      return results;
      
    } catch (error) {
      console.error('Error searching by name:', error);
      throw new Error('Search failed. Please try again.');
    }
  }
  
  // Create verification record when employer searches a talent
  static async createVerificationRecord(
    employerId: string,
    talentId: string,
    talentUID: string
  ): Promise<string> {
    try {
      const verificationsRef = collection(db, 'verifications');
      const verificationData = {
        employerId,
        talentId,
        talentUID,
        searchedAt: new Date().toISOString(),
        status: 'viewed',
        employerName: '', // Will be populated from employer data
        talentName: '' // Will be populated from talent data
      };
      
      const docRef = await addDoc(verificationsRef, verificationData);
      return docRef.id;
      
    } catch (error) {
      console.error('Error creating verification record:', error);
      throw new Error('Failed to record search.');
    }
  }
  
  // Get employer's search history
  static async getSearchHistory(employerId: string): Promise<any[]> {
    try {
      const verificationsRef = collection(db, 'verifications');
      const q = query(
        verificationsRef,
        where('employerId', '==', employerId),
        orderBy('searchedAt', 'desc'),
        limit(50)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
    } catch (error) {
      console.error('Error fetching search history:', error);
      return [];
    }
  }
}