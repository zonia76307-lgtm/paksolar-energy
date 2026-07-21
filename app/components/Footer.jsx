"use client";
import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Column 1: Brand & About */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center group">
            {!logoFailed ? (
              <img 
                src="/pak-solar-logo.png" 
                alt="Pak Solar Energy Logo" 
                className="h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <span className="text-xl font-black tracking-tight text-white">
                PAK SOLAR<span className="text-green-500">ENERGY</span>
              </span>
            )}
          </Link>
          
          <p className="text-xs font-medium leading-relaxed text-gray-400">
            Providing transparent, reliable, and Tier-1 certified solar energy solutions across Pakistan. Powered by authentic engineering audits.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/" className="hover:text-amber-400 transition-colors">Home Landing</Link></li>
            <li><Link href="/solar-rates" className="hover:text-amber-400 transition-colors">Live Solar Rates</Link></li>
            <li><Link href="/packages" className="hover:text-amber-400 transition-colors">Solar Packages</Link></li>
            <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Our Team</Link></li>
          </ul>
        </div>

        {/* Column 3: Solar Solutions */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Our Solutions</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li><span className="cursor-default hover:text-green-400 transition-colors">Residential On-Grid</span></li>
            <li><span className="cursor-default hover:text-green-400 transition-colors">Commercial Net-Metering</span></li>
            <li><span className="cursor-default hover:text-green-400 transition-colors">Industrial Solar Plants</span></li>
            <li><span className="cursor-default hover:text-green-400 transition-colors">Hybrid Battery Backup</span></li>
          </ul>
        </div>

        {/* Column 4: Real Contact Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Office</h4>
          <ul className="space-y-2.5 text-xs font-medium text-gray-400">
            <li className="flex items-center gap-2">
              <span>📍</span> Punjab, Pakistan (Main Office)
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span> +92 300 0000000
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span> info@paksolarenergy.com
            </li>
            <li className="flex items-center gap-2 text-[11px] text-amber-400/90">
              <span>🕒</span> Mon - Sat: 09:00 AM - 06:00 PM
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-semibold text-gray-500">
        <p>© 2026 Pak Solar Energy. All Rights Reserved.</p>
        <p>Designed & Developed by Zonia Ali</p>
      </div>
    </footer>
  );
}