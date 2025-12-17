"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] space-y-4">
      {/* Button: Professional Signup */}
      <Link href="/signup/professional">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          Sign up as a Professional
        </button>
      </Link>

      {/* Button: Organisation Signup */}
      <Link href="/signup/organisation">
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg">
          Sign up as an Organisation
        </button>
      </Link>

      {/* Button: Login */}
      <Link href="/login">
        <button className="px-6 py-3 bg-gray-700 text-white rounded-lg">
          Login
        </button>
      </Link>
    </div>
  );
}
