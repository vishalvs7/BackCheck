"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import LogoutButton from "@/components/LogoutButton";

type UserProfile = {
  email?: string;
  role?: string;
  uid?: string; // custom 12-char Professional UID
  name?: string;
};

export default function ProfessionalProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists()) {
        router.push("/");
        return;
      }

      setProfile(snap.data() as UserProfile);
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!profile) return <div className="p-6">No profile found.</div>;

  // Sidebar tabs
  const tabs = [
    { key: "personal", label: "Personal Details" },
    { key: "contact", label: "Contact Details" },
    { key: "education", label: "Education Details" },
    { key: "experience", label: "Experience" },
    { key: "projects", label: "Projects" },
    { key: "skills", label: "Skills" },
    { key: "certifications", label: "Certifications" },
    { key: "achievements", label: "Achievements" },
    { key: "others", label: "Others" },
  ];

  // Placeholder content for each tab
  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <p>This is personal details.</p>;
      case "contact":
        return <p>This is contact details.</p>;
      case "education":
        return <p>This is education details.</p>;
      case "experience":
        return <p>This is experience details.</p>;
      case "projects":
        return <p>This is projects details.</p>;
      case "skills":
        return <p>This is skills details.</p>;
      case "certifications":
        return <p>This is certifications details.</p>;
      case "achievements":
        return <p>This is achievements details.</p>;
      case "others":
        return <p>This is other details.</p>;
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Section */}
      <div className="h-[25vh] w-full flex items-center border-b px-6">
        {/* Left: Photo */}
        <div className="w-1/4 flex justify-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm text-gray-600">Photo</span>
          </div>
        </div>

        {/* Right: Name + UID */}
        <div className="w-3/4 pl-6">
          <h1 className="text-2xl font-bold">{profile.name || "Your Name"}</h1>
          <p className="text-gray-700">UID: {profile.uid}</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/4 border-r p-4 flex flex-col justify-between">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left px-3 py-2 rounded ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="pt-4">
            <LogoutButton />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-3/4 p-6">{renderContent()}</div>
      </div>
    </div>
  );
}
