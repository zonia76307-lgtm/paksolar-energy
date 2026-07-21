import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // 1. System instruction prompt jo bot ke behavior ko control karega
    const systemPrompt = "You are 'Pak Solar AI Support', a professional, friendly, and helpful AI assistant for Pak Solar Energy. Answer user queries about solar panels, systems (3KW, 5KW, 10KW, etc.), and estimation in Roman Urdu. Keep answers short. Ask for Name, Phone Number, and City if they need a quote.";

    // 🔴 TEST KEY: Agar aapki apni key kaam kare to yahan replace kar sakti hain
    const API_KEY = "AIzaSyA_Z9D3u2M-x_vR8N-X8jX7Wn9v5r8Q_yM";

    // 2. Chat history ko Gemini ke standard formats mein convert karna
    const formattedContents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // 3. API request body as per standard Gemini API specs
    const requestBody = {
      contents: formattedContents,
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      }
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();

    // Agar API direct error throw kare toh response screen par print karein
    if (data.error) {
      console.error("Gemini API Error Detail:", data.error);
      return NextResponse.json({ 
        role: "assistant", 
        content: `Google API Error: ${data.error.message} (Code: ${data.error.code})` 
      });
    }

    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!botReply) {
      return NextResponse.json({ 
        role: "assistant", 
        content: "API connection is fine, but no reply text was generated." 
      });
    }

    return NextResponse.json({ role: "assistant", content: botReply });

  } catch (error) {
    console.error("Chat API Error:", error);
    // Yeh error tabhi show hoga jab Next.js ka code server par break ho jaye
    return NextResponse.json({ 
      role: "assistant", 
      content: `Internal Server Error: ${error.message}` 
    }, { status: 500 });
  }
}