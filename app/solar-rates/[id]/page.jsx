"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function fetchAndMatchProduct() {
      try {
        setLoading(true);
        // 1. Direct Backend API se saare live rates fetch karein
        const response = await fetch("/api/rates");
        if (!response.ok) throw new Error("Database fetch failed");
        
        const liveDbRates = await response.json();
        
        // 2. URL param ki ID ke mutabiq exact product database se dhundein
        const matchedItem = liveDbRates.find(item => item.id === parseInt(params.id));

        if (matchedItem) {
          // Check category type structure matching
          const isPanel = matchedItem.category?.toLowerCase() === "panel";
          
          // Agar database me product mil jaye to set karein
          setProduct({
            id: matchedItem.id,
            category: isPanel ? "panels" : "inverters",
            name: matchedItem.item_name,
            type: matchedItem.category || "Authorized Component",
            // Agar panel hai to pure rate, agar custom text calculation thi to directly db price read hogi
            rate: matchedItem.price, 
            spec: isPanel ? "Premium High Efficiency Tier-1 Panel" : "Smart Pure Sine Wave System",
            image: matchedItem.image_url || (isPanel ? "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80" : "/inverter 1.jpg"),
            inStock: true
          });
          setIsLive(true);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching live product from DB:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchAndMatchProduct();
    }
  }, [params.id]);

  // Loading state skeleton overlay handler
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Header />
        <div className="text-center py-24 font-bold text-xs uppercase text-gray-400 tracking-widest animate-pulse">
          🔄 Synchronizing Live Database...
        </div>
        <Footer />
      </main>
    );
  }

  // Verification if product doesn't exist in Supabase table
  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Header />
        <div className="text-center py-24">
          <h2 className="text-xl font-bold text-gray-800">Component Not Found in Database</h2>
          <p className="text-xs text-gray-400 mt-1 font-medium">Yeh item database catalog se remove ya modify ho chuka hai.</p>
          <button onClick={() => router.push("/solar-rates")} className="mt-5 bg-green-600 text-white px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold cursor-pointer shadow-md">
            Back to Catalog
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between text-gray-800 font-sans">
      <div>
        <Header />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Breadcrumb */}
          <div className="mb-6 text-xs font-semibold text-gray-400 flex items-center gap-2">
            <Link href="/solar-rates" className="hover:text-green-600 transition-colors">Solar Rates</Link>
            <span>/</span>
            <span className="text-gray-600 capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-gray-900 truncate max-w-xs">{product.name}</span>
          </div>

          {/* Main Info Splitted Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-sm mb-8">
            
            {/* Left Frame: Image Layout */}
            <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-4 flex items-center justify-center relative overflow-hidden min-h-[350px]">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-80 max-w-full object-contain rounded-xl"
              />
              <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full text-white ${
                product.inStock ? "bg-green-600" : "bg-red-500"
              }`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Right Frame: Content & Pricing */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="bg-green-100 text-green-800 text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider inline-block">
                  🛡️ {product.type} Live Inventory Asset
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                  {product.name}
                </h1>
                
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-400 font-bold block">
                      {isLive ? "Live Database Price" : "Estimated Market Rate"}
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#D93838]">
                      Rs. {product.rate?.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-green-100 text-green-800 animate-pulse">
                    ● Database Synced
                  </span>
                </div>

                {/* Extended Technical Specs Table */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Product Specifications</h3>
                  <div className="bg-white rounded-xl border border-gray-100 text-xs font-semibold divide-y divide-gray-100">
                    <div className="flex justify-between py-2.5 px-3"><span className="text-gray-400">Model Details:</span> <span className="text-gray-800">{product.name}</span></div>
                    <div className="flex justify-between py-2.5 px-3"><span className="text-gray-400">Equipment Type:</span> <span className="text-gray-800 capitalize">{product.category === 'panels' ? 'Solar Plate (Tier-1)' : 'Smart Inverter'}</span></div>
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
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all whitespace-nowrap shadow-sm cursor-pointer">
                    📞 Request Live Quote
                  </button>
                </a>
              </div>

            </div>
          </div>

          {/* Why Choose This Product Section */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
              🎯 Why Choose Original Equipment?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-2">
                <span className="text-xl">✅</span>
                <h4 className="text-xs font-bold text-gray-900">100% Genuine Product</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                  We guarantee that this component is a 100% original, box-packed tier-1 grade component directly sourced from certified distribution lines.
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