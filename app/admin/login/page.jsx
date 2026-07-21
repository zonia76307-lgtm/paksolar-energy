"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Authenticate User with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        setError("Your email address is not verified yet. Please check your inbox and click the confirmation link.");
      } else if (error.message.includes("Invalid login credentials")) {
        setError("Invalid email address or password. Please try again.");
      } else {
        setError(error.message);
      }
      setLoading(false);
      return;
    }

    // 2. Security Check: Verify Admin Role in Metadata
    const userRole = data?.user?.user_metadata?.role;
    if (userRole !== "admin") {
      await supabase.auth.signOut(); // Sign out non-admin users immediately
      setError("Access Denied! You do not have admin permissions.");
      setLoading(false);
      return;
    }

    // 3. Successful Login
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Admin Login</h1>
        <p className="text-xs text-gray-500 text-center mb-6">Enter your credentials to access the admin panel</p>

        {error && (
          <div className="bg-red-50 text-red-700 text-xs font-bold p-3 rounded-xl mb-4 border border-red-100 leading-relaxed">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-green-100 cursor-pointer disabled:bg-gray-300"
          >
            {loading ? "Authenticating..." : "Login to Admin Panel"}
          </button>

          <div className="text-center pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">Don't have an account? </span>
            <Link href="/admin/signup" className="text-xs font-bold text-green-600 hover:underline">
              Sign Up here
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}