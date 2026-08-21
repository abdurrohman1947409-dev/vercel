"use client";

import { useCallback } from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, Zap } from "lucide-react";
import { useCartStore, type CartItem } from "@/lib/cartStore";

/* ── Category badge helper ── */
const categoryBadge = (category: CartItem["category"]) => {
  const map = {
    rank: { label: "Rank", className: "badge-rank" },
    crate_key: { label: "Crate Key", className: "badge-key" },
    coins: { label: "Coins", className: "badge-coins" },
  };
  return map[category] ?? { label: category, className: "badge-coins" };
};

/* ── CartItem Row ── */
function CartRow({ item }: { item: CartItem }) {
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const { label, className } = categoryBadge(item.category);

  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0 animate-fade-up">
      {/* Item Icon */}
      <div className="relative w-10 h-10 shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
        {item.icon_url ? (
          <Image
            src={item.icon_url}
            alt={item.name}
            fill
            className="object-contain p-1"
            unoptimized
          />
        ) : (
          <ShoppingBag size={18} className="text-[#8b949e]" />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#f0f6fc] truncate">{item.name}</p>
        <span
          className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${className}`}
        >
          {label}
        </span>
        <p className="mt-1 text-xs text-[#8b949e]">
          ৳ {item.price.toLocaleString()} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <button
          onClick={() => removeItem(item.id)}
          className="text-[#ff4d6d]/60 hover:text-[#ff4d6d] transition-colors"
          aria-label={`Remove ${item.name}`}
        >
          <Trash2 size={14} />
        </button>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-6 h-6 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 text-[#f0f6fc] transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={10} />
          </button>
          <span className="text-sm font-mono text-[#f0f6fc] w-4 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-6 h-6 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 text-[#f0f6fc] transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={10} />
          </button>
        </div>
        <p className="text-xs font-bold text-[#00ffab]">
          ৳ {(item.price * item.quantity).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

/* ── Empty State ── */
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 py-12 text-center">
      <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
        <ShoppingBag size={36} className="text-[#8b949e]" />
      </div>
      <div>
        <p className="text-[#f0f6fc] font-semibold">Your cart is empty</p>
        <p className="text-[#8b949e] text-sm mt-1">
          Browse the store and add some Ranks or Crate Keys!
        </p>
      </div>
    </div>
  );
}

/* ── Main CartDrawer ── */
export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore((s) => s.totalItems());
  const totalPrice = useCartStore((s) => s.totalPrice());

  const handleCheckout = useCallback(() => {
    // Will open CheckoutModal in Phase 3
    closeCart();
    // TODO: openCheckoutModal()
  }, [closeCart]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
        className={`
          fixed top-0 right-0 z-50 h-full w-full max-w-sm
          flex flex-col
          bg-[#161b22] border-l border-white/10
          shadow-[−8px_0_40px_rgba(0,0,0,0.6)]
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#00ffab]" />
            <h2 className="font-bold text-[#f0f6fc] text-base">
              Cart
              {totalItems > 0 && (
                <span className="ml-2 text-xs font-mono bg-[#00ffab]/10 text-[#00ffab] border border-[#00ffab]/20 px-2 py-0.5 rounded-full">
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-lg text-[#8b949e] hover:text-[#f0f6fc] hover:bg-white/5 transition-all"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-5 py-2">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div>
              {items.map((item) => (
                <CartRow key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="shrink-0 px-5 py-4 border-t border-white/10 space-y-3">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8b949e]">Subtotal</span>
              <span className="font-bold text-[#f0f6fc] text-base font-mono">
                ৳ {totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Delivery Note */}
            <p className="text-xs text-[#8b949e] bg-white/3 border border-white/5 rounded-lg px-3 py-2">
              📦 All items are{" "}
              <span className="text-[#00ffab] font-semibold">
                delivered in-game
              </span>{" "}
              by an admin after payment confirmation.
            </p>

            {/* Actions */}
            <button
              onClick={handleCheckout}
              id="checkout-btn"
              className="btn-neon-green w-full flex items-center justify-center gap-2 text-sm"
            >
              <Zap size={15} />
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 px-4 rounded-lg text-sm text-[#ff4d6d] border border-[#ff4d6d]/20 bg-[#ff4d6d]/5 hover:bg-[#ff4d6d]/10 hover:border-[#ff4d6d]/40 transition-all font-medium"
            >
              Clear All Items
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
