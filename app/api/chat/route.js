import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error("❌ GROQ_API_KEY is missing in .env.local");
      return NextResponse.json({
        reply: "System Note: GROQ_API_KEY missing hai. .env.local file check karein."
      });
    }

    const systemPrompt = `
      You are an expert AI solar consultant for 'Pak Solar Energy' in Pakistan.

      Rules:
      1. If asked in Urdu/Roman Urdu, reply in Roman Urdu. If in English, reply in English.
      2. Keep replies short, precise, direct and polite.
      3. Solar plates rate in Pakistan: ~Rs. 28-34 per watt (Longi Hi-MO 6/7, Canadian N-Type, Jinko).
      4. For complete 3kW/5kW/10kW packages or quotes, give rough estimate and ask them to contact WhatsApp/Team (+92 300 0000000).
    `;

    // Groq API Endpoint Call (Using Groq Llama 3.3 Model)
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Groq API Error Response:", data);
      return NextResponse.json({
        reply: `API Error: ${data?.error?.message || "Groq API response failed"}`
      });
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (reply) {
      return NextResponse.json({ reply }, { status: 200 });
    } else {
      return NextResponse.json({
        reply: "Maazrat, Groq response generate nahi ho saka."
      });
    }

  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json(
      { reply: "Server error occurred. Please try again." },
      { status: 500 }
    );
  }
}