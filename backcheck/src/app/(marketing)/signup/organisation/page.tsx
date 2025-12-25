"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase/client";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ProfessionalSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Email/Password signup
  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "organisation",
      });

      router.push("/organisation/search");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  // Google signup
  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save role in Firestore (organisation)
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "organisation",
      });

      router.push("/organisation/search");
    } catch (error) {
      console.error("Google signup error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">Organisation Signup</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup} className="px-4 py-2 bg-blue-600 text-white rounded mb-2">
        Sign Up
      </button>
      <button onClick={handleGoogleSignup} className="px-4 py-2 bg-red-600 text-white rounded">
        Sign Up with Google
      </button>
    </div>
  );
}
