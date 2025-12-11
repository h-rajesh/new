"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if no session
  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <p className="text-green-600 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!session) {
    // while redirecting, render nothing
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-96 text-center relative overflow-hidden">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Welcome, {session.user?.name || "User"}!
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Role: <span className="font-semibold">{session.user?.role}</span>
        </p>

        <div className="bg-green-200 w-full h-1 rounded-full mb-4 animate-pulse"></div>
        <p className="text-gray-500">You are successfully logged in.</p>

        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
}
