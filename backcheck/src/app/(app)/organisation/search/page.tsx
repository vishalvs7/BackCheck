"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default function OrganisationSearch() {
  const router = useRouter();
  const [uid, setUid] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid) return;
    // Redirect to dynamic page
    router.push(`/organisation/search/${uid}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Search Professional by UID</h1>
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter Professional UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          className="border rounded p-2 w-64"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </form>

       <div className="mt-6">
      <LogoutButton />
    </div>
    </div>
  );
}
