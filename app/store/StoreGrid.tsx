"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ShoppingCart, Check, Filter } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { useCheckoutStore } from "@/lib/checkoutStore";
import type { StoreItem, ItemCategory } from "@/lib/supabase";

/* ─────────────────────────────────────────
   Category filter config
───────────────────────────────────────── */
type FilterTab = "all" | ItemCategory;
const FILTERS: { value: FilterTab; label: string; emoji: string }[] = [
  { value: "all", label: "All Items", emoji: "🏪" },
  { value: "rank", label: "Ranks", emoji: "👑" },
  { value: "crate_key", label: "Crate Keys", emoji: "🗝️" },
  { value: "coins", label: "Coins", emoji: "🪙" },
];

const CATEGORY_META: Record<
  ItemCategory,
  { badge: string; badgeClass: string; gradient: string; border: string }
> = {
  rank: {
    badge: "Rank",
    badgeClass: "badge-rank",
    gradient: "from-[#ffd700]/8 to-transparent",
    border: "border-[#ffd700]/15 hover:border-[#ffd700]/35",
  },
  crate_key: {
    badge: "Crate Key",
    badgeClass: "badge-key",
    gradient: "from-[#7f5af0]/8 to-transparent",
    border: "border-[#7f5af0]/15 hover:border-[#7f5af0]/35",
  },
  coins: {
    badge: "Coins",
    badgeClass: "badge-coins",
    gradient: "from-[#00ffab]/8 to-transparent",
    border: "border-[#00ffab]/15 hover:border-[#00ffab]/35",
  },
};

const EMOJI_FALLBACK: Record<ItemCategory, string> = {
  rank: "👑",
  crate_key: "🗝️",
  coins: "🪙",
};

/* ─────────────────────────────────────────
   Individual Store Item Card
───────────────────────────────────────── */
function ItemCard({ item }: { item: StoreItem }) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const cartItems = useCartStore((s) => s.items);
  const openCheckout = useCheckoutStore((s) => s.open);
  const [justAdded, setJustAdded] = useState(false);

  const inCart = cartItems.some((i) => i.id === item.id);
  const meta = CATEGORY_META[item.category];

  const handleAdd = () => {
    addItem(item);
    setJustAdded(true);
    openCart();
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div
      className={`glass glass-hover relative flex flex-col border overflow-hidden transition-all duration-200 ${meta.border}`}
    >
      {/* Category gradient tint */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} pointer-events-none`}
      />

      {/* Card body */}
      <div className="relative p-5 flex-1 flex flex-col gap-3">
        {/* Icon + Badge */}
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            {item.icon_url ? (
              <Image
                src={item.icon_url}
                alt={item.name}
                width={48}
                height={48}
                className="object-contain p-1"
                unoptimized
              />
            ) : (
              <span className="text-3xl">{EMOJI_FALLBACK[item.category]}</span>
            )}
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${meta.badgeClass}`}>
            {meta.badge}
          </span>
        </div>

        {/* Name + Description */}
        <div className="flex-1">
          <h3 className="font-bold text-[#f0f6fc] text-base">{item.name}</h3>
          <p className="text-xs text-[#8b949e] mt-1.5 leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Price + Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div>
            <p className="text-xs text-[#8b949e]">Price</p>
            <p className="text-xl font-extrabold font-mono text-[#f0f6fc]">
              ৳ {item.price.toLocaleString()}
            </p>
          </div>
          <div className="flex gap-2">
            {/* Buy Now (skip to checkout) */}
            <button
              onClick={() => {
                addItem(item);
                openCheckout();
              }}
              className="px-3 py-2 rounded-lg text-xs font-semibold border border-[#7f5af0]/30 bg-[#7f5af0]/10 text-[#7f5af0] hover:bg-[#7f5af0]/20 hover:border-[#7f5af0]/50 transition-all"
              aria-label={`Buy ${item.name} now`}
            >
              Buy Now
            </button>

            {/* Add to Cart */}
            <button
              onClick={handleAdd}
              id={`add-to-cart-${item.id}`}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                justAdded
                  ? "bg-[#00ffab]/20 border border-[#00ffab]/40 text-[#00ffab]"
                  : "btn-neon-green"
              }`}
              aria-label={`Add ${item.name} to cart`}
            >
              {justAdded ? (
                <><Check size={12} /> Added!</>
              ) : (
                <><ShoppingCart size={12} /> {inCart ? "Add More" : "Add to Cart"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Store Grid (client — handles filtering)
───────────────────────────────────────── */
export default function StoreGrid({ items }: { items: StoreItem[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? items
        : items.filter((i) => i.category === activeFilter),
    [items, activeFilter]
  );

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter size={14} className="text-[#8b949e] shrink-0" />
        {FILTERS.map((f) => {
          const count =
            f.value === "all"
              ? items.length
              : items.filter((i) => i.category === f.value).length;
          return (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === f.value
                  ? "bg-[#00ffab] text-[#0d1117] shadow-[0_0_16px_rgba(0,255,171,0.25)]"
                  : "border border-white/10 bg-white/3 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-white/8"
              }`}
              aria-pressed={activeFilter === f.value}
            >
              {f.emoji} {f.label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                  activeFilter === f.value
                    ? "bg-[#0d1117]/20 text-[#0d1117]"
                    : "bg-white/5 text-[#8b949e]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <span className="text-5xl">🔍</span>
          <p className="text-[#f0f6fc] font-semibold">No items found</p>
          <p className="text-[#8b949e] text-sm">Try a different category filter.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
