import type { Metadata } from "next";
import { supabase, type StoreItem } from "@/lib/supabase";
import StoreGrid from "./StoreGrid";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Browse Ranks, Crate Keys, and In-game Coins for VerleSMP. Delivered directly to your Minecraft account.",
};

/* ── Mock data shown when Supabase is not yet configured ── */
const MOCK_ITEMS: StoreItem[] = [
  {
    id: "1",
    name: "VIP Rank",
    category: "rank",
    price: 299,
    icon_url: "",
    description: "Unlock VIP perks: /fly in spawn, coloured chat, exclusive /kit vip and more.",
  },
  {
    id: "2",
    name: "MVP Rank",
    category: "rank",
    price: 599,
    icon_url: "",
    description: "Everything in VIP plus priority queue, particle effects, /nick, and MVP discord role.",
  },
  {
    id: "3",
    name: "MVP+ Rank",
    category: "rank",
    price: 999,
    icon_url: "",
    description: "The ultimate rank — all perks unlocked, monthly crate key bonus, and exclusive MVP+ tag.",
  },
  {
    id: "4",
    name: "Legendary Key",
    category: "crate_key",
    price: 149,
    icon_url: "",
    description: "Open the Legendary Crate for rare enchanted gear, custom heads, and exclusive cosmetics.",
  },
  {
    id: "5",
    name: "Epic Key",
    category: "crate_key",
    price: 89,
    icon_url: "",
    description: "Unlock the Epic Crate — enchanted tools, armour sets, and valuable in-game resources.",
  },
  {
    id: "6",
    name: "Vote Key × 5",
    category: "crate_key",
    price: 49,
    icon_url: "",
    description: "5× Vote Crate Keys. Great for beginners looking for a quick boost.",
  },
  {
    id: "7",
    name: "1,000 Coins",
    category: "coins",
    price: 99,
    icon_url: "",
    description: "1,000 in-game coins added directly to your balance. Use in /shop or player trading.",
  },
  {
    id: "8",
    name: "5,000 Coins",
    category: "coins",
    price: 449,
    icon_url: "",
    description: "5,000 coins — great value pack for serious economy players.",
  },
  {
    id: "9",
    name: "15,000 Coins",
    category: "coins",
    price: 1199,
    icon_url: "",
    description: "The ultimate coin bundle. Dominate the in-game economy with 15,000 coins.",
  },
];

/* ── Server Component: fetch items from Supabase ── */
export default async function StorePage() {
  let items: StoreItem[] = [];
  let isDemo = false;

  try {
    const { data, error } = await supabase
      .from("store_items")
      .select("*")
      .order("category")
      .order("price");

    if (error) throw error;
    items = data ?? [];
  } catch {
    // Supabase not configured yet — fall back to demo data
    items = MOCK_ITEMS;
    isDemo = true;
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#f0f6fc] tracking-tight">
          🏪 Server Store
        </h1>
        <p className="text-[#8b949e] mt-2">
          All purchases are delivered{" "}
          <span className="text-[#00ffab] font-semibold">in-game</span> by our
          admin team after payment confirmation.
        </p>
        {isDemo && (
          <div className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ffd700]/5 border border-[#ffd700]/20 text-[#ffd700] text-xs font-medium w-fit">
            ⚠️ Demo mode — connect Supabase in{" "}
            <code className="font-mono bg-white/5 px-1 rounded">.env.local</code>{" "}
            to load live store items.
          </div>
        )}
      </div>

      {/* Client component handles filtering + cart */}
      <StoreGrid items={items} />
    </div>
  );
}
