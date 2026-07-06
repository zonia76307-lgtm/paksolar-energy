"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // 👈 Next.js Link imported for dynamic routing

const slides = [
  {
    id: 1,
    badge: "⚡ Longi Solar - World's No.1 Panel",
    title: "Maximum Efficiency With Longi Hi-MO Series",
    desc: "Experience high-performance solar tracking with cutting-edge HPBC cell technology. Engineered perfectly for Pakistani weather with up to 23% efficiency.",
    buttonText: "Check Longi Rates",
    bgGradient: "from-amber-50 to-orange-50",
    image: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQ-vn5AwnsiQJeC4DxQQUJa6omvcq1uOUtns_9EfmHyZSTy8oji7GNMYTJClSWahTPTCTM5l0qbuk-C0Rw"
  },
  {
    id: 2,
    badge: "☀️ Jinko Solar - Highly Reliable",
    title: "Power Your Future With Jinko Tiger Neo N-Type",
    desc: "Say goodbye to degradation. Jinko N-type panels provide premium power generation even during cloudy days and high-temperature summer peaks.",
    buttonText: "Check Jinko Rates",
    bgGradient: "from-green-50 to-emerald-50",
    image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQ_5cmSI_OKo9Uf-PdLl10NAYUhMLxboKEVeEHVe2TozOKe6HgUpx7ZVMD-6oT1fuvaH1zYe_p1QUB-m20"
  },
  {
    id: 3,
    badge: "🇨🇦 Canadian Solar - Premium Heavy Duty",
    title: "Canadian Solar BiFacial Double Glass Panels",
    desc: "Generate power from both sides of the panel! Ideal for commercial setups and heavy residential load with standard 25 years warranty coverage.",
    buttonText: "Check Canadian Rates",
    bgGradient: "from-blue-50 to-indigo-50",
    image: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQSE1SqxrChkaXOhwL7hmdisNb4plB9WwHAXUgTQi8zaWByoWH76236UzVHHaOeMRI3MBCOJ1yn_NtNDt0"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`relative transition-colors duration-700 overflow-hidden flex items-center h-auto lg:h-[calc(100vh-80px)] bg-gradient-to-b ${slides[current].bgGradient}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center w-full py-12 lg:py-0">
        
        {/* Left Side: Content */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-amber-800 border border-amber-200 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
            {slides[current].badge}
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            {slides[current].title.split("With")[0]} <br />
            <span className="bg-gradient-to-r from-amber-500 to-green-600 bg-clip-text text-transparent">
              {slides[current].title.includes("With") ? `With ${slides[current].title.split("With")[1]}` : ""}
            </span>
          </h1>
          
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            {slides[current].desc}
          </p>
          
          {/* Dynamic Action Buttons Group */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            {/* Dynamic Solar Rates Page Redirect */}
            <Link href="/solar-rates">
              <button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-2xl shadow-md transition-all text-sm tracking-wide shadow-amber-200 text-center">
                {slides[current].buttonText}
              </button>
            </Link>

            {/* Dynamic Packages Page Redirect */}
            <Link href="/packages">
              <button className="w-full sm:w-auto border-2 border-gray-200 hover:border-gray-300 bg-white text-gray-700 font-bold px-8 py-4 rounded-2xl transition-all text-sm tracking-wide text-center">
                View Packages
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side: Image Container */}
        <div className="relative flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-xl h-[300px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl relative group">
            <img 
              src={slides[current].image} 
              alt="Solar Panel Company Selection" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>

          {/* Dots Navigation indicators */}
          <div className="flex gap-3 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2.5 transition-all duration-300 ${
                  index === current ? "w-8 bg-green-600 rounded-full" : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400 rounded-full"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}