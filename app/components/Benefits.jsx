export default function Benefits() {
  const points = [
    { icon: "🔋", title: "Zero Load-shedding", desc: "Hybrid & Off-grid storage solutions ensure your fans and ACs never stop working." },
    { icon: "💸", title: "Net Metering Enabled", desc: "Sell excess solar electricity back to the grid (WAPDA) and get negative monthly bills." },
    { icon: "🛡️", title: "25 Years Warranty", desc: "We only install authentic Tier-1 panels backed with linear performance warranty cards." },
    { icon: "🛠️", title: "Free Roof Maintenance", desc: "Complimentary performance checks and structural evaluation during the first year." }
  ];

  return (
    <section className="py-16 bg-gray-50/40 border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Why Hundreds of Pakistani Homes <br/>
            Trust <span className="text-green-600">Pak Solar Energy</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p, i) => (
            <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:translate-y-[-4px] transition-transform duration-300">
              <span className="text-3xl block mb-4 bg-gray-50 w-12 h-12 flex items-center justify-center rounded-xl">{p.icon}</span>
              <h3 className="text-base font-bold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-gray-500 text-xs font-medium leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}