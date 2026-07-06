export default function Process() {
  const steps = [
    { num: "01", title: "Free Survey", desc: "Our engineering experts analyze your roof area and structural stability layout." },
    { num: "02", title: "Customized 3D Design", desc: "We craft optimal shadow-free mechanical structures for maximum panel yield." },
    { num: "03", title: "Fast Deployment", desc: "Professional execution and electrical wiring completed within 5-7 working days." },
    { num: "04", title: "Green Metering", desc: "Complete documentation assistance to get NEPRA licensing activated seamlessly." }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Our Seamless Installation Process
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((s, i) => (
            <div key={i} className="relative space-y-3">
              <span className="text-4xl font-black text-green-100 block tracking-wider">{s.num}</span>
              <h3 className="text-base font-bold text-gray-900">{s.title}</h3>
              <p className="text-gray-500 text-xs font-medium leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}