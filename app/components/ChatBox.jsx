"use client";

import { useEffect, useRef, useState } from "react";

// --- Inline SVG Icons (Lucide dependency removed to fix Module Not Found error) ---
function BotIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
    </svg>
  );
}

function LoaderIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function MessageCircleIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function SendIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.1 18.7 6 15.4a7.2 7.2 0 1 1 2.8 2.7l-3.7.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.3 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c-.1.1-.2.3 0 .5.5.9 1.2 1.6 2.1 2.1.2.1.4.1.5-.1l.5-.6c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.6 0 .5-.2 1-.6 1.3-.5.4-1.2.6-1.9.5-1.5-.2-3.1-1-4.4-2.3-1.3-1.3-2.2-2.9-2.4-4.4-.1-.7.1-1.3.5-1.8.2-.3.4-.6.8-.9Z" fill="currentColor" />
    </svg>
  );
}

const initialMessages = [];

const quickActions = [
  { label: "Solar Rates", message: "Longi aur Canadian plates ke current rates kya hain?" },
  { label: "Free Quote", message: "Mujhe solar installation ke liye quote chahiye" },
  { label: "Inverters", message: "Top solar inverters konsay hain?" },
  { label: "Packages", message: "Complete 5kW system package ka kya kharcha hai?" },
];

