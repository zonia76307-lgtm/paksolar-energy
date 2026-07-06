"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Real-world Full Pakistan Solar & Inverters Catalog
const solarMarketData = [
  // --- 12 SOLAR PLATES (PANELS) ---
  { 
    id: 1, 
    category: "panels", 
    name: "Aiko 665W 3N+ Series Bifacial Solar Panel", 
    type: "Aiko Solar", 
    spec: "665W Premium High Efficiency", 
    rate: 30590, 
    inStock: true,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: 2, 
    category: "panels", 
    name: "Aiko 770W Bifacial Solar Panel", 
    type: "Aiko Solar", 
    spec: "770W Commercial Scale N-Type", 
    rate: 36960, 
    inStock: false,
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: 3, 
    category: "panels", 
    name: "Astronergy 715W Bifacial Solar Panel", 
    type: "Astronergy", 
    spec: "715W Dual Glass Technology", 
    rate: 30745, 
    inStock: true,
    image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: 4, 
    category: "panels", 
    name: "Canadian 715W Bifacial Solar Panel", 
    type: "Canadian Solar", 
    spec: "715W TopCon Module", 
    rate: 32175, 
    inStock: true,
    image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: 5, 
    category: "panels", 
    name: "JA 625W Bifacial Solar Panel", 
    type: "JA Solar", 
    spec: "625W DeepBlue Series", 
    rate: 27188, 
    inStock: true,
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: 6, 
    category: "panels", 
    name: "LONGI Hi-MO X7 620W Bifacial Panel", 
    type: "Longi Solar", 
    spec: "620W Advanced HPBC Cell", 
    rate: 26350, 
    inStock: false,
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: 7, 
    category: "panels", 
    name: "Trina 630W Bifacial Solar Panel", 
    type: "Trina Solar", 
    spec: "630W Vertex S+ Generation", 
    rate: 26775, 
    inStock: true,
    image: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: 8, 
    category: "panels", 
    name: "Trina 715W Bifacial Solar Panel", 
    type: "Trina Solar", 
    spec: "715W Ultra N-Type Module", 
    rate: 31102, 
    inStock: true,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: 9, 
    category: "panels", 
    name: "Trina 725W Bifacial Solar Panel", 
    type: "Trina Solar", 
    spec: "725W High Performance Power", 
    rate: 29725, 
    inStock: true,
    image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: 10, 
    category: "panels", 
    name: "Jinko 705W N-Type Bifacial Panel", 
    type: "Jinko Solar", 
    spec: "705W Tiger Neo Series", 
    rate: 33135, 
    inStock: false,
    image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: 11, 
    category: "panels", 
    name: "Jinko 620W N-Type Bifacial Panel", 
    type: "Jinko Solar", 
    spec: "620W Smart Grid Version", 
    rate: 26660, 
    inStock: false,
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80"
  },
  { 
    id: 12, 
    category: "panels", 
    name: "Risen HJT 740W Bifacial Panel", 
    type: "Risen Solar", 
    spec: "740W Heterojunction Technology", 
    rate: 31450, 
    inStock: true,
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80"
  },

  // --- 12 SMART INVERTERS (Direct Public Folder .jpg Assets) ---
  { 
    id: 13, 
    category: "inverters", 
    name: "Inverex Nitrox Hybrid 6KW", 
    type: "Inverex", 
    spec: "6 KW Single Phase Hybrid Unit", 
    rate: 215000, 
    inStock: true,
    image: "/inverter 1.jpg" // 👈 Tumhara direct local public asset folder ka path
  },
  { 
    id: 14, 
    category: "inverters", 
    name: "Inverex Nitrox Hybrid 10KW", 
    type: "Inverex", 
    spec: "10 KW Three Phase Hybrid Unit", 
    rate: 385000, 
    inStock: true,
    image: "/inverter 2.jpg"
  },
  { 
    id: 15, 
    category: "inverters", 
    name: "Inverex Nitrox Hybrid 12KW", 
    type: "Inverex", 
    spec: "12 KW Commercial Dual Output", 
    rate: 440000, 
    inStock: true,
    image: "/inverter 3.jpg"
  },
  { 
    id: 16, 
    category: "inverters", 
    name: "Knox Krypton 5KW On-Grid", 
    type: "Knox", 
    spec: "5 KW Pure Sine Wave On-Grid", 
    rate: 155000, 
    inStock: true,
    image: "/inverter 4.jpg"
  },
  { 
    id: 17, 
    category: "inverters", 
    name: "Knox Krypton 10KW On-Grid", 
    type: "Knox", 
    spec: "10 KW High Efficiency On-Grid", 
    rate: 245000, 
    inStock: false,
    image: "/inverter 5.jpg"
  },
  { 
    id: 18, 
    category: "inverters", 
    name: "Knox Argon Hybrid 6KW", 
    type: "Knox", 
    spec: "6 KW Smart Battery Backup Hybrid", 
    rate: 210000, 
    inStock: true,
    image: "/inverter 6.jpg"
  },
  { 
    id: 19, 
    category: "inverters", 
    name: "Huawei Smart PV String 20KW", 
    type: "Huawei", 
    spec: "20 KW Premium Industrial Controller", 
    rate: 465000, 
    inStock: true,
    image: "/inverter 7.jpg"
  },
  { 
    id: 20, 
    category: "inverters", 
    name: "Huawei Smart PV String 30KW", 
    type: "Huawei", 
    spec: "30 KW High Capacity On-Grid Box", 
    rate: 580000, 
    inStock: true,
    image: "/inverter 8.jpg"
  },
  { 
    id: 21, 
    category: "inverters", 
    name: "Solis On-Grid 30KW System", 
    type: "Solis", 
    spec: "30 KW Three-Phase Commercial", 
    rate: 390000, 
    inStock: false,
    image: "/inverter 9.jpg"
  },
  { 
    id: 22, 
    category: "inverters", 
    name: "Solis On-Grid 50KW System", 
    type: "Solis", 
    spec: "50 KW Heavy Multi-String Unit", 
    rate: 510000, 
    inStock: true,
    image: "/inverter 10.jpg"
  },
  { 
    id: 23, 
    category: "inverters", 
    name: "Crown Micro Infini Hybrid 5.6KW", 
    type: "Crown Micro", 
    spec: "5.6 KW Eco-Sine Backup Unit", 
    rate: 175000, 
    inStock: true,
    image: "/inverter 1.jpg"
  },
  { 
    id: 24, 
    category: "inverters", 
    name: "SolarMax Orion Series 3.2KW", 
    type: "SolarMax", 
    spec: "3.2 KW Off-Grid Inverter Unit", 
    rate: 115000, 
    inStock: true,
    image: "/inverter 2.jpg"
  }
];

