"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Safe State-Driven Logo Container */}
        <Link href="/" className="flex items-center group">
          {!logoFailed ? (
            <img 
              src="/pak-solar-logo.png" 
              alt="Pak Solar Energy Logo" 
              className="h-25 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="text-xl font-black tracking-tight text-gray-900">
              PAK SOLAR<span className="text-green-600">ENERGY</span>
            </span>
          )}
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 font-semibold text-sm text-gray-600">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <Link href="/solar-rates" className="hover:text-amber-500 transition-colors">Solar Rates</Link>
          <Link href="/packages" className="hover:text-amber-500 transition-colors">Packages</Link>
          <Link href="/about" className="hover:text-amber-500 transition-colors">About Us</Link>
        </nav>

        {/* Action Button (Now fully linked to the new dynamic route) */}
        <div className="hidden md:flex items-center">
          <Link href="/get-free-quote">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm shadow-green-200">
              Get Free Quote
            </button>
          </Link>
        </div>

      </div>
    </header>
  );
}