import Image from "next/image";
import { User, Shield, Clock, ShoppingBag } from "lucide-react";

export default function ProfilePage() {
  // Mock data for the UI
  const player = {
    ign: "Notch",
    rank: "MVP+",
    joinDate: "Aug 15, 2023",
    coinBalance: 12500,
  };

  const recentOrders = [
    { id: "ORD-9821", item: "MVP+ Rank (Lifetime)", date: "Today", status: "Delivered", price: "৳2,500" },
    { id: "ORD-9710", item: "Legendary Crate Key x5", date: "3 days ago", status: "Delivered", price: "৳500" },
    { id: "ORD-9602", item: "5,000 Coins", date: "1 week ago", status: "Delivered", price: "৳300" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-up">
      {/* Header Profile Card */}
      <div className="glass p-10 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
        {/* Glow behind avatar */}
        <div className="absolute top-1/2 left-12 -translate-y-1/2 w-32 h-32 bg-[#00ffab]/20 blur-3xl rounded-full" />
        
        <div className="relative">
          <Image
            src={`https://cravatar.eu/helmavatar/${player.ign}/128.png`}
            alt={`${player.ign} Avatar`}
            width={128}
            height={128}
            className="rounded-2xl border-2 border-white/10 shadow-xl"
            unoptimized
          />
          <span className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-[#00ffab] border-4 border-[#0d1117] flex items-center justify-center shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          </span>
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-[#f0f6fc] tracking-tight">{player.ign}</h1>
              <p className="text-[#8b949e] font-medium mt-1">VerleSMP Member</p>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-end">
              <span className="px-4 py-1.5 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/20 text-[#ffd700] text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                <Shield size={14} />
                {player.rank}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm text-[#8b949e]">
              <Clock size={16} className="text-[#7f5af0]" />
              Joined {player.joinDate}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#8b949e]">
              <span className="text-lg">🪙</span>
              <strong className="text-[#00ffab]">{player.coinBalance.toLocaleString()}</strong> Coins
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Quick Actions / Stats */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-2xl flex flex-col gap-4">
            <h3 className="font-bold text-[#f0f6fc] flex items-center gap-2">
              <User size={18} className="text-[#00ffab]" />
              Account Actions
            </h3>
            <button className="btn-neon-green py-3 px-4 text-sm w-full shadow-[0_0_15px_rgba(0,255,171,0.15)]">
              Top Up Coins
            </button>
            <button className="px-4 py-3 rounded-lg border border-white/10 text-sm font-semibold text-[#f0f6fc] hover:bg-white/5 transition-colors text-left">
              Update Discord Tag
            </button>
            <button className="px-4 py-3 rounded-lg border border-[#ff4d6d]/20 text-sm font-semibold text-[#ff4d6d] hover:bg-[#ff4d6d]/10 transition-colors text-left">
              Sign Out
            </button>
          </div>
        </div>

        {/* Right Column: Order History */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass p-8 rounded-2xl">
            <h3 className="font-bold text-[#f0f6fc] flex items-center gap-2 mb-6 text-xl">
              <ShoppingBag size={20} className="text-[#7f5af0]" />
              Recent Orders
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-white/10 text-[#8b949e]">
                    <th className="pb-4 font-semibold px-2">Order ID</th>
                    <th className="pb-4 font-semibold px-2">Item</th>
                    <th className="pb-4 font-semibold px-2">Date</th>
                    <th className="pb-4 font-semibold px-2 text-right">Amount</th>
                    <th className="pb-4 font-semibold px-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-2 font-mono text-[#8b949e]">{order.id}</td>
                      <td className="py-4 px-2 font-medium text-[#f0f6fc]">{order.item}</td>
                      <td className="py-4 px-2 text-[#8b949e]">{order.date}</td>
                      <td className="py-4 px-2 text-right font-mono text-[#00ffab] font-medium">{order.price}</td>
                      <td className="py-4 px-2 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#00ffab]/10 border border-[#00ffab]/20 text-[#00ffab] text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00ffab]" />
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
