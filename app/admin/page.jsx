"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // 🟢 Supabase Client Import
import { useRouter } from "next/navigation"; // 🟢 Router Import for Redirect
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AdminDashboard() {
  const router = useRouter();
  
  // 🟢 Auth States
  const [authChecking, setAuthChecking] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");

  // 🟢 Form States
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Panel");
  const [imageUrl, setImageUrl] = useState("");
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // 🟢 SECURITY CHECK: Verify Active Session
  useEffect(() => {
    async function checkAuthUser() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Unauthenticated access attempt: Redirect to login
        router.push("/admin/login");
      } else {
        setAdminEmail(session.user?.email || "Admin");
        setAuthChecking(false);
      }
    }
    checkAuthUser();
  }, [router]);

  // 🟢 LOGOUT HANDLER
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // 1. Fetch existing rates to show in table
  async function fetchRates() {
    try {
      const res = await fetch("/api/rates");
      const data = await res.json();
      if (res.ok) setRates(data);
    } catch (err) {
      console.error("Failed to fetch rates:", err);
    }
  }

  useEffect(() => {
    if (!authChecking) {
      fetchRates();
    }
  }, [authChecking]);

  // 2. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName || !price || !category) {
      setMessage({ text: "Please fill all fields!", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_name: itemName,
          price: Number(price),
          category: category,
          image_url: imageUrl,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: "Product added successfully with image! 🎉", type: "success" });
        setItemName("");
        setPrice("");
        setImageUrl("");
        fetchRates();
      } else {
        setMessage({ text: data.error || "Failed to save product.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Server communication error!", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Delete Item
  const handleDelete = async (id) => {
    if (!window.confirm("Kya aap waqai is item ko delete karna chahte hain?")) return;
    
    try {
      const res = await fetch(`/api/rates?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessage({ text: "Item deleted successfully! 🗑️", type: "success" });
        fetchRates();
      } else {
        setMessage({ text: "Failed to delete item.", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Error deleting item.", type: "error" });
    }
  };

  // 🟢 Loading screen while verifying auth session
  if (authChecking) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-xs uppercase text-gray-400 tracking-widest animate-pulse">
        🛡️ Verifying Admin Session...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 flex flex-col justify-between text-gray-800 font-sans">
      <div>
        <Header />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header Title & Admin Session Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-green-100 text-green-800">
                🟢 Session Active ({adminEmail})
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Control Panel & <span className="text-green-600">Live Inventory</span>
              </h1>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all border border-red-100 cursor-pointer"
            >
              🚪 Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* FORM CONTAINER */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-md font-bold mb-5 text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <span>➕</span> Add New Product
              </h2>
              
              {message.text && (
                <div className={`p-3 rounded-xl text-xs font-bold mb-4 border ${
                  message.type === "success" 
                    ? "bg-green-50 text-green-800 border-green-200" 
                    : "bg-red-50 text-red-800 border-red-200"
                }`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Product Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Jinko Tiger Neo 705W"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-medium text-gray-700 focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    placeholder="e.g. 42"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-medium text-gray-700 focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Select Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-bold text-gray-600 focus:outline-none focus:border-green-500 cursor-pointer"
                  >
                    <option value="Panel">⚡ Solar Panel (Base Plate)</option>
                    <option value="Inverter">🔌 Inverter System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Product Image URL</label>
                  <input
                    type="text"
                    placeholder="e.g. https://images.unsplash.com/...jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-medium text-gray-700 focus:outline-none focus:border-green-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-200 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-green-100 cursor-pointer"
                >
                  {loading ? "Syncing with Database..." : "Publish to Live Site"}
                </button>
              </form>
            </div>

            {/* LIVE INVENTORY TABLE CONTAINER */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-md font-bold mb-5 text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <span>📊</span> Database Live Sync Table
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                      <th className="py-3 px-2 w-16">Preview</th>
                      <th className="py-3 px-2">Product Details</th>
                      <th className="py-3 px-2">Category</th>
                      <th className="py-3 px-2 text-right">Price</th>
                      <th className="py-3 px-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {rates.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-12 text-center text-gray-400 font-medium font-sans">
                          🔍 No entries recorded in database. Please add items.
                        </td>
                      </tr>
                    ) : (
                      rates.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition duration-150">
                          
                          <td className="py-3 px-2">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden flex items-center justify-center shadow-sm">
                              {item.image_url ? (
                                <img 
                                  src={item.image_url} 
                                  alt={item.item_name}
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <span className="text-[10px] text-gray-400">No Img</span>
                              )}
                            </div>
                          </td>

                          <td className="py-3.5 px-2 font-bold text-gray-900">{item.item_name}</td>
                          <td className="py-3.5 px-2">
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              item.category?.toLowerCase().includes("inverter") 
                                ? "bg-blue-50 text-blue-700 border border-blue-100" 
                                : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            }`}>
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-2 text-right font-black text-[#D93838] text-sm">
                            Rs. {item.price?.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-2 text-center">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-500 hover:text-red-700 font-bold bg-red-50 hover:bg-red-100/70 px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-[10px]"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}