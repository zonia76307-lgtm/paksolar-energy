"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

// Real-world Full Pakistan Solar & Inverters Catalog (With matching local image paths and watts logic)
const initialSolarMarketData = [
  // --- 12 SOLAR PLATES (PANELS) ---
  { id: 1, category: "panels", name: "Aiko 665W 3N+ Series Bifacial Solar Panel", type: "Aiko Solar", spec: "665W Premium High Efficiency", rate: 30590, watts: 665, inStock: true, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80" },
  { id: 2, category: "panels", name: "Aiko 770W Bifacial Solar Panel", type: "Aiko Solar", spec: "770W Commercial Scale N-Type", rate: 36960, watts: 770, inStock: false, image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80" },
  { id: 3, category: "panels", name: "Astronergy 715W Bifacial Solar Panel", type: "Astronergy", spec: "715W Dual Glass Technology", rate: 30745, watts: 715, inStock: true, image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=600&q=80" },
  { id: 4, category: "panels", name: "Canadian 715W Bifacial Solar Panel", type: "Canadian Solar", spec: "715W TopCon Module", rate: 32175, watts: 715, inStock: true, image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&w=600&q=80" },
  { id: 5, category: "panels", name: "JA 625W Bifacial Solar Panel", type: "JA Solar", spec: "625W DeepBlue Series", rate: 27188, watts: 625, inStock: true, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80" },
  { id: 6, category: "panels", name: "LONGI Hi-MO X7 620W Bifacial Panel", type: "Longi Solar", spec: "620W Advanced HPBC Cell", rate: 26350, watts: 620, inStock: false, image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80" },
  { id: 7, category: "panels", name: "Trina 630W Bifacial Solar Panel", type: "Trina Solar", spec: "630W Vertex S+ Generation", rate: 26775, watts: 630, inStock: true, image: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&w=600&q=80" },
  { id: 8, category: "panels", name: "Trina 715W Bifacial Solar Panel", type: "Trina Solar", spec: "715W Ultra N-Type Module", rate: 31102, watts: 715, inStock: true, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80" },
  { id: 9, category: "panels", name: "Trina 725W Bifacial Solar Panel", type: "Trina Solar", spec: "725W High Performance Power", rate: 29725, watts: 725, inStock: true, image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=600&q=80" },
  { id: 10, category: "panels", name: "Jinko 705W N-Type Bifacial Panel", type: "Jinko Solar", spec: "705W Tiger Neo Series", rate: 33135, watts: 705, inStock: false, image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&w=600&q=80" },
  { id: 11, category: "panels", name: "Jinko 620W N-Type Bifacial Panel", type: "Jinko Solar", spec: "620W Smart Grid Version", rate: 26660, watts: 620, inStock: false, image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80" },
  { id: 12, category: "panels", name: "Risen HJT 740W Bifacial Panel", type: "Risen Solar", spec: "740W Heterojunction Technology", rate: 31450, watts: 740, inStock: true, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80" },

  // --- 12 SMART INVERTERS (Fixed Local Paths matching public folder) ---
  { id: 13, category: "inverters", name: "Inverex Nitrox Hybrid 6KW", type: "Inverex", spec: "6 KW Single Phase Hybrid Unit", rate: 215000, inStock: true, image: "/inverter 1.jpg" },
  { id: 14, category: "inverters", name: "Inverex Nitrox Hybrid 10KW", type: "Inverex", spec: "10 KW Three Phase Hybrid Unit", rate: 385000, inStock: true, image: "/inverter 2.jpg" },
  { id: 15, category: "inverters", name: "Inverex Nitrox Hybrid 12KW", type: "Inverex", spec: "12 KW Commercial Dual Output", rate: 440000, inStock: true, image: "/inverter 3.jpg" },
  { id: 16, category: "inverters", name: "Knox Krypton 5KW On-Grid", type: "Knox", spec: "5 KW Pure Sine Wave On-Grid", rate: 155000, inStock: true, image: "/inverter 4.jpg" },
  { id: 17, category: "inverters", name: "Knox Krypton 10KW On-Grid", type: "Knox", spec: "10 KW High Efficiency On-Grid", rate: 245000, inStock: false, image: "/inverter 5.jpg" },
  { id: 18, category: "inverters", name: "Knox Argon Hybrid 6KW", type: "Knox", spec: "6 KW Smart Battery Backup Hybrid", rate: 210000, inStock: true, image: "/inverter 6.jpg" },
  { id: 19, category: "inverters", name: "Huawei Smart PV String 20KW", type: "Huawei", spec: "20 KW Premium Industrial Controller", rate: 465000, inStock: true, image: "/inverter 7.jpg" },
  { id: 20, category: "inverters", name: "Huawei Smart PV String 30KW", type: "Huawei", spec: "30 KW High Capacity On-Grid Box", rate: 580000, inStock: true, image: "/inverter 8.jpg" },
  { id: 21, category: "inverters", name: "Solis On-Grid 30KW System", type: "Solis", spec: "30 KW Three-Phase Commercial", rate: 390000, inStock: false, image: "/inverter 9.jpg" },
  { id: 22, category: "inverters", name: "Solis On-Grid 50KW System", type: "Solis", spec: "50 KW Heavy Multi-String Unit", rate: 510000, inStock: true, image: "/inverter 10.jpg" },
  { id: 23, category: "inverters", name: "Crown Micro Infini Hybrid 5.6KW", type: "Crown Micro", spec: "5.6 KW Eco-Sine Backup Unit", rate: 175000, inStock: true, image: "/inverter 1.jpg" },
  { id: 24, category: "inverters", name: "SolarMax Orion Series 3.2KW", type: "SolarMax", spec: "3.2 KW Off-Grid Inverter Unit", rate: 115000, inStock: true, image: "/inverter 2.jpg" }
];

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  
  const [product, setProduct] = useState(null);
  const [isLive, setIsLive] = useState(false);

  // Find initial item baseline structure
  const baseProduct = initialSolarMarketData.find((item) => item.id === parseInt(params.id));

  useEffect(() => {
    if (!baseProduct) return;

    // Set fallback initial view instantly
    setProduct(baseProduct);

    async function syncProductRateWithDatabase() {
      try {
        const response = await fetch("/api/rates");
        if (!response.ok) throw new Error("Database lag");
        
        const liveDbRates = await response.json();

        if (liveDbRates && liveDbRates.length > 0 && baseProduct.category === "panels") {
          // Brand mapping match filter
          const matchingLiveItem = liveDbRates.find(dbItem => 
            dbItem.item_name.toLowerCase().includes(baseProduct.type.toLowerCase())
          );

          if (matchingLiveItem && matchingLiveItem.price) {
            setProduct(prev => ({
              ...prev,
              rate: Math.round(baseProduct.watts * matchingLiveItem.price),
              inStock: true
            }));
            setIsLive(true);
          }
        }
      } catch (error) {
        console.error("Using fallback local rates matrix:", error);
      }
    }

    syncProductRateWithDatabase();
  }, [params.id]);

  if (!baseProduct) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Header />
        <div className="text-center py-24">
          <h2 className="text-xl font-bold text-gray-800">Component Not Found</h2>
          <button onClick={() => router.push("/solar-rates")} className="mt-4 bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-bold">
            Back to Catalog
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  // Handle initial loading tick safely
  const activeProduct = product || baseProduct;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between text-gray-800">
      <div>
        <Header />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Breadcrumb */}
          <div className="mb-6 text-xs font-semibold text-gray-400 flex items-center gap-2">
            <Link href="/solar-rates" className="hover:text-green-600 transition-colors">Solar Rates</Link>
            <span>/</span>
            <span className="text-gray-600 capitalize">{activeProduct.category}</span>
            <span>/</span>
            <span className="text-gray-900 truncate max-w-xs">{activeProduct.name}</span>
          </div>

          {/* Main Info Splitted Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-sm mb-8">
            
            {/* Left Frame: Image Layout */}
            <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-4 flex items-center justify-center relative overflow-hidden min-h-[350px]">
              <img 
                src={activeProduct.image} 
                alt={activeProduct.name} 
                className="max-h-80 max-w-full object-contain mix-blend-multiply"
              />
              <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full text-white ${
                activeProduct.inStock ? "bg-green-600" : "bg-red-500"
              }`}>
                {activeProduct.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Right Frame: Content & Pricing */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="bg-green-100 text-green-800 text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider inline-block">
                  {activeProduct.type} Tier-1 Authorized Asset
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                  {activeProduct.name}
                </h1>
                
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-400 font-bold block">
                      {activeProduct.category === "panels" && isLive ? "Live Sync Rate" : "Estimated Market Rate"}
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#D93838]">
                      Rs. {activeProduct.rate.toLocaleString()}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                    isLive ? "bg-green-100 text-green-800 animate-pulse" : "bg-amber-100 text-amber-800"
                  }`}>
                    {isLive ? "● Live Updated" : "Rate Updated Today"}
                  </span>
                </div>

                {/* Extended Technical Specs Table */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Product Specifications</h3>
                  <div className="bg-white rounded-xl border border-gray-100 text-xs font-semibold divide-y divide-gray-100">
                    <div className="flex justify-between py-2.5 px-3"><span className="text-gray-400">Model Details:</span> <span className="text-gray-800">{activeProduct.spec}</span></div>
                    <div className="flex justify-between py-2.5 px-3"><span className="text-gray-400">Equipment Type:</span> <span className="text-gray-800 capitalize">{activeProduct.category === 'panels' ? 'Solar Plate (Tier-1)' : 'Smart Inverter'}</span></div>
                    {activeProduct.category === "panels" && (
                      <div className="flex justify-between py-2.5 px-3"><span className="text-gray-400">Panel Capacity:</span> <span className="text-gray-800">{activeProduct.watts} Watts</span></div>
                    )}
                    <div className="flex justify-between py-2.5 px-3"><span className="text-gray-400">Efficiency Grade:</span> <span className="text-gray-800">Premium High-Performance A+</span></div>
                    <div className="flex justify-between py-2.5 px-3"><span className="text-gray-400">Warranty Status:</span> <span className="text-green-600 font-bold">Official Company Warranty Backed</span></div>
                  </div>
                </div>
              </div>

              {/* Direct Inquiry Action Frame */}
              <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-green-900 block">Want Custom Commercial Installation?</span>
                  <p className="text-[11px] text-green-700 font-medium">Get verified final pricing via official service desk.</p>
                </div>
                <a href="tel:+923000000000" className="w-full sm:w-auto">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all whitespace-nowrap shadow-sm">
                    📞 Request Live Quote
                  </button>
                </a>
              </div>

            </div>
          </div>

          {/* Why Choose This Product Section */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
              🎯 Why Choose {activeProduct.type} Equipment?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-2">
                <span className="text-xl">✅</span>
                <h4 className="text-xs font-bold text-gray-900">100% Genuine Product</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                  We guarantee that this {activeProduct.name} is a 100% original, box-packed tier-1 grade component directly sourced from certified distribution lines.
                </p>
              </div>

              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-2">
                <span className="text-xl">🔋</span>
                <h4 className="text-xs font-bold text-gray-900">Maximum Efficiency Output</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                  Engineered to withstand local climatic conditions in Pakistan, delivering optimal performance even during high-temperature peak summer hours.
                </p>
              </div>

              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-2">
                <span className="text-xl">🛠️</span>
                <h4 className="text-xs font-bold text-gray-900">Complete Support & Guidance</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                  Get full design, setup mapping, net-metering support, and technical layout configuration from our professional engineering team.
                </p>
              </div>
            </div>

            {/* Note Disclosure */}
            <div className="bg-amber-50/50 border border-amber-100/70 p-4 rounded-xl text-[11px] text-amber-800 leading-relaxed font-medium">
              <strong>⚠️ Important Market Disclaimer:</strong> Solar panel and inverter market rates are highly volatile in Pakistan and change daily based on currency exchange fluctuations, import policies, and market demand. For terminal commercial orders, please connect with our representative to get the exact lock-in pricing of the day.
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}