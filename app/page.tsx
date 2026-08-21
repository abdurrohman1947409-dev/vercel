import Link from "next/link";
import { ShoppingBag, Megaphone, ScrollText, Sword } from "lucide-react";

const FEATURED_CATEGORIES = [
  {
    id: "rank",
    icon: "👑",
    title: "Ranks",
    description:
      "Get VIP, MVP+, and elite ranks with exclusive in-game perks, commands, and cosmetics.",
    href: "/store?category=rank",
    badge: "Most Popular",
    badgeColor: "badge-rank",
    gradient: "from-[#ffd700]/10 to-transparent",
    border: "border-[#ffd700]/20 hover:border-[#ffd700]/40",
    glow: "hover:shadow-[0_8px_40px_rgba(255,215,0,0.1)]",
  },
  {
    id: "crate_key",
    icon: "🗝️",
    title: "Crate Keys",
    description:
      "Unlock Legendary, Epic, and Vote crates for rare loot, gear, and exclusive cosmetics.",
    href: "/store?category=crate_key",
    badge: "Fan Favourite",
    badgeColor: "badge-key",
    gradient: "from-[#7f5af0]/10 to-transparent",
    border: "border-[#7f5af0]/20 hover:border-[#7f5af0]/40",
    glow: "hover:shadow-[0_8px_40px_rgba(127,90,240,0.1)]",
  },
  {
    id: "coins",
    icon: "🪙",
    title: "In-game Coins",
    description:
      "Top up your in-game coin balance to trade, buy from the server shop, and dominate the economy.",
    href: "/store?category=coins",
    badge: "Best Value",
    badgeColor: "badge-coins",
    gradient: "from-[#00ffab]/10 to-transparent",
    border: "border-[#00ffab]/20 hover:border-[#00ffab]/40",
    glow: "hover:shadow-[0_8px_40px_rgba(0,255,171,0.1)]",
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
    <div className="space-y-24">

      {/* ─── HERO SECTION ─── */}
      <section className="flex flex-col items-center justify-center space-y-8 pt-20 pb-16 text-center relative">

        {/* Background glow blob */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] rounded-full opacity-[0.07] blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, #00ffab 0%, #7f5af0 55%, transparent 100%)",
          }}
        />

        {/* Server status pill */}
        <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold text-[#00ffab] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00ffab] animate-pulse" />
          play.yourserver.net — Online
        </div>

        {/* Main heading */}
        <div className="relative z-10 space-y-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#f0f6fc] leading-tight">
            The Official{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #00ffab 0%, #7f5af0 100%)",
                filter: "drop-shadow(0 0 24px rgba(0,255,171,0.3))",
              }}
            >
              VerleSMP
            </span>{" "}
            Web Store
          </h1>
          <p className="text-lg md:text-xl text-[#8b949e] max-w-2xl mx-auto leading-relaxed">
            Power up your Minecraft experience. Buy{" "}
            <span className="text-[#ffd700] font-semibold">Ranks</span>,{" "}
            <span className="text-[#7f5af0] font-semibold">Crate Keys</span>, and{" "}
            <span className="text-[#00ffab] font-semibold">In-game Coins</span> — all
            delivered directly to your Minecraft account by our admin team.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="relative z-10 flex flex-wrap gap-4 justify-center">
          <Link href="/store" className="btn-neon-green flex items-center gap-2 px-8 py-3 text-base font-bold">
            <ShoppingBag size={18} />
            Browse Store
          </Link>
          <Link
            href="/announcements"
            className="flex items-center gap-2 px-8 py-3 rounded-xl border border-white/15 bg-white/5 text-sm font-bold text-[#f0f6fc] hover:bg-white/10 hover:border-white/25 transition-all"
          >
            <Megaphone size={16} />
            Announcements
          </Link>
        </div>
      </section>

      {/* ─── STATS ROW ─── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="glass glass-hover p-6 rounded-2xl text-center flex flex-col items-center gap-2"
          >
            <span className="text-3xl">{s.emoji}</span>
            <p className="text-3xl font-extrabold text-[#00ffab] font-mono">{s.value}</p>
            <p className="text-xs text-[#8b949e] font-semibold uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </section>

      {/* ─── STORE CATEGORIES ─── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Sword size={22} className="text-[#00ffab]" />
          <h2 className="text-2xl font-bold text-[#f0f6fc]">Store Categories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto mt-12">
          {FEATURED_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`glass relative p-8 h-full flex flex-col justify-between border rounded-2xl overflow-hidden transition-all duration-300 ${cat.border} ${cat.glow}`}
            >
              {/* Gradient tint */}
              <div
                aria-hidden
                className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} pointer-events-none`}
              />

              <div className="relative space-y-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-5xl leading-none">{cat.icon}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cat.badgeColor}`}>
                    {cat.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#f0f6fc]">{cat.title}</h3>
                <p className="text-sm text-[#8b949e] leading-relaxed">{cat.description}</p>
              </div>

              <span className="relative text-sm font-bold text-[#00ffab] mt-6 inline-flex items-center gap-1">
                Shop {cat.title}
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <ScrollText size={22} className="text-[#7f5af0]" />
          <h2 className="text-2xl font-bold text-[#f0f6fc]">How In-Game Delivery Works</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Choose Items",
              desc: "Pick your Ranks, Crate Keys, or Coins from the store and add them to your cart.",
              color: "#00ffab",
            },
            {
              step: "02",
              title: "Checkout & Pay",
              desc: "Pay with in-game Coins or via Manual bKash. Enter your exact Player IGN.",
              color: "#7f5af0",
            },
            {
              step: "03",
              title: "In-Game Delivery",
              desc: "An admin runs the in-game commands to deliver your purchases directly to your Minecraft account.",
              color: "#ffd700",
            },
          ].map((s) => (
            <div key={s.step} className="glass p-8 rounded-2xl flex flex-col gap-4">
              <span
                className="text-4xl font-extrabold font-mono"
                style={{ color: `${s.color}30` }}
              >
                {s.step}
              </span>
              <div className="space-y-2">
                <h3 className="font-bold text-[#f0f6fc] text-lg">{s.title}</h3>
                <p className="text-sm text-[#8b949e] leading-relaxed">{s.desc}</p>
              </div>
              <div
                className="w-8 h-1 rounded-full mt-auto"
                style={{ backgroundColor: s.color, opacity: 0.6 }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
