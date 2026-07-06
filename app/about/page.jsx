"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Local Portfolio Data (Shops, Hospitals & Plazas)
const localProjects = [
  {
    id: 1,
    type: "Hospital Setup",
    name: "Al-Shafa Medical Complex & Care Hospital",
    capacity: "45 KW Net-Metering System",
    desc: "Installed customized heavy-duty hybrid solar setup to ensure 24/7 continuous power backup for critical ICU equipment and operation theaters.",
    badge: "Medical Sector",
    icon: "🏥"
  },
  {
    id: 2,
    type: "Commercial Shop / Mart",
    name: "Madina Super Mart & Commercial Plaza",
    capacity: "25 KW On-Grid System",
    desc: "Successfully slashed their monthly commercial electricity bill by 80% using high-efficiency Jinko N-Type panels and smart net-metering synchronization.",
    badge: "Retail Sector",
    icon: "🛍️"
  },
  {
    id: 3,
    type: "Corporate Office",
    name: "Skyline Traders & Logistics Hub",
    capacity: "15 KW Hybrid System",
    desc: "Complete roof layout optimization with custom shadow-free mechanical structures to maximize power generation for day-shift office loads.",
    badge: "Corporate",
    icon: "🏢"
  }
];

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col justify-between">
      <div>
        <Header />

        {/* Hero Banner Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-16 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
            <span className="bg-green-100 text-green-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              ☀️ Who We Are
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Empowering Our City With <br />
              <span className="text-green-600">Clean & Honest Solar Energy</span>
            </h1>
            <p className="text-gray-500 font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              We are a dedicated team of certified engineers providing transparent solar pricing and pixel-perfect execution. No hidden fees, no compromised hardware—just pure performance.
            </p>
          </div>
        </section>

        {/* Local Portfolio / Installed Locations Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-2">
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wide">
              📍 Local Footprints
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Our Successful Installations In The City
            </h2>
            <p className="text-gray-500 font-medium text-xs sm:text-sm">
              Real projects executed for prominent local businesses, healthcare centers, and commercial hubs.
            </p>
          </div>

          {/* Projects Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {localProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon & Badge Row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl bg-gray-50 w-12 h-12 flex items-center justify-center rounded-xl group-hover:bg-green-50 transition-colors">
                      {project.icon}
                    </span>
                    <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {project.badge}
                    </span>
                  </div>

                  {/* Text Content */}
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    {project.type}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-green-600 transition-colors mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-500 font-medium text-xs leading-relaxed mb-6">
                    {project.desc}
                  </p>
                </div>

                {/* Capacity Counter Footer inside Card */}
                <div className="border-t border-gray-50 pt-4 mt-auto flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Verified Capacity</span>
                  <span className="text-sm font-black text-gray-800 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    {project.capacity}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </section>

      </div>
      
      <Footer />
    </main>
  );
}