"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase/client";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Email/Password login
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.exists() ? userDoc.data().role : null;

      if (role === "professional") router.push("/professional/profile");
      else if (role === "organisation") router.push("/organisation/search");
      else if (role === "admin") router.push("/admin/dashboard");
      else router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if role exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      let role;
      if (userDoc.exists()) {
        role = userDoc.data().role;
      } else {
        // If user logs in first time with Google, default to professional
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          role: "professional",
        });
        role = "professional";
      }

      if (role === "professional") router.push("/professionals/profile");
      else if (role === "organisation") router.push("/organisation/dashboard");
      else if (role === "admin") router.push("/admin/dashboard");
      else router.push("/");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
      <button onClick={handleLogin} className="px-4 py-2 bg-gray-600 text-white rounded mb-2">
        Login
      </button>
      <button onClick={handleGoogleLogin} className="px-4 py-2 bg-red-600 text-white rounded">
        Login with Google
      </button>
    </div>
  );
}