function createId(prefix = "msg") {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function cleanMarkdownMarks(value) {
  return value
    .replace(/^#{1,6}\s*/, "")
    .replace(/\*\*/g, "*")
    .replace(/^\*+|\*+$/g, "")
    .trim();
}

function stripInlineMarkdown(value) {
  return value.replace(/[*_`]/g, "");
}

function normalizeLinkHref(value) {
  const cleanValue = value.trim().replace(/[.,;:]+$/, "");
  if (/^(https?:|tel:|mailto:)/i.test(cleanValue)) {
    return cleanValue;
  }
  return `https://${cleanValue.replace(/^\/+/, "")}`;
}

function renderLink(label, href, key) {
  const cleanHref = normalizeLinkHref(href);
  const cleanLabel = stripInlineMarkdown(label).trim().replace(/[.,;:]+$/, "");
  return (
    <a
      key={key}
      href={cleanHref}
      target={cleanHref.startsWith("http") ? "_blank" : undefined}
      rel={cleanHref.startsWith("http") ? "noreferrer" : undefined}
      className="break-words font-semibold text-green-700 underline underline-offset-2"
    >
      {cleanLabel || cleanHref.replace(/^https?:\/\//, "")}
    </a>
  );
}

function renderInlineText(line) {
  const cleanLine = line
    .replace(/\*\*/g, "*")
    .replace(/(^|\s)([A-Z][A-Za-z &/-]{2,40}):\*/g, "$1*$2:*");
  const tokenPattern =
    /(\[[^\]]+\]\((?:https?:\/\/|www\.|(?:[a-z0-9-]+\.)+[a-z]{2,})[^)\s]*\)|\*[^*]+\*|https?:\/\/[^\s)\]]+|www\.[^\s)\]]+|(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s)\]]*)?)/gi;
  const elements = [];
  let cursor = 0;
  let match;
  while ((match = tokenPattern.exec(cleanLine))) {
    const [token] = match;
    if (match.index > cursor) {
      const text = stripInlineMarkdown(cleanLine.slice(cursor, match.index));
      if (text) {
        elements.push(<span key={`text-${cursor}`}>{text}</span>);
      }
    }
    const markdownLink = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (markdownLink) {
      elements.push(renderLink(markdownLink[1], markdownLink[2], `link-${match.index}`));
    } else if (token.startsWith("*") && token.endsWith("*")) {
      elements.push(<strong key={`bold-${match.index}`}>{stripInlineMarkdown(token)}</strong>);
    } else {
      elements.push(renderLink(token.replace(/^https?:\/\//, ""), token, `link-${match.index}`));
    }
    cursor = match.index + token.length;
  }
  if (cursor < cleanLine.length) {
    const text = stripInlineMarkdown(cleanLine.slice(cursor));
    if (text) {
      elements.push(<span key={`text-${cursor}`}>{text}</span>);
    }
  }
  return elements.length ? elements : <span>{stripInlineMarkdown(cleanLine)}</span>;
}

function renderMessageText(content) {
  const lines = content.split("\n");
  const elements = [];
  lines.forEach((rawLine, index) => {
    const trimmed = rawLine.trim();
    if (!trimmed || /^-{3,}$/.test(trimmed)) return;
    const isHeading = /^#{1,6}\s+/.test(trimmed);
    const bullet = trimmed.match(/^[-*•]\s+(.+)$/);
    const numbered = trimmed.match(/^(\d+)[.)]\s+(.+)$/);
    const line = cleanMarkdownMarks(bullet?.[1] ?? numbered?.[2] ?? trimmed);
    if (!line) return;
    const key = `${line}-${index}`;
    if (numbered) {
      elements.push(
        <div key={key} className="mt-1.5 flex gap-2 first:mt-0">
          <span className="w-5 shrink-0 text-right text-[12px] font-bold opacity-70">
            {numbered[1]}.
          </span>
          <span className="min-w-0">{renderInlineText(cleanMarkdownMarks(numbered[2]))}</span>
        </div>
      );
      return;
    }
    if (bullet) {
      elements.push(
        <div key={key} className="mt-1.5 flex gap-2 first:mt-0">
          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50" />
          <span className="min-w-0">{renderInlineText(line)}</span>
        </div>
      );
      return;
    }
    elements.push(
      <p
        key={key}
        className={
          isHeading ? "mt-3 first:mt-0 text-[13px] font-bold leading-snug" : "mt-1.5 first:mt-0"
        }
      >
        {renderInlineText(line)}
      </p>
    );
  });
  return elements.length ? elements : <p>{renderInlineText(content)}</p>;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending, open]);

  async function sendMessage(rawMessage) {
    const message = rawMessage.trim();
    if (!message || sending) return;

    setInput("");
    setSending(true);

    setMessages((current) => [
      ...current,
      { id: createId("user"), role: "user", content: message },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Chat request failed.");
      }

      setMessages((current) => [
        ...current,
        {
          id: createId("assistant"),
          role: "assistant",
          content:
            typeof payload?.reply === "string"
              ? payload.reply
              : "Shukriya! Live assistance ke liye hum se WhatsApp par rabta karein.",
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((current) => [
        ...current,
        {
          id: createId("assistant"),
          role: "assistant",
          content: [
            "Network issue ki wajah se response nahi mil saka.",
            "",
            "Call ya WhatsApp par rabta karein:",
            "📞 +92 300 0000000",
            "",
            "Ya website par free quote submit karein:",
            "https://paksolar-energy.vercel.app/get-free-quote",
          ].join("\n"),
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div
      className={
        open
          ? "fixed inset-x-2 bottom-4 top-4 z-50 flex flex-col sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-auto sm:block"
          : "fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
      }
    >
      {open ? (
        <section
          className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl sm:mb-3 sm:h-[min(42rem,calc(100dvh-7rem))] sm:w-[24rem] sm:max-w-[24rem] sm:flex-none"
          aria-label="Pak Solar Energy chat"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-green-700 px-4 py-3 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-green-800 text-white">
                <BotIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold">Pak Solar Assistant</h2>
                <p className="truncate text-xs text-green-100">Live Rates & Solutions</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-green-100 transition-colors hover:bg-green-800 hover:text-white"
              aria-label="Close chat"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-4">
            <div className="space-y-3">
              {messages.length === 0 && (
                <div className="py-12 text-center text-xs text-gray-400">
                  👋 Ask about solar panels, live rates, or inverters...
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      "break-words rounded-xl px-3 py-2 text-[13px] leading-5 shadow-sm " +
                      (message.role === "user"
                        ? "max-w-[82%] bg-green-600 text-white"
                        : "max-w-[90%] border border-gray-200 bg-white text-gray-800")
                    }
                  >
                    {renderMessageText(message.content)}
                  </div>
                </div>
              ))}

              {sending && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-sm">
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                    Searching details...
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </div>

          {/* Quick Buttons & Input Form */}
          <div className="border-t border-gray-200 bg-white p-3">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  disabled={sending}
                  onClick={() => void sendMessage(action.message)}
                  className="shrink-0 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700 disabled:opacity-50 cursor-pointer"
                >
                  {action.label}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask Pak Solar Assistant..."
                className="min-w-0 flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition-shadow text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-green-600/35"
              />
              <button
                type="submit"
                disabled={!input.trim() || sending}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-green-600 text-white shadow-sm transition-colors hover:bg-green-700 disabled:opacity-50 cursor-pointer"
                aria-label="Send message"
              >
                {sending ? <LoaderIcon className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
              </button>
            </form>
          </div>
        </section>
      ) : null}

      {/* Floating Trigger Buttons */}
      <div className={open ? "hidden items-center justify-end gap-2 sm:flex" : "flex items-center justify-end gap-2"}>
        {open && (
          <a
            href="https://wa.me/923000000000"
            target="_blank"
            rel="noreferrer"
            className="hidden h-12 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-800 shadow-lg transition-colors hover:bg-gray-50 sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4 text-green-600" />
            WhatsApp
          </a>
        )}
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-600 text-white shadow-xl transition-transform hover:-translate-y-0.5 hover:bg-green-700 cursor-pointer"
          aria-label={open ? "Hide chat" : "Open chat"}
        >
          {open ? <XIcon className="h-6 w-6" /> : <MessageCircleIcon className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}