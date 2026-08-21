"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, Bot, User } from "lucide-react";
import Image from "next/image";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "Hi! I'm the VerleSMP AI Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to get AI response");

      setMessages((prev) => [...prev, { role: "model", content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "Oops! Something went wrong connecting to my servers. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[350px] max-h-[500px] flex flex-col glass border border-[#7f5af0]/30 rounded-2xl shadow-[0_8px_32px_rgba(127,90,240,0.15)] animate-fade-up overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#7f5af0]/10 border-b border-[#7f5af0]/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00ffab] to-[#7f5af0] flex items-center justify-center shadow-lg">
                <Bot size={16} className="text-[#0d1117]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#f0f6fc]">Verle AI</h3>
                <p className="text-[10px] text-[#00ffab] font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ffab] animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-[#8b949e] hover:text-[#ff4d6d] hover:bg-[#ff4d6d]/10 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[350px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className="shrink-0 mt-0.5">
                  {m.role === "user" ? (
                    <Image
                      src="https://cravatar.eu/helmavatar/Steve/24.png"
                      alt="You"
                      width={24}
                      height={24}
                      className="rounded bg-white/5"
                      unoptimized
                    />
                  ) : (
                    <div className="w-6 h-6 rounded bg-[#7f5af0]/20 flex items-center justify-center border border-[#7f5af0]/30">
                      <Bot size={12} className="text-[#7f5af0]" />
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`px-3.5 py-2.5 rounded-2xl max-w-[80%] text-sm leading-relaxed ${m.role === "user"
                    ? "bg-[#00ffab]/10 border border-[#00ffab]/20 text-[#f0f6fc] rounded-tr-sm"
                    : "bg-white/5 border border-white/10 text-[#c9d1d9] rounded-tl-sm"
                    }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5">
                <div className="w-6 h-6 rounded bg-[#7f5af0]/20 flex items-center justify-center border border-[#7f5af0]/30 shrink-0">
                  <Bot size={12} className="text-[#7f5af0]" />
                </div>
                <div className="px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm flex items-center gap-1.5 h-[42px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7f5af0] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7f5af0] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7f5af0] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-white/5 bg-[#161b22]/50 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-[#f0f6fc] placeholder:text-[#8b949e] focus:outline-none focus:border-[#7f5af0]/50 transition-colors"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-[#7f5af0] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#6244d4] transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* ── Floating Toggle Button ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(127,90,240,0.4)] transition-transform duration-300 hover:scale-110 ${isOpen ? "bg-white/10 text-white" : "bg-gradient-to-tr from-[#7f5af0] to-[#00ffab] text-[#0d1117]"
          }`}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} fill="currentColor" className="mt-0.5 ml-[-1px]" />}
      </button>
    </div>
  );
}
