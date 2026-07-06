"use client";
import { useState } from "react";

export default function Calculator() {
  const [bill, setBill] = useState(20000);

  // Simple math for solar estimation based on average Pakistan tariff rates
  const estimatedKW = (bill / 1200).toFixed(1);
  const monthlySavings = (bill * 0.85).toFixed(0);

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
                onChange={(e) => setBill(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2">
                <span>Rs. 5,000</span>
                <span>Rs. 150,000+</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 flex gap-3 items-start">
              <span className="text-lg">📈</span>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Calculations are based on current 2026 standard peak/off-peak unit tariffs in Pakistan including general taxes.
              </p>
            </div>
          </div>

          {/* Right Side: Output Results */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <span className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">Recommended Size</span>
              <span className="text-3xl font-black text-gray-900">{estimatedKW > 0 ? estimatedKW : 0} <span className="text-sm font-bold text-amber-500">KW</span></span>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <span className="text-xs font-bold text-gray-400 block mb-1 uppercase tracking-wider">Monthly Savings</span>
              <span className="text-3xl font-black text-green-600"><span className="text-sm font-bold">Rs.</span> {Number(monthlySavings).toLocaleString()}</span>
            </div>

            <button className="col-span-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-xs transition-colors tracking-wide mt-2">
              Get Detailed Quote & Technical Audit
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}