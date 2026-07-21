"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminSignup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState(""); // 🔑 Secret key state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 🔒 1. SECRET KEY VALIDATION CHECK
    const correctSecretKey = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY;
    
    if (secretKey !== correctSecretKey) {
      setError("❌ Invalid Admin Secret Key! Aap authorized nahi hain.");
      setLoading(false);
      return; // Form submit hona yahan ruk jayega
    }

    // 🟢 2. IF KEY IS CORRECT -> CREATE ACCOUNT
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: "admin", // Metadata mein admin role save ho jayega
        },
        emailRedirectTo: `${window.location.origin}/admin/login`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setIsSubmitted(true);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Admin Registration</h1>
        <p className="text-xs text-gray-500 text-center mb-6">Create authorized admin account</p>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs font-bold p-3 rounded-xl mb-4 border border-red-100">
            {error}
          </div>
        )}

        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 p-5 rounded-2xl text-center space-y-3">
            <div className="text-3xl">📧</div>
            <h3 className="text-sm font-bold text-green-900">Confirmation Link Sent!</h3>
            <p className="text-xs text-green-700 leading-relaxed">
              Humne <span className="font-bold">{email}</span> par confirmation link bhej diya hai. 
              Kripya mail verify karke login karein.
            </p>
            <div className="pt-2">
              <Link href="/admin/login" className="text-xs font-bold text-green-800 underline">
                Go to Login Page
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-medium text-gray-700 focus:outline-none focus:border-green-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-medium text-gray-700 focus:outline-none focus:border-green-500"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-medium text-gray-700 focus:outline-none focus:border-green-500"
                placeholder="••••••••"
              />
            </div>

            {/* 🔑 ADMIN SECRET KEY FIELD */}
            <div>
              <label className="block text-[11px] font-bold text-green-700 uppercase tracking-wider mb-1">
                🔑 Admin Secret Passkey
              </label>
              <input
                type="password"
                required
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full bg-green-50/50 border border-green-200 rounded-xl px-4 py-3 text-xs font-medium text-gray-800 focus:outline-none focus:border-green-600"
                placeholder="Enter secret passkey"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-green-100 cursor-pointer disabled:bg-gray-300"
            >
              {loading ? "Verifying & Sending Link..." : "Sign Up Admin Account"}
            </button>

            <div className="text-center pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">Already have an account? </span>
              <Link href="/admin/login" className="text-xs font-bold text-green-600 hover:underline">
                Login here
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}