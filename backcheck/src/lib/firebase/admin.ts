// src/lib/firebase/admin.ts
import { initializeApp, applicationDefault, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const app = !getApps().length
  ? initializeApp({
      credential: applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID,
    })
  : getApp();

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
