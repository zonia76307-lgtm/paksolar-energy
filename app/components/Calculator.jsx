"use client";
import { useState, useEffect } from "react";
// Next.js Router navigation import karna
import { useRouter } from "next/navigation";

export default function Calculator() {
  const router = useRouter();
  const [bill, setBill] = useState(20000);
  const [panelRate, setPanelRate] = useState(32); // Default fallback rate: Rs. 32 per watt
  const [loading, setLoading] = useState(true);

  // 1. Database se live market rates fetch karna
  useEffect(() => {
    async function fetchLiveRates() {
      try {
        const response = await fetch("/api/rates");
        if (!response.ok) throw new Error("Rates fetch karne mein masla aaya");
        
        const data = await response.json();
        
        // Kisi specific industry-standard panel ka live rate nikalna (e.g., Longi)
        const standardPanel = data.find(item => 
          item.item_name.toLowerCase().includes("longi") || 
          item.item_name.toLowerCase().includes("himo")
        );

        // Agar database se price mil jaye toh state update karein, warna default 32 par chale
        if (standardPanel && standardPanel.price) {
          setPanelRate(standardPanel.price);
        }
      } catch (error) {
        console.error("Live rates loading error:", error);
      } finally {
        boxLoading(false);
      }
    }

    fetchLiveRates();
  }, []);

  // 2. Math Calculations based on live rates
  const estimatedKW = parseFloat((bill / 1200).toFixed(1));
  const monthlySavings = (bill * 0.85).toFixed(0);

  // Dynamic system cost calculate karna (Total Watts * Per Watt Rate + Extra Inverter & Structure Cost)
  const totalWatts = estimatedKW * 1000;
  const panelCost = totalWatts * panelRate;
  
  // Approximate structural, inverter, and installation costs base on system sizing
  const extraCosts = estimatedKW > 0 ? (estimatedKW * 25000) + 150000 : 0; 
  const estimatedTotalCost = panelCost + extraCosts;

  // 3. Navigation handler button click ke liye (Redirect to Quote Page with Data)
  const handleGetQuote = () => {
    const size = estimatedKW > 0 ? estimatedKW : 0;
    const price = Math.round(estimatedTotalCost);
    
    // Aapke quotes/form wale page ka path agar "/quote" hai (Aap isay badal sakti hain agar routing alag hai)
    router.push(`/quote?size=${size}&price=${price}`);
  };

  const boxLoading = (val) => {
    setLoading(val);
  };

  return (
    <section className="py-16 bg-white border-b border-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">
            💡 Smart Estimator
          </span>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Calculate Your Solar ROI & Savings
          </h2>
          <p className="text-gray-500 font-medium text-sm">
            Drag the slider to match your average monthly electricity bill and see what solar system capacity fits your home perfectly.
          </p>
        </div>

        <div className="bg-gray-50 rounded-3xl p-6 sm:p-10 border border-gray-100 grid md:grid-cols-2 gap-10 items-center">
          
          {/* Left Side: Input Slider */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Your Avg. Monthly Bill: <span className="text-green-600 text-lg font-black">Rs. {Number(bill).toLocaleString()}</span>
              </label>
              <input 
                type="range" 
                min="5000" 
                max="150000" 
                step="5000"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2">
                <span>Rs. 5,000</span>
                <span>Rs. 150,000+</span>
              </div>
            </div>

            {/* Live Indicator Badge */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <p className="text-xs font-bold text-gray-700">
                  Live Market Price: <span className="text-green-600">Rs. {panelRate}/Watt</span>
                </p>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed mt-1">
                Calculations are fully synchronized with today's live Pakistan solar distribution rates.
              </p>
            </div>
          </div>

          {/* Right Side: Output Results */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
              <span className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">Recommended Size</span>
              <span className="text-2xl font-black text-gray-900">{estimatedKW > 0 ? estimatedKW : 0} <span className="text-xs font-bold text-amber-500">KW</span></span>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
              <span className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">Monthly Savings</span>
              <span className="text-2xl font-black text-green-600"><span className="text-xs font-bold">Rs.</span> {Number(monthlySavings).toLocaleString()}</span>
            </div>

            {/* Live Estimated System Cost */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 col-span-2 p-5 rounded-2xl text-center text-white shadow-md">
              <span className="text-xs font-bold text-green-100 block mb-1 uppercase tracking-wider opacity-90">Estimated System Cost</span>
              <span className="text-3xl font-black">
                {loading ? (
                  <span className="text-sm font-medium animate-pulse">Calculating Live Price...</span>
                ) : (
                  `Rs. ${Math.round(estimatedTotalCost).toLocaleString()}`
                )}
              </span>
              <p className="text-[10px] text-green-100 mt-1 opacity-75">Includes Plates, Structure, Inverter & Live Duties</p>
            </div>

            {/* Click Action Trigger connected to dynamic function */}
            <button 
              onClick={handleGetQuote}
              className="col-span-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl text-xs transition-colors tracking-wide mt-1 cursor-pointer"
            >
              Get Detailed Quote & Technical Audit
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}