"use client";
import { useState, useEffect } from "react";

export default function DynamicProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/rates");
        const data = await res.json();
        if (res.ok) setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Separate panels and inverters dynamically
  const panels = products.filter(item => item.category === "Panel");
  const inverters = products.filter(item => item.category === "Inverter");

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading live inventory...</div>;
  }

  return (
    <section className="py-16 bg-white text-black font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- DYNAMIC SOLAR PANELS SECTION --- */}
        <div className="mb-16">
          <div className="border-l-4 border-green-600 pl-4 mb-8">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Available Solar Panels</h2>
            <p className="text-xs text-gray-500 font-medium">Live inventory fetched directly from database control panel.</p>
          </div>
          
          {panels.length === 0 ? (
            <p className="text-sm text-gray-400 font-mono">// No solar panels listed in admin panel yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {panels.map((panel) => (
                <div key={panel.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="bg-emerald-100 text-emerald-800 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md w-fit mb-3">
                      Premium Grade
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{panel.item_name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">High efficiency solar photovoltaic module optimized for maximum power generation in local climate conditions.</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200/60 flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-medium">Authorized Rate</span>
                    <span className="text-xl font-black text-emerald-600">Rs. {panel.price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- DYNAMIC INVERTERS SECTION --- */}
        <div>
          <div className="border-l-4 border-blue-600 pl-4 mb-8">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Smart Solar Inverters</h2>
            <p className="text-xs text-gray-500 font-medium">Manage and view grid-connected smart solar inverters.</p>
          </div>

          {inverters.length === 0 ? (
            <p className="text-sm text-gray-400 font-mono">// No inverters listed in admin panel yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {inverters.map((inverter) => (
                <div key={inverter.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="bg-blue-100 text-blue-800 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md w-fit mb-3">
                      Smart Sync
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{inverter.item_name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Advanced solar smart inverter featuring dual MPPT trackers, mobile app monitoring, and supreme surge protection.</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200/60 flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-medium">Live Market Price</span>
                    <span className="text-xl font-black text-blue-600">Rs. {inverter.price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}