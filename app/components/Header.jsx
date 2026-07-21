"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const [logoFailed, setLogoFailed] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle state
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check initial session
    async function checkAuthStatus() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user?.user_metadata?.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }

    checkAuthStatus();

    // Real-time listener for Auth State changes (Login/Logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && session.user?.user_metadata?.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo Container */}
        <Link href="/" className="flex items-center group">
          {!logoFailed ? (
            <img 
              src="/pak-solar-logo.png" 
              alt="Pak Solar Energy Logo" 
              className="h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="text-xl font-black tracking-tight text-gray-900">
              PAK SOLAR<span className="text-green-600">ENERGY</span>
            </span>
          )}
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 font-semibold text-sm text-gray-600">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <Link href="/solar-rates" className="hover:text-amber-500 transition-colors">Solar Rates</Link>
          <Link href="/packages" className="hover:text-amber-500 transition-colors">Packages</Link>
          <Link href="/about" className="hover:text-amber-500 transition-colors">About Us</Link>
        </nav>

        {/* 🛠️ Desktop Action Buttons (Get Free Quote + Conditional Sign Up / Admin Button) */}
        <div className="hidden md:flex items-center gap-3">
          {isAdmin ? (
            <Link href="/admin">
              <button className="text-emerald-700 font-bold bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer">
                🛠️ Admin Panel
              </button>
            </Link>
          ) : (
            <Link href="/admin/signup">
              <button className="text-gray-700 hover:text-green-700 font-bold bg-gray-100 hover:bg-gray-200 border border-gray-200 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer">
                Sign Up
              </button>
            </Link>
          )}

          <Link href="/get-free-quote">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm shadow-green-200 cursor-pointer">
              Get Free Quote
            </button>
          </Link>
        </div>

        {/* 📱 Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-600 hover:text-green-600 focus:outline-none p-2 cursor-pointer"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute top-20 left-0 w-full shadow-lg transition-all duration-200 z-40">
          <div className="px-4 pt-3 pb-6 space-y-3 font-semibold text-sm text-gray-600 flex flex-col">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors">Home</Link>
            <Link href="/solar-rates" onClick={() => setIsOpen(false)} className="hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors">Solar Rates</Link>
            <Link href="/packages" onClick={() => setIsOpen(false)} className="hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors">Packages</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors">About Us</Link>
            
            <div className="pt-2 border-t border-gray-100 space-y-2">
              {isAdmin ? (
                <Link href="/admin" onClick={() => setIsOpen(false)} className="block w-full">
                  <button className="w-full text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold py-3 rounded-xl text-sm transition-all text-center cursor-pointer">
                    🛠️ Admin Control Dashboard
                  </button>
                </Link>
              ) : (
                <Link href="/admin/signup" onClick={() => setIsOpen(false)} className="block w-full">
                  <button className="w-full text-gray-800 bg-gray-100 border border-gray-200 font-bold py-3 rounded-xl text-sm transition-all text-center cursor-pointer">
                    Sign Up
                  </button>
                </Link>
              )}

              <Link href="/get-free-quote" onClick={() => setIsOpen(false)} className="block w-full">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-sm transition-all text-center cursor-pointer">
                  Get Free Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}