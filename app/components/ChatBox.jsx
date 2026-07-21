"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Assalam-o-Alaikum! Main Pak Solar AI Assistant hoon. Aaj main aapki solar calculations ya packages ke hawale se kya madad kar sakta hoon?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      // Agar server 200 ke ilawa koi status de
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Chat Response Data:", data); // 👈 Browser console mein response data debug karne ke liye

      // Check karein ke response mein actual data standard form mein hai ya nahi
      if (data && data.content) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      } else if (data && data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `API Error: ${data.error}` }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Server se khali response mila hai." }
        ]);
      }
    } catch (error) {
      console.error("Frontend Chat Fetch Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Technical Error: ${error.message}. Please refresh page.` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 1. Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center cursor-pointer border-none"
        >
          {/* Chat Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 18a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 13.172 3 11.24 3 9c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        </button>
      )}

      {/* 2. Chat Window */}
      {isOpen && (
        <div className="bg-white w-[350px] h-[480px] rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-300 animate-pulse"></span>
              <div>
                <h4 className="text-sm font-bold leading-none">Pak Solar Assistant</h4>
                <span className="text-[10px] text-green-100">Active (AI Online)</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 text-2xl font-semibold cursor-pointer border-none bg-transparent">
              ×
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/60">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-[13px] leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 text-gray-400 rounded-2xl rounded-bl-none px-4 py-2 text-xs shadow-sm flex items-center gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce [animation-delay:0.2s]">●</span>
                  <span className="animate-bounce [animation-delay:0.4s]">●</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sawal likhein..."
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-green-600 text-black"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors border-none"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}