export default function SolarRates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("panels");

  // Filtering System
  const filteredData = solarMarketData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = item.category === activeCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col justify-between text-gray-800">
      <div>
        <Header />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="bg-green-100 text-green-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              📊 Live Market Pricing
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Solar Equipment & <span className="text-green-600">Inverter Price Card</span>
            </h1>
          </div>

          {/* Controls: Search and Tabs */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <input 
              type="text" 
              placeholder="Search specific plates or inverters..."
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
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
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

          {/* Products Responsive Grid */}
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredData.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between p-4 group">
                  
                  {/* Image Frame */}
                  <div className="w-full h-48 bg-gray-50 rounded-xl relative overflow-hidden flex items-center justify-center mb-4 border border-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain group-hover:scale-102 transition-transform duration-300"
                    />
                    <span className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full text-white ${
                      item.inStock ? "bg-green-600" : "bg-red-500"
                    }`}>
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">
                        {item.type}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 min-h-[36px] leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-gray-400 mt-1">
                        Specs: <span className="text-gray-700 font-medium">{item.spec}</span>
                      </p>
                    </div>

                    {/* Rates Line & Details Redirect Button */}
                    <div className="border-t border-gray-100 pt-3 flex flex-col space-y-2">
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase block tracking-wider">Estimated Rate</span>
                        <span className="text-base font-black text-[#D93838]">
                          Rs. {item.rate.toLocaleString()}
                        </span>
                      </div>
                      
                      <Link href={`/solar-rates/${item.id}`} className="w-full block">
                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px] py-2 rounded-xl transition-colors tracking-wide uppercase">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
              <span className="text-3xl block mb-2">🔍</span>
              <p className="text-sm font-bold text-gray-500">No matching components found.</p>
            </div>
          )}

        </section>
      </div>

      <Footer />
    </main>
  );
}