"use client";
import { useState } from "react";

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    monthlyBill: "",
    systemType: "hybrid",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Backend database table variables ke mutabiq payload model set karna
    const payload = {
      customer_name: formData.name,
      phone_number: formData.phone,
      city: formData.city,
      // monthlyBill aur message ko extra parameters ke taur par text parsing de sakte hain ya text validation
      system_size_kw: null, // Custom metrics calculated directly or handled inside message logs
      estimated_total_price: null
    };

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(`Thank you ${formData.name}! Your request has been saved in our database. Our solar expert will contact you soon.`);
        // Form fields ko completely reset karna
        setFormData({ name: "", phone: "", city: "", monthlyBill: "", systemType: "hybrid", message: "" });
      } else {
        alert(`Error: ${result.error || "Failed to submit request"}`);
      }
    } catch (error) {
      console.error("Submission layout matrix error:", error);
      alert("Network Error: Could not connect to the database API stream.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-gray-500">Your Full Name *</label>
            <input 
              type="text" 
              required
              disabled={loading}
              placeholder="e.g. Ali Khan"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-gray-800 disabled:opacity-60"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-gray-500">Phone / WhatsApp Number *</label>
            <input 
              type="text" 
              required
              disabled={loading}
              placeholder="e.g. 03001234567"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-gray-800 disabled:opacity-60"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* City */}
          <div className="space-y-1.5">
            <label className="text-gray-500">Your City *</label>
            <input 
              type="text" 
              required
              disabled={loading}
              placeholder="e.g. Lahore"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-gray-800 disabled:opacity-60"
            />
          </div>

          {/* Monthly Bill */}
          <div className="space-y-1.5">
            <label className="text-gray-500">Average Monthly Bill (Rs. ya Units) *</label>
            <input 
              type="text" 
              required
              disabled={loading}
              placeholder="e.g. 35,000 Rs"
              value={formData.monthlyBill}
              onChange={(e) => setFormData({...formData, monthlyBill: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-gray-800 disabled:opacity-60"
            />
          </div>
        </div>

        {/* System Choice Dropdown */}
        <div className="space-y-1.5">
          <label className="text-gray-500">Preferred Solar System Type</label>
          <select 
            value={formData.systemType}
            disabled={loading}
            onChange={(e) => setFormData({...formData, systemType: e.target.value})}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-gray-700 font-medium disabled:opacity-60"
          >
            <option value="hybrid">Hybrid System (With Battery Backup)</option>
            <option value="ongrid">On-Grid System (Net Metering Support)</option>
            <option value="offgrid">Off-Grid System (Standalone)</option>
          </select>
        </div>

        {/* Message Input */}
        <div className="space-y-1.5">
          <label className="text-gray-500">Additional Message / Requirements (Optional)</label>
          <textarea 
            rows="4"
            disabled={loading}
            placeholder="Tell us about your home appliances like AC, inverter fridge etc..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-gray-800 resize-none font-medium disabled:opacity-60"
          ></textarea>
        </div>

        {/* Submit Button with Loading State Indicator */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-green-100 uppercase tracking-wider text-center disabled:bg-gray-400 disabled:shadow-none"
        >
          {loading ? "Submitting Request..." : "Submit Request & Get Quote"}
        </button>

      </form>
    </div>
  );
}