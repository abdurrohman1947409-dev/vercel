import Link from "next/link";
import { ShoppingBag, Megaphone, ScrollText, Sword } from "lucide-react";

const FEATURED_CATEGORIES = [
  {
    id: "rank",
    icon: "👑",
    title: "Ranks",
    description: "Get VIP, MVP+, and elite ranks with exclusive in-game perks, commands, and cosmetics. Stand out from the crowd and rule the server.",
    href: "/store?category=rank",
    badge: "Most Popular",
    badgeColor: "badge-rank",
  },
  {
    id: "crate_key",
    icon: "🗝️",
    title: "Crate Keys",
    description: "Unlock Legendary, Epic, and Vote crates for rare loot, gear, and exclusive cosmetics that can't be obtained anywhere else.",
    href: "/store?category=crate_key",
    badge: "Fan Favourite",
    badgeColor: "badge-key",
  },
  {
    id: "coins",
    icon: "🪙",
    title: "In-game Coins",
    description: "Top up your in-game coin balance to trade, buy from the server shop, and absolutely dominate the in-game economy.",
    href: "/store?category=coins",
    badge: "Best Value",
    badgeColor: "badge-coins",
  },
];

const STATS = [
  { value: "500+", label: "Active Players", emoji: "🧑‍💻" },
  { value: "99.9%", label: "Uptime", emoji: "⚡" },
  { value: "24/7", label: "Admin Support", emoji: "🛡️" },
  { value: "3", label: "Game Modes", emoji: "🎮" },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 max-w-4xl mx-auto relative">
        {/* Background glow blob */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.08] blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #00ffab 0%, #7f5af0 55%, transparent 100%)" }}
        />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm mb-8 z-10">
          <span className="w-2 h-2 rounded-full bg-[#00ffab] animate-pulse" />
          play.yourserver.net — Online
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight z-10">
          The Official{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #00ffab 0%, #7f5af0 100%)",
              filter: "drop-shadow(0 0 28px rgba(0,255,171,0.35))",
            }}
          >
            VerleSMP
          </span>{" "}
          Web Store
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed z-10">
          Power up your Minecraft experience. Buy{" "}
          <span className="text-[#ffd700] font-semibold">Ranks</span>,{" "}
          <span className="text-[#7f5af0] font-semibold">Crate Keys</span>, and{" "}
          <span className="text-[#00ffab] font-semibold">In-game Coins</span> — all
          delivered directly to your Minecraft account by our admin team.
        </p>

        <div className="flex items-center justify-center gap-5 z-10">
          <Link href="/store" className="btn-neon-green flex items-center gap-2 px-10 py-4 text-base font-bold">
            <ShoppingBag size={18} />
            Browse Store
          </Link>
          <Link
            href="/announcements"
            className="flex items-center gap-2 px-10 py-4 rounded-xl border border-white/15 bg-white/5 text-sm font-bold text-white hover:bg-white/10 hover:border-white/25 transition-all"
          >
            <Megaphone size={16} />
            Announcements
          </Link>
        </div>
      </section>

      {/* STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 my-16">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center space-y-2 hover:border-emerald-500/30 transition-all"
          >
            <span className="text-4xl">{s.emoji}</span>
            <p className="text-4xl font-extrabold text-[#00ffab] font-mono leading-none mt-2">{s.value}</p>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>

      {/* STORE CATEGORIES */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Sword size={22} className="text-[#00ffab]" />
          Store Categories
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-20">
        {FEATURED_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="bg-[#161b22] border border-white/10 p-8 rounded-2xl flex flex-col justify-between hover:border-emerald-500/50 transition-all space-y-6 group relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <span className="text-6xl leading-none">{cat.icon}</span>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${cat.badgeColor}`}>
                  {cat.badge}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{cat.description}</p>
            </div>

            <span className="relative z-10 text-sm font-bold text-[#00ffab] inline-flex items-center gap-1">
              Shop {cat.title}
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <ScrollText size={22} className="text-[#7f5af0]" />
          How In-Game Delivery Works
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-24">
        {[
          {
            step: "01",
            title: "Choose Items",
            desc: "Pick your Ranks, Crate Keys, or Coins from the store and add them to your cart. Review your order before proceeding.",
            color: "#00ffab",
          },
          {
            step: "02",
            title: "Checkout & Pay",
            desc: "Pay with in-game Coins or via Manual bKash transfer. Enter your exact Player IGN so we can find your account.",
            color: "#7f5af0",
          },
          {
            step: "03",
            title: "In-Game Delivery",
            desc: "An admin runs the in-game commands to deliver your purchases directly to your Minecraft account. Usually within 24h.",
            color: "#ffd700",
          },
        ].map((s) => (
          <div key={s.step} className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-4 relative overflow-hidden">
            <span
              className="text-5xl font-extrabold font-mono"
              style={{ color: `${s.color}25` }}
            >
              {s.step}
            </span>
            <div className="relative z-10">
              <h3 className="font-bold text-white text-xl leading-snug mb-2">{s.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
            <div
              className="w-10 h-1 rounded-full mt-auto"
              style={{ backgroundColor: s.color, opacity: 0.5 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
