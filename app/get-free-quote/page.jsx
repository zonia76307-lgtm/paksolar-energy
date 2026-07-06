"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuoteForm from "../components/QuoteForm"; // 👈 Line 5: Ensure 'QuoteForm.jsx' exists exactly like this inside app/components/

export default function FreeQuotePage() {
  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col justify-between text-gray-800">
      <div>
        <Header />

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="bg-green-100 text-green-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Instant Estimation
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Request a <span className="text-green-600">Free Solar Quote</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Apne ghar ya business ka bill submit karein aur hamare solar experts se mukammal kharche ka andaza muft maloom karein.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="space-y-4 md:col-span-1">
              <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-50 pb-2">
                  Direct Support
                </h3>
                <div className="space-y-3 text-xs font-semibold">
                  <div className="flex gap-3 items-center">
                    <span className="text-lg">📞</span>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Call Or WhatsApp</span>
                      <a href="tel:+923000000000" className="text-gray-800 hover:text-green-600">+92 300 0000000</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <QuoteForm />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}