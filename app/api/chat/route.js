import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `
      You are "Pak Solar AI Support", a professional, friendly, and helpful AI assistant for Pak Solar Energy. 
      Your goals are:
      1. Answer user queries about solar panels, systems (3KW, 5KW, 10KW, etc.), and estimation in Urdu (Roman Urdu) or English.
      2. Keep answers short, friendly, and professional.
      3. Use the following context when asked about rates/pricing: "The current live solar market price is approximately Rs. 32 per watt."
      4. Gently ask for the user's Name, Phone Number, and City if they ask for a detailed quote, so our team can call them back. Do not be pushy, but try to collect this contact info.
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: systemPrompt }] },
            ...messages.map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            })),
          ],
        }),
      }
    );

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, system currently busy hai. Please call our representative.";

    return NextResponse.json({ role: "assistant", content: botReply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}