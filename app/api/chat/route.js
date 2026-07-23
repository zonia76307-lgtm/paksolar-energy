import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Pak Solar Assistant, a concise and trustworthy solar consultant for Pak Solar Energy in Pakistan.

Rules:
- Reply in Roman Urdu when the customer uses Urdu or Roman Urdu; otherwise reply in English.
- Help with panels, inverters, system sizing, batteries, installation, and quote requests.
- Never claim that an estimate is a live market rate. Explain that prices vary by brand, city, stock, and installation requirements.
- For a precise quote, direct the customer to /get-free-quote.
- Keep replies brief, practical, and polite.`;

function validMessages(value) {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item) =>
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim()
    )
    .slice(-10)
    .map(({ role, content }) => ({ role, content: content.trim().slice(0, 4000) }));
}

async function askGemini(apiKey, messages) {
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages.map(({ role, content }) => ({
          role: role === "assistant" ? "model" : "user",
          parts: [{ text: content }],
        })),
        generationConfig: { temperature: 0.5, maxOutputTokens: 500 },
      }),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || `Gemini request failed (${response.status})`);
  }

  return data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();
}

async function askGrok(apiKey, messages) {
  const response = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.GROK_MODEL || "grok-3-latest",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.5,
      max_tokens: 500,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    const providerMessage =
      (typeof data?.error === "string" && data.error) ||
      data?.error?.message ||
      data?.message;
    throw new Error(providerMessage || `Grok request failed (${response.status})`);
  }

  return data?.choices?.[0]?.message?.content?.trim();
}

async function askGroq(apiKey, messages) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.5,
      max_completion_tokens: 500,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    const providerMessage =
      (typeof data?.error === "string" && data.error) ||
      data?.error?.message ||
      data?.message;
    throw new Error(providerMessage || `Groq request failed (${response.status})`);
  }

  return data?.choices?.[0]?.message?.content?.trim();
}

export async function POST(request) {
  try {
    const body = await request.json();
    const messages = validMessages(body.messages);
    const singleMessage = typeof body.message === "string" ? body.message.trim() : "";

    if (!messages.length && singleMessage) {
      messages.push({ role: "user", content: singleMessage.slice(0, 4000) });
    }

    if (!messages.length || messages.at(-1)?.role !== "user") {
      return NextResponse.json({ error: "A user message is required." }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const configuredGroqKey = process.env.GROQ_API_KEY;
    const legacyKey = process.env.GROK_API_KEY;
    const groqKey = configuredGroqKey || (legacyKey?.startsWith("gsk_") ? legacyKey : undefined);
    const grokKey = legacyKey?.startsWith("xai-") ? legacyKey : process.env.XAI_API_KEY;

    if (!geminiKey && !groqKey && !grokKey) {
      return NextResponse.json(
        { error: "Chat is not configured. Add GEMINI_API_KEY, GROQ_API_KEY, or XAI_API_KEY." },
        { status: 503 }
      );
    }

    const reply = geminiKey
      ? await askGemini(geminiKey, messages)
      : groqKey
        ? await askGroq(groqKey, messages)
        : await askGrok(grokKey, messages);

    if (!reply) {
      return NextResponse.json({ error: "The AI provider returned an empty response." }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Chat request failed." },
      { status: 502 }
    );
  }
}