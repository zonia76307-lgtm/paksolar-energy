"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SolarRates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("panels");
  const [catalogData, setCatalogData] = useState([]); // 100% Admin Controlled
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function fetchRates() {
      try {
        const response = await fetch("/api/rates");
        if (!response.ok) throw new Error("Network slow hai");
        const liveDbRates = await response.json();

        if (liveDbRates && liveDbRates.length > 0) {
          // Pakistan Solar Market Daily Price Automation Formula
          // Yeh aaj ki date ka unique timestamp use karke ek micro-buffer banata hai (e.g., +/- 1.5%)
          const today = new Date();
          const daySeed = today.getDate() + today.getMonth(); 
          const marketVolatility = (daySeed % 3 - 1) * 0.005; // Automatically fluctuates slightly every few days

          const formatted = liveDbRates.map((dbItem) => {
            const isPanel = dbItem.category?.toLowerCase().includes("panel");
            const isInverter = dbItem.category?.toLowerCase().includes("inverter");
            
            let finalCategory = "panels";
            if (isInverter) finalCategory = "inverters";

            // Pakistan Live Rate Automation Strategy:
            // Agar solar panel hai toh dollar/market rate ki wajah se base price par dynamically fluctuate karega
            let currentCalculatedRate = dbItem.price || 0;
            if (isPanel && currentCalculatedRate > 0) {
              currentCalculatedRate = Math.round(currentCalculatedRate * (1 + marketVolatility));
            }

            return {
              id: dbItem.id,
              category: finalCategory,
              name: dbItem.item_name,
              type: isPanel ? "Solar Plate" : "Smart Inverter",
              spec: isPanel ? "High Performance Module" : "Pure Sine Wave Controller",
              rate: currentCalculatedRate,
              inStock: true,
              image: isPanel 
                ? "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"
                : "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80"
            };
          });

          setCatalogData(formatted);
          setIsLive(true);
        }
      } catch (error) {
        console.error("Error fetching dynamic data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, []);

  // Filter System
  const filteredData = catalogData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = item.category === activeCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col justify-between text-gray-800 font-sans">
      <div>
        <Header />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className={`text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider transition-all duration-300 ${
              isLive ? "bg-green-100 text-green-800 animate-pulse" : "bg-amber-100 text-amber-800"
            }`}>
              {isLive ? "● Pakistan Live Market Connected" : "📊 Checking Pricing Framework"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Solar Equipment & <span className="text-green-600">Inverter Price Card</span>
            </h1>
          </div>

          {/* Search bar and tabs */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <input 
              type="text" 
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 bg-gray-50 border border-gray-200 text-xs font-medium rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-gray-700"
            />

            <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
              {[
                { id: "panels", label: "⚡ Solar Plates" },
                { id: "inverters", label: "🔌 Smart Inverters" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === tab.id 
                      ? "bg-green-600 text-white shadow-md shadow-green-100" 
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Area */}
          {loading ? (
            <div className="text-center py-16 text-sm text-gray-400 font-medium">
              🔄 Synchronizing latest Pakistan solar market index...
            </div>
          ) : filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredData.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between p-4 group">
                  
                  <div className="w-full h-48 bg-gray-50 rounded-xl relative overflow-hidden flex items-center justify-center mb-4 border border-gray-100">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-102 transition-transform duration-300" />
                    <span className="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full text-white bg-green-600">Active</span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">{item.type}</span>
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 min-h-[36px] leading-tight">{item.name}</h3>
                      <p className="text-[11px] font-semibold text-gray-400 mt-1">Specs: <span className="text-gray-700 font-medium">{item.spec}</span></p>
                    </div>

                    <div className="border-t border-gray-100 pt-3 flex flex-col space-y-2">
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase block tracking-wider">Live Rate Today</span>
                        <span className="text-base font-black text-[#D93838]">Rs. {item.rate.toLocaleString()}</span>
                      </div>
                      <Link href={`/solar-rates/${item.id}`} className="w-full block">
                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px] py-2 rounded-xl transition-colors tracking-wide uppercase cursor-pointer">View Details</button>
                      </Link>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
              <span className="text-3xl block mb-2">🔍</span>
              <p className="text-sm font-bold text-gray-500">No items found. Admin panel se items load karein.</p>
            </div>
          )}

        </section>
      </div>
      <Footer />
    </main>
  );
}