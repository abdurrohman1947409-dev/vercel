import Link from "next/link";
import { ShoppingBag, Megaphone, ScrollText, Sword } from "lucide-react";

const FEATURED_CATEGORIES = [
  {
    id: "rank",
    icon: "👑",
    title: "Ranks",
    description: "Get VIP, MVP+, and elite ranks with exclusive in-game perks, commands, and cosmetics.",
    href: "/store?category=rank",
    badge: "Most Popular",
    badgeColor: "badge-rank",
    gradient: "from-[#ffd700]/10 to-transparent",
    border: "border-[#ffd700]/20 hover:border-[#ffd700]/40",
  },
  {
    id: "crate_key",
    icon: "🗝️",
    title: "Crate Keys",
    description: "Unlock Legendary, Epic, and Vote crates for rare loot, gear, and exclusive cosmetics.",
    href: "/store?category=crate_key",
    badge: "Fan Favourite",
    badgeColor: "badge-key",
    gradient: "from-[#7f5af0]/10 to-transparent",
    border: "border-[#7f5af0]/20 hover:border-[#7f5af0]/40",
  },
  {
    id: "coins",
    icon: "🪙",
    title: "In-game Coins",
    description: "Top up your in-game coin balance to trade, buy from the server shop, and dominate the economy.",
    href: "/store?category=coins",
    badge: "Best Value",
    badgeColor: "badge-coins",
    gradient: "from-[#00ffab]/10 to-transparent",
    border: "border-[#00ffab]/20 hover:border-[#00ffab]/40",
  },
];

const STATS = [
  { value: "500+", label: "Active Players" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Admin Support" },
  { value: "3", label: "Game Modes" },
];

export default function HomePage() {
  return (
    <div className="space-y-20">

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center text-center pt-12 pb-6 gap-6">
        {/* Glow blob */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #00ffab 0%, #7f5af0 60%, transparent 100%)" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-5">
          {/* Server status chip */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00ffab]/30 bg-[#00ffab]/5 text-xs font-semibold text-[#00ffab] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00ffab] animate-pulse" />
            play.yourserver.net — Online
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#f0f6fc] leading-tight max-w-3xl">
            The Official{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffab] to-[#7f5af0]">
              VerleSMP
            </span>{" "}
            Web Store
          </h1>

          <p className="text-[#8b949e] text-lg max-w-xl leading-relaxed">
            Power up your Minecraft experience. Buy{" "}
            <span className="text-[#ffd700]">Ranks</span>,{" "}
            <span className="text-[#7f5af0]">Crate Keys</span>, and{" "}
            <span className="text-[#00ffab]">In-game Coins</span> — all
            delivered instantly by our admin team.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <Link href="/store" className="btn-neon-green flex items-center gap-2">
              <ShoppingBag size={16} />
              Browse Store
            </Link>
            <Link
              href="/announcements"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-sm font-semibold text-[#f0f6fc] hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <Megaphone size={16} />
              Announcements
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="glass glass-hover p-5 text-center">
            <p className="text-2xl font-extrabold text-[#00ffab] font-mono">{s.value}</p>
            <p className="text-xs text-[#8b949e] mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </section>

      {/* ── Store Categories ── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Sword size={20} className="text-[#00ffab]" />
          <h2 className="text-xl font-bold text-[#f0f6fc]">Store Categories</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`glass glass-hover relative p-6 flex flex-col gap-3 border transition-all duration-200 overflow-hidden ${cat.border}`}
            >
              {/* Gradient tint */}
              <div
                aria-hidden
                className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} pointer-events-none`}
              />

              <div className="relative flex items-start justify-between">
                <span className="text-4xl leading-none">{cat.icon}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cat.badgeColor}`}>
                  {cat.badge}
                </span>
              </div>

              <div className="relative">
                <h3 className="text-lg font-bold text-[#f0f6fc]">{cat.title}</h3>
                <p className="text-sm text-[#8b949e] mt-1 leading-relaxed">{cat.description}</p>
              </div>

              <span className="relative text-xs font-semibold text-[#00ffab] mt-auto pt-2">
                Shop {cat.title} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How it Works ── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <ScrollText size={20} className="text-[#7f5af0]" />
          <h2 className="text-xl font-bold text-[#f0f6fc]">How In-Game Delivery Works</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { step: "01", title: "Choose Items", desc: "Pick your Ranks, Crate Keys, or Coins from the store and add them to your cart." },
            { step: "02", title: "Checkout & Pay", desc: "Pay with your in-game Coins balance or via Manual bKash payment. Enter your Player IGN." },
            { step: "03", title: "In-Game Delivery", desc: "An admin runs the in-game commands to deliver your purchases directly to your Minecraft account." },
          ].map((s) => (
            <div key={s.step} className="glass p-5 flex flex-col gap-3">
              <span className="text-3xl font-extrabold font-mono text-[#00ffab]/30">{s.step}</span>
              <h3 className="font-bold text-[#f0f6fc]">{s.title}</h3>
              <p className="text-sm text-[#8b949e] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
