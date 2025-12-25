"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase/client";
import { collection, query, where, getDocs } from "firebase/firestore";
import LogoutButton from "@/components/LogoutButton";

type UserProfile = {
  name?: string;
  uid?: string;   // your custom 12-char UID field
  email?: string;
  role?: string;
};

export default function ProfessionalDetailPage() {
  const { uid } = useParams(); // dynamic UID from URL
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!uid) return;

      // Query Firestore by the "uid" field (your custom 12-char UID)
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const snap = await getDocs(q);

      if (!snap.empty) {
        setProfile(snap.docs[0].data() as UserProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [uid]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!profile) return <div className="p-6">No professional found.</div>;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Professional Details</h1>
      <p><strong>Name:</strong> {profile.name || "N/A"}</p>
      <p><strong>UID:</strong> {profile.uid}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>

      <div className="mt-6">
        <LogoutButton />
      </div>
    </div>
  );
}
