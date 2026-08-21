"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  X,
  Coins,
  CreditCard,
  AlertTriangle,
  Copy,
  Check,
  Zap,
  ExternalLink,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/cartStore";
import { useCheckoutStore } from "@/lib/checkoutStore";
import { supabase } from "@/lib/supabase";
import Toast, { type ToastType } from "@/components/Toast";

/* ─────────────────────────────────────────
   Constants
───────────────────────────────────────── */
const BKASH_NUMBER = "01882121821";
type Tab = "coins" | "bkash";

/* ─────────────────────────────────────────
   Toast state helper (local, not global)
───────────────────────────────────────── */
interface ToastState {
  message: string;
  type: ToastType;
}

/* ─────────────────────────────────────────
   Tab: Pay with In-Game Coins
───────────────────────────────────────── */
function CoinsTab({
  totalPrice,
  onSuccess,
}: {
  totalPrice: number;
  onSuccess: () => void;
}) {
  const [ign, setIgn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      if (!ign.trim()) {
        setError("Player IGN is required.");
        return;
      }
      setLoading(true);
      try {
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
        const { error: dbError } = await supabase.from("orders").insert({
          order_id: orderId,
          player_ign: ign.trim(),
          user_email: "guest@verlesmp.net",
          items: items,
          total_price: totalPrice,
          payment_method: "coins",
          status: "pending",
        });
        if (dbError) throw dbError;
        clearCart();
        onSuccess();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to place order.";
        // If Supabase not configured, show helpful message
        if (msg.includes("YOUR_SUPABASE")) {
          setError("Supabase is not yet configured. Connect your database first.");
        } else {
          setError(msg);
        }
      } finally {
        setLoading(false);
      }
    },
    [ign, items, totalPrice, clearCart, onSuccess]
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Coin balance display */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#00ffab]/5 border border-[#00ffab]/20">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🪙</span>
          <div>
            <p className="text-xs text-[#8b949e]">Order Total</p>
            <p className="text-xl font-extrabold font-mono text-[#00ffab]">
              ৳ {totalPrice.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#8b949e]">Payment via</p>
          <p className="text-sm font-bold text-[#f0f6fc]">In-game Coins</p>
        </div>
      </div>

      {/* Player IGN — HIGHEST PRIORITY */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="coins-ign"
          className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-2"
        >
          <Image
            src="https://cravatar.eu/helmavatar/Steve/20.png"
            alt="MC Head"
            width={20}
            height={20}
            unoptimized
            className="rounded-sm"
          />
          Player IGN{" "}
          <span className="text-[#ff4d6d] text-xs font-normal">(required)</span>
        </label>
        <input
          id="coins-ign"
          type="text"
          placeholder="e.g. Notch, xX_ProPlayer_Xx"
          value={ign}
          onChange={(e) => setIgn(e.target.value)}
          maxLength={16}
          autoComplete="off"
          spellCheck={false}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#f0f6fc] placeholder-[#8b949e]/60 font-mono text-sm focus:outline-none focus:border-[#00ffab]/50 focus:ring-1 focus:ring-[#00ffab]/20 transition-all"
        />
        <p className="text-xs text-[#8b949e]">
          Enter the exact in-game name your Minecraft account uses on this server.
        </p>
      </div>

      {error && (
        <p className="text-sm text-[#ff4d6d] bg-[#ff4d6d]/10 border border-[#ff4d6d]/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-neon-green w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Placing Order…
          </>
        ) : (
          <>
            <Zap size={16} />
            Confirm &amp; Pay with Coins
          </>
        )}
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────
   Tab: Manual bKash Payment
───────────────────────────────────────── */
function BkashTab({
  totalPrice,
  onSuccess,
}: {
  totalPrice: number;
  onSuccess: () => void;
}) {
  const [ign, setIgn] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ticketCopied, setTicketCopied] = useState(false);
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  /* Discord ticket generator */
  const generateTicket = useCallback((): string => {
    const itemLines = items
      .map((i) => `  • ${i.name} × ${i.quantity} — ৳${(i.price * i.quantity).toLocaleString()}`)
      .join("\n");
    return [
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "📦  VERLESMP STORE ORDER",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `🎮  Player IGN : ${ign || "[Your IGN]"}`,
      "",
      "🛒  Items Ordered:",
      itemLines,
      "",
      `💰  Total Paid  : ৳${totalPrice.toLocaleString()}`,
      `📱  Payment     : bKash Manual`,
      `🔢  Sender No.  : ${senderNumber || "[Your bKash Number]"}`,
      `🧾  TrxID       : ${trxId || "[Transaction ID]"}`,
      "",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `Please deliver these packages to my Minecraft account: ${ign || "[Your IGN]"}`,
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    ].join("\n");
  }, [ign, senderNumber, trxId, items, totalPrice]);

  const handleCopyTicket = useCallback(async () => {
    const text = generateTicket();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setTicketCopied(true);
    setTimeout(() => setTicketCopied(false), 3000);
  }, [generateTicket]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      if (!ign.trim()) { setError("Player IGN is required."); return; }
      if (!senderNumber.trim()) { setError("Sender bKash number is required."); return; }
      if (!trxId.trim()) { setError("Transaction ID is required."); return; }

      setLoading(true);
      try {
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
        const { error: dbError } = await supabase.from("orders").insert({
          order_id: orderId,
          player_ign: ign.trim(),
          user_email: "guest@verlesmp.net",
          items: items,
          total_price: totalPrice,
          payment_method: "manual_bkash",
          sender_number: senderNumber.trim(),
          trx_id: trxId.trim(),
          status: "pending",
        });
        if (dbError) throw dbError;
        clearCart();
        onSuccess();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to submit order.";
        if (msg.includes("YOUR_SUPABASE")) {
          setError("Supabase is not yet configured. Connect your database to submit orders.");
        } else {
          setError(msg);
        }
      } finally {
        setLoading(false);
      }
    },
    [ign, senderNumber, trxId, items, totalPrice, clearCart, onSuccess]
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* ⚠️ Warning Banner */}
      <div className="flex items-start gap-3 p-3 rounded-xl bg-[#ffd700]/5 border border-[#ffd700]/25">
        <AlertTriangle size={16} className="text-[#ffd700] shrink-0 mt-0.5" />
        <p className="text-xs text-[#ffd700]/90 leading-relaxed">
          <strong>⚠️ Direct orders may delay delivery.</strong> For instant
          delivery, open a ticket on our{" "}
          <a
            href="https://discord.gg/yourserver"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#ffd700] inline-flex items-center gap-0.5"
          >
            Discord server <ExternalLink size={10} />
          </a>{" "}
          and paste your order ticket.
        </p>
      </div>

      {/* bKash Payment Number */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#ff4d6d]/5 border border-[#ff4d6d]/25">
        <div>
          <p className="text-xs text-[#8b949e] mb-0.5">Send bKash payment to</p>
          <p className="text-xl font-extrabold font-mono text-[#f0f6fc]">
            {BKASH_NUMBER}
          </p>
          <p className="text-xs text-[#8b949e] mt-0.5">Personal — Send Money</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#8b949e]">Amount</p>
          <p className="text-lg font-extrabold font-mono text-[#00ffab]">
            ৳ {totalPrice.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Player IGN — HIGHEST PRIORITY */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bkash-ign" className="text-sm font-semibold text-[#f0f6fc] flex items-center gap-2">
          <Image src="https://cravatar.eu/helmavatar/Steve/20.png" alt="MC Head" width={20} height={20} unoptimized className="rounded-sm" />
          Player IGN <span className="text-[#ff4d6d] text-xs font-normal">(required)</span>
        </label>
        <input
          id="bkash-ign"
          type="text"
          placeholder="Your exact Minecraft username"
          value={ign}
          onChange={(e) => setIgn(e.target.value)}
          maxLength={16}
          autoComplete="off"
          spellCheck={false}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#f0f6fc] placeholder-[#8b949e]/60 font-mono text-sm focus:outline-none focus:border-[#00ffab]/50 focus:ring-1 focus:ring-[#00ffab]/20 transition-all"
        />
      </div>

      {/* Sender bKash Number */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bkash-sender" className="text-sm font-semibold text-[#f0f6fc]">
          📱 Sender bKash Number <span className="text-[#ff4d6d] text-xs font-normal">(required)</span>
        </label>
        <input
          id="bkash-sender"
          type="tel"
          placeholder="01XXXXXXXXX"
          value={senderNumber}
          onChange={(e) => setSenderNumber(e.target.value)}
          maxLength={14}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#f0f6fc] placeholder-[#8b949e]/60 font-mono text-sm focus:outline-none focus:border-[#00ffab]/50 focus:ring-1 focus:ring-[#00ffab]/20 transition-all"
        />
      </div>

      {/* Transaction ID */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bkash-trxid" className="text-sm font-semibold text-[#f0f6fc]">
          🧾 Transaction ID (TrxID) <span className="text-[#ff4d6d] text-xs font-normal">(required)</span>
        </label>
        <input
          id="bkash-trxid"
          type="text"
          placeholder="e.g. 9AB3C2D1E0"
          value={trxId}
          onChange={(e) => setTrxId(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#f0f6fc] placeholder-[#8b949e]/60 font-mono text-sm focus:outline-none focus:border-[#00ffab]/50 focus:ring-1 focus:ring-[#00ffab]/20 transition-all"
        />
      </div>

      {error && (
        <p className="text-sm text-[#ff4d6d] bg-[#ff4d6d]/10 border border-[#ff4d6d]/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* Discord Ticket Generator */}
      <div className="rounded-xl border border-[#7f5af0]/25 bg-[#7f5af0]/5 p-4 flex flex-col gap-3">
        <div>
          <p className="text-sm font-bold text-[#f0f6fc]">
            📋 Discord Application Generator
          </p>
          <p className="text-xs text-[#8b949e] mt-0.5">
            After paying, copy this ticket and paste it in our Discord #orders channel.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopyTicket}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg btn-neon-purple text-sm font-semibold w-full"
        >
          {ticketCopied ? (
            <>
              <Check size={15} />
              Ticket Copied! Paste in Discord ✓
            </>
          ) : (
            <>
              <Copy size={15} />
              Copy Discord Order Ticket
            </>
          )}
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-neon-green w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" /> Submitting Order…</>
        ) : (
          <><Zap size={16} /> Submit Order for Admin Review</>
        )}
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────
   Main CheckoutModal
───────────────────────────────────────── */
export default function CheckoutModal() {
  const isOpen = useCheckoutStore((s) => s.isOpen);
  const close = useCheckoutStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const [activeTab, setActiveTab] = useState<Tab>("coins");
  const [toast, setToast] = useState<ToastState | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Close on Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  /* Prevent body scroll when open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSuccess = useCallback(() => {
    close();
    setToast({ message: "🎉 Order placed! An admin will deliver your items in-game shortly.", type: "success" });
  }, [close]);

  if (!isOpen && !toast) return null;

  return (
    <>
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {!isOpen ? null : (
        <>
          {/* Backdrop */}
          <div
            ref={overlayRef}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Checkout"
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#161b22] shadow-2xl pointer-events-auto animate-fade-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161b22]">
                <div>
                  <h2 className="text-lg font-bold text-[#f0f6fc]">Checkout</h2>
                  <p className="text-xs text-[#8b949e]">
                    {items.length} item{items.length !== 1 ? "s" : ""} —{" "}
                    <span className="text-[#00ffab] font-semibold font-mono">
                      ৳ {totalPrice.toLocaleString()}
                    </span>
                  </p>
                </div>
                <button
                  onClick={close}
                  className="p-1.5 rounded-lg text-[#8b949e] hover:text-[#f0f6fc] hover:bg-white/5 transition-all"
                  aria-label="Close checkout"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-6 py-5 flex flex-col gap-5">
                {/* Tab switcher — React state, no DOM tricks */}
                <div className="flex rounded-xl overflow-hidden border border-white/10 bg-white/3 p-1 gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("coins")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      activeTab === "coins"
                        ? "bg-[#00ffab] text-[#0d1117] shadow-[0_0_16px_rgba(0,255,171,0.3)]"
                        : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-white/5"
                    }`}
                    aria-selected={activeTab === "coins"}
                  >
                    <Coins size={15} />
                    Pay with Coins
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("bkash")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      activeTab === "bkash"
                        ? "bg-[#7f5af0] text-white shadow-[0_0_16px_rgba(127,90,240,0.3)]"
                        : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-white/5"
                    }`}
                    aria-selected={activeTab === "bkash"}
                  >
                    <CreditCard size={15} />
                    Manual Payment
                  </button>
                </div>

                {/* Tab content — conditionally rendered, no display:none hacks */}
                {activeTab === "coins" ? (
                  <CoinsTab totalPrice={totalPrice} onSuccess={handleSuccess} />
                ) : (
                  <BkashTab totalPrice={totalPrice} onSuccess={handleSuccess} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
