"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Real-world 2026 Estimated Complete Solar System Packages for Pakistan
const solarPackages = [
  {
    id: 1,
    name: "3 KW Smart Eco Package",
    type: "On-Grid / Hybrid Option",
    price: "345,000",
    load: "1 Inverter AC (1.5 Ton), 4 Fans, 10 Lights, 1 LED TV, 1 Fridge.",
    specs: [
      "Tier-1 Longi/Jinko 575W+ Panels",
      "3 KW Smart Pure Sine Wave Inverter",
      "Premium L2 Galvanized Roof Structure",
      "High-Quality Copper Wiring & AC/DC Breakers",
      "Complete Onsite Installation Included"
    ],
    badge: "Budget Friendly",
    popular: false
  },
  {
    id: 2,
    name: "5 KW Premium Home Package",
    type: "Net-Metering Ready System",
    price: "585,000",
    load: "2 Inverter ACs (1.5 Ton), 6 Fans, 15 Lights, Water Pump, Fridge.",
    specs: [
      "Tier-1 N-Type BiFacial Solar Panels",
      "5 KW European Standard Smart Inverter",
      "Custom Raised Custom Shadow-Free Structure",
      "Full Earthing Protection & Surge Devices",
      "Complete Net-Metering Paperwork Assistance"
    ],
    badge: "Most Popular",
    popular: true
  },
  {
    id: 3,
    name: "10 KW Max Power Package",
    type: "Three-Phase Net-Metering System",
    price: "975,000",
    load: "4 Inverter ACs, 10 Fans, Complete Home Lighting, Microwave, Deep Freezer.",
    specs: [
      "Tier-1 High-Efficiency TopCon Panels",
      "10 KW Three-Phase Dual Output Inverter",
      "Heavy-Duty Customized Mechanical Structure",
      "Advanced Lightning Arrestor & Safety Boxes",
      "Turnkey Net-Metering License Activation"
    ],
    badge: "Full Independence",
    popular: false
  }
];

export default function Packages() {
  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col justify-between">
      <div>
        <Header />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Top Banner Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              📦 All-In-One Deals
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Turnkey Solar <span className="text-green-600">Installation Packages</span>
            </h1>
            <p className="text-gray-500 font-medium text-xs sm:text-sm">
              Complete structural and electrical solar solutions with upfront itemization. No hidden costs or unmentioned handling fees.
            </p>
          </div>

          {/* Pricing Packages Grids */}
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {solarPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative border transition-all duration-300 ${
                  pkg.popular 
                    ? "border-green-500 shadow-xl lg:scale-105 z-10" 
                    : "border-gray-100 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Popularity Badge Ribbons */}
                {pkg.badge && (
                  <span className={`absolute -top-3 left-6 text-[10px] font-bold px-3 py-1 rounded-full text-white tracking-wide uppercase ${
                    pkg.popular ? "bg-green-600" : "bg-gray-900"
                  }`}>
                    {pkg.badge}
                  </span>
                )}

                <div>
                  {/* Package Head */}
                  <span className="text-[10px] text-gray-400 font-bold tracking-wider uppercase block mb-1">
                    {pkg.type}
                  </span>
                  <h3 className="text-xl font-black text-gray-900 mb-4">{pkg.name}</h3>
                  
                  {/* Price Section */}
                  <div className="mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Estimated Setup Price</span>
                    <span className="text-2xl sm:text-3xl font-black text-gray-900">
                      Rs. {pkg.price}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400 block mt-0.5">*Varies slightly by structure height</span>
                  </div>

                  {/* Appliance Load Capacity */}
                  <div className="mb-6 space-y-1">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">Estimated Load Capacity:</span>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed bg-amber-50/50 p-3 rounded-xl border border-amber-100/60">
                      {pkg.load}
                    </p>
                  </div>

                  {/* Hardware Deliverables List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">What's Included:</span>
                    <ul className="space-y-2.5">
                      {pkg.specs.map((spec, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs text-gray-600 font-semibold leading-tight">
                          <span className="text-green-600 text-sm">✔</span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Final Booking Button */}
                <button className={`w-full font-bold py-4 rounded-xl text-xs tracking-wide transition-colors ${
                  pkg.popular 
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-100" 
                    : "bg-gray-900 hover:bg-green-600 text-white"
                }`}>
                  Book Free Site Survey
                </button>

              </div>
            ))}
          </div>

          {/* Warranty Terms Note */}
          <div className="mt-16 bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 max-w-4xl mx-auto">
            <span className="text-lg">🛡️</span>
            <p className="text-xs sm:text-sm text-blue-900 font-medium leading-relaxed">
              <strong>Warranty Coverage & Standard Guards:</strong> All packages carry a standard 25-year linear performance warranty for solar plates and a 5-year replacement warranty on smart string inverters.
            </p>
          </div>

        </section>
      </div>

      <Footer />
    </main>
  );
}