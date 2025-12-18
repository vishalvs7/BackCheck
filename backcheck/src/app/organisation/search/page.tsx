"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import LogoutButton from "@/components/LogoutButton";

export default function OrganisationSearch() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const role = userDoc.exists() ? userDoc.data().role : null;
        if (role !== "organisation") {
          router.push("/");
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
      <h1 className="text-2xl font-bold">Organisation Search</h1>
      <p>Here organisations can search professionals by UID.</p>
      <LogoutButton />
    </div>
  );
}
