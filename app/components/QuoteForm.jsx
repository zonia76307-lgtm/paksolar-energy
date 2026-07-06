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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Our solar expert will contact you soon with a customized quote.`);
    setFormData({ name: "", phone: "", city: "", monthlyBill: "", systemType: "hybrid", message: "" });
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
              placeholder="e.g. Ali Khan"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-gray-800"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-gray-500">Phone / WhatsApp Number *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. 03001234567"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-gray-800"
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
              placeholder="e.g. Lahore"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-gray-800"
            />
          </div>

          {/* Monthly Bill */}
          <div className="space-y-1.5">
            <label className="text-gray-500">Average Monthly Bill (Rs. ya Units) *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. 35,000 Rs"
              value={formData.monthlyBill}
              onChange={(e) => setFormData({...formData, monthlyBill: e.target.value})}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-gray-800"
            />
          </div>
        </div>

        {/* System Choice Dropdown */}
        <div className="space-y-1.5">
          <label className="text-gray-500">Preferred Solar System Type</label>
          <select 
            value={formData.systemType}
            onChange={(e) => setFormData({...formData, systemType: e.target.value})}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-gray-700 font-medium"
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
            placeholder="Tell us about your home appliances like AC, inverter fridge etc..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-gray-800 resize-none font-medium"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-green-100 uppercase tracking-wider text-center">
          Submit Request & Get Quote
        </button>

      </form>
    </div>
  );
